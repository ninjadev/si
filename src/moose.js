(function(global) {
  function CommodoreLogo(A) {
    const B = 0.034 * A;
    const C = 0.166 * A;
    const D = 0.30 * A;
    const E = 0.364 * A;
    const F = 0.52 * A;
    const G = 0.53 * A;  // Diameter of the inner circle
    const H = 0.636 * A; // X offset to circle clipping start
    const I = 0.97 * A;  // Diameter of the outer circle

    const cee = new Path();

    // First we draw the outer circle counterclockwise from the top right.
    const outerSegments = 30;
    const outerCircleRadius = I / 2;
    const offsetToVerticalClipFromCircleCentre = H - I / 2;
    const outerCircleRadianOffsetFromStart = Math.acos(offsetToVerticalClipFromCircleCentre / outerCircleRadius);
    const outerCircleRadianEnd = 2 * Math.PI - outerCircleRadianOffsetFromStart;
    for (let i = 0; i <= outerSegments; i++) {
      const radianOffset = outerCircleRadianOffsetFromStart + i * (outerCircleRadianEnd - outerCircleRadianOffsetFromStart) / outerSegments;
      const x = Math.cos(radianOffset) * outerCircleRadius;
      const y = Math.sin(radianOffset) * outerCircleRadius;
      cee.lineTo(x, y);
    }

    // Now we draw the inner circle clockwise from the bottom right
    const innerSegments = 20;
    const innerCircleRadius = G / 2;
    const innerCircleRadianOffsetFromStart = Math.acos(offsetToVerticalClipFromCircleCentre / innerCircleRadius);
    const innerCircleRadianEnd = 2 * Math.PI - innerCircleRadianOffsetFromStart;
    for (let i = innerSegments; i >= 0; i--) {
      const radianOffset = innerCircleRadianOffsetFromStart + i * (innerCircleRadianEnd - innerCircleRadianOffsetFromStart) / innerSegments;
      const x = Math.cos(radianOffset) * innerCircleRadius;
      const y = Math.sin(radianOffset) * innerCircleRadius;
      cee.lineTo(x, y);
    }

    // Complete the C
    cee.lineTo(
      Math.cos(outerCircleRadianOffsetFromStart) * outerCircleRadius,
      Math.sin(outerCircleRadianOffsetFromStart) * outerCircleRadius
    );

    const upperBeak = new Path();
    upperBeak.lineTo(0, C / 2);
    upperBeak.lineTo(E, C / 2);
    upperBeak.lineTo(E - C, - C / 2);
    upperBeak.lineTo(0, - C / 2);
    upperBeak.lineTo(0, C / 2);

    const lowerBeak = new Path();
    lowerBeak.lineTo(0, -C / 2);
    lowerBeak.lineTo(E, -C / 2);
    lowerBeak.lineTo(E - C, C / 2);
    lowerBeak.lineTo(0, C / 2);
    lowerBeak.lineTo(0, -C / 2);

    const wrapper = new THREE.Object3D();
    const cceo3d = cee.toObject3D();
    wrapper.add(cceo3d);
    const ufo3d = upperBeak.toObject3D();
    ufo3d.position.set(offsetToVerticalClipFromCircleCentre, B / 2 + C / 2, 0);
    wrapper.add(ufo3d);
    const lfo3d = lowerBeak.toObject3D();
    lfo3d.position.set(offsetToVerticalClipFromCircleCentre, -B / 2 - C / 2, 0);
    wrapper.add(lfo3d);

    const outerWrapper = new THREE.Object3D();
    outerWrapper.add(wrapper);
    outerWrapper.upperBeak = ufo3d;
    outerWrapper.lowerBeak = lfo3d;
    return outerWrapper;
  }

  class moose extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: Loader.loadTexture('res/paper.png'),
          side: THREE.DoubleSide,
        }));
      this.wall.material.map.repeat.set(4, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);

      const commodoreColors = [
        '#e72c2f',
        '#ed6948',
        '#fdce1f',
        '#53b74c',
        '#03a6ee',
      ];

      function CommodoreLines(width, length) {
        const wrapper = new THREE.Object3D();
        const lines = [];
        const padding = 0.5;
        for (let [i, color] of commodoreColors.entries()) {
          color = new THREE.Color(color).multiplyScalar(0.8);
          color = new THREE.Vector3(color.r, color.g, color.b);
          let path = new Path({color});

          path.lineTo(
            -length - (i * 10) + 25,
            -i * (width - padding)
          );
          path.lineTo(
            length - (i * 10) + 25,
            -i * (width - padding)
          );
          let obj = path.toObject3D();
          obj.path = path;

          wrapper.add(obj);
          lines.push(obj);
        }

        wrapper.position.set(0, 2 * (width - padding), 0);

        const outerWrapper = new THREE.Object3D();
        outerWrapper.add(wrapper);
        return [outerWrapper, lines];
      }

      this.commodoreLinesLeft = [];
      this.commodoreLinesWrapperLeft = new THREE.Object3D();
      this.commodoreLinesRight = [];
      this.commodoreLinesWrapperRight = new THREE.Object3D();
      for (let i=0; i<4; i++) {
        const [wrapper, lines] = CommodoreLines(2.5, 180);
        wrapper.position.y = 60 - i * 40;
        if (i % 2 == 0) {
          this.commodoreLinesWrapperLeft.add(wrapper);
          this.commodoreLinesLeft.push(lines);
        } else {
          this.commodoreLinesWrapperRight.add(wrapper);
          this.commodoreLinesRight.push(lines);
        }
      }
      this.scene.add(this.commodoreLinesWrapperLeft);
      this.commodoreLinesWrapperRight.rotation.y = Math.PI;
      this.scene.add(this.commodoreLinesWrapperRight);

      this.oomph = 1.0;

      this.commodoreLogos = [];
      this.logoWrapperRight = new THREE.Object3D();
      this.logoWrapperLeft = new THREE.Object3D();

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 20; col++) {
          let logo = CommodoreLogo(25);
          logo.position.set(
            -150 + col * (25 + 5),
            // 5 rows a 25 + 15, offsets 80 40 0 40 80
            80 - (25 + 15) * row,
            //-100 + row * (25 + 15),
            0
          );
          this.commodoreLogos.push(logo);
          if (row % 2 == 0) {
            this.logoWrapperLeft.add(logo);
          } else {
            this.logoWrapperRight.add(logo);
          }
        }
      }
      this.scene.add(this.logoWrapperLeft);
      this.logoWrapperRight.rotation.y = Math.PI;
      this.scene.add(this.logoWrapperRight);
    }

    update(frame) {

      super.update(frame);

      if (BEAT && BEAN % 12 == 0) {
        this.oomph = 1.0;
      }

      this.oomph *= 0.95;

      this.circles = [];

      const startOfStart = 90;
      const startOfEnd = 360;
      const speed = 90;

      // Screen is ca 300 wide. 10 units a 30.
      this.logoWrapperRight.position.x = 300 - ((frame / 2) % 300);
      this.logoWrapperLeft.position.x = -300 + ((frame / 1.5) % 300);

      const openMouth = (BEAN + 1) % 12 < 6;
      for (let [i, logo] of this.commodoreLogos.entries()) {
        const openMyMyMouth = i % 2 == 0 ? openMouth : !openMouth;
        const rotation = openMyMyMouth ? Math.PI / 8 : 0;

        logo.upperBeak.rotation.z = rotation;
        logo.lowerBeak.rotation.z = -rotation;
      }

      for (let lines of this.commodoreLinesLeft) {
        for (let line of lines) {
          const path = line.path;
          path.material.uniforms.drawStart.value = easeIn(0, 1, (frame - startOfEnd) / speed);
          path.material.uniforms.drawEnd.value = easeOut(0, 1, (frame - startOfStart) / speed);
          path.material.uniforms.wobbliness.value = this.oomph;
        }
      }

      for (let lines of this.commodoreLinesRight) {
        for (let line of lines) {
          const path = line.path;
          path.material.uniforms.drawStart.value = easeIn(0, 1, (frame - startOfEnd) / speed);
          path.material.uniforms.drawEnd.value = easeOut(0, 1, (frame - startOfStart) / speed);
          path.material.uniforms.wobbliness.value = this.oomph;
        }
      }
    }
  }

  global.moose = moose;
})(this);

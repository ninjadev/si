(function(global) {
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
          color = new THREE.Color(color).multiplyScalar(0.5);
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

      const startFrame = 719;

      const startOfStart = 90;
      const startOfEnd = 120;
      const speed = 240;

      const startBean = 1308;
      const beanOffset = Math.floor((BEAN - startBean) / 3);

      //1308  1311 1314 1317
      if (BEAN < 1311) {
        this.logoWrapperRight.position.x = 600 - 90;
        this.logoWrapperLeft.position.x = -600 + 90;
      } else if (BEAN < 1314) {
        this.logoWrapperRight.position.x = 600 - 120;
        this.logoWrapperLeft.position.x = -600 + 120;
      } else if (BEAN < 1317) {
        this.logoWrapperRight.position.x = 600 - 150;
        this.logoWrapperLeft.position.x = -600 + 150;
      } else if (BEAN < 1320) {
        this.logoWrapperRight.position.x = 600 - 180;
        this.logoWrapperLeft.position.x = -600 + 180;

      } else {
        const this_frame_start = FRAME_FOR_BEAN(1320);
        this.logoWrapperRight.position.x = 600 - 180 - (frame - this_frame_start) - easeOut(0, 30, (frame - this_frame_start) / 30);
        this.logoWrapperLeft.position.x = -600 + 180 + (frame - this_frame_start) + easeOut(0, 30, (frame - this_frame_start) / 30);

      }

      const openMouth = (BEAN + 1) % 12 < 6;
      for (let [i, logo] of this.commodoreLogos.entries()) {
        const openMyMyMouth = i % 2 == 0 ? openMouth : !openMouth;
        const rotation = openMyMyMouth ? Math.PI / 8 : 0;

        //logo.upperBeak.rotation.z = rotation;
        //logo.lowerBeak.rotation.z = -rotation;
      }

      for (let lines of this.commodoreLinesLeft) {
        for (let line of lines) {
          const path = line.path;
          path.material.uniforms.drawStart.value = easeIn(0, 1, (frame - startFrame - startOfEnd) / speed);
          path.material.uniforms.drawEnd.value = easeOut(0, 1, (frame - startFrame - startOfStart) / speed);
          path.material.uniforms.wobbliness.value = this.oomph;
        }
      }

      for (let lines of this.commodoreLinesRight) {
        for (let line of lines) {
          const path = line.path;
          path.material.uniforms.drawStart.value = easeIn(0, 1, (frame - startFrame - startOfEnd) / speed);
          path.material.uniforms.drawEnd.value = easeOut(0, 1, (frame - startFrame - startOfStart) / speed);
          path.material.uniforms.wobbliness.value = this.oomph;
        }
      }
    }
  }

  global.moose = moose;
})(this);

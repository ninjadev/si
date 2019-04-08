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

    const directionSize = 2;

    const cee = new Path({
      directionSize,
      fillMap: Loader.loadTexture('res/paper.png'),
      fill: true,
    });

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

    const upperBeak = new Path({ directionSize });
    upperBeak.lineTo(0, C / 2);
    upperBeak.lineTo(E, C / 2);
    upperBeak.lineTo(E - C, - C / 2);
    upperBeak.lineTo(0, - C / 2);
    upperBeak.lineTo(0, C / 2);

    const lowerBeak = new Path({ directionSize });
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

  class MommaBird extends NIN.THREENode {
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
          let path = new Path({ directionSize: width, color });

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
      //this.scene.add(this.commodoreLinesWrapperLeft);
      this.commodoreLinesWrapperRight.rotation.y = Math.PI;
      //this.scene.add(this.commodoreLinesWrapperRight);

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
      //this.scene.add(this.logoWrapperLeft);
      this.logoWrapperRight.rotation.y = Math.PI;
      //this.scene.add(this.logoWrapperRight);

      this.chicks = [];
      this.chick1 = CommodoreLogo(25);
      this.chick2 = CommodoreLogo(25);
      this.chick3 = CommodoreLogo(25);

      this.mommaBird = CommodoreLogo(50);
      this.scene.add(this.mommaBird);

      this.nest = new Path({directionSize: 2});
      this.nest.lineTo(-40, -10);
      this.nest.lineTo(-20, -20);
      this.nest.lineTo(20, -20);
      this.nest.lineTo(40, -10);
      this.nest.lineTo(40, -11);
      this.nest.lineTo(33, -20);
      this.nest.lineTo(15, -28);
      this.nest.lineTo(-15, -28);
      this.nest.lineTo(-33, -20);
      this.nest.lineTo(-40, -10);
      this.nest.lineTo(-40, -11);
      this.nest.lineTo(-20, -23);
      this.nest.lineTo(0, -25);
      this.nest.lineTo(20, -23);
      this.nest.lineTo(40, -11);

      const nesto3d = this.nest.toObject3D();

      this.chickNest = new THREE.Object3D();
      this.chickNest.add(this.chick1);
      this.chickNest.add(this.chick2);
      this.chickNest.add(this.chick3);
      this.chickNest.add(nesto3d);
      this.scene.add(this.chickNest);

      this.chickNest.position.set(-70, -50, 0);

      function Scroller(text) {
        this.text = text;
        this.textCanvas = document.createElement('canvas');
        this.textCtx = this.textCanvas.getContext('2d');
        this.textCtx.font = 'bold 72px arial';

        const measure = this.textCtx.measureText(this.text);
        this.textCanvas.width = measure.width;
        this.textCanvas.height = 72;

        this.textCtx.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);
        this.textCtx.fillStyle = 'black';
        this.textCtx.font = 'bold 72px arial';
        this.textCtx.textAlign = 'center';
        this.textCtx.textBaseline = 'middle';
        this.textCtx.fillText(this.text, this.textCanvas.width / 2, this.textCanvas.height / 2);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.textCanvas.width;
        this.canvas.height = this.textCanvas.height;
        this.ctx = this.canvas.getContext('2d');

        this.ctx.drawImage(this.textCanvas, 0, 0);

        this.texture = new THREE.VideoTexture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.texture, transparent: true, });
        const geometry = new THREE.PlaneGeometry(100, 10, 64, 1);
        for(let i = 0; i < geometry.vertices.length; i++) {
          const vertex = geometry.vertices[i];
          vertex.originalY = vertex.y;
        }
        this.scrollerMesh = new THREE.Mesh(geometry, material);
      }

      this.NoScroller = new Scroller('NO SCROLLERS                JUST SOLSKOGEN');
      this.scene.add(this.NoScroller.scrollerMesh);

      this.LongestScroller = new Scroller('THIS IS THE LOOONGEST SCROLLER I COULD AFFORD');
      this.scene.add(this.LongestScroller.scrollerMesh);

      this.AmigaScroller = new Scroller('AMIGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      this.scene.add(this.AmigaScroller.scrollerMesh);

      this.NoScroller.scrollerMesh.position.set(-35, -5, 0);
      this.NoScroller.scrollerMesh.rotation.z = Math.PI / 5;

      this.LongestScroller.scrollerMesh.position.set(-15, -15, 0);
      this.LongestScroller.scrollerMesh.rotation.z = Math.PI / 4;

      this.AmigaScroller.scrollerMesh.position.set(-25, -10, -5);
      this.AmigaScroller.scrollerMesh.rotation.z = Math.PI / 5;
    }

    update(frame) {
      super.update(frame);

      if (BEAT && BEAN % 12 == 0) {
        this.oomph = 1.0;
      }
      this.oomph *= 0.95;

      this.chick1.position.z = -5;
      this.chick2.position.z = 10;
      this.chick3.position.z = -5;

      this.chick1.position.x = 13 - Math.sin(frame / 2);
      this.chick1.position.y = -6 + Math.sin(frame / 3);

      this.chick2.position.x = -Math.cos(frame / 2);
      this.chick2.position.y = 6 + Math.cos(frame / 3);

      this.chick3.position.x = -18 - Math.cos(frame / 2);
      this.chick3.position.y = -2 + Math.sin(frame / 3);

      this.chick1.rotation.x = Math.sin(frame / 10) / 3;
      this.chick2.rotation.x = Math.cos(frame / 5) / 3;
      this.chick3.rotation.x = Math.sin(frame / 12) / 3;

      this.chick1.rotation.y = Math.sin(frame / 10) / 3;
      this.chick2.rotation.y = Math.cos(frame / 5) / 3;
      this.chick3.rotation.y = Math.sin(frame / 12) / 3;

      let openMouth = BEAN % 6 < 3;
      this.chick1.upperBeak.rotation.z = openMouth ? Math.PI / 6 : 0;
      this.chick1.lowerBeak.rotation.z = openMouth ? -Math.PI / 6 : 0;

      openMouth = BEAN % 12 < 6;
      this.chick2.upperBeak.rotation.z = !openMouth ? Math.PI / 7 : 0;
      this.chick2.lowerBeak.rotation.z = !openMouth ? -Math.PI / 7 : 0;

      openMouth = BEAN % 8 < 4;
      this.chick3.upperBeak.rotation.z = openMouth ? Math.PI / 3 : 0;
      this.chick3.lowerBeak.rotation.z = openMouth ? -Math.PI / 3 : 0;

      const start = 1007;
      const mommaIsStationary = 180;

      this.chick1.rotation.z = lerp(Math.PI / 2, Math.PI / 3, (frame - start - mommaIsStationary) / 20);
      this.chick2.rotation.z = lerp(Math.PI / 2, Math.PI / 4, (frame - start - mommaIsStationary) / 30);
      this.chick3.rotation.z = lerp(Math.PI / 2, Math.PI / 5, (frame - start - mommaIsStationary) / 10);

      this.mommaBird.scale.x = 1 + 0.1 * this.oomph;
      this.mommaBird.scale.y = 1 + 0.2 * this.oomph;
      this.mommaBird.scale.z = 1 + 0.05 * this.oomph;

      let animationChainX;
      animationChainX = smoothstep(25, -200, (frame - 450 - start) / 150);
      animationChainX = smoothstep(35, animationChainX, (frame - 290 - start) / 120);
      animationChainX = smoothstep(100, animationChainX, (frame - 140 - start) / 60);
      animationChainX = smoothstep(-60, animationChainX, (frame - 90 - start) / 50);
      animationChainX = smoothstep(180, animationChainX, (frame - start) / 90);
      this.mommaBird.position.x = animationChainX;

      let animationChainY;
      animationChainY = smoothstep(30, 50, (frame - 450 - start) / 120);
      animationChainY = smoothstep(40, animationChainY, (frame - 290 - start) / 120);
      animationChainY = smoothstep(20, animationChainY, (frame - 140 - start) / 60);
      animationChainY = smoothstep(0, animationChainY, (frame - 100 - start) / 60);
      animationChainY = smoothstep(40, animationChainY, (frame - start) / 100);
      this.mommaBird.position.y = animationChainY;

      openMouth = BEAN % 2 == 0;
      this.mommaBird.upperBeak.rotation.z = openMouth ? Math.PI / 16 : 0;
      this.mommaBird.lowerBeak.rotation.z = openMouth ? -Math.PI / 32 : 0;

      let rotationChain;
      rotationChain = smoothstep(Math.PI + Math.PI / 4, Math.PI - Math.PI / 6, (frame - 420 - start) / 120);
      rotationChain = smoothstep(Math.PI - Math.PI / 6, rotationChain, (frame - start) / 180);
      this.mommaBird.rotation.z = rotationChain;


      // NO SCROLLERS
      this.NoScroller.texture.needsUpdate = true;
      for(let i = 0; i < this.NoScroller.scrollerMesh.geometry.vertices.length; i++) {
        const vertex = this.NoScroller.scrollerMesh.geometry.vertices[i];
        const x = i / 2 | 0;
        vertex.y = vertex.originalY + 2 * Math.sin(frame / 10 + x * Math.PI * 2 / 64 * 8);
      }
      this.NoScroller.scrollerMesh.geometry.verticesNeedUpdate = true;
      this.NoScroller.scrollerMesh.material.map.offset.x = lerp(
        -1, 1, (frame - mommaIsStationary - 40 - start) / (this.NoScroller.text.length * 7)
      );

      // LONGEST
      this.LongestScroller.texture.needsUpdate = true;
      for(let i = 0; i < this.LongestScroller.scrollerMesh.geometry.vertices.length; i++) {
        const vertex = this.LongestScroller.scrollerMesh.geometry.vertices[i];
        const x = i / 2 | 0;
        vertex.y = vertex.originalY + 2 * Math.sin(frame / 10 + x * Math.PI * 2 / 64 * 8);
      }
      this.LongestScroller.scrollerMesh.geometry.verticesNeedUpdate = true;
      this.LongestScroller.scrollerMesh.material.map.offset.x = lerp(
        -1, 1, (frame - mommaIsStationary - 20 - start) / (this.LongestScroller.text.length * 7)
      );


      // AMIGA
      this.AmigaScroller.texture.needsUpdate = true;
      for(let i = 0; i < this.AmigaScroller.scrollerMesh.geometry.vertices.length; i++) {
        const vertex = this.AmigaScroller.scrollerMesh.geometry.vertices[i];
        const x = i / 2 | 0;
        vertex.y = vertex.originalY + 2 * Math.sin(frame / 10 + x * Math.PI * 2 / 64 * 8);
      }
      this.AmigaScroller.scrollerMesh.geometry.verticesNeedUpdate = true;
      this.AmigaScroller.scrollerMesh.material.map.offset.x = lerp(
        -1, 1, (frame - mommaIsStationary - start) / (this.AmigaScroller.text.length * 10));
    }
  }

  global.MommaBird = MommaBird;
})(this);

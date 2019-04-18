(function(global) {
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

      this.oomph = 1.0;

      this.chicks = [];
      this.chick1 = CommodoreLogo(25, '#ffffff');
      this.chick2 = CommodoreLogo(25, '#ffffff');
      this.chick3 = CommodoreLogo(25, '#ffffff');

      this.mommaBird = CommodoreLogo(50, '#ffffff');
      this.scene.add(this.mommaBird);

      this.nest = new Path();
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
        const fontSize = GU * 2;
        const fontFamily = 'monospace';
        this.textCanvas = document.createElement('canvas');
        this.textCtx = this.textCanvas.getContext('2d');
        this.textCtx.font = `bold ${fontSize}px ${fontFamily}`;

        const measure = this.textCtx.measureText(this.text);
        this.textCanvas.width = measure.width + 2;
        this.textCanvas.height = fontSize;

        this.textCtx.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);
        this.textCtx.fillStyle = '#000000';
        this.textCtx.font = `bold ${fontSize}px ${fontFamily}`;
        this.textCtx.textAlign = 'center';
        this.textCtx.textBaseline = 'middle';
        this.textCtx.fillText(this.text, this.textCanvas.width / 2, this.textCanvas.height / 2);

        this.textCtx.clearRect(0, 0, 1, this.textCanvas.height);
        this.textCtx.clearRect(this.textCanvas.width - 1, 0, 1, this.textCanvas.height);

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.textCanvas.width;
        this.canvas.height = this.textCanvas.height;
        this.ctx = this.canvas.getContext('2d');

        this.ctx.drawImage(this.textCanvas, 0, 0);

        this.texture = new THREE.VideoTexture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
        const planeAspect = 100 / 10;
        const canvasAspect = this.canvas.width / this.canvas.height;
        this.texture.repeat.set(planeAspect / canvasAspect, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.texture, transparent: true, });
        const geometry = new THREE.PlaneGeometry(100, 10, 256, 1);
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

      this.AmigaScroller = new Scroller('AMIIIIGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
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
      this.chick1.upperBeaks[0].rotation.z = openMouth ? Math.PI / 6 : 0;
      this.chick1.upperBeaks[1].rotation.z = openMouth ? Math.PI / 6 : 0;
      this.chick1.lowerBeaks[0].rotation.z = openMouth ? -Math.PI / 6 : 0;
      this.chick1.lowerBeaks[1].rotation.z = openMouth ? -Math.PI / 6 : 0;

      openMouth = BEAN % 12 < 6;
      this.chick2.upperBeaks[0].rotation.z = !openMouth ? Math.PI / 7 : 0;
      this.chick2.upperBeaks[1].rotation.z = !openMouth ? Math.PI / 7 : 0;
      this.chick2.lowerBeaks[0].rotation.z = !openMouth ? -Math.PI / 7 : 0;
      this.chick2.lowerBeaks[1].rotation.z = !openMouth ? -Math.PI / 7 : 0;

      openMouth = BEAN % 8 < 4;
      this.chick3.upperBeaks[0].rotation.z = openMouth ? Math.PI / 3 : 0;
      this.chick3.upperBeaks[1].rotation.z = openMouth ? Math.PI / 3 : 0;
      this.chick3.lowerBeaks[0].rotation.z = openMouth ? -Math.PI / 3 : 0;
      this.chick3.lowerBeaks[1].rotation.z = openMouth ? -Math.PI / 3 : 0;

      const start = 7601;
      const mommaIsStationary = 50;
      const mommaLeaves = 120;
      const mommaLeavesDuration = 100;
      this.chick1.rotation.z = lerp(
        Math.PI / 2,
        lerp(
          Math.PI / 3,
          Math.PI / 2,
          (frame - start - mommaIsStationary - mommaLeaves - 40) / 20),
        (frame - start - mommaIsStationary) / 20);
      this.chick2.rotation.z = lerp(
        Math.PI / 2,
        lerp(
          Math.PI / 4,
          Math.PI / 2,
          (frame - start - mommaIsStationary - mommaLeaves - 40) / 30),
        (frame - start - mommaIsStationary) / 30);
      this.chick3.rotation.z = lerp(
        Math.PI / 2,
        lerp(
          Math.PI / 5,
          Math.PI / 2,
          (frame - start - mommaIsStationary - mommaLeaves - 40) / 10),
        (frame - start - mommaIsStationary) / 10);

      this.mommaBird.scale.x = 1 + 0.1 * this.oomph;
      this.mommaBird.scale.y = 1 + 0.2 * this.oomph;
      this.mommaBird.scale.z = 1 + 0.05 * this.oomph;

      let animationChainX;
      animationChainX = smoothstep(35, -200, (frame - mommaIsStationary - mommaLeaves - start) / mommaLeavesDuration);
      //animationChainX = smoothstep(35, animationChainX, (frame - 90 - start) / 120);
      //animationChainX = smoothstep(100, animationChainX, (frame - 140 - start) / 60);
      //animationChainX = smoothstep(-60, animationChainX, (frame - 90 - start) / 50);
      animationChainX = smoothstep(180, animationChainX, (frame - start) / 60);
      this.mommaBird.position.x = animationChainX;

      let animationChainY;
      animationChainY = smoothstep(40, 50, (frame - mommaIsStationary - mommaLeaves - start) / mommaLeavesDuration);
      //animationChainY = smoothstep(40, animationChainY, (frame - 90 - start) / 120);
      //animationChainY = smoothstep(20, animationChainY, (frame - 140 - start) / 60);
      //animationChainY = smoothstep(0, animationChainY, (frame - 100 - start) / 60);
      animationChainY = smoothstep(40, animationChainY, (frame - start) / 60);
      this.mommaBird.position.y = animationChainY;

      openMouth = BEAN % 2 == 0;
      this.mommaBird.upperBeaks[0].rotation.z = openMouth ? Math.PI / 16 : 0;
      this.mommaBird.upperBeaks[1].rotation.z = openMouth ? Math.PI / 16 : 0;
      this.mommaBird.lowerBeaks[0].rotation.z = openMouth ? -Math.PI / 32 : 0;
      this.mommaBird.lowerBeaks[1].rotation.z = openMouth ? -Math.PI / 32 : 0;

      let rotationChain;
      rotationChain = smoothstep(
        Math.PI + Math.PI / 4,
        Math.PI - Math.PI / 6,
        (frame - mommaIsStationary - mommaLeaves - start) / mommaLeavesDuration);
      rotationChain = smoothstep(Math.PI - Math.PI / 6, rotationChain, (frame - start) / 60);
      this.mommaBird.rotation.z = rotationChain;

      // NO SCROLLERS
      this.NoScroller.texture.needsUpdate = true;
      const length = this.NoScroller.scrollerMesh.geometry.vertices.length;
      for(let i = 0; i < length; i++) {
        const vertex = this.NoScroller.scrollerMesh.geometry.vertices[i];
        const x = i / 2 | 0;
        vertex.y = vertex.originalY + 4 * Math.sin(frame / 10 + x * Math.PI * 2 / length * 8);
      }
      this.NoScroller.scrollerMesh.geometry.verticesNeedUpdate = true;
      this.NoScroller.scrollerMesh.material.map.offset.x = lerp(
        -1, 1, (frame - mommaIsStationary - 40 - start) / (this.NoScroller.text.length * 3.));

      // LONGEST
      this.LongestScroller.texture.needsUpdate = true;
      for(let i = 0; i < this.LongestScroller.scrollerMesh.geometry.vertices.length; i++) {
        const vertex = this.LongestScroller.scrollerMesh.geometry.vertices[i];
        const x = i / 2 | 0;
        vertex.y = vertex.originalY + 4 * Math.sin(frame / 10 + x * Math.PI * 2 / length * 8);
      }
      this.LongestScroller.scrollerMesh.geometry.verticesNeedUpdate = true;
      this.LongestScroller.scrollerMesh.material.map.offset.x = lerp(
        -1, 1, (frame - mommaIsStationary - 20 - start) / (this.LongestScroller.text.length * 3.5)
      );


      // AMIGA
      this.AmigaScroller.texture.needsUpdate = true;
      for(let i = 0; i < this.AmigaScroller.scrollerMesh.geometry.vertices.length; i++) {
        const vertex = this.AmigaScroller.scrollerMesh.geometry.vertices[i];
        const x = i / 2 | 0;
        vertex.y = vertex.originalY + 4 * Math.sin(frame / 10 + x * Math.PI * 2 / length * 8);
      }
      this.AmigaScroller.scrollerMesh.geometry.verticesNeedUpdate = true;
      this.AmigaScroller.scrollerMesh.material.map.offset.x = lerp(
        -1, 1, (frame - mommaIsStationary - start) / (this.AmigaScroller.text.length * 4.5));
    }
  }

  global.MommaBird = MommaBird;
})(this);

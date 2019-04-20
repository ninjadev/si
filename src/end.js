(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class end extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });
      let path;
      let line;

      this.cameraX = 0;
      this.cameraY = 0;
      this.cameraDX = 0;
      this.cameraDY = 0;
      this.cameraDDX = 0;
      this.cameraDDY = 0;

      this.flat = XWrite('FLAT');
      this.scene.add(this.flat);
      this.shade = XWrite('SHADE');
      this.scene.add(this.shade);
      this.society = XWrite('SOCIETY');
      this.scene.add(this.society);

      this.camera.position.z = 300;
      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: Loader.loadTexture('res/paper.png'),
          side: THREE.BackSide,
        }));
      this.wall.material.map.repeat.set(4, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
    }

    warmup(renderer) {
      this.update(8924);
      this.update(renderer);
    }

    update(frame) {
      super.update(frame);
      let startBEAN = 1464;
      let startFrame = FRAME_FOR_BEAN(startBEAN);

      this.flat.scale.set(0, 0, 0);
      this.flat.position.set(0, -30, 0);
      this.shade.scale.set(0, 0, 0);
      this.shade.position.set(0, 0, 0);
      this.society.scale.set(0, 0, 0);
      this.society.position.set(0, 30, 0);

      this.cameraDDX += -this.cameraDX * 1.6 + (Math.random() - 0.5) * smoothstep(0, 1, (frame-startFrame)/100)/4;
      this.cameraDDY += -this.cameraDY * 1.6 + (Math.random() - 0.5) * smoothstep(0, 1, (frame-startFrame)/100)/4;
      this.cameraDX = - this.cameraX * 0.5;
      this.cameraDY = - this.cameraY * 0.5;
      this.cameraDX *= 0.5;
      this.cameraDY *= 0.5;
      this.cameraDX += this.cameraDDX;
      this.cameraDY += this.cameraDDY;
      this.cameraX += this.cameraDX;
      this.cameraY += this.cameraDY;
      this.cameraX *= 0.5;
      this.cameraY *= 0.5;

      if (BEAN >= startBEAN + 7) {
        let s = easeIn(0, 1, F(frame, startBEAN + 7, 3));
        this.flat.scale.set(s, s, s);
        this.flat.position.set(this.cameraX, 30 + this.cameraY, 0);
      }
      if (BEAN >= startBEAN + 10) {
        let s = easeIn(0, 1, F(frame, startBEAN + 10, 3));
        this.shade.scale.set(s, s, s);
        this.shade.position.set(this.cameraX, this.cameraY, 0);
      }
      if (BEAN >= startBEAN + 14) {
        let s = easeIn(0, 1, F(frame, startBEAN + 14, 3));
        this.society.scale.set(s, s, s);
        this.society.position.set(this.cameraX, -30 + this.cameraY, 0);
      }
    }
  }

  global.end = end;
})(this);

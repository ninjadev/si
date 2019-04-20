(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class diagonals extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];
      this.ticks = [];

      for (let i = 0; i < 30; i++) {
        const path = new Path();
        const x = -350 + i * 20;
        const y = -100;
        path.lineTo(x, y);
        path.lineTo(x + 200, y + 200);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      }

      const localRandom = window.Random(1234);

      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 110; j++) {
          const path = new Path();
          const offset = j * 3 + (localRandom() * 2 | 0);
          const x = -170 + offset;
          const y = -400 + i * 40 + offset;
          path.lineTo(x, y);
          path.lineTo(x + 10, y - 10);
          const line = path.toObject3D();
          this.ticks.push(line);
          this.scene.add(line);
          line.path = path;
        }
      }

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
    }

    warmup(renderer) {
      this.update(5733);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      // Time shift used only on the map scene
      if (frame > FRAME_FOR_BEAN(330) && frame <= FRAME_FOR_BEAN(408)) {
        frame = frame + FRAME_FOR_BEAN(24 * 39) - 100 - FRAME_FOR_BEAN(340);
      }

      const startFrame = FRAME_FOR_BEAN(24 * 39) - 100;

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 5) / (100 - i * 3));
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.ticks.length; i++) {
        const path = this.ticks[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(
          0, 1,
          F(frame, 948 + ((i / 110 | 0) - 5) * 1.5 - 2, 0));
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.diagonals = diagonals;
})(this);

(function(global) {
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

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(48 * 17);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 5) / (100 - i * 3));
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.ticks.length; i++) {
        const path = this.ticks[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - 90 - i / 10) / 20);
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.diagonals = diagonals;
})(this);

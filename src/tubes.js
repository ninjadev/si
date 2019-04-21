(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class tubes extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.dots = [];
      this.lines = [];

      for (let i=0; i < 10; i++) {
        for (let j=0; j < 10; j++) {
          const x = -160 + i * 35;
          const y = -160 + j * 35;

          const dot = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 1),
            new THREE.MeshBasicMaterial({color: 0x000000}));
          dot.position.x = x;
          dot.position.y = y;
          this.scene.add(dot);
          this.dots.push(dot);

          (() => {
            const offset = (i % 2 == j % 2) ? 5 : -5;
            const path = new Path();
            path.lineTo(x - 5, y + offset);
            path.lineTo(-120 + i * 35, y + offset);
            const line = path.toObject3D();
            this.lines.push(line);
            this.scene.add(line);
            line.path = path;
          })();

          (() => {
            const offset = (j % 2 != i % 2) ? 5 : -5;
            const path = new Path();
            path.lineTo(x + offset, y - 5);
            path.lineTo(x + offset, -120 + j * 35);
            const line = path.toObject3D();
            this.lines.push(line);
            this.scene.add(line);
            line.path = path;
          })();
        }
      }

      this.camera.position.z = 200;
      this.camera.rotation.z = -Math.PI / 4;

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
      this.update(3002);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(498);

      for (let i = 0; i < this.dots.length; i++) {
        const dot = this.dots[i];
        dot.scale.setScalar(easeOut(0, 1, F(frame, 498, 1)));
        //dot.scale.setScalar(easeOut(0, 1, (frame - startFrame + i * 3) / 10));
      }

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = lerp(0.5, 0, F(frame, 498, 1));
        path.material.uniforms.drawEnd.value = lerp(0.5, 1, F(frame, 498, 1));
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.tubes = tubes;
})(this);

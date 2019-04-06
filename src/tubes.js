(function(global) {
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
            path.lineTo(x, y + offset);
            path.lineTo(-125 + i * 35, y + offset);
            const line = path.toObject3D();
            this.lines.push(line);
            this.scene.add(line);
            line.path = path;
          })();

          (() => {
            const offset = (j % 2 != i % 2) ? 5 : -5;
            const path = new Path();
            path.lineTo(x + offset, y);
            path.lineTo(x + offset, -125 + j * 35);
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
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(48 * 17 + 36);

      for (let i = 0; i < this.dots.length; i++) {
        const dot = this.dots[i];
        dot.scale.setScalar(easeOut(0, 1, (frame - startFrame + i * 3) / 100));
      }

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = lerp(0.3, 0, (frame - startFrame - i) / 20);
        path.material.uniforms.drawEnd.value = lerp(0.3, 1, (frame - startFrame - i) / 80);
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.tubes = tubes;
})(this);

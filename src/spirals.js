(function(global) {
  class spirals extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.grid = [];
      this.lines = [];

      for (let i=0; i < 2; i++) {
        for (let j=0; j < 2; j++) {
          (() => {
            const path = new Path();
            path.lineTo(-50 + 100 * i, -200);
            path.lineTo(-50 + 100 * i, 200);
            const line = path.toObject3D();
            this.grid.push(line);
            this.scene.add(line);
            line.path = path;
          })();

          (() => {
            const path = new Path();
            path.lineTo(-200, -28 + 56 * j);
            path.lineTo(200, -28 + 56 * j);
            const line = path.toObject3D();
            this.grid.push(line);
            this.scene.add(line);
            line.path = path;
          })();
        }
      }

      for (let i=0; i < 3; i++) {
        for (let j=0; j < 3; j++) {
          const path = new Path();
          path.lineTo(-145 + 100 * i, -33 + 56 * j);
          path.lineTo(-145 + 100 * i, -79 + 56 * j);
          path.lineTo(-55 + 100 * i, -79 + 56 * j);
          path.lineTo(-55 + 100 * i, -33 + 56 * j);
          path.lineTo(-140 + 100 * i, -33 + 56 * j);
          path.lineTo(-140 + 100 * i, -74 + 56 * j);
          path.lineTo(-60 + 100 * i, -74 + 56 * j);
          path.lineTo(-60 + 100 * i, -38 + 56 * j);
          path.lineTo(-135 + 100 * i, -38 + 56 * j);
          path.lineTo(-135 + 100 * i, -69 + 56 * j);
          path.lineTo(-65 + 100 * i, -69 + 56 * j);
          path.lineTo(-65 + 100 * i, -43 + 56 * j);
          path.lineTo(-130 + 100 * i, -43 + 56 * j);
          path.lineTo(-130 + 100 * i, -64 + 56 * j);
          path.lineTo(-70 + 100 * i, -64 + 56 * j);
          path.lineTo(-70 + 100 * i, -48 + 56 * j);
          path.lineTo(-125 + 100 * i, -48 + 56 * j);
          path.lineTo(-125 + 100 * i, -59 + 56 * j);
          path.lineTo(-75 + 100 * i, -59 + 56 * j);
          path.lineTo(-75 + 100 * i, -53 + 56 * j);
          path.lineTo(-120 + 100 * i, -53 + 56 * j);
          const line = path.toObject3D();
          this.lines.push(line);
          this.scene.add(line);
          line.path = path;
        }
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      for (const gridline of this.grid) {
        const path = gridline.path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value =  2 * Math.sin(frame / 100) + 0.5;
      }

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = 2 * Math.sin(frame / 200 + 5) + 1;
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.spirals = spirals;
})(this);

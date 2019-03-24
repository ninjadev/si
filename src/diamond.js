(function(global) {
  class diamond extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      (() => {
        const path = new Path();
        path.lineTo(0, -70);
        path.lineTo(0, 70);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      })();

      (() => {
        const path = new Path();
        path.lineTo(-70, 0);
        path.lineTo(70, 0);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      })();

      (() => {
        const path = new Path();
        path.lineTo(-70, 0);
        path.lineTo(0, 70);
        path.lineTo(70, 0);
        path.lineTo(0, -70);
        path.lineTo(-70, 0);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      })();

      (() => {
        const path = new Path();
        path.lineTo(0, 70);
        path.lineTo(5, 0);
        path.lineTo(0, -70);
        path.lineTo(10, 0);
        path.lineTo(0, 70);
        path.lineTo(15, 0);
        path.lineTo(0, -70);
        path.lineTo(20, 0);
        path.lineTo(0, 70);
        path.lineTo(25, 0);
        path.lineTo(0, -70);
        path.lineTo(30, 0);
        path.lineTo(0, 70);
        path.lineTo(35, 0);
        path.lineTo(0, -70);
        path.lineTo(40, 0);
        path.lineTo(0, 70);
        path.lineTo(45, 0);
        path.lineTo(0, -70);
        path.lineTo(50, 0);
        path.lineTo(0, 70);
        path.lineTo(55, 0);
        path.lineTo(0, -70);
        path.lineTo(60, 0);
        path.lineTo(0, 70);
        path.lineTo(65, 0);
        path.lineTo(0, -70);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      })();

      (() => {
        const path = new Path();
        path.lineTo(0, 70);
        path.lineTo(-5, 0);
        path.lineTo(0, -70);
        path.lineTo(-10, 0);
        path.lineTo(0, 70);
        path.lineTo(-15, 0);
        path.lineTo(0, -70);
        path.lineTo(-20, 0);
        path.lineTo(0, 70);
        path.lineTo(-25, 0);
        path.lineTo(0, -70);
        path.lineTo(-30, 0);
        path.lineTo(0, 70);
        path.lineTo(-35, 0);
        path.lineTo(0, -70);
        path.lineTo(-40, 0);
        path.lineTo(0, 70);
        path.lineTo(-45, 0);
        path.lineTo(0, -70);
        path.lineTo(-50, 0);
        path.lineTo(0, 70);
        path.lineTo(-55, 0);
        path.lineTo(0, -70);
        path.lineTo(-60, 0);
        path.lineTo(0, 70);
        path.lineTo(-65, 0);
        path.lineTo(0, -70);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      })();

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value =  2 * Math.sin(frame / 100 - i * 0.01) + 0.5 + 0.5 * Math.sin(i);
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.diamond = diamond;
})(this);

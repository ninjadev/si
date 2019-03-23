(function(global) {

  class boxes extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      for (let i=0; i < 30; i++) {
        for (let k=0; k < 2; k++) {
          const x = i * 15 + k * 10 - 200;
          const y = i * 5 - 150;
          const extrapath = new Path({debug: false});
          extrapath.lineTo(0, 0);
          for (let j=0; j < 15; j++) {
            extrapath.lineTo(5 + j*5, 5 + j*15);
            extrapath.lineTo(5 + j*5, 15 + j*15);
          }
          const extraline = extrapath.toObject3D();
          this.lines.push(extraline);
          this.scene.add(extraline);
          extraline.position.x = x;
          extraline.position.y = y;
          extraline.path = extrapath;
        }
      }

      for (let i=0; i < 30; i++) {
        for (let j=0; j < 20; j++) {
          const path = new Path();
          path.lineTo(5, 5);
          path.lineTo(25, 5);
          const line = path.toObject3D();
          this.lines.push(line);
          this.scene.add(line);
          line.position.x = i*5 + j * 15 - 200;
          line.position.y = i*15 + j * 5 - 150;
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
      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value =  2 * Math.sin(frame / 100 - i * 0.01) + 0.5 + 0.5 * Math.sin(i);
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.position.x = ((frame / 10) % 100) - 50;
      this.camera.position.y = ((frame / 20) % 100) - 50;
    }
  }

  global.boxes = boxes;
})(this);
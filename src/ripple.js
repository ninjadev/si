(function(global) {
  class ripple extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      for (let i = 0; i < 30; i++) {
        const x = 0;
        const y = 5 + 10 * i;
        const path = new Path();
        path.lineTo(x, y);
        path.lineTo(x + 5, y);
        path.lineTo(x + 5, y - 5);
        for (let j = 0; j < 1 + i * 2; j++) {
          path.lineTo(x + 10 + j * 5, y - 5 - j * 5);
          path.lineTo(x + 10 + j * 5, y - 10 - j * 5);
        }
        for (let j = 0; j < 1 + i * 2; j++) {
          path.lineTo(x + 5 + i * 10 - j * 5, y - 10 - i * 10 - j * 5);
          path.lineTo(x + 5 + i * 10 - j * 5, y - 15 - i * 10 - j * 5);
        }
        path.lineTo(x, y - 15 - i * 20);
        path.lineTo(x, y - 10 - i * 20);
        for (let j = 0; j < 1 + i * 2; j++) {
          path.lineTo(x - 5 - j * 5, y - 10 - i * 20 + j * 5);
          path.lineTo(x - 5 - j * 5, y - 5 - i * 20 + j * 5);
        }
        for (let j = 0; j < 1 + i * 2; j++) {
          path.lineTo(x - i * 10 + j * 5, y - 5 - i * 10 + j * 5);
          path.lineTo(x - i * 10 + j * 5, y - i * 10 + j * 5);
        }
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({map: Loader.loadTexture('res/paper.png')}));
      this.wall.material.map.repeat.set(16, 16);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(48 * 25 + 24);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = lerp(0.5, 0, (frame - startFrame - i * 3) / 25);
        path.material.uniforms.drawEnd.value = lerp(0.5, 1, (frame - startFrame - i * 3) / 25);
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.rotation.z = (frame - startFrame) / 500;
      this.camera.position.z = easeOut(50, 280, (frame - startFrame) / 250);
    }
  }

  global.ripple = ripple;
})(this);

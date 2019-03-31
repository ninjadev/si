(function(global) {
  class gems extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
          const path = new Path();
          path.lineTo(-10, 0);
          path.lineTo(0, 10);
          path.lineTo(10, 0);
          path.lineTo(0, -10);
          path.lineTo(-10, 0);
          const line = path.toObject3D();
          line.position.x = -150 + i * 30;
          line.position.y = -90 + j * 30;
          this.lines.push(line);
          this.scene.add(line);
          line.path = path;
          line.initialY = line.position.y;
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

      const startFrame = FRAME_FOR_BEAN(48 * 4);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 2) / 100);
        path.material.uniforms.wobbliness.value = 1;

        const line = this.lines[i];
        line.position.y = line.initialY - easeIn(0, 270, (frame - startFrame - 200 - i * 2) / 70);
      }
    }
  }

  global.gems = gems;
})(this);

(function(global) {
  class stairs extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      for (let i = 0; i < 50; i++) {
        const x = -150;
        const y = -380;
        const path = new Path();
        path.lineTo(x, y + i * 10);
        for (let j = 0; j < 120; j++) {
          path.lineTo(x + j * 5 + 5, y + i * 10 + j * 5);
          path.lineTo(x + j * 5 + 5, y + i * 10 + j * 5 + 5);
        }
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
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

      const startFrame = FRAME_FOR_BEAN(48 * 24) + 150;

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame + i * 12) / (900 - i * 6));
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.rotation.z = frame / 500;
      this.camera.position.z = 150 + 50 * Math.sin(frame / 1000);
    }
  }

  global.stairs = stairs;
})(this);

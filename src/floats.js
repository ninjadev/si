(function(global) {
  class floats extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      const localRandom = window.Random(3);

      for (let i = 0; i < 50; i++) {
        const x = -150 + (i % 10) * 40 + localRandom() * 10;
        const y = -80 + ((i / 10) | 0) * 40 + localRandom() * 10;
        const path = new Path();
        path.lineTo(0, 0);
        path.lineTo(20, 0);
        path.lineTo(20, 10);
        path.lineTo(0, 10);
        path.lineTo(0, 0);
        const line = path.toObject3D();
        line.position.x = x;
        line.position.y = y;
        line.rotation.z = localRandom() * Math.PI * 2;
        this.lines.push(line);
        this.scene.add(line);
        line.path = path;
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

      const startFrame = FRAME_FOR_BEAN(24 * 37);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 3) / (60 - i));
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.floats = floats;
})(this);

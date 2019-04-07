(function(global) {
  class starterkit extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.logo = new Path();
      const scale = 15;
      const steps = 128;
      for(let i = 0; i <= steps; i++) {
        const r = 20 * Math.sin(i / steps * 3 * Math.PI * 2);
        const x = r * Math.cos(i / steps * Math.PI * 2);
        const y = r * Math.sin(i / steps * Math.PI * 2);
        this.logo.lineTo(x, y);
      }
      let mesh = this.logo.toObject3D();
      mesh.scale.set(1 / scale, 1 / scale, 1 / scale);
      this.scene.add(mesh);

      this.camera.position.z = 8;
    }

    update(frame) {
      super.update(frame);
    }
  }

  global.starterkit = starterkit;
})(this);

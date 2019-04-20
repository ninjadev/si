(function(global) {
  class infoOutro extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50),
                                 new THREE.MeshStandardMaterial());
      this.scene.add(this.cube);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;

      /*
      this.solskogen = XWrite('SOLSKOGEN 2019');
      this.dateRange = XWrite('JULY 12TH to JULY 14TH');
      this.flateby = XWrite('FLATEBY, NORWAY');

      this.scene.add(this.solskogen);
      this.scene.add(this.dateRange);
      this.scene.add(this.flateby);
       */
    }

    update(frame) {
      super.update(frame);

      this.cube.rotation.x = Math.sin(frame / 50);
      this.cube.rotation.y = Math.cos(frame / 50);
    }
  }

  global.infoOutro = infoOutro;
})(this);

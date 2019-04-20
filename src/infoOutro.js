(function(global) {
  class infoOutro extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.camera.position.z = 100;

      this.color = new THREE.Vector3(255, 255, 255);
      const pathOptions = {color: this.color};

      this.sceneWrapper = new THREE.Object3D();

      this.logo = new Path(pathOptions);
      const scale = 15;
      const steps = 128;
      for (let i = 0; i <= steps; i++) {
        const r = 35;
        const x = r * Math.cos(i / steps * Math.PI * 2 * 0.5);
        const y = r * Math.sin(i / steps * Math.PI * 2 * 0.5);
        this.logo.lineTo(x, y);
      }
      let mesh = this.logo.toObject3D();
      mesh.scale.set(1 / scale, 1 / scale, 1 / scale);
      this.sceneWrapper.add(mesh);

      this.flatWord = XWrite('FLAT');
      this.shadeWord = XWrite('SHADE');
      this.societyWord = XWrite('SOCIETY');

      this.solskogenWord = XWrite('SOLSKOGEN 2019');
      this.dateRangeWord = XWrite('JULY 12TH to JULY 14TH');
      this.flatebyWord = XWrite('FLATEBY, NORWAY');

      this.sceneWrapper.add(this.flatWord);
      this.sceneWrapper.add(this.shadeWord);
      this.sceneWrapper.add(this.societyWord);
      this.sceneWrapper.add(this.solskogenWord);
      this.sceneWrapper.add(this.dateRangeWord);
      this.sceneWrapper.add(this.flatebyWord);

      const wordScale = 0.02;
      this.flatWord.scale.set(wordScale, wordScale, wordScale);
      this.shadeWord.scale.set(wordScale, wordScale, wordScale);
      this.societyWord.scale.set(wordScale, wordScale, wordScale);
      this.solskogenWord.scale.set(wordScale, wordScale, wordScale);
      this.dateRangeWord.scale.set(wordScale, wordScale, wordScale);
      this.flatebyWord.scale.set(wordScale, wordScale, wordScale);

      this.flatWord.position.x = 0;
      this.flatWord.position.y = 1.6;

      this.shadeWord.position.x = 0;
      this.shadeWord.position.y = 0.3 + (1.6 - .3) / 2;

      this.societyWord.position.y = 0.3;

      this.solskogenWord.position.y = -2;

      this.dateRangeWord.position.y = -2.75;

      this.flatebyWord.position.y = -3.5;

      let path = new Path();
      path.lineTo(-3, 0);
      path.lineTo(3, 0);
      this.line1 = path.line = path.toObject3D();
      this.line1.path = path;
      this.line1.scale.set(1, .05, 1);
      this.sceneWrapper.add(this.line1);

      path = new Path(pathOptions);
      path.lineTo(-2.25, 0);
      path.lineTo(2.25, 0);
      this.line2 = path.line = path.toObject3D();
      this.line2.path = path;
      this.line2.scale.set(1, .05, 1);
      this.sceneWrapper.add(this.line2);

      path = new Path(pathOptions);
      path.lineTo(-1.5, 0);
      path.lineTo(1.5, 0);
      this.line3 = path.line = path.toObject3D();
      this.line3.path = path;
      this.line3.scale.set(1, .05, 1);
      this.sceneWrapper.add(this.line3);

      this.line1.position.y = -0.25;
      this.line2.position.y = -0.25 * 2;
      this.line3.position.y = -0.25 * 3;

      this.scene.add(this.sceneWrapper);
      this.sceneWrapper.position.y = 10;

      this.sceneWrapper.scale.set(10, 10, 10)
    }

    update(frame) {
      super.update(frame);

      const words = [
        'flatWord', 'shadeWord', 'societyWord', 'solskogenWord', 'dateRangeWord', 'flatebyWord'
      ];
      for (let word of words) {
        for (let i = 0; i < this[word].paths.length; i++) {
          const path = this[word].paths[i];
          path.material.uniforms.color.value = this.color;
        }
      }
    }
  }

  global.infoOutro = infoOutro;
})(this);

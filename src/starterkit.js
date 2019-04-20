(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class starterkit extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.sceneWrapper = new THREE.Object3D();

      this.logo = new Path();
      const scale = 15;
      const steps = 128;
      for(let i = 0; i <= steps; i++) {
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

      this.sceneWrapper.add(this.flatWord);
      this.sceneWrapper.add(this.shadeWord);
      this.sceneWrapper.add(this.societyWord);

      const wordScale = 0.02;
      this.flatWord.scale.set(wordScale, wordScale, wordScale);
      this.shadeWord.scale.set(wordScale, wordScale, wordScale);
      this.societyWord.scale.set(wordScale, wordScale, wordScale);

      this.flatWord.position.x = 0;
      this.flatWord.position.y = 1.6;

      this.shadeWord.position.x = 0;
      this.shadeWord.position.y = 0.3 + (1.6 - .3) / 2;

      this.societyWord.position.y = 0.3;

      let path = new Path();
      path.lineTo(-3, 0);
      path.lineTo(3, 0);
      this.line1 = path.line = path.toObject3D();
      this.line1.path = path;
      this.line1.scale.set(1, .05, 1);
      this.sceneWrapper.add(this.line1);

      path = new Path();
      path.lineTo(-2.25, 0);
      path.lineTo(2.25, 0);
      this.line2 = path.line = path.toObject3D();
      this.line2.path = path;
      this.line2.scale.set(1, .05, 1);
      this.sceneWrapper.add(this.line2);

      path = new Path();
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
      this.sceneWrapper.position.y = -0.75;

      this.camera.position.z = 8;

    }

    warmup(renderer) {
      this.update(599);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      for(let i = 0; i < this.flatWord.paths.length; i++) {
        const flatAnimator = easeOut(0, 1, F(frame, 84 + 3 + i / 4, 1 + i / 4));
        const path = this.flatWord.paths[i];
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = flatAnimator;
      }

      for(let i = 0; i < this.shadeWord.paths.length; i++) {
        const shadeAnimator = easeOut(0, 1, F(frame, 84 + 3 + 3 + i / 4, 1 + i / 4));
        const path = this.shadeWord.paths[i];
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = shadeAnimator;
      }

      for(let i = 0; i < this.societyWord.paths.length; i++) {
        const societyAnimator = easeOut(0, 1, F(frame, 84 + 3 + 3 + 4 + i / 4, 1 + i / 4));
        const path = this.societyWord.paths[i];
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = societyAnimator;
      }

    }
  }

  global.starterkit = starterkit;
})(this);

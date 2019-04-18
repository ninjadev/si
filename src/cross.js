(function(global) {
  class cross extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.verticals = [];
      this.horizontals = [];

      this.fillerz = [];
      const shap = new THREE.Shape();
      shap.lineTo(0, 0);
      shap.lineTo(5, 0);
      shap.lineTo(5, 5);
      shap.lineTo(10, 5);
      shap.lineTo(10, 0);
      shap.lineTo(15, 0);
      shap.lineTo(15, -5);
      shap.lineTo(10, -5);
      shap.lineTo(10, -10);
      shap.lineTo(5, -10);
      shap.lineTo(5, -5);
      shap.lineTo(0, -5);
      shap.lineTo(0, 0);
      const geom = new THREE.ShapeGeometry(shap);
      const iin = 10;
      const jjn = 10;
      const kkn = 5;
      const colors = [
        0x7f7fff,
        0,
        0xffffff,
        0,
        0xffffff,
        0x7f7fff,
        0xffffff,
        0,
        0xffffff,
        0,
      ];
      for(let i = 0; i < iin; i++) {
        for(let j = 0; j < jjn; j++) {
          for(let k = 0; k < kkn; k++) {
            const filler = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
              color: colors[(k + (i % 2) * 5 + (j % 2) * 5) % 10],
            }));
            this.fillerz.push(filler);
            this.scene.add(filler);
            filler.position.y = 10 * k + 5 + 25 * (i - iin / 2 |0);
            filler.position.x = -5 * k + 25 * (j - jjn / 2 | 0);

            filler.kk = k;
          }
        }
      }

      for (let i = 0; i < 70; i++) {
        const x = -345;
        const y = 165;
        const path = new Path();
        path.lineTo(x + i * 10, y + i * 5);
        for (let j = 0; j < 80; j++) {
          path.lineTo(x + i * 10 + j * 5, y + i * 5 - j * 10);
          path.lineTo(x + i * 10 + j * 5 + 5, y + i * 5 - j * 10);
        }
        const line = path.toObject3D();
        this.verticals.push(line);
        this.scene.add(line);
        line.path = path;
      }

      for (let i = 0; i < 90; i++) {
        const x = -325;
        const y = -285;
        const path = new Path();
        path.lineTo(x + i * 5, y + i * 15);
        for (let j = 0; j < 90; j++) {
          path.lineTo(x + i * 5 + j * 10, y + i * 15 + j * 5 + 5);
          path.lineTo(x + i * 5 + j * 10 + 10, y + i * 15 + j * 5 + 5);
        }
        const line = path.toObject3D();
        this.horizontals.push(line);
        this.scene.add(line);
        line.path = path;
      }

      this.camera.position.z = 120;

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

      for(let i = 0; i < this.fillerz.length; i++) {
        if (BEAN >= 246 - 1 && this.fillerz[i].kk == 0) {
          this.fillerz[i].visible = true;
        } else if(BEAN >= 246 + 12 + 3) {
          //this.fillerz[i].visible = true;
        } else {
          this.fillerz[i].visible = false;
        }
      }

      // Time shift used only on the map scene
      if (frame > FRAME_FOR_BEAN(330) && frame <= FRAME_FOR_BEAN(408)) {
        // Tune this final number to get timing
        frame = frame + FRAME_FOR_BEAN(24 * 41) - FRAME_FOR_BEAN(365);
      }

      const startFrame = FRAME_FOR_BEAN(24 * 9);

      for (let i = 0; i < this.verticals.length; i++) {
        const path = this.verticals[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame + 100 + i * 2) / 150);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.horizontals.length; i++) {
        const path = this.horizontals[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame + i * 4) / (400 - i * 4));
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.rotation.z = frame / 180;

      this.camera.position.z = 120;
      if(BEAN >= 258) {
        this.camera.position.z = 80;
      }
    }
  }

  global.cross = cross;
})(this);

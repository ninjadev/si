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
      this.otherlines = [];

      const scali = 1.5;

      for (let i=0; i < 30; i++) {
        for (let k=0; k < 2; k++) {
          const x = (i * 15 + k * 10 - 200) * scali;
          const y = (i * 5 - 150) * scali;
          const extrapath = new Path({debug: false});
          extrapath.lineTo(0, 0);
          for (let j=0; j < 20; j++) {
            extrapath.lineTo((5 + j*5) * scali, (5 + j*15)* scali);
            extrapath.lineTo((5 + j*5) * scali, (15 + j*15)* scali);
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
        for (let j=0; j < 30; j++) {
          const path = new Path();
          path.lineTo(5 * scali, 5 * scali);
          path.lineTo(25 * scali, 5 * scali);
          const line = path.toObject3D();
          this.otherlines.push(line);
          this.scene.add(line);
          line.position.x = (i*5 + j * 15 - 200) * scali;
          line.position.y = (i*15 + j * 5 - 150) * scali;
          line.path = path;
        }
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

    warmup(renderer) {
      this.update(1697);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(24 * 11);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 5 + 100) / 200);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.otherlines.length; i++) {
        const path = this.otherlines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame + i / 4 - 130) / 40);
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.position.x = ((frame / 10) % 100) - 50;
      this.camera.position.y = ((frame / 20) % 100) - 50;
    }
  }

  global.boxes = boxes;
})(this);

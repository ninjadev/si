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

      // Time shift used only on the map scene
      if (frame > FRAME_FOR_BEAN(330) && frame <= FRAME_FOR_BEAN(408)) {
        // Tune this final number to get timing
        frame = frame + FRAME_FOR_BEAN(24 * 41) - FRAME_FOR_BEAN(365); 
      }

      const startFrame = FRAME_FOR_BEAN(24 * 41);

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
    }
  }

  global.cross = cross;
})(this);

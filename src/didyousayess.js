(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class didyousayess extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.verticals = [];
      this.diagonals = [];
      this.backlines = [];

      const left = -250;
      const top = -187;
      const xpadding = 25;
      const ypadding = 60;
      const height = 25;

      const xrepeat = 7;
      const yrepeat = 6;

      for (let i = 0; i < xrepeat * 3; i++) {
        for (let j = 0; j < yrepeat; j++) {
          const path = new Path();
          const x = left + i * xpadding;
          const y = top + j * ypadding;
          path.lineTo(x, y);
          path.lineTo(x, y + height);
          const line = path.toObject3D();
          this.verticals.push(line);
          this.scene.add(line);
          line.path = path;
        }
      }

      for (let i = 0; i < xrepeat; i++) {
        for (let j = 0; j < yrepeat - 1; j++) {
          for (let k = 0; k < 2; k++) {
            const path = new Path();
            const x = left + i * 3 * xpadding + k * xpadding;
            const y = top + height + j * ypadding;
            path.lineTo(x, y);
            path.lineTo(x + xpadding, y + ypadding - height);
            const line = path.toObject3D();
            this.diagonals.push(line);
            this.scene.add(line);
            line.path = path;
          }
        }
      }

      for (let i = 0; i < xrepeat; i++) {
        for (let j = 0; j < yrepeat - 1; j++) {
          for (let k = 0; k < 2; k++) {
            const path = new Path();
            const x = left + i * 3 * xpadding + k * xpadding * 1.5;
            const y = top + j * ypadding - k * (ypadding - height) / 2;
            path.lineTo(x, y + ypadding);
            path.lineTo(x + xpadding / 2, y + (ypadding + height) / 2);
            const line = path.toObject3D();
            this.backlines.push(line);
            this.scene.add(line);
            line.path = path;
          }
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
      this.update(5555);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      const mator = F(frame, 912, 6);
      const startFrame = FRAME_FOR_BEAN(24 * 9) - 200;
      const verticalFrame = startFrame;
      const diagonalFrame = startFrame + 100;
      const backlineFrame = startFrame + 200;
      const cameraFrame = startFrame + 150;

      const sizinator = F(frame, 912 + 6 + 3, 0);

      for (let i = 0; i < this.verticals.length; i++) {
        const path = this.verticals[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, mator);
        path.material.uniforms.wobbliness.value = 0.5;
        path.material.uniforms.width.value = lerp(3, 2, sizinator);
      }

      for (let i = 0; i < this.diagonals.length; i++) {
        const path = this.diagonals[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, mator);
        path.material.uniforms.wobbliness.value = 0.5;
        path.material.uniforms.width.value =lerp(3, 2, sizinator);
      }

      for (let i = 0; i < this.backlines.length; i++) {
        const path = this.backlines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, mator);
        path.material.uniforms.wobbliness.value = 0.5;
        path.material.uniforms.width.value = lerp(3, 2, sizinator);
      }

      this.camera.position.z = smoothstep(200, 250, (frame - cameraFrame) / 550);
      this.camera.rotation.z = smoothstep(0, -.2, (frame - cameraFrame) / 550);
      this.camera.rotation.x = smoothstep(0, -.1, (frame - cameraFrame) / 550);
      this.camera.rotation.y = smoothstep(0, -.1, (frame - cameraFrame) / 550);
    }
  }

  global.didyousayess = didyousayess;
})(this);

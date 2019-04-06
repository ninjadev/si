(function(global) {
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
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      const startFrame = 900;
      const verticalFrame = startFrame;
      const diagonalFrame = startFrame + 100;
      const backlineFrame = startFrame + 200;
      const cameraFrame = startFrame + 150;

      for (let i = 0; i < this.verticals.length; i++) {
        const path = this.verticals[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - verticalFrame - i * 5) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.diagonals.length; i++) {
        const path = this.diagonals[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - diagonalFrame - i * 5) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.backlines.length; i++) {
        const path = this.backlines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - backlineFrame - i * 5) / 150);
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.position.z = smoothstep(200, 250, (frame - cameraFrame) / 550);
      this.camera.rotation.z = smoothstep(0, -.2, (frame - cameraFrame) / 550);
      this.camera.rotation.x = smoothstep(0, -.1, (frame - cameraFrame) / 550);
      this.camera.rotation.y = smoothstep(0, -.1, (frame - cameraFrame) / 550);
    }
  }

  global.didyousayess = didyousayess;
})(this);

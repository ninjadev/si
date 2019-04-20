(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class packinglist extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.renderTarget = new THREE.WebGLRenderTarget(960, 1080, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      });

      this.camera = new THREE.OrthographicCamera(-11 / 4, 11 / 4, 8.5 / 2, -8.5 / 2, 1, 1000);

      this.camera.position.z = 100;

      const scale = 15;

      this.outerPath = new Path();
      this.outerPath.lineTo(-2.5 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(-2.5 * scale, -7.9 / 2 * scale);
      this.outerPath.lineTo(2.5 * scale, -7.9 / 2 * scale);
      this.outerPath.lineTo(2.5 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(-2.5 * scale, 7.9 / 2 * scale);
      const mesh = this.outerPath.toObject3D();
      mesh.scale.set(1 / scale, 1 / scale, 1 / scale);
      this.scene.add(mesh);

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

      this.titles = [
        {
          startFrame: 8200,
          endFrame: 8670,
          transition: 6,
          text: XWrite('TENT'),
        },
        {
          startFrame: 8300,
          endFrame: 8770,
          transition: 6,
          text: XWrite('YER MUM'),
        },
        {
          startFrame: 8400,
          endFrame: 8870,
          transition: 6,
          text: XWrite('STUFF'),
        },
      ];

      this.ticks = [];
      this.boxes = [];
      this.checks = [];

      for (let [index, title] of this.titles.entries()) {
        title.text.scale.set(0.20 / scale, 0.20 / scale, 0.20 / scale);
        title.text.position.set(-1.4 + title.text.totalWidth / 150, 3.5 - index * .5, 0);
        this.scene.add(title.text);

        const tickpath = new Path();
        tickpath.lineTo(-33, 52.5 - index * 7.5);
        tickpath.lineTo(-30, 52.5 - index * 7.5);
        const tick = tickpath.toObject3D();
        tick.path = tickpath;
        tick.scale.set(1 / scale, 1 / scale, 1 / scale);
        this.scene.add(tick);
        this.ticks.push(tick);

        const boxpath = new Path();
        boxpath.lineTo(-27, 54.5 - index * 7.5);
        boxpath.lineTo(-23, 54.5 - index * 7.5);
        boxpath.lineTo(-23, 50.5 - index * 7.5);
        boxpath.lineTo(-27, 50.5 - index * 7.5);
        boxpath.lineTo(-27, 54.5 - index * 7.5);
        const box = boxpath.toObject3D();
        box.path = boxpath;
        box.scale.set(1 / scale, 1 / scale, 1 / scale);
        this.scene.add(box);
        this.boxes.push(box);

        const checkpath = new Path();
        checkpath.lineTo(-27.5, 53 - index * 7.5);
        checkpath.lineTo(-25.5, 51 - index * 7.5);
        checkpath.lineTo(-22, 55.5 - index * 7.5);
        const check = checkpath.toObject3D();
        check.path = checkpath;
        check.scale.set(1 / scale, 1 / scale, 1 / scale);
        this.scene.add(check);
        this.checks.push(check);
      }
    }

    warmup(renderer) {
      this.update(8307);
      this.render(renderer);
    }

    update(frame) {
      for (let [index, { startFrame, endFrame, text, transition }] of this.titles.entries()) {
        for (let i = 0; i < text.paths.length; i++) {
          const path = text.paths[i];
          const offset = i * transition;
          path.material.uniforms.drawStart.value = lerp(0, 1, (frame - endFrame + transition - offset) / transition);
          path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - offset) / transition);
        }

        const tick = this.ticks[index];

        tick.path.material.uniforms.drawStart.value = 0;
        tick.path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame) / transition);

        const box = this.boxes[index];
        box.path.material.uniforms.drawStart.value = 0;
        box.path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - transition) / transition);

        const check = this.checks[index];
        check.path.material.uniforms.drawStart.value = 0;
        check.path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - transition * 2) / transition);
      }
    }

    resize() {
      this.renderTarget.setSize(16 * GU, 9 * GU);
    }

    render(renderer) {
      renderer.render(this.scene, this.camera, this.renderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
    }
  }

  global.packinglist = packinglist;
})(this);

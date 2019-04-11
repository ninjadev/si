(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class paperframer extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        inputs: {
          A: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.renderTarget = new THREE.WebGLRenderTarget(1920, 1080, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      });

      this.scene.add(this.cube);

      this.camera = new THREE.OrthographicCamera(-11 / 2, 11 / 2, 8.5 / 2, -8.5 / 2, 1, 1000);

      this.camera.position.z = 100;


      this.paper = new THREE.Mesh(
        new THREE.PlaneGeometry(19 / 2, 14 / 2),
        new THREE.MeshBasicMaterial({transparent: true}));
      this.scene.add(this.paper);

      this.innerPath = new Path();
      const scale = 15;
      this.innerPath.lineTo(-2 * scale, 7.5 / 2 * scale);
      this.innerPath.lineTo(-5 * scale, 7.5 / 2 * scale);
      this.innerPath.lineTo(-5 * scale, -7.5 / 2 * scale);
      this.innerPath.lineTo(5 * scale, -7.5 / 2 * scale);
      this.innerPath.lineTo(5 * scale, 7.5 / 2 * scale);
      this.innerPath.lineTo(2 * scale, 7.5 / 2 * scale);
      let mesh = this.innerPath.toObject3D();
      mesh.scale.set(1 / scale, 1 / scale, 1 / scale);
      this.scene.add(mesh);

      this.outerPath = new Path();
      this.outerPath.lineTo(-2 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(-5.2 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(-5.2 * scale, -7.9 / 2 * scale);
      this.outerPath.lineTo(5.2 * scale, -7.9 / 2 * scale);
      this.outerPath.lineTo(5.2 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(2 * scale, 7.9 / 2 * scale);
      mesh = this.outerPath.toObject3D();
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
          startFrame: 240,
          endFrame: 857 - 50,
          transition: 5,
          text: XWrite('SOLSKOGEN PRESENTS'),
        },
        { startFrame: 857,
          endFrame: 2000,
          transition: 10,
          text: XWrite('BEAUTIFUL PATTERNS'),
        },
        {
          startFrame: 2000,
          endFrame: 2330,
          transition: 8,
          text: XWrite('BEAUTIFUL NORWAY'),
        },
        {
          startFrame: 2448,
          endFrame: 2870,
          transition: 10,
          text: XWrite('BEAUTIFUL EMOJIS'),
        },
        {
          startFrame: 3024,
          endFrame: 4100,
          transition: 10,
          text: XWrite('BEAUTIFUL TREES'),
        },
        {
          startFrame: 4900,
          endFrame: 5207,
          transition: 8,
          text: XWrite('BEAUTIFUL SCANLINES'),
        },
        {
          startFrame: 5307,
          endFrame: 6337,
          transition: 8,
          text: XWrite('BEAUTIFUL TWISTERS'),
        },
        {
          startFrame: 6400,
          endFrame: 6700,
          transition: 10,
          text: XWrite('BEAUTIFUL COMMODORES'),
        },
        {
          startFrame: 6767,
          endFrame: 7501,
          transition: 7,
          text: XWrite('BEAUTIFUL NINJADEV'),
        },
        {
          startFrame: 7631,
          endFrame: 8110,
          transition: 7,
          text: XWrite('BEAUTIFUL MOMMA'),
        },
        {
          startFrame: 8200,
          endFrame: 8670,
          transition: 6,
          text: XWrite('BEAUTIFUL TUNNELS'),
        },
        {
          startFrame: 8750,
          endFrame: 9800,
          transition: 6,
          text: XWrite('BEAUTIFUL OUTRO'),
        },
      ];

      for (let title of this.titles) {
        title.text.scale.set(0.20 / scale, 0.20 / scale, 0.20 / scale);
        title.text.position.set(0 * scale, 7.7 / 2, 0);
        this.scene.add(title.text);
      }
    }

    update(frame) {
      this.paper.material.map = this.inputs.A.getValue();
      this.paper.material.needsUpdate = true;

      const aspectFixer = (16 / 9) / (11 / 8.5);

      if (this.paper.material.map) {
        this.paper.material.map.repeat.set(1 / aspectFixer, 1);
        this.paper.material.map.offset.set((1 - 1 / aspectFixer) / 2, 0);
      }

      for (let { startFrame, endFrame, text, transition, } of this.titles) {
        for (let i = 0; i < text.paths.length; i++) {
          const path = text.paths[i];
          const offset = i * transition;
          path.material.uniforms.drawStart.value = lerp(0, 1, (frame - endFrame + transition - offset) / transition);
          path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - offset) / transition);
        }
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

  global.paperframer = paperframer;
})(this);

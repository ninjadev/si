(function(global) {
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
          startFrame: 140,
          endFrame: 719,
          transition: 10,
          text: XWrite('NINJADEV'),
        },
        {
          startFrame: 719,
          endFrame: 1007,
          transition: 10,
          text: XWrite('HANGRY COMMODORES'),
        },
        {
          startFrame: 1007,
          endFrame: 1583,
          transition: 10,
          text: XWrite('MOMMA COMMODORE'),
        },
        {
          startFrame: 2007,
          endFrame: 3583,
          transition: 10,
          text: XWrite('COMMODOOMOMO'),
        },
      ];
      // TODO: Make text fit scaling stuff
      //const pointsAvailable = 4 * scale;
      for (let title of this.titles) {
        //const textDownscale = title.totalWidth / pointsAvailable;
        //const scale = title.totalWidth / pointsAvailable;
        //title.text.scale.set(textDownscale, textDownscale, textDownscale);
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

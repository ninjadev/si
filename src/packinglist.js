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

      this.renderTarget = new THREE.WebGLRenderTarget(1920, 1080, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      });

      this.camera = new THREE.OrthographicCamera(-11 / 2, 11 / 2, 8.5 / 2, -8.5 / 2, 1, 1000);

      this.camera.position.z = 100;

      this.paper = new THREE.Mesh(
        new THREE.PlaneGeometry(19 / 2, 14 / 2),
        new THREE.MeshBasicMaterial({transparent: true}));
      this.scene.add(this.paper);

      const scale = 15;
      /*
      this.innerPath = new Path();
      this.innerPath.lineTo(-2 * scale, 7.5 / 2 * scale);
      this.innerPath.lineTo(-5 * scale, 7.5 / 2 * scale);
      this.innerPath.lineTo(-5 * scale, -7.5 / 2 * scale);
      this.innerPath.lineTo(5 * scale, -7.5 / 2 * scale);
      this.innerPath.lineTo(5 * scale, 7.5 / 2 * scale);
      this.innerPath.lineTo(2 * scale, 7.5 / 2 * scale);
      let mesh = this.innerPath.toObject3D();
      mesh.scale.set(1 / scale, 1 / scale, 1 / scale);
      this.scene.add(mesh);
      */

      this.outerPath = new Path();
      this.outerPath.lineTo(-2 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(-5.2 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(-5.2 * scale, -7.9 / 2 * scale);
      this.outerPath.lineTo(5.2 * scale, -7.9 / 2 * scale);
      this.outerPath.lineTo(5.2 * scale, 7.9 / 2 * scale);
      this.outerPath.lineTo(2 * scale, 7.9 / 2 * scale);
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
          startFrame: 240,
          endFrame: 857 - 50,
          transition: 5,
          text: XWrite('NINJADEV'),
        },
        { startFrame: 857,
          endFrame: 1100,
          transition: 10,
          text: XWrite('INVITES YOU'),
        },
        { startFrame: 1190,
          endFrame: 1290,
          transition: 5,
          text: XWrite('TO COME TO'),
        },
        {
          startFrame: 1295,
          endFrame: 2330,
          transition: 8,
          text: XWrite('SOLSKOGEN'),
        },
        {
          startFrame: 2448,
          endFrame: 2870,
          transition: 10,
          text: XWrite('BEAUTIFUL TUNNELS'),
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
          text: XWrite('LIVE COMPOS'),
        },
        {
          startFrame: 5307,
          endFrame: 6337,
          transition: 8,
          text: XWrite('BEAUTIFUL TWISTERS'),
        },
        {
          startFrame: 6479,
          endFrame: 7501,
          transition: 10,
          text: XWrite('BEAUTIFUL NINJADEV'),
        },
        {
          startFrame: 7631,
          endFrame: 7800,
          transition: 5,
          text: XWrite('BEAUTIFUL MOMMA'),
        },
        {
          startFrame: 7810,
          endFrame: 8100,
          transition: 5,
          text: XWrite('BEAUTIFUL COMMOS'),
        },
        {
          startFrame: 8200,
          endFrame: 8670,
          transition: 6,
          text: XWrite('STUFF TO BRING'),
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

  global.packinglist = packinglist;
})(this);
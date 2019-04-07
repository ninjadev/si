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

      const titles = [{
        startFrame: 0,
        endFrame: 300,
        text: XWrite('MOMMO'),
      }];
      titles[0].text.scale.set(0.5 / scale, 0.5 / scale, 0.5 / scale);
      titles[0].text.position.set(0 * scale, 7.5 / 2, 0);
      this.scene.add(titles[0].text);
    }

    update(frame) {
      this.paper.material.map = this.inputs.A.getValue();
      this.paper.material.needsUpdate = true;
    }

    resize() {
      this.renderTarget.setSize(16 * GU, 9 * GU);
    }

    render(renderer) {
      if(BEAN >= 120 && BEAN < 138) {
      } else if(BEAN >= 216 && BEAN < 234) {
      } else if(BEAN >= 312 && BEAN < 330) {
      } else {
        renderer.render(this.scene, this.camera, this.renderTarget, true);
        this.outputs.render.setValue(this.renderTarget.texture);
      }
    }
  }

  global.paperframer = paperframer;
})(this);

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
    }

    update() {
      this.paper.material.map = this.inputs.A.getValue();
      this.paper.material.needsUpdate = true;
    }
  }

  global.paperframer = paperframer;
})(this);

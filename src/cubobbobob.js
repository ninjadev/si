(function(global) {
  class cubobbobob extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        inputs: {
          background: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput(),
        }
      });
      this.geometry = new THREE.BoxGeometry(50, 50, 50, 50, 50, 50);
      this.cube = new THREE.Mesh(this.geometry, new THREE.MeshNormalMaterial());
      this.scene.add(this.cube);
      this.twistAmount = 10;
      this.twists = 0;
      this.sign = 1;

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.background = new THREE.Mesh(
        new THREE.BoxGeometry(200, 112.5, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.background);
      this.background.position.z = -100;

      this.camera.position.z = 100;
    }

    update(frame) {
      super.update(frame);
      if(BEAT && BEAN % 4 === 0) {
        this.twistAmount = 20;
      } else {
        this.twistAmount = 10;
      }
      this.twist(this.twistAmount * this.sign);
      this.twists++;

      if(this.twists > 100) {
        this.sign *= -1;
        this.twists = -100;
      }

      this.background.material.map = this.inputs.background.getValue();
      this.background.material.needsUpdate = true;
    }

    twist(amount) {
      const quaternion = new THREE.Quaternion();
      for (let i = 0; i < this.geometry.vertices.length; i++) {
        const yPos = this.geometry.vertices[i].y;
        const twistAmount = amount;
        const upVec = new THREE.Vector3(0, 1, 0);

        quaternion.setFromAxisAngle(
          upVec,
          (Math.PI / 180) * (yPos / twistAmount)
        );

        this.geometry.vertices[i].applyQuaternion(quaternion);
      }
      this.geometry.verticesNeedUpdate = true;
    }
  }

  global.cubobbobob = cubobbobob;
})(this);

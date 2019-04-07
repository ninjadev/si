(function(global) {
  class waller extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        },
        inputs: {
          A: new NIN.TextureInput(),
        }
      });

      const paperGeometry = new THREE.PlaneGeometry(11 * 3, 8.5 * 3, 11 * 3, 8.5 * 3);

      for(let i = 0; i < paperGeometry.vertices.length; i++) {
        const vertex = paperGeometry.vertices[i];
        vertex.z += (Math.random() - 0.5) * 0.25;
      }


      this.cube = new THREE.Mesh(paperGeometry,
        new THREE.MeshStandardMaterial({
          roughness: 0.5, 
          metalness: 0,
        }));
      this.scene.add(this.cube);

      this.background = new THREE.Mesh(new THREE.PlaneGeometry(),
        new THREE.MeshStandardMaterial({
          map: Loader.loadTexture('res/cork.jpg'),
          roughness: 0.5,
          metalness: 0,
        }));
      this.background.receiveShadow = true;
      this.background.castShadow = true;
      this.cube.castShadow = true;
      this.cube.receiveShadow = true;
      this.background.material.map.repeat.set(2, 2);
      this.background.material.map.wrapS = THREE.RepeatWrapping;
      this.background.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.background);
      const scale = 0.4;
      this.background.scale.set(160 * scale, 90 * scale, 1);

      this.background.position.z = -5;

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(-40, 15, 50);
      light.castShadow = true;
      light.shadow.mapSize.width = 512;  // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 10;       // default
      light.shadow.camera.far = 100;
      light.lookAt(new THREE.Vector3(0, 0, 0));
      light.shadow.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(light);

      var light = new THREE.SpotLight(0xffffff, 1, 100);
      light.position.set(40, 10, 50);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;  // default
      light.shadow.mapSize.height = 1024; // default
      light.shadow.camera.near = 40;       // default
      light.shadow.camera.far = 100;
      this.scene.add(light);
      light.lookAt(new THREE.Vector3(0, 0, 0));

      this.camera.position.z = 40;

      this.cameraRotationDDD = new THREE.Vector3(0, 0, 0);
      this.cameraRotationDD = new THREE.Vector3(0, 0, 0);
      this.cameraRotationD = new THREE.Vector3(0, 0, 0);
    }

    update(frame) {
      super.update(frame);

      this.cameraRotationDDD.x = (Math.random() - 0.5) * 0.001;
      this.cameraRotationDDD.y = (Math.random() - 0.5) * 0.001;
      this.cameraRotationDDD.z = (Math.random() - 0.5) * 0.001;

      this.cameraRotationDD.add(this.cameraRotationDDD);
      this.cameraRotationDD.x -= this.camera.rotation.x * 0.1;
      this.cameraRotationDD.y -= this.camera.rotation.y * 0.1;
      this.cameraRotationDD.z -= this.camera.rotation.z * 0.1;
      this.cameraRotationDD.multiplyScalar(0.2);
      this.cameraRotationD.add(this.cameraRotationDD);
      this.cameraRotationD.multiplyScalar(0.85);
      this.camera.rotation.x += this.cameraRotationD.x;
      this.camera.rotation.y += this.cameraRotationD.y;
      this.camera.rotation.z += this.cameraRotationD.z;

      this.cube.material.map = this.inputs.A.getValue();
      this.cube.material.needsUpdate = true;

      this.cube.rotation.x = 0;
      this.cube.rotation.y = 0;

      this.camera.position.z = lerp(40, 30, frame / 4000);
    }
  }

  global.waller = waller;
})(this);

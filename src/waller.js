(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
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

      this.camera.near = 0.01;
      this.camera.far = 50;
      this.camera.updateProjectionMatrix();


      const inchToCm = 2.54;

      let paperGeometry = new THREE.PlaneGeometry(
        11 * inchToCm / 100,
        8.5 * inchToCm / 100,
        11 * 3,
        8.5 * 3,
      );

      for(let i = 0; i < paperGeometry.vertices.length; i++) {
        const vertex = paperGeometry.vertices[i];
        vertex.z += (Math.random() - 0.5) * 0.25 * 0.01;
      }

      // RIP
      //paperGeometry = new THREE.BoxGeometry(11 * 3, 8.5 * 3, 0.1);

      const posterGeometry = new THREE.BoxGeometry(1, 1, 0.001);
      this.poster1 = new THREE.Mesh(
        posterGeometry,
        new THREE.MeshStandardMaterial({
          color: 0xff7f7f,
          roughness: 0.9,
          metalness: 0,
          map: Loader.loadTexture('res/poster2.png'),
        }));
      this.poster2 = new THREE.Mesh(
        posterGeometry,
        new THREE.MeshStandardMaterial({
          color: 0x7fff7f,
          roughness: 0.9,
          metalness: 0,
          map: Loader.loadTexture('res/poster3.png'),
        }));
      this.poster3 = new THREE.Mesh(
        posterGeometry,
        new THREE.MeshStandardMaterial({
          color: 0x7f7fff,
          roughness: 0.9,
          metalness: 0,
          map: Loader.loadTexture('res/poster1.png'),
        }));
      this.poster4 = new THREE.Mesh(
        posterGeometry,
        new THREE.MeshStandardMaterial({
          color: 0xffff7f,
          roughness: 0.9,
          metalness: 0,
        }));

      this.poster1.scale.x = 29.7 / 100;
      this.poster1.scale.y = 21 / 100;
      this.poster1.rotation.z = 1.56;
      this.poster1.position.x = 36 / 100;
      this.poster1.position.y = 5 / 100;

      this.poster2.scale.x = 29.7 / 100;
      this.poster2.scale.y = 21 / 100;
      this.poster2.rotation.z = 1.59;
      this.poster2.position.x = -36 / 100;
      this.poster2.position.y = 10 / 100;

      this.poster3.scale.x = 29.7 / 100;
      this.poster3.scale.y = 21 / 100;
      this.poster3.rotation.z = 3.16;
      this.poster3.position.x = 0.18;
      this.poster3.position.y = -0.27;

      this.poster4.scale.x = inchToCm * 3 / 100;
      this.poster4.scale.y = inchToCm * 3 / 100;
      this.poster4.rotation.z = 0;
      this.poster4.position.x = -0.08;
      this.poster4.position.y = 0.22;

      this.poster1.castShadow = true;
      this.poster2.castShadow = true;
      this.poster3.castShadow = true;
      this.poster4.castShadow = true;

      /*
      this.scene.add(this.poster1);
      this.scene.add(this.poster2);
      this.scene.add(this.poster3);
      this.scene.add(this.poster4);
      */

      this.paper = new THREE.Mesh(paperGeometry,
        new THREE.MeshStandardMaterial({
          roughness: 1,
          metalness: 0,
          side: THREE.DoubleSide,
        }));
      this.paper.position.z = 0.003;
      this.scene.add(this.paper);

      this.background = new THREE.Mesh(new THREE.BoxGeometry(),
        new THREE.MeshStandardMaterial({
          //map: Loader.loadTexture('res/Cork_S.jpg'),
          //normalMap: Loader.loadTexture('res/Cork_N.jpg'),
          roughness: 0.95,
          metalness: 0,
          color: 0x7f7f7f,
        }));
      this.background.receiveShadow = true;
      this.paper.receiveShadow = true;
      this.shadowPaper = this.paper.clone();
      this.scene.add(this.shadowPaper);
      this.shadowPaper.position.z -= 0.001;
      this.shadowPaper.castShadow = true;
      this.shadowPaper.receiveShadow = false;
      /*
      this.background.material.map.repeat.set(20, 10);
      this.background.material.map.wrapS = THREE.RepeatWrapping;
      this.background.material.map.wrapT = THREE.RepeatWrapping;
      this.background.material.normalMap.repeat.set(20, 10);
      this.background.material.normalMap.wrapS = THREE.RepeatWrapping;
      this.background.material.normalMap.wrapT = THREE.RepeatWrapping;
      */
      this.scene.add(this.background);
      const scale = 0.1;
      this.background.scale.set(16 * scale, 9 * scale, 0.001);

      this.background.position.z = -0.004;

      const pinGeometryCircleParts = 32;
      const pinGeometryHeightParts = 5;
      const pinGeometry = new THREE.CylinderGeometry(1, 1, 2, pinGeometryCircleParts, pinGeometryHeightParts);

      const radiuses = [0.7, 0.7, 0.5, 0.7, 1.];
      const yOffsets = [0, 0.2, 0.4, -0.1, 0];

      for(let j = 0; j <= pinGeometryHeightParts; j++) {
        for(let i = 0; i < pinGeometryCircleParts; i++) {
          const vertex = pinGeometry.vertices[i + j * pinGeometryCircleParts];
          const r = radiuses[j];
          const yOffset = yOffsets[j];
          vertex.x = r * Math.sin(i / pinGeometryCircleParts * Math.PI * 2);
          vertex.z = r * Math.cos(i / pinGeometryCircleParts * Math.PI * 2);
          vertex.y += yOffset;
        }
      }

      this.leftPin = new THREE.Mesh(
        pinGeometry,
        new THREE.MeshStandardMaterial({
          roughness: 0.9,
          metalness: 0.1,
          color: 0xff7f7f,
          shading: THREE.FlatShading,
        }));
      this.leftPin.rotation.x = Math.PI / 2;
      this.leftPin.scale.set(0.5 / 100, 0.5 / 100, 0.5 / 100);
      this.leftPin.position.x = -13.1 / 100;
      this.leftPin.position.y = 9.6 / 100;
      this.leftPin.position.z = 0.7 / 100;
      this.leftPin.castShadow = true;
      this.leftPin.receiveShadow = true;

      this.rightPin = this.leftPin.clone();
      this.rightPin.position.x = 13.2 / 100;
      this.rightPin.position.y = 9.9 / 100;
      this.rightPin.castShadow = true;
      this.leftPin.receiveShadow = true;

      this.scene.add(this.leftPin);
      this.scene.add(this.rightPin);

      var light = new THREE.SpotLight(0xffee88, 1, 0, 2);
      light.position.set(0, 0.2, 0.5);
      light.castShadow = true;
      light.angle = 1.2;
      light.shadow.mapSize.width = 4096;  // default
      light.shadow.mapSize.height = 4096; // default
      light.shadow.camera.near = 0.5;       // default
      light.shadow.camera.far = 0.9;
      light.target.position.y = 0.06;
      light.penumbra = 1;
      this.scene.add(light.target);
      this.light1 = light;
      this.scene.add(light);
      var helper = new THREE.CameraHelper( light.shadow.camera );
      //this.scene.add(helper);

      const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
      hemiLight.color.setHSL( 0.6, 1, 0.6 );
      hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemiLight.position.set( 0, 0, 0 );
      this.scene.add( hemiLight );

      this.hemiLight = hemiLight;


      this.camera.position.z = 40;

      this.cameraRotationDDD = new THREE.Vector3(0, 0, 0);
      this.cameraRotationDD = new THREE.Vector3(0, 0, 0);
      this.cameraRotationD = new THREE.Vector3(0, 0, 0);
    }

    update(frame) {
      super.update(frame);

      if(frame < 81) {
        this.light1.intensity = 0;
      } else if(frame < 84) {
        this.light1.intensity = 0.5;
      } else if(frame < 90) {
        this.light1.intensity = 0;
      } else if(frame < 102) {
        this.light1.intensity = 0.5;
      } else if(frame < 106) {
        this.light1.intensity =  0.0;
      } else if(frame < 110) {
        this.light1.intensity = 0.5;
      } else if(frame < 130) {
        this.light1.intensity = 0.0;
      } else {
        this.light1.intensity = easeOut(
          0, 1, (frame - 132) / 150);
      }

      this.hemiLight.intensity = 0.1 + this.light1.intensity * 0.5;


      this.paper.material.map = this.inputs.A.getValue();
      this.paper.material.needsUpdate = true;

      this.paper.rotation.x = 0;
      this.paper.rotation.y = 0;

      this.camera.position.z = lerp(1, 30 / 100, frame / 3000);


      const shockZoom = Math.pow(easeIn(
          0,
          1,
          F(frame, 114 - 6, 12)), 2);
      this.camera.position.z = lerp(this.camera.position.z, 40 / 100, shockZoom);
      this.camera.position.x = 0;

      const angler = F(frame, 114, 12);

      this.light1.angle = easeIn(1.2, 0.63, angler);

      const lookAt = new THREE.Vector3(0, 0, 0);

      const angler2 = F(frame, 96, 32);
      //this.light1.angle = easeIn(this.light1.angle, 0.6, angler2);

      if(BEAN < 120) {
      } else {
        this.camera.position.z = 30 / 100;
        this.camera.position.x = 0;
      }

      if(BEAN >= 324) {
      this.camera.position.z = easeIn(
        0.16,
        0.3,
        Math.pow(lerp(0, 1, F(frame, 324, 24 + 12)), 8.));
      }

      this.cameraRotationDDD.x += (Math.random() - 0.5) * 0.0002;
      this.cameraRotationDDD.y += (Math.random() - 0.5) * 0.0002;
      this.cameraRotationDDD.z += (Math.random() - 0.5) * 0.0002;

      this.cameraRotationDD.x += (Math.random() - 0.5) * 0.001;
      this.cameraRotationDD.y += (Math.random() - 0.5) * 0.001;
      this.cameraRotationDD.z += (Math.random() - 0.5) * 0.001;

      if(BEAN >= 120 && BEAN < 123) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      this.cameraRotationDD.add(this.cameraRotationDDD);
      this.cameraRotationDD.x -= this.camera.rotation.x * 0.1;
      this.cameraRotationDD.y -= this.camera.rotation.y * 0.1;
      this.cameraRotationDD.z -= this.camera.rotation.z * 0.1;
      this.cameraRotationDDD.multiplyScalar(0.9);
      this.cameraRotationDD.multiplyScalar(0.1);
      this.cameraRotationD.add(this.cameraRotationDD);
      this.cameraRotationD.multiplyScalar(0.85);
      this.camera.rotation.x += this.cameraRotationD.x;
      this.camera.rotation.y += this.cameraRotationD.y;
      this.camera.rotation.z += this.cameraRotationD.z;

      this.background.material.color.setRGB(0.5, 0.5, 0.5);
      if(BEAN >= 120) {
        this.background.material.color.setRGB(0.35, 0.35, 1);
      }
      if(BEAN >= 216) {
        this.background.material.color.setRGB(0.5, 1.0, 0.5);
      }


      //demo.renderer.ninGammaOutput = true;
    }
  }

  global.waller = waller;
})(this);

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

      this.ballyThrob = 0;
      this.ballySize = 0;

      this.rotaterPosition = 0;
      this.rotaterSpeed = 0;
      this.scratcherPosition = 0;
      this.scratcherSpeed = 0;

      this.camera.near = 0.01;
      this.camera.far = 50;
      this.camera.updateProjectionMatrix();

      const splashoScale = 0.18;
      this.splashoBillboard = new THREE.Mesh(
        new THREE.PlaneGeometry(splashoScale * 2100 / 1500, splashoScale),
        new THREE.MeshBasicMaterial({
          transparent: true,
        }));

      this.scene.add(this.splashoBillboard);

      this.skogTexture = Loader.loadTexture('res/skog-graffiti.png');
      this.demoTexture = Loader.loadTexture('res/demo-graffiti.png');
      this.campingTexture = Loader.loadTexture('res/camping-graffiti.png');
      this.musicTexture = Loader.loadTexture('res/music-graffiti.png');
      this.graphicsTexture = Loader.loadTexture('res/graphics-graffiti.png');
      this.flatebyTexture = Loader.loadTexture('res/flateby-marker-overlay-graffiti.png');

      this.twistoramaContainer = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.ShaderMaterial(SHADERS.twistorama).clone()
      );
      this.twistoramaContainer.material.transparent = true,
        this.twistoramaContainer.position.z = 0.01;
      this.twistoramaContainer.scale.set(16 / 100 * 2, 9 / 100 * 2, 1);

      this.scene.add(this.twistoramaContainer);

      this.forest = new THREE.Mesh(
        new THREE.PlaneGeometry(),
        new THREE.MeshBasicMaterial({
          map: Loader.loadTexture('res/placeholder.png'),
        }));
      this.scene.add(this.forest);
      const forestScale = 0.25;
      this.forest.scale.set(forestScale, forestScale * 9659 / 1920, forestScale);



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


      this.camera.position.z = 30;

      this.cameraRotationDDD = new THREE.Vector3(0, 0, 0);
      this.cameraRotationDD = new THREE.Vector3(0, 0, 0);
      this.cameraRotationD = new THREE.Vector3(0, 0, 0);
    }

    update(frame) {
      super.update(frame);

      this.splashoBillboard.visible = false;
      this.light1.position.y = 0.2;
      this.light1.target.position.y = 0.06;
      this.light1.penumbra = 1;

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

      const cameraGlider = lerp(0.5, 30 / 100, frame / 3000);


      const shockZoom = Math.pow(easeIn(
          0,
          1,
          F(frame, 114 - 6, 12)), 2);
      this.camera.position.z = cameraGlider + lerp(0, 30 / 100 - cameraGlider, shockZoom);
      this.camera.position.x = 0;
      this.camera.position.y = 0;

      const angler = F(frame, 114, 12);

      this.light1.angle = easeIn(1.2, 0.63, angler);

      const lookAt = new THREE.Vector3(0, 0, 0);

      const angler2 = F(frame, 96, 32);
      //this.light1.angle = easeIn(this.light1.angle, 0.6, angler2);

      this.light1.target.position.y = 0.06;
      this.light1.penumbra = 1;
      if(BEAN >= 888 && BEAN < 1080) {
        this.light1.intensity = easeOut(1, 0, F(frame, 888, 12));

        if(BEAN >= 894) {
          this.light1.intensity = 0.25;
          this.light1.target.position.y = 0.0;
          this.light1.angle = 0.1;
          this.light1.penumbra = 0.1;
          this.light1.angle = smoothstep(0, 0.1, F(frame, 903 - 3, 3));

          this.light1.angle = smoothstep(this.light1.angle, 0.15, F(frame, 918 - 1, 1));
          this.light1.target.position.x = easeOut(0, 0.04, F(frame, 918 + 2, 1));
          this.light1.target.position.y = lerp(0, 0.03, F(frame, 918 + 3, 24 -3));

          this.light1.angle = easeOut(this.light1.angle, 0.5, F(frame, 930, 6));
        }

      }



      if(BEAN >= 324) {
        this.camera.position.z = easeIn(
          0.16,
          0.3,
          Math.pow(lerp(0, 1, F(frame, 324, 24 + 12)), 8.));
      }


      /* splashers */

      this.splashoBillboard.position.z = 0.1;
      const BAR = BEAN / 24 | 0;
      if(BAR >= 9 && BAR < 10) {
        const t = F(frame,  9 * 24, 24);
        const t2 = F(frame, 10 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.12, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.skogTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.01;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 17 && BAR < 19) {
        const t = F(frame,  17 * 24, 24 * 2);
        const t2 = F(frame, 19 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.12, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.flatebyTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2) + 0.07;
        this.splashoBillboard.position.y = this.camera.position.y + 0.000;
        this.splashoBillboard.position.z = 0.163;
        this.light1.angle = 0.85;
      } else if(BAR >= 21 && BAR < 22) {
        const t = F(frame,  21 * 24, 24);
        const t2 = F(frame, 22 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.12, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.campingTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 25 && BAR < 26) {
        const t = F(frame,  25 * 24, 24);
        const t2 = F(frame, 26 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.12, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.campingTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 29 && BAR < 30) {
        const t = F(frame,  29 * 24, 24);
        const t2 = F(frame, 30 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.12, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.demoTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 31 && BAR < 32) {
        const t = F(frame,  31 * 24, 24);
        const t2 = F(frame, 32 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.12, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.musicTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 33 && BAR < 34) {
        const t = F(frame,  33 * 24, 24);
        const t2 = F(frame, 34 * 24 - 6, 6);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.graphicsTexture;

        this.splashoBillboard.position.x = 1;
        this.splashoBillboard.position.y = 0;
        this.splashoBillboard.position.z = 0.05;

        this.light1.angle = 0.85;
      }



      /* camera shake */

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

      if(BEAN >= 216 && BEAN < 216 + 6) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 912 && BEAN < 912 + 6) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 888 && BEAN < 888 + 3) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 960 && BEAN < 960 + 6) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 1080 && BEAN < 1080 + 2) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }
      if(BEAN >= 1176 && BEAN < 1176 + 2) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }
      if(BEAN >= 1272 && BEAN < 1272 + 1) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.01;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.01;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.01;
      }
      if(BEAN === 1308) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.005;
      }
      if(BEAN === 1311) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.005;
      }
      if(BEAN === 1314) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.005;
      }
      if(BEAN === 1317) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.005;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.005;
      }
      if(BEAN >= 1320 && BEAN < 1320 + 2) {
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
        this.background.material.color.setRGB(1.0, 0.5, 0.5);
      }
      if(BEAN >= 408) {
        this.background.material.color.setRGB(1, 1, 0.5);
      }
      if(BEAN >= 504) {
        this.background.material.color.setRGB(0.5, 1., 1.);
      }
      if(BEAN >= 600) {
        this.background.material.color.setRGB(0.5, 0.5, 1.0);
      }
      if(BEAN >= 888) {
        this.background.material.color.setRGB(.1, .0, .1);
      }
      if(BEAN >= 1176) {
        this.background.material.color.setRGB(1.0, .5, 1.0);
      }


      /* twistorama */
      const u = this.twistoramaContainer.material.uniforms;
      u.frame.value = 1500;
      //u.rotater.value = frame / 10;
      //u.scratcher.value = 1;
      //

      this.twistoramaContainer.visible = BEAN >= 888 && BEAN < 1080;

      let t = F(frame, 888, 9);
      u.xScale.value = smoothstep(2, 0, t) + easeOut(0, 1, t);
      u.yScale.value = smoothstep(2, 0, t) + easeOut(0, 1, t);
      u.zScale.value = smoothstep(2, 0, t) + easeOut(0, 1, t);

      u.blobbiness.value = 0;

      if(BEAN >= 900 && BEAN < 906) {
        u.xScale.value = 0.5;
        u.yScale.value = 0.5;
        u.zScale.value = 0.5;
        u.blobbiness.value = smoothstep(0, 1, F(frame, 900, 3));
      }

      switch(frame) {
        case FRAME_FOR_BEAN(888):
          this.rotaterPosition = 0;
          this.rotaterSpeed = 0.34;
          this.scratcherPosition = 0;
          this.scratcherSpeed = 0;
          break;
        case FRAME_FOR_BEAN(912):
          this.scratcherPosition = 0.1;
          this.scratcherSpeed = 1.2;
          break;
        case FRAME_FOR_BEAN(912) + 9:
          this.scratcherSpeed = -1.5;
          break;
        case FRAME_FOR_BEAN(912) + 26:
          //this.scratcherPosition = 1.5;
          //this.scratcherSpeed = 0;
          break;
        case FRAME_FOR_BEAN(918) + 0:
          //this.scratcherPosition = -1.5;
          this.scratcherSpeed = -0.2;
          break;
        case FRAME_FOR_BEAN(918 + 3) + 0:
          //this.scratcherPosition = -1.5;
          this.scratcherSpeed = 0.5;
          break;
        case FRAME_FOR_BEAN(924):
          this.scratcherPosition = 5;
          this.scratcherSpeed = 0;
          break;
        case FRAME_FOR_BEAN(924 + 1.5) | 0:
          this.scratcherPosition = 4;
          this.scratcherSpeed = 0;
          break;
        case FRAME_FOR_BEAN(924 + 3):
          this.scratcherPosition = 3;
          this.scratcherSpeed = 0;
          break;
        case FRAME_FOR_BEAN(924 + 4.5) | 0:
          this.scratcherPosition = 2;
          this.scratcherSpeed = 0;
          break;
        case FRAME_FOR_BEAN(924 + 6) | 0:
          this.scratcherPosition = -2;
          break;
        case FRAME_FOR_BEAN(942):
          //this.scratcherPosition = -1.5;
          this.scratcherSpeed = 0.5
          break;
      }

      if(BEAN >= 930 && BEAN < 936) {
        this.scratcherPosition = easeOut(-3, 0, F(frame, 930, 3));
        if(BEAN >= 933) {
        this.scratcherPosition = easeOut(3, 0, F(frame, 930 + 3, 3));
        }
      }

      if(BEAN >= 936 && BEAN <  942) {
        this.scratcherPosition = easeOut(0, Math.PI / 4, F(frame, 936, 1.5));
        this.scratcherPosition = smoothstep(this.scratcherPosition, 0, F(frame, 936 + 1.5, 1.5));
        this.rotaterPosition = smoothstep(0, -Math.PI / 4, F(frame, 936 + 1.5, 1.5));
        this.scratcherSpeed = 0;
      }

      if(BEAN >= 942) {
        this.scratcherPosition = 0;
        this.rotaterPosition = 0;
        this.rotaterSpeed = 0;
        for(let i = 1; i < 8; i++) {
          this.scratcherPosition = lerp(this.scratcherPosition,
            0 + ((i % 2) - 0.5),
            F(frame, 942 + i * 1.5, 0.1));
          /*
          this.rotaterPosition = easeOut(this.rotaterPosition,
            i * Math.PI / 4,
            F(frame, 942 + i * 1.5, 1.5));
            */
        }
      }

      if(BEAN >= 956 && BEAN < 956 + 3) {
        this.scratcherPosition = 0;
        this.rotaterPosition = lerp(0, 2, F(frame, 956, 3));
      }

      u.yPosier.value = smoothstep(0, 0.25, F(frame, 972 - 6, 6));
      u.cutSpacing.value = smoothstep(0, 0.25, F(frame, 972, 6));

      if(BEAN >= 978 && BEAN < 984) {
        this.rotaterPosition = BEAN / 2;
      }
      this.ballySize = 0;
      u.ballBoom.value = 0;
      if(BEAN >= 984) {
        u.cutSpacing.value = smoothstep(u.cutSpacing.value, 1.5, F(frame, 984, 6));
        this.ballySize = easeOut(0, 1, F(frame, 984 + 3, 1));
      }

      if(BEAN >= 402 && BEAN < 408) {
        const s = F(frame, 402 +3, 3);
        this.camera.position.x = easeIn(this.camera.position.x, 0.13, s);
        this.camera.position.y = easeIn(this.camera.position.y, 0.08, s);
        this.camera.position.z = easeIn(this.camera.position.z, 0.28, s);
      }

      this.ballyThrob *= 0.9;

      if(BEAT) {
        switch(BEAN) {
          case 984 + 3:
          case 984 + 9:
          case 984 + 12 + 3:
            this.ballyThrob = 1;
        }
      }

      if(BEAN >= 984 +12 + 3 && BEAN < 984 + 12 +6) {
        this.ballyThrob = 1;
      }
      if(BEAN == 984 + 12 + 6) {
        this.ballyThrob = 0;
      }

      if(BEAN >= 984 && BEAN < 984 + 24 * 3) {
        this.rotaterPosition = lerp(0, Math.PI / 2, F(frame, 984, 24 * 3));
      }


      u.ballBoom.value = this.ballySize + this.ballyThrob * 0.5;


      const RUNE_HEX_START_BEAN = 672 - 12;
      const RUNE_SCANLINES_START_BEAN = 792 + 12;
      const ALEKS_BIRD_START_BEAN = 1080;
      /*
      if (BEAN >= RUNE_HEX_START_BEAN && BEAN < RUNE_SCANLINES_START_BEAN) {
        this.camera.position.z = easeIn(.3, 0.16, F(frame, RUNE_HEX_START_BEAN, 12));
      } else if (BEAN >= RUNE_SCANLINES_START_BEAN && BEAN < RUNE_SCANLINES_START_BEAN + 24) {
        this.camera.position.z = easeIn(0.16, 0.3, F(frame, RUNE_SCANLINES_START_BEAN, 24));
      }
      */


      this.paper.visible = true;
      this.shadowPaper.visible = true;
      this.forest.visible = false;
      if (BEAN >= 888 && BEAN < ALEKS_BIRD_START_BEAN) {
        this.camera.position.y = 0;

        u.yScale.value = easeIn(u.yScale.value, 6, F(frame, 924 - 6, 6));

        if(BEAN >= 954 && BEAN < 954 + 3 ) {
          u.yScale.value = 1;
          u.yPosier.value = 0.25;
        }

        this.camera.position.y = easeIn(0, -0.03, F(frame, 924-5,2));
        this.camera.position.z = easeIn(.3, 0.15, F(frame, 924-5,2));
        this.twistoramaContainer.position.x = easeIn(0, 0.042, F(frame, 924 - 5, 2));
        u.rotater.value = easeIn(0, Math.PI, F(frame, 924 - 5, 2));
        if(BEAN >= 924 - 3 && BEAN < 900 + 24 + 12) {
          this.camera.position.y = lerp(-0.03, 0.03, F(frame, 924 -3, 12 + 3));
          this.camera.position.z = 0.15;
        }

        this.scratcherSpeed *= 0.95;
        this.scratcherPosition += this.scratcherSpeed;
        u.scratcher.value = this.scratcherPosition;
        this.rotaterSpeed *= 0.95;
        this.rotaterPosition += this.rotaterSpeed;
        u.rotater.value = this.rotaterPosition;

        this.forest.position.y = easeIn(0.53, -0.53, F(frame, 984, 24 * 3));

        if(BEAN >= 984 && BEAN < 1080) {
          this.paper.visible = false;
          this.shadowPaper.visible = false;
          this.forest.visible = true;
        }
      } else if(BEAN >= ALEKS_BIRD_START_BEAN) {
        this.camera.position.y = 0;
        this.camera.position.z = easeIn(.15, 0.3, F(frame, ALEKS_BIRD_START_BEAN, 12));
      }
    }
  }

  global.waller = waller;
})(this);

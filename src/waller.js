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
          B: new NIN.TextureInput(),
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
      this.splashoBackBillboard = new THREE.Mesh(
        new THREE.PlaneGeometry(splashoScale * 2100 / 1500, splashoScale),
        new THREE.MeshBasicMaterial({
          transparent: true,
        }));

      this.scene.add(this.splashoBillboard);
      this.scene.add(this.splashoBackBillboard);

      this.flatShadeTexture = Loader.loadTexture('res/flatshadesociety-graffiti.png');
      this.flatShadeSpinnerTexture = Loader.loadTexture('res/flatshadesociety-spinner-graffiti.png');
      this.bbqTexture = Loader.loadTexture('res/bbq3.png');
      this.skogTexture = Loader.loadTexture('res/skog-graffiti.png');
      this.demoTexture = Loader.loadTexture('res/demo-graffiti.png');
      this.campingTexture = Loader.loadTexture('res/camping-graffiti.png');
      this.norwayTexture = Loader.loadTexture('res/norway-graffiti.png');
      this.musicTexture = Loader.loadTexture('res/music-graffiti.png');
      this.graphicsTexture = Loader.loadTexture('res/graphics-graffiti.png');
      this.flatebyTexture = Loader.loadTexture('res/flateby-marker-overlay-graffiti.png');

      this.skogTexture.minFilter = THREE.LinearFilter;
      this.skogTexture.magFilter = THREE.LinearFilter;
      this.demoTexture.minFilter = THREE.LinearFilter;
      this.demoTexture.magFilter = THREE.LinearFilter;
      this.bbqTexture.minFilter = THREE.LinearFilter;
      this.bbqTexture.magFilter = THREE.LinearFilter;
      this.campingTexture.minFilter = THREE.LinearFilter;
      this.campingTexture.magFilter = THREE.LinearFilter;
      this.norwayTexture.minFilter = THREE.LinearFilter;
      this.norwayTexture.magFilter = THREE.LinearFilter;
      this.musicTexture.minFilter = THREE.LinearFilter;
      this.musicTexture.magFilter = THREE.LinearFilter;
      this.graphicsTexture.minFilter = THREE.LinearFilter;
      this.graphicsTexture.magFilter = THREE.LinearFilter;
      this.flatebyTexture.minFilter = THREE.LinearFilter;
      this.flatebyTexture.magFilter = THREE.LinearFilter;
      this.flatShadeTexture.minFilter = THREE.LinearFilter;
      this.flatShadeTexture.magFilter = THREE.LinearFilter;
      this.flatShadeSpinnerTexture.minFilter = THREE.LinearFilter;
      this.flatShadeSpinnerTexture.magFilter = THREE.LinearFilter;

      this.twistoramaContainer = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.ShaderMaterial(SHADERS.twistorama).clone()
      );
      this.twistoramaContainer.material.transparent = true,
        this.twistoramaContainer.position.z = 0.01;
      this.twistoramaContainer.scale.set(16 / 100 * 2, 9 / 100 * 2, 1);

      this.scene.add(this.twistoramaContainer);

      this.forestTexture = Loader.loadTexture('res/forest.png');
      this.forestTexture.minFilter = THREE.LinearFilter;
      this.forestTexture.magFilter = THREE.LinearFilter;
      this.forest = new THREE.Mesh(
        new THREE.PlaneGeometry(),
        new THREE.MeshStandardMaterial({
          roughness: 1,
          metalness: 0,
          map: this.forestTexture,
          emissive: 0xffffff,
          emissiveIntensity: 0.15,
          side: THREE.DoubleSide,
        }));
      this.scene.add(this.forest);
      const forestScale = 0.23;
      this.forest.scale.set(forestScale, forestScale * 7500 / 1920, forestScale);

      //this.forest.scale.x = -this.forest.scale.x;



      const inchToCm = 2.54;

      let paperGeometry = new THREE.PlaneGeometry(
        11 * inchToCm / 100,
        8.5 * inchToCm / 100,
        11 * 3,
        8.5 * 3
      );

      for(let i = 0; i < paperGeometry.vertices.length; i++) {
        const vertex = paperGeometry.vertices[i];
        vertex.z += (Math.random() - 0.5) * 0.25 * 0.01;
      }

      this.paper = new THREE.Mesh(paperGeometry,
        new THREE.MeshStandardMaterial({
          roughness: 1,
          metalness: 0,
          side: THREE.DoubleSide,
        }));
      this.paper.position.z = 0.003;
      this.scene.add(this.paper);

      this.packinglist = new THREE.Mesh(paperGeometry,
        new THREE.MeshStandardMaterial({
          roughness: 1,
          metalness: 0,
          side: THREE.DoubleSide,
        }));
      this.packinglist.position.set(-0.24, 0, 0.003);
      this.packinglist.scale.x = .5;
      this.scene.add(this.packinglist);

      this.background = new THREE.Mesh(new THREE.BoxGeometry(),
        new THREE.MeshStandardMaterial({
          roughness: 0.95,
          metalness: 0,
          color: 0x7f7f7f,
        }));
      this.background.receiveShadow = true;
      this.paper.receiveShadow = true;
      this.packinglist.receiveShadow = true;
      this.shadowPaper = this.paper.clone();
      this.scene.add(this.shadowPaper);
      this.shadowPackingList = this.packinglist.clone();
      this.scene.add(this.shadowPackingList);
      this.shadowPaper.position.z -= 0.001;
      this.shadowPaper.castShadow = true;
      this.shadowPaper.receiveShadow = false;
      this.shadowPackingList.position.z -= 0.001;
      this.shadowPackingList.castShadow = true;
      this.shadowPackingList.receiveShadow = false;
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

    warmup(renderer) {
      const frames = [
        96,
        814,
        1348,
        1936,
        2591,
        3131,
        3671,
        4247,
        4526,
        4788,
        5482,
        5666,
        5993,
        6398,
        6571,
        7203,
        7745,
        8496,
      ];
      for(let i = 0; i < frames.length; i++) {
        this.update(frames[i]);
        this.render(renderer);
      }
    }

    update(frame) {
      super.update(frame);

      this.forest.material.emissiveIntensity = lerp(0.15, 0.25, F(frame, 984, 24 * 3));

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

      this.packinglist.material.map = this.inputs.B.getValue();
      this.packinglist.material.needsUpdate = true;

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
      this.splashoBackBillboard.visible = false;
      this.splashoBackBillboard.position.z = 0.08;
      this.splashoBillboard.material.opacity = 1;
      this.splashoBackBillboard.material.opacity = 1;
      this.splashoBillboard.scale.set(1, 1, 1);
      this.splashoBackBillboard.scale.set(1, 1, 1);
      const BAR = BEAN / 24 | 0;
      if(BAR >= 5 && BAR < 6) {
        const t = F(frame,  5 * 24, 24);
        const t2 = F(frame, 6 * 24 - 6, 6);
        //this.camera.position.x = lerp(-0.05, -0.10, t);
        //this.camera.position.y = -0.03;
        //this.camera.position.z = 0.38;

        this.splashoBillboard.visible = true;
        this.splashoBillboard.position.x = 0;
        this.splashoBillboard.position.y = 0;
        this.splashoBillboard.material.map = this.flatShadeTexture;
        this.splashoBackBillboard.visible = true;
        this.splashoBackBillboard.material.map = this.flatShadeSpinnerTexture;
        this.splashoBackBillboard.rotation.z = lerp(0, - Math.PI * 1.4, F(frame, 120, 24));
        this.splashoBackBillboard.position.y = -0.005;
        const scaler = easeOut(1, 0, F(frame, 138, 3));
        this.light1.angle = easeOut(0.85, 0.65, F(frame, 138, 3));
        this.splashoBillboard.scale.set(scaler, scaler, 1);
        this.splashoBackBillboard.scale.set(scaler, scaler, 1);
        this.splashoBillboard.material.opacity = easeOut(1, 0, F(frame, 138, 1.2)) ;
        this.splashoBackBillboard.material.opacity = easeOut(1, 0, F(frame, 138, 1.2));
      } else if(BAR >= 9 && BAR < 10) {
        const t = F(frame,  9 * 24, 24);
        const t2 = F(frame, 10 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.skogTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.01;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 13 && BAR < 14) {
        const t = F(frame,  13 * 24, 24);
        const t2 = F(frame, 14 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;

        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.norwayTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.04;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 17 && BAR < 18) {
        const t = F(frame,  17 * 24, 24 * 2);
        const t2 = F(frame, 18 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.flatebyTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2) + 0.07;
        this.splashoBillboard.position.y = this.camera.position.y + 0.000;
        this.splashoBillboard.position.z = 0.163;
        this.light1.angle = 0.85;
      } else if(BAR >= 21 && BAR < 22) {
        const t = F(frame,  21 * 24, 24);
        const t2 = F(frame, 22 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.campingTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 25 && BAR < 26) {
        const t = F(frame,  25 * 24, 24);
        const t2 = F(frame, 26 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.bbqTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 29 && BAR < 30) {
        const t = F(frame,  29 * 24, 24);
        const t2 = F(frame, 30 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.demoTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 31 && BAR < 32) {
        const t = F(frame,  31 * 24, 24);
        const t2 = F(frame, 32 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.musicTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
        this.light1.angle = 0.85;
      } else if(BAR >= 33 && BAR < 34) {
        const t = F(frame,  33 * 24, 24);
        const t2 = F(frame, 34 * 24 - 6, 6);
        this.camera.position.x = lerp(-0.05, -0.10, t);
        this.camera.position.y = -0.03;
        this.camera.position.z = 0.38;
        this.camera.position.x = easeIn(this.camera.position.x, 0, t2);
        this.camera.position.y = easeIn(this.camera.position.y, 0, t2);
        this.camera.position.z = easeIn(this.camera.position.z, 0.3, t2);

        this.splashoBillboard.visible = true;
        this.splashoBillboard.material.map = this.graphicsTexture;

        this.splashoBillboard.position.x = this.camera.position.x - lerp(0.07, 0.09, t) - easeOut(0, 0.25, t2);
        this.splashoBillboard.position.y = this.camera.position.y- 0.02;
        this.splashoBillboard.position.z = 0.1;
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

      if(BEAN >= 312 && BEAN < 312 + 3) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 408 && BEAN < 408 + 6) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 912 && BEAN < 912 + 12) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 888 && BEAN < 888 + 3) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.02;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.02;
      }

      if(BEAN >= 960 && BEAN < 960 + 9) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.03;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.03;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.03;
      }
      if(BEAN >= 1032 && BEAN < 1032 + 6) {
        this.camera.rotation.x = (Math.random() - 0.5) * 0.01;
        this.camera.rotation.y = (Math.random() - 0.5) * 0.01;
        this.camera.rotation.z = (Math.random() - 0.5) * 0.01;
      }
      if(BEAN >= 1056 && BEAN < 1056 + 12) {
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
      if(BEAN >= 264 + 5) {
        this.background.material.color.setRGB(0.5, 0.5, 1.0);
      }
      if(BEAN >= 312) {
        this.background.material.color.setRGB(0.5, 1.0, 1.0);
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
        this.camera.position.x = 0.035;
        this.camera.position.y = 0.095;
        this.camera.position.z = 0.28;
      }

      this.ballyThrob *= 0.9;

      if(BEAT) {
        switch(frame) {
          case FRAME_FOR_BEAN(984 + 3):
          case FRAME_FOR_BEAN(984 + 9):
          case FRAME_FOR_BEAN(984 + 12 + 3):
          case FRAME_FOR_BEAN(1008):
          case FRAME_FOR_BEAN(1014):
          case FRAME_FOR_BEAN(1026):
            this.ballyThrob = 1;
        }
      }
      if(BEAN >= 1014 + 3 && BEAN < 1014 + 3 + 6) {
        this.ballyThrob = 1;
      }
      if(BEAN === 1014 + 3 + 6) {
        this.ballyThrob = 0;
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

      if(BEAN >= 1032) {
        u.ballBoom.value = easeOut(u.ballBoom.value, 0, F(frame, 1032, 6));
        u.cutSpacing.value = easeOut(u.cutSpacing.value, 2.5, F(frame, 1032, 6));
      }



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

        this.forest.position.y = lerp(0.355, -0.243, F(frame, 984 + 3, 24 * 3 - 3));

        if(BEAN >= 984 && BEAN < 1080) {
          this.paper.visible = false;
          this.shadowPaper.visible = false;
          this.forest.visible = true;
        }
      } else if(BEAN >= ALEKS_BIRD_START_BEAN) {
        this.camera.position.y = 0;
        this.camera.position.z = easeIn(.15, 0.3, F(frame, ALEKS_BIRD_START_BEAN, 12));
      }
      if(BEAN >= 57 * 24 && BEAN < 61 * 24) {
        this.camera.position.x = lerp(
          0,
          lerp(-.09, 0, F(frame, 60 * 24 + 18, 6)),
          F(frame, 57 * 24, 12));
        this.camera.position.z = lerp(
          .3,
          lerp(.35, .3, F(frame, 60 * 24 + 18, 6)),
          F(frame, 57 * 24, 12));
        this.packinglist.position.x = -0.24;
        this.shadowPackingList.position.x = -0.24;

        this.light1.target.position.x = lerp(
          0,
          lerp(-.075, 0, F(frame, 60 * 24 + 18, 6)),
          F(frame, 57 * 24, 12));
      } else {
        this.packinglist.position.x = -500;
        this.shadowPackingList.position.x = -500;

        this.light1.target.position.x = 0;
      }

      let fallBEAN = 1500;
      if (BEAN >= fallBEAN && BEAN < fallBEAN + 6) {
        let speed = F(frame, fallBEAN, 6);
        this.paper.rotation.z = -easeIn(0, 1, speed);
        this.paper.position.y = -easeIn(0, 0.066, speed);
        this.paper.position.x = -easeIn(0, 0.144, speed);
        this.shadowPaper.rotation.z = -easeIn(0, 1, speed);
        this.shadowPaper.position.y = -easeIn(0, 0.066, speed);
        this.shadowPaper.position.x = -easeIn(0, 0.144, speed);
        // NEED HELP TO SHAKE IT BETTER --Julie
      } else if (BEAN === fallBEAN + 6) {
        let speed = F(frame, fallBEAN + 6, 1);
        this.shadowPaper.visible = false;
        this.paper.rotation.z = -smoothstep(1, 0.9, Math.sin(speed/10));
        this.paper.position.x = -smoothstep(0.144, 0.136, Math.sin(speed/10));
      } else if (BEAN >= fallBEAN + 7 && BEAN < fallBEAN + 9) {
        let speed = F(frame, fallBEAN + 7, 1);
        this.shadowPaper.visible = false;
        this.paper.rotation.z = -smoothstep(0.9, 1.1, Math.sin(speed/10));
        this.paper.position.x = -smoothstep(0.136, 0.152, Math.sin(speed/10));
      } else if (BEAN >= fallBEAN + 9 && BEAN < fallBEAN + 11) {
        let speed = F(frame, fallBEAN + 9, 1);
        this.shadowPaper.visible = false;
        this.paper.rotation.z = -smoothstep(1.1, 0.9, Math.sin(speed/10));
        this.paper.position.x = -smoothstep(0.152, 0.136, Math.sin(speed/10));
      } else if (BEAN === fallBEAN + 11) {
        let speed = F(frame, fallBEAN + 11, 1);
        this.shadowPaper.visible = false;
        this.paper.rotation.z = -smoothstep(0.9, 1, Math.sin(speed/10));
        this.paper.position.x = -smoothstep(0.136, 0.144, Math.sin(speed/10));
      } else if (BEAN >= fallBEAN + 12) {
        let speed = F(frame, fallBEAN + 12, 1)/10;
        this.paper.position.y = -lerp(0.066, 1, speed);
        this.shadowPaper.position.y = -lerp(0.066, 1, speed);
        let lightFrame = 9051;
        if(frame < lightFrame) {
          this.light1.intensity = 1;
        } else if(frame < lightFrame + 3) {
          this.light1.intensity = 0.5;
        } else if(frame < lightFrame + 9) {
          this.light1.intensity = 1;
        } else if(frame < lightFrame + 21) {
          this.light1.intensity = 0.5;
        } else if(frame < lightFrame + 25) {
          this.light1.intensity =  1.0;
        } else if(frame < lightFrame + 29) {
          this.light1.intensity = 0.5;
        } else if(frame < lightFrame + 49) {
          this.light1.intensity = 1.0;
        } else if(frame >= lightFrame + 49) {
          this.light1.intensity = 0;
        } else {
          this.light1.intensity = 1;
        }
        this.hemiLight.intensity = 0.1 + this.light1.intensity * 0.5;
      } else {
        this.paper.position.x = 0;
        this.paper.position.y = 0;
        this.paper.rotation.z = 0;
        this.shadowPaper.position.x = 0;
        this.shadowPaper.position.y = 0;
        this.shadowPaper.rotation.z = 0;
        this.shadowPaper.visible = true;
        this.light1.intensity = 1;
        this.hemiLight.intensity = 0.6;
      }
    }
  }

  global.waller = waller;
})(this);

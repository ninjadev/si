(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class NorwayNode extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        },
        inputs: {
          sirpathrick: new NIN.TextureInput(),
          boxes: new NIN.TextureInput(),
          cross: new NIN.TextureInput(),
          pathy: new NIN.TextureInput(),
          moose: new NIN.TextureInput(),
          diagonals: new NIN.TextureInput(),
          Yoga: new NIN.TextureInput(),
          ripple: new NIN.TextureInput(),
        },
      });


      this.map_image = Loader.loadTexture('res/map/norge.png');
      this.map_plume = Loader.loadTexture('res/norge-plume.png');
      this.map_borders = Loader.loadTexture('res/norge-border.png');
      this.map_plume.minFilter = THREE.LinearFilter;
      this.map_plume.magFilter = THREE.LinearFilter;
      this.map_borders.minFilter = THREE.LinearFilter;
      this.map_borders.magFilter = THREE.LinearFilter;
      this.map_image.minFilter = THREE.LinearFilter;
      this.map_image.magFilter = THREE.LinearFilter;
      //this.z1 = Loader.loadTexture('res/map/testpattern.jpg');
      this.z1 = Loader.loadTexture('res/map/t1.png');
      this.z2 = Loader.loadTexture('res/map/t2.png');
      this.z3 = Loader.loadTexture('res/map/t3.png');
      this.z4 = Loader.loadTexture('res/map/t4.png');
      this.z5 = Loader.loadTexture('res/map/t5.png');
      this.z6 = Loader.loadTexture('res/map/t6.png');
      this.z7 = Loader.loadTexture('res/map/z7.png');
      this.z8 = Loader.loadTexture('res/map/z8.png');
      this.z9 = Loader.loadTexture('res/map/z9.png');
      this.z10 = Loader.loadTexture('res/map/z10.png');
      this.z11 = Loader.loadTexture('res/map/z11.png');
      this.paperTexture = Loader.loadTexture('res/paper.png');

      this.flateby_sign_container = new THREE.Object3D();
      this.flateby_sign = new THREE.Mesh(
        new THREE.PlaneGeometry(2100 / 100, 1500 / 100, 1),
        new THREE.MeshBasicMaterial({
          map: Loader.loadTexture('res/flateby-marker-graffiti.png'),
        }));
      this.scene.add(this.flateby_sign_container);
      this.flateby_sign_container.add(this.flateby_sign);
      /*
      this.flateby_sign_container.add(new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial({color: 0xff00ff})));
        */
      this.flateby_sign.material.transparent = true;

      this.flateby_sign.rotation.x = Math.PI/2;
      this.flateby_sign_container.position.x = -9.5;
      this.flateby_sign_container.position.y = -18;
      this.flateby_sign_container.position.z = 1.3;
      this.flateby_sign.position.x = -3.4;
      this.flateby_sign.position.y = 7;

      this.map_object = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 1),
                                 new THREE.ShaderMaterial(SHADERS.NorwayShader).clone());
      this.scene.add(this.map_object);
      this.map_object.material.transparent = true;

      this.map_object.material.uniforms.tDiffuse.value = this.map_image;
      this.map_object.material.uniforms.tPlume.value = this.map_plume;
      this.map_object.material.uniforms.tBorder.value = this.map_borders;
      //this.map_object.material.uniforms.z1.value = this.z1;
      this.map_object.material.uniforms.z2.value = this.z2;
      this.map_object.material.uniforms.z3.value = this.z3;
      this.map_object.material.uniforms.z4.value = this.z4;
      this.map_object.material.uniforms.z5.value = this.z5;
      this.map_object.material.uniforms.z6.value = this.z6;
      this.map_object.material.uniforms.z7.value = this.z7;
      this.map_object.material.uniforms.z8.value = this.z8;
      this.map_object.material.uniforms.z9.value = this.z9;
      this.map_object.material.uniforms.z9.value = this.z9;
      this.map_object.material.uniforms.z10.value = this.z10;
      this.map_object.material.uniforms.z11.value = this.z11;

      this.bg = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0x7fffff,
          side: THREE.BackSide,
        }));

      this.scene.add(this.bg);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 7;
      this.camera.position.y = -30;
    }

    update(frame) {
      super.update(frame);

      //this.map_object.material.uniforms.frame.value = frame;

      this.map_object.material.uniforms.fade_in.value = smoothstep(0, 1, (frame - FRAME_FOR_BEAN(336)) / 100);
      this.map_object.material.uniforms.fade_in.value = 1;

      var start_x = 8.6;
      var start_y = 18.6;

      var back_x = 30;
      var back_y = 6;

      this.camera.up = new THREE.Vector3(0,0,1);
      //this.camera.lookAt(new THREE.Vector3(start_x, start_y, 0));
      this.camera.position.z = 30;
      this.camera.position.y = 22;
      this.camera.position.x = 2;
      this.flateby_sign_container.scale.set(1, 1, 1);

      if(BEAN >= 312) {
        this.camera.position.x = lerp(2, -14, F(frame, 312, 48 + 48 - 12));
        this.camera.position.y = lerp(22, -12, F(frame, 312, 48 + 48 - 12));
      }

      if(BEAN >= 396) {
        this.camera.position.z = 80;
        this.camera.position.x = 0;
        this.camera.position.y = 0;

        this.camera.position.x = easeIn(this.camera.position.x, -8.44, F(frame, 402 - 2, 2));
        this.camera.position.y = easeIn(this.camera.position.y, -16.87, F(frame, 402 - 2, 2));
        this.camera.position.z = easeIn(this.camera.position.z, 5, F(frame, 402 - 2, 2));
        const scaler = easeIn(1.5, 0.25, F(frame, 402 - 2, 2));
        this.flateby_sign_container.scale.set(scaler, scaler, scaler);
      }

      this.camera.rotation.set(0, 0, 0);
      if(BEAN >= 348 + 2  && BEAN < 354 - 1) {
        this.camera.position.z = 30;
        this.camera.position.x = -5;
      }

      if(BEAN >= 354 - 1  && BEAN < 354) {
        this.camera.position.z = 25;
        this.camera.position.x = -5;
      }

      if(BEAN >= 354 && BEAN < 354 + 5) {
        this.camera.position.z = 120;
        this.camera.rotation.z = easeOut(Math.PI, 2 * Math.PI, F(frame, 354, 5));
      }

      // These needs to be set in update for nin reasons

      this.map_object.material.uniforms.z1.value = this.paperTexture;
      this.map_object.material.uniforms.z8.value = this.paperTexture;
      this.map_object.material.uniforms.z9.value = this.paperTexture;
      this.map_object.material.uniforms.z5.value = this.paperTexture;
      this.map_object.material.uniforms.z6.value = this.paperTexture;
      this.map_object.material.uniforms.z4.value = this.paperTexture;
      this.map_object.material.uniforms.z7.value = this.paperTexture;
      this.map_object.material.uniforms.z3.value = this.paperTexture;
      this.map_object.material.uniforms.z2.value = this.paperTexture;
      this.map_object.material.uniforms.z10.value = this.paperTexture;
      this.map_object.material.uniforms.z11.value = this.paperTexture;

      if(BEAN >= 312 + 12 && BEAN < 312 + 12 * 2) {
        this.map_object.material.uniforms.z1.value = this.inputs.sirpathrick.getValue();
      } else if(BEAN >= 312 + 2 * 12 && BEAN < 312 + 12 * 3) {
        this.map_object.material.uniforms.z8.value = this.inputs.boxes.getValue();
      } else if(BEAN >= 312 + 2 * 12 && BEAN < 312 + 12 * 3) {
        this.map_object.material.uniforms.z8.value = this.inputs.boxes.getValue();
      } else if(BEAN >= 312 + 3 * 12 && BEAN < 312 + 12 * 4) {
        this.map_object.material.uniforms.z9.value = this.inputs.pathy.getValue();
      } else if(BEAN >= 312 + 4 * 12 && BEAN < 312 + 12 * 5) {
        this.map_object.material.uniforms.z5.value = this.inputs.diagonals.getValue();
      } else if(BEAN >= 312 + 5 * 12 && BEAN < 312 + 12 * 5.5) {
        this.map_object.material.uniforms.z6.value = this.inputs.cross.getValue();
      } else if(BEAN >= 312 + 6 * 12 && BEAN < 312 + 12 * 7) {
        this.map_object.material.uniforms.z4.value = this.inputs.boxes.getValue();
      } else if(BEAN >= 312 + 7 * 12 && BEAN < 312 + 12 * 7.5) {
        this.map_object.material.uniforms.z7.value = this.inputs.diagonals.getValue();
      } else if(BEAN >= 312 + 7.5 * 12 && BEAN < 312 + 12 * 8) {
        this.map_object.material.uniforms.z3.value = this.inputs.Yoga.getValue();
      } else if(BEAN >= 312 + 8 * 12 && BEAN < 312 + 12 * 8.5) {
        this.map_object.material.uniforms.z2.value = this.inputs.ripple.getValue();
      } else if(BEAN >= 312 + 8.5 * 12 && BEAN < 312 + 12 * 9) {
        this.map_object.material.uniforms.z10.value = this.inputs.moose.getValue();
      } else if(BEAN >= 312 + 9 * 12 && BEAN < 312 + 12 * 8.5) {
        this.map_object.material.uniforms.z11.value = this.inputs.Yoga.getValue();
      }

      this.flateby_sign.quaternion.copy(this.camera.quaternion);


    }
  }

  global.NorwayNode = NorwayNode;
})(this);

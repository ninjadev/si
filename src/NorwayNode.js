(function(global) {
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

      this.flateby_sign = new THREE.Mesh(
        new THREE.PlaneGeometry(998 / 100, 1159 / 100, 1),
        new THREE.MeshBasicMaterial({
          map: Loader.loadTexture('res/flateby-marker-graffiti.png'),
        }));
      this.scene.add(this.flateby_sign);
      this.flateby_sign.material.transparent = true;
      const flatebysignscale = 0.2;
      this.flateby_sign.scale.set(flatebysignscale,flatebysignscale,flatebysignscale);

      this.flateby_sign.rotation.x = Math.PI/2;
      this.flateby_sign.position.x = -9.5;
      this.flateby_sign.position.y = -18;
      this.flateby_sign.position.z = 1.3;

      this.map_object = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 1),
                                 new THREE.ShaderMaterial(SHADERS.NorwayShader).clone());
      this.scene.add(this.map_object);
      this.map_object.material.transparent = true;

      this.map_object.material.uniforms.tDiffuse.value = this.map_image;
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

      if (BEAN < 336) {
        var start_x = 8.6;
        var start_y = 18.6;

        var back_x = 30;
        var back_y = 6;

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(start_x, start_y, 0));
        this.camera.position.z = 10.9;
        this.camera.position.y = start_y-0.01;
        this.camera.position.x = start_x;
      } else {
        var start_x = 8.6;
        var start_y = 18.6;
        var df = frame - FRAME_FOR_BEAN(336);

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(start_x , start_y , 0));
        this.camera.position.z = 4.9;
        this.camera.position.y = start_y-0.01 +
                                 smoothstep(0, -54, (frame - FRAME_FOR_BEAN(336)) / (FRAME_FOR_BEAN(397) - FRAME_FOR_BEAN(336))) +
                                 easeOut(0, 14.5, (frame - FRAME_FOR_BEAN(397)) / (FRAME_FOR_BEAN(398) - FRAME_FOR_BEAN(397)));

        this.camera.position.x = start_x +
                                 smoothstep(0, -5, (frame - FRAME_FOR_BEAN(349)) / (FRAME_FOR_BEAN(352) - FRAME_FOR_BEAN(349))) +
                                 smoothstep(0, 5, (frame - FRAME_FOR_BEAN(352)) / (FRAME_FOR_BEAN(354) - FRAME_FOR_BEAN(352))) +
                                 smoothstep(0, -5, (frame - FRAME_FOR_BEAN(354)) / (FRAME_FOR_BEAN(356) - FRAME_FOR_BEAN(354))) +
                                 smoothstep(0, -25, (frame - FRAME_FOR_BEAN(336)) / (FRAME_FOR_BEAN(397) - FRAME_FOR_BEAN(336))) +
                                 easeOut(0, 10.5, (frame - FRAME_FOR_BEAN(397)) / (FRAME_FOR_BEAN(398) - FRAME_FOR_BEAN(397)));

        this.camera.position.z = 6 +
                                easeOut(0, -4.6 , (frame - FRAME_FOR_BEAN(366)) / (FRAME_FOR_BEAN(369) - FRAME_FOR_BEAN(366))) +
                                easeOut(0, +4.6 , (frame - FRAME_FOR_BEAN(371)) / (FRAME_FOR_BEAN(374) - FRAME_FOR_BEAN(371))) +
                                easeOut(0, + 10 , (frame - FRAME_FOR_BEAN(377)) / (FRAME_FOR_BEAN(380) - FRAME_FOR_BEAN(377))) +
                                easeOut(0, - 10, (frame - FRAME_FOR_BEAN(383)) / (FRAME_FOR_BEAN(386) - FRAME_FOR_BEAN(383))) +
                                easeOut(0, -4.6 , (frame - FRAME_FOR_BEAN(397)) / (FRAME_FOR_BEAN(398) - FRAME_FOR_BEAN(397)));
      }

      // These needs to be set in update for nin reasons
      this.map_object.material.uniforms.z1.value = this.inputs.sirpathrick.getValue();
      this.map_object.material.uniforms.z8.value = this.inputs.boxes.getValue();


      this.map_object.material.uniforms.z9.value = this.inputs.pathy.getValue();
      this.map_object.material.uniforms.z5.value = this.inputs.diagonals.getValue();
      this.map_object.material.uniforms.z6.value = this.inputs.cross.getValue();
      this.map_object.material.uniforms.z4.value = this.inputs.boxes.getValue();

      this.map_object.material.uniforms.z7.value = this.inputs.diagonals.getValue();

      this.map_object.material.uniforms.z3.value = this.inputs.Yoga.getValue();

      this.map_object.material.uniforms.z2.value = this.inputs.ripple.getValue();

      this.map_object.material.uniforms.z10.value = this.inputs.moose.getValue();

      this.map_object.material.uniforms.z11.value = this.inputs.Yoga.getValue();

      this.flateby_sign.quaternion.copy(this.camera.quaternion);


    }
  }

  global.NorwayNode = NorwayNode;
})(this);

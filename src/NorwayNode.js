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
        new THREE.PlaneGeometry(10, 10, 1),
        new THREE.MeshBasicMaterial({
          map: Loader.loadTexture('res/flateby-marker-graffiti.png'),
        }));
      this.scene.add(this.flateby_sign);
      this.flateby_sign.material.transparent = true;

      this.flateby_sign.rotation.x = Math.PI/2;
      this.flateby_sign.position.x = -7;
      this.flateby_sign.position.y = -18;
      this.flateby_sign.position.z = 5;

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

      this.map_object.material.uniforms.fade_in.value = smoothstep(0, 1, (frame - 2800) / 100);

      if (frame < 2870) {
        var center_x = 8.6;
        var center_y = 18.6;

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(center_x, center_y, 0));
        this.camera.position.z = 10.9;
        this.camera.position.y = center_y-0.01;
        this.camera.position.x = center_x;
      } else if (BEAN < 504) {
        var center_x = 8.6;
        var center_y = 18.6;
        var df = frame - 2870;

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(center_x , center_y , 0));
        this.camera.position.z = 10.9;
        this.camera.position.y = center_y-0.01 - df / 6; 
        this.camera.position.x = center_x - smoothstep(0, 10, df / 100);
      } else if (BEAN < 524) {
        var center_x = 8.6;
        var center_y = 18.6;
        var df = FRAME_FOR_BEAN(504) - 2870;

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(center_x - df / 20 , center_y - df / 12, 0));
        this.camera.position.z = 10.9;
        this.camera.position.y = center_y-0.01 - df / 6; 
        this.camera.position.x = center_x - df / 10;
      } else if (frame < 3350) {
        var center_x = 8.6;
        var center_y = 18.6;
        var df = frame - FRAME_FOR_BEAN(504);

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(center_x - df / 20 , center_y - df / 12, 0));
        this.camera.position.z = 10.9;
        this.camera.position.y = center_y-0.01 - df / 6; 
        this.camera.position.x = center_x - df / 10;
      } else {
        var center_x = 8.6;
        var center_y = 18.6;
        var df = 3350 - FRAME_FOR_BEAN(504);

        this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(new THREE.Vector3(center_x - df / 20 , center_y - df / 12, 0));
        this.camera.position.z = 10.9;
        this.camera.position.y = center_y-0.01 - df / 6; 
        this.camera.position.x = center_x - df / 10;
      } 

      // These needs to be set in update for nin reasons
      this.map_object.material.uniforms.z1.value = this.inputs.sirpathrick.getValue();

      this.flateby_sign.quaternion.copy(this.camera.quaternion);


    }
  }

  global.NorwayNode = NorwayNode;
})(this);

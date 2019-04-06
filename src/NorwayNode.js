(function(global) {
  class NorwayNode extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        },
        inputs: {
          N: new NIN.TextureInput(),
        },
      });

      this.flateby_image = Loader.loadTexture('res/map/flateby.png');
      this.map_image = Loader.loadTexture('res/map/norge.png');
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

      this.flateby_sign = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 1),
                                 new THREE.ShaderMaterial(SHADERS.ColorToTransparrent));
      this.scene.add(this.flateby_sign);
      this.flateby_sign.material.transparent = true;
      this.flateby_sign.material.uniforms.tDiffuse.value = this.flateby_image;

      this.flateby_sign.rotation.x = Math.PI/2;
      this.flateby_sign.position.x = -7;
      this.flateby_sign.position.y = -18;
      this.flateby_sign.position.z = 5;

      this.map_object = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 1),
                                 new THREE.ShaderMaterial(SHADERS.NorwayShader));
      this.scene.add(this.map_object);
      this.map_object.material.transparent = true;

      this.map_object.material.uniforms.tDiffuse.value = this.map_image;
      this.map_object.material.uniforms.z1.value = this.z1;
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

      this.map_object.material.uniforms.frame.value = frame;

      this.camera.position.x = 30 * Math.sin(frame/20.);
      this.camera.up = new THREE.Vector3(0,0,1);
      this.camera.lookAt(new THREE.Vector3(0,0,0));

      
    }
  }

  global.NorwayNode = NorwayNode;
})(this);
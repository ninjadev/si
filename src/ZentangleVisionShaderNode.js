(function(global) {
  class ZentangleVisionShaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         three_scene: new NIN.TextureInput(),
         bgzigzag: new NIN.TextureInput(),
         bgrightarrow: new NIN.TextureInput(),
         bgpink: new NIN.TextureInput(),
         bgblue: new NIN.TextureInput(),
         bgpants: new NIN.TextureInput(),
         squiggles: new NIN.TextureInput(),
      }
      super(id, options);

      this.test = Loader.loadTexture('res/test_train.jpg');

      this.map_image = Loader.loadTexture('res/zentangles/norge.png');
      this.z1 = Loader.loadTexture('res/zentangles/z1.jpg');
      this.z2 = Loader.loadTexture('res/zentangles/z2.png');
      this.z3 = Loader.loadTexture('res/zentangles/z3.png');
      this.z4 = Loader.loadTexture('res/zentangles/z4.png');
      this.z5 = Loader.loadTexture('res/zentangles/z5.png');
      this.z6 = Loader.loadTexture('res/zentangles/z6.png');
    }

    update(frame) {
      /*this.uniforms.tDiffuse.value = this.inputs.three_scene.getValue();
      this.uniforms.z1.value = this.inputs.bgpants.getValue();
      this.uniforms.z2.value = this.inputs.squiggles.getValue();
      this.uniforms.z3.value = this.inputs.bgblue.getValue();
      this.uniforms.z4.value = this.inputs.bgrightarrow.getValue();
      this.uniforms.z5.value = this.inputs.bgzigzag.getValue();
      this.uniforms.z6.value = this.inputs.bgpink.getValue();*/
      
      //this.uniforms.tDiffuse.value = this.inputs.three_scene.getValue();
      this.uniforms.tDiffuse.value = this.map_image;
      this.uniforms.z1.value = this.z2;
      this.uniforms.z2.value = this.z3;
      this.uniforms.z3.value = this.z4;
      this.uniforms.z4.value = this.z5;
      this.uniforms.z5.value = this.z6;
      this.uniforms.z6.value = this.z1;
      this.uniforms.frame.value = frame;
    }
  }

  global.ZentangleVisionShaderNode = ZentangleVisionShaderNode;
})(this);

(function(global) {
  class NorwayShaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         input_scene: new NIN.TextureInput(),
      }
      super(id, options);

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
      this.uniforms.z1.value = this.z1;
      this.uniforms.z2.value = this.z2;
      this.uniforms.z3.value = this.z3;
      this.uniforms.z4.value = this.z4;
      this.uniforms.z5.value = this.z5;
      this.uniforms.z6.value = this.z6;
      this.uniforms.z7.value = this.z7;
      this.uniforms.z8.value = this.z8;
      this.uniforms.z9.value = this.z9;
      this.uniforms.z10.value = this.z10;
      this.uniforms.z11.value = this.z11  ;
      this.uniforms.frame.value = frame;
    }
  }

  global.NorwayShaderNode = NorwayShaderNode;
})(this);

(function(global) {
  class splasherNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        A: new NIN.TextureInput(),
      };
      super(id, options);

      this.solMap = Loader.loadTexture('res/sol-graffiti.png');
      this.skogMap = Loader.loadTexture('res/skog-graffiti.png');
      this.enMap = Loader.loadTexture('res/en-graffiti.png');
    }

    update(frame) {
      this.uniforms.frame.value = frame;
      this.uniforms.tDiffuse.value = this.inputs.A.getValue();
      this.uniforms.image.value = this.solMap;
      this.uniforms.overlayer.value = 0;
      this.inputs.A.enabled = true;
      if(BEAN >= 120 && BEAN < 138) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.solMap;
        this.inputs.A.enabled = false;
      }
      if(BEAN >= 216 && BEAN < 234) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.skogMap;
        this.inputs.A.enabled = false;
      }
      if(BEAN >= 312 && BEAN < 330) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.enMap;
        this.inputs.A.enabled = false;
      }
    }
  }

  global.splasherNode = splasherNode;
})(this);

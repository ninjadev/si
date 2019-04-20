(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class splasherNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        A: new NIN.TextureInput(),
        PaperContent: new NIN.TextureInput(),
      };
      super(id, options);
    }

    update(frame) {
      this.uniforms.generalGrayScaler.value = easeIn(1, 0, F(frame, 96, 24));
      this.uniforms.radiuser.value = 4;

      this.uniforms.frame.value = frame;
      this.uniforms.tDiffuse.value = this.inputs.A.getValue();
      this.uniforms.paperContent.value = this.inputs.PaperContent.getValue();

      this.uniforms.overlayer.value = 0;
      this.inputs.A.enabled = true;
      this.uniforms.backgroundiness.value = 1;
      this.uniforms.framiness.value = 1;
    }
  }

  global.splasherNode = splasherNode;
})(this);

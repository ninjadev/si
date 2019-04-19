(function(global) {
  class EmojiBlendNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        A: new NIN.TextureInput(),
        B: new NIN.TextureInput(),
      };
      super(id, options);
      this.opacity = options.opacity;
    }

    warmup(renderer) {
      this.update(3645);  // TODO: Update frame number
      this.render(renderer);
    }

    update(frame) {
      this.uniforms.opacity.value = this.opacity;
      this.uniforms.A.value = this.inputs.A.getValue();
      this.uniforms.B.value = this.inputs.B.getValue();
    }
  }

  global.EmojiBlendNode = EmojiBlendNode;
})(this);

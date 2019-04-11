(function(global) {
  class twistoramaNode extends NIN.ShaderNode {
    constructor(id, options) {
      super(id, options);
    }

    update(frame) {

      this.uniforms.frame.value = frame;

      this.uniforms.scratcher.value = 0;
      this.uniforms.rotater.value = 0;
    }
  }

  global.twistoramaNode = twistoramaNode;
})(this);

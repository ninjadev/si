(function(global) {
  class twistoramaNode extends NIN.ShaderNode {
    constructor(id, options) {
      super(id, options);
    }

    update(frame) {

      frame += 4 * Math.sin(frame / 60 / 60 * 100 * Math.PI * 2);

      this.uniforms.frame.value = frame;

      const wobbler = Math.sin(frame / 60 / 60 * 100 * Math.PI * 2);
      this.uniforms.scratcher.value = wobbler;
      this.uniforms.rotater.value = frame / 60 / 60 * 100 * Math.PI * 2 / 2;
    }
  }

  global.twistoramaNode = twistoramaNode;
})(this);

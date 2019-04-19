(function(global) {
  class NorwayShaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         input_scene: new NIN.TextureInput(),
      }
      super(id, options);
    }

    update(frame) {
    }
  }

  global.NorwayShaderNode = NorwayShaderNode;
})(this);

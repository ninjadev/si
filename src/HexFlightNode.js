(function(global) {
  class HexFlightNode extends NIN.ShaderNode {
    constructor(id, options) {
      super(id, options);
    }

    update(frame) {
      this.uniforms.frame.value = frame;
    }
  }

  global.HexFlightNode = HexFlightNode;
})(this);

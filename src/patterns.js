(function(global) {
  class patterns extends NIN.Node {
    constructor(id) {
      super(id, {
        inputs: {
          A: new NIN.TextureInput(),
          B: new NIN.TextureInput(),
          C: new NIN.TextureInput(),
          D: new NIN.TextureInput(),
          E: new NIN.TextureInput(),
          F: new NIN.TextureInput(),
          G: new NIN.TextureInput(),
          H: new NIN.TextureInput(),
          I: new NIN.TextureInput(),
          J: new NIN.TextureInput(),
          K: new NIN.TextureInput(),
          L: new NIN.TextureInput(),
          M: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput(),
        }
      });
    }

    beforeUpdate() {
      this.inputs.A.enabled = false;
      this.inputs.B.enabled = false;
      this.inputs.C.enabled = false;
      this.inputs.D.enabled = false;
      this.inputs.E.enabled = false;
      this.inputs.F.enabled = false;
      this.inputs.G.enabled = false;
      this.inputs.H.enabled = false;
      this.inputs.I.enabled = false;
      this.inputs.J.enabled = false;
      this.inputs.K.enabled = false;
      this.inputs.L.enabled = false;
      this.inputs.M.enabled = false;

      let selectedScene;
      // Start 24 * 5
      if (BEAN < 24 * 7) {
        selectedScene = this.inputs.A;
      } else if (BEAN < 24 * 9) {
        selectedScene = this.inputs.B;
      } else if (BEAN < 24 * 11) {
        selectedScene = this.inputs.C;
      } else if (BEAN < 24 * 12.5) {
        selectedScene = this.inputs.D;
      } else if (BEAN < 24 * 13) {
        selectedScene = this.inputs.E;
      } else if (BEAN < 24 * 38) { // Actually start at 37
        selectedScene = this.inputs.F;
      } else if (BEAN < 24 * 39) {
        selectedScene = this.inputs.G;
      } else if (BEAN < 24 * 40) {
        selectedScene = this.inputs.H;
      } else if (BEAN < 24 * 41) {
        selectedScene = this.inputs.I;
      } else if (BEAN < 24 * 42) {
        selectedScene = this.inputs.J;
      } else if (BEAN < 24 * 43) {
        selectedScene = this.inputs.K;
      } else if (BEAN < 24 * 44) {
        selectedScene = this.inputs.L;
      } else {
        selectedScene = this.inputs.M;
      }
      selectedScene.enabled = true;
      this.selectedScene = selectedScene;
    }

    render() {
      this.outputs.render.setValue(this.selectedScene.getValue());
    }
  }

  global.patterns = patterns;
})(this);

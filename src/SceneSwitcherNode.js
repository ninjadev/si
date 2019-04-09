(function(global) {

  class SceneSwitcherNode extends NIN.Node {
    constructor(id) {
      super(id, {
        inputs: {
          Startlogo: new NIN.TextureInput(),
          A1: new NIN.TextureInput(),
          A2: new NIN.TextureInput(),
          B1: new NIN.TextureInput(),
          B2: new NIN.TextureInput(),
          A3: new NIN.TextureInput(),
          A4: new NIN.TextureInput(),
          B3: new NIN.TextureInput(),
          B4: new NIN.TextureInput(),
          Scratches: new NIN.TextureInput(),
          B5intro: new NIN.TextureInput(),
          B5: new NIN.TextureInput(),
          B6: new NIN.TextureInput(),
          A5: new NIN.TextureInput(),
          A6: new NIN.TextureInput(),
          Outro: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput(),
        }
      });
    }

    beforeUpdate() {
      this.inputs.Startlogo.enabled = false;
      this.inputs.A1.enabled = false;
      this.inputs.A2.enabled = false;
      this.inputs.B1.enabled = false;
      this.inputs.B2.enabled = false;
      this.inputs.A3.enabled = false;
      this.inputs.A4.enabled = false;
      this.inputs.B3.enabled = false;
      this.inputs.B4.enabled = false;
      this.inputs.Scratches.enabled = false;
      this.inputs.B5intro.enabled = false;
      this.inputs.B5.enabled = false;
      this.inputs.B6.enabled = false;
      this.inputs.A5.enabled = false;
      this.inputs.A6.enabled = false;
      this.inputs.Outro.enabled = false;

      let selectedScene;
      if (BEAN < 24 * 5) {
        selectedScene = this.inputs.Startlogo;
      } else if (BEAN < 24 * 9) {
        selectedScene = this.inputs.A1;
      } else if (BEAN < 24 * 13) {
        selectedScene = this.inputs.A2;
      } else if (BEAN < 24 * 17) {
        selectedScene = this.inputs.B1;
      } else if (BEAN < 24 * 21) {
        selectedScene = this.inputs.B2;
      } else if (BEAN < 24 * 25) {
        selectedScene = this.inputs.A3;
      } else if (BEAN < 24 * 28) { // One beat early ;)
        selectedScene = this.inputs.A4;
      } else if (BEAN < 24 * 33) {
        selectedScene = this.inputs.B3;
      } else if (BEAN < 24 * 37) {
        selectedScene = this.inputs.B4;
      } else if (BEAN < 24 * 45) {
        selectedScene = this.inputs.Scratches;
      } else if (BEAN < 24 * 47) {
        selectedScene = this.inputs.B5intro;
      } else if (BEAN < 24 * 49) {
        selectedScene = this.inputs.B5;
      } else if (BEAN < 24 * 53) {
        selectedScene = this.inputs.B6;
      } else if (BEAN < 24 * 57) {
        selectedScene = this.inputs.A5;
      } else if (BEAN < 24 * 61) {
        selectedScene = this.inputs.A6;
      } else {
        selectedScene = this.inputs.Outro;
      }
      selectedScene.enabled = true;
      this.selectedScene = selectedScene;
    }

    render(renderer) {
      //renderer.physicallyCorrectLights = true;
      //renderer.gammaInput = true;
      //renderer.gammaOutput = true;
      //renderer.gammaFactor = 2.2;
      renderer.shadowMap.enabled = true;
      //renderer.toneMapping = THREE.ReinhardToneMapping;
      const exposure = 0.68;
      //renderer.toneMappingExposure = Math.pow(exposure, 5.0);

      this.outputs.render.setValue(this.selectedScene.getValue());
    }
  }

  global.SceneSwitcherNode = SceneSwitcherNode;
})(this);

(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class splasherNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        A: new NIN.TextureInput(),
        PaperContent: new NIN.TextureInput(),
      };
      super(id, options);

      this.solMap = Loader.loadTexture('res/sol-graffiti.png');
      this.skogMap = Loader.loadTexture('res/skog-graffiti.png');
      this.enMap = Loader.loadTexture('res/en-graffiti.png');
      this.musicMap = Loader.loadTexture('res/music-graffiti.png');
      this.demoMap = Loader.loadTexture('res/demo-graffiti.png');
      this.graphicsMap = Loader.loadTexture('res/graphics-graffiti.png');
    }

    update(frame) {
      this.uniforms.frame.value = frame;
      this.uniforms.tDiffuse.value = this.inputs.A.getValue();
      this.uniforms.paperContent.value = this.inputs.PaperContent.getValue();
      this.uniforms.image.value = this.solMap;
      this.uniforms.overlayer.value = 0;
      this.inputs.A.enabled = true;
      const BAR = BEAN / 24;
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
      if(BAR >= 21 && BAR < 22) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.demoMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, 21 * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, 21 * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 21 * 24, 24));
        this.uniforms.r.value = 0.5;
        this.uniforms.g.value = 0.5;
        this.uniforms.b.value = 1.0;
        this.uniforms.paperR.value = 1.0;
        this.uniforms.paperG.value = 1.0;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, 21 * 24 + 12 + 6, 6));
      }
      if(BAR >= 25 && BAR < 26) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.musicMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, 25 * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, 25 * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 25 * 24, 24));
        this.uniforms.r.value = 1.0;
        this.uniforms.g.value = 0.5;
        this.uniforms.b.value = 0.5;
        this.uniforms.paperR.value = 0.5;
        this.uniforms.paperG.value = 1.0;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, 25 * 24 + 12 + 6, 6));
      }
      if(BAR >= 29 && BAR < 30) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.graphicsMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, 29 * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, 29 * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 29 * 24, 24));
        this.uniforms.r.value = 0.90;
        this.uniforms.g.value = 0.85;
        this.uniforms.b.value = 0.75;
        this.uniforms.paperR.value = 0.5;
        this.uniforms.paperG.value = 0.5;
        this.uniforms.paperB.value = 1.0;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, 29 * 24 + 12 + 6, 6));
      }
    }
  }

  global.splasherNode = splasherNode;
})(this);

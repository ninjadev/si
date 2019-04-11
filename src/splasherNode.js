(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class splasherNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        A: new NIN.TextureInput(),
        PaperContent: new NIN.TextureInput(),
      };
      super(id, options);

      this.flatshadeMap = Loader.loadTexture('res/flatshadesociety-graffiti.png');
      this.flatebyMap = Loader.loadTexture('res/flateby-marker-overlay-graffiti.png');
      this.solMap = Loader.loadTexture('res/sol-graffiti.png');
      this.skogMap = Loader.loadTexture('res/skog-graffiti.png');
      this.enMap = Loader.loadTexture('res/en-graffiti.png');
      this.musicMap = Loader.loadTexture('res/music-graffiti.png');
      this.demoMap = Loader.loadTexture('res/demo-graffiti.png');
      this.graphicsMap = Loader.loadTexture('res/graphics-graffiti.png');
    }

    update(frame) {
      this.uniforms.generalGrayScaler.value = easeIn(1, 0, F(frame, 96, 24));
      this.uniforms.radiuser.value = 4;

      this.uniforms.frame.value = frame;
      this.uniforms.tDiffuse.value = this.inputs.A.getValue();
      this.uniforms.paperContent.value = this.inputs.PaperContent.getValue();
      this.uniforms.image.value = this.solMap;
      this.uniforms.overlayer.value = 0;
      this.inputs.A.enabled = true;
      this.uniforms.backgroundiness.value = 1;
      this.uniforms.framiness.value = 1;
      const BAR = BEAN / 24;
      if(BAR >= 5 && BAR < 6) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.flatshadeMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, 5 * 24, 3)) * 0.9;
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler * 1.2;
        this.uniforms.xOffset.value = 0;
        this.uniforms.yOffset.value = 0;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 5 * 24, 24));
        this.uniforms.r.value = 0.5;
        this.uniforms.g.value = 0.5;
        this.uniforms.b.value = 1.0;
        this.uniforms.paperR.value = 1.0;
        this.uniforms.paperG.value = 1.0;
        this.uniforms.paperB.value = 1.0;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, 5 * 24 + 12 + 6, 6));
        this.uniforms.backgroundiness.value = 0;
        this.uniforms.framiness.value = 0;
      }
      if(BAR >= 9 && BAR < 10) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.skogMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, 9 * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, 9 * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 9 * 24, 24));
        this.uniforms.r.value = 0.5;
        this.uniforms.g.value = 1.0;
        this.uniforms.b.value = 0.5;
        this.uniforms.paperR.value = .5;
        this.uniforms.paperG.value = .5;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, 9 * 24 + 12 + 6, 6));
      }
      if(BAR >= 13 && BAR < 14) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.enMap;
        const scaler = 1;//elasticOut(1.0, .1, 1, F(frame, 13 * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, 13 * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 13 * 24, 24));
        this.uniforms.r.value = 0.5;
        this.uniforms.g.value = 0.5;
        this.uniforms.b.value = 1.0;
        this.uniforms.paperR.value = 1.0;
        this.uniforms.paperG.value = 1.0;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, 13 * 24 + 12 + 6, 6));
      }
      if(BAR >= 29 && BAR < 30) {
        const bar = 29;
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.demoMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, bar * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, bar * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, bar * 24, 24));
        this.uniforms.r.value = 0.5;
        this.uniforms.g.value = 0.5;
        this.uniforms.b.value = 1.0;
        this.uniforms.paperR.value = 1.0;
        this.uniforms.paperG.value = 1.0;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, bar * 24 + 12 + 6, 6));
      }
      if(BAR >= 17 && BAR < 21) {
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.flatebyMap;
        const scaler = 1.0 * elasticOut(1.0, .1, 1, F(frame, 17 * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = 0.16;
        this.uniforms.yOffset.value = 0;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, 17 * 24, 24));
        this.uniforms.r.value = 1.0;
        this.uniforms.g.value = 1.0;
        this.uniforms.b.value = 0.5;
        this.uniforms.paperR.value = 0.5;
        this.uniforms.paperG.value = 0.5;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.radiuser.value = easeOut(0, 3.5, F(frame, 17 * 24, 24));
        this.uniforms.overlayer.value = 1;
      }
      if(BAR >= 31 && BAR < 32) {
        const bar = 31;
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.musicMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, bar * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, bar * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, bar * 24, 24));
        this.uniforms.r.value = 1.0;
        this.uniforms.g.value = 1.0;
        this.uniforms.b.value = 1.0;
        this.uniforms.paperR.value = 0.5;
        this.uniforms.paperG.value = 1.0;
        this.uniforms.paperB.value = 0.5;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, bar * 24 + 12 + 6, 6));
      }
      if(BAR >= 33 && BAR < 34) {
        const bar = 33;
        this.uniforms.overlayer.value = 1;
        this.uniforms.image.value = this.graphicsMap;
        const scaler = elasticOut(1.0, .1, 1, F(frame, bar * 24, 3));
        this.uniforms.xScale.value = 2100 / 1500 * scaler;
        this.uniforms.yScale.value = 1 * scaler;
        this.uniforms.xOffset.value = lerp(0.2, 0.22, F(frame, bar * 24, 24));
        this.uniforms.yOffset.value = 0.05;
        this.uniforms.xOffsetPaper.value = lerp(0.03, 0.0, F(frame, bar * 24, 24));
        this.uniforms.r.value = 0.90;
        this.uniforms.g.value = 0.85;
        this.uniforms.b.value = 0.75;
        this.uniforms.paperR.value = 0.5;
        this.uniforms.paperG.value = 0.5;
        this.uniforms.paperB.value = 1.0;
        this.uniforms.overlayer.value = lerp(1, 0, F(frame, bar * 24 + 12 + 6 + 12, 6));
      }
    }
  }

  global.splasherNode = splasherNode;
})(this);

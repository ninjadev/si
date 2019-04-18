(function(global) {
  class LineDepth extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         depthmap: new NIN.TextureInput(),
         lines: new NIN.TextureInput(),
         rendered_input: new NIN.TextureInput(),
      }
      super(id, options);

      this.map_image = Loader.loadTexture('res/map/norge.png');
      this.testpattern = Loader.loadTexture('res/map/testlines.jpg');
    }

    update(frame) {
      this.uniforms.raw_bg.value = this.testpattern;
      this.uniforms.depthmap.value = this.inputs.lines.getValue();
      this.uniforms.rendered_input.value = this.inputs.rendered_input.getValue();
      this.uniforms.frame.value = frame;
      this.uniforms.blackfade.value = smoothstep(1, 0, (frame - 4737) / 50);

      if((frame > FRAME_FOR_BEAN(865) && frame < FRAME_FOR_BEAN(867)) || 
        frame > FRAME_FOR_BEAN(871) && frame < FRAME_FOR_BEAN(872.5) ||
        BEAN > 879
        ) 
      {
        this.uniforms.sobel_power.value = 1.0;
      } else {
        this.uniforms.sobel_power.value = 0.0;
      }
    }
  }

  global.LineDepth = LineDepth;
})(this);

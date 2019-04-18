(function(global) {
  class LineDepth extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         depthmap: new NIN.TextureInput(),
         lines: new NIN.TextureInput(),
      }
      super(id, options);

      this.map_image = Loader.loadTexture('res/map/norge.png');
      this.testpattern = Loader.loadTexture('res/map/testlines.jpg');
    }

    update(frame) {
      /*this.uniforms.tDiffuse.value = this.inputs.three_scene.getValue();
      this.uniforms.z1.value = this.inputs.bgpants.getValue();
      this.uniforms.z2.value = this.inputs.squiggles.getValue();
      this.uniforms.z3.value = this.inputs.bgblue.getValue();
      this.uniforms.z4.value = this.inputs.bgrightarrow.getValue();
      this.uniforms.z5.value = this.inputs.bgzigzag.getValue();
      this.uniforms.z6.value = this.inputs.bgpink.getValue();*/
      
      //this.uniforms.tDiffuse.value = this.inputs.three_scene.getValue();
      //this.uniforms.depthmap.value = this.map_image;
      this.uniforms.raw_bg.value = this.testpattern;
      this.uniforms.depthmap.value = this.inputs.lines.getValue();
      this.uniforms.frame.value = frame;
      this.uniforms.blackfade.value = smoothstep(1, 0, (frame - 4737) / 50);

      this.uniforms.sobel_power.value = 0.5 + 0.5 * Math.sin(frame/10);
    }
  }

  global.LineDepth = LineDepth;
})(this);

(function(global) {
  class blobbobob extends NIN.Node {
    constructor(id) {
      super(id, {
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.output = new THREE.VideoTexture(this.canvas);
      this.output.minFilter = THREE.LinearFilter;
      this.output.magFilter = THREE.LinearFilter;
      this.throb = 0;
      this.rotation = 0;
      this.rotationOffsets = [0, 0, 0];
      this.frequencies = [0, 0, 0];
    }

    update(frame) {
      super.update(frame);
      this.frame = frame;
      this.throb *= 0.9;
      if(BEAT && BEAN % 4 === 0) {
        this.throb = 1;
        this.rotationOffsets[0] = Math.random() * Math.PI * 2;
        this.rotationOffsets[1] = Math.random() * Math.PI * 2;
        this.rotationOffsets[2] = Math.random() * Math.PI * 2;
        this.frequencies[0] = 1 + Math.random() * 3 | 0;
        this.frequencies[1] = 1 + Math.random() * 3 | 0;
        this.frequencies[2] = 1 + Math.random() * 3 | 0;
      }
      this.rotation += this.throb * 0.2;
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
    }

    render() {
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.save();
      this.ctx.scale(GU, GU);
      this.ctx.translate(8, 4.5);


      const steps = 64;
      this.ctx.globalCompositeOperation = 'lighter';
      for(let j = 0; j < 3; j++) {
        this.ctx.fillStyle = ['#ff7f7f', '#7fff7f', '#7f7fff'][j];
        this.ctx.beginPath();
        for(let i = 0; i <= steps; i++) {
          const amplitude = 2 + 0.5 * Math.max(0, this.throb * Math.sin(this.rotationOffsets[j] + this.rotation + i / steps * Math.PI * 2 * this.frequencies[j]));
          const x = amplitude * Math.sin(i / steps * Math.PI * 2);
          const y = amplitude * Math.cos(i / steps * Math.PI * 2);
          if(i === 0) {
          this.ctx.moveTo(x, y);
          } else {
          this.ctx.lineTo(x, y);
          }
        }
        this.ctx.fill();
      }

      this.ctx.restore();

      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.blobbobob = blobbobob;
})(this);

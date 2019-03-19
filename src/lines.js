(function(global) {

  const N_shape = [
    new THREE.Vector2(0, 9),
    new THREE.Vector2(1, 9),
    new THREE.Vector2(1, 3),
    new THREE.Vector2(3, 9),
    new THREE.Vector2(4, 9),
    new THREE.Vector2(4, 0),
    new THREE.Vector2(3, 0),
    new THREE.Vector2(3, 6),
    new THREE.Vector2(1, 0),
    new THREE.Vector2(0, 0),
  ];

  function intersect(a, b, c, d) {
    const x = (
      (b.x * a.y - a.x * b.y) * (d.x - c.x) -
      (d.x * c.y - c.x * d.y) * (b.x - a.x)
    ) / (
      (b.x - a.x) * (d.y - c.y) - (d.x - c.x) * (b.y - a.y)
    );
    const y = (
      (b.x * a.y - a.x * b.y) * (d.y - c.y) -
      (d.x * c.y - c.x * d.y) * (b.y - a.y)
    ) / (
      (b.x - a.x) * (d.y - c.y) - (d.x - c.x) * (b.y - a.y)
    );
    return new THREE.Vector2(x, y);
  }

  class lines extends NIN.Node {
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

      this.throb = 1;
      this.steps = 4;
      this.xOffset = 0;
      this.yOffset = 0;
    }

    buildShapes(frame) {

      this.throb *= 0.9;
      if(BEAT && BEAN % 8 === 4) {
        this.throb = 1;
        this.steps = 3 + Math.random() * 8 | 0;
        this.xOffset = (Math.random() - 0.5) * 10;
        this.yOffset = (Math.random() - 0.5) * 5;

      }

        this.shapes = [];

      /*
        const shape = [];
        const steps = this.steps;
        for (let i = 0; i < steps; i++) {
          let amplitude = 0.1 + this.throb * 2 * Math.sin(9999 * i + frame / 10);
          if(amplitude < 0.5) {
          amplitude = 0.5;
          }
          const x = amplitude * Math.sin(i / steps * Math.PI * 2);
          const y = amplitude * Math.cos(i / steps * Math.PI * 2);
          shape.push({x, y});
        }
      */

      const shape = [];
      for(const point of N_shape) {
        const p = point.clone();
        p.x -= 2;
        p.y -= 4.5;
        p.multiplyScalar(0.5);
        shape.push(p);
      }

        for(let j = 0; j < 32; j++) {
          const edges = [];
          for(let i = 0; i < shape.length; i++) {
            const p1 = shape[i];
            const p2 = shape[(i + 1) % shape.length];
            const x = lerp(p1.x, p2.x, 0.5);
            const y = lerp(p1.y, p2.y, 0.5);
            const direction = new THREE.Vector2(x - p1.x, y - p1.y);
            const normal = new THREE.Vector2(-direction.y, direction.x);
            normal.normalize();
            normal.multiplyScalar(0.2 * (j + 1) + 0.00 * Math.sin(this.xOffset * this.yOffset + j * this.steps + this.steps + i * 1000001 + frame / 4));
            const newP1 = new THREE.Vector2(p1.x + normal.x , p1.y + normal.y);
            const newP2 = new THREE.Vector2(p2.x + normal.x , p2.y + normal.y);
            edges.push([{
              x: newP1.x,
              y: newP1.y,
            },
              {
              x: newP2.x,
              y: newP2.y,
            }]);
          }

          const shape2 = [];
          for(let i = 0; i < edges.length; i++) {
            const edgeA = edges[i];
            const edgeB = edges[(i + 1) % edges.length];
            const point = intersect(edgeA[0], edgeA[1], edgeB[0], edgeB[1]);
            shape2.push(point);
          }

          this.shapes.push(shape2);


          for(const edge of edges) {
            //this.shapes.push(edge);
          }
        }
        this.shapes.push(shape);
    }


    update(frame) {
      super.update(frame);
      this.frame = frame;
      this.buildShapes(frame);
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
    }


    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = '#f5f5f5';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.save();
      this.ctx.scale(GU, GU);
      this.ctx.translate(8, 4.5);
      this.ctx.translate(this.xOffset, this.yOffset);
      this.ctx.rotate(this.frame / 54);


      this.ctx.strokeStyle = '#444';
      this.ctx.lineWidth = 0.02;

      this.ctx.beginPath();
      for(const shape of this.shapes) {
        this.ctx.moveTo(shape[0].x, shape[0].y);
        for(let i = 1; i < shape.length; i++) {
          this.ctx.lineTo(shape[i].x, shape[i].y);
        }
        this.ctx.lineTo(shape[0].x, shape[0].y);
      }
      this.ctx.stroke();

      this.ctx.restore();

      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.lines = lines;
})(this);

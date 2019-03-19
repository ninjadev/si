(function(global) {


  class pathy extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });


      this.lines = [];
      const verticalCount = 22;
      const width = 15.5;
      for(let i = 0; i < verticalCount; i++) {
        const path = new Path();
        path.lineTo(0, -200);
        path.lineTo(0, 200);
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.position.x = (i - verticalCount / 2) * width;
        line.path = path;
      }

      const horizontalAmount = 40;
      for(let j = 0; j < horizontalAmount; j++) {
        const p2 = new Path({debug: false, directionSize: 3});
        for(let i = 0; i < verticalCount; i++) {
          const direction = i % 2 === 0 ? 1 : -1;
          p2.lineTo(width * i, 5 * direction);
        }
        const l2 = p2.toObject3D();
        l2.path = p2;
        p2.uniforms.wobbliness.value = 1;
        this.lines.push(l2);
        this.scene.add(l2);
        l2.position.x = -verticalCount / 2 * width;
        l2.position.y = (j - horizontalAmount / 2) * 5;
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);
      for(let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value =  2 * Math.sin(frame / 100 - i * 0.01) + 0.5 + 0.5 * Math.sin(i);
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.pathy = pathy;
})(this);

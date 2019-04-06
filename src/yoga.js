(function(global) {
  class yoga extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      const gridsize = 20;
      const xcount = 30;
      const ycount = 30;
      for(let j = 0; j < xcount; j++) {
        for(let i = 0; i < ycount; i++) {
          const x = (i - xcount / 2 - 0.25 + (j % 2 === 0 ? 0.5 : 0)) * gridsize;
          const y = (j - ycount / 2) * gridsize * 0.5;
          const path = new Path();
          path.directionSize = 1;
          const steps = 32;
          const r = 5;
          for(let a = 0; a <= steps; a++) {
            const u = r * Math.sin(a * Math.PI * 2 / steps);
            const v = r * Math.cos(a * Math.PI * 2 / steps);
            path.lineTo(u, v);
          }
          const line = path.toObject3D();
          line.position.x = x;
          line.position.y = y;
          line.rotation.z = Math.random() * 2 * Math.PI;
          this.lines.push(line);
          this.scene.add(line);
          line.path = path;
        }
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: Loader.loadTexture('res/paper.png'),
          side: THREE.DoubleSide,
        }));
      this.wall.material.map.repeat.set(4, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
    }

    update(frame) {
      super.update(frame);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = Math.max((frame / 100 % 2) - 1, 0);
        path.material.uniforms.drawEnd.value = Math.min((frame / 100) % 2, 1);
        path.material.uniforms.wobbliness.value = 1;
        //this.lines[i].rotation.y = (frame) / 50;
      }

      //this.camera.rotation.z = frame / 500;
      //this.camera.position.z = 150 + 50 * Math.sin(frame / 1000);
    }
  }

  global.yoga = yoga;
})(this);

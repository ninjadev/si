(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class yoga extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      this.sceneContainer = new THREE.Object3D();

      const gridsize = 20;
      const xcount = 30;
      const ycount = 30;
      for(let j = 0; j < xcount; j++) {
        for(let i = 0; i < ycount; i++) {
          const x = (i - xcount / 2 - 0.25 + (j % 2 === 0 ? 0.5 : 0)) * gridsize;
          const y = (j - ycount / 2) * gridsize * 0.5;
          const path = new Path({
            fill: true,
          });
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
          this.sceneContainer.add(line);
          line.path = path;
        }
      }

      this.scene.add(this.sceneContainer);

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

      const containerScale = BEAN >= 906 ? 2 : 1;
      this.sceneContainer.scale.set(containerScale, containerScale, containerScale);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = easeOut(
          0,1,
          F(frame, 888, 6));
        if(BEAN >= 900) {
          path.material.uniforms.drawStart.value = easeOut(
            0,1,
            F(frame, 903, 0));
        }
        path.material.uniforms.width.value = BEAN >= 906 ? 0.8 : 1.3;
        path.fillMesh.visible = BEAN >= 906;
        if(BEAN >= 906) {
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = easeOut(
            0,1,
            F(frame, 906, 0));
        }
        path.material.uniforms.wobbliness.value = 1;
        //this.lines[i].rotation.y = (frame) / 50;
      }

      //this.camera.rotation.z = frame / 500;
      //this.camera.position.z = 150 + 50 * Math.sin(frame / 1000);
    }
  }

  global.yoga = yoga;
})(this);

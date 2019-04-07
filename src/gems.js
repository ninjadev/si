(function(global) {
  class gems extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
          const [width, height] = (i%2===j%2) ? [8, 10] : [4, 5];
          const path = new Path();
          path.lineTo(-width, 0);
          path.lineTo(0, height);
          path.lineTo(width, 0);
          path.lineTo(0, -height);
          path.lineTo(-width, 0);
          const line = path.toObject3D();
          line.position.x = -150 + i * 30;
          line.position.y = -90 + j * 30;
          this.lines.push(line);
          this.scene.add(line);
          line.path = path;
          line.initialY = line.position.y;
        }
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({map: Loader.loadTexture('res/paper.png')}));
      this.wall.material.map.repeat.set(4, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(48 * 5);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 2) / 100);
        path.material.uniforms.wobbliness.value = 1;

        const line = this.lines[i];
        line.position.y = line.initialY - easeIn(0, 270, (frame - startFrame - 200 - i * 2) / 70);
      }
    }
  }

  global.gems = gems;
})(this);

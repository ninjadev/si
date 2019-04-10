(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class gems extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.lines = [];

      const sizeAdjuster = 0.6;

      this.sceneWrapper = new THREE.Object3D();
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
          let [width, height] = (i%2===j%2) ? [8, 10] : [4, 5];
          width *= sizeAdjuster;
          height *= sizeAdjuster;
          const path = new Path({
            fill: true,
            fillColor: 0x7f7fff,
          });
          path.lineTo(-width, 0);
          path.lineTo(0, height);
          path.lineTo(width, 0);
          path.lineTo(0, -height);
          path.lineTo(-width, 0);
          const line = path.toObject3D();
          line.position.x = -150 + i * 30;
          line.position.y = -90 + j * 30;
          line.position.x *= sizeAdjuster;
          line.position.y *= sizeAdjuster;
          this.lines.push(line);
          this.sceneWrapper.add(line);
          line.path = path;
          line.initialY = line.position.y;
        }
      }
      this.scene.add(this.sceneWrapper);
      this.sceneWrapper.scale.set(1/sizeAdjuster, 1/sizeAdjuster,1 /sizeAdjuster);


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

      const startFrame = FRAME_FOR_BEAN(24 * 5);

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

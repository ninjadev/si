(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));

  class sirpathrick extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      const scaler = 0.3;

      const tracks = [
        {coords: [[-300,-169],[300,169]], offset: [0, 0]},
        {coords: [[300,-169],[-300,169]], offset: [0, 0]},

        {coords: [[-300,-169],[300,169]], offset: [0, 10]},
        {coords: [[300,-169],[-300,169]], offset: [0, 10]},

        {coords: [[-300,-169],[300,169]], offset: [0, -10]},
        {coords: [[300,-169],[-300,169]], offset: [0, -10]},
      ];

      this.lines = [];

      for (const track of tracks) {
        const path = new Path({debug: false});
        for (const [x, y] of track.coords) {
          path.lineTo(x * scaler, y * scaler);
        }
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.position.x = track.offset[0];
        line.position.y = track.offset[1];
        line.path = path;
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
      //this.wall.position.z = -100;
    }

    warmup(renderer) {
      this.update(1859);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      if (frame > FRAME_FOR_BEAN(330)) {
        frame = frame + FRAME_FOR_BEAN(24 * 12.5) - FRAME_FOR_BEAN(330);
      }

      const startFrame = FRAME_FOR_BEAN(24 * 12.5);
      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        if(i % 2 === 0) {
          path.material.uniforms.drawEnd.value =  easeOut(0, 1, F(frame, 306 - 0, 2));

        } else {
          path.material.uniforms.drawEnd.value =  easeOut(0, 1, F(frame, 306 + 3, 2));

        }
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.sirpathrick = sirpathrick;
})(this);

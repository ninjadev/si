(function(global) {

  class sirpathrick extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

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
          path.lineTo(x, y);
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

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(48 * 6);
      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value =  lerp(0, 1, (frame - startFrame) / 50);
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.sirpathrick = sirpathrick;
})(this);

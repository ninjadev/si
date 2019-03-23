(function(global) {
  class moose extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      const tracks = [
        /*
        {coords: [[-300,-169],[300,169]], offset: [0, 0]},
        {coords: [[300,-169],[-300,169]], offset: [0, 0]},

        {coords: [[-300,-169],[300,169]], offset: [0, 10]},
        {coords: [[300,-169],[-300,169]], offset: [0, 10]},

        {coords: [[-300,-169],[300,169]], offset: [0, -10]},
        {coords: [[300,-169],[-300,169]], offset: [0, -10]},
        */

        {
          coords: [
            [-10,-70],[-10,-50],[-30,-50],[-10,-20],[-30,-20],[-10,10],[-25,10],
            [0,50],
            [25,10],[10,10],[30,-20],[10,-20],[30,-50],[10,-50],[10,-70]],
          offset: [-80, 0],
        },

        {
          coords: [[25,10],[-25,10],[0,50],[25,10]],
          offset: [0, 10],
        },
        {
          coords: [[10,10],[30,-20],[-30,-20],[-10,10]],
          offset: [0, 10],
        },
        {
          coords: [[10,-20],[30,-50],[-30,-50],[-10,-20]],
          offset: [0, 10],
        },
        {
          coords: [[10,-50],[10,-70],[-10,-70],[-10,-50]],
          offset: [0, 10],
        },

        {
          coords: [
            [-10,-70],[-10,-50],[-30,-50],[-10,-20],[-30,-20],[-10,10],[-25,10],
            [0,50],
            [25,10],[10,10],[30,-20],[10,-20],[30,-50],[10,-50],[10,-70]],
          offset: [80, 0],
        },

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
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);
      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value =  2 * Math.sin(frame / 100 - i * 0.01) + 0.5 + 0.5 * Math.sin(i);
        path.material.uniforms.wobbliness.value = 1;
      }
    }
  }

  global.moose = moose;
})(this);

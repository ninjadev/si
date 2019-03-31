(function(global) {

  class trees extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      const curve = [];
      for (let i = 0; i < 20; i++) {
        const x = 200 * Math.cos(i*Math.PI/20);
        const y = 100 * Math.sin(i*Math.PI/20);
        curve.push([x, y]);
      }

      function makeTree(offset) {
        return [
          {
            coords: [[25,10],[-25,10],[0,50],[25,10]],
            offset,
          },
          {
            coords: [[10,10],[30,-20],[-30,-20],[-10,10]],
            offset,
          },
          {
            coords: [[10,-20],[30,-50],[-30,-50],[-10,-20]],
            offset,
          },
          {
            coords: [[10,-50],[10,-70],[-10,-70],[-10,-50]],
            offset,
          },
        ];
      }

      const tracks = [
        {
          coords: curve,
          offset: [0, -150],
        },
        ...makeTree([0, 20]),
        ...makeTree([-80, 10]),
        ...makeTree([80, 10]),
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
      const startFrame = FRAME_FOR_BEAN(48* 18 + 12);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 10) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      this.camera.position.z = easeIn(200, 30, (frame - startFrame) / 500);
      this.camera.position.y = easeIn(0, 55, (frame - startFrame) / 500);
    }
  }

  global.trees = trees;
})(this);

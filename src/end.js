(function(global) {
  class end extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });
      let path;
      let line;

      this.flat = makeLine([
        [-100, 0],
        [-100, 50],
        [-70, 50],
        [-100, 50],
        [-100, 30],
        [-80, 30],
      ], null, 10);
      this.scene.add(this.flat);

      function makeLine(arr, color = null, directionSize = 1, fill = false, fillColor = null) {
        let path = new Path({color, directionSize, fill, fillColor});
        for(const [x, y] of arr) {
          path.lineTo(x, y);
        }
        line = path.toObject3D();
        line.path = path;
        return line;
      }


      this.camera.position.z = 300;
      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: Loader.loadTexture('res/paper.png'),
          side: THREE.BackSide,
        }));
      this.wall.material.map.repeat.set(4, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
    }

    update(frame) {
      super.update(frame);
    }
  }

  global.end = end;
})(this);

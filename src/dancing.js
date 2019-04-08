(function(global) {
  class dancing extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      let path;
      let line;
      let curve;
      let directionSize = 2;
      let fill = true;
      let fillColor = "#ffffff";

      const info = [
        [0, 0, "l", "#ff99e6"], 
        [70, 50, "s", "#E1CAA0"], 
        [-40, -110, "m", "#ff9933"], 
        [-95, 40, "s", "#b2997c"], 
        [-135, -75, "m", "#86592d"], 
        [-200, 20, "m", "#53402d"], 
        [90, -70, "m", "#000000"], 
        [150, 15, "m", "#000000"], 
        [-250, -90, "m", "#000000"], 
        [250, 35, "m", "#000000"], 
        [210, -90, "m", "#000000"]
      ];

      this.guys = [];
      for(let i = 0; i < info.length; i++) {
        let size = i % 2 === 1 || i === 0 ? 0.4 : 0.5;
        let r = 20 * size;
        let x = info[i][0];
        let y = info[i][1]; 

        let hair = makeHair(x, y + r * 2, size, info[i][2], info[i][3]);
        this.scene.add(hair);
        let head = makeHead(x, y, size, r, fill, fillColor);
        this.scene.add(head);
        let frontleft = makeFront(0, 0, size, directionSize, fill, fillColor);
        frontleft.position.set(x, y, 0);
        this.scene.add(frontleft);
        let frontright = frontleft.clone();
        frontright.scale.x = -1;
        this.scene.add(frontright);
        let backleft = makeFront(0, 0, size, directionSize, fill, fillColor);
        backleft.position.set(x, y, 0);
        this.scene.add(backleft);
        let backright = backleft.clone();
        backright.scale.x = -1;
        this.scene.add(backright);
        let body = {head, hair, frontleft, frontright, backleft, backright}
        this.guys.push(body);
      }

      let discoball = makeDiscoBall();
      this.scene.add(discoball);
 
      const xyz = [[2.3, 130, 0], [2.7, 130, 0], [0, 5, 0], [3.6, 130, 0], [4, 130, 0]];
      const colors = ["#00F0F6", "#F61D64", "#7EF600"];
      this.discolines = [];
      for(let l = 0; l < 5; l++) {
        let color = new THREE.Color(colors[l % 3]).multiplyScalar(0.8);
        color = new THREE.Vector3(color.r, color.g, color.b);
        path = new Path({color});
        let ly = 90;
        for(let i = 0; i < 12; i++) {
          path.lineTo(i % 2 == 0 ? -2 : 2, ly);
          ly -= 5;
        }
        line = path.toObject3D();
        line.path = path;
        line.rotation.z = xyz[l][0];
        line.position.set(xyz[l][2], xyz[l][1], 0);
        this.discolines.push(line);
        this.scene.add(line);
      }

      function makeHead(x, y, size, r, fill, fillColor) {
        y = y + r;
        let hode = new THREE.Object3D();
        curve = makeCurve(r, x, y);
        line = makeLine(curve, null, 2, fill, fillColor);
        hode.add(line);
        line = makeLine([
          [x + 10 * size, y - 10 * size],
          [x, y - r + (r/4)],
          [x - 10 * size, y - 10 * size],
          [x + 10 * size, y - 10 * size]
        ], null, 1);
        hode.add(line);
        curve = makeCurve(1, x + (r/4), y + (r/4));
        line = makeLine(curve, null, 1);
        hode.add(line);
        curve = makeCurve(1, x - (r/4), y + (r/4));
        line = makeLine(curve, null, 1);
        hode.add(line);
        return hode;
      }

      function makeFront(x, y, size, directionSize, fill, fillColor) {
        let front = new THREE.Object3D();
        line = makeLine([
          [x, y],
          [x, y - 10 * size],
          [x + 25 * size, y - 12 * size],
          [x + 100 * size, y - 100 * size],
          [x + 92 * size, y - 108 * size],
          [x + 25 * size, y - 30 * size],
          [x + 22 * size, y - 74 * size]
        ], null, directionSize, fill, fillColor);
        front.add(line);
        line = makeLine([
          [x + 21 * size, y - 91 * size],
          [x + 20 * size, y - 130 * size],
          [x + 25 * size, y - 215 * size],
          [x + 10 * size, y - 215 * size],
          [x + 5 * size, y - 132 * size],
          [x - 20 * size, y - 132 * size],
          [x - 15 * size, y - 215 * size],
          [x - 30 * size, y - 215 * size],
          [x - 35 * size, y - 130 * size],
          [x - 30 * size, y - 30 * size],
          [x - 30 * size, y - 12 * size],
          [x - 10 * size, y - 10 * size],
          [x - 10 * size, y],
          [x, y]
        ], null, directionSize, fill, fillColor);
        front.add(line);
        line = makeLine([
          [x - 30 * size, y - 30 * size],
          [x + 37 * size, y - 108 * size],
          [x + 45 * size, y - 100 * size],
          [- 30 * size, y - 12 * size]
        ], null, directionSize, fill, fillColor);
        front.add(line);
        return front;
      }

      function makeBack(x, y, size, directionSize, fill, fillColor) {
        let back = new THREE.Object3D();
        line = makeLine([
          [x, y],
          [x, y - 10 * size],
          [x - 25 * size, y - 12 * size],
          [x - 100 * size, y - 100 * size],
          [x - 92 * size, y - 108 * size],
          [x - 25 * size, y - 30 * size],
          [x - 20 * size, y - 130 * size],
          [x - 25 * size, y - 215 * size],
          [x - 10 * size, y - 215 * size],
          [x - 5 * size, y - 132 * size],
          [x + 20 * size, y - 132 * size],
          [x + 15 * size, y - 215 * size],
          [x + 30 * size, y - 215 * size],
          [x + 35 * size, y - 130 * size],
          [x + 30 * size, y - 30 * size],
          [x + 30 * size, y - 12 * size],
          [x + 10 * size, y - 10 * size],
          [x + 10 * size, y]
        ], null, directionSize, fill, fillColor);
        back.add(line);
        line = makeLine([
          [x - 22 * size, y - 91 * size],
          [x - 37 * size, y - 108 * size],
          [x - 45 * size, y - 100 * size],
          [x - 22 * size, y - 73 * size]
        ], null, directionSize, fill, fillColor);
        back.add(line);
        return back;
      }

      function makeHair(x, y, size, length, color) {
        let hair = new THREE.Object3D();
        color = new THREE.Color(color).multiplyScalar(0.8);
        color = new THREE.Vector3(color.r, color.g, color.b);
        let arr = length === "l" ? [
          [x - 24 * size, y - 100 * size],
          [x - 16 * size, y - 8 * size],
          [x, y - 1 * size],
          [x + 16 * size, y - 8 * size],
          [x + 24 * size, y - 100 * size]
        ] : length === "s" ? [
          [x - 16 * size, y - 12 * size],
          [x - 8 * size, y - 2 * size],
          [x + 10 * size, y - 4 * size],
          [x + 16 * size, y - 10 * size]
        ] : [
          [x - 16 * size, y - 16 * size], 
          [x - 8 * size, y - 1 * size], 
          [x + 10 * size, y - 3 * size], 
          [x + 16 * size, y - 13 * size]
        ];
        let directionSize = length = "s" ? 5 : 12;
        line = makeLine(arr, color, directionSize)
        hair.add(line);
        return hair;
      }

      function makeDiscoBall() {
        let ball = new THREE.Object3D();
        line = makeLine([[0, 200], [0, 160]]);
        ball.add(line);
        let s = 1;
        for(let i = 0; i < 11; i++) {
          let curves = makeCurve(30, 0, 130, s, 1);
          line = makeLine(curves);
          ball.add(line);
          curves = makeCurve(30, 0, 130, 1, s);
          line = makeLine(curves);
          ball.add(line);
          s -= 0.1;
        }
        return ball;
      }

      function makeCurve(radius, x, y, xScale=1, yScale=1) {
        const curve = [];
        for (let i = 0; i <= 20; i++) {
          const angle = i * Math.PI / 10;
          curve.push([
            x + xScale * radius * Math.cos(angle),
            y + yScale * radius * Math.sin(angle),
          ]);
        }
        return curve;
      }

      function makeLine(arr, color = null, directionSize = 1, fill = false, fillColor = null) {
        let path = new Path({color, directionSize, fill, fillColor});
        for(const [x, y] of arr) {
          path.lineTo(x, y);
        }
        line = path.toObject3D();
        line.path = path;
        return line;
      }

      this.camera.position.z = 10;
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
      const startframe = 8080;
      this.camera.position.z = lerp(70, 1500, Math.tan((frame-startframe) * 0.001));

      for(let i = 0; i < this.discolines.length; i++) {
        const path = this.discolines[i].path;
        path.material.uniforms.drawStart.value = i != 2 ? lerp(1, 0, Math.tan((frame - startframe)/10)) : 0;
        path.material.uniforms.drawEnd.value = i == 2 ? lerp(0, 1, Math.tan((frame - startframe)/10)) : 1;
      }

      for(const body of this.guys) {
        body.frontleft.visible = (BEAN % 36 < 6) || (BEAN % 36 >= 12 && BEAN % 36 < 18);
        body.backleft.visible = BEAN % 36 >= 6 && BEAN % 36 < 12;
        body.frontright.visible = (BEAN % 36 >= 18 && BEAN % 36 < 24) || (BEAN % 36 >= 30);
        body.backright.visible = BEAN % 36 >= 24 && BEAN % 36 < 30;
      }
    }
  }

  global.dancing = dancing;
})(this);

(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  function easeInOutElastic(a, b, t) {
    t = (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1;
    return lerp(a, b, t);
  }

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
      let directionSize = 1;
      let fill = true;
      let fillColor = "#7fffff";

      const info = [
        [0, 10, "xl", "#ff99e6", "julie", false],
        [80, 50, "s", "#e1caa0", "stian", false],
        [0, -100, "m", "#ff9933", "aleks", true],
        [-80, 50, "s", "#b2997c", "iver", false],
        [-100, -75, "m", "#86592d", "sigve", false],
        [-160, 20, "m", "#53402d", "rune", true],
        [100, -75, "m", "#8c735a", "cristea", false],
        [160, 20, "l", "#b37700", "flory", false],
      ];

      this.guys = [];
      this.shadows = [];
      for(let i = 0; i < info.length; i++) {
        let size = i % 2 === 1 || i === 0 ? 0.4 : 0.5;
        let r = 20 * size;
        let x = info[i][0] + 0.5;
        let y = info[i][1] - 1.5;
        let z = -1;
        let black = "#000000";

        let hair = makeHair(x, y + r * 2, size, info[i][2], black);
        hair.position.z = z;
        this.scene.add(hair);
        let head = makeHead(x, y, size, r, fill, black, info[i][5]);
        head.position.z = z;
        this.scene.add(head);
        let frontleft = makeFront(0, 0, size, directionSize, fill, black);
        frontleft.position.set(x, y, z);
        this.scene.add(frontleft);
        let frontright = frontleft.clone();
        frontright.scale.x = -1;
        this.scene.add(frontright);
        let backleft = makeBack(0, 0, size, directionSize, fill, black);
        backleft.position.set(x, y, z);
        this.scene.add(backleft);
        let backright = backleft.clone();
        backright.scale.x = -1;
        this.scene.add(backright);
        let handsUp1 = makeHandsUp1(x, y, size, directionSize, fill, black);
        handsUp1.position.z = z;
        this.scene.add(handsUp1);
        let handsUp2 = makeHandsUp2(x, y, size, directionSize, fill, black);
        handsUp2.position.z = z;
        this.scene.add(handsUp2);
        let body = {pos: [x, y + r], head, hair, frontleft, frontright, backleft, backright, handsUp1, handsUp2}
        this.shadows.push(body);

        x = info[i][0];
        y = info[i][1];

        hair = makeHair(x, y + r * 2, size, info[i][2], info[i][3]);
        this.scene.add(hair);
        head = makeHead(x, y, size, r, fill, fillColor, info[i][5]);
        this.scene.add(head);
        frontleft = makeFront(0, 0, size, directionSize, fill, fillColor);
        frontleft.position.set(x, y, 0);
        this.scene.add(frontleft);
        frontright = frontleft.clone();
        frontright.scale.x = -1;
        this.scene.add(frontright);
        backleft = makeBack(0, 0, size, directionSize, fill, fillColor);
        backleft.position.set(x, y, 0);
        this.scene.add(backleft);
        backright = backleft.clone();
        backright.scale.x = -1;
        this.scene.add(backright);
        handsUp1 = makeHandsUp1(x, y, size, directionSize, fill, fillColor);
        this.scene.add(handsUp1);
        handsUp2 = makeHandsUp2(x, y, size, directionSize, fill, fillColor);
        this.scene.add(handsUp2);
        body = {pos: [x, y + r], head, hair, frontleft, frontright, backleft, backright, handsUp1, handsUp2}
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

      function makeHead(x, y, size, r, fill, fillColor, glasses) {
        y = y + r;
        let hode = new THREE.Object3D();
        hode.lines = [];
        curve = makeCurve(r, x, y);
        line = makeLine(curve, null, 1, fill, fillColor);
        hode.add(line);
        hode.lines.push(line);
        line = makeLine([
          [x + 10 * size, y - 10 * size],
          [x, y - r + (r/4)],
          [x - 7 * size, y - 14 * size],
          [x - 9 * size, y - 9 * size],
          [x - 6 * size, y - 9 * size],
          [x + 10 * size, y - 10 * size]
        ], null, 1);
        hode.add(line);
        hode.lines.push(line);
        const pupilDistance = r / 4 + (Math.random() - 0.2) * 2;
        curve = makeCurve(1, x + pupilDistance, y + (r/4));
        line = makeLine(curve, null, 1);
        hode.add(line);
        hode.lines.push(line);
        curve = makeCurve(1, x - pupilDistance, y + (r/4));
        line = makeLine(curve, null, 1);
        hode.add(line);
        hode.lines.push(line);
        if(glasses) {
          line = makeLine([
            [x - 12 * size, y + 1 * size],
            [x - 1 * size, y + 1 * size],
            [x - 1 * size, y + 9 * size],
            [x - 12 * size, y + 9 * size],
            [x - 12 * size, y + 1 * size],
          ], null, 1);
          hode.add(line);
          hode.lines.push(line);
          line = makeLine([
            [x + 12 * size, y + 1 * size],
            [x + 1 * size, y + 1 * size],
            [x + 1 * size, y + 9 * size],
            [x + 12 * size, y + 9 * size],
            [x + 12 * size, y + 1 * size],
          ], null, 1);
          hode.add(line);
          hode.lines.push(line);
          line = makeLine([
            [x + 20 * size, y + 5 * size],
            [x + 12 * size, y + 5 * size],
          ], null, 1);
          hode.add(line);
          hode.lines.push(line);
          line = makeLine([
            [x - 20 * size, y + 5 * size],
            [x - 12 * size, y + 5 * size],
          ], null, 1);
          hode.add(line);
          hode.lines.push(line);
          line = makeLine([
            [x - 1 * size, y + 5 * size],
            [x + 1 * size, y + 5 * size],
          ], null, 1);
          hode.add(line);
          hode.lines.push(line);
        }
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
          [x + 22 * size, y - 74 * size],
          [x - 30 * size, y - 12 * size],
          [x - 10 * size, y - 10 * size],
          [x - 10 * size, y],
          [x, y]
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
          [x + 21 * size, y - 91 * size],
        ], null, directionSize, fill, fillColor);
        front.add(line);
        line = makeLine([
          [x - 30 * size, y - 30 * size],
          [x + 37 * size, y - 108 * size],
          [x + 45 * size, y - 100 * size],
          [x - 30 * size, y - 12 * size],
          [x - 30 * size, y - 30 * size]
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
          [x + 10 * size, y],
          [x, y]
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
        let arr = length === "xl" ? [
          [x - 18 * size, y - 5 * size],
          [x - 12 * size, y - 1 * size],
          [x - 1 * size, y + 1 * size],
          [x + 12 * size, y - 1 * size],
          [x + 17 * size, y - 5 * size],
          [x + 27 * size, y - 100 * size],
          [x + 22 * size, y - 102 * size],
          [x + 17 * size, y - 97 * size],
          [x + 13 * size, y - 10 * size],
          [x + 6 * size, y - 7 * size],
          [x + 1 * size, y - 6 * size],
          [x - 8 * size, y - 7 * size],
          [x - 11 * size, y - 8 * size],
          [x - 17 * size, y - 23 * size],
          [x - 17 * size, y - 97 * size],
          [x - 22 * size, y - 102 * size],
          [x - 27 * size, y - 100 * size],
          [x - 22 * size, y - 10 * size],
          [x - 18 * size, y - 5 * size],
        ] : length === "l" ? [
          [x - 18 * size, y - 5 * size],
          [x - 12 * size, y - 1 * size],
          [x - 1 * size, y + 1 * size],
          [x + 12 * size, y - 1 * size],
          [x + 17 * size, y - 5 * size],
          [x + 27 * size, y - 50 * size],
          [x + 22 * size, y - 51 * size],
          [x + 17 * size, y - 47 * size],
          [x + 13 * size, y - 10 * size],
          [x + 6 * size, y - 7 * size],
          [x + 1 * size, y - 6 * size],
          [x - 8 * size, y - 7 * size],
          [x - 11 * size, y - 8 * size],
          [x - 17 * size, y - 23 * size],
          [x - 17 * size, y - 47 * size],
          [x - 22 * size, y - 51 * size],
          [x - 27 * size, y - 50 * size],
          [x - 22 * size, y - 10 * size],
          [x - 18 * size, y - 5 * size],
        ] : length === "s" ? [
          [x - 18 * size, y - 16 * size],
          [x - 8 * size, y - 7 * size],
          [x + 10 * size, y - 7 * size],
          [x + 18 * size, y - 13 * size],
          [x + 19 * size, y - 12 * size],
          [x + 10 * size, y - 2 * size],
          [x - 2 * size, y + 0 * size],
          [x - 12 * size, y - 3 * size],
          [x - 19 * size, y - 15 * size],
          [x - 18 * size, y - 16 * size],
        ] : [
          [x - 18 * size, y - 19 * size],
          [x - 10 * size, y - 7 * size],
          [x + 9 * size, y - 7 * size],
          [x + 18 * size, y - 19 * size],
          [x + 22 * size, y - 20 * size],
          [x + 23 * size, y - 18 * size],
          [x + 12 * size, y - 0 * size],
          [x - 4 * size, y + 1 * size],
          [x - 16 * size, y - 3 * size],
          [x - 23 * size, y - 18 * size],
          [x - 22 * size, y - 20 * size],
          [x - 18 * size, y - 19 * size],
        ];
        line = makeLine(arr, 0, 1, true, color);
        hair.add(line);
        hair.position.z = 2;
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
        const count = 32;
        for (let i = 0; i <= count + 0.5; i++) {
          const angle = i / 32 * Math.PI * 2;
          curve.push([
            x + xScale * radius * Math.cos(angle),
            y + yScale * radius * Math.sin(angle),
          ]);
        }
        return curve;
      }

      function makeLine(arr, color = null, directionSize = 1, fill = false, fillColor = null) {
        let path = new Path({color, directionSize, fill, fillColor, debug: false});
        for(const [x, y] of arr) {
          path.lineTo(x, y);
        }
        line = path.toObject3D();
        line.path = path;
        return line;
      }

      function makeHandsUp1(x, y, size, directionSize, fill, fillColor) {
        let front = new THREE.Object3D();
        line = makeLine([
          [x - 5 * size, y],
          [x - 5 * size, y - 10 * size],
          [x - 15 * size, y - 10 * size],
          [x - 45 * size, y + 80 * size],
          [x - 55 * size, y + 78 * size],
          [x - 25 * size, y - 10 * size],
          [x - 25 * size, y - 140 * size],
          [x - 30 * size, y - 210 * size],
          [x - 15 * size, y - 210 * size],
          [x - 10 * size, y - 135 * size],
          [x + 10 * size, y - 135 * size],
          [x + 15 * size, y - 210 * size],
          [x + 30 * size, y - 210 * size],
          [x + 25 * size, y - 140 * size],
          [x + 25 * size, y - 10 * size],
          [x + 55 * size, y + 78 * size],
          [x + 45 * size, y + 80 * size],
          [x + 15 * size, y - 10 * size],
          [x + 5 * size, y - 10 * size],
          [x + 5 * size, y],
          [x - 5 * size, y],
        ], null, directionSize, fill, fillColor);
        front.add(line);
        return front;
      }

      function makeHandsUp2(x, y, size, directionSize, fill, fillColor) {
        let front = new THREE.Object3D();
        line = makeLine([
          [x - 5 * size, y],
          [x - 5 * size, y - 10 * size],
          [x - 15 * size, y - 10 * size],
          [x - 75 * size, y + 75 * size],
          [x - 85 * size, y + 70 * size],
          [x - 25 * size, y - 10 * size],
          [x - 25 * size, y - 140 * size],
          [x - 30 * size, y - 210 * size],
          [x - 15 * size, y - 210 * size],
          [x - 10 * size, y - 135 * size],
          [x + 10 * size, y - 135 * size],
          [x + 15 * size, y - 210 * size],
          [x + 30 * size, y - 210 * size],
          [x + 25 * size, y - 140 * size],
          [x + 25 * size, y - 10 * size],
          [x + 85 * size, y + 70 * size],
          [x + 75 * size, y + 75 * size],
          [x + 15 * size, y - 10 * size],
          [x + 5 * size, y - 10 * size],
          [x + 5 * size, y],
          [x - 5 * size, y],
        ], null, directionSize, fill, fillColor);
        front.add(line);
        front.line = line;
        return front;
      }

      this.camera.position.z = 10;
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

      this.mommaBird = CommodoreLogo(100, '#ffffff');
      this.scene.add(this.mommaBird);
    }

    warmup(renderer) {
      this.update(6894);
      this.render(renderer);
      this.update(7025);
      this.render(renderer);
      this.update(7149);
      this.render(renderer);
      this.update(7267);
      this.render(renderer);
      this.update(7390);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);
      //const startframe = 6767
      //const startBEAN = 1128;
      const startframe = 6479;
      const startBEAN = 1080;

      let z = 22;
      let x = 0;
      let y = 0;

      if (BEAN < startBEAN + 12) {
        this.camera.position.set(this.guys[0].pos[0], this.guys[0].pos[1], z);
      } else if (BEAN < startBEAN + 18) {
        this.camera.position.set(this.guys[1].pos[0], this.guys[1].pos[1], z);
      } else if (BEAN < startBEAN + 24) {
        this.camera.position.set(this.guys[2].pos[0], this.guys[2].pos[1], z + 5);
      } else if (BEAN < startBEAN + 30) {
        this.camera.position.set(this.guys[3].pos[0], this.guys[3].pos[1], z);
      } else if (BEAN < startBEAN + 36) {
        this.camera.position.set(this.guys[4].pos[0], this.guys[4].pos[1], z + 5);
      } else if (BEAN < startBEAN + 42) {
        this.camera.position.set(this.guys[5].pos[0], this.guys[5].pos[1], z);
      } else if (BEAN < startBEAN + 48) {
        this.camera.position.set(this.guys[6].pos[0], this.guys[6].pos[1], z + 5);
      } else if (BEAN < startBEAN + 60) {
        this.camera.position.set(this.guys[7].pos[0], this.guys[7].pos[1], z);
      } else if (BEAN < startBEAN + 78) {
        this.camera.position.set(0, 110, 130);
      } else if (BEAN < startBEAN + 96) {
        z = lerp(60, 280, Math.tan((frame - startframe - 144) * 0.0010));
        x = lerp(40, 200, Math.tan((frame - startframe - 144) * 0.0010));
        y = lerp(80, -130, Math.tan((frame - startframe - 144) * 0.0010));
        this.camera.position.set(x, y, z);
      } else if (BEAN < startBEAN + 120) {
        z = lerp(60, 280, Math.tan((frame - startframe - 144) * 0.0010));
        x = lerp(200, -220, Math.tan((frame - startframe - 144) * 0.0010));
        y = lerp(-40, -80, Math.tan((frame - startframe - 144) * 0.0010));
        this.camera.position.set(x, y, z);
      } else if (BEAN < startBEAN + 144) {
        z = lerp(60, 280, Math.tan((frame - startframe - 168) * 0.0010));
        x = lerp(-220, 20, Math.tan((frame - startframe - 168) * 0.0010));
        y = lerp(0, 30, Math.tan((frame - startframe - 168) * 0.0010));
        this.camera.position.set(x, y, z);
      } else {
        z = lerp(150, 455, Math.tan((frame - startframe - 288) * 0.0010));
        this.camera.position.set(x, y - 20, z);
      }

      for(let i = 0; i < this.discolines.length; i++) {
        const path = this.discolines[i].path;
        path.material.uniforms.drawStart.value = i != 2 ? lerp(1, 0, Math.tan((frame - startframe)/10)) : 0;
        path.material.uniforms.drawEnd.value = i == 2 ? lerp(0, 1, Math.tan((frame - startframe)/10)) : 1;
      }

      if (BEAN < startBEAN + 60) {
        for (const body of this.shadows) {
          body.frontleft.visible = false;
          body.backleft.visible = false;
          body.frontright.visible = false;
          body.backright.visible = false;
          body.handsUp1.visible = false;
          body.handsUp2.visible = true;

          for(let k = 0; k < body.head.lines.length; k++) {
            const path = body.head.lines[k].path;
            //path.uniforms.drawEnd.value = lerp(0, 1, F(frame, (BEAN / 6 | 0) * 6 + 3 * k / body.head.lines.length, 1));
            if(path.fillMesh) {
              //path.fillMesh.visible = BEAN % 6 >= 3;
              //path.fillMesh.visible = false;
            }
          }
          body.handsUp2.line.path.uniforms.drawEnd.value = lerp(0, 1, F(frame, (BEAN / 6 | 0) * 6, 3));
        }
        for (const body of this.guys) {
          body.frontleft.visible = false;
          body.backleft.visible = false;
          body.frontright.visible = false;
          body.backright.visible = false;
          body.handsUp1.visible = false;
          body.handsUp2.visible = true;

          for(let k = 0; k < body.head.lines.length; k++) {
            const path = body.head.lines[k].path;
            //path.uniforms.drawEnd.value = lerp(0, 1, F(frame, (BEAN / 6 | 0) * 6 + 3 * k / body.head.lines.length, 1));
            if(path.fillMesh) {
              //path.fillMesh.visible = BEAN % 6 >= 3;
              //path.fillMesh.visible = false;
            }
          }
          body.handsUp2.line.path.uniforms.drawEnd.value = lerp(0, 1, F(frame, (BEAN / 6 | 0) * 6, 3));
        }
      }
      if (BEAN >= startBEAN + 60 && BEAN < startBEAN + 144) {
        for (const body of this.shadows) {
          body.frontleft.visible = (BEAN % 36 < 6) || (BEAN % 36 >= 12 && BEAN % 36 < 18);
          body.backleft.visible = BEAN % 36 >= 6 && BEAN % 36 < 12;
          body.frontright.visible = (BEAN % 36 >= 18 && BEAN % 36 < 24) || (BEAN % 36 >= 30);
          body.backright.visible = BEAN % 36 >= 24 && BEAN % 36 < 30;
          body.handsUp1.visible = false;
          body.handsUp2.visible = false;
        }

        for (const body of this.guys) {
          body.frontleft.visible = (BEAN % 36 < 6) || (BEAN % 36 >= 12 && BEAN % 36 < 18);
          body.backleft.visible = BEAN % 36 >= 6 && BEAN % 36 < 12;
          body.frontright.visible = (BEAN % 36 >= 18 && BEAN % 36 < 24) || (BEAN % 36 >= 30);
          body.backright.visible = BEAN % 36 >= 24 && BEAN % 36 < 30;
          body.handsUp1.visible = false;
          body.handsUp2.visible = false;

        }
      } else if (BEAN >= startBEAN + 144) {
        for (const body of this.shadows) {
          body.frontleft.visible = false;
          body.backleft.visible = false;
          body.frontright.visible = false;
          body.backright.visible = false;
          body.handsUp1.visible = BEAN % 2 === 0;
          body.handsUp2.visible = BEAN % 2 === 1;
        }

        for (const body of this.guys) {
          body.frontleft.visible = false;
          body.backleft.visible = false;
          body.frontright.visible = false;
          body.backright.visible = false;
          body.handsUp1.visible = BEAN % 2 === 0;
          body.handsUp2.visible = BEAN % 2 === 1;
        }
      }


      const openMouth = BEAN % 2 == 0;
      this.mommaBird.upperBeaks[0].rotation.z = openMouth ? Math.PI / 16 : 0;
      this.mommaBird.upperBeaks[1].rotation.z = openMouth ? Math.PI / 16 : 0;
      this.mommaBird.lowerBeaks[0].rotation.z = openMouth ? -Math.PI / 32 : 0;
      this.mommaBird.lowerBeaks[1].rotation.z = openMouth ? -Math.PI / 32 : 0;

      const birdBean = FRAME_FOR_BEAN(1242);

      let rotationChain = smoothstep(Math.PI + Math.PI / 8, Math.PI * (4 / 5), (frame - birdBean) / 300);
      this.mommaBird.rotation.z = rotationChain;
      this.mommaBird.position.y = easeIn(-100, 100, (frame - birdBean - FRAME_FOR_BEAN(18)) / 60) + Math.sin(frame / 20) * 10;
      this.mommaBird.position.x = smoothstep(280, -350, (frame - birdBean) / 240);
      this.mommaBird.position.z = 10;
    }
  }

  global.dancing = dancing;
})(this);

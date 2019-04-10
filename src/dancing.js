(function(global) {
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
      let directionSize = 2;
      let fill = true;
      let fillColor = "#ffffff";

      const info = [
        [0, 10, "xl", "#ff99e6", "julie"], 
        [80, 50, "s", "#e1caa0", "stian"], 
        [0, -100, "m", "#ff9933", "aleks"], 
        [-80, 50, "s", "#b2997c", "iver"], 
        [-100, -75, "m", "#86592d", "sigve"], 
        [-160, 20, "m", "#53402d", "rune"], 
        [100, -75, "m", "#8c735a", "cristea"], 
        [160, 20, "l", "#b37700", "flory"], 
        [-250, -90, "m", "#000000", ""], 
        [250, 35, "m", "#000000", ""], 
        [210, -90, "m", "#000000", ""]
      ];

      this.guys = [];
      for(let i = 0; i < info.length - 3; i++) {
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
        let backleft = makeBack(0, 0, size, directionSize, fill, fillColor);
        backleft.position.set(x, y, 0);
        this.scene.add(backleft);
        let backright = backleft.clone();
        backright.scale.x = -1;
        this.scene.add(backright);
        let handsUp1 = makeHandsUp1(x, y, size, directionSize, fill, fillColor);
        this.scene.add(handsUp1);
        let handsUp2 = makeHandsUp2(x, y, size, directionSize, fill, fillColor);
        this.scene.add(handsUp2);
        let body = {pos: [x, y + r * 1.5], head, hair, frontleft, frontright, backleft, backright, handsUp1, handsUp2}
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
        let arr = length === "xl" ? [
          [x - 24 * size, y - 100 * size],
          [x - 16 * size, y - 8 * size],
          [x, y - 1 * size],
          [x + 16 * size, y - 8 * size],
          [x + 24 * size, y - 100 * size]
        ] : length === "l" ? [
          [x - 24 * size, y - 50 * size],
          [x - 16 * size, y - 8 * size],
          [x, y - 1 * size],
          [x + 16 * size, y - 8 * size],
          [x + 24 * size, y - 50 * size]
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
        ], null, directionSize, fill, fillColor);
        front.add(line);
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

    update(frame) {
      super.update(frame);
      const startframe = 6767
      const startBEAN = 1128;
      
      let z = 35;
      let x = 0;
      let y = 0;

      if (BEAN < startBEAN + 6) {
        this.camera.position.set(this.guys[0].pos[0], this.guys[0].pos[1], z);
      } else if (BEAN >= startBEAN + 6 && BEAN < startBEAN + 12) {
        this.camera.position.set(this.guys[1].pos[0], this.guys[1].pos[1], z);
      } else if (BEAN >= startBEAN + 12 && BEAN < startBEAN + 18) {
        this.camera.position.set(this.guys[2].pos[0], this.guys[2].pos[1], z + 5);
      } else if (BEAN >= startBEAN + 18 && BEAN < startBEAN + 24) {
        this.camera.position.set(this.guys[3].pos[0], this.guys[3].pos[1], z);
      } else if (BEAN >= startBEAN + 24 && BEAN < startBEAN + 30) {
        this.camera.position.set(this.guys[4].pos[0], this.guys[4].pos[1], z + 5);
      } else if (BEAN >= startBEAN + 30 && BEAN < startBEAN + 36) {
        this.camera.position.set(this.guys[5].pos[0], this.guys[5].pos[1], z);
      } else if (BEAN >= startBEAN + 36 && BEAN < startBEAN + 42) {
        this.camera.position.set(this.guys[6].pos[0], this.guys[6].pos[1], z + 5);
      } else if (BEAN >= startBEAN + 42 && BEAN < startBEAN + 48) {
        this.camera.position.set(this.guys[7].pos[0], this.guys[7].pos[1], z);
      } else if (BEAN >= startBEAN + 48 && BEAN < startBEAN + 54) {
        this.camera.position.set(0, 140, 160);
      } else if (BEAN >= startBEAN + 54 && BEAN < startBEAN + 72) {
        z = lerp(70, 350, Math.tan((frame - startframe) * 0.0010));
        x = lerp(0, 200, Math.tan((frame - startframe) * 0.0010));
        y = lerp(140, -100, Math.tan((frame - startframe) * 0.0010));
        this.camera.position.set(x, y, z);
      } else if (BEAN >= startBEAN + 72 && BEAN < startBEAN + 90) {
        z = lerp(70, 350, Math.tan((frame - startframe) * 0.0010));
        x = lerp(200, -220, Math.tan((frame - startframe) * 0.0010));
        y = lerp(-40, 0, Math.tan((frame - startframe) * 0.0010));
        this.camera.position.set(x, y, z);
      } else if (BEAN >= startBEAN + 90 && BEAN < startBEAN + 108) {
        z = lerp(70, 350, Math.tan((frame - startframe) * 0.0010));
        x = lerp(-220, 20, Math.tan((frame - startframe) * 0.0010));
        y = lerp(0, 30, Math.tan((frame - startframe) * 0.0010));
        this.camera.position.set(x, y, z);
      } else {
        z = lerp(350, 680, Math.tan((frame - startframe) * 0.0010));
        this.camera.position.set(x, y + 70, z);
      }

      for(let i = 0; i < this.discolines.length; i++) {
        const path = this.discolines[i].path;
        path.material.uniforms.drawStart.value = i != 2 ? lerp(1, 0, Math.tan((frame - startframe)/10)) : 0;
        path.material.uniforms.drawEnd.value = i == 2 ? lerp(0, 1, Math.tan((frame - startframe)/10)) : 1;
      }

      if (BEAN < startBEAN + 48) {
        for (const body of this.guys) {
          body.frontleft.visible = false;
          body.backleft.visible = false;
          body.frontright.visible = false;
          body.backright.visible = false;
          body.handsUp1.visible = false;
          body.handsUp2.visible = true;
        }
      }
      if (BEAN >= startBEAN + 48 && BEAN < startBEAN + 108) {
        for (const body of this.guys) {
          body.frontleft.visible = (BEAN % 36 < 6) || (BEAN % 36 >= 12 && BEAN % 36 < 18);
          body.backleft.visible = BEAN % 36 >= 6 && BEAN % 36 < 12;
          body.frontright.visible = (BEAN % 36 >= 18 && BEAN % 36 < 24) || (BEAN % 36 >= 30);
          body.backright.visible = BEAN % 36 >= 24 && BEAN % 36 < 30;
          body.handsUp1.visible = false;
          body.handsUp2.visible = false;
        }
      } else if (BEAN >= startBEAN + 108) {
        for (const body of this.guys) {
          body.frontleft.visible = false;
          body.backleft.visible = false;
          body.frontright.visible = false;
          body.backright.visible = false;
          body.handsUp1.visible = BEAN % 2 === 0;
          body.handsUp2.visible = BEAN % 2 === 1;
        }
      }

      let rotationChain;
      rotationChain = smoothstep(Math.PI + Math.PI / 4, Math.PI * (4 / 5), (frame - 7556) / 100);
      rotationChain = smoothstep(Math.PI, rotationChain, (frame - 7306) / 120);

      const openMouth = BEAN % 2 == 0;
      this.mommaBird.upperBeak.rotation.z = openMouth ? Math.PI / 16 : 0;
      this.mommaBird.lowerBeak.rotation.z = openMouth ? -Math.PI / 32 : 0;

      this.mommaBird.rotation.z = rotationChain;
      this.mommaBird.position.y = easeIn(150, 300, (frame - 7556) / 60);
      this.mommaBird.position.x = smoothstep(320, smoothstep(230, 50, (frame - 7556) / 60), (frame - 7306) / 120);
      
      Math.sin(frame / 10) * 10;
    }
  }

  global.dancing = dancing;
})(this);

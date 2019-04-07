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
      const startx = -300;
      const starty = -288;
      const xys = [[0,0], [70, 50], [-40, -110], [-95, 40], [-135, -75], [-200, 20], [90, -70], [150, 15], [-250, -90], [250, 35], [210, -90]];
      this.guys = [];
      let xy = 0;
      
      for(let i = 0; i < xys.length; i++) {
        let size = xy % 2 == 0 ? 0.5 : 0.4;
        let r = 20 * size;
        let x = xys[xy][0];
        let y = xys[xy][1]; 
        let body = {
          head: makeHead(x, y, size, r, this.scene),
          frontleft: makeFrontLeft(x, y, size, this.scene),
          frontright:  makeFrontRight(x, y, size, this.scene),
          backleft: makeBackLeft(x, y, size, this.scene),
          backright: makeBackRight(x, y, size, this.scene)
        }
        this.guys.push(body);
        xy += 1;
      }
      this.discoball = [];
      path = new Path();
      curve = makeCurve(30, 0, 130);
      for(const [x, y] of curve) {
        path.lineTo(x, y);
      }
      line = path.toObject3D();
      this.discoball.push(line);
      this.scene.add(line);
      line.path = path;
      path = new Path();
      path.lineTo(0, 200);
      path.lineTo(0, 160);
      line = path.toObject3D();
      this.discoball.push(line);
      this.scene.add(line);
      line.path = path;

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
        line.rotation.z = xyz[l][0];
        line.position.y = xyz[l][1];
        line.position.x = xyz[l][2];
        this.discolines.push(line);
        this.scene.add(line);
        line.path = path;
      }

      function makeHead(x, y, size, r, scene) {
        const headx = x;
        const heady = y + r;
        let head = [];
        path = new Path();
        curve = makeCurve(r, headx, heady);
        for(const [x, y] of curve) {
          path.lineTo(x, y);
        }
        line = path.toObject3D();
        head.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        path.lineTo(headx + 10 * size, heady - 10 * size);
        path.lineTo(headx, heady - r + (r/4));
        path.lineTo(headx - 10 * size, heady - 10 * size);
        path.lineTo(headx + 10 * size, heady - 10 * size);
        line = path.toObject3D();
        head.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        curve = makeCurve(1, headx + (r/4), heady + (r/4));
        for(const [x, y] of curve) {
          path.lineTo(x, y);
        }
        line = path.toObject3D();
        head.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        curve = makeCurve(1, headx - (r/4), heady + (r/4));
        for(const [x, y] of curve) {
          path.lineTo(x, y);
        }
        line = path.toObject3D();
        head.push(line);
        scene.add(line);
        line.path = path;
        return head;
      }

      function makeFrontLeft(x, y, size, scene) {
        let frontleft = [];
        path = new Path();
        path.lineTo(x, y);
        path.lineTo(x, y - 10 * size);
        path.lineTo(x + 25 * size, y - 12 * size);
        path.lineTo(x + 100 * size, y - 100 * size);
        path.lineTo(x + 92 * size, y - 108 * size);
        path.lineTo(x + 25 * size, y - 30 * size);
        path.lineTo(x + 22 * size, y - 74 * size);
        line = path.toObject3D();
        frontleft.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        path.lineTo(x + 21 * size, y - 91 * size); 
        path.lineTo(x + 20 * size, y - 130 * size); 
        path.lineTo(x + 25 * size, y - 215 * size);
        path.lineTo(x + 10 * size, y - 215 * size);
        path.lineTo(x + 5 * size, y - 132 * size);
        path.lineTo(x - 20 * size, y - 132 * size);
        path.lineTo(x - 15 * size, y - 215 * size);
        path.lineTo(x - 30 * size, y - 215 * size);
        path.lineTo(x - 35 * size, y - 130 * size);
        path.lineTo(x - 30 * size, y - 30 * size);
        path.lineTo(x + 37 * size, y - 108 * size);
        path.lineTo(x + 45 * size, y - 100 * size);
        path.lineTo(x - 30 * size, y - 12 * size);
        path.lineTo(x - 10 * size, y - 10 * size);
        path.lineTo(x - 10 * size, y);
        line = path.toObject3D();
        frontleft.push(line);
        scene.add(line);
        line.path = path;
        return frontleft;
      }

      function makeBackLeft(x, y, size, scene) {
        let backleft = [];
        path = new Path();
        path.lineTo(x, y);
        path.lineTo(x, y - 10 * size);
        path.lineTo(x - 25 * size, y - 12 * size);
        path.lineTo(x - 100 * size, y - 100 * size);
        path.lineTo(x - 92 * size, y - 108 * size);
        path.lineTo(x - 25 * size, y - 30 * size);
        path.lineTo(x - 20 * size, y - 130 * size);
        path.lineTo(x - 25 * size, y - 215 * size);
        path.lineTo(x - 10 * size, y - 215 * size);
        path.lineTo(x - 5 * size, y - 132 * size);
        path.lineTo(x + 20 * size, y - 132 * size);
        path.lineTo(x + 15 * size, y - 215 * size);
        path.lineTo(x + 30 * size, y - 215 * size);
        path.lineTo(x + 35 * size, y - 130 * size);
        path.lineTo(x + 30 * size, y - 30 * size);
        path.lineTo(x + 30 * size, y - 12 * size);
        path.lineTo(x + 10 * size, y - 10 * size);
        path.lineTo(x + 10 * size, y);
        line = path.toObject3D();
        backleft.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        path.lineTo(x - 22 * size, y - 91 * size);
        path.lineTo(x - 37 * size, y - 108 * size);
        path.lineTo(x - 45 * size, y - 100 * size);
        path.lineTo(x - 22 * size, y - 73 * size);
        line = path.toObject3D();
        backleft.push(line);
        scene.add(line);
        line.path = path;
        return backleft;
      }

      function makeFrontRight(x, y, size, scene) {
        let frontright = [];
        path = new Path();
        path.lineTo(x, y);
        path.lineTo(x, y - 10 * size);
        path.lineTo(x - 25 * size, y - 12 * size);
        path.lineTo(x - 100 * size, y - 100 * size);
        path.lineTo(x - 92 * size, y - 108 * size);
        path.lineTo(x - 25 * size, y - 30 * size);
        path.lineTo(x - 22 * size, y - 74 * size);
        line = path.toObject3D();
        frontright.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        path.lineTo(x - 21 * size, y - 91 * size); 
        path.lineTo(x - 20 * size, y - 130 * size);
        path.lineTo(x - 25 * size, y - 215 * size);
        path.lineTo(x - 10 * size, y - 215 * size);
        path.lineTo(x - 5 * size, y - 132 * size);
        path.lineTo(x + 20 * size, y - 132 * size);
        path.lineTo(x + 15 * size, y - 215 * size);
        path.lineTo(x + 30 * size, y - 215 * size);
        path.lineTo(x + 35 * size, y - 130 * size);
        path.lineTo(x + 30 * size, y - 30 * size);
        path.lineTo(x - 37 * size, y - 108 * size);
        path.lineTo(x - 45 * size, y - 100 * size);
        path.lineTo(x + 30 * size, y - 12 * size);
        path.lineTo(x + 10 * size, y - 10 * size);
        path.lineTo(x + 10 * size, y);
        line = path.toObject3D();
        frontright.push(line);
        scene.add(line);
        line.path = path;
        return frontright;
      }
      

      function makeBackRight(x, y, size, scene) {
        let backright = [];
        path = new Path();
        path.lineTo(x, y);
        path.lineTo(x, y - 10 * size);
        path.lineTo(x + 25 * size, y - 12 * size);
        path.lineTo(x + 100 * size, y - 100 * size);
        path.lineTo(x + 92 * size, y - 108 * size);
        path.lineTo(x + 25 * size, y - 30 * size);
        path.lineTo(x + 20 * size, y - 130 * size);
        path.lineTo(x + 25 * size, y - 215 * size);
        path.lineTo(x + 10 * size, y - 215 * size);
        path.lineTo(x + 5 * size, y - 132 * size);
        path.lineTo(x - 20 * size, y - 132 * size);
        path.lineTo(x - 15 * size, y - 215 * size);
        path.lineTo(x - 30 * size, y - 215 * size);
        path.lineTo(x - 35 * size, y - 130 * size);
        path.lineTo(x - 30 * size, y - 30 * size);
        path.lineTo(x - 30 * size, y - 12 * size);
        path.lineTo(x - 10 * size, y - 10 * size);
        path.lineTo(x - 10 * size, y);
        line = path.toObject3D();
        backright.push(line);
        scene.add(line);
        line.path = path;
        path = new Path();
        path.lineTo(x + 22 * size, y - 91 * size);
        path.lineTo(x + 37 * size, y - 108 * size);
        path.lineTo(x + 45 * size, y - 100 * size);
        path.lineTo(x + 22 * size, y - 73 * size);
        line = path.toObject3D();
        backright.push(line);
        scene.add(line);
        line.path = path;
        return backright;
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

      function makeCurve(radius, x, y) {
        const curve = [];
        for (let i = 0; i <= 20; i++) {
          const angle = i * Math.PI / 10;
          curve.push([
            x + radius * Math.cos(angle),
            y + radius * Math.sin(angle),
          ]);
        }
        return curve;
      }
    }

    update(frame) {
      super.update(frame);
      const startframe = 7680;

      this.camera.position.z = lerp(10, 1500, Math.tan((frame-startframe) * 0.001));

      for(let i = 0; i < this.discolines.length; i++) {
        const path = this.discolines[i].path;
        path.material.uniforms.drawStart.value = i != 2 ? lerp(1, 0, Math.tan((frame - startframe)/10)) : 0;
        path.material.uniforms.drawEnd.value = i == 2 ? lerp(0, 1, Math.tan((frame - startframe)/10)) : 1;
      }

      for(const body of this.guys) {
        for (let i = 0; i < body.head.length; i++) {
          const path = body.head[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
        for (let i = 0; i < body.frontleft.length; i++) {
          const path = body.frontleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = (BEAN % 36 < 6) || (BEAN % 36 >= 12 && BEAN % 36 < 18) ? 1 : 0;
        }
        for (let i = 0; i < body.backleft.length; i++) {
          const path = body.backleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = BEAN % 36 >= 6 && BEAN % 36 < 12 ? 1 : 0;
        }
        for (let i = 0; i < body.frontright.length; i++) {
          const path = body.frontright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = (BEAN % 36 >= 18 && BEAN % 36 < 24) || (BEAN % 36 >= 30)  ? 1 : 0;
        }
        for (let i = 0; i < body.backright.length; i++) {
          const path = body.backright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = BEAN % 36 >= 24 && BEAN % 36 < 30 ? 1 : 0;
        }
      }
    }
  }

  global.dancing = dancing;
})(this);

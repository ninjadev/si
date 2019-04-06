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
      let size = 0.3;
      let r = 20 * size;
      this.guys = [];
      
      for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++) {
          let x = startx + i * 100;
          let y = starty + j * 100;
          let body = {
            head: makeHead(x, y, size, r, this.scene),
            frontleft: makeFrontLeft(x, y, size, this.scene),
            frontright:  makeFrontRight(x, y, size, this.scene),
            backleft: makeBackLeft(x, y, size, this.scene),
            backright: makeBackRight(x, y, size, this.scene)
          }
          this.guys.push(body);
        }
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
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;

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

      this.camera.position.z = lerp(10, 1000, Math.tan((frame-startframe) * 0.001));

      for(const body of this.guys) {
        for (let i = 0; i < body.head.length; i++) {
          const path = body.head[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
        for (let i = 0; i < body.frontleft.length; i++) {
          const path = body.frontleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = (BEAN % 24 < 4) || (BEAN % 24 >= 8 && BEAN % 24 < 12) ? 1 : 0;
        }
        for (let i = 0; i < body.backleft.length; i++) {
          const path = body.backleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = BEAN % 24 >= 4 && BEAN % 24 < 8 ? 1 : 0;
        }
        for (let i = 0; i < body.frontright.length; i++) {
          const path = body.frontright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = (BEAN % 24 >= 12 && BEAN % 24 < 16) || (BEAN % 24 >= 20)  ? 1 : 0;
        }
        for (let i = 0; i < body.backright.length; i++) {
          const path = body.backright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = BEAN % 24 >= 16 && BEAN % 24 < 20 ? 1 : 0;
        }
      }
    }
  }

  global.dancing = dancing;
})(this);

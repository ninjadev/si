(function(global) {
  class dancing extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      const x = 0;
      const y = 30;
      let size = 0.5;
      let r = 20;
      const headx = x;
      const heady = y + r;

      //head
      this.head = [];
      let path = new Path();
      let curve = makeCurve(r, headx, heady);
      for(const [x, y] of curve) {
        path.lineTo(x, y);
      }
      let line = path.toObject3D();
      this.head.push(line);
      this.scene.add(line);
      line.path = path;
      path = new Path();
      path.lineTo(headx + 10, heady - 10);
      path.lineTo(headx, heady - r + (r/4));
      path.lineTo(headx - 10, heady - 10);
      path.lineTo(headx + 10, heady - 10);
      line = path.toObject3D();
      this.head.push(line);
      this.scene.add(line);
      line.path = path;
      path = new Path();
      curve = makeCurve(1, headx + (r/4), heady + (r/4));
      for(const [x, y] of curve) {
        path.lineTo(x, y);
      }
      line = path.toObject3D();
      this.head.push(line);
      this.scene.add(line);
      line.path = path;
      path = new Path();
      curve = makeCurve(1, headx - (r/4), heady + (r/4));
      for(const [x, y] of curve) {
        path.lineTo(x, y);
      }
      line = path.toObject3D();
      this.head.push(line);
      this.scene.add(line);
      line.path = path;

      //front left
      this.frontleft = [];
      path = new Path();
      path.lineTo(x, y);
      path.lineTo(x, y - 10 * size);
      path.lineTo(x + 25 * size, y - 12 * size);
      path.lineTo(x + 100 * size, y - 100 * size);
      path.lineTo(x + 92 * size, y - 108 * size);
      path.lineTo(x + 25 * size, y - 30 * size);
      path.lineTo(x + 22 * size, y - 74 * size);
      line = path.toObject3D();
      this.frontleft.push(line);
      this.scene.add(line);
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
      this.frontleft.push(line);
      this.scene.add(line);
      line.path = path;

      //back left
      this.backleft = [];
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
      this.backleft.push(line);
      this.scene.add(line);
      line.path = path;
      path = new Path();
      path.lineTo(x - 22 * size, y - 91 * size);
      path.lineTo(x - 37 * size, y - 108 * size);
      path.lineTo(x - 45 * size, y - 100 * size);
      path.lineTo(x - 22 * size, y - 73 * size);
      line = path.toObject3D();
      this.backleft.push(line);
      this.scene.add(line);
      line.path = path;

      //front right
      this.frontright = [];
      path = new Path();
      path.lineTo(x, y);
      path.lineTo(x, y - 10 * size);
      path.lineTo(x - 25 * size, y - 12 * size);
      path.lineTo(x - 100 * size, y - 100 * size);
      path.lineTo(x - 92 * size, y - 108 * size);
      path.lineTo(x - 25 * size, y - 30 * size);
      path.lineTo(x - 22 * size, y - 74 * size);
      line = path.toObject3D();
      this.frontright.push(line);
      this.scene.add(line);
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
      this.frontright.push(line);
      this.scene.add(line);
      line.path = path;
      

      //back right
      this.backright = [];
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
      this.backright.push(line);
      this.scene.add(line);
      line.path = path;
      path = new Path();
      path.lineTo(x + 22 * size, y - 91 * size);
      path.lineTo(x + 37 * size, y - 108 * size);
      path.lineTo(x + 45 * size, y - 100 * size);
      path.lineTo(x + 22 * size, y - 73 * size);
      line = path.toObject3D();
      this.backright.push(line);
      this.scene.add(line);
      line.path = path;

      this.camera.position.z = 200;
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
      const startFrame = 7680;

      for (let i = 0; i < this.head.length; i++) {
        const path = this.head[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = 1;
      }
      for (let i = 0; i < this.frontleft.length; i++) {
        const path = this.frontleft[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = (BEAN % 24 < 4) || (BEAN % 24 >= 8 && BEAN % 24 < 12) ? 1 : 0;
      }
      for (let i = 0; i < this.backleft.length; i++) {
        const path = this.backleft[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = BEAN % 24 >= 4 && BEAN % 24 < 8 ? 1 : 0;
      }
      for (let i = 0; i < this.frontright.length; i++) {
        const path = this.frontright[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = (BEAN % 24 >= 12 && BEAN % 24 < 16) || (BEAN % 24 >= 20)  ? 1 : 0;
      }
      for (let i = 0; i < this.backright.length; i++) {
        const path = this.backright[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = BEAN % 24 >= 16 && BEAN % 24 < 20 ? 1 : 0;
      }
    }
  }

  global.dancing = dancing;
})(this);

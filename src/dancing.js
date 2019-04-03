(function(global) {
  class dancing extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.frontleft = [];
      const x = 0;
      const y = 30;
      let size = 0.5;

      //front left
      let path = new Path();
      path.lineTo(x, y);
      path.lineTo(x, y - 10 * size);
      path.lineTo(x + 25 * size, y - 12 * size);
      path.lineTo(x + 100 * size, y - 100 * size);
      path.lineTo(x + 92 * size, y - 108 * size);
      path.lineTo(x + 25 * size, y - 30 * size);
      path.lineTo(x + 22 * size, y - 74 * size);
      let line = path.toObject3D();
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
    }

    update(frame) {
      super.update(frame);
      const startFrame = 7680;
      for (let i = 0; i < this.frontleft.length; i++) {
        const path = this.frontleft[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = 0;
      }
      for (let i = 0; i < this.backleft.length; i++) {
        const path = this.backleft[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = 0;
      }
      for (let i = 0; i < this.frontright.length; i++) {
        const path = this.frontright[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = 0;
      }
      for (let i = 0; i < this.backright.length; i++) {
        const path = this.backright[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = 0;
      }

      if (BEAN % 24 < 4) {
        for (let i = 0; i < this.frontleft.length; i++) {
          const path = this.frontleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
      } else if (BEAN % 24 >= 4 && BEAN % 24 < 8) {
        for (let i = 0; i < this.backleft.length; i++) {
          const path = this.backleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
      } else if (BEAN % 24 >= 8 && BEAN % 24 < 12) {
        for (let i = 0; i < this.frontleft.length; i++) {
          const path = this.frontleft[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
      } else if (BEAN % 24 >= 12 && BEAN % 24 < 16) {
        for (let i = 0; i < this.frontright.length; i++) {
          const path = this.frontright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
      } else if (BEAN % 24 >= 16 && BEAN % 24 < 20) {
        for (let i = 0; i < this.backright.length; i++) {
          const path = this.backright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
      } else {
        for (let i = 0; i < this.frontright.length; i++) {
          const path = this.frontright[i].path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = 1;
        }
      }
    }
  }

  global.dancing = dancing;
})(this);

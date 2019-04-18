(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class cubobbobob extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        inputs: {
          background: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput(),
        }
      });
      this.geometry = new THREE.TorusGeometry(50, 50, 50, 50, 50, 50);
      this.cube = new THREE.Mesh(this.geometry, [
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
      ]);
      this.cube.scale.set(0.75, 0.75, 0.75);
      this.scene.add(this.cube);
      this.twistAmount = 7;
      this.twists = 0;
      this.sign = 1;

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.background = new THREE.Mesh(
        new THREE.BoxGeometry(252, 162, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.background);
      this.background.position.z = -100;

      this.camera.position.z = 200;

      this.startFrame = 1295;
      this.startBEAN = 216;
    }

    update(frame) {
      super.update(frame);
      if(BEAT && BEAN % 4 === 0) {
        this.twistAmount = 50;
      } else {
        this.twistAmount = 10;
      }
      this.twist(this.twistAmount * this.sign);
      this.twists++;

      if(this.twists > 100) {
        this.sign *= -1;
        this.twists = 0;
      }

      if(frame > 1455 && frame <= 1575) {
        this.camera.position.z = smoothstep(250, 400, (frame - this.startFrame) / 400);
      }

      if(frame > 1575 && frame <= 1663) {
        this.camera.position.z = smoothstep(150, 800, (frame - this.startFrame) / 400);
      }

      if(frame > 1663 && frame <= 1776) {
        this.camera.position.z = smoothstep(200, 800, (frame - this.startFrame) / 400);
      }

      if(frame > 1776) {
        if(this.camera.position.z > 0) {
          this.camera.position.z -= 50;
        }
      }

      this.cube.visible = true;
      if(BEAN >= 300) {
        this.cube.visible = false;
      }

      const rotate = lerp(0, 800, F(frame, 5*24*24));
      this.cube.rotation.y = rotate;

      this.background.material.map = this.inputs.background.getValue();
      this.background.material.needsUpdate = true;
    }

    twist(amount) {
      const quaternion = new THREE.Quaternion();
      for (let i = 0; i < this.geometry.vertices.length; i++) {
        const yPos = this.geometry.vertices[i].y;
        const twistAmount = amount;
        const upVec = new THREE.Vector3(0, 1, 0);

        quaternion.setFromAxisAngle(
          upVec,
          (Math.PI / 180) * (yPos / twistAmount)
        );

        this.geometry.vertices[i].applyQuaternion(quaternion);
      }
      this.geometry.verticesNeedUpdate = true;
    }

    texture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#00000';
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.strokeStyle = '#ffffff';
      for(let i = 0; i < 10; i++) {
        ctx.moveTo(0, i*100 + 10 /2);
        ctx.lineTo(1000, i*100 + 10 /2);
        ctx.stroke();
      }

      return canvas;
    }
  }

  global.cubobbobob = cubobbobob;
})(this);

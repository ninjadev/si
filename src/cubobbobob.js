(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
  class cubobbobob extends NIN.THREENode {
    constructor(id, options) {
      super(id, { camera: options.camera,
        inputs: {
          background: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput(),
        }
      });
      this.plume = new THREE.Mesh(
        new THREE.CircleGeometry( 5, 128 ),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
        }));
      this.plume2 = new THREE.Mesh(
        new THREE.CircleGeometry( 5, 128 ),
        new THREE.MeshBasicMaterial({
          color: 0,
        }));
      const plumeScale = 9.5;
      const plumeScale2 = 10.0;
      this.plume.scale.set(plumeScale, plumeScale, 1);
      this.plume2.scale.set(plumeScale2, plumeScale2, 1);
      this.plume.position.z = -75;
      this.plume2.position.z = -80;
      this.scene.add(this.plume);
      this.scene.add(this.plume2);
      this.geometry = new THREE.TorusGeometry(50, 50, 50, 50, 50, 50);

      this.torus = new THREE.Mesh(this.geometry, [
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
        }),
      ]);
      this.torus.scale.set(0.75, 0.75, 0.75);
      this.torus.position.set(0, 0, -50);
      this.scene.add(this.torus);
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

      this.camera.position.z = 100;

      this.startFrame = 1295;
      this.startBEAN = 216;
    }

    update(frame) {
      super.update(frame);

      if(frame === this.startFrame) {
        // reset for development
        this.camera.position.z = 100;
        this.twists = 0;
      }
      if(BEAT && BEAN % 4 === 0) {
        this.twistAmount = 60;
      } else {
        this.twistAmount = 20;
      }
      this.twist(this.twistAmount * this.sign);
      this.twists++;

      if(this.twists > 100) {
        this.sign *= -1;
        this.twists = 0;
      }

      if(frame > 1455 && frame <= 1575) {
        const amount = smoothstep(0.60, 0.3, (frame - this.startFrame) / (1575-1455));
        this.torus.scale.set(amount, amount, amount);
      }

      if(frame > 1575 && frame <= 1623) {
        const amount = smoothstep(0.35, 0.75, (frame - this.startFrame) / (1623-1575));
        this.torus.scale.set(amount, amount, amount);
      }

      if(frame > 1623 && frame <= 1663) {
        const amount = smoothstep(0.75, 0.25, (frame - this.startFrame) / (1663-1623));
        this.torus.scale.set(amount, amount, amount);
      }

      if(frame > 1663 && frame <= 1776) {
        const amount = smoothstep(0.25, 1, (frame - this.startFrame) / (1776-1663));
        this.torus.scale.set(amount, amount, amount);
      }

      if(frame > 1776) {
        if(this.camera.position.z > 0) {
          this.camera.position.z -= 50;
        }
      }

      this.torus.visible = true;
      this.plume.visible = true;
      this.plume2.visible = true;
      if(BEAN >= 300) {
        this.torus.visible = false;
        this.plume.visible = false;
        this.plume2.visible = false;
      }

      const rotate = lerp(0, 800, F(frame, 5*24*24));
      this.torus.rotation.y = rotate;

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
      ctx.fillStyle = '#ff7f7f';
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 10;
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

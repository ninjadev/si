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
      this.plumeScale = plumeScale;
      this.plumeScale2 = plumeScale2;
      this.plume.scale.set(plumeScale, plumeScale, 1);
      this.plume2.scale.set(plumeScale2, plumeScale2, 1);
      this.plume.position.z = -75;
      this.plume2.position.z = -80;
      this.scene.add(this.plume);
      this.scene.add(this.plume2);
      this.geometry = new THREE.TorusGeometry(50, 50, 50, 50, 50);

      this.torus = new THREE.Mesh(this.geometry,
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(this.texture()),
          color: 0xffffff,
        })
      );
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

    warmup(renderer) {
      this.update(1482);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      if(BEAN < 240) {
        this.plume.visible = false;
        this.plume2.visible = false;
      } else {
        this.plume.visible = true;
        this.plume2.visible = true;
      }

      if(frame === this.startFrame) {
        // reset for development
        this.camera.position.z = 100;
        this.twists = 0;
        this.twistAmount = 7;
        this.sign = 1;
      }
      if(BEAT && BEAN % 4 === 0) {
        this.twistAmount = 60;
      } else {
        this.twistAmount = 20;
      }

      const slowifier = (BEAN >= 234 && BEAN < 240) ? 2.5 : 1.3;
      this.twist(this.twistAmount * this.sign * slowifier);
      this.twists++;

      if(this.twists > 100) {
        this.sign *= -1;
        this.twists = 0;
      }

      this.torus.scale.set(0.5, 0.5, 0.5);

      if(BEAN >= 240 && BEAN < 264) {
        const amount = smoothstep(0.35, 0.3, (frame - this.startFrame) / (1575-1455));
        this.torus.scale.set(amount, amount, amount);
      }

      if(BEAN >= 264 && BEAN < 264 + 5) {
        const amount = smoothstep(0.2, 0.25, (frame - this.startFrame) / (1623-1575));
        this.torus.scale.set(amount, amount, amount);
      }

      this.torus.material.color.setRGB(1, 0.5, 0.5);
      this.plume.scale.set(this.plumeScale, this.plumeScale, this.plumeScale);
      this.plume2.scale.set(this.plumeScale2, this.plumeScale2, this.plumeScale2);
      this.plume.material.color.setRGB(1, 1, 1);
      if(BEAN >= 264 + 5) {
        const amount = smoothstep(0.35, 0.45, (frame - this.startFrame) / (1663-1623));
        this.plume.scale.set(1.15, 1.15, 1.15);
        this.plume2.scale.set(1.15, 1.15, 1.15);
        this.torus.scale.set(amount, amount, amount);
        const s1 = this.plumeScale * 1.3;
        const s2 = this.plumeScale2 * 1.3;
        this.plume.scale.set(s1, s1, s1);
        this.plume2.scale.set(s2, s2, s2);
        this.torus.material.color.setRGB(0.5, 1.0, .5);
        this.plume.material.color.setRGB(0.7, 0.7, 0.7);
      }

      this.torus.visible = true;
      if(BEAN >= 290) {
        const scale = lerp(0.45, 0.01, F(frame, 290,  10));
        this.torus.scale.set(scale, scale, scale);
      }
      if(BEAN >= 300) {
        this.torus.visible = false;
        this.plume.visible = false;
        this.plume2.visible = false;
      }

      if(BEAN >= 234 && BEAN < 240) {
        this.torus.scale.x = 1.1;
        this.torus.scale.y = 1.1;
        this.torus.scale.z = 1.1;
        this.twistAmount = 0;
        this.twists = 0;

      }

      const rotate = lerp(0, 800, F(frame, 5*24*24 * 5));
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
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 10;
      for(let i = 0; i < 10; i++) {
        ctx.moveTo(0, i*100 + 10 / 2);
        ctx.lineTo(1000, i*100 + 10 / 2);
        ctx.stroke();
      }

      return canvas;
    }
  }

  global.cubobbobob = cubobbobob;
})(this);

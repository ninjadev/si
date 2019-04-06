(function(global) {

  class trees extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        inputs: {
          tent: new NIN.TextureInput(),
        },
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      const curve = [];
      for (let i = 0; i < 20; i++) {
        const x = 200 * Math.cos(i*Math.PI/20);
        const y = 100 * Math.sin(i*Math.PI/20);
        curve.push([x, y]);
      }

      function makeTree(offset) {
        return [
          {
            coords: [[25,10],[-25,10],[0,50],[25,10]],
            offset,
          },
          {
            coords: [[10,10],[30,-20],[-30,-20],[-10,10]],
            offset,
          },
          {
            coords: [[10,-20],[30,-50],[-30,-50],[-10,-20]],
            offset,
          },
          {
            coords: [[10,-50],[10,-70],[-10,-70],[-10,-50]],
            offset,
          },
        ];
      }

      const tracks = [
        {
          coords: curve,
          offset: [0, -150, 25],
        },
        ...makeTree([0, 12, 0]),
        ...makeTree([-90, 10, 20]),
        ...makeTree([90, 10, 30]),
      ];

      this.lines = [];

      for (const track of tracks) {
        const path = new Path({debug: false});
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.position.set(...track.offset);
        line.path = path;
      }

      function makeCurve(radius, x, y) {
        const curve = [];
        for (let i = 3; i < 17; i++) {
          const angle = Math.PI / 2 - i * Math.PI / 2 / 20;
          curve.push([
            x + radius * Math.cos(angle),
            y + radius * Math.sin(angle),
          ]);
        }
        return curve;
      }

      const wifilinetracks = [
        makeCurve(5, -690, 50),
        makeCurve(10, -690, 50),
        makeCurve(15, -690, 50),
      ];
      this.wifilines = [];
      for (const track of wifilinetracks) {
        const path = new Path();
        for (const [x, y] of track) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.wifilines.push(line);
        this.scene.add(line);
        line.path = path;
      }

      this.mainTree = [];
      const mainTreeTracks = makeTree([-700, 0, 0]);
      for (const track of mainTreeTracks) {
        const path = new Path();
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.mainTree.push(line);
        this.scene.add(line);
        line.position.set(...track.offset);
        line.path = path;
      }

      this.frontTree = [];
      const frontTreeTracks = makeTree([-560, 20, 280]);
      for (const track of frontTreeTracks) {
        const path = new Path();
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.frontTree.push(line);
        this.scene.add(line);
        line.position.set(...track.offset);
        line.path = path;
      }

      const color = new THREE.Vector3(.5, .8, 1);
      const path = new Path({color});
      for (const [x, y] of makeCurve(320, 0, 0)) {
        path.lineTo(x, y);
      }
      this.signal = path.toObject3D();
      this.scene.add(this.signal);
      this.signal.position.set(-625, -220, 130);
      this.signal.rotation.z = .7;
      this.signal.rotation.y = 2;
      this.signal.path = path;

      const tentPath = new Path();
      tentPath.lineTo(0, 0);
      tentPath.lineTo(30, 60);
      tentPath.lineTo(60, 0);
      tentPath.lineTo(42.5, 0);
      tentPath.lineTo(30, 25);
      tentPath.lineTo(17.5, 0);
      tentPath.lineTo(0, 0);
      this.tent = tentPath.toObject3D();
      this.scene.add(this.tent);
      this.tent.position.set(-680, -50, 260);
      this.tent.path = tentPath;

      this.tentblack = new THREE.Mesh(
        new THREE.BoxGeometry(30, 40, 1),
        new THREE.MeshBasicMaterial({color: 0x000000}));
      this.scene.add(this.tentblack);
      this.tentblack.position.set(-655, -35, 245);

      this.tentwall = new THREE.Mesh(
        new THREE.BoxGeometry(20, 11.25, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.tentwall);
      this.tentwall.position.set(-655, -45, 250);

      function tentShapeLeft(u, v, target) {
        let x;
        if (v < 25/60) {
          x = clamp(0, u * 17.5 + 30 * v, 30);
        } else {
          x = clamp(0, 30 * u + 30 * v, 30);
        }
        const y = v * 60;
        target.set(
          x,
          y,
          0
        );
      }
      function tentShapeRight(u, v, target) {
        let x;
        if (v < 25/60) {
          const t = lerp(1, 0, v / (25/60));
          x = clamp(30 + 12.5 * t, 30 * u + 30 * (1 - v), 60);
        } else {
          x = clamp(30, 30 * u + 30 * (1 - v), 60);
        }
        const y = v * 60;
        target.set(
          x,
          y,
          0
        );
      }

      this.tentcoverleft = new THREE.Mesh(
        new THREE.ParametricGeometry(tentShapeLeft, 10, 10),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.tentcoverleft);
      this.tentcoverleft.position.set(-680, -50, 259);

      this.tentcoverright = new THREE.Mesh(
        new THREE.ParametricGeometry(tentShapeRight, 10, 10),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.tentcoverright);
      this.tentcoverright.position.set(-680, -50, 259);

      this.camera.position.z = 220;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(2000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    beforeUpdate() {
      this.inputs.tent.enabled = true;
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(48 * 19);
      const wifiStartFrame = FRAME_FOR_BEAN(48 * 19 + 24);
      const zoomOutFrame = FRAME_FOR_BEAN(48 * 20);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 10) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.wifilines.length; i++) {
        const path = this.wifilines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 50) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.mainTree.length; i++) {
        const path = this.mainTree[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 10) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.frontTree.length; i++) {
        const path = this.frontTree[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 10) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      this.signal.path.material.uniforms.drawStart.value = lerp(1, 0, (frame - zoomOutFrame) / 200);
      this.signal.path.material.uniforms.drawEnd.value = 1;
      this.signal.path.material.uniforms.wobbliness.value = 1;

      this.tent.path.material.uniforms.drawStart.value = 0;
      this.tent.path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - zoomOutFrame) / 200);
      this.tent.path.material.uniforms.wobbliness.value = 1;

      this.tentwall.material.map = this.inputs.tent.getValue();
      this.tentwall.material.needsUpdate = true;

      if (frame < wifiStartFrame) {
        this.camera.position.x = 0;
        this.camera.position.y = easeIn(0, 15, (frame - startFrame) / (wifiStartFrame - startFrame));
        this.camera.position.z = easeIn(220, 190, (frame - startFrame) / (wifiStartFrame - startFrame));

        this.camera.rotation.x = 0;
      } else if (frame < zoomOutFrame) {
        this.camera.position.x = -700;
        this.camera.position.y = lerp(-20, 15, (frame - wifiStartFrame) / (zoomOutFrame - wifiStartFrame));
        this.camera.position.z = 110;

        this.camera.rotation.x = lerp(0, .15, (frame - wifiStartFrame) / (zoomOutFrame - wifiStartFrame));
        this.camera.rotation.y = 0;
      } else {
        this.camera.position.x = easeOut(
          -620,
          easeIn(-550, -655, (frame - zoomOutFrame - 150) / 250),
          (frame - zoomOutFrame) / 400);
        this.camera.position.y = easeOut(
          120,
          easeIn(20, -45, (frame - zoomOutFrame - 150) / 250),
          (frame - zoomOutFrame) / 400);
        this.camera.position.z = easeOut(
          200,
          easeIn(500, 265, (frame - zoomOutFrame - 150) / 250),
          (frame - zoomOutFrame) / 400);

        this.camera.rotation.x = easeOut(-.4, 0, (frame - zoomOutFrame) / 400);
        this.camera.rotation.y = easeOut(.2, 0, (frame - zoomOutFrame) / 150);
      }
    }
  }

  global.trees = trees;
})(this);

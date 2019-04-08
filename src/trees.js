(function(global) {
  function easeInOutSin(a, b, t) {
    t = (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
    return lerp(a, b, t);
  }

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

      function makeCurve(xRadius, yRadius, offset) {
        const coords = [];
        for (let i = 0; i <= 20; i++) {
          const x = xRadius * Math.cos(i*Math.PI/20);
          const y = yRadius * Math.sin(i*Math.PI/20);
          coords.push([x, y]);
        }
        return {coords, offset};
      }

      function makeTree(offset) {
        return [
          {
            coords: [[25,10],[-25,10],[0,50],[25,10]],
            offset,
            fillColor: 0x7fff7f,
            fillMap: Loader.loadTexture('res/paper.png'),
          },
          {
            coords: [[10,10],[30,-20],[-30,-20],[-10,10]],
            offset,
            fillColor: 0x7fff7f,
            fillMap: Loader.loadTexture('res/paper.png'),
          },
          {
            coords: [[10,-20],[30,-50],[-30,-50],[-10,-20]],
            offset,
            fillColor: 0x7fff7f,
            fillMap: Loader.loadTexture('res/paper.png'),
          },
          {
            coords: [[10,-50],[10,-70],[-10,-70],[-10,-50]],
            offset,
            fillColor: 0x5f0010,
            fillMap: Loader.loadTexture('res/paper.png'),
          },
        ];
      }

      const tracks = [
        ...makeTree([0, 12, 0]),
        makeCurve(200, 100, [0, -150, 25]),
        ...makeTree([-90, 10, 20]),
        ...makeTree([90, 10, 30]),
        ...makeTree([90, 10, 30]),
        makeCurve(500, 75, [-650, -145, 0]),
        ...makeTree([-760, 10, 180]),
        ...makeTree([-490, -10, 60]),
        makeCurve(75, 25, [-490, -105, 60]),
      ];

      this.lines = [];

      for (const track of tracks) {
        const options = ('fillColor' in track || 'fillMap' in track) && {
          fill: true,
          fillColor: track.fillColor,
          fillMap: track.fillMap,
          directionSize: 2,
        };
        const path = new Path(options);
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.lines.push(line);
        this.scene.add(line);
        line.position.set(...track.offset);
        line.path = path;
      }

      function makeSkewedCurve(radius, x, y) {
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

      const color = new THREE.Vector3(.5, .8, 1);
      const wifilinetracks = [
        makeSkewedCurve(5, -690, 50),
        makeSkewedCurve(10, -690, 50),
        makeSkewedCurve(15, -690, 50),
      ];
      this.wifilines = [];
      for (const track of wifilinetracks) {
        const path = new Path({color});
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
        const options = ('fillColor' in track || 'fillMap' in track) && {
          fill: true,
          fillColor: track.fillColor,
          fillMap: track.fillMap,
        };
        const path = new Path(options);
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
        const options = ('fillColor' in track || 'fillMap' in track) && {
          fill: true,
          fillColor: track.fillColor,
          fillMap: track.fillMap,
        };
        const path = new Path(options);
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.frontTree.push(line);
        this.scene.add(line);
        line.position.set(...track.offset);
        line.path = path;
      }

      const path = new Path({color});
      for (const [x, y] of makeSkewedCurve(320, 0, 0)) {
        path.lineTo(x, y);
      }
      this.signal = path.toObject3D();
      this.scene.add(this.signal);
      this.signal.position.set(-625, -220, 130);
      this.signal.rotation.z = .75;
      this.signal.rotation.y = 2;
      this.signal.path = path;

      const tentPath = new Path({fill: true, fillColor: 0xef8f5f});
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

      function tentTriangle(u, v, target) {
        const width = 50 * (1 - v);
        const x = u * width + (50 - width) / 2 - 25;
        const y = v * 50 - 20;
        target.set(x, y, 0);
      }

      this.tentblack = new THREE.Mesh(
        new THREE.ParametricGeometry(tentTriangle, 10, 10),
        new THREE.MeshBasicMaterial({color: 0x1f282f}));
      this.scene.add(this.tentblack);
      this.tentblack.position.set(-655, -32, 253);

      this.tentwall = new THREE.Mesh(
        new THREE.BoxGeometry(20, 11.25, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.tentwall);
      this.tentwall.position.set(-651, -45, 254);

      this.camera.position.z = 220;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(2000, 1000, 10),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          map: Loader.loadTexture('res/paper.png'),
          side: THREE.DoubleSide,
        }));
      this.wall.material.map.repeat.set(8, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
      this.wall.position.x = -500;
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
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 8) / 100);
        path.material.uniforms.wobbliness.value = 1;

        if(path.fill) {
          path.magicAnimationUpdater();
        }
      }

      for (let i = 0; i < this.wifilines.length; i++) {
        const path = this.wifilines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 50 - 25) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.mainTree.length; i++) {
        const path = this.mainTree[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 10) / 100);
        path.material.uniforms.wobbliness.value = 1;
        path.magicAnimationUpdater();
      }

      for (let i = 0; i < this.frontTree.length; i++) {
        const path = this.frontTree[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 10) / 100);
        path.material.uniforms.wobbliness.value = 1;
        path.magicAnimationUpdater();
      }

      this.signal.path.material.uniforms.drawStart.value = lerp(1, 0, (frame - zoomOutFrame - 10) / 330);
      this.signal.path.material.uniforms.drawEnd.value = 1;
      this.signal.path.material.uniforms.wobbliness.value = 1;

      this.tent.path.material.uniforms.drawStart.value = 0;
      this.tent.path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - zoomOutFrame) / 200);
      this.tent.path.material.uniforms.wobbliness.value = 1;

      this.tentwall.material.map = this.inputs.tent.getValue();
      this.tentwall.material.needsUpdate = true;

      if (frame < wifiStartFrame) {
        this.camera.position.x = 0;
        this.camera.position.y = lerp(0, 15, (frame - startFrame) / (wifiStartFrame - startFrame));
        this.camera.position.z = lerp(250, 215, (frame - startFrame) / (wifiStartFrame - startFrame));

        this.camera.rotation.x = 0;
        this.camera.rotation.y = 0;
        this.camera.rotation.z = lerp(0, -.05, (frame - startFrame - 50) / (wifiStartFrame - startFrame - 50));
      } else if (frame < zoomOutFrame) {
        this.camera.position.x = -720;
        this.camera.position.y = lerp(-20, 15, (frame - wifiStartFrame) / (zoomOutFrame - wifiStartFrame));
        this.camera.position.z = 125;

        this.camera.rotation.x = lerp(0, .15, (frame - wifiStartFrame) / (zoomOutFrame - wifiStartFrame));
        this.camera.rotation.y = -.15;
        this.camera.rotation.z = 0;
      } else {
        this.camera.position.x = easeInOutSin(
          -665,
          easeIn(-575, -651, (frame - zoomOutFrame - 150) / 250),
          (frame - zoomOutFrame) / 400);
        this.camera.position.y = easeInOutSin(
          62,
          easeIn(40, -45.2, (frame - zoomOutFrame - 150) / 250),
          (frame - zoomOutFrame) / 400);
        this.camera.position.z = easeInOutSin(
          20,
          easeIn(550, 268.5, (frame - zoomOutFrame - 150) / 250),
          (frame - zoomOutFrame) / 400);

        this.camera.rotation.x = smoothstep(-.2, 0, (frame - zoomOutFrame) / 250);
        this.camera.rotation.y = smoothstep(.55, 0, (frame - zoomOutFrame) / 250);
        this.camera.rotation.z = 0;
      }
    }
  }

  global.trees = trees;
})(this);

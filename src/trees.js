(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));
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

      this.constructionPaper = Loader.loadTexture('res/constructionpaper.jpg');
      const constructionPaper = this.constructionPaper;
      const mapScale = 0.01;
      constructionPaper.repeat.set(mapScale, mapScale);
      constructionPaper.wrapS = THREE.RepeatWrapping;
      constructionPaper.wrapT = THREE.RepeatWrapping;
      constructionPaper.offset.set(0.5, 0.5);

      function makeCurve(xRadius, yRadius, offset) {
        const coords = [];
        coords.push([0, 0]);
        for (let i = 0; i <= 20; i++) {
          const x = xRadius * Math.cos(i*Math.PI/20);
          const y = yRadius * Math.sin(i*Math.PI/20);
          coords.push([x, y]);
        }
        coords.push([0, 0]);
        return {coords, offset, fillColor: 0x7f7f7f};
      }

      function makeTree(offset) {
        return [
          {
            coords: [[25,12], [24, 10], [-24, 10], [-25,12], [-1.5, 50], [1.5,50], [25,12]],
            offset: [offset[0], offset[1], offset[2] + 0.05],
            fillColor: 0x7fff7f,
            fillMap: constructionPaper,
          },
          {
            coords: [[10,10], [30,-17.5], [29, -20], [-27,-20], [-28, -17.5], [-10,10]],
            offset: [offset[0], offset[1], offset[2] + 0.1],
            fillColor: 0x7fff7f,
            fillMap: constructionPaper,
          },
          {
            coords: [[10,-20],[29,-48],[28, -50], [-28,-50],[-29, -48], [-10,-20]],
            offset,
            fillColor: 0x7fff7f,
            fillMap: constructionPaper,
          },
          {
            coords: [[10,-50],[10,-70],[-10,-70],[-10,-50]],
            offset,
            fillColor: 0xff7f7f,
            fillMap: constructionPaper,
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
        ...makeTree([-520, -4, 4]),
        ...makeTree([-420, -10, 60]),
        makeCurve(75, 25, [-420, -105, 60]),
        ...makeTree([-560, 20, 280]),
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
        const shadowPath = new Path(Object.assign({}, options, {
          fillColor: 0,
        }));
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
          shadowPath.lineTo(x, y -4);
        }
        const line = path.toObject3D();
        const shadowLine = shadowPath.toObject3D();
        this.lines.push(line);
        this.lines.push(shadowLine);
        this.scene.add(line);
        this.scene.add(shadowLine);
        line.position.set(...track.offset);
        shadowLine.position.set(...track.offset);
        line.path = path;
        shadowLine.path = shadowPath;
        shadowLine.position.z -= 1;
      }

      function makeSkewedCurve(radius, x, y, offsetangle=0) {
        const curve = [];
        for (let i = 3; i < 17; i++) {
          const angle = Math.PI / 2 - i * Math.PI / 2 / 20 + offsetangle;
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

      const wifilinereceivertracks = [
        makeSkewedCurve(5, -530, 44, 1.5),
        makeSkewedCurve(10, -530, 44, 1.5),
        makeSkewedCurve(15, -530, 44, 1.5),
      ];
      this.wifilinesreceiver = [];
      for (const track of wifilinereceivertracks) {
        const path = new Path({color});
        for (const [x, y] of track) {
          path.lineTo(x, y);
        }
        const line = path.toObject3D();
        this.wifilinesreceiver.push(line);
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
          directionSize: 2,
        };
        const path = new Path(options);
        const shadowPath = new Path(Object.assign({}, options, {
          fillColor: 0,
        }));
        for (const [x, y] of track.coords) {
          path.lineTo(x, y);
          shadowPath.lineTo(x, y - 4);
        }
        const line = path.toObject3D();
        const shadowline = shadowPath.toObject3D();
        this.mainTree.push(line);
        this.mainTree.push(shadowline);
        this.scene.add(line);
        this.scene.add(shadowline);
        line.position.set(...track.offset);
        shadowline.position.set(...track.offset);
        line.path = path;
        shadowline.path = shadowPath;
        shadowline.position.z -= 1;
      }

      const tentPath = new Path({fill: true, fillColor: 0xef8f5f});
      tentPath.lineTo(0, 2);
      tentPath.lineTo(3, 11);
      tentPath.lineTo(28, 58);
      tentPath.lineTo(33, 60);
      tentPath.lineTo(57, 11);
      tentPath.lineTo(59, 2);
      tentPath.lineTo(58, 0);
      tentPath.lineTo(42.5, 0);
      tentPath.lineTo(32, 24);
      tentPath.lineTo(28, 23);
      tentPath.lineTo(17.5, 0);
      tentPath.lineTo(1, 0);
      tentPath.lineTo(0, 2);
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
        new THREE.MeshBasicMaterial({color: 0x000000}));
      this.scene.add(this.tentblack);
      this.tentblack.position.set(-655, -32, 253);

      this.tentwall = new THREE.Mesh(
        new THREE.BoxGeometry(20, 11.25, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      //this.scene.add(this.tentwall);
      this.tentwall.position.set(-651, -45, 254);

      this.camera.position.z = 220;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(2000, 1000, 10),
        new THREE.MeshBasicMaterial({
          color: 0xff7fff,
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

    warmup(renderer) {
      this.update(3287);
      this.render(renderer);
      this.update(3743);
      this.render(renderer);
      this.update(4014);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      this.wall.material.color.setRGB(1, 1, 1);
      if(BEAN >= 600) {
        this.wall.material.color.setRGB(1, 0.5, 1);
      }

      const startFrame = FRAME_FOR_BEAN(24 * 21);
      const wifiStartFrame = FRAME_FOR_BEAN(24 * 23);
      const zoomOutFrame = FRAME_FOR_BEAN(24 * 24);
      const zoomInFrame = FRAME_FOR_BEAN(24 * 26);
      const endFrame = FRAME_FOR_BEAN(24 * 28);

      for (let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, F(frame, 24 * 21 + (i / 2 | 0) * 3, 12 + 3));
        path.material.uniforms.wobbliness.value = 1;

        if(path.fill) {
          //path.magicAnimationUpdater();
        }
        if(this.lines[i].fillMesh) {
          this.lines[i].fillMesh.visible = path.material.uniforms.drawEnd.value > 0.999;
        }
      }

      for (let i = 0; i < this.wifilines.length; i++) {
        const path = this.wifilines[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 50 - 25) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.wifilinesreceiver.length; i++) {
        const path = this.wifilinesreceiver[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - wifiStartFrame - i * 50 - 305) / 100);
        path.material.uniforms.wobbliness.value = 1;
      }

      for (let i = 0; i < this.mainTree.length; i++) {
        const path = this.mainTree[i].path;
        path.material.uniforms.drawStart.value = 0;
        path.material.uniforms.drawEnd.value = lerp(0, 1, F(frame, 24 * 3 + (i / 2 | 0) * 3, 12 + 3));
        path.material.uniforms.wobbliness.value = 1;
        //path.magicAnimationUpdater();
        if(path.fillMesh) {
          path.fillMesh.visible = path.material.uniforms.drawEnd.value > 0.999;
        }
      }

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
      } else if ( frame < zoomInFrame) {
        this.camera.position.x = easeInOutSin(
          -685,
          -600,
          (frame - zoomOutFrame) / (zoomInFrame - zoomOutFrame));
        this.camera.position.y = easeInOutSin(
          62,
          50,
          (frame - zoomOutFrame) / (zoomInFrame - zoomOutFrame));
        this.camera.position.z = easeInOutSin(
          30,
          210,
          (frame - zoomOutFrame) / (zoomInFrame - zoomOutFrame));

        this.camera.rotation.x = easeInOutSin(
          -.2, -.2, (frame - zoomOutFrame) / (zoomInFrame - zoomOutFrame));
        this.camera.rotation.y = easeInOutSin(
          .2, 0, (frame - zoomOutFrame) / (zoomInFrame - zoomOutFrame));
        this.camera.rotation.z = 0;
      } else {
        const duration = endFrame - zoomInFrame;
        this.camera.position.x = lerp(-560, -651, (frame - zoomInFrame) / duration);
        this.camera.position.y = lerp(78, -45.2, (frame - zoomInFrame) / duration);
        this.camera.position.z = lerp(515, 268.5, (frame - zoomInFrame) / duration);

        this.camera.rotation.x = easeIn(-.25, 0, (frame - zoomInFrame) / duration);
        this.camera.rotation.y = 0;
        this.camera.rotation.z = 0;
      }
    }
  }

  global.trees = trees;
})(this);

(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));

  class pathy extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.sceneWrapper = new THREE.Object3D();
      this.scene.add(this.sceneWrapper);

      this.lines = [];
      const verticalCount = 22;
      const width = 15.5;

      this.fillerz = [];

      const horizontalAmount = 40;
      const pod = new THREE.Shape();
      pod.lineTo(0, 0);
      pod.lineTo(width, 10);
      pod.lineTo(width, 0);
      pod.lineTo(0, -10);
      const trigeometry = new THREE.ShapeGeometry(pod);
      for(let i = 0; i < verticalCount; i++) {
        this.fillerz[i] = [];
        for(let j = 0; j < horizontalAmount; j++) {
          this.fillerz[i][j] = new THREE.Mesh(
            trigeometry,
            new THREE.MeshBasicMaterial({
              color: 0xff7f7f,
            })
          );
          this.sceneWrapper.add(this.fillerz[i][j]);
          const box = this.fillerz[i][j];
          //box.rotation.z = Math.PI / 2;
          box.position.x = width * (i - verticalCount / 2 | 0);
          box.position.y = 10 * (j + 0 - horizontalAmount / 2 | 0);
          box.scale.y = i % 2 == 0 ? -1 : 1;
          box.visible = false;
        }
      }

      for(let i = 0; i < verticalCount; i++) {
        const path = new Path({directionSize: 1});
        path.lineTo(0, -200);
        path.lineTo(0, 200);
        const line = path.toObject3D();
        this.lines.push(line);
        this.sceneWrapper.add(line);
        line.position.x = (i - verticalCount / 2) * width;
        line.path = path;
      }

      for(let j = 0; j < horizontalAmount; j++) {
        const p2 = new Path({debug: false, directionSize: 2});
        for(let i = 0; i < verticalCount; i++) {
          const direction = i % 2 === 0 ? 1 : -1;
          p2.lineTo(width * i, 5 * direction);
        }
        const l2 = p2.toObject3D();
        l2.path = p2;
        p2.uniforms.wobbliness.value = 1;
        this.lines.push(l2);
        this.sceneWrapper.add(l2);
        l2.position.x = -verticalCount / 2 * width;
        l2.position.y = (j - horizontalAmount / 2) * 5;
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({map: Loader.loadTexture('res/paper.png')}));
      this.wall.material.map.repeat.set(4, 4);
      this.wall.material.map.wrapS = THREE.RepeatWrapping;
      this.wall.material.map.wrapT = THREE.RepeatWrapping;
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      var manipulated_bean = BEAN;

      // Time shift used only on the map scene
      if (frame > FRAME_FOR_BEAN(330) && frame <= FRAME_FOR_BEAN(408)) {
        // Tune this final number to get timing
        frame = frame + FRAME_FOR_BEAN(172) - FRAME_FOR_BEAN(370);
        manipulated_bean = BEAN_FOR_FRAME(frame);
      }

      for(let i = 0; i < this.fillerz.length; i++) {
        for(let j = 0; j < this.fillerz[i].length; j++) {
          this.fillerz[i][j].visible = false;
        }
      }

      for(let i = 7; i <= 13; i++) {
        const n = i % 2 == 0;
        if(manipulated_bean >= 186 - 3 && manipulated_bean < 186 - 2) {
          const j = n ? 17 : 25;
          this.fillerz[i][j].visible = true;
        } else if(manipulated_bean >= 186 - 2 && manipulated_bean < 186 - 1) {
          const j = n ? 18 : 24;
          this.fillerz[i][j].visible = true;
        } else if(manipulated_bean >= 186 - 1 && manipulated_bean < 186) {
          const j = n ? 19 : 23;
          this.fillerz[i][j].visible = true;
        } else if(manipulated_bean >= 186 && manipulated_bean < 186 + 3) {
          const j = n ? 20 : 22;
          this.fillerz[i][j].visible = true;
        } else if(manipulated_bean >= 186 + 3 && manipulated_bean < 186 + 6 + 24) {
          this.fillerz[i][21].visible = true;
        }
      }

      for(let i = 0; i < this.lines.length; i++) {
        const path = this.lines[i].path;
        path.material.uniforms.drawStart.value = 0;
        //path.material.uniforms.drawEnd.value =  2 * Math.sin((frame-  1000) / 100 - i * 0.01) + 0.5 + 0.5 * Math.sin(i);
        path.material.uniforms.drawEnd.value = easeIn(0, 1,
          F(frame - (Math.sin(i) - 1) * 4, 174 - 12, 12)
        );
        path.material.uniforms.wobbliness.value = 1;
        path.material.uniforms.width.value = 1;
        if(manipulated_bean >= 198 - 3) {
          path.material.uniforms.width.value = easeIn(1, 0.5, F(frame, 198 - 3, 3));
        }
      }

      if(manipulated_bean <= 192 || manipulated_bean  >= 192 + 3) {
        this.camera.position.z = lerp(200, 50, F(frame, 174, 24 - 1));
      }
      if(manipulated_bean >= 174) {
        this.sceneWrapper.rotation.z = lerp(
          0, Math.PI / 2, F(frame, 174, 192 - 174));

      } else {
        this.sceneWrapper.rotation.z = 0;
      }

      this.camera.position.y = 0;
      this.camera.position.x = 0;
      if(manipulated_bean >= 204) {
        this.camera.position.y = manipulated_bean % 6 < 3 ? 15.5 : 0;
        this.camera.position.x = -((manipulated_bean - 204) / 3 | 0) * 15.5 / 2;
      }
    }
  }

  global.pathy = pathy;
})(this);

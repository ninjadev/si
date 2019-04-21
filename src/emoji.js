(function(global) {
  const F = (frame, from, delta) => (frame - FRAME_FOR_BEAN(from)) / (FRAME_FOR_BEAN(from + delta) - FRAME_FOR_BEAN(from));

  class emoji extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });


      const left = -1600 / 2;
      const right = 1600 / 2;
      const top = 900 / 2;
      const bottom = -900 / 2;
      const near = 100;
      const far = 4000;
      this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
      this.camera.position.z = 3000;

      this.canvases = {
        hardware: document.createElement('canvas'),
        dancingSkills: document.createElement('canvas'),
        pixelArt: document.createElement('canvas'),
        campingEquipment: document.createElement('canvas'),
        goodMood: document.createElement('canvas'),
        sunglasses: document.createElement('canvas'),
      };

      this.images = {
        hardware: document.createElement('img'),
        dancingSkills: document.createElement('img'),
        pixelArt: document.createElement('img'),
        campingEquipment: document.createElement('img'),
        goodMood: document.createElement('img'),
        sunglasses: document.createElement('img'),
      };
      this.numImagesLoaded = 0;
      this.imageLoadedCallback = () => {
        this.numImagesLoaded++;
        if (this.numImagesLoaded === 6) {
          this.drawMosaics();
        }
      };
      Loader.load('res/emoji/hardware.png', this.images.hardware, this.imageLoadedCallback);
      Loader.load('res/emoji/dancingSkills.png', this.images.dancingSkills, this.imageLoadedCallback);
      Loader.load('res/emoji/pixelArt.png', this.images.pixelArt, this.imageLoadedCallback);
      Loader.load('res/emoji/campingEquipment.png', this.images.campingEquipment, this.imageLoadedCallback);
      Loader.load('res/emoji/goodMood.png', this.images.goodMood, this.imageLoadedCallback);
      Loader.load('res/emoji/sunglasses.png', this.images.sunglasses, this.imageLoadedCallback);
      this.generatedEmojiTextures = {};

      this.emojiTextures = {};
      this.emojiIdByKey = {
        hardware: 3,
        dancingSkills: 1,
        pixelArt: 4,
        campingEquipment: 0,
        goodMood: 2,
        sunglasses: 5,
      };
      this.emojiKeyById = {
        3: 'hardware',
        1: 'dancingSkills',
        4: 'pixelArt',
        0: 'campingEquipment',
        2: 'goodMood',
        5: 'sunglasses',
      };
      this.emojiMaterials = {};
      this.emojiGeometry = new THREE.PlaneGeometry(32, 32, 1);
      this.wrappers = {};
      this.tileWrappers = {};
      this.tiles = {};
      this.mosaicKeyOrder = [
        'hardware', 'dancingSkills', 'pixelArt', 'campingEquipment', 'goodMood', 'sunglasses'
      ];
      this.recursiveRelativePositions = {
        'hardware': {
          key: 'dancingSkills',
          x: 497,
          y: 1263,
          scale: 16 / 512,
        },
        'dancingSkills': {
          key: 'pixelArt',
          x: 509,
          y: 1500,
          scale: 16 / 512,
        },
        'pixelArt': {
          key: 'campingEquipment',
          x: 441,
          y: 1318,
          scale: 16 / 512,
        },
        'campingEquipment': {
          key: 'goodMood',
          x: 512.3,
          y: 1247,
          scale: 16 / 512,
        },
        'goodMood': {
          key: 'sunglasses',
          x: 0,
          y: 0,
          scale: 1,
        },
      };

      // LAPTOP POLYGON
      const pathOptions = {fill: true, fillColor: 0x556E7C};
      const path = new Path(pathOptions);
      path.lineTo(95, 1090);
      path.lineTo(95, 1570);
      path.lineTo(895, 1570);
      path.lineTo(895, 1090);
      path.lineTo(95, 1090);
      this.laptopPolygonLine = path.toObject3D();
      this.scene.add(this.laptopPolygonLine);
      this.laptopPolygonLine.path = path;

      const laptopKeyboardPath = new Path({fill: true, fillColor: 0xCFD7DD});
      laptopKeyboardPath.lineTo(895, 1090);
      laptopKeyboardPath.lineTo(975, 820);
      laptopKeyboardPath.lineTo(825, 810);
      laptopKeyboardPath.lineTo(125, 810);
      laptopKeyboardPath.lineTo(14, 820);
      laptopKeyboardPath.lineTo(95, 1090);
      laptopKeyboardPath.lineTo(895, 1090);
      this.laptopKeyboardPolygonLine = laptopKeyboardPath.toObject3D();
      this.scene.add(this.laptopKeyboardPolygonLine);
      this.laptopKeyboardPolygonLine.path = laptopKeyboardPath;

      this.initTiles();
    }

    drawMosaics() {
      for (let emojiKey of this.mosaicKeyOrder) {
        const canvas = this.canvases[emojiKey];
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        const mosaic = window.emojiMosaics[emojiKey];
        for (let i = 0; i < mosaic.tiles.length; i++) {
          const tile = mosaic.tiles[i];
          const drawable = this.images[this.emojiKeyById[tile.emoji_id]];

          ctx.drawImage(
            drawable,  // drawable source
            0,  // source offset x
            0,  // source offset y
            512,  // source width
            512,  // source height
            tile.x,  // destination offset x
            tile.y,  // destination offset y
            32,  // destination width
            32  // destination height
          );
        }

        ctx.globalCompositeOperation = 'overlay';
        ctx.drawImage(
          this.images[emojiKey],  // drawable source
          0,  // source offset x
          0,  // source offset y
          512,  // source width
          512,  // source height
          0,  // destination offset x
          0,  // destination offset y
          canvas.width,  // destination width
          canvas.height  // destination height
        );

        const texture = new THREE.CanvasTexture(canvas);

        this.emojiMaterials[this.emojiIdByKey[emojiKey]].map = texture;
        this.emojiMaterials[this.emojiIdByKey[emojiKey]].needsUpdate = true;
      }
    }

    initTiles() {
      for (let j = 0; j < this.mosaicKeyOrder.length; j++) {
        const mosaicKey = this.mosaicKeyOrder[j];

        if (window.emojiMosaics.hasOwnProperty(mosaicKey)) {
          let mosaic = window.emojiMosaics[mosaicKey];

          for (let emojiId in mosaic.emojies) {
            if (mosaic.emojies.hasOwnProperty(emojiId) && !this.emojiTextures.hasOwnProperty(emojiId)) {
              this.emojiTextures[emojiId] = Loader.loadTexture(`res/emoji/${mosaic.emojies[emojiId]}`);
              this.emojiMaterials[emojiId] = new THREE.MeshBasicMaterial({
                map: this.emojiTextures[emojiId],
                transparent: true
              })
            }
          }

          const wrapper = new THREE.Object3D();
          this.tiles[mosaicKey] = [];

          const tileWrapper = new THREE.Object3D();

          for (let i = 0; i < mosaic.tiles.length; i++) {
            const tile = mosaic.tiles[i];
            const material = this.emojiMaterials[tile.emoji_id];
            const tileMesh = new THREE.Mesh(this.emojiGeometry, material);
            tileMesh.position.x = tile.x;
            tileMesh.position.y = 1800 - tile.y;
            tileMesh.position.z = 0.01 * i;
            this.tiles[mosaicKey].push(tileMesh);
            tileWrapper.add(tileMesh);
          }

          const lowResTileMaterial = this.emojiMaterials[this.emojiIdByKey[mosaicKey]];
          const tileMesh = new THREE.Mesh(this.emojiGeometry, lowResTileMaterial);
          tileMesh.scale.x = 32;
          tileMesh.scale.y = 32;
          tileMesh.position.x = 512 - 16;
          tileMesh.position.y = 1800 - 512;
          tileMesh.position.z = 0;
          wrapper.add(tileMesh);
          wrapper.tileMesh = tileMesh;

          this.tileWrappers[mosaicKey] = tileWrapper;
          this.wrappers[mosaicKey] = wrapper;
        }
      }

      let i = 0;
      for (let outerMosaicKey in this.recursiveRelativePositions) {
        if (this.recursiveRelativePositions.hasOwnProperty(outerMosaicKey)) {
          const positionObj = this.recursiveRelativePositions[outerMosaicKey];
          const outerMosaicMesh = this.wrappers[outerMosaicKey];
          const innerMosaicMesh = this.wrappers[positionObj.key];
          outerMosaicMesh.add(innerMosaicMesh);
          innerMosaicMesh.scale.x = positionObj.scale;
          innerMosaicMesh.scale.y = positionObj.scale;
          innerMosaicMesh.scale.z = positionObj.scale;
          innerMosaicMesh.position.x = positionObj.x;
          innerMosaicMesh.position.y = positionObj.y;
          innerMosaicMesh.position.z = 50 + i;
          i++;
        }
      }

      this.wrappers.goodMood.add(this.tileWrappers.sunglasses);

      this.scene.add(this.wrappers.hardware);
      this.scene.add(this.tileWrappers.hardware);

      // LAPTOP POLYGON
      const pathOptions = {fill: true, fillColor: 0x556E7C};
      const path = new Path(pathOptions);
      path.lineTo(95, 1090);
      path.lineTo(95, 1570);
      path.lineTo(895, 1570);
      path.lineTo(895, 1090);
      path.lineTo(95, 1090);
      this.laptopPolygonLine = path.toObject3D();
      this.scene.add(this.laptopPolygonLine);
      this.laptopPolygonLine.path = path;

      const laptopKeyboardPath = new Path({fill: true, fillColor: 0xCFD7DD});
      laptopKeyboardPath.lineTo(895, 1090);
      laptopKeyboardPath.lineTo(975, 820);
      laptopKeyboardPath.lineTo(825, 810);
      laptopKeyboardPath.lineTo(125, 810);
      laptopKeyboardPath.lineTo(14, 820);
      laptopKeyboardPath.lineTo(95, 1090);
      laptopKeyboardPath.lineTo(895, 1090);
      this.laptopKeyboardPolygonLine = laptopKeyboardPath.toObject3D();
      this.scene.add(this.laptopKeyboardPolygonLine);
      this.laptopKeyboardPolygonLine.path = laptopKeyboardPath;

      this.wrappers.campingEquipment.tileMesh.material.opacity = 0;

      this.random = new Random(0x80d);
      this.shades = [];
      this.shadeMaterial = new THREE.MeshBasicMaterial({
        map: Loader.loadTexture(`res/emoji/shades.png`),
        transparent: true
      });
      for (let i = 0; i < 90; i++) {
        const tileMesh = new THREE.Mesh(this.emojiGeometry, this.shadeMaterial);
        tileMesh.scale.x = 32;
        tileMesh.scale.y = 32;
        tileMesh.position.x = -290 + 1299 * this.random();
        tileMesh.position.y = 740 + 1090 * this.random();
        tileMesh.rotation.z = this.random() - 0.5;
        tileMesh.position.z = 99;
        tileMesh.visible = false;
        this.wrappers.sunglasses.add(tileMesh);
        this.shades.push(tileMesh);
      }
    }

    warmup(renderer) {
      this.update(8207);
      this.render(renderer);
      this.update(8243);
      this.render(renderer);
      this.update(8351);
      this.render(renderer);
      this.update(8423);
      this.render(renderer);
      this.update(8531);
      this.render(renderer);
      this.update(8631);
      this.render(renderer);
      this.update(8747);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      this.laptopPolygonLine.visible = BEAN >= 1368 && BEAN < 1392;
      this.laptopPolygonLine.path.material.uniforms.drawStart.value = 0;
      this.laptopPolygonLine.path.material.uniforms.drawEnd.value = lerp(
        0, 1, F(frame, 1368, 6)
      );
      this.laptopPolygonLine.fillMesh.visible = this.laptopPolygonLine.path.material.uniforms.drawEnd.value > 0.999;
      this.laptopPolygonLine.path.material.uniforms.wobbliness.value = 1;
      this.laptopPolygonLine.path.material.uniforms.width.value = 100;

      this.laptopKeyboardPolygonLine.visible = BEAN >= 1368 && BEAN < 1392;
      this.laptopKeyboardPolygonLine.path.material.uniforms.drawStart.value = 0;
      this.laptopKeyboardPolygonLine.path.material.uniforms.drawEnd.value = lerp(
        0, 1, F(frame, 1368, 6)
      );
      this.laptopKeyboardPolygonLine.fillMesh.visible = this.laptopKeyboardPolygonLine.path.material.uniforms.drawEnd.value > 0.999;
      this.laptopKeyboardPolygonLine.path.material.uniforms.wobbliness.value = 1;
      this.laptopKeyboardPolygonLine.path.material.uniforms.width.value = 100;

      if (this.wrappers.hardware) {
	      this.wrappers.hardware.visible = BEAN >= 1380;
	      this.wrappers.sunglasses.visible = BEAN >= 1440;
	      this.wrappers.goodMood.tileMesh.visible = BEAN < 1456;
	      this.wrappers.sunglasses.tileMesh.visible = false;//BEAN < 1456;
	      this.wrappers.campingEquipment.tileMesh.visible = BEAN < 1456;
	      this.wrappers.pixelArt.tileMesh.visible = BEAN < 1456;
	      this.wrappers.dancingSkills.tileMesh.visible = BEAN < 1456;
	      this.wrappers.hardware.tileMesh.visible = BEAN < 1456;

	      this.tileWrappers.hardware.visible = BEAN >= 1392 && BEAN < 1420;

	      this.tileWrappers.dancingSkills.visible = false;
	      this.tileWrappers.pixelArt.visible = false;
	      this.tileWrappers.campingEquipment.visible = false;
	      this.tileWrappers.goodMood.visible = false;
	      this.tileWrappers.sunglasses.visible = BEAN >= 1434 && BEAN < 1456;
      }

      const beansBeforeZoom = 10;
      const zoomDuration = 6;
      const prog1Start = 1380;
      const prog2Start = prog1Start + 12;
      const prog3Start = prog2Start + 12;
      const prog4Start = prog3Start + 12;
      const prog5Start = prog4Start + 12;

      if (BEAN < prog1Start) {
        this.camera.position.x = 512;
        this.camera.position.y = 1200;
      }

      // zoom progress 1
      else if (BEAN >= prog1Start && BEAN < prog1Start + beansBeforeZoom + zoomDuration) {
        const zoomProgress1 = F(frame, prog1Start + beansBeforeZoom, zoomDuration);
        this.camera.position.x = easeOut(512, 512, zoomProgress1);
        this.camera.position.y = easeOut(1200, 1303, zoomProgress1);
        this.camera.zoom = smoothstep(1.0, 22, zoomProgress1);
      }

      // zoom progress 2
      else if (BEAN >= prog2Start + beansBeforeZoom && BEAN < prog2Start + beansBeforeZoom + zoomDuration) {
        const zoomProgress2 = F(frame, prog2Start + beansBeforeZoom, zoomDuration);
        this.camera.position.x = easeOut(512, 513.4, zoomProgress2);
        this.camera.position.y = easeOut(1303, 1311.1, zoomProgress2 + 0.05);
        this.camera.zoom = smoothstep(22, 22 * 40, zoomProgress2);
      }

      // zoom progress 3
      else if (BEAN >= prog3Start + beansBeforeZoom && BEAN < prog3Start + beansBeforeZoom + zoomDuration) {
        const zoomProgress3 = F(frame, prog3Start + beansBeforeZoom, zoomDuration);
        this.camera.position.x = easeOut(513.4, 513.352, zoomProgress3);
        this.camera.position.y = easeOut(1311.1, 1311.201, zoomProgress3);
        this.camera.zoom = smoothstep(22 * 40, 22 * 40 * 30, zoomProgress3);

        this.wrappers.campingEquipment.tileMesh.material.opacity = lerp(0, 1, F(frame, prog3Start + beansBeforeZoom, zoomDuration * 0.4));
      }

      // zoom progress 4 & 5
      else if (BEAN >= prog4Start + beansBeforeZoom) {
        const zoomProgress4 = F(frame, prog4Start + beansBeforeZoom, zoomDuration);
        this.camera.position.x = easeOut(513.352, 513.35303, zoomProgress4);
        this.camera.position.y = easeOut(1311.201, 1311.2014, zoomProgress4);
        this.camera.zoom = smoothstep(22 * 40 * 30, 22 * 40 * 30 * 30, zoomProgress4);

        const zoomProgress5 = F(frame, prog5Start + beansBeforeZoom, zoomDuration);
        for (let tile of this.tiles.sunglasses) {
          tile.rotation.y = smoothstep(-Math.PI / 2, 0, zoomProgress5 - tile.position.x / 1600 + tile.position.y / 2000);
        }
      }

      if (BEAN >= 1452) {
        const numVisibleShades = (
          BEAN < 1458
            ? lerp(0, this.shades.length, F(frame, 1452, 3))
            : lerp(this.shades.length, 0, F(frame, 1458, 3))
        );
        for (let i = 0; i < this.shades.length; i++) {
          this.shades[i].visible = i < numVisibleShades;
        }
      }

      this.camera.updateProjectionMatrix();
    }
  }

  global.emoji = emoji;
})(this);

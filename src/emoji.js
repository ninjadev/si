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

      this.emojiTextures = {};
      this.emojiIdByKey = {};
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

      for (let j = 0; j < this.mosaicKeyOrder.length; j++) {
        const mosaicKey = this.mosaicKeyOrder[j];
        if (window.emojiMosaics.hasOwnProperty(mosaicKey)) {
          let mosaic = window.emojiMosaics[mosaicKey];
          for (let emojiId in mosaic.emojies) {
            if (mosaic.emojies.hasOwnProperty(emojiId) && !this.emojiTextures.hasOwnProperty(emojiId)) {
              console.log(mosaic.emojies[emojiId]);
              this.emojiTextures[emojiId] = Loader.loadTexture(`res/emoji/${mosaic.emojies[emojiId]}`);
              this.emojiIdByKey[mosaic.emojies[emojiId].replace('.png', '')] = emojiId;
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
          tileMesh.position.z = 1;
          wrapper.add(tileMesh);

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

          /*
          const backPlateMesh = new THREE.Mesh(
            this.emojiGeometry,
            new THREE.MeshBasicMaterial({
              color: 0x333333,
              transparent: true
            })
          );
          backPlateMesh.position.x = positionObj.x + 58;
          backPlateMesh.position.y = positionObj.y + 12;
          backPlateMesh.position.z = 49;
          backPlateMesh.scale.x = 1.5;
          backPlateMesh.scale.y = 1.15;
          outerMosaicMesh.add(backPlateMesh);
          this.backPlates[positionObj.key] = backPlateMesh;
          */
          i++;
        }
      }

      this.scene.add(this.wrappers.hardware);
    }

    update(frame) {
      super.update(frame);
      const beanOffset = 1368;
      const timing = {
        hardware: {start: beanOffset + 12 * 0, end: beanOffset + 12 * 0 + 12},
        dancingSkills: {start: beanOffset + 12 * 1, end: beanOffset + 12 * 1 + 12},
        pixelArt: {start: beanOffset + 12 * 2, end: beanOffset + 12 * 2 + 12},
        campingEquipment: {start: beanOffset + 12 * 3, end: beanOffset + 12 * 3 + 12},
        goodMood: {start: beanOffset + 12 * 4, end: beanOffset + 12 * 4 + 12},
        sunglasses: {start: beanOffset + 12 * 5, end: beanOffset + 12 * 5 + 12},
      };

      this.wrappers['hardware'].visible = BEAN >= 1380;
      this.wrappers['sunglasses'].visible = BEAN >= 1440;

      const beansBeforeZoom = 10;
      const zoomDuration = 6;
      const prog1Start = 1380;
      const prog2Start = prog1Start + 12;
      const prog3Start = prog2Start + 12;
      const prog4Start = prog3Start + 12;
      const prog5Start = prog4Start + 12;

      // zoom progress 1
      if (BEAN >= prog1Start && BEAN < prog1Start + beansBeforeZoom + zoomDuration) {
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

      this.camera.updateProjectionMatrix();
    }
  }

  global.emoji = emoji;
})(this);

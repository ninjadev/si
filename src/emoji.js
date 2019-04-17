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

      this.emojiTextures = [];
      this.emojiMaterials = [];
      this.emojiGeometry = new THREE.PlaneGeometry(32, 32, 1);
      this.wrappers = {};
      this.backPlates = {};
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
          planeColor: '#333333'
        },
        /*
        'dancingSkills': {
          key: 'pixelArt',
          x: 1200,
          y: 1080,
          scale: 16 / 400,
          planeColor: '#333333'
        }
        */
      };

      for (let j = 0; j < this.mosaicKeyOrder.length; j++) {
        const mosaicKey = this.mosaicKeyOrder[j];
        if (window.emojiMosaics.hasOwnProperty(mosaicKey)) {
          let mosaic = window.emojiMosaics[mosaicKey];
          for (let emojiId in mosaic.emojies) {
            if (mosaic.emojies.hasOwnProperty(emojiId) && !this.emojiTextures.hasOwnProperty(emojiId)) {
              console.log(mosaic.emojies[emojiId]);
              this.emojiTextures[emojiId] = Loader.loadTexture(`res/emoji/${mosaic.emojies[emojiId]}`);
              this.emojiMaterials[emojiId] = new THREE.MeshBasicMaterial({
                map: this.emojiTextures[emojiId],
                transparent: true
              })
            }
          }

          const wrapper = new THREE.Object3D();
          this.tiles[mosaicKey] = [];

          for (let i = 0; i < mosaic.tiles.length; i++) {
            const tile = mosaic.tiles[i];
            const material = this.emojiMaterials[tile.emoji_id];
            const tileMesh = new THREE.Mesh(this.emojiGeometry, material);
            tileMesh.position.x = tile.x;
            tileMesh.position.y = 1800 - tile.y;
            tileMesh.position.z = 0.01 * i;
            this.tiles[mosaicKey].push(tileMesh);
            wrapper.add(tileMesh);
          }

          this.wrappers[mosaicKey] = wrapper;
        }
      }

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
          innerMosaicMesh.position.z = 50;

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

      for (let mosaicKey of this.mosaicKeyOrder) {
        if (window.emojiMosaics.hasOwnProperty(mosaicKey)) {
          let wrapper = this.wrappers[mosaicKey];
          //wrapper.visible = BEAN >= timing[mosaicKey].start && BEAN < timing[mosaicKey].end;
          for (let tile of this.tiles[mosaicKey]) {
            //tile.rotation.z = frame / 120;
          }
        }
      }

      // zoom progress 1
      const zoomProgress1 = F(frame, 1368 + 8, 8);
      this.camera.position.x = smoothstep(512, 512, zoomProgress1);
      this.camera.position.y = smoothstep(1200, 1303, zoomProgress1);
      this.camera.zoom = smoothstep(1.0, 22, zoomProgress1);
      this.camera.updateProjectionMatrix();
      this.backPlates['dancingSkills'].material.opacity = 0//smoothstep(0, .9, F(frame, 1368, 9));
      // zoom progress 2
    }
  }

  global.emoji = emoji;
})(this);

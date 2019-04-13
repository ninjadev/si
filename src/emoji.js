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

      this.camera.near = 100;
      this.camera.far = 4000;
      this.camera.updateProjectionMatrix();

      this.emojiTextures = [];
      this.emojiMaterials = [];
      this.emojiGeometry = new THREE.PlaneGeometry(128, 128, 1);
      this.wrappers = {};
      this.tiles = {};
      this.mosaicKeyOrder = [
        'hardware', 'dancingSkills', 'pixelArt', 'campingEquipment', 'goodMood', 'shades'
      ];
      this.recursiveRelativePositions = {
        'hardware': {
          key: 'dancingSkills',
          x: 1200,
          y: 1080,
          scale: 16 / 400
        }
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
        shades: {start: beanOffset + 12 * 5, end: beanOffset + 12 * 5 + 12},
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
      this.camera.position.z = smoothstep(4000, 220, F(frame, 1368, 8));
      this.camera.position.x = smoothstep(1400, 1260, F(frame, 1368, 8));
      this.camera.position.y = smoothstep(400, 1090, F(frame, 1368, 8));
    }
  }

  global.emoji = emoji;
})(this);

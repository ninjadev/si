(function(global) {
  class emoji extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.camera.position.z = 4000;
      this.camera.position.x = 1400;
      this.camera.position.y = 400;

      this.emojiTextures = [];
      this.emojiMaterials = [];
      this.emojiGeometry = new THREE.PlaneGeometry(128, 128, 1);
      this.wrappers = {};
      this.tiles = {};

      for (let mosaicKey in window.emojiMosaics) {
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
          this.scene.add(wrapper);
        }
      }
    }

    update(frame) {
      super.update(frame);
      const beanOffset = 408;
      const timing = {
        goodMood: {start: beanOffset, end: beanOffset + 12},
        shades: {start: beanOffset + 12, end: beanOffset + 12 + 12},
        pixelArt: {start: beanOffset + 12 * 2, end: beanOffset + 12 * 2 + 12},
        dancingSkills: {start: beanOffset + 12 * 3, end: beanOffset + 12 * 3 + 12},
        campingEquipment: {start: beanOffset + 12 * 4, end: beanOffset + 12 * 4 + 12},
        hardware: {start: beanOffset + 12 * 5, end: beanOffset + 12 * 5 + 12},
      };

      for (let mosaicKey in window.emojiMosaics) {
        if (window.emojiMosaics.hasOwnProperty(mosaicKey)) {
          let wrapper = this.wrappers[mosaicKey];
          let isActive = BEAN >= timing[mosaicKey].start && BEAN < timing[mosaicKey].end;
          if (isActive) {
            this.scene.add(wrapper);
          } else {
            this.scene.remove(wrapper);
          }
          for (let tile of this.tiles[mosaicKey]) {
            tile.rotation.z = frame / 120;
          }
        }
      }
    }
  }

  global.emoji = emoji;
})(this);

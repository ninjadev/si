(function(global) {
  class emoji extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.camera.position.z = 2000;
      this.camera.position.x = 700;
      this.camera.position.y = 1200;

      this.emojiTextures = [];
      this.emojiMaterials = [];
      this.emojiGeometry = new THREE.PlaneGeometry(128, 128, 1);
      this.tiles = [];
      for (let emojiId in window.sunglassesMosaic.emojies) {
        if (window.sunglassesMosaic.emojies.hasOwnProperty(emojiId)) {
          this.emojiTextures[emojiId] = Loader.loadTexture(`res/emoji/${window.sunglassesMosaic.emojies[emojiId]}`);

          this.emojiMaterials[emojiId] = new THREE.MeshBasicMaterial({
            map: this.emojiTextures[emojiId],
            transparent: true
          })
        }
      }


      for (let i = 0; i < window.sunglassesMosaic.tiles.length; i++) {
        const tile = window.sunglassesMosaic.tiles[i];
        const material = this.emojiMaterials[tile.emoji_id];
        const tileMesh = new THREE.Mesh(this.emojiGeometry, material);
        tileMesh.position.x = tile.x;
        tileMesh.position.y = 1800 - tile.y;
        tileMesh.position.z = 0.01 * i;
        this.tiles.push(tileMesh);
        this.scene.add(tileMesh);
      }
    }

    update(frame) {
      super.update(frame);

      for (let tile of this.tiles) {
        tile.rotation.z = frame / 60;
      }
    }
  }

  global.emoji = emoji;
})(this);

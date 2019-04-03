(function(global) {
  class emoji extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50),
        new THREE.MeshStandardMaterial());
      this.scene.add(this.cube);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;

      this.emojiTextures = [];
      this.emojiMaterials = [];
      for (let emojiId in window.sunglassesMosaic.emojies) {
        if (window.sunglassesMosaic.emojies.hasOwnProperty(emojiId)) {
          this.emojiTextures[emojiId] = Loader.loadTexture(`res/emoji/${window.sunglassesMosaic.emojies[emojiId]}`);

          // TODO: Maybe use MeshBasicMaterial?
          this.emojiMaterials[emojiId] = new THREE.MeshStandardMaterial({
            map: this.emojiTextures[emojiId],
            metalness: 0.1,
            roughness: 0.9,
          })
        }
      }
    }

    update(frame) {
      super.update(frame);

      this.cube.rotation.x = Math.sin(frame / 50);
      this.cube.rotation.y = Math.cos(frame / 50);
    }
  }

  global.emoji = emoji;
})(this);

(function(global) {
  class bands extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.bands = [];
      this.drapes = [];

      const localRandom = window.Random(100);

      for (let i=0; i < 20; i++) {
        const container = new THREE.Object3D();
        const band = [];
        const rotation = localRandom() * Math.PI;
        const x = -150 + localRandom() * 300;
        let width = 0;
        const n = 5 + (localRandom() * 5) | 0;
        const offsets = [];
        for (let j=0; j < n; j++) {
          const offset = j * 5 + localRandom() * 5 * (j > 0 ? 1 : 0);
          width = offset;
          offsets.push(offset);
        }
        for (const offset of offsets) {
          const path = new Path({debug: false});
          path.lineTo(offset - width / 2, -300);
          path.lineTo(offset - width / 2, 300);
          const line = path.toObject3D();
          band.push(line);
          container.add(line);
          line.path = path;
        }
        this.bands.push(band);

        //const color = new THREE.Color(localRandom(), localRandom, 0.5);
        const drape = new THREE.Mesh(
          new THREE.BoxGeometry(width, 600, 2),
          new THREE.MeshBasicMaterial());
        drape.position.z = -1;

        this.drapes.push(drape);
        container.add(drape);

        container.rotation.z = rotation;
        container.position.z = i * 5;
        container.position.x = x;
        container.position.y = x;
        this.scene.add(container);
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    update(frame) {
      super.update(frame);

      for (let i = 0; i < this.bands.length; i++) {
        for (const line of this.bands[i]) {
          const path = line.path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value =  2 * Math.sin(frame / 100 - i * 0.01) + 0.5 + 0.5 * Math.sin(i);
          path.material.uniforms.wobbliness.value = 1;
        }
        const drape = this.drapes[i];
        drape.position.y = clamp(-50, 0, -600 + 1200 * Math.sin(frame / 100 - i * 0.01) + 300 + 300 * Math.sin(i));
      }
    }
  }

  global.bands = bands;
})(this);

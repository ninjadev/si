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

      this.positions = [
        {rotation: 0, x: -90, y: 0},
        {rotation: -.5, x: -80, y: 0},
        {rotation: 0, x: 0, y: 0},
        {rotation: 0.3, x: 30, y: 30},
        {rotation: Math.PI / 2, x: 20, y: 20},
        {rotation: -0.1, x: 50, y: 50},
        {rotation: 0.2, x: -40, y: 0},
        {rotation: -Math.PI / 2, x: -50, y: -50},
        {rotation: -.65, x: -120, y: 0},
        {rotation: 0.4, x: -90, y: -90},
        {rotation: -0.7, x: -10, y: -100},
        {rotation: 2, x: 150, y: 150},
        {rotation: .4, x: 50, y: 50},
        {rotation: 4, x: 50, y: 50},
        {rotation: -1.7, x: -50, y: -60},
        {rotation: .1, x: -100, y: 0},
        {rotation: -.5, x: -50, y: 100},
      ];

      const localRandom = window.Random(100);

      for (let i=0; i < this.positions.length; i++) {
        const container = new THREE.Object3D();
        const band = [];
        const {rotation, x, y} = this.positions[i];
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
        container.position.z = i * 7;
        container.position.x = x;
        container.position.y = y;
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

      const startFrame = 6582;

      for (let i = 0; i < this.bands.length; i++) {
        for (const line of this.bands[i]) {
          const path = line.path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - i * 5) / 300);
          path.material.uniforms.wobbliness.value = 1;
        }
        const drape = this.drapes[i];
        //drape.position.y = clamp(-50, 0, -600 + 1200 * Math.sin(frame / 100 - i * 0.01) + 300 + 300 * Math.sin(i));
        drape.position.y = lerp(-600, 0, (frame - startFrame - i * 5) / 300);
      }

      this.camera.position.z = easeIn(350, 150, (frame - startFrame) / 600);
      this.camera.position.y = lerp(0, 40, (frame - startFrame) / 600);
      this.camera.rotation.z = easeIn(0, -.2, (frame - startFrame) / 650);
    }
  }

  global.bands = bands;
})(this);

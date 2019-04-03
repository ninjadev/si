(function(global) {
    function Circle(params) {
      const circle = new Path({debug:false});
      for (let i = 0; i <= params.segments; i++) {
        const x = Math.sin((i / params.segments) * 2 * Math.PI) * params.radius * Math.sin(params.rotateX);
        const y = Math.cos((i / params.segments) * 2 * Math.PI) * params.radius * Math.cos(params.rotateY);
        circle.lineTo(x, y);
      }
      return circle
    }

  class moose extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      const tracks = [
        {
          coords: [
            [-10,-70],[-10,-50],[-30,-50],[-10,-20],[-30,-20],[-10,10],[-25,10],
            [0,50],
            [25,10],[10,10],[30,-20],[10,-20],[30,-50],[10,-50],[10,-70]],
          offset: [-80, 0],
        },

        {
          coords: [[25,10],[-25,10],[0,50],[25,10]],
          offset: [0, 10],
        },
        {
          coords: [[10,10],[30,-20],[-30,-20],[-10,10]],
          offset: [0, 10],
        },
        {
          coords: [[10,-20],[30,-50],[-30,-50],[-10,-20]],
          offset: [0, 10],
        },
        {
          coords: [[10,-50],[10,-70],[-10,-70],[-10,-50]],
          offset: [0, 10],
        },

        {
          coords: [
            [-10,-70],[-10,-50],[-30,-50],[-10,-20],[-30,-20],[-10,10],[-25,10],
            [0,50],
            [25,10],[10,10],[30,-20],[10,-20],[30,-50],[10,-50],[10,-70]],
          offset: [80, 0],
        },

      ];

      this.circles = [];

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0xffffff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;

      const commodoreColors = [
        '#e72c2f',
        '#ed6948',
        '#fdce1f',
        '#53b74c',
        '#03a6ee',
      ];

      this.commodoreLines = [];
      for (let [i, color] of commodoreColors.entries()) {
        color = new THREE.Color(color);
        color = new THREE.Vector3(color.r, color.g, color.b);
        let path = new Path({
          directionSize: 5,
          color,
        });
        path.lineTo(-150 - i * 7, 40 + i * -3);
        path.lineTo(180 - i * 7, 40 + i * -3);
        let obj = path.toObject3D();
        obj.path = path;
        this.commodoreLines.push(obj);
        this.scene.add(obj);
      }

      this.commodoreLines2 = [];
      for (let [i, color] of commodoreColors.entries()) {
        color = new THREE.Color(color);
        color = new THREE.Vector3(color.r, color.g, color.b);
        let path = new Path({
          directionSize: 5,
          color,
        });
        path.lineTo(150 + i * 7, -40 + i * -3);
        path.lineTo(-180 + i * 7, -40 + i * -3);
        let obj = path.toObject3D();
        obj.path = path;
        this.commodoreLines2.push(obj);
        this.scene.add(obj);
      }
    }

    update(frame) {
      super.update(frame);

      const startFrame = 0;

      for (let circle of this.circles) {
        this.scene.remove(circle);
      }

      this.circles = [];

      for (let [x, y] of [[-90, 40], [0, 40], [90, 40], [-45, -40], [45, -40]]) {
        const params = {
          segments: 40,
          radius: 40 + lerp(150, 0, (frame - startFrame) / 60) + lerp(20, 0, (frame - startFrame) / 600),
          rotateX: Math.PI / 2 + (frame / 360),
          rotateY: Math.sin((frame + x) / 120) * Math.PI,
        };

        const circle = Circle(params).toObject3D();
        circle.position.set(x - 1, y - 1, 0);
        this.circles.push(circle);
        const circleShadow = Circle(params).toObject3D();
        circleShadow.position.set(x + 1, y + 2, 0);
        this.circles.push(circleShadow);
      }

      for (let circle of this.circles) {
        this.scene.add(circle);
      }

      const startOfStart = 100;
      const startOfEnd = 400;
      const speed = 80;

      for (let commodore of this.commodoreLines) {
        const path = commodore.path;
        path.material.uniforms.drawStart.value = lerp(0, 1, (frame - startOfEnd) / speed);
        path.material.uniforms.drawEnd.value =  lerp(0, 1, (frame - startOfStart) / speed);
        path.material.uniforms.wobbliness.value = Math.sin(frame / 4) / 4 + 0.75;
      }

      for (let commodore of this.commodoreLines2) {
        const path = commodore.path;
        path.material.uniforms.drawStart.value = lerp(0, 1, (frame - startOfEnd) / speed);
        path.material.uniforms.drawEnd.value =  lerp(0, 1, (frame - startOfStart) / speed);
        path.material.uniforms.wobbliness.value = Math.sin(frame / 4) / 4 + 0.75;
      }
    }
  }

  global.moose = moose;
})(this);

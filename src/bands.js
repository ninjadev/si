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
        {rotation: 0.3, x: 70, y: 120},
        {rotation: Math.PI / 2, x: 0, y: 90},
        {rotation: Math.PI, x: -110, y: 0},
        {rotation: 1, x: 0, y: -80},
        {rotation: -1, x: 0, y: -80},
        {rotation: -.3, x: -80, y: 0},
        {rotation: .7, x: 110, y: 0},
        {rotation: -.4, x: 10, y: -50},
        {rotation: .6, x: 130, y: 0},
        {rotation: .6, x: -110, y: 0},
        {rotation: 1.4, x: 0, y: 90},
        {rotation: 1.2, x: 0, y: -40},
        {rotation: 1.9, x: 0, y: -40},
        {rotation: .3, x: -80, y: 0},
        {rotation: .2, x: 80, y: 0},
        {rotation: -.5, x: 120, y: 0},
        {rotation: -1.5, x: 0, y: -80},
        {rotation: -.4, x: -140, y: 0},
        {rotation: .4, x: -150, y: 0},
        {rotation: .4, x: 130, y: 0},
        {rotation: -.6, x: 140, y: 0},

        {rotation: 0.1, x: 120, y: 0},
        {rotation: Math.PI / 2, x: 0, y: 120},
        {rotation: 3, x: -120, y: 0},
        {rotation: -Math.PI / 2, x: 0, y: -20},

        {rotation: .4, x: 130, y: 0},
        {rotation: -.6, x: 140, y: 0},

        {rotation: 0, x: 70, y: 0},
        {rotation: Math.PI / 2, x: 0, y: 90},
        {rotation: Math.PI, x: -70, y: 0},
        {rotation: -Math.PI / 2, x: 0, y: -50},

        {rotation: -.8, x: -100, y: 30},
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
          path.lineTo(offset - width / 2, -200);
          path.lineTo(offset - width / 2, -100);
          path.lineTo(offset - width / 2, 0);
          path.lineTo(offset - width / 2, 100);
          path.lineTo(offset - width / 2, 200);
          path.lineTo(offset - width / 2, 300);
          const line = path.toObject3D();
          band.push(line);
          container.add(line);
          line.path = path;
        }
        this.bands.push(band);

        //const color = new THREE.Color(localRandom(), localRandom, 0.5);
        const drape = new THREE.Mesh(
          new THREE.BoxGeometry(width - 1, 600, 2),
          new THREE.MeshBasicMaterial({
            map: Loader.loadTexture('res/paper.png'),
          }));
        drape.material.map.repeat.set(1, 16);
        drape.material.map.wrapS = THREE.RepeatWrapping;
        drape.material.map.wrapT = THREE.RepeatWrapping;
        drape.position.z = -1;

        this.drapes.push(drape);
        container.add(drape);

        container.rotation.z = rotation;
        container.position.z = i * 7;
        container.position.x = x;
        container.position.y = y;
        this.scene.add(container);
      }

      this.clouds = [
        {
          coords: [40, 30, 465],
          color: [1, .6, .3],
          image: 'cocoon',
        },
        {
          coords: [-50, 20, 420],
          color: [.5, .75, 1],
          image: 'desire',
        },
        {
          coords: [80, 0, 385],
          color: [.5, 1, .5],
          image: 'logicoma',
        },
        {
          coords: [-60, -20, 325],
          color: [0, 1, 1],
          image: 'altair',
        },
        {
          coords: [-35, 25, 300],
          color: [1, 1, .5],
          image: 'poobrain',
        },
        {
          coords: [60, 0, 220],
          color: [.5, 1, .5],
          image: 'pandacube',
        },
        {
          coords: [-50, 55, 180],
          color: [1, 0.5, 1],
          image: 'ephidrena',
        },
        {
          coords: [15, 25, 150],
          color: [.75, 1, .5],
          image: 'poobrain',
        },
        {
          coords: [-50, 20, 120],
          color: [.5, .75, 1],
          image: 'schnappsgirls',
        },
        {
          coords: [0, 40, 100],
          color: [1, .5, .5],
          image: 'schnappsgirls',
          time: 950,
        },
      ];

      const positionRandom = new Random(123);
      for (const cloud of this.clouds) {
        const mesh = new THREE.Object3D();
        cloud.circles = [];
        for (let i=0; i < 10; i++) {
          const circle = new THREE.Mesh(
            new THREE.CircleGeometry(7 + localRandom() * 4, 20),
            new THREE.MeshBasicMaterial({color: new THREE.Color(...cloud.color)})
          );
          const position = new THREE.Vector3(positionRandom() * 30 - 15, positionRandom() * 6 - 3, 0);
          circle.position.copy(position);
          mesh.add(circle);
          cloud.circles.push({
            speed: localRandom() * 3,
            mesh: circle,
            position,
          });
        }
        mesh.position.set(...cloud.coords);
        cloud.mesh = mesh;
        this.scene.add(mesh);

        const image = new THREE.Mesh(
          new THREE.PlaneGeometry(10, 10, 4),
          new THREE.MeshBasicMaterial({map: Loader.loadTexture('res/greets/' + cloud.image + '.png')}));
        image.position.z = 1;
        cloud.image = image;
        mesh.add(image);
      }

      this.camera.position.z = 200;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 100),
        new THREE.MeshBasicMaterial({color: 0x7f7fff}));
      this.scene.add(this.wall);
      this.wall.position.z = -100;
    }

    warmup(renderer) {
      this.update(2603);
      this.render(renderer);
      this.update(2843);
      this.render(renderer);
      this.update(2915);
      this.render(renderer);
      this.update(2939);
      this.render(renderer);
    }

    update(frame) {
      super.update(frame);

      const startFrame = FRAME_FOR_BEAN(24 * 17);
      const endFrame = FRAME_FOR_BEAN(24 * 21);
      const duration = endFrame - startFrame;

      for (let i = 0; i < this.bands.length; i++) {
        for (const line of this.bands[i]) {
          const path = line.path;
          path.material.uniforms.drawStart.value = 0;
          path.material.uniforms.drawEnd.value = lerp(0, 1, (frame - startFrame - this.bands.length * 15 + i * 15 + 100) / 300);
          path.material.uniforms.wobbliness.value = 1;
        }
        const drape = this.drapes[i];
        //drape.position.y = clamp(-50, 0, -600 + 1200 * Math.sin(frame / 100 - i * 0.01) + 300 + 300 * Math.sin(i));
        if (frame < startFrame + this.bands.length * 15 - i * 15 - 100) {
          drape.position.y = -1000;
        } else {
          drape.position.y = lerp(-600, 0, (frame - startFrame - this.bands.length * 15 + i * 15 + 100) / 300);
        }
      }

      for (const [index, cloud] of this.clouds.entries()) {
        const cloudFrame = FRAME_FOR_BEAN(24 * 17 + 6 + index * 12);
        if (frame >= cloudFrame && frame < cloudFrame + 200) {
          for (const circle of cloud.circles) {
            circle.mesh.scale.setScalar(
              elasticOut(
                .01,
                easeIn(1, .01, (frame - cloudFrame - 180) / 20),
                1,
                (frame - cloudFrame) / 20)
            );
            circle.mesh.position.set(
              circle.position.x + Math.sin((frame - cloudFrame) * circle.speed / 60) * 2,
              circle.position.y - Math.sin((frame - cloudFrame) * circle.speed / 60) * 2,
              0
            );
          }
          cloud.image.scale.setScalar(
            elasticOut(
              .01,
              easeIn(1, .01, (frame - cloudFrame - 230) / 20),
              1,
              (frame - cloudFrame) / 20)
          );
          cloud.mesh.position.set(...cloud.coords);
        } else {
          cloud.mesh.position.set(0, 0, 1000);
        }
      }

      this.camera.position.z = easeIn(600, 120, (frame - startFrame) / duration);
      this.camera.position.y = lerp(0, 40, (frame - startFrame) / duration);
      //this.camera.rotation.y = easeIn(0, -.2, (frame - startFrame) / duration);
      this.camera.rotation.z = easeIn(0, -.2, (frame - startFrame) / duration);
    }
  }

  global.bands = bands;
})(this);

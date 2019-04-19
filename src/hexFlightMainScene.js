(function(global) {
  class hexFlightMainScene extends NIN.THREENode {

    spawnPlanes() {
      this.planes = [];
      this.planeCount = 19;
      this.planeDistance = 15;
      const hexFlightMaterial = new THREE.ShaderMaterial(SHADERS.HexFlight).clone();
      const hexSolidMaterial = new THREE.ShaderMaterial(SHADERS.HexSolid).clone();
      this.planeShaders = [
        hexSolidMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexSolidMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexSolidMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexSolidMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexFlightMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
        hexSolidMaterial.clone(),
      ];
      for (var i = 0; i < this.planeCount; i++) {
        var tmp = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 1),
          this.planeShaders[i]);
        tmp.material.transparent = true;
        tmp.position.z = - (10 + i * this.planeDistance);
        tmp.material.uniforms.planeID.value = i;
        this.planes.push(tmp);
        this.scene.add(tmp);
      }
    }

    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });


      this.spawnPlanes();


      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 0;

      this.wall = new THREE.Mesh(
        new THREE.BoxGeometry(1000, 1000, 1000),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          side: THREE.DoubleSide,
        }));
      this.scene.add(this.wall);
    }

    update(frame) {
      super.update(frame);
      var SHORTDIST = 20;
      var LONGDIST = 50;

      this.wall.visible = true;
      if(BEAN >= 744) {
        this.wall.visible = false;
      }

      this.camera.position.z = -(frame - 4035) / 5;
      var dvz = -1/5;
      var camerapandist = 5;
      var camerapanangler = 1.4;
      this.camera.position.y = -camerapandist * (0.5 * Math.sin(frame/50) + 0.5);
      var dvy = -0.01 * camerapandist * Math.cos(frame / 50);

      //this.camera.rotation.x = -this.camera.position.y/ camerapandist / camerapanangler;
      this.camera.rotation.x = -Math.tan(dvy/dvz) / 1.5;

      // Final part should not have camera jiggling
      if (BEAN >= 768) {
        this.camera.rotation.x = 0;
        this.camera.position.y = 0;
      }

      for (var i = 0; i < this.planeCount; i++) {
        this.planes[i].material.uniforms.frame.value = 0.2 * frame + i * 100;
        var distance = this.planes[i].position.distanceTo(this.camera.position) - 3;
        var layer_visibility;
        if (distance < SHORTDIST) {
          layer_visibility = smoothstep(0, 1, (distance / SHORTDIST));
        } else if (distance > LONGDIST) {
          layer_visibility = smoothstep(1, 0, (distance - LONGDIST) / SHORTDIST);
        } else {
          layer_visibility = 1;
        }
        if (i%4 == 0) {
          // Controll for visibility on every 4 layers which should be the solid ones.
          this.planes[i].material.uniforms.visibility.value = layer_visibility * 1;
        } else {
          this.planes[i].material.uniforms.visibility.value = layer_visibility;
        }
        this.planes[i].material.uniforms.r_in.value = 0.8 + 0.24 * Math.sin(frame / 100. + i * Math.PI / 2);
        this.planes[i].material.uniforms.g_in.value = 0.6 + 0.2 * Math.sin(frame / 70. + i);
        this.planes[i].material.uniforms.b_in.value = 0.45 + 0.2 * Math.sin(frame / 20. + i);

        this.planes[i].material.uniforms.seed.value = (frame / 15000);
        this.planes[i].material.uniforms.seed2.value = (frame / 200);

        this.planes[i].position.z = -(((this.camera.position.z + i * this.planeDistance) % (this.planeDistance * this.planeCount)) + 1  * this.planeDistance);
      }
    }
  }

  global.hexFlightMainScene = hexFlightMainScene;
})(this);

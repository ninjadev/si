(function(global) {
  class hexFlightMainScene extends NIN.THREENode {

    spawnPlanes() {
      this.planes = [];
      this.planeCount = 24;
      this.planeDistance = 15;
      this.planeShaders = [ new THREE.ShaderMaterial(SHADERS.HexSolid),
                            new THREE.ShaderMaterial(SHADERS.HexFlight),
                            new THREE.ShaderMaterial(SHADERS.HexFlight2),
                            new THREE.ShaderMaterial(SHADERS.HexFlight3),
                            new THREE.ShaderMaterial(SHADERS.HexSolid2),
                            new THREE.ShaderMaterial(SHADERS.HexFlight4),
                            new THREE.ShaderMaterial(SHADERS.HexFlight5),
                            new THREE.ShaderMaterial(SHADERS.HexFlight6),
                            new THREE.ShaderMaterial(SHADERS.HexSolid3),
                            new THREE.ShaderMaterial(SHADERS.HexFlight7),
                            new THREE.ShaderMaterial(SHADERS.HexFlight8),
                            new THREE.ShaderMaterial(SHADERS.HexFlight9),
                            new THREE.ShaderMaterial(SHADERS.HexSolid4),
                            new THREE.ShaderMaterial(SHADERS.HexFlight10),
                            new THREE.ShaderMaterial(SHADERS.HexFlight11),
                            new THREE.ShaderMaterial(SHADERS.HexFlight12),
                            new THREE.ShaderMaterial(SHADERS.HexSolid5),
                            new THREE.ShaderMaterial(SHADERS.HexSolid6),
                            new THREE.ShaderMaterial(SHADERS.HexSolid7),
                            new THREE.ShaderMaterial(SHADERS.HexSolid8),
                            new THREE.ShaderMaterial(SHADERS.HexSolid9),
                            new THREE.ShaderMaterial(SHADERS.HexSolid10),
                            new THREE.ShaderMaterial(SHADERS.HexSolid11),
                            new THREE.ShaderMaterial(SHADERS.HexSolid12),
                          ];
      for(var i = 0; i < this.planeCount; i++) {
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
    }

    update(frame) {
      super.update(frame);
      var SHORTDIST = 20;
      var LONGDIST = 50;

      this.camera.position.z = -(frame - 6030) / 5;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
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

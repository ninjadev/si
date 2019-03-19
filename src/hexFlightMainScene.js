(function(global) {
  class hexFlightMainScene extends NIN.THREENode {

    spawnPlanes() {
      this.planes = [];
      this.planeCount = 12;
      this.planeShaders = [ new THREE.ShaderMaterial(SHADERS.HexFlight),
                            new THREE.ShaderMaterial(SHADERS.HexFlight2),
                            new THREE.ShaderMaterial(SHADERS.HexFlight3),
                            new THREE.ShaderMaterial(SHADERS.HexFlight4),
                            new THREE.ShaderMaterial(SHADERS.HexFlight5),
                            new THREE.ShaderMaterial(SHADERS.HexFlight6),
                            new THREE.ShaderMaterial(SHADERS.HexFlight7),
                            new THREE.ShaderMaterial(SHADERS.HexFlight8),
                            new THREE.ShaderMaterial(SHADERS.HexFlight9),
                            new THREE.ShaderMaterial(SHADERS.HexFlight10),
                            new THREE.ShaderMaterial(SHADERS.HexFlight11),
                            new THREE.ShaderMaterial(SHADERS.HexFlight12),
                          ];
      for(var i = 0; i < this.planeCount; i++) {
        var tmp = new THREE.Mesh(new THREE.BoxGeometry(60, 60, 1),
                                 this.planeShaders[i]);
        tmp.material.transparent = true;
        tmp.position.z = - (10 + i * 10);
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

      for (var i = 0; i < this.planeCount; i++) {
        this.planes[i].material.uniforms.frame.value = frame + i * 10;
        this.planes[i].material.uniforms.visibility.value = 1;
        this.planes[i].material.uniforms.r_in.value = 0.6 + 0.2 * Math.sin(frame / 100. + i);
        this.planes[i].material.uniforms.g_in.value = 0.6 + 0.2 * Math.sin(frame / 70. + i);
        this.planes[i].material.uniforms.b_in.value = 0.6 + 0.2 * Math.sin(frame / 20. + i);
      }
    }
  }

  global.hexFlightMainScene = hexFlightMainScene;
})(this);

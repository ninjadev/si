(function(global) {
  class lineBackground extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput(),
          depth: new NIN.TextureOutput(),
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 50, 50),
                                 new THREE.MeshStandardMaterial());
      this.scene.add(this.cube);

      var geometry = new THREE.TorusKnotGeometry( 15, 4, 100, 16 );
      var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      this.torusKnot = new THREE.Mesh( geometry, material );
      this.scene.add( this.torusKnot );

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;

      this.camera2 = new THREE.PerspectiveCamera( 45, 16 / 9, 5   , 100 );
      this.camera2.position.z = 100;

      this.targetDepthTexture = new THREE.DepthTexture();
      this.renderTarget = new THREE.WebGLRenderTarget(2000, 2000, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
      });
      this.renderTarget.depthTexture = this.targetDepthTexture;
      this.renderTarget.depthTexture.type = THREE.UnsignedShortType;
    }

    update(frame) {
      super.update(frame);


      

      if (BEAN < 826) {
        var df = frame - FRAME_FOR_BEAN(792);

        var c_progress = df / (FRAME_FOR_BEAN(828) - FRAME_FOR_BEAN(792)) * Math.PI * 2;
        this.cube.rotation.x = Math.sin(c_progress);
        this.cube.rotation.y = Math.cos(c_progress);
        this.cube.position.z = -15-25 * Math.cos(c_progress);
        this.torusKnot.position.z = 1000;
      } else if (BEAN < 848) {
        this.cube.position.z = 1000;


        var df = frame - FRAME_FOR_BEAN(826)
        var t_progress = df / (FRAME_FOR_BEAN(848) - FRAME_FOR_BEAN(826)) * Math.PI * 2;
        this.torusKnot.position.z = 5 -35 * Math.cos(t_progress);
        this.torusKnot.rotation.x = Math.sin(t_progress / 3);
        this.torusKnot.rotation.y = Math.sin(t_progress / 3);
      } else {
        this.cube.position.z = 1000;
        
        var df = frame - FRAME_FOR_BEAN(848)
        var t_progress = df / (FRAME_FOR_BEAN(900) - FRAME_FOR_BEAN(864)) * Math.PI * 2;
        this.torusKnot.position.z = 5 -40 * Math.cos(t_progress);
        this.torusKnot.rotation.x = Math.sin(t_progress / 3) * 3;
        this.torusKnot.rotation.y = Math.sin(t_progress / 3) + 
                                    smoothstep(0, Math.PI / 2, (frame - FRAME_FOR_BEAN(865))/ FRAME_FOR_BEAN(2)) +
                                    smoothstep(0, Math.PI / 2, (frame - FRAME_FOR_BEAN(871))/ FRAME_FOR_BEAN(1.5));
      }
    }

    render(renderer) {
      renderer.render(this.scene, this.camera2, this.renderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
      this.outputs.depth.setValue(this.renderTarget.depthTexture);
    }
  }

  global.lineBackground = lineBackground;
})(this);

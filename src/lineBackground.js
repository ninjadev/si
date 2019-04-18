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

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30),
        new THREE.MeshBasicMaterial({
          color: 0x444400,
        }));
      this.scene.add(this.cube);

      var geometry = new THREE.TorusKnotGeometry( 15, 4, 100, 16 );
      var material = new THREE.MeshBasicMaterial( { color: 0x002211 } );
      this.torusKnot = new THREE.Mesh( geometry, material );
      this.scene.add( this.torusKnot );

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;

      this.number1_raw = new THREE.Object3D();
      this.number2_raw = new THREE.Object3D();
      this.number3_raw = new THREE.Object3D();
      this.number4_raw = new THREE.Object3D();
      var loadObject = function (objPath, material, three_object) {
        var objLoader = new THREE.OBJLoader();
        Loader.loadAjax(objPath, function(text) {
          var object = objLoader.parse(text);
          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = material;
              child.material.side = THREE.DoubleSide;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          three_object.add(object);
        });
      };

      var flat_material_1 = new THREE.MeshBasicMaterial({color: 0xffffff});
      var flat_material_2 = new THREE.MeshBasicMaterial({color: 0xffffff});
      var flat_material_3 = new THREE.MeshBasicMaterial({color: 0xffffff});

      loadObject('res/3dsolskogen/1.obj', flat_material_1, this.number1_raw );
      loadObject('res/3dsolskogen/2.obj', flat_material_2, this.number2_raw );
      loadObject('res/3dsolskogen/3.obj', flat_material_3, this.number3_raw );

      this.number1 = new THREE.Object3D();
      this.number2 = new THREE.Object3D();
      this.number3 = new THREE.Object3D();

      this.number1.add(this.number1_raw);
      this.number2.add(this.number2_raw);
      this.number3.add(this.number3_raw);

      this.scene.add(this.number1);
      this.scene.add(this.number2);
      this.scene.add(this.number3);

      this.number1_raw.position.x = 0;
      this.number2_raw.position.x = 0;
      this.number3_raw.position.x = 0;
      this.number1_raw.position.y = -0.3;
      this.number2_raw.position.y = -0.3;
      this.number3_raw.position.y = -0.3;

      var number_scale = 30;
      this.number1.scale.x = number_scale;
      this.number1.scale.y = number_scale;
      this.number1.scale.z = number_scale;
      this.number2.scale.x = number_scale;
      this.number2.scale.y = number_scale;
      this.number2.scale.z = number_scale;
      this.number3.scale.x = number_scale;
      this.number3.scale.y = number_scale;
      this.number3.scale.z = number_scale;

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

        this.number1.position.z = 1000;
        this.number2.position.z = 1000;
        this.number3.position.z = 1000;



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
      } else  if (BEAN < 879) {
        this.cube.position.z = 1000;

        var df = frame - FRAME_FOR_BEAN(848)
        var t_progress = df / (FRAME_FOR_BEAN(900) - FRAME_FOR_BEAN(864)) * Math.PI * 2;
        this.torusKnot.position.z = 5 -40 * Math.cos(t_progress);
        this.torusKnot.rotation.x = Math.sin(t_progress / 3) * 3;
        this.torusKnot.rotation.y = Math.sin(t_progress / 3) +
                                    smoothstep(0, Math.PI / 2, (frame - FRAME_FOR_BEAN(865))/ FRAME_FOR_BEAN(2)) +
                                    smoothstep(0, Math.PI / 2, (frame - FRAME_FOR_BEAN(871))/ FRAME_FOR_BEAN(1.5));
      } else {
        this.cube.position.z = 1000;
        this.torusKnot.position.z = 1000;
        var t1_progress = (frame - FRAME_FOR_BEAN(879)) / (FRAME_FOR_BEAN(882) - FRAME_FOR_BEAN(879)) * Math.PI * 2;
        var t2_progress = (frame - FRAME_FOR_BEAN(882)) / (FRAME_FOR_BEAN(885) - FRAME_FOR_BEAN(882)) * Math.PI * 2;
        var t3_progress = (frame - FRAME_FOR_BEAN(885)) / (FRAME_FOR_BEAN(888) - FRAME_FOR_BEAN(885)) * Math.PI * 2;

        t1_progress = Math.min(Math.PI*2, Math.max(0, t1_progress));
        t2_progress = Math.min(Math.PI*2, Math.max(0, t2_progress));
        t3_progress = Math.min(Math.PI*2, Math.max(0, t3_progress));

        this.number1.position.z =  5 - 40 * Math.cos(t1_progress);
        this.number2.position.z =  5 - 40 * Math.cos(t2_progress);
        this.number3.position.z =  5 - 40 * Math.cos(t3_progress);

        this.number1.rotation.y = 0.6;
        this.number2.rotation.y = 0.6;
        this.number3.rotation.y = 0.6;
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

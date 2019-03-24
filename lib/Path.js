(function(global) {

  let GLOBAL_PATH_ID = 0;

  function find_angle2(p0, p1, c) {
    const v1 = {
      x: c.x - p0.x,
      y: c.y - p0.y,
    };
    const v2 = {
      x: p1.x - c.x,
      y: p1.y - c.y,
    };
    return Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
  }


  function rotatePointAroundPivot(x, y, pivotX, pivotY, angle) {
		const s = Math.sin(angle);
		const c = Math.cos(angle);
		x -= pivotX;
		y -= pivotY;
		return {
			x: (x * c - y * s) + pivotX,
			y: (x * s + y * c) + pivotY,
		};
	}


  class Path {
    constructor(options) {
      options = options || {};
      this.steps = [];
      this.directionSize = options.directionSize || 3;
      this.debug = options.debug || false;
      this.material = new THREE.ShaderMaterial(SHADERS.pathshader).clone();
      this.uniforms = this.material.uniforms;
      this.id = ++GLOBAL_PATH_ID;
    }

    lineTo(x, y) {
      this.steps.push({x, y});
    }

    toObject3D() {
      const geometry = this.toGeometry();
      const line = new THREE.Mesh(
        geometry,
        this.material);
      line.material.side = THREE.DoubleSide;
      line.material.transparent = true;
      line.material.uniforms.width.value = 3;
      line.material.uniforms.id.value = this.id;
      line.material.uniforms.wobbliness.value = 1;
      line.material.uniforms.drawStart.value = 0;
      line.material.uniforms.drawEnd.value = 1;

      const object3D = new THREE.Object3D();
      object3D.add(line);

      if(this.debug) {
        const debugLine = new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial( {
            color: 0xff00ff,
            wireframe: true,
          }));
        object3D.add(debugLine);
      }

      return object3D;
    }

    toGeometry() {
      const geometry = new THREE.BufferGeometry();

      const positions = [];
      const directions = [];
      const indices = [];
      const normals = [];
      const uvs = [];

      let totalLength = 0;
      for(let i = 1; i < this.steps.length; i++) {
        const previousStep = this.steps[i - 1];
        const step = this.steps[i];
        const x = step.x - previousStep.x;
        const y = step.y - previousStep.y;
        const length = Math.sqrt(x * x + y * y);
        totalLength += length;
      }

      let lengthSoFar = 0;
      for(let i = 0; i < this.steps.length; i++) {
        const step = this.steps[i];
        let nextStep = this.steps[Math.min(i + 1, this.steps.length - 1)];
        let previousStep = this.steps[Math.max(0, i - 1)];
				if(i == 0) {
          const point = rotatePointAroundPivot(nextStep.x, nextStep.y, step.x, step.y, Math.PI);
          previousStep = {
            x: point.x,
            y: point.y,
          };
				}
				if(i == this.steps.length - 1) {
          const point = rotatePointAroundPivot(previousStep.x, previousStep.y, step.x, step.y, Math.PI);
          nextStep = {
            x: point.x,
            y: point.y,
          };
				}

        uvs.push(lengthSoFar / totalLength, 1);
        uvs.push(lengthSoFar / totalLength, 0);

        const length = Math.sqrt(Math.pow(step.x- previousStep.x, 2) + Math.pow(step.y-previousStep.y,2));
        lengthSoFar += length;

        const result = (3 * Math.PI + find_angle2(
					previousStep, nextStep, step)) % (Math.PI * 2);

        const x = previousStep.x - step.x;
        const y = previousStep.y - step.y;
        const angle = result / 2;

        const direction = new THREE.Vector3(
            x * Math.cos(angle) - y * Math.sin(angle),
            x * Math.sin(angle) + y * Math.cos(angle),
            0);

        direction.normalize();
        direction.multiplyScalar(this.directionSize);
        directions.push(direction.x, direction.y, 0);
        directions.push(-direction.x, -direction.y, 0);

        positions.push(step.x + direction.x, step.y + direction.y, 0);
        positions.push(step.x -direction.x, step.y - direction.y, 0);

        if(i > 0) {
          const j = i * 2;
          indices.push(j - 2, j - 1, j);
          indices.push(j - 1, j + 1, j);
        }
        normals.push(0, 0, 1);
        normals.push(0, 0, 1);
      }

      geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
      geometry.addAttribute('direction', new THREE.BufferAttribute(new Float32Array(directions), 3));
      geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      geometry.normalizeNormals();
      return geometry;
    }
  }

  global.Path = Path;
})(this);

(function (global) {
  const sizeAdjuster = 1 / 4;

  const letters = {
    A() {
      const path = new Path();
      const steps = [
        [-9, -10],
        [-2, 8],
        [2, 10],
        [5.1, 0],
        [-4.99, 0],
        [-5, 0],
        [5.1, 0],
        [9, -10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 9;
      path.rightWidth = 10;
      return path;
    },
    B() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [0, 9],
        [2, 4],
        [4, 3],
        [2, 2],
        [0, 0],
        [-10, 0],
        [0, -1],
        [2, -6],
        [4, -7],
        [2, -8],
        [0, -10],
        [-10, -10],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 12;
      path.rightWidth = 4;
      return path;
    },
    F() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 0],
        [0, 0],
        [0.01, 0],
        [-10, 0],
        [-10, 10],
        [2, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 10;
      path.rightWidth = 2;
      return path;
    },
    G() {
      const path = new Path();
      const steps = [
        [7, 7],
        [0, 9],
        [-7, 7],
        [-9, 0],
        [-7, -7],
        [0, -9],
        [7, -7],
        [7, -2],
        [0, -2],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 9;
      path.rightWidth = 10;
      return path;
    },
    M() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-5.1, 9],
        [-5, 9],
        [-0.1, -10],
        [0.1, -10],
        [5, 9],
        [5.1, 9],
        [10, -10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 11;
      path.rightWidth = 11;
      return path;
    },
    N() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [-9, 10],
        [-1, -10],
        [0, -10],
        [0, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 11;
      path.rightWidth = 2;
      return path;
    },
    O() {
      const path = new Path();
      const steps = [
        [0, 9],
        [7, 7],
        [9, 0],
        [7, -7],
        [0, -9],
        [-7, -7],
        [-9, 0],
        [-7, 7],
        [0, 9],
      ];
      for(let i = 0; i <= 16; i++) {
        const step = steps[i];
        const x = 8.7 * Math.sin(i / 16 * Math.PI * 2);
        const y = 9 * Math.cos(i / 16 * Math.PI * 2);
        path.lineTo(x * sizeAdjuster, y * sizeAdjuster);
      }
      path.leftWidth = 9;
      path.rightWidth = 10;
      return path;
    },
    J() {
      const path = new Path();
      const steps = [
        [-5, 8],
        [7, 8],
        [7, 0],
        [6, -2],
        [5, -7],
        [2, -8],
        [0, -9],
        [-2, -8],
        [-4, -7],
        [-6, -1],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 7;
      path.rightWidth = 8;
      return path;
    },
    P() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [0, 9],
        [2, 4],
        [4, 3],
        [2, 2],
        [0, 0],
        [-10, 0],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 10;
      path.rightWidth = 8;
      return path;
    },
    C() {
      const path = new Path();
      const steps = [
        [7, 7],
        [0, 9],
        [-7, 7],
        [-9, 0],
        [-7, -7],
        [0, -9],
        [7, -7],
      ];
      for(let i = 0; i <= 16; i++) {
        const step = steps[i];
        const rotate = 2.3;
        const x = 8.0 * Math.sin(rotate + i / 21 * Math.PI * 2);
        const y = 8.9 * Math.cos(rotate + i / 21 * Math.PI * 2);
        path.lineTo(x * sizeAdjuster, y * sizeAdjuster);
      }
      path.leftWidth = 9;
      path.rightWidth = 9;
      return path;
    },
    D() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [-6, 9.5],
        [-3, 9],
        [0, 8],
        [2, 6],
        [4, 0],
        [2, -6],
        [0, -7],
        [-3, -9],
        [-4, -9],
        [-6, -9.5],
        [-10, -10],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 11;
      path.rightWidth = 5;
      return path;
    },
    R() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [0, 9],
        [2, 4],
        [4, 3],
        [2, 2],
        [0, 0],
        [-10, 0],
        [-9.99, 0],
        [5, -10],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 10;
      path.rightWidth = 6;
      return path;
    },
    K() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [-9.9, 10],
        [-10, 0],
        [-0.1, 10],
        [0, 10],
        [-10, 0],
        [0, -10],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 10;
      path.rightWidth = 1;
      return path;
    },
    L() {
      const path = new Path();
      const steps = [
        [4, -10],
        [-10, -10],
        [-10, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 11;
      path.rightWidth = 5;
      return path;
    },
    T() {
      const path = new Path();
      const steps = [
        [-8, 10],
        [0, 10],
        [-0.01, -10],
        [0.01, -10],
        [0, 10],
        [8, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 8;
      path.rightWidth = 8;
      return path;
    },
    E() {
      const path = new Path();
      const steps = [
        [2, -10],
        [-10, -10],
        [-10, 0],
        [0, 0],
        [0.01, 0],
        [-10, 0],
        [-10, 10],
        [2, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 11;
      path.rightWidth = 3;
      return path;
    },
    Y() {
      const path = new Path();
      const steps = [
        [-6, 9],
        [-1, 0],
        [6, 9],
        [6.1, 9],
        [-6, -9],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 7;
      path.rightWidth = 7;
      return path;
    },
    I() {
      const path = new Path();
      const steps = [
        [0, 10],
        [0, -10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 2;
      path.rightWidth = 3;
      return path;
    },
    H() {
      const path = new Path();
      const steps = [
        [-6, 11],
        [-6, -9],
        [-6, -8],
        [-6, 0],
        [6, 0],
        [6, 8],
        [6, 9],
        [6, -11],

      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 7;
      path.rightWidth = 7;
      return path;
    },
    S() {
      const path = new Path();
      const steps = [
        [-6, -6],
        [-3, -9],
        [1, -8],
        [2, -7],
        [3, -5],
        [2, -2],
        [-2, 1],
        [-3, 3],
        [-3, 6],
        [0, 9],
        [3, 8],
        [6, 6],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 6;
      path.rightWidth = 7;
      return path;
    },
    U() {
      const path = new Path();
      const steps = [
        [7, 9],
        [7, 0],
        [6, -2],
        [5, -7],
        [2, -8],
        [0, -9],
        [-2, -8],
        [-4, -7],
        [-6, -1],
        [-7, 0],
        [-7, 9],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 8;
      path.rightWidth = 8;
      return path;
    },
    V() {
      const path = new Path();
      const steps = [
        [-6, 10],
        [-0.1, -10],
        [0, -10],
        [6, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 6;
      path.rightWidth = 6;
      return path;
    },
    W() {
      const path = new Path();
      const steps = [
        [-10, 9],
        [-5.1, -10],
        [-5, -10],
        [-0.1, 9],
        [0.1, 9],
        [5, -10],
        [5.1, -10],
        [10, 9],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      path.leftWidth = 11;
      path.rightWidth = 11;
      return path;
    },
  };

  function XWrite(word, padding = 1) {
    let totalWidth = 0;
    for (let char of word) {
      if (!(char in letters)) {
        totalWidth += 15;
        continue;
      }
      let lettro = letters[char]();
      totalWidth += lettro.leftWidth + lettro.rightWidth + padding;
    }

    const innerPaths  = [];
    const wrapper = new THREE.Object3D();
    let offset = 0;
    for (let char of word) {
      if (!(char in letters)) {
        offset += 15;
        continue;
      }
      let lettro = letters[char]();
      innerPaths.push(lettro);
      offset += lettro.leftWidth + padding;

      const lettro3D = lettro.toObject3D();
      lettro3D.position.x = offset - totalWidth / 2;
      const scale = 1 / sizeAdjuster;
      lettro3D.scale.set(scale, scale, scale);
      wrapper.add(lettro3D);

      offset += lettro.rightWidth;
    }
    wrapper.paths = innerPaths;
    wrapper.totalWidth = totalWidth;
    return wrapper;
  }

  global.XWrite = XWrite;
})(this);

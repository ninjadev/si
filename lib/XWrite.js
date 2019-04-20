(function (global) {
  const sizeAdjuster = 1 / 4;

  const letters = {
    A() {
      const path = new Path();
      const steps = [
        [-8, -10],
        [-2, 8],
        [1, 9.5],
        [2, 9.3],
        [3, 9],
        [7, -10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      const path2 = new Path();
      path2.lineTo(-5 * sizeAdjuster, -0.2);
      path2.lineTo(5 * sizeAdjuster, 0);
      return {
        paths: [path, path2],
        leftWidth: 9,
        rightWidth: 7,
      };
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
      return {
        leftWidth: 12,
        rightWidth: 4,
        paths: [path],
      };
    },
    F() {
      const path1 = new Path();
      path1.lineTo(-5 * sizeAdjuster, 9 * sizeAdjuster);
      path1.lineTo(-5 * sizeAdjuster, -9 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(-5 * sizeAdjuster, 0 * sizeAdjuster);
      path2.lineTo(3 * sizeAdjuster, 0 * sizeAdjuster);
      const path3 = new Path();
      path3.lineTo(-5 * sizeAdjuster, 9 * sizeAdjuster);
      path3.lineTo(5 * sizeAdjuster, 9 * sizeAdjuster);
      return {
        leftWidth: 5,
        rightWidth: 7,
        paths: [path1, path2, path3],
      };
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
      return {
        leftWidth: 9,
        rightWidth: 10,
        paths: [path],
      };
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
      return {
        leftWidth: 11,
        rightWidth: 11,
        paths: [path],
      };
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
      return {
        leftWidth: 12,
        rightWidth: 2,
        paths: [path],
      };
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
      return {
        leftWidth: 9,
        rightWidth: 10,
        paths: [path],
      };
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
      return {
        leftWidth: 7,
        rightWidth: 8,
        paths: [path],
      };
    },
    P() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 10],
        [-8, 9.9],
        [-4, 9.5],
        [0, 9],
        [2, 7],
        [3, 5],
        [4, 3],
        [2, 1],
        [0, 0],
        [-10, 0],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      return {
        leftWidth: 11,
        rightWidth: 5,
        paths: [path],
      };
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
      return {
        leftWidth: 9,
        rightWidth: 9,
        paths: [path],
      };
    },
    D() {
      const path = new Path();
      const steps = [
        [-10, -9.5],
        [-10, 9.5],
        [-6, 8.5],
        [-3, 8],
        [0, 7],
        [2, 5],
        [3, 0],
        [2, -5],
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
      return {
        leftWidth: 12,
        rightWidth: 5,
        paths: [path],
      };
    },
    Q() {
      const path1 = new Path();
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
        path1.lineTo(x * sizeAdjuster, y * sizeAdjuster);
      }
      const path2 = new Path();
      path2.lineTo(2 * sizeAdjuster, -2 * sizeAdjuster);
      path2.lineTo(10 * sizeAdjuster, -10 * sizeAdjuster);
      return {
        leftWidth: 9,
        rightWidth: 11,
        paths: [path1, path2],
      };
    },
    R() {
      const path = new Path();
      const steps = [
        [-10, -10],
        [-10, 9.1],
        [-8, 9],
        [-4, 8.5],
        [-1, 8],
        [1, 6],
        [2, 5],
        [3, 3],
        [1.5, 1],
        [0, 0],
        [-10, 0],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      const path2 = new Path();
      path2.lineTo(-2 * sizeAdjuster, 0);
      path2.lineTo(4 * sizeAdjuster, -10 * sizeAdjuster);
      return {
        leftWidth: 10,
        rightWidth: 5,
        paths: [path, path2],
      };
    },
    K() {
      const path1 = new Path();
      path1.lineTo(-8 * sizeAdjuster, 9.5 * sizeAdjuster);
      path1.lineTo(-8 * sizeAdjuster, -9.5 * sizeAdjuster);

      const path2 = new Path();
      path2.lineTo(4 * sizeAdjuster, 9.5 * sizeAdjuster);
      path2.lineTo(-8 * sizeAdjuster, 3 * sizeAdjuster);
      path2.lineTo(5 * sizeAdjuster, -9.5 * sizeAdjuster);
      return {
        leftWidth: 10,
        rightWidth: 6,
        paths: [path1, path2],
      };
    },
    L() {
      const path = new Path();
      const steps = [
        [5, -9],
        [-7, -9],
        [-7, 10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      return {
        leftWidth: 8,
        rightWidth: 6,
        paths: [path],
      };
    },
    T() {
      const path1 = new Path();
      path1.lineTo(-8 * sizeAdjuster, 9.5 * sizeAdjuster);
      path1.lineTo(9 * sizeAdjuster, 9.5 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(0 * sizeAdjuster, -10 * sizeAdjuster);
      path2.lineTo(0 * sizeAdjuster, 9.5 * sizeAdjuster);
      return {
        leftWidth: 8,
        rightWidth: 9,
        paths: [path1, path2],
      };
    },
    E() {
      const path1 = new Path();
      path1.lineTo(-5 * sizeAdjuster, 9 * sizeAdjuster);
      path1.lineTo(-5 * sizeAdjuster, -9 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(-5 * sizeAdjuster, 0 * sizeAdjuster);
      path2.lineTo(3 * sizeAdjuster, 0 * sizeAdjuster);
      const path3 = new Path();
      path3.lineTo(-5 * sizeAdjuster, 9 * sizeAdjuster);
      path3.lineTo(5 * sizeAdjuster, 9 * sizeAdjuster);
      const path4 = new Path();
      path4.lineTo(-5 * sizeAdjuster, -9 * sizeAdjuster);
      path4.lineTo(5 * sizeAdjuster, -9 * sizeAdjuster);
      return {
        leftWidth: 6,
        rightWidth: 6,
        paths: [path1, path2, path3, path4],
      };
    },
    X() {
      const path1 = new Path();
      path1.lineTo(-5 * sizeAdjuster, 10 * sizeAdjuster);
      path1.lineTo(5 * sizeAdjuster, -9 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(5 * sizeAdjuster, 11 * sizeAdjuster);
      path2.lineTo(-5 * sizeAdjuster, -9 * sizeAdjuster);
      return {
        leftWidth: 7,
        rightWidth: 7,
        paths: [path1, path2],
      };
    },
    Y() {
      const path1 = new Path();
      path1.lineTo(-5 * sizeAdjuster, 10 * sizeAdjuster);
      path1.lineTo(-0 * sizeAdjuster, 0 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(5 * sizeAdjuster, 11 * sizeAdjuster);
      path2.lineTo(-4 * sizeAdjuster, -9 * sizeAdjuster);
      return {
        leftWidth: 7,
        rightWidth: 7,
        paths: [path1, path2],
      };
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
      return {
        leftWidth: 1,
        rightWidth: 3,
        paths: [path],
      };
    },
    H() {
      const path1 = new Path();
      path1.lineTo(-5 * sizeAdjuster, -9 * sizeAdjuster);
      path1.lineTo(-5 * sizeAdjuster, 9 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(-5 * sizeAdjuster, 0 * sizeAdjuster);
      path2.lineTo(5 * sizeAdjuster, 0 * sizeAdjuster);
      const path3 = new Path();
      path3.lineTo(5 * sizeAdjuster, -9 * sizeAdjuster);
      path3.lineTo(5 * sizeAdjuster, 9 * sizeAdjuster);
      return {
        leftWidth: 7,
        rightWidth: 7,
        paths: [path1, path2, path3],
      };
    },
    S() {
      const path = new Path();
      const steps = [
        [-6, -6],
        [-3, -9],
        [1, -8],
        [2, -7],
        [3, -4],
        [2, -1],
        [-2, 2],
        [-3, 4],
        [-3, 6],
        [0, 9],
        [3, 8],
        [6, 6],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster * 1.15, step[1] * sizeAdjuster * 1.15);
      }
      return {
        leftWidth: 6,
        rightWidth: 7,
        paths: [path],
      };
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
      return {
        leftWidth: 8,
        rightWidth: 8,
        paths: [path],
      };
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
      return {
        leftWidth: 6,
        rightWidth: 6,
        paths: [path],
      };
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
      return {
        leftWidth: 11,
        rightWidth: 11,
        paths: [path],
      };
    },
    '0': function() {
      const path = new Path();
      for(let i = 0; i <= 16; i++) {
        const x = 7 * Math.sin(i / 16 * Math.PI * 2);
        const y = 10 * Math.cos(i / 16 * Math.PI * 2);
        path.lineTo(x * sizeAdjuster, y * sizeAdjuster);
      }
      return {
        leftWidth: 7,
        rightWidth: 10,
        paths: [path],
      };
    },
    '1': function() {
      const path = new Path();
      const steps = [
        [-4, 8],
        [-.2, 10],
        [0, 10],
        [0, -10],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      return {
        leftWidth: 3,
        rightWidth: 3,
        paths: [path],
      };
    },
    '2': function() {
      const path = new Path();
      const steps = [
        [5, -7],
        [-6, -7],
        [-6, -6.9],
        [2, 2],
        [3, 4],
        [3, 6],
        [0, 9],
        [-3, 8],
        [-6, 6],
      ];
      for(let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster * 1.15, step[1] * sizeAdjuster * 1.15);
      }
      return {
        leftWidth: 7,
        rightWidth: 5,
        paths: [path],
      };
    },
    '4': function() {
      const path1 = new Path();
      path1.lineTo(5 * sizeAdjuster, -9 * sizeAdjuster);
      path1.lineTo(5 * sizeAdjuster, 9 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(-5 * sizeAdjuster, -2 * sizeAdjuster);
      path2.lineTo(5 * sizeAdjuster, -2 * sizeAdjuster);
      const path3 = new Path();
      path3.lineTo(-5 * sizeAdjuster, -2 * sizeAdjuster);
      path3.lineTo(-4 * sizeAdjuster, 2 * sizeAdjuster);
      path3.lineTo(5 * sizeAdjuster, 9 * sizeAdjuster);
      return {
        leftWidth: 7,
        rightWidth: 7,
        paths: [path1, path2, path3],
      };
    },
    '9': function() {
      const path = new Path();
      const steps = [
        [10, -10],
        [10, 10],
        [8, 9.9],
        [4, 9.5],
        [2, 9],
        [0, 7],
        [-1, 5],
        [-2, 3],
        [0, 1],
        [0, 0],
        [10, 0],
      ];
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        path.lineTo(step[0] * sizeAdjuster, step[1] * sizeAdjuster);
      }
      return {
        leftWidth: 3,
        rightWidth: 11,
        paths: [path],
      };
    },
    ',': function() {
      const path = new Path();
      path.lineTo(2 * sizeAdjuster, -8 * sizeAdjuster);
      path.lineTo(-1 * sizeAdjuster, -13 * sizeAdjuster);
      return {
        leftWidth: 1,
        rightWidth: 3,
        paths: [path,],
      };
    },
    o() {
      const path = new Path();
      for(let i = 0; i <= 16; i++) {
        const x = 6.5 * Math.sin(i / 16 * Math.PI * 2);
        const y = -4 + 7 * Math.cos(i / 16 * Math.PI * 2);
        path.lineTo(x * sizeAdjuster, y * sizeAdjuster);
      }
      return {
        leftWidth: 7,
        rightWidth: 8,
        paths: [path],
      };
    },
    t() {
      const path1 = new Path();
      path1.lineTo(-5 * sizeAdjuster, 2 * sizeAdjuster);
      path1.lineTo(5 * sizeAdjuster, 2 * sizeAdjuster);
      const path2 = new Path();
      path2.lineTo(0, 7 * sizeAdjuster);
      path2.lineTo(0, -8 * sizeAdjuster);
      path2.lineTo(1.5 * sizeAdjuster, -8 * sizeAdjuster);
      path2.lineTo(3.5 * sizeAdjuster, -9 * sizeAdjuster);
      path2.lineTo(5.5 * sizeAdjuster, -10 * sizeAdjuster);
      path2.lineTo(6.5 * sizeAdjuster, -10 * sizeAdjuster);
      return {
        leftWidth: 4,
        rightWidth: 7,
        paths: [path1, path2],
      };
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
      offset += lettro.leftWidth + padding;

      for(let path of lettro.paths) {
        innerPaths.push(path);
        const lettro3D = path.toObject3D();
        lettro3D.position.x = offset - totalWidth / 2;
        const scale = 1 / sizeAdjuster;
        lettro3D.scale.set(scale, scale, scale);
        wrapper.add(lettro3D);
      }

      offset += lettro.rightWidth;
    }
    wrapper.paths = innerPaths;
    wrapper.totalWidth = totalWidth;
    return wrapper;
  }

  global.XWrite = XWrite;
})(this);

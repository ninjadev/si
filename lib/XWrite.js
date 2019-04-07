(function (global) {
  const directionSize = 4;

  const letters = {
    A() {
      const A = new Path({ directionSize });
      A.lineTo(-9, -10);
      A.lineTo(0, 10);
      A.lineTo(0, 10.1);
      A.lineTo(5.1, 0);
      A.lineTo(-4.99, 0);
      A.lineTo(-5, 0);
      A.lineTo(5.1, 0);
      A.lineTo(9, -10);
      A.leftWidth = 10;
      A.rightWidth = 10;
      return A;
    },
    M() {
      const M = new Path({ directionSize });
      M.lineTo(-10, -10);
      M.lineTo(-5.1, 10);
      M.lineTo(-5, 10);
      M.lineTo(-0.1, -10);
      M.lineTo(0.1, -10);
      M.lineTo(5, 10);
      M.lineTo(5.1, 10);
      M.lineTo(10, -10);
      M.leftWidth = 11;
      M.rightWidth = 11;
      return M;
    },
    O() {
      const O = new Path({ directionSize });
      O.lineTo(0, 9);
      O.lineTo(7, 7);
      O.lineTo(9, 0);
      O.lineTo(7, -7);
      O.lineTo(0, -9);
      O.lineTo(-7, -7);
      O.lineTo(-9, 0);
      O.lineTo(-7, 7);
      O.lineTo(0, 9);
      O.leftWidth = 9;
      O.rightWidth = 9;
      return O;
    },
    C() {
      const C = new Path({ directionSize });
      C.lineTo(7, 7);
      C.lineTo(0, 9);
      C.lineTo(-7, 7);
      C.lineTo(-9, 0);
      C.lineTo(-7, -7);
      C.lineTo(0, -9);
      C.lineTo(7, -7);
      C.leftWidth = 9;
      C.rightWidth = 9;
      return C;
    },
    D() {
      const D = new Path({ directionSize });
      D.lineTo(-10, -10);
      D.lineTo(-10, 10);
      D.lineTo(0, 7);
      D.lineTo(3, 6);
      D.lineTo(6, 0);
      D.lineTo(3, -6);
      D.lineTo(0, -7);
      D.lineTo(-10, -10);
      D.leftWidth = 11;
      D.rightWidth = 7;
      return D;
    },
    R() {
      const R = new Path({ directionSize });
      R.lineTo(-10, -10);
      R.lineTo(-10, 10);
      R.lineTo(0, 9);
      R.lineTo(2, 4);
      R.lineTo(4, 3);
      R.lineTo(2, 2);
      R.lineTo(0, 0);
      R.lineTo(-10, 0);
      R.lineTo(-9.99, 0);
      R.lineTo(8, -10);
      R.leftWidth = 10;
      R.rightWidth = 8;
      return R;
    },
    E() {
      const E = new Path({ directionSize });
      E.lineTo(5, -10);
      E.lineTo(-10, -10);
      E.lineTo(-10, 0);
      E.lineTo(4, 0);
      E.lineTo(4.01, 0);
      E.lineTo(-10, 0);
      E.lineTo(-10, 10);
      E.lineTo(5, 10);

      E.leftWidth = 10;
      E.rightWidth = 5;
      return E;
    }
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
      wrapper.add(lettro3D);

      offset += lettro.rightWidth;
    }
    wrapper.paths = innerPaths;
    wrapper.totalWidth = totalWidth;
    return wrapper;
  }

  global.XWrite = XWrite;
})(this);
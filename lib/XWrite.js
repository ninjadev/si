(function (global) {
  const directionSize = 3;

  const A = function () {
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
  };

  const M = function () {
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
  };

  const O = function () {
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
  };

  const letters = {
    A, M, O
  };

  function XWrite(word, padding = 1) {
    let totalWidth = 0;
    for (let char of word) {
      if (char == ' ') {
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
      if (char == ' ') {
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
    return wrapper;
  }

  global.XWrite = XWrite;
})(this);
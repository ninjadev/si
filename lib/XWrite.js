(function (global) {
  const directionSize = 3;

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

  const letters = {
    A, M, O
  };

  function XWrite(word, padding = 1) {
    let totalWidth = 0;
    for (let char of word) {
      let lettro = letters[char];
      totalWidth += lettro.leftWidth + lettro.rightWidth + 1;
    }

    const wrapper = new THREE.Object3D();
    let offset = 0;
    for (let i = 0; i < word.length; i++) {
      let lettro = letters[word[i]];
      offset += lettro.leftWidth;

      const lettro3D = lettro.toObject3D();
      lettro3D.position.x = offset - totalWidth / 2;
      wrapper.add(lettro3D);

      offset += lettro.rightWidth;
    }
    return wrapper;
  }

  global.XWrite = XWrite;
})(this);
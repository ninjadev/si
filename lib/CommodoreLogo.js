(function (global) {
  function CommodoreLogo(A, fillColor=undefined) {
    const B = 0.034 * A;
    const C = 0.166 * A;
    const D = 0.30 * A;
    const E = 0.364 * A;
    const F = 0.52 * A;
    const G = 0.53 * A;  // Diameter of the inner circle
    const H = 0.636 * A; // X offset to circle clipping start
    const I = 0.97 * A;  // Diameter of the outer circle

    const directionSize = 2;

    const props = {directionSize, fill: true};
    if (fillColor) {
      props.fillColor = fillColor;
    } else {
      props.fillMap = Loader.loadTexture('res/paper.png');
    }

    const cee = new Path(props);

    // First we draw the outer circle counterclockwise from the top right.
    const outerSegments = 30;
    const outerCircleRadius = I / 2;
    const offsetToVerticalClipFromCircleCentre = H - I / 2;
    const outerCircleRadianOffsetFromStart = Math.acos(offsetToVerticalClipFromCircleCentre / outerCircleRadius);
    const outerCircleRadianEnd = 2 * Math.PI - outerCircleRadianOffsetFromStart;
    for (let i = 0; i <= outerSegments; i++) {
      const radianOffset = outerCircleRadianOffsetFromStart + i * (outerCircleRadianEnd - outerCircleRadianOffsetFromStart) / outerSegments;
      const x = Math.cos(radianOffset) * outerCircleRadius;
      const y = Math.sin(radianOffset) * outerCircleRadius;
      cee.lineTo(x, y);
    }

    // Now we draw the inner circle clockwise from the bottom right
    const innerSegments = 20;
    const innerCircleRadius = G / 2;
    const innerCircleRadianOffsetFromStart = Math.acos(offsetToVerticalClipFromCircleCentre / innerCircleRadius);
    const innerCircleRadianEnd = 2 * Math.PI - innerCircleRadianOffsetFromStart;
    for (let i = innerSegments; i >= 0; i--) {
      const radianOffset = innerCircleRadianOffsetFromStart + i * (innerCircleRadianEnd - innerCircleRadianOffsetFromStart) / innerSegments;
      const x = Math.cos(radianOffset) * innerCircleRadius;
      const y = Math.sin(radianOffset) * innerCircleRadius;
      cee.lineTo(x, y);
    }

    // Complete the C
    cee.lineTo(
      Math.cos(outerCircleRadianOffsetFromStart) * outerCircleRadius,
      Math.sin(outerCircleRadianOffsetFromStart) * outerCircleRadius
    );

    const upperBeak = new Path(props);
    upperBeak.lineTo(0, C / 2);
    upperBeak.lineTo(E, C / 2);
    upperBeak.lineTo(E - C, - C / 2);
    upperBeak.lineTo(0, - C / 2);
    upperBeak.lineTo(0, C / 2);

    const lowerBeak = new Path(props);
    lowerBeak.lineTo(0, -C / 2);
    lowerBeak.lineTo(E, -C / 2);
    lowerBeak.lineTo(E - C, C / 2);
    lowerBeak.lineTo(0, C / 2);
    lowerBeak.lineTo(0, -C / 2);

    const wrapper = new THREE.Object3D();
    const cceo3d = cee.toObject3D();
    wrapper.add(cceo3d);
    const ufo3d = upperBeak.toObject3D();
    ufo3d.position.set(offsetToVerticalClipFromCircleCentre, B / 2 + C / 2, 0);
    wrapper.add(ufo3d);
    const lfo3d = lowerBeak.toObject3D();
    lfo3d.position.set(offsetToVerticalClipFromCircleCentre, -B / 2 - C / 2, 0);
    wrapper.add(lfo3d);

    const outerWrapper = new THREE.Object3D();
    outerWrapper.add(wrapper);
    outerWrapper.upperBeak = ufo3d;
    outerWrapper.lowerBeak = lfo3d;
    return outerWrapper;
  };

  global.CommodoreLogo = CommodoreLogo;
})(this);
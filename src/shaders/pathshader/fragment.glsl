uniform float frame;
uniform float drawStart;
uniform float drawEnd;
uniform float id;
uniform float wobbliness;
uniform float totalLength;

varying vec2 vUv;

#define PI 3.141592653589793

float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

float linearStep(float x, float edgeSize) {
    return 1. - clamp((abs(x) - 1. + edgeSize) / edgeSize, 0., 1.);
}

float linecap(float x, float y, float xPivot, float edgeSize) {
    float cX = (x - xPivot) * 1. * totalLength;
    float cY = y / (1. + edgeSize);
    float cLen = pow(cX * cX + cY * cY, .5);
    float circle = linearStep(cLen, 0.1);
    return circle;
}

void main() {

    vec2 uv = vUv;

    uv.y = uv.y * 4. - 2.;

    float humanizeX = uv.x * totalLength / 100.;

    float scale = .5;

    float thicknessWobble = 0.3 * sin(humanizeX * 94. + id * 4.) + 0.2 * cos(humanizeX * 43. + 23. + id * 5.) + 0.25 * sin(humanizeX * 74. + 32. + id * 6.);
    thicknessWobble *= wobbliness * 0.25;

    scale = scale * (1. + thicknessWobble);

    float offset = 0.3 * sin(humanizeX * 99. + id) + 0.2 * cos(humanizeX * 87. + 23. + id * 2.) + 0.25 * sin(humanizeX * 54. + 32. + id * 3.);

    offset *= wobbliness;

    uv.y /= scale;
    uv.y += offset * 1.;

    float amount = 1.;
    float edgeSize = .2;
    float edge = linearStep(abs(uv.y), edgeSize);
    amount *= edge;

    amount *= step(drawStart, uv.x);
    amount *= (1. - step(drawEnd, uv.x));

    float startCircle = linecap(uv.x, uv.y, drawStart, edgeSize);
    float endCircle = linecap(uv.x, uv.y, drawEnd, edgeSize);

    amount = amount +
        (1. - step(drawStart, uv.x)) * startCircle * edge +
        step(drawEnd, uv.x) * endCircle * edge;
    float color = rand(uv) * 0.1;
    vec3 foreground = vec3(color);
    vec3 background = vec3(color);
    gl_FragColor = vec4(mix(background, foreground, vec3(amount)), amount);
}

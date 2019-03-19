uniform float frame;
uniform sampler2D tDiffuse;
uniform float drawStart;
uniform float drawEnd;
uniform float id;
uniform float wobbliness;

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {

    vec2 uv = vUv;

    uv.y = uv.y * 4. - 2.;

    float scale = .5;

    float thicknessWobble = 0.3 * sin(uv.x * 94. + id * 4.) + 0.2 * cos(uv.x * 43. + 23. + id * 5.) + 0.25 * sin(uv.x * 74. + 32. + id * 6.);
    thicknessWobble *= wobbliness * 0.25;

    scale = scale * (1. + thicknessWobble);

    float offset = 0.3 * sin(uv.x * 99. + id) + 0.2 * cos(uv.x * 87. + 23. + id * 2.) + 0.25 * sin(uv.x * 54. + 32. + id * 3.);

    offset *= wobbliness;

    uv.y /= scale;
    uv.y += offset * 1.;

    float amount = 1.;
    float edgeSize = .2;
    float edge = 1. - clamp((abs(uv.y) - 1. + edgeSize) / edgeSize, 0., 1.);
    amount *= edge;

    amount *= step(drawStart, uv.x);
    amount *= 1. - step(drawEnd, uv.x);
    float color = rand(uv) * 0.1;
    vec3 foreground = vec3(color);
    vec3 background = vec3(color);
    gl_FragColor = vec4(mix(background, foreground, vec3(amount)), amount);
}

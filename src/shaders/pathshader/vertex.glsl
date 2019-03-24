attribute vec3 direction;

varying vec2 vUv;


void main() {
    vUv = uv;
    vec3 p = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}

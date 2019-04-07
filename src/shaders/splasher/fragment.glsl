uniform float frame;
uniform float overlayer;
uniform sampler2D tDiffuse;
uniform sampler2D image;

varying vec2 vUv;

void main() {
    vec3 sceneColor = texture2D(tDiffuse, vUv).rgb;
    float avg = (sceneColor.r + sceneColor.g + sceneColor.b) / 3.;
    sceneColor = mix(sceneColor, vec3(avg), overlayer);

    vec2 uv = vUv - 0.5;
    uv *= 2.;
    uv += 0.5;
    uv.x += .5;

    vec4 imageColor = texture2D(image, uv).rgba;

    vec3 color = mix(sceneColor.rgb, imageColor.rgb, imageColor.a * overlayer);

    gl_FragColor = vec4(color, 1.);
}

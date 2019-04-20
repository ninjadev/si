uniform float frame;
uniform float paperScale;
uniform float radiuser;
uniform float framiness;
uniform float generalGrayScaler;
uniform float overlayer;
uniform float xScale;
uniform float yScale;
uniform float xOffset;
uniform float yOffset;
uniform sampler2D spinnerImage;
uniform float xOffsetPaper;
uniform float backgroundiness;
uniform float r;
uniform float g;
uniform float b;
uniform float paperR;
uniform float paperG;
uniform float paperB;
uniform sampler2D tDiffuse;
uniform sampler2D paperContent;
uniform sampler2D infoOutro;
uniform sampler2D image;

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec3 prebanded = texture2D(tDiffuse, vUv).rgb;
    vec3 introFader = mix(vec3(0.), prebanded, min(1., max(0., (frame - 0.) / 50.)));

    vec3 noise1 = vec3(rand(vUv + 0. * frame * 0.0000432231));
    vec3 noise2 = vec3(rand(vUv * 3. + frame * 0.0000932231));
    vec3 noise = mix(noise1, noise2, 0.5);
    float noiseAmount = 0.05;
    noise = (1. - noiseAmount) + noise * noiseAmount;
    gl_FragColor = vec4(introFader * noise + texture2D(infoOutro, vUv).rgb, 1.);


}

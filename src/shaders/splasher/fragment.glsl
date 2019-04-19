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
uniform sampler2D image;

varying vec2 vUv;

float rand(vec2 co){
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main() {

    vec2 paperContentUv = vUv;
    paperContentUv -= 0.5;
    paperContentUv *= paperScale;
    paperContentUv += 0.5;
    paperContentUv -= vec2(0.24 - xOffsetPaper, .09);
    //paperContentUv *= vec2(16., 9.) / 16.;
    //paperContentUv /= vec2(11., 8.5) / 11.;
    vec3 paperContentColor = texture2D(paperContent, paperContentUv).rgb;

    float grayscalePaper = (paperContentColor.r + paperContentColor.g + paperContentColor.b) / 3.;
    //paperContentColor = vec3(paperR, paperG, paperB) * (1. * grayscalePaper) + (1. - grayscalePaper) * vec3(r, g, b);

    vec3 sceneColor = texture2D(tDiffuse, vUv).rgb;
    vec3 originalSceneColor = vec3(sceneColor);
    float avg = (sceneColor.r + sceneColor.g + sceneColor.b) / 3.;
    avg = avg * 0.0 + 1.0;
    sceneColor = mix(sceneColor, avg * vec3(r, g, b), 1.);

    vec2 uv = vUv - 0.5;
    uv.x += xOffset;
    uv.y += yOffset;
    uv.x *= xScale;
    uv.y *= yScale;
    uv += 0.5;

    vec4 imageColor = texture2D(image, uv).rgba;

    vec2 uspaper = vec2(11., 8.5) / 8.5;

    paperContentUv -= 0.5;
    paperContentUv *= uspaper;
    paperContentUv *= paperScale,
    paperContentUv += 0.5;
    float borderSize = 0.02;
    vec3 framiColor = mix(sceneColor.rgb, vec3(0., 0., 0.), (
    step(-borderSize, paperContentUv.x) *
    (1. - step(1. + borderSize, paperContentUv.x)) *
    step(-borderSize, paperContentUv.y) *
    (1. - step(1. + borderSize, paperContentUv.y))
    ));

    framiColor = mix(framiColor, paperContentColor, (
    step(0., paperContentUv.x) *
    (1. - step(1., paperContentUv.x)) *
    step(0., paperContentUv.y) *
    (1. - step(1., paperContentUv.y))
    ));

    vec3 color = mix(sceneColor.rgb, framiColor, framiness);

    color = mix(originalSceneColor, color, backgroundiness);

    float spinAngle = 0.5;
    vec2 translation = vec2(-0., -0.);
    vec2 spinUv = uv + translation;
    spinUv = vec2(
        spinUv.x * cos(spinAngle) - spinUv.y * sin(spinAngle),
        spinUv.y * cos(spinAngle) + spinUv.x * sin(spinAngle));
    spinUv -= translation;
    vec4 spinnerImageColor = texture2D(spinnerImage, spinUv);
    color = mix(color, spinnerImageColor.rgb, spinnerImageColor.a);

    color = mix(color, imageColor.rgb, imageColor.a);


    float flippo = floor(mod(vUv.x * 4., 1.) * 2.);
    color = mix(color, originalSceneColor, 1. - step(mix( flippo + vUv.y, flippo - vUv.y, flippo), overlayer));

    color = mix(color, vec3(color.r * 0.2989 + color.g * 0.5870 + color.b * 0.1140), generalGrayScaler);

    vec2 ruv = vUv;
    ruv *= vec2(16., 9.) / 16.;
    ruv.x -= 0.19;
    ruv.y -= .15;
    ruv.x *= xScale;
    ruv.y *= xScale;
    float radius = -1. + 2. * (ruv.x * ruv.x + ruv.y * ruv.y) + sin(3.15 + ruv.x * 13.);
    //gl_FragColor = vec4(color, 1.);

    vec3 prebanded = mix(color, originalSceneColor, step(radiuser, radius));

    /*
    float stepis = 16.;
    prebanded *= stepis + 1.;
    prebanded = floor(prebanded);
    prebanded /= stepis;

    prebanded = 0.1 + pow(prebanded, vec3(2.));
    */

    vec3 introFader = mix(vec3(0.), prebanded, min(1., max(0., (frame - 0.) / 50.)));

    vec3 noise1 = vec3(rand(vUv + 0. * frame * 0.0000432231));
    vec3 noise2 = vec3(rand(vUv * 3. + frame * 0.0000932231));
    vec3 noise = mix(noise1, noise2, 0.5);
    float noiseAmount = 0.05;
    noise = (1. - noiseAmount) + noise * noiseAmount;
    gl_FragColor = vec4(introFader * noise, 1.);


}

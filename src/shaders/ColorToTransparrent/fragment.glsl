uniform float frame;
uniform sampler2D tDiffuse;

varying vec2 vUv;

// This color with some slack will be converted to transparency.
#define TARGET_R 244.
#define TARGET_G 244.
#define TARGET_B 232.

#define PRECISION  5.

void main() {
    vec4 color = texture2D(tDiffuse, vUv);

    if (color.r * 256. < TARGET_R + PRECISION &&
        color.r * 256. > TARGET_R - PRECISION &&
        color.g * 256. < TARGET_G + PRECISION &&
        color.g * 256. > TARGET_G - PRECISION &&
        color.b * 256. < TARGET_B + PRECISION &&
        color.b * 256. > TARGET_B - PRECISION)
    {
        gl_FragColor = vec4(0., 0., 0., 0.);
    } else {
        gl_FragColor = color;    
    }
}

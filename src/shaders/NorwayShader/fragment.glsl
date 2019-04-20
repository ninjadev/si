uniform float frame;
uniform float fade_in;
uniform sampler2D tDiffuse;
uniform sampler2D tPlume;
uniform sampler2D tBorder;
uniform sampler2D z1;
uniform sampler2D z2;
uniform sampler2D z3;
uniform sampler2D z4;
uniform sampler2D z5;
uniform sampler2D z6;
uniform sampler2D z7;
uniform sampler2D z8;
uniform sampler2D z9;
uniform sampler2D z10;
uniform sampler2D z11;

#define EDGE_WIDTH 0.002

// Thresholds for the color difference between map sections.
// For convenience they are sorted from north to south, but
// named based on colors incrementally.
#define THRESHOLD_BG 3.//Background of map
#define THRESHOLD_01 42.//40 - 41
#define THRESHOLD_08 185. //182 - 183
#define THRESHOLD_09 196. //194 - 195
#define THRESHOLD_05 138. //136 - 137
#define THRESHOLD_06 141. //139 - 140
#define THRESHOLD_04 96.  //94 - 95
#define THRESHOLD_07 173. //171 - 172
#define THRESHOLD_03 71.  //69 - 70
#define THRESHOLD_02 67.  //65 - 66
#define THRESHOLD_10 199. //197 - 198
#define THRESHOLD_11 220. //220

varying vec2 vUv;

void main() {
    //gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(frame / 60.0), 1.0);
    vec4 color = texture2D(tDiffuse, vUv);

    // Doing edge detection, simple sobel thingy
    vec4 up = texture2D(tDiffuse, vec2(vUv.x, vUv.y + EDGE_WIDTH));
    vec4 right = texture2D(tDiffuse, vec2(vUv.x + EDGE_WIDTH, vUv.y));
    float red = abs(color.r-right.r)+abs(color.r-up.r);
    //float green = abs(color.g-right.g)+abs(color.g-up.g);
    //float blue = abs(color.b-right.b)+abs(color.b-up.b);






    float intensity = color.r;
    vec4 output_color;
    vec2 uv_t = vec2((1. - vUv.x) / 16. * 9., vUv.y);
    vec4 fade_in_color = texture2D(z1, ((uv_t - vec2(0.5, 0.5))* 5.) + vec2(2.076, -1.36));
    vec2 uv = vUv - 0.5 * 2.;
    uv = mod(uv, vec2(1.));
    if (intensity < THRESHOLD_01 / 256.)
    {
      // vec2(0.31, -0.38)
      output_color = fade_in_color;
    }
    else if (intensity < THRESHOLD_02 / 256.)
    {
      uv *= 2.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z2, uv);
    }
    else if (intensity < THRESHOLD_03 / 256.)
    {
      uv *= 3.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z3, uv);
    }
    else if (intensity < THRESHOLD_04 / 256.)
    {
      uv *= 2.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z4, uv);
    }
    else if (intensity < THRESHOLD_05 / 256.)
    {
      uv *= 3.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z5, uv);
    }
    else if (intensity < THRESHOLD_06 / 256.)
    {
      uv *= 2.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z6, uv);
    }
    else if (intensity < THRESHOLD_07 / 256.)
    {
      uv *= 3.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z7, uv);
    }
    else if (intensity < THRESHOLD_08 / 256.)
    {
      uv *= 2.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z8, uv);
    }
    else if (intensity < THRESHOLD_09 / 256.)
    {
      uv *= 3.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z9, uv);
    }
    else if (intensity < THRESHOLD_10 / 256.)
    {
      uv *= 2.;
      uv = mod(uv, vec2(1.));
      output_color = texture2D(z10, uv);
    }
    else
    {
      output_color = texture2D(z11, uv);
    }
    /*output_color = vec4(output_color.r - red * 10.,
                            output_color.g - green * 10.,
                            output_color.b - blue * 10.,
                            1.0);
    */

    if (intensity < THRESHOLD_BG / 256.)
    {
      output_color = vec4(1., 1., 1., 0.);
    }

    output_color = output_color * fade_in + fade_in_color * (1. - fade_in);

    vec4 borderColor = texture2D(tBorder, vUv);
    vec4 plumeColor = texture2D(tPlume, vUv);
    output_color = vec4(mix(output_color.rgb, borderColor.rgb, borderColor.a*fade_in), max(output_color.a, borderColor.a));

    output_color = vec4(mix(output_color.rgb, plumeColor.rgb, (1.-output_color.a)*fade_in), max(output_color.a, plumeColor.a));

    gl_FragColor = output_color;
}

uniform float frame;
uniform sampler2D tDiffuse;
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
    if (intensity < THRESHOLD_01 / 256. || 1. == 1.)
    {
      output_color = texture2D(z1, vUv);
    }
    else if (intensity < THRESHOLD_02 / 256.)
    {
      output_color = texture2D(z2, vUv);
    }
    else if (intensity < THRESHOLD_03 / 256.)
    {
      output_color = texture2D(z3, vUv);
    }
    else if (intensity < THRESHOLD_04 / 256.)
    {
      output_color = texture2D(z4, vUv);
    }
    else if (intensity < THRESHOLD_05 / 256.)
    {
      output_color = texture2D(z5, vUv);
    }
    else if (intensity < THRESHOLD_06 / 256.)
    {
      output_color = texture2D(z6, vUv);
    }
    else if (intensity < THRESHOLD_07 / 256.)
    {
      output_color = texture2D(z7, vUv);
    }
    else if (intensity < THRESHOLD_08 / 256.)
    {
      output_color = texture2D(z8, vUv);
    }
    else if (intensity < THRESHOLD_09 / 256.)
    {
      output_color = texture2D(z9, vUv);
    }
    else if (intensity < THRESHOLD_10 / 256.)
    {
      output_color = texture2D(z10, vUv);
    }
    else
    {
      output_color = texture2D(z11, vUv);
    }
    /*output_color = vec4(output_color.r - red * 10.,
                            output_color.g - green * 10., 
                            output_color.b - blue * 10., 
                            1.0);
    */
    if (red > 0.008) {
        output_color = vec4(0., 0., 0., 1.);
    }

    if (intensity < THRESHOLD_BG / 256.)
    {
      output_color = vec4(1., 1., 1., 0.);
    }

    gl_FragColor = output_color;
}

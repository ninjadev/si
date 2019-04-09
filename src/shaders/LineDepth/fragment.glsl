uniform float frame;
uniform sampler2D depthmap;
uniform sampler2D raw_bg;
varying vec2 vUv;

#define LINES 70.
#define WIDTHSCAN 0.002

void main( )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;
    
    vec4 left = texture2D(depthmap, vec2(uv.x+WIDTHSCAN,uv.y));
    vec4 middle = texture2D(depthmap, vec2(uv.x,uv.y));
    vec4 right = texture2D(depthmap, vec2(uv.x-WIDTHSCAN,uv.y));
    vec4 lefter = texture2D(depthmap, vec2(uv.x+WIDTHSCAN*2.,uv.y));
    vec4 righter = texture2D(depthmap, vec2(uv.x-WIDTHSCAN*2.,uv.y));
                                         
    vec4 average = (left + middle + right + lefter + righter) / 5.;
    
    //float final_y = uv.y - average.r / LINES * 4.5;
    float final_y = uv.y - (1. - middle.r) / 7. - average.r / 70.;
    final_y = final_y * 0.8 + 0.2;
    float final_x = uv.x;
    //float inten = 1. - floor(mod((uv.y - average.r / LINES * 1.5) * LINES, 1.3));
    vec4 inten = texture2D(raw_bg, vec2(final_x, final_y));
    
    // Output to screen
    gl_FragColor = inten;
}

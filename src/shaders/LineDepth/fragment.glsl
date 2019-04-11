uniform float frame;
uniform float blackfade;
uniform sampler2D depthmap;
uniform sampler2D raw_bg;
varying vec2 vUv;

#define LINES 70.
#define WIDTHSCAN 0.002
#define HEIGHTSCAN 0.002

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
    float final_y = uv.y - (1. - middle.r) / 0.5 - average.r / 10.;
    final_y = final_y * 0.8 + 0.2;
    float final_x = uv.x;
    //float inten = 1. - floor(mod((uv.y - average.r / LINES * 1.5) * LINES, 1.3));
    
    vec4 middle_bg = texture2D(raw_bg, vec2(final_x, final_y));
    vec4 up = texture2D(raw_bg, vec2(final_x,final_y-HEIGHTSCAN*blackfade));
    vec4 uper = texture2D(raw_bg, vec2(final_x,final_y-HEIGHTSCAN*2.*blackfade));
    vec4 uperer = texture2D(raw_bg, vec2(final_x,final_y-HEIGHTSCAN*3.*blackfade));
    vec4 down = texture2D(raw_bg, vec2(final_x,final_y+HEIGHTSCAN*blackfade));
    vec4 downer = texture2D(raw_bg, vec2(final_x,final_y+HEIGHTSCAN*2.*blackfade));
    vec4 downerer = texture2D(raw_bg, vec2(final_x,final_y+HEIGHTSCAN*3.*blackfade));
    
    // Output to screen
    gl_FragColor = min(min(min(min(min(min(middle_bg, uper), up), down), downer), downerer), uperer);
    gl_FragColor.rgb /= blackfade * 3.+ 1.;
}

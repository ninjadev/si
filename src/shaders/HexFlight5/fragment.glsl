uniform float frame;
uniform float planeID;
uniform float visibility;
uniform float r_in;
uniform float g_in;
uniform float b_in;
uniform float seed;
uniform sampler2D tDiffuse;

varying vec2 vUv;


// The following 4 functions are based on this super awesome tutorial on hexagon tiling
// by The Art of Code aka BigWiIgs: https://www.youtube.com/watch?v=VmrIDyYiJBA
#define R3 1.732051

vec4 HexCoords(vec2 uv) {
    vec2 s = vec2(1, R3);
    vec2 h = .5*s;

    vec2 gv = s*uv;
    
    vec2 a = mod(gv, s)-h;
    vec2 b = mod(gv+h, s)-h;
    
    vec2 ab = dot(a,a)<dot(b,b) ? a : b;
    vec2 st = ab;
    vec2 id = gv-ab;
    
    st = ab;
    return vec4(st, id);
}

mat2 Rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

float Hexagon(vec2 uv, float r, vec2 offs) {
    
    uv *= Rot(mix(0., 3.1415, r));
    
    r /= 1./sqrt(2.);
    uv = vec2(-uv.y, uv.x);
    uv.x *= R3;
    uv = abs(uv);
    
    vec2 n = normalize(vec2(1,1));
    float d = dot(uv, n)-r;
    d = max(d, uv.y-r*.707);

    d = smoothstep(.06, .02, abs(d));
    
    d += smoothstep(.1, .09, abs(r-.5))*(sin(0. /60.));

    return d;
}

float GetSize(vec2 id, float seed) {
    float d = length(id);
    float t = frame/60.;
    float a = sin(d*seed+t)+sin(d*seed*seed*10.+t*2.);
    return a/2. +.5;
}


vec3 color_gen(vec2 uv) {
    float dist = pow( pow(uv.x / 16. * 9., 2.) + pow(uv.y, 2.), 0.75);

    return vec3(r_in, g_in, b_in) * (1. - dist * 4.);
}

void main() {
    vec2 uv = (vUv - .5) * vec2(16./9., 1.);
    vec4 hu = HexCoords(uv * 35.);
    float color = Hexagon(hu.xy, GetSize(hu.zw, seed), vec2(0));
    vec2 offs = vec2(1,0);
    color += Hexagon(hu.xy-offs, GetSize(hu.zw+offs, seed), offs);
    color += Hexagon(hu.xy+offs, GetSize(hu.zw-offs, seed), -offs);
    offs = vec2(.5,.8725);
    color += Hexagon(hu.xy-offs, GetSize(hu.zw+offs, seed), offs);
    color += Hexagon(hu.xy+offs, GetSize(hu.zw-offs, seed), -offs);
    offs = vec2(-.5,.8725);
    color += Hexagon(hu.xy-offs, GetSize(hu.zw+offs, seed), offs);
    color += Hexagon(hu.xy+offs, GetSize(hu.zw-offs, seed), -offs);

    //color /= 3.;



    gl_FragColor = vec4(color * color_gen(uv), color * visibility);
}

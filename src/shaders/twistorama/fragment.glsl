#define AA 2
#define PAI 3.14159265

uniform float frame;
uniform float ballBoom;
uniform float yPosier;
uniform float blobbiness;
uniform float cutSpacing;
uniform float xScale;
uniform float yScale;
uniform float zScale;
uniform float rotater;
uniform float scratcher;
varying vec2 vUv;

float sdCylinder(vec3 p, vec3 c) {
      return length(p.xz - c.xy) - c.z;
}

float sdSphere( in vec3 p, in vec4 s ) {
    return length(p-s.xyz) - s.w;
}

float sdEllipsoid( in vec3 p, in vec3 c, in vec3 r ) {
    return (length( (p-c)/r ) - 1.0) * min(min(r.x,r.y),r.z);
}

float sdBox( vec3 p, vec3 b ) {
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

float sdPyramid4(vec3 p, vec3 h ) // h = { cos a, sin a, height }
{
    // Tetrahedron = Octahedron - Cube
    float box = sdBox( p - vec3(0,-2.0*h.z,0), vec3(2.0*h.z) );

    float d = 0.0;
    d = max( d, abs( dot(p, vec3( -h.x, h.y, 0 )) ));
    d = max( d, abs( dot(p, vec3(  h.x, h.y, 0 )) ));
    d = max( d, abs( dot(p, vec3(  0, h.y, h.x )) ));
    d = max( d, abs( dot(p, vec3(  0, h.y,-h.x )) ));
    float octa = d - h.z;
    return max(-box,octa); // Subtraction
}

mat3 rotateX(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(1, 0, 0),
        vec3(0, c, -s),
        vec3(0, s, c));
}

mat3 rotateY(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(c, 0, s),
        vec3(0, 1, 0),
        vec3(-s, 0, c));
}

mat3 rotateZ(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(c, -s, 0),
        vec3(s, c, 0),
        vec3(0, 0, 1));
}

// http://research.microsoft.com/en-us/um/people/hoppe/ravg.pdf
float det( vec2 a, vec2 b ) { return a.x*b.y-b.x*a.y; }
vec3 getClosest( vec2 b0, vec2 b1, vec2 b2 ) {
    float a = det(b0, b2);
    float b = 2.0*det(b1, b0);
    float d = 2.0*det(b2, b1);
    float f = b * d - a * a;
    vec2 d21 = b2 - b1;
    vec2 d10 = b1 - b0;
    vec2 d20 = b2 - b0;
    vec2 gf = 2. * (b * d21 + d * d10 + a * d20);
    gf = vec2(gf.y, -gf.x);
    vec2 pp = -f * gf / dot(gf, gf);
    vec2 d0p = b0 - pp;
    float ap = det(d0p, d20);
    float bp = 2.0 * det(d10, d0p);
    float t = clamp((ap + bp) / (2.0 * a + b + d), 0.0, 1.0);
    return vec3(mix(mix(b0, b1, t), mix(b1, b2, t), t), t);
}

float hash1( float n ) {
    return fract(sin(n) * 43758.5453123);
}

vec3 forwardSF( float i, float n)  {
    const float PI = 3.141592653589793238;
    const float PHI = 1.618033988749894848;
    float phi = 2.0 * PI * fract(i / PHI);
    float zi = 1.0 - (2.0 * i + 1.0) / n;
    float sinTheta = sqrt(1.0 - zi * zi);
    return vec3( cos(phi) * sinTheta, sin(phi) * sinTheta, zi);
}

const float pi = 3.1415927;


vec2 map(vec3 p) {
    p *= 0.5;
    p.y += yPosier;

    if(cutSpacing > 0.) {
        p = rotateY(2. * floor(p.y * 4.) * rotater) * p;
    }

    vec3 boxPoint = rotateY(rotater + -pi / 4. + scratcher * p.y) * (p + vec3(0., 0., 0.));
    float box = sdBox(boxPoint, vec3(1. * xScale, 1. * yScale, 1. * zScale) / 6.);
    float shapes = box;
    float ground = 9999999.;

    float spacing = cutSpacing;
    shapes = max(shapes, -sdBox(p, vec3(10., spacing / 4., 10.)));
    shapes = max(shapes, -sdBox(p + vec3(0., spacing, 0.), vec3(10., spacing / 4., 10.)));
    shapes = max(shapes, -sdBox(p + vec3(0., -spacing, 0.), vec3(10., spacing / 4., 10.)));

    if(ballBoom > 0.01) {
        shapes = min(shapes, sdSphere(boxPoint, vec4(0., 0., 0., .1 * ballBoom)));
    }


    return vec2(shapes, 1.);
}

vec3 calcNormal(in vec3 pos, in float eps ) {
    vec2 e = vec2(1.0, -1.0) * 0.5773 * eps;
    return normalize( e.xyy*map( pos + e.xyy).x +
                      e.yyx*map( pos + e.yyx).x +
                      e.yxy*map( pos + e.yxy).x +
                      e.xxx*map( pos + e.xxx).x );
}


float calcAO(in vec3 pos, in vec3 nor) {
    float ao = 0.0;
    for(int i=0; i < 32; i++) {
        vec3 ap = forwardSF(float(i), 32.);
        float h = hash1(float(i));
        ap *= sign(dot(ap,nor)) * h * .1;
        ao += clamp(map(pos + nor * 0.01 + ap).x * 3., 0., 1.);
    }
    ao /= 32.;

    return clamp(ao * 6., 0., 1.);
}

float calcSSS(in vec3 pos, in vec3 nor) {
    float occ = 0.;
    for(int i = 0; i < 8; i++) {
        float h = 0.002 + 0.11 * float(i) / 7.;
        vec3 dir = normalize(sin(float(i) * 13.0 + vec3(0., 2.1, 4.2)));
        dir *= sign(dot(dir, nor));
        occ += (h - map(pos - h * dir).x);
    }
    occ = clamp(1. - 11. * occ / 8., 0., 1.);
    return occ * occ;
}

float calcSoftShadow(in vec3 ro, in vec3 rd, float k) {
    float res = 1.0;
    float t = 0.01;
    for(int i = 0; i < 32; i++) {
        float h = map(ro + rd * t).x;
        res = min(res, smoothstep(0., 1.,k * h / t));
        t += clamp(h, .04, .1);
        if(res < .01) {
            break;
        }
    }
    return clamp(res, 0., 1.);
}

vec3 sunDir = normalize(vec3(.2, .1, .02));

vec3 shade(in vec3 ro, in vec3 rd, in float t, in float m) {
    float eps = .002;

    vec3 pos = ro + t * rd;
    vec3 nor = calcNormal(pos, eps);

    /* diffuse ? */
    vec3 mateD = vec3(0.);
    /* specular ? */
    vec3 mateS = vec3(0.);
    /* k */
    vec2 mateK = vec2(0.);
    /* emissive ? */
    vec3 mateE = vec3(0.);

    float focc = 1.0;
    float fsha = 1.;

    vec3 green = vec3(56., 32., 43.) / 255.;
    vec3 yellow = vec3(0.5, 1.0, .5);

    if(m < 1.5) {
        float dis = 0.;

        float be = sdEllipsoid( pos, vec3(-0.3,-0.5,-0.1), vec3(0.2,1.0,0.5) );
        be = 1.0-smoothstep( -0.01, 0.01, be );

        float ff = 0.2;

        mateS = vec3(1.);
        mateS += 2.0*dis;
        mateS *= 1.5;
        mateS *= 1.0 + 0.5*ff*ff;
        mateS *= 1.0-0.5*be;

        mateD = vec3(1.0,1.0,1.0);
        mateD *= dis;
        mateD *= 0.015;
        mateD += vec3(0.8,0.4,0.3)*0.15*be;

        mateK = vec2( 60.0, 0.7 + 2.0*dis );

        float f = clamp( dot( -rd, nor ), 0.0, 1.0 );
        f = 1.0-pow( f, 8.0 );
        f = 1.0 - (1.0-f)*(1.0-0.);
        mateS *= vec3(1.,1.,1.0) + f*vec3(1.0,1.0,1.0);

        float b = 1.0-smoothstep( 0.25,0.55,abs(pos.y));
        focc = 0.2 + 0.8*smoothstep( 0.0, 0.15, sdSphere(pos,vec4(0.05,0.52,0.0,0.13)) );
    } else if (m < 2.5) {
    }

    vec3 hal = normalize( sunDir-rd );
    float fre = clamp(1.0+dot(nor,rd), 0.0, 1.0 );
    float occ = calcAO( pos, nor )*focc;
    float sss = calcSSS( pos, nor );
    sss = sss*occ + fre*occ + (0.5+0.5*fre)*pow(abs(-0.2),1.0)*occ;

    float dif1 = clamp( dot(nor,sunDir), 0.0, 1.0 );
    float sha = calcSoftShadow( pos, sunDir, 20.0 );
    dif1 *= sha*fsha;
    float spe1 = clamp( dot(nor,hal), 0.0, 1.0 );

    float bou = clamp( 0.3-0.7*nor.y, 0.0, 1.0 );


    // illumination

    vec3 col = vec3(0.0);
    col += 7.0*vec3(1.7,1.2,0.6)*dif1*2.0;           // sun
    col += 4.0*vec3(0.2,1.2,1.6)*occ*(0.5+0.5*nor.y);    // sky
    col += 1.8*vec3(0.1,2.0,0.1)*bou*occ;                // bounce

    col *= mateD;
    col = dif1 * yellow;

    return col;
}


vec3 intersect(in vec3 ro, in vec3 rd, const float mindist, const float maxdist) {
    vec3 res = vec3(-1.0, -1, 99999.);

    float t = mindist;
    for(int i = 0; i < 256; i++) {
        vec3 p = ro + t*rd;
        vec2 h = map(p);
        res = vec3(t, h.y, min(h, res.z));

        if( h.x<(0.001*t) ||  t>maxdist ) break;

        t += h.x*0.9;
    }
    return res;
}


vec4 render(in vec3 ro, in vec3 rd, in vec2 q) {
    vec4 col = vec4(vec3(1.), 0.);
    float mindist = 0.01;
    float maxdist = 40.0;

    vec3 tm = intersect(ro, rd, mindist, maxdist);

    if( tm.y>-0.5 && tm.x < maxdist ) {
        col.rgb = shade(ro, rd, tm.x, tm.y);
        col.a = 1.;
        maxdist = tm.x;
    } else {
        col = vec4(vec3(1.), 1. - step(.040, tm.z));
        col = mix(col, vec4(0., 0., 0., 1.), 1. - step(0.020, tm.z));
    }

    return clamp( col, 0.0, 1.0 );
}

mat3 setCamera(in vec3 ro, in vec3 rt, in float cr) {
    vec3 cw = normalize(rt-ro);
    vec3 cp = vec3(sin(cr), cos(cr),0.0);
    vec3 cu = normalize( cross(cw,cp) );
    vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, -cw );
}

void main() {
    vec4 col = vec4(1.,1.,1.,0.);
    vec2 iResolution = vec2(1920., 1080.);
    vec2 fragCoord = iResolution * vUv;
    float iTime = frame / 60.;

    float angle = (frame - 3926.) / 400.;
    float radius = 4.2;
    float height = 0.;
    float targetHeight = 0.;

    for(int m = 0; m < 2; m++) {
        for( int n = 0; n < 2; n++) {
            vec2 rr = vec2(float(m), float(n)) / float(AA);

            vec2 p = (-iResolution.xy + 2.0 * (fragCoord.xy + rr)) / iResolution.y;

            vec2 q = (fragCoord.xy+rr) / iResolution.xy;

            vec3 ro = vec3(radius * sin(angle), height, radius * cos(angle));
            vec3 ta = vec3(.0, targetHeight, 0.);
            mat3 ca = setCamera(ro, ta, 0.);
            vec3 rd = normalize(ca * vec3(p, -2.8));

            col += render(ro, rd, q);
        }
    }
    col.rgb /= 5.;
    gl_FragColor = col;
}

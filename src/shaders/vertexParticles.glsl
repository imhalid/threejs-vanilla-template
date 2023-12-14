uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D uTexture;
float PI = 3.141592653589793238;

void main() {
  vUv = uv;
  vPosition = position;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

  gl_PointSize = 1000. * (1. / -modelViewPosition.z);
  gl_Position = projectionMatrix * modelViewPosition;
}

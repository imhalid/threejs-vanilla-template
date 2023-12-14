import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GUI } from 'lil-gui'
import vertexShader from '@/shaders/vertex.glsl'
import fragmentShader from '@/shaders/fragment.glsl'
// import gsap from 'gsap'

const canvas = document.querySelector('canvas.webgl')
// Scene, Lights and Camera
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5
camera.position.y = 0
camera.position.x = 0

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// GUI
// const gui = new GUI().close()

// Variables
let clock = new THREE.Clock()
let mouse = new THREE.Vector2()

// Geometry and Material
const geometry = new THREE.PlaneGeometry(1, 1, 1)
const shader = new THREE.ShaderMaterial({
 vertexShader: vertexShader,
 fragmentShader: fragmentShader,
 uniforms: {
  uTime: { value: 0 },
  uMouse: { value: new THREE.Vector2(0, 0) },
  uResolution: { value: new THREE.Vector4() },
 },
 transparent: true,
 wireframe: false,
 side: THREE.DoubleSide,
})

const sphere = new THREE.Mesh(geometry, shader)
scene.add(sphere)


// Resize canvas on resize window
function handleResize() {
 camera.aspect = window.innerWidth / window.innerHeight;
 renderer.setSize(window.innerWidth, window.innerHeight);
 camera.updateProjectionMatrix();
}

function useMousePosition() {
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / window.innerWidth * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
    shader.uniforms.uMouse.value = mouse
   })
}

// Renderer
const renderer = new THREE.WebGLRenderer({
 canvas: canvas,
 antialias: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
handleResize()
useMousePosition()
window.addEventListener("resize", handleResize, false);

function animate() {
 const elapsedTime = clock.getElapsedTime()

 shader.uniforms.uTime.value = elapsedTime
 controls.update()

 renderer.render(scene, camera)
 requestAnimationFrame(animate)
}

animate()
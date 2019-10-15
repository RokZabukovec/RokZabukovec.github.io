// INDEX
// --BASIC SCENE AND CAMERA
// --RENDERER
//   **SIZE OF CANVAS
// --CONTROLS
// --RESPONSIVE RENDERING
// --GEOMETRY
// --LIGHTS
// --UPDATE FUNCTION

// BASIC SCENE AND CAMERA
//--------------------------------------------------------------------

let settings = {
  element: document.getElementById('orb'),
  cameraZoom: false,
  backgoundColor: '#ffffff',
  PNGTransparent: true,
  orbColor: '0xe3f0f2',
  orbHighlights:'0x111111',
  imagesFolderPath: 'images',
  images: ['Baby-min.jpg','M25+-min.jpg','Mjunior_zobozdravstvo-min.jpg', 'W35-50-min.jpg', 'M35-50-min.jpg', 'W25+junior-min.jpg' ]
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
//--------------------------------------------------------------------


// Create cube camera
//--------------------------------------------------------------------
var cubeCamera = new THREE.CubeCamera(1, 1001, 1024);
scene.add(cubeCamera);
//--------------------------------------------------------------------

// RENDERER
//--------------------------------------------------------------------
var renderer = new THREE.WebGLRenderer({
  antialias: true
});

//--------------------------------------------------------------------

// RENDERER - SIZE OF CANVAS
//--------------------------------------------------------------------
renderer.setSize(settings.element.offsetWidth, settings.element.offsetHeight);
renderer.setClearColor(settings.backgoundColor);
settings.element.appendChild( renderer.domElement );
//--------------------------------------------------------------------


// CONTROLS
//--------------------------------------------------------------------
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;
orbit.update();
orbit.enableZoom = settings.cameraZoom || false;

//--------------------------------------------------------------------


// RESPONSIVE RENDERING
//--------------------------------------------------------------------
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
//--------------------------------------------------------------------


// GEOMETRY
//--------------------------------------------------------------------
var geometry = new THREE.IcosahedronGeometry(2, 0);
var material = new THREE.MeshPhongMaterial({
  emissive: settings.orbHighlights,
  color: settings.orbColor,
  envMap: cubeCamera.renderTarget.texture,
  lights: true
});


material.roughness = 1;
material.metalness = 5;
material.flatShading = true;
material.reflectivity = 1;

var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
//--------------------------------------------------------------------


// SKYBOX
//--------------------------------------------------------------------
var skyboxCube = new THREE.BoxGeometry(1001, 1001, 1001);
var skyboxFaces = []
for(var i = 0; i < settings.images.length; i++){
  var textureLoader =  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(settings.imagesFolderPath + '/'+ settings.images[i]),
    side: THREE.BackSide
  })
  skyboxFaces.push(textureLoader)
}

var skyboxMaterial = new THREE.MeshFaceMaterial(skyboxFaces);
skyboxMaterial.forEach((material) => {
  material.transparent = settings.PNGTransparent;
  material.side = THREE.DoubleSide;
});
var cube = new THREE.Mesh(skyboxCube, skyboxMaterial);
scene.add(cube);
//--------------------------------------------------------------------
// LIGHTS
//--------------------------------------------------------------------
var light = new THREE.AmbientLight(0x404040, 2); // soft white light
scene.add(light);

var lightBottomRight = new THREE.PointLight(0xffffff, 1, 110);
lightBottomRight.position.set(40, -50, 25);
scene.add(lightBottomRight);

var lightBottomLeft = new THREE.PointLight(0xffffff, 1, 110);
lightBottomLeft.position.set(-40, -50, 25);
scene.add(lightBottomLeft);

var lightTopRight = new THREE.PointLight(0xffffff, 1, 110);
lightTopRight.position.set(40, 50, 25);
scene.add(lightTopRight);

var backLight = new THREE.PointLight(0xffffff, 1, 50);
backLight.position.set(0, 0, -25);
scene.add(backLight);

var width = 5;
var height = 5;
var intensity = 5;
var rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
rectLight.position.set(-1, 3, 0);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);
//--------------------------------------------------------------------


// update function
//--------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.002;
  sphere.setVisible = false;
  cubeCamera.position.copy(sphere.position);
  cubeCamera.update(renderer, scene);
  sphere.setVisible = true;
  renderer.render(scene, camera);
}
animate();

//--------------------------------------------------------------------
// import vertexShader from '../shaders/vertex.glsl'
// import fragmentShader from '../shaders/fragment.glsl'
// import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
// import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'

let camera, scene, renderer;

///====================================================================================INIT SHADERS=====================================================================///
const vertexShader = `
  varying vec2 vertexUV;
  varying vec3 vertexNormal;

  void main() {
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
  }
`
const fragmentShader = `
  uniform sampler2D globeTexture;

  varying vec2 vertexUV; // [0, 0.24]
  varying vec3 vertexNormal;

  void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0 ));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0); 
  }
`
const atmosphereVertexShader = `
  varying vec3 vertexNormal;

  void main() {
    vertexNormal = normal;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
  }
`
const atmosphereFragmentShader = `
  varying vec3 vertexNormal;

  void main() {
    float intensity = pow(0.3 - dot(vertexNormal, vec3(0.0, 0.0, 0.5 )), 1.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity; 
  }
`

//select canvas from html file
const canvasContainer = document.querySelector('#canvasContainer')

///==========================================================INIT THREEJS SCENE========================================================================================///
scene = new THREE.Scene();

// Init camera (PerspectiveCamera)
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Init renderer
renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  canvas: document.querySelector('canvas'),
  alpha: true 
});

// Set size (whole window)
renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

///===================================================================MOUSE OBJECT==================================================================================///
const mouse = {
      x: undefined,
      y: undefined,
  down: false,
  xPrev: undefined,
  yPrev: undefined
  }
  const raycaster = new THREE.Raycaster()

///============================================================THREEJS SCENE=======================================================================================///

  //Create sphere
  const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          globeTexture: {
            value: new THREE.TextureLoader().load('./media/texxtur.png')
          }
        }
      })
      /*new THREE.MeshBasicMaterial({
        //color: 0x77DD33
        map: new THREE.TextureLoader().load('./media/texxtur.png')
    })*/
  )
sphere.rotation.y = -Math.PI / 2

//create atmosphere  
const atmos = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmos.scale.set(1.5, 1.5, 1.5)

//Setting the camera position higher to see the Earth
  camera.position.z = 13


//Group of objects creation
const group = new THREE.Group()
const points = new THREE.Group()

//Create point
function createPoint(id, lat, long, aDebut, aFin){
  const point = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.4),
    new THREE.MeshBasicMaterial({
      color: '#ff5500',
      opacity: 0.4,
      visible: true,
      transparent: true
    })
  )
  point.idArt = id
  point.Annee = aDebut 
  point.AnneeFin = aFin

const latitude = (lat / 180) * Math.PI
const longitude = (long / 180) * Math.PI
const radius = 5
const x = radius * Math.cos(latitude) * Math.sin(longitude)
const y = radius * Math.sin(latitude)
const z = radius * Math.cos(latitude) * Math.cos(longitude)
point.position.x = x
point.position.y = y
point.position.z = z

point.lookAt(0, 0, 0)

point.geometry.applyMatrix4( new THREE.Matrix4().makeTranslation(0, 0, -0.2))

points.add(point)
}

//Creating the points needed
createPoint("Arc de Triomphe Wrapped", 48.873792, 2.295028, 2021, 2021)
createPoint("Fish", 58.249500, 8.377200, 1997, 1997) 
createPoint("Eisvirus",52.2333, 9.2, 2016, 2016) 
createPoint("Levitated Mass", 34, -117.483330, 2011, 2012)
createPoint("Sun Tunnels", 40.666667, -117.483330, 1973, 2022)
createPoint("Tibesti", 20.78, 18.05, 1989, 2022)
createPoint("Bunjil Geoglyph", -37.0201, 144.9646, 2006, 2022)
createPoint("Wave Field", 39.588367, -107.399762, 1995, 2022)
createPoint("Bobur",54.75130313568798, 35.60068707061457,2018,2022)

//Adding The Earth and the Points to the group and the scene
  group.add(sphere)
  group.add(points)
  scene.add(group)
  scene.add(atmos)

///======================================================================ANIMATION=============================================================///

  // Draw the scene every time the screen is refreshed
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    group.rotation.y += 0.001
  
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera)
  
    const intersects = raycaster.intersectObjects(points.children)
  
    points.children.forEach((mesh) => {
      mesh.material.opacity = 0.4
    })

    points.children.forEach((mesh) => {
      if(!(localStorage.getItem("anneeVoulue") >= mesh.Annee && localStorage.getItem("anneeVoulue") <= mesh.AnneeFin)){
        mesh.visible = false
      } else {
        mesh.visible = true
      }
    })
  
    for(let i = 0; i < intersects.length; i++){
      const point = intersects[i].object
      point.material.opacity = 1.0
      if(mouse.down){
        const nomOeuvreVoulue = point.idArt
        localStorage.setItem("nomOeuvreVoulue", nomOeuvreVoulue)
        window.location.href = "./page-oeuvres.html"
      }
    }
  }
  
  function onWindowResize() {
  // Camera frustum aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  // After making changes to aspect
  camera.updateProjectionMatrix();
  // Reset size
  renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize, false);
  
  animate();

///========================================EVENT LISTENERS=================================================================================///
canvasContainer.addEventListener('mousedown', ({clientX, clientY}) => {
  mouse.down = true
  mouse.xPrev = clientX
  mouse.yPrev = clientY
  })
  addEventListener('mouseup', () => {
  mouse.down = false
  })
  
  canvasContainer.addEventListener('mousemove', (event) => {
    var rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1
    mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1
  
  if(mouse.down) {
    const deltaX = event.clientX - mouse.xPrev
    const deltaY = event.clientY - mouse.yPrev
    group.rotation.y += deltaX *0.002
    group.rotation.x += deltaY *0.002
    mouse.xPrev = event.clientX
    mouse.yPrev = event.clientY
  }
  })
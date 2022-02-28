let camera, scene, renderer, earth;

function init() {
	// Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.SphereGeometry(2,32,16);

	// Create material with color
	//const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

	// Add texture - 
	const texture = new THREE.TextureLoader().load("https://static.wikia.nocookie.net/planet-texture-maps/images/a/aa/Earth_Texture_Full.png/revision/latest/scale-to-width-down/2000?cb=20190401163425");

	// Create material with texture
	const material = new THREE.MeshBasicMaterial({ map: texture });

	// Create mesh with geo and material	
	earth = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(earth);

	// Position camera
	camera.position.z = 5;
}


// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	// Rotate earth (Change values to change speed)
	earth.rotation.x += 0.005;
	earth.rotation.y += 0.005;

	renderer.render(scene, camera);
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

init();
animate();

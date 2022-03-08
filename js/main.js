let camera, scene, renderer;

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
    renderer.setPixelRatio(window.devicePixelRatio)

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

    //Create sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('http://adartza.iutbayonne.univ-pau.fr/~cestangue001/media/globe.jpg')
        }))
    
    camera.position.z = 13


    const group = new THREE.Group()
    group.add(sphere)
    scene.add(group)

// Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
    sphere.rotation.y += 0.003
    //group.rotation.y = mouse.x
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

const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', () => {
    mouse.x = (event.ClientX / innerWidth) * 2 - 1
    mouse.y = (event.ClientY / innerHeight) * 2 - 1

    console.log(mouse)
}
)

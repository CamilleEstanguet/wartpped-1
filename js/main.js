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
            map: new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/570c9426-37ef-4869-b888-7da245b8a19f/del9sm5-8028b7e2-25ff-436f-889c-cb073876557a.jpg/v1/fill/w_1280,h_640,q_75,strp/earth_texture_map_by_wdawdawdwdaw_del9sm5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvNTcwYzk0MjYtMzdlZi00ODY5LWI4ODgtN2RhMjQ1YjhhMTlmXC9kZWw5c201LTgwMjhiN2UyLTI1ZmYtNDM2Zi04ODljLWNiMDczODc2NTU3YS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.mopKGVfWzfNfkf3m1GqexwCAAHsJX4-Rp9cdpmcAahk')
        }))
    
    camera.position.z = 13


    const group = new THREE.Group()
    group.add(sphere)
    scene.add(group)

    const mouse = {
        x: undefined,
        y: undefined
    }

    // Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
    sphere.rotation.y += 0.003
    group.rotation.y = mouse.x * 0.5
    group.rotation.x = mouse.y *0.5
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

addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 - 1

}
)

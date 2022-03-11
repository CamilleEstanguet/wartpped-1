	let camera, scene, renderer;

	const canvasContainer = document.querySelector('#canvasContainer')

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
	renderer = new THREE.WebGLRenderer({ 
		antialias: true,
		alpha: true 
	});

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

    //Create sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.MeshBasicMaterial({
			//color: 0x77DD33
            map: new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/570c9426-37ef-4869-b888-7da245b8a19f/del9sm5-8028b7e2-25ff-436f-889c-cb073876557a.jpg/v1/fill/w_1280,h_640,q_75,strp/earth_texture_map_by_wdawdawdwdaw_del9sm5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvNTcwYzk0MjYtMzdlZi00ODY5LWI4ODgtN2RhMjQ1YjhhMTlmXC9kZWw5c201LTgwMjhiN2UyLTI1ZmYtNDM2Zi04ODljLWNiMDczODc2NTU3YS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.mopKGVfWzfNfkf3m1GqexwCAAHsJX4-Rp9cdpmcAahk')
        })
	)
    
    camera.position.z = 13
	const group = new THREE.Group()
	const groupEarth = new THREE.Group()

	//Create point
	function createPoint(lat, long){
		const point = new THREE.Mesh(
			new THREE.SphereGeometry(0.07, 50, 50),
			new THREE.MeshBasicMaterial({
				color: '#ffff00'
			})
		)
	
	const latitude = (lat / 180) * Math.PI
	const longitude = (long / 180) * Math.PI
	const radius = 5
	const x = radius * Math.cos(latitude) * Math.sin(longitude)
	const y = radius * Math.sin(latitude)
	const z = radius * Math.cos(latitude) * Math.cos(longitude)
	point.position.x = x
	point.position.y = y
	point.position.z = z

	groupEarth.add(point)
	}

	createPoint(48.873792, 2.295028)
	createPoint(43.1833, -0.55)
	createPoint(58.249500, 8.377200)
	createPoint(52.2333, 9.2)


	sphere.rotation.y = -Math.PI / 2


    groupEarth.add(sphere)
	group.add(groupEarth)
    scene.add(group)

    const mouse = {
        x: undefined,
        y: undefined,
		down: false,
		xPrev: undefined,
		yPrev: undefined
    }

    // Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
    //sphere.rotation.y += 0.008
	groupEarth.rotation.y += 0.001
    //group.rotation.y = mouse.x * 0.5
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

addEventListener('mousedown', ({clientX, clientY}) => {
	mouse.down = true
	mouse.xPrev = clientX
	mouse.yPrev = clientY
})
addEventListener('mouseup', () => {
	mouse.down = false
})

addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 - 1

	if(mouse.down) {
		const deltaX = event.clientX - mouse.xPrev
		const deltaY = event.clientY - mouse.yPrev
		group.rotation.y += deltaX *0.002
		group.rotation.x += deltaY *0.002
		mouse.xPrev = event.clientX
		mouse.yPrev = event.clientY
		
	}
})


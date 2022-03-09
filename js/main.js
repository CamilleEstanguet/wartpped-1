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
			//color: 0x77DD33
            map: new THREE.TextureLoader().load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/570c9426-37ef-4869-b888-7da245b8a19f/del9sm5-8028b7e2-25ff-436f-889c-cb073876557a.jpg/v1/fill/w_1280,h_640,q_75,strp/earth_texture_map_by_wdawdawdwdaw_del9sm5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvNTcwYzk0MjYtMzdlZi00ODY5LWI4ODgtN2RhMjQ1YjhhMTlmXC9kZWw5c201LTgwMjhiN2UyLTI1ZmYtNDM2Zi04ODljLWNiMDczODc2NTU3YS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.mopKGVfWzfNfkf3m1GqexwCAAHsJX4-Rp9cdpmcAahk')
        })
	)
    
    camera.position.z = 13

	//Create point
    const point = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 50, 50),
        new THREE.MeshBasicMaterial({
            color: '#ff0000'
        })
	)
	const pointA = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 50, 50),
        new THREE.MeshBasicMaterial({
            color: '#ff0000'
        })
	)
	const pointF = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 50, 50),
        new THREE.MeshBasicMaterial({
            color: '#ff0000'
        })
	)
	const pointE = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 50, 50),
        new THREE.MeshBasicMaterial({
            color: '#ff0000'
        })
	)
	//Escout = 43.1833° N, -0.55° W
	const latitude = (43.1833 / 180) * Math.PI
	const longitude = (-0.55 / 180) * Math.PI
	const radius = 5
	const x = radius * Math.cos(latitude) * Math.sin(longitude)
	const y = radius * Math.sin(latitude)
	const z = radius * Math.cos(latitude) * Math.cos(longitude)
	console.log({x, y, z})
	point.position.x = x
	point.position.y = y
	point.position.z = z

	//Arc de Triomphe
	const latitudeA = (48.873792 / 180) * Math.PI
	const longitudeA = (2.295028 / 180) * Math.PI
	const radiusA = 5
	const xA = radiusA * Math.cos(latitudeA) * Math.sin(longitudeA)
	const yA = radiusA * Math.sin(latitudeA)
	const zA = radiusA * Math.cos(latitudeA) * Math.cos(longitudeA)
	console.log({xA, yA, zA})
	pointA.position.x = xA
	pointA.position.y = yA
	pointA.position.z = zA

	//Fish
	const latitudeF = (58.249500 / 180) * Math.PI
	const longitudeF = (8.377200 / 180) * Math.PI
	const radiusF = 5
	const xF = radiusF * Math.cos(latitudeF) * Math.sin(longitudeF)
	const yF = radiusF * Math.sin(latitudeF)
	const zF = radiusF * Math.cos(latitudeF) * Math.cos(longitudeF)
	console.log({xF, yF, zF})
	pointF.position.x = xF
	pointF.position.y = yF
	pointF.position.z = zF

	//Eisvirus
	const latitudeE = (52.2333 / 180) * Math.PI
	const longitudeE = (9.2 / 180) * Math.PI
	const radiusE = 5
	const xE = radiusE * Math.cos(latitudeE) * Math.sin(longitudeE)
	const yE = radiusE * Math.sin(latitudeE)
	const zE = radiusE * Math.cos(latitudeE) * Math.cos(longitudeE)
	console.log({xE, yE, zE})
	pointE.position.x = xE
	pointE.position.y = yE
	pointE.position.z = zE


	sphere.rotation.y = -Math.PI / 2


    const group = new THREE.Group()
    group.add(sphere)
	group.add(point)
	group.add(pointA)
	group.add(pointF)
	group.add(pointE)
    scene.add(group)

    const mouse = {
        x: undefined,
        y: undefined
    }

    // Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);

	renderer.render(scene, camera);
    //sphere.rotation.y += 0.008
	//group.rotation.y += 0.012
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

addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = (event.clientY / innerHeight) * 2 - 1
})


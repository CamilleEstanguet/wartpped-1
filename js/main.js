	let camera, scene, renderer;

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
		alpha: true 
	});

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	///===================================================================MOUSE OBJECT==================================================================================///
	const mouse = {
        x: undefined,
        y: undefined,
		down: false,
		xPrev: undefined,
		yPrev: undefined
    }
	const raycaster = new THREE.Raycaster()
	const pointer = new THREE.Vector2()

	function onPointerMove( event ) {
	
		pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	
	}

	///============================================================THREEJS SCENE=======================================================================================///

    //Create sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.MeshBasicMaterial({
			//color: 0x77DD33
            map: new THREE.TextureLoader().load('http://lakartxela.iutbayonne.univ-pau.fr/~cestangue001/Wartpped-1/media/texxtur.png')
        })
	)
	sphere.rotation.y = -Math.PI / 2
    
	//Setting the camera position higher to see the Earth
    camera.position.z = 13


	//Group of objects creation
	const group = new THREE.Group()
	const points = new THREE.Group()

	//Create point
	function createPoint(lat, long){
		const point = new THREE.Mesh(
			new THREE.BoxGeometry(0.1, 0.1, 0.4),
			new THREE.MeshBasicMaterial({
				color: '#ff5500'
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

	point.lookAt(0, 0, 0)

	point.geometry.applyMatrix4( new THREE.Matrix4().makeTranslation(0, 0, -0.2))

	points.add(point)
	}

	//Creating the points needed
	createPoint(48.873792, 2.295028)
	createPoint(43.1833, -0.55)
	createPoint(58.249500, 8.377200)
	createPoint(52.2333, 9.2)

	//Adding The Earth and the Points to the group and the scene
    group.add(sphere)
	group.add(points)
    scene.add(group)

///======================================================================ANIMATION=============================================================///

    // Draw the scene every time the screen is refreshed
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
    group.rotation.y += 0.001
	raycaster.setFromCamera( pointer, camera )
	const intersects = raycaster.intersectObjects( scene.children )
	//console.log(intersects)

	for ( let i = 0; i < intersects.length; i ++ ) {

		//intersects[i].object.material.color.set(0xff0000)

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


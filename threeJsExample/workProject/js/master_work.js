$(function() {
	console.log("Document loaded...");
	$('.left').attr('checked', false);
	$('.right').attr('checked', false);
	$('.up').attr('checked', false);
	$('.down').attr('checked', false);

	var scene, camer, renderer;
	var WIDTH = $('#render-container').width();
	var HEIGHT = $('#render-container').height();
	var SPEED = 0.01;
	var mesh_map, mesh_1695;
	var ANGLE = 3.14;
	var ANGLE2 = 1.54;

	console.log("The width and height are:", WIDTH, HEIGHT, "respectively.");

	function init() {
		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000)

		//init stuff here
		initMesh();
		initCamera();
		initLights();
		initRenderer();

		$('#render-container').append(renderer.domElement);
	}

	function initRenderer() {
		renderer = new THREE.WebGLRenderer({ antialias: true, alphaTest: true });
		renderer.setSize(WIDTH, HEIGHT);
	}

	function initCamera() {
		camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 15);
		camera.position.set(0,4,0);
		camera.lookAt(scene.position);
	}

	function initLights() {
		var light = new THREE.AmbientLight(0xffffff);
		scene.add(light);
	}

	function initMesh() {
		var loader = new THREE.JSONLoader();
		loader.load('./blenderMeshes/work_project/mesh/campus_map.json', function(geometry, materials) {
			var mesh_map = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
	        mesh_map.scale.x = mesh_map.scale.y = mesh_map.scale.z = 1.0;
	        mesh_map.translation = THREE.GeometryUtils.center(geometry);
	        scene.add(mesh_map);
		});

		loader.load('./blenderMeshes/work_project/mesh/1695.json', function(geometry) {
			var mesh_1695 = new THREE.Mesh(geometry);
	        mesh_1695.scale.x = mesh_1695.scale.y = mesh_1695.scale.z = 1.0;
	        // mesh_1695.translation = THREE.GeometryUtils.center(geometry);
	        // mesh_1695.position.set(-1.2,.41,-.4);
	        mesh_1695.position.set(0,.175,0);
	        scene.add(mesh_1695);
		});

		loader.load('./blenderMeshes/work_project/mesh/school.json', function(geometry) {
			var mesh_school = new THREE.Mesh(geometry);
	        mesh_school.scale.x = mesh_school.scale.y = mesh_school.scale.z = 1.0;
	        // mesh_school.translation = THREE.GeometryUtils.center(geometry);
	        // mesh_school.position.set(-.05,.15,-3.2);
	        mesh_school.position.set(0,0,0);
	        scene.add(mesh_school);
		});

		loader.load('./blenderMeshes/work_project/mesh/eng-building-origin.json', function(geometry) {
			var mesh_eng = new THREE.Mesh(geometry);
	        mesh_eng.scale.x = mesh_eng.scale.y = mesh_eng.scale.z = 1.0;
	        // mesh_eng.translation = THREE.GeometryUtils.center(geometry);
	        // mesh_eng.position.set(0,.36,3);
	        mesh_eng.position.set(0,0,0);
	        scene.add(mesh_eng);
		});

		// loader.load('./blenderMeshes/work_project/mesh/delete-this-json.json', function(geometry, material) {
		// 	var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('SeamlessSand1-100.jpg') } );
		// 	var mesh_plane = new THREE.Mesh(geometry, material);
	 //        mesh_plane.scale.x = mesh_plane.scale.y = mesh_plane.scale.z = 1.0;
	 //        // mesh_eng.translation = THREE.GeometryUtils.center(geometry);
	 //        // mesh_eng.position.set(0,.36,3);
	 //        mesh_plane.position.set(0,2,0);
	 //        scene.add(mesh_plane);
		// });
	}

	function updateCamera() {
		if ($('.right').is(':checked')) {
			// if (ANGLE < 0) {
			// 	ANGLE = 3.14;
			// }
			ANGLE -= 0.0003;
		} else if ($('.left').is(':checked')) {
			// if (ANGLE > 3.14) {
			// 	ANGLE = 0;
			// }
			ANGLE += 0.0003;
		}
		if ($('.up').is(':checked') && ANGLE2 < 1.56 ) {
			ANGLE2 += .0003;
		} else if ($('.down').is(':checked') && ANGLE2 > 1.535) {
			ANGLE2 -= .0003;
		}

		camera.position.x = 7*Math.cos(ANGLE*(180/3.14));
		camera.position.z = 7*Math.sin(ANGLE*(180/3.14));
		camera.position.y = 7*Math.sin(ANGLE2*(180/3.14));
		camera.lookAt(scene.position);
	}

	init();
	render();

	function render() {
		updateCamera();
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}
});
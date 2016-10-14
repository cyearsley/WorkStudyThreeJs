$(function(){
    console.log("Included index.js");

    // Define the scene
    var scene = new THREE.Scene();

    // init the renderer - if the user's browser supports WebGL use it, else use Canvas.
    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    var light = new THREE.AmbientLight(0xffffff);
    var camera;
    var sphere;
    var flag = false;
    var position = {
        x: 0,
        y: 0,
        z: 0
    }

    document.onkeypress = function (e) {
        e = e || window.event;
        // use e.keyCode
        console.log("e: ", e.keyCode);
        if (e.keyCode == 37) {
            position.x -= .05;
        }
        else if (e.keyCode == 39) {
            position.x += .05;
        }
        else if (e.keyCode == 38) {
            position.y += .05;
        }
        else if (e.keyCode == 40) {
            position.y -= .05;
        }
    };
    // var box;

    function init() {
        //                    width,            height
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Where should we render the content?
        document.getElementById('render-container').appendChild(renderer.domElement);

        // add some light
        //      "light" is the var light
        scene.add(light);

        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 20;
        scene.add(camera);

        box = new THREE.Mesh(
            new THREE.BoxGeometry(10,10,10),
            new THREE.MeshBasicMaterial({color: 0xfff})
        );
        box.position.z = -2;
        box.name = "SuperAwesomeBOOOOOOX";
        scene.add(box);
        var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true, wireframeLinecap: 'square'} );
        sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = position.x;
        sphere.position.y = position.y;
        sphere.position.z = position.z;

        scene.add( sphere );

        render();
    }

    function render() {
        box.rotation.x -= 0.002;
        box.rotation.y -= 0.001;

        sphere.position.x = position.x;
        sphere.position.y = position.y;
        // scene.fog = new THREE.Fog(0xffffff, 5, 20);

        renderer.render(scene, camera);

        // The parameter being passed (render) is the function render... This IS a recursive function.
        requestAnimationFrame(render);
    }

    init();
});
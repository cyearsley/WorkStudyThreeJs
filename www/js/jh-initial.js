$(function(){
console.log("Document loaded...");
var scene, camera, renderer;

var WIDTH = $('#game-board').width();
var HEIGHT = $('#game-board').height();

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    $('#game-board').append(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 4, 0);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

function initMesh() {
  var radius = 50;
  var segments = 16;
  var rings = 16;
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments,rings),sphereMaterial);

  scene.add(sphere);

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();
});

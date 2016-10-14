$(function(){
console.log("Document loaded...");
var scene, camera, renderer;

var WIDTH = $('#game-board').width();
var HEIGHT = $('#game-board').height();

var SPEED = 0.01;
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    initMesh();
    initCamera();
    initLights();
    initRenderer();
    $('#game-board').append(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 30);
    camera.position.set(0, 1, 15);
    camera.lookAt(scene.position);

}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alphaTest: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

function initMesh() {
  var loader = new THREE.JSONLoader();
  loader.load('./tree2.json', function(geometry, materials) {
    var mesh_tree = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh_tree.position.set(0,.175,0);
    mesh_tree.scale.x = mesh_tree.scale.y = mesh_tree.scale.z = 1.0;
    scene.add(mesh_tree);

  });

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

init();
render();
});

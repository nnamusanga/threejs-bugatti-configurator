var scene, camera, renderer;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth/window.innerHeight,
    0.5,
    1000);
camera.position.z = 5;


renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


//cube
var geometry = new THREE.BoxGeometry(1,1,1);
var materal = new THREE.meshBasicMaterial({color: 0x00aaff});

var cube = new THREE.Mesh(geometry, materal);
scene.add(cube);


function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene,camera);
}
animate()

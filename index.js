
/*
var scene, camera, renderer;

var canvas = document.querySelector('.webg1')
scene = new THREE.Scene()



var controls = new THREE.OrbitControls(camera, renderer);
controls.update()


var abint = new THREE.AmbientLight(0x555500)
scene.add(abint)

var loader = new THREE.GLTFLoader()
loader.load('model/car.glb', function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(1,1,1)
    scene.add(root);
}, function(xhr){
    console.log((xhr.loader/xhr.total * 100) + "% loaded")
}, function(error){
    console.log('an error occurred')
})

var light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)
*/

/*

var geometry = new THREE.BoxGeometry(3,2,2)
var materal = new THREE.MeshBasicMaterial({
    color: 0x00ffee
})
var boxMesh = new THREE.Mesh(geometry, materal)
scene.add(boxMesh)
*/


/*
var size = {
    width: window.innerWidth,
    height: window.innerHeight 
}

camera = new THREE.PerspectiveCamera(
    75,
    size.width/size.height,
    0.1,
    100
)
camera.position.set(-1,15,30)
scene.add(camera)

renderer = new THREE.WebGL1Renderer({
   canvas: canvas
})


renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 5))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true




function animate(){
    requestAnimationFrame(animate);

 // loader.rotation.y += 0.01;

renderer.render(scene,camera);



}
animate()

*/




/*
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
//var materal = new THREE.meshBasicMaterial({color: 0x00aaff});
var materal = new THREE.MeshBasicMaterial({color: 0x00aaff})

var cube = new THREE.Mesh(geometry, materal);
scene.add(cube);


function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene,camera);
}
animate()
*/




var scene, camera, renderer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x4e4e4f)

camera = new THREE.PerspectiveCamera(50, window.innerWidth/innerHeight);
camera.position.set(100,200,1000);


/*
let kendali = new Object();
kendali.x = 1;
kendali.y = 1;
kendali.z = 2;

let gui = new dat.GUI();
gui.add(kendali, "x", -4,4,0.1);
gui.add(kendali, "y", -4,4);
gui.add(kendali, "z", -4,4);

*/

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*var material = new THREE.MeshStanderdMarerial({
    color: 0xF3FFE2,
    roughness: 0.5,
    metalness: 0.5,
});
*/
var controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.update();

var abint = new THREE.AmbientLight(0xe4e4e4,4)
scene.add(abint)
var loader = new THREE.GLTFLoader();
loader.load( 'model/aventador.gltf', function (gltf){
    gltf.scene.scale.set(30,30,30);
    scene.add(gltf.scene);
})


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    scene.rotation.y += 0.01;

}

animate()
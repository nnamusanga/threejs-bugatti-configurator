
var scene, camera, renderer;

var canvas = document.querySelector('.webg1')
scene = new THREE.Scene()



var loader = new THREE.GLTFLoader()
loader.load('model/scene.bin', function(bin){
    console.log(bin)
    const root = bin.scene;
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



var geometry = new THREE.BoxGeometry(3,2,2)
var materal = new THREE.MeshBasicMaterial({
    color: 0x00ffee
})
var boxMesh = new THREE.Mesh(geometry, materal)
scene.add(boxMesh)




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
camera.position.set(-1,1.3,6)
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

   boxMesh.rotation.y += 0.01;
renderer.render(scene,camera);




}
animate()






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
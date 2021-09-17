
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

camera = new THREE.PerspectiveCamera(50, window.innerWidth/innerHeight, 1, 10000);


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
renderer.toneMapping =  THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.3
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement);

/*var material = new THREE.MeshStanderdMarerial({
    color: 0xF3FFE2,
    roughness: 0.5,
    metalness: 0.5,
});
*/
var controls = new THREE.OrbitControls(camera,renderer.domElement);
camera.position.set( 1000, 300, 0 );
controls.update();
SetUpControls();


//setup controls
function SetUpControls() {
    controls.enableRotate = true
    controls.enableZoom = false
    //controls.minDistance = 0
    //controls.minDistance = 0 
    controls.enablePan = false
}

// var abint = new THREE.AmbientLight(0xe4e4e4,4)
// scene.add(abint)

var hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4)

var spotLight = new THREE.SpotLight(0xffa95c,4)
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001
spotLight.shadow.mapSize.width = 1024 * 4
spotLight.shadow.mapSize.height = 1024 * 4

scene.add(spotLight)
scene.add(hemiLight)

scene.add(new THREE.AxesHelper(500))


var car;
var loader = new THREE.GLTFLoader()
loader.load( 'model/aventador.gltf', function (gltf){
    car = gltf;
    car.scene.scale.set(40,40,40)
    scene.add(car.scene)
    
    //let newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
    
    car.scene.traverse((o) => {
        if(o.isMesh){
            o.castShadow = true
            o.receiveShadow = true
            if(o.material.map) o.material.map.anisotropy = 16;
        }
    });
    
    // car.scene.children[0].children[2].children[0].material = newMaterial
    // car.scene.children[0].children[2].children[1].material = newMaterial
    
    controls.target = car.scene.position
    controls.autoRotate = true
    controls.autoRotateSpeed = 1
    controls.maxPolarAngle = Math.PI/2.05;
    
    window.gltfObject = car.scene
})


//GARAGE========================================================================


var garage;
var gloader = new THREE.GLTFLoader()
gloader.load( 'model/Garage/scene.gltf', function (gltf){
    garage = gltf;
    garage.scene.scale.set(200,200,200)

    garage.scene.position.y = -13

    garage.scene.traverse((o) => {
        if(o.isMesh){
            o.castShadow = true
            o.receiveShadow = true
            if(o.material.map) o.material.map.anisotropy = 16;
        }
    });

    scene.add(garage.scene)
})


//SURFACE=======================================================================
//cube
// var geometry = new THREE.BoxGeometry(1000, 15, 600);
// var materal = new THREE.MeshLambertMaterial({color: 0x000055})

// var mesh = new THREE.Mesh(geometry, materal);

// //mesh.position.set(2,-2,-2)
// mesh.position.x = 2;
// mesh.position.y = -6;
// mesh.position.z = 2;

// //mesh.rotation.y = Math.PI / 2


// scene.add(mesh);
// /*
// var light = new THREE.PointLight(0xFFFFFF, 1, 500)
// light.position.set(10,0,25);
// scene.add(light);
// */
function animate(){
    requestAnimationFrame(animate);

    //UPDATE====================================================================
    controls.update()  
    
    car.scene.rotation.y = Math.PI / 1
    spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
    )
    //controls.noZoom += true

    //RENDEER===================================================================
    renderer.render(scene, camera);
}

animate()
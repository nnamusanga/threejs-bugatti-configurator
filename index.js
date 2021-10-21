var scene, camera, renderer,carTransformControls,manager,urls,textureLoader

scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

camera = new THREE.PerspectiveCamera(50, window.innerWidth/innerHeight, 1, 10000);

renderer = new THREE.WebGLRenderer({ alpha:true ,antialias:true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor( 0x000000, 1 )
renderer.sortObjects = false
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 1;

document.body.appendChild(renderer.domElement)

var controls = new THREE.OrbitControls(camera,renderer.domElement)
camera.position.set( 30, 10, 0 )
controls.update()



//Function to set orbit camera as new camera
function SetUpControls()
{

    scene.add(carTransformControls)
    
    window.car = car
    //Create new orbit controls
    controls.target = new THREE.Vector3(0,0,0)
    controls.enablePan = false;
    controls.enableZoom = false
    controls.maxZoom = 1
    controls.minZoom = -1
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = .7;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 20;
    
    
    setTimeout(function (){
        controls.autoRotateSpeed = .7
    }, 2300)
    
    controls.target = new THREE.Vector3(0,0,0)
    controls.maxPolarAngle = Math.PI / 2.05;
    
    

    //Recalculate context
    OnContextResized();
}

//Function will be called whenver the context is resized
function OnContextResized()
{
    //Recalculate the aspect ratio
    camera.aspect = window.innerWidth/window.innerHeight;
    //Set new renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Update the projection matrix
    camera.updateProjectionMatrix();
}



Initialize()


var car
var carScene
var jsonConfig

function Initialize() {

    //Load Current Settings
    $.getJSON("./model/meta.json", function(json)
    {
        //Get reference of the json object
        jsonConfig = json;

        //Load the aventador model
        LoadAventador(jsonConfig, scene, true);
        

        
        SetUpControls();
        
        LoadConfigurator(jsonConfig)
    });
    
}


function animate(){
    requestAnimationFrame(animate);

    //UPDATE====================================================================
    controls.update()  
    

    //RENDEER===================================================================
    renderer.render(scene, camera);
}

animate()
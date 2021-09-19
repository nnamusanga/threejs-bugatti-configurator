var scene, camera, renderer;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(50, window.innerWidth/innerHeight, 1, 10000);

renderer = new THREE.WebGLRenderer({ alpha:true ,antialias:true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor( 0x000000, 1 )
renderer.sortObjects = false
renderer.toneMappingExposure = 2
renderer.toneMapping = THREE.ACESFilmicToneMapping

document.body.appendChild(renderer.domElement)

var controls = new THREE.OrbitControls(camera,renderer.domElement)
camera.position.set( 30, 10, 0 )
controls.update()



//Function to set orbit camera as new camera
function SetUpControls()
{
    
    window.car = car
    //Create new orbit controls
    controls.target = new THREE.Vector3(0,0,0)
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.minPolarAngle = 0.75; //Uper
    controls.maxPolarAngle = 1.6; //Lower
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.07;
    controls.minDistance = 16
    controls.maxDistance = 32;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.05;

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



scene.add(new THREE.AxesHelper(500))

Initialize()


var car
var jsonConfig

function Initialize() {

    //Load Current Settings
    $.getJSON("./model/meta.json", function(json)
    {
        //Get reference of the json object
        jsonConfig = json;

        //Load the aventador model
        LoadAventador(jsonConfig, scene,controls);

        SetUpControls();
        
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
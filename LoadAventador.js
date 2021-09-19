function LoadAventador(config,scene,controls) {

    var manager = new THREE.LoadingManager()
    var textureLoader = new THREE.TextureLoader(manager)

    //The Cubemap path
    var r = "model/env/cubemap/";
    //The cubemap file urls
    var urls = [r + "posx.jpg", r + "negx.jpg",
        r + "posy.jpg", r + "negy.jpg",
        r + "posz.jpg", r + "negz.jpg"];

    var mCubeMap = new THREE.CubeTextureLoader(manager).load(urls);
    mCubeMap.format = THREE.RGBFormat;
    mCubeMap.mapping = THREE.CubeReflectionMapping;

    SetupEnvironment(scene,manager,urls, textureLoader)

    var stpIndex = 3;//getRandomInt(0,config.body_colors.colors.length-1);

    //Choose a random body color
    mCBodyColor = config.body_colors.colors[stpIndex].value;

    //Get the startup colors for configurables
    var dfCol_Body = webColorToHex(mCBodyColor);
    var dfCol_Mirror = webColorToHex(config.mirror_colors.colors[0].value);
    var dfCol_Alloys = webColorToHex(config.wheel_colors.colors[0].value);
    var dfCol_Caliper = webColorToHex(config.caliper_colors.colors[0].value);

    var AventadorAtlas_Albedo = LoadTextureCorrected(textureLoader, "model/AventadorAtlas_Albedo.png");
    var AventadorAtlas_Normal = LoadTextureCorrected(textureLoader, "model/AventadorAtlas_Normal.png");
    var LR_Brake_Albedo = LoadTextureCorrected(textureLoader, "model/LR_Brake_Albedo.png");
    var LR_Turn_Albedo = LoadTextureCorrected(textureLoader, "model/LR_Turn_Albedo.png");
    var LR_Reverse_Albedo = LoadTextureCorrected(textureLoader, "model/LR_Reverse_Albedo.png");
    var LR_Generic_Normal = LoadTextureCorrected(textureLoader, "model/LR_Generic_Normal.png");

    //Create the necessary materials
    var Mt_Abs_Black_Gloss = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        roughness: 0.0,
        metalness: 0.0,
        envMap: mCubeMap
    });
    var Mt_ABS_Black_Mat = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        roughness: 0.5,
        metalness: 0.5,
        envMap: mCubeMap
    });
    var Mt_Abs_White_Mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.0,
        metalness: 0.0,
        envMap: mCubeMap
    });
    var Mt_AlloyWheels = new THREE.MeshPhysicalMaterial({
        name: 'Mt_AlloyWheels',
        color: dfCol_Alloys,
        roughness: 0.1,
        metalness: 0.5,
        envMap: mCubeMap
    });

    var Mt_AventadorAtlas = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0.5,
        envMap: mCubeMap,
        map: AventadorAtlas_Albedo,
        transparent: true
    });

    var Mt_Body = new THREE.MeshPhysicalMaterial({
        name: 'Mt_Body',
        color: dfCol_Body,
        roughness: 0,
        metalness: 0.1,
        envMap: mCubeMap,
        reflectivity:.1,
        clearcoatRoughness:0
    });
    var Mt_BrakeCaliper = new THREE.MeshPhysicalMaterial({
        name: 'Mt_BrakeCaliper',
        color: dfCol_Caliper,
        roughness: 0.5,
        metalness: 0.5,
        envMap: mCubeMap
    });
    var Mt_Chrome = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 0.0, metalness: 1.0, envMap: mCubeMap});
    var Mt_Glass_Lens = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.0,
        metalness: 0.25,
        envMap: mCubeMap
    });

    var Mt_Glass_Translucent = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.0,
        metalness: 1.0,
        envMap: mCubeMap,
        transparent: true,
        opacity: 0.25
    });

    var Mt_Interior_Black = new THREE.MeshPhysicalMaterial({
        color: 0x525252,
        roughness: 0.5,
        metalness: 0.5,
        envMap: mCubeMap
    });
    var Mt_Metal_Black_Glossy = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        roughness: 0,
        metalness: 1,
        envMap: mCubeMap
    });
    var Mt_Metal_Brushed = new THREE.MeshPhysicalMaterial({
        color: 0x555555,
        roughness: 0.0,
        metalness: 1.0,
        envMap: mCubeMap
    });
    var Mt_Mirror = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 0.0, metalness: 1.0, envMap: mCubeMap});
    var Mt_MirrorCover = new THREE.MeshPhysicalMaterial({
        name: 'Mt_MirrorCover',
        color: dfCol_Body,
        roughness: 0.0,
        metalness: 0.0,
        envMap: mCubeMap
    });
    var Mt_Reflector_BL = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 1.0,
        metalness: 0.0,
        envMap: mCubeMap,
        map: LR_Brake_Albedo,
        normalMap: LR_Generic_Normal
    });
    var Mt_Reflector_RL = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 1.0,
        metalness: 0.0,
        envMap: mCubeMap,
        map: LR_Reverse_Albedo,
        normalMap: LR_Generic_Normal
    });
    var Mt_Reflector_TL = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 1.0,
        metalness: 0.0,
        envMap: mCubeMap,
        map: LR_Turn_Albedo,
        normalMap: LR_Generic_Normal
    });
    var Mt_TurnLights = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.5,
        metalness: 0.5,
        envMap: mCubeMap
    });
    var Mt_Tyres = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.5,
        metalness: 0.5,
        envMap: mCubeMap,
        map: AventadorAtlas_Albedo,
        normalMap: AventadorAtlas_Normal
    });
    var Mt_WindScreens = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        roughness: 0.0,
        metalness: 0.0,
        envMap: mCubeMap,
        transparent: true,
        opacity: 0.25
    });

    //The gltf object loader
    var gltfLoader = new THREE.GLTFLoader(manager);

    // Load a glTF resource
    gltfLoader.load(
        // resource URL
        'model/aventador.gltf',
        // called when the resource is loaded
        function (gltf) {
            //Take areference of the current gltf model
            car = gltf;

            car.scene.traverse(function (obj) {
                if (obj instanceof THREE.Mesh) {

                    //Assign new materials
                    if (obj.material.name == "Mt_Abs_Black_Gloss")
                        obj.material = Mt_Abs_Black_Gloss;
                    if (obj.material.name == "Mt_ABS_Black_Mat")
                        obj.material = Mt_ABS_Black_Mat;
                    if (obj.material.name == "Mt_Abs_White_Mat")
                        obj.material = Mt_Abs_White_Mat;
                    if (obj.material.name == "Mt_AlloyWheels")
                        obj.material = Mt_AlloyWheels;
                    if (obj.material.name == "Mt_AventadorAtlas")
                        obj.material = Mt_AventadorAtlas;
                    if (obj.material.name == "Mt_Body")
                        obj.material = Mt_Body;
                    if (obj.material.name == "Mt_BrakeCaliper")
                        obj.material = Mt_BrakeCaliper;
                    if (obj.material.name == "Mt_Chrome")
                        obj.material = Mt_Chrome;
                    if (obj.material.name == "Mt_Glass_Lens")
                        obj.material = Mt_Glass_Lens;
                    if (obj.material.name == "Mt_Glass_Translucent")
                        obj.material = Mt_Glass_Translucent;
                    if (obj.material.name == "Mt_Interior_Black")
                        obj.material = Mt_Interior_Black;
                    if (obj.material.name == "Mt_Metal_Black_Glossy")
                        obj.material = Mt_Metal_Black_Glossy;
                    if (obj.material.name == "Mt_Metal_Brushed")
                        obj.material = Mt_Metal_Brushed;
                    if (obj.material.name == "Mt_Mirror")
                        obj.material = Mt_Mirror;
                    if (obj.material.name == "Mt_MirrorCover")
                        obj.material = Mt_MirrorCover;
                    if (obj.material.name == "Mt_Reflector_BL")
                        obj.material = Mt_Reflector_BL;
                    if (obj.material.name == "Mt_Reflector_RL")
                        obj.material = Mt_Reflector_RL;
                    if (obj.material.name == "Mt_Reflector_TL")
                        obj.material = Mt_Reflector_TL;
                    if (obj.material.name == "Mt_TurnLights")
                        obj.material = Mt_TurnLights;
                    if (obj.material.name == "Mt_Tyres")
                        obj.material = Mt_Tyres;
                    if (obj.material.name == "Mt_WindScreens")
                        obj.material = Mt_WindScreens;


                }


                //If this is a rim object and not the first type
                if (obj.name.includes('Obj_Rim') && !obj.name.includes(config.wheel_designs.designs[0].value))
                    obj.visible = false;
            });

            
            
            //Add the gltf object to the scene
            scene.add(car.scene);

            controls.target = car.scene.position
            controls.autoRotate = true
            controls.autoRotateSpeed = 1
            controls.maxPolarAngle = Math.PI / 2.05;

            window.gltfObject = car.scene


           
            
        });
}


//Function to setup the environment
function SetupEnvironment(scene,manager,urls, textureLoader)
{
    //Create and add an ambient light
    var ambientLight = new THREE.AmbientLight( 0xffffff, .3 );
    scene.add( ambientLight );

    //Light Size
    var size=6;
    //Light Intensity
    var intensity = 6;
    //Light color
    var color =0xffffff;

    //The light width and height
    var lWidth = 12, lHeight = 6;

    //Add a front light
    var mFrontLight = CreateAreaLight(scene, color, intensity, new THREE.Vector2(lWidth,lHeight), true);
    mFrontLight.rotation.copy(Vector3DegToRadian({x:90, y:45, z:-90}));
    mFrontLight.position.copy(new THREE.Vector3( -26, 16, 0 ));

    //Add a back light
    var mBackLight = CreateAreaLight(scene, color, intensity, new THREE.Vector2(lWidth,lHeight), true);
    mBackLight.rotation.copy(Vector3DegToRadian({x:90, y:-45, z:90}));
    mBackLight.position.copy(new THREE.Vector3( 26, 16, 0 ));

    //Add a Right Light
    var mRightLight = CreateAreaLight(scene, color, intensity, new THREE.Vector2(lWidth,lHeight), true);
    mRightLight.rotation.copy(Vector3DegToRadian({x:135, y:0, z:180}));
    mRightLight.position.copy(new THREE.Vector3(0,16,18));

    //Add a left Light
    var mLeftLight = CreateAreaLight(scene, color, intensity, new THREE.Vector2(lWidth,lHeight), true);
    mLeftLight.rotation.copy(Vector3DegToRadian({x:45, y:0, z:0}));
    mLeftLight.position.copy(new THREE.Vector3(0,16,-18));

    //Load the environmet cubemap from file
    mCubeMap = new THREE.CubeTextureLoader(manager).load( urls );
    mCubeMap.format = THREE.RGBFormat;
    mCubeMap.mapping = THREE.CubeReflectionMapping;

    //Load the floor plane textures and set wrappings
    var DTX_Floor = textureLoader.load("model/env/asphalt_albedo.png");
    var NTX_Floor = textureLoader.load("model/env/asphalt_normal.png");
    var RTX_Floor = textureLoader.load("model/env/asphalt_rouphness.png");
    DTX_Floor.wrapS = DTX_Floor.wrapT = THREE.RepeatWrapping; DTX_Floor.repeat.set( 64, 64 );
    NTX_Floor.wrapS = NTX_Floor.wrapT = THREE.RepeatWrapping; NTX_Floor.repeat.set( 64, 64 );
    RTX_Floor.wrapS = RTX_Floor.wrapT = THREE.RepeatWrapping; RTX_Floor.repeat.set( 64, 64 );
    //Create the  floor material
    var Mt_Floor = new THREE.MeshStandardMaterial({roughness:1, metalness:0, map:DTX_Floor, normalMap:NTX_Floor, roughnessMap:RTX_Floor});
    //Create the floor plane object and add to the scene
    var mFloorPlane = new THREE.Mesh( new THREE.PlaneGeometry( 512, 512, 1,1 ), Mt_Floor );
    mFloorPlane.rotation.x = -Math.PI/2;
    scene.add( mFloorPlane );

    var DTX_Shadow = textureLoader.load("model/env/fake_shadow.png");
    var mShadowPlane = new THREE.Mesh( new THREE.PlaneGeometry( 36, 18, 1,1 ), new THREE.MeshBasicMaterial({color:0xffffff, map:DTX_Shadow, transparent:true}) );
    mShadowPlane.rotation.x = -Math.PI/2;
    mShadowPlane.position.y=0.05;
    scene.add( mShadowPlane );
}

//Function to convert webcolor to hex color
function webColorToHex(color) {
    return parseInt(color.replace("#", "0x"));
}

//Function to get a random int (min,max inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Function to convert vector3 from degree to radian
function Vector3DegToRadian(_vector3) {
    //The per dgree converter
    var degree = Math.PI / 180;
    //Return the new vector3 in radian
    return new THREE.Euler(_vector3.x * degree, _vector3.y * degree, _vector3.z * degree, 'XYZ');
}

//Function to convert points from right hand to left hand coordinate system
function CoordR2L(_point) {
    //Swap Y and Z with Z=-Y
    return {x: _point.x, y: _point.z, z: -_point.y};
}

//Function to get the distance between two Vector3
function distanceVector(V3A, V3Bs) {
    //Get the vector3 values delta
    var deltaX = V3A.x - V3Bs.x;
    var deltaY = V3A.y - V3Bs.y;
    var deltaZ = V3A.z - V3Bs.z;

    //Return the calculated distance
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
}

//Function to load texture corrected
function LoadTextureCorrected(_loader, _path) {
    //Load the texture
    var texture = _loader.load(_path);
    //Set repeat wrapping
    texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
    //Flip texture vertically
    texture.repeat.y = -1;
    //Return the corrected texture
    return texture;
}


//Function to create an area light
function CreateAreaLight(scene, color, intensity, size, visible)
{
    //Create an area light with parameters
    var rectLight = new THREE.RectAreaLight( color, intensity, size.x, size.y );
    //Add the ligh to the scene
    scene.add( rectLight );

    //Add visibility and back mesh if required
    if(visible)
    {
        var rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial() );
        rectLightMesh.scale.x = rectLight.width;
        rectLightMesh.scale.y = rectLight.height;
        rectLight.add( rectLightMesh );

        var rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        rectLightMeshBack.rotation.y = Math.PI;
        rectLightMesh.add( rectLightMeshBack );
    }

    //Return the created light
    return rectLight;
}


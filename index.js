var scene, camera, renderer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xff5f0f)

camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight);
camera.position.set(0, 100, 800);

renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);



function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}
animate()

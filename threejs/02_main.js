async function ocmCallback() {
  //New code for loading recursion modules
  function loadScript(url, isModule = false) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      if (isModule) {
        script.type = 'module';
      }
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  await loadScript(urls[0])
  await loadScript(urls[2])

  const renderer = new THREE.WebGLRenderer({ antialias: !0 });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.set(0, 0.6, 50.5);

  const ambientLight = new THREE.AmbientLight(0x330066, 0.5);
  scene.add(ambientLight);

  // Adding orbit controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Adding post processing
  const composer = new THREE.EffectComposer( renderer );
  const effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  const renderScene = new THREE.RenderPass( scene, camera );
  const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),1,2,0)
  effectCopy.renderToScreen = true;
  composer.addPass(renderScene);
  composer.addPass(bloomPass)
  composer.addPass(effectCopy)


  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(1, 1, 1);
  scene.add(light);

  const geometry = new THREE.TorusKnotGeometry(10, 2, 200, 20, 6, 8);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffaa, wireframe: false });
  const torusKnot = new THREE.Mesh(geometry, material); scene.add(torusKnot);

  scene.add(torusKnot);

  function animate() {
    requestAnimationFrame( animate );

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    //replace render function with composer
    //renderer.render( scene, camera );
    composer.render();

    //controls update
    controls.update();
  }
  animate();
  document.querySelector("#scene").appendChild(renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
}

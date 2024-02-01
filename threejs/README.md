### Use Three.js

1. Navigate to the `threejs` directory with `cd ../threejs`.
2. Minify your `02_main.js` file and save it as `compressed-inputs/02_main.min.js`.
    - If you have `minify` installed, run `minify 02_main.js > compressed-inputs/02_main.min.js` in the terminal.
    - If you don't have `minify`, just put the js code in `compressed-inputs/02_main.min.js` directly.
3. Run `make clean && make` in the terminal.
4. Your final file will be `index.html`.
5. The Index.html file will work locally, due to an addition from this fork. No need for additional changes


### PostProcessing inclusions
To enable postprocessing on your scene:
1. first initialize an EffectComposer:
2. Then initialize a RenderPass, with your Scene and Camera as inputs
3. Then initialize whatever pass you want. The available supported paths are listed below.
4. Add your RenderPass to the composer
5. Add your other passes to the composer
Then initialize a RenderPass 
```
// Adding post processing code
const composer = new THREE.EffectComposer( renderer );
const renderScene = new THREE.RenderPass( scene, camera );
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),1,2,0)
composer.addPass(renderScene);
composer.addPass(bloomPass)
```

In your `animate()` loop, you must also call the composer to render your scene, instead of the renderer directly. 
```
//replace renderer's render function with composer
//renderer.render( scene, camera );
composer.render();
```

The following Passes are available in the bundled recursive inscription :
1. BloomPass
2. RenderPass
3. UnrealBloomPass
4. GlitchPass
5. ShaderPass
   
ShaderPass can be used to apply any custom shader as a post processing effect, and some example shaders are included for you.
1. CopyShader
2. CombineShader
3. ConvolutionShader
4. LuminosityHighPassShader
5. LuminosityShader
6. SobelOperatorShader
Here's an example of how to initialize a ShaderPass with one of these:
```
const luminosityPass = new THREE.ShaderPass( THREE.LuminosityShader );
```

For more info and instructions checek out the [THREE.js docs on post-processing](https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing)

Here's how the example script looks with and without UnrealBloomPass
![Screenshot 2024-01-31 at 3 36 11 PM](https://github.com/matthewvollmer/OCM-Dimensions-Postproc/assets/20975124/3d219dbc-8297-45e9-bd0c-bd5964f7d1ba)
![Screenshot 2024-01-31 at 3 36 21 PM](https://github.com/matthewvollmer/OCM-Dimensions-Postproc/assets/20975124/166cfbf6-fa93-4294-b3f3-e5c771fae9b6)




### How to use OrbitControls
1. Initialize the OrbitControls module after initializing the Scene, camera and renderer.
```
controls = new THREE.OrbitControls(camera, renderer.domElement);
```

There's a whole bunch of options for [OrbitControls, learn more here](https://threejs.org/docs/?q=orbit#examples/en/controls/OrbitControls). Some examples:
```
controls.dampingFactor = 0.1;
controls.enableDamping = true;
controls.maxDistance = 85;
controls.minDistance = 10;
controls.enableZoom = true;
controls.enablePan = false;
controls.autoRotateSpeed = 1;
controls.autoRotate = true;
controls.enableDamping = true;
controls.target.set(0, 0, 0);
```

Then in your `animate()` function or animation loop, just make sure to update the controls
```
controls.update();
```



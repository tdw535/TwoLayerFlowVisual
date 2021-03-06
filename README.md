# TwoLayerFlowVisual

The goal of the project is to have a nice visual display of
two layer flow (for shallow and deep) inside a browser
which will adjust the type of flow given the bounding box size

Personal goal is to learn more about WebAssembly and writing
C++ code that can be run inside the browser

## Pre-reqs

 (Ubuntu)
 
Download and install emscripten; add source location to ~/.bash_profile

Python v3.9 (lower versions may or may not work)

libfftw3.a

eigen

node_modules/three/build/three.js

node_modules/three/build/three.module.js

node_modules/three/examples/jsm/controls/OrbitControls.js

## Resources:

https://emscripten.org/docs/getting_started

https://medium.com/swlh/i-made-a-game-in-c-run-in-a-web-browser-and-so-can-you-2911b9fe2368

https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm

Cmake with VS code in linux
https://code.visualstudio.com/docs/cpp/cmake-linux

Sample WASM from CMake
https://github.com/adevaykin/minimal-cmake-emscripten-project

Setting up CMake projects for C++ with subdirectories
https://www.youtube.com/watch?v=SYgESCQeGJY

To setup the emc flags
https://github.com/emscripten-core/emscripten/issues/11817

---

Setting up the Build process using VSCode

- Make sure that cmake works
- Set up VSCode cmake settings to use the Emscripten tool chain; Make sure that it is pointed to the right spot where the EMScripten sdk is.
  ![Screenshot](README_Images/VSCodeEMScripten.png)

Passing information from cpp to JS using emscripten, tutorial
https://kapadia.github.io/emscripten/2013/09/13/emscripten-pointers-and-pointers.html

---

Webgl tutorial

https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API

https://github.com/invent-box/Learn-WebGL

https://www.youtube.com/watch?v=bP7_FeP9kU4&list=PL2935W76vRNHFpPUuqmLoGCzwx_8eq5yK&index=2

---

three js documentation
https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

https://www.youtube.com/watch?v=4ZgkMS5rH3E --Camera controls

---

Eigen documentation

Setting up cmake is difficult; 
Just install libeigen from the terminal
and use the local environment to build

https://gist.github.com/jeeho-ahn/07f943110731a0b4c2e73fc2fa8c96bf -- Setting up Eigen CMake
https://stackoverflow.com/questions/59607346/eigen-library-setup-in-cmakelists-txt

## Known packages/libraries used for license purposes

- EMScripten
- gl-matrix https://www.npmjs.com/package/gl-matrix

- ~~d3-3d https://github.com/Niekes/d3-3d~~

- three.js https://threejs.org/

- Eigen https://eigen.tuxfamily.org/index.php?title=Main_Page (MPL2)

---

To Build
Run:

bash generateBuild.sh


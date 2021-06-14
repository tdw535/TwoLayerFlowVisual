# TwoLayerFlowVisual

The goal of the project is to have a nice visual display of
two layer flow (for shallow and deep) inside a browser
which will adjust the type of flow given the bounding box size

Personal goal is to learn more about WebAssembly and writing
C++ code that can be run inside the browser

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
- Set up VSCode cmake settings to use the Emscripten tool chain
  ![Screenshot](README_Images/VSCodeEMScripten.png)

---

To Build
Run:

Make sure that .bash_profile is active

source ~/.bash_profile

emcmake cmake .

make

This will create a .js and .wasm file

Still need to figure out how to get the .html file working

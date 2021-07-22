# Plan

- [x] First get a basic pipeline working (or bash script) so that
      the compiling c++, then converting to html is easy
- [x] Get the html working

- [x] Need to work out the environment path (see emscripten documentation to make it work if not yet working)

- [x] How to handle all the ,js .wasm files being built in each project?
      -- Handle this manually by update the generate_build.sh each time
      -- Automate this process eventually

- [x] Need to make sure that all the build related stuff gets put in the build directory so that the main directory is not cluttered
      -- see above for caveat

- [x] Get a button in html that will call the cpp function

- [x] Get some organization for plotting some scatter points from a flat array

- [x] Figure out how to do camera panning/zooming

- [x] Fix memory leak by only allocating and deallocating the memory locations once

- [x] Get a working deployed webpage by doing the copy so that the main page is on index.html at the top level

- [ ] Figure out how to better organize the scene, renderer, camera, etc

- [ ] Figure out how to make scatter points look like a mesh/3d

- [ ] Make webpage prettier (use angular to brush up on it?)

- [ ] ~~Get simple visualizer working using D3-3D (look into three.js and webgl too if time permits)~~

- [x] Start using three.js

- [ ] Figure out how to use node modules with the express server

- [x] Get cpp result to show value inside html element

- [ ] Get a basic html template down that looks okay

- [ ] Start writing the C++ engine for two layer flow

- [x] Figure out linking of boost and/or FFTW3 and possibly even eigen; Got Eigen working

- [ ] Figure out how to do fft with eigen

- [ ] Start work on equation solver

- [ ] Figure out CMake for src/include directories for the cpp

- [ ] Engine should use the linearized equations for now for simplicity

## Some thoughts

It would be nice if the computational engine was swappable

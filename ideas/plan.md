# Plan

- First get a basic pipeline working (or bash script) so that
  the compiling c++, then converting to html is easy

(Maybe using cmake?)
Progress on cmake [---->xxxx]

- [x] Get the html working

- [x] Need to work out the environment path (see emscripten documentation to make it work if not yet working)

- How to handle all the ,js .wasm files being built in each project?
  -- Handle this manually by update the generate_build.sh each time

- [x] Need to make sure that all the build related stuff gets put in the build directory so that the main directory is not cluttered
      -- see above for caveat

- [ ] Get a button in html that will call the cpp function

- [ ] Get a basic html template down that looks okay

- [ ] Start writing the C++ engine for two layer flow

- [ ] Engine should use the linearized equations for now for simplicity

## Some thoughts

It would be nice if the computational engine was swappable

source ~/.bash_profile 


#cmake . -DCMAKE_PREFIX_PATH=./cppModules/ThirdParty/eigen-3.3.9
#-DEigen3_DIR=./cppModules/ThirdParty/eigen-3.3.9 
#emcmake cmake .  #-DCMAKE_TOOLCHAIN_FILE=/home/genbu/Projects/ThirdPartyLibraries/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_CROSSCOMPILING_EMULATOR=/home/genbu/Projects/ThirdPartyLibraries/emsdk/node/14.15.5_64bit/bin/node 
#cmake .  -DEigen3_DIR=./cppModules/ThirdParty/eigen-3.3.9  -DCMAKE_TOOLCHAIN_FILE=/home/genbu/Projects/ThirdPartyLibraries/emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake -DCMAKE_CROSSCOMPILING_EMULATOR=/home/genbu/Projects/ThirdPartyLibraries/emsdk/node/14.15.5_64bit/bin/node 
emcmake cmake .

make #-j2

#clean up cmake files

cd build
rm -rf bin
mkdir bin



jsDir=bin/js
jsDirDependencies=$jsDir/dependencies


mkdir $jsDir
echo "Done cleaning up bin in build"
echo "Moving .js .wasm files from TwoLayerFlowHead"
mv ../cppModules/TwoLayerFlowHead-exe/bin/TwoLayerFlowHead-exe.* $jsDir

echo "Current Dir"
pwd
echo "Copying html sample view to bin"



cp ../webModules/sampleView/helloWorld.html bin
cp ../webModules/sampleView/cppDataGetter.js $jsDir
cp ../webModules/sampleView/Visualizer.js $jsDir
cp ../webModules/sampleView/Simulator.js $jsDir
cp ../webModules/sampleView/CPPRunner.js $jsDir




echo "Copying dependencies"
mkdir $jsDirDependencies
cp ../webModules/node_modules/three/build/three.js $jsDirDependencies
cp ../webModules/node_modules/three/build/three.module.js $jsDirDependencies
cp ../webModules/node_modules/three/examples/jsm/controls/OrbitControls.js $jsDirDependencies



cd ..

echo "Cleaning up machine generated cmake files"
#Clean up
rm cmake_install.cmake
rm CMakeCache.txt
rm CPackConfig.cmake
rm CPackSourceConfig.cmake
rm CTestfile.cmake
rm DartConfiguration.tcl
rm Makefile
rm CTestTestfile.cmake


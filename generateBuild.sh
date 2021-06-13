source ~/.bash_profile 

emcmake cmake .
make

#clean up cmake files

cd build
rm -rf bin
mkdir bin
echo "Done cleaning up bin in build"
echo "Moving .js .wasm files from TwoLayerFlowHead"
mv ../cppModules/TwoLayerFlowHead-exe/bin/TwoLayerFlowHead-exe.* bin

echo "Current Dir"
pwd
echo "Copying html sample view to bin"
cp ../webModules/sampleView/helloWorld.html bin
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

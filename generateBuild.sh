source ~/.bash_profile 
cd build
emcmake cmake .
make
mkdir bin
mv ../TwoLayerFlowHead-exe/TwoLayerFlowHead-exe.* bin/



import createMyModule from './TwoLayerFlowHead-exe.js';


function testFunc(iModule,iData,iCol,iRow){




    const myMod = iModule;

    const pointsComputer = myMod.cwrap(
        'ComputePoints',	
        null,	// return type
        ['numer','number', 'number']	// argument types
    );

      // Get data byte size, allocate memory on Emscripten heap, and get pointer
      var dataBytes = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtr = myMod._malloc(dataBytes);

      // Copy data to Emscripten heap
      var dataHeap = new Uint32Array(myMod.HEAPU32.buffer, dataPtr, dataBytes);
      dataHeap.set(new Uint32Array(iData.buffer));

      // Call function and get result
      pointsComputer(dataHeap.byteOffset, iCol, iRow);
      var result = new Float32Array(dataHeap.buffer, dataHeap.byteOffset, iData.length);

      myMod._free(dataHeap.byteOffset);
      return result
}


 export function runTestFunc(){

    var result = createMyModule().then(MyModule => {
        console.log('WebAssembly done loading');

        var col = 2;
        var row = 3;
        var data = new Float32Array(col*row);
        console.log("Running test func");
        var result = testFunc(MyModule,data,col,row);

        console.log("Reviewing data");
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
        }  
        console.log("Done printing data");
        return data;
      });


    
    return result;
}


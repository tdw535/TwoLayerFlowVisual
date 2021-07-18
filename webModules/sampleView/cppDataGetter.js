import createMyModule from './TwoLayerFlowHead-exe.js';


function testFunc(iModule,iData,iCol,iRow){




    const myMod = iModule;

    const pointsComputer = myMod.cwrap(
        'ComputePoints',	
        null,	// return type
        ['number','number','number','number', 'number']	// argument types
    );



      var dataBytesX = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtrX = myMod._malloc(dataBytesX);


      var dataBytesY = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtrY = myMod._malloc(dataBytesY);

        // Get data byte size, allocate memory on Emscripten heap, and get pointer
        var dataBytesZ = iData.length * iData.BYTES_PER_ELEMENT;
        var dataPtrZ = myMod._malloc(dataBytesZ);


      // Copy data to Emscripten heap
      var dataHeapX = new Float32Array(myMod.HEAPU32.buffer, dataPtrX, dataBytesX);
      dataHeapX.set(new Float32Array(iData.buffer));

 
      // Copy data to Emscripten heap
      var dataHeapY = new Float32Array(myMod.HEAPU32.buffer, dataPtrY, dataBytesY);
      dataHeapY.set(new Float32Array(iData.buffer));



        // Copy data to Emscripten heap
        var dataHeapZ = new Float32Array(myMod.HEAPU32.buffer, dataPtrZ, dataBytesZ);
        dataHeapZ.set(new Float32Array(iData.buffer));


      // Call function and get result
      pointsComputer(dataHeapX.byteOffset,dataHeapY.byteOffset,dataHeapZ.byteOffset, iCol, iRow);

      var resultX = new Float32Array(dataHeapX.buffer, dataHeapX.byteOffset, iData.length);

      var resultY = new Float32Array(dataHeapY.buffer, dataHeapY.byteOffset, iData.length);
      var resultZ = new Float32Array(dataHeapZ.buffer, dataHeapZ.byteOffset, iData.length);
      
      //The free below messes up the values
      // for resultX[0] and resultX[1] for some reason
      const newResult = [resultX.slice(0),resultY.slice(0),resultZ.slice(0)]




      myMod._free(dataHeapX.byteOffset);
      myMod._free(dataHeapY.byteOffset);
      myMod._free(dataHeapZ.byteOffset);
      return newResult
}


//Try passing in function pointers
 export function runTestFunc(iVisualizer){

    var result;
    createMyModule().then(MyModule => {
        console.log('WebAssembly done loading');

        var col = 1;
        var row = 1000;
        var data = new Float32Array(col*row);
        console.log("Running test func");
        result = testFunc(MyModule,data,col,row);

        console.log("Reviewing data");
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
        }  
        console.log("Done printing data");

        console.log("Now visualizing");
        iVisualizer(result);

      });




    
    return result;
}


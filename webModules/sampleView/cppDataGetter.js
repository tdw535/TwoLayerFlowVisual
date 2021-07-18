import createMyModule from './TwoLayerFlowHead-exe.js';

var timeT = 0

function testFunc(iModule,iCol,iRow){


    const myMod = iModule;
    
    var data = new Float32Array(iCol*iRow);


    const pointsComputer = myMod.cwrap(
        'ComputePoints',	
        null,	// return type
        ['number','number','number','number', 'number','number']	// argument types
    );



      var dataBytesX = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtrX = myMod._malloc(dataBytesX);


      var dataBytesY = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtrY = myMod._malloc(dataBytesY);

        // Get data byte size, allocate memory on Emscripten heap, and get pointer
      var dataBytesZ = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtrZ = myMod._malloc(dataBytesZ);


      var dataX = new Float32Array(iData.buffer);
      var dataY = new Float32Array(iData.buffer);
      var dataZ = new Float32Array(iData.buffer);


      // Copy data to Emscripten heap
      var dataHeapX = new Float32Array(myMod.HEAPU32.buffer, dataPtrX, dataBytesX);
      dataHeapX.set(dataX);

 
      // Copy data to Emscripten heap
      var dataHeapY = new Float32Array(myMod.HEAPU32.buffer, dataPtrY, dataBytesY);
      dataHeapY.set(dataY);



      // Copy data to Emscripten heap
      var dataHeapZ = new Float32Array(myMod.HEAPU32.buffer, dataPtrZ, dataBytesZ);
      dataHeapZ.set(dataZ);


      // Call function and get result
      pointsComputer(dataHeapX.byteOffset,dataHeapY.byteOffset,dataHeapZ.byteOffset, iCol, iRow,timeT);

      // Move this to cpp
      timeT = timeT + 10;

      var resultX = new Float32Array(dataHeapX.buffer, dataHeapX.byteOffset, iData.length);

      var resultY = new Float32Array(dataHeapY.buffer, dataHeapY.byteOffset, iData.length);
      var resultZ = new Float32Array(dataHeapZ.buffer, dataHeapZ.byteOffset, iData.length);
      
      //The free below messes up the values
      // for resultX[0] and resultX[1] for some reason
      const newResult = [resultX.slice(0),resultY.slice(0),resultZ.slice(0)]




      myMod._free(dataHeapX.byteOffset);
      myMod._free(dataHeapY.byteOffset);
      myMod._free(dataHeapZ.byteOffset);


      resultX = null;
      resultY = null;
      resultZ = null;

      dataX = null;
      dataY = null;
      dataZ = null;
      data = null;

      dataHeapX = null;
      dataHeapY = null;
      dataHeapZ = null;
      return newResult
}


//Try passing in function pointers
 export function runTestFunc(iVisualizer){


    createMyModule().then(MyModule => {
        console.log('WebAssembly done loading');

        var col = 200;
        var row = 100;
        console.log("Running test func");
        var result = testFunc(MyModule,col,row);

        console.log("Reviewing data");
        // for (let i = 0; i < result.length; i++) {
        //     console.log(result[i]);
        // }  
        console.log("Done printing data");

        console.log("Now visualizing");
        iVisualizer(result);

        result = null;

      });
}


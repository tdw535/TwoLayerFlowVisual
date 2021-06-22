

function testFunc(iData,iCol,iRow){



    pointsComputer = Module.cwrap(
        'ComputePoints',	
        null,	// return type
        ['numer','number', 'number']	// argument types
    );

      // Get data byte size, allocate memory on Emscripten heap, and get pointer
      var dataBytes = iData.length * iData.BYTES_PER_ELEMENT;
      var dataPtr = Module._malloc(dataBytes);

      // Copy data to Emscripten heap
      var dataHeap = new Uint32Array(Module.HEAPU32.buffer, dataPtr, dataBytes);
      dataHeap.set(new Uint32Array(iData.buffer));

      // Call function and get result
      pointsComputer(dataHeap.byteOffset, iCol, iRow);
      var result = new Float32Array(dataHeap.buffer, dataHeap.byteOffset, iData.length);

      Module._free(dataHeap.byteOffset);
      return result
}


function runTestFunc(){
    var col = 2;
    var row = 3;
    var data = new Float32Array(col*row);
    var result = testFunc(data,col,row);
    
    console.log("Reviewing data");
    for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
    }  
    console.log("Done printing data");
    
}


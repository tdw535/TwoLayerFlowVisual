
import CreateMyModule from './WebRunner.js';

export default class CPPRunner {
    constructor(iRows,iCols){
        this.cppRunner = null;
        this.rows = iRows;
        this.cols = iCols;
        this.pointsComputer = null;
        this.timeT = 0;
        this.data = null; // Need for sizing, but should rename
        this.resultX = null;
        this.resultY = null;
        this.resultZ = null;

        this.dataHeapX = null;
        this.dataHeapY = null;
        this.dataHeapZ = null;
        this.InitializeCPPModule();

        
    }

    InitializeCPPModule(){
        CreateMyModule().then(module => {
            this.cppRunner = module;
            this.InitializeCPPData();
          });
    }


    InitializeCPPData(){
        if (null !== this.cppRunner){
            console.log("Initializing cpp module data");

            this.data = new Float32Array(this.cols*this.rows);
            var functionName = 'ComputePoints';
            this.pointsComputer = this.cppRunner.cwrap(
                functionName,	
                null,	// return type
                ['number','number','number','number', 'number','number']	// argument types
            );

        
            var dataBytesX = this.data.length * this.data.BYTES_PER_ELEMENT;
            var dataPtrX = this.cppRunner._malloc(dataBytesX);
    
    
            var dataBytesY = this.data.length * this.data.BYTES_PER_ELEMENT;
            var dataPtrY = this.cppRunner._malloc(dataBytesY);
    
            // Get data byte size, allocate memory on Emscripten heap, and get pointer
            var dataBytesZ = this.data.length * this.data.BYTES_PER_ELEMENT;
            var dataPtrZ = this.cppRunner._malloc(dataBytesZ);


            this.dataX = new Float32Array(this.data.buffer);
            this.dataY = new Float32Array(this.data.buffer);
            this.dataZ = new Float32Array(this.data.buffer);            
        
        
            // Copy data to Emscripten heap
            this.dataHeapX = new Float32Array(this.cppRunner.HEAPU32.buffer, dataPtrX, dataBytesX);
            this.dataHeapX.set(this.dataX);

        
            // Copy data to Emscripten heap
            this.dataHeapY = new Float32Array(this.cppRunner.HEAPU32.buffer, dataPtrY, dataBytesY);
            this.dataHeapY.set(this.dataY);


            // Copy data to Emscripten heap
            this.dataHeapZ = new Float32Array(this.cppRunner.HEAPU32.buffer, dataPtrZ, dataBytesZ);
            this.dataHeapZ.set(this.dataZ);
                    

            this.resultX = new Float32Array(this.dataHeapX.buffer, this.dataHeapX.byteOffset, this.data.length);

            this.resultY = new Float32Array(this.dataHeapY.buffer, this.dataHeapY.byteOffset, this.data.length);
            this.resultZ = new Float32Array(this.dataHeapZ.buffer, this.dataHeapZ.byteOffset, this.data.length);

        }
        else{
            console.log("CPP module not initialized");
        }
    
    }

    GetNewSurface(iSurfaceObj){
        return this.RunPointsComputer(iSurfaceObj);
    }

    RunPointsComputer(iSurfaceObj){
        if (null !== this.pointsComputer){

            // Call function and get result
            this.pointsComputer(this.dataHeapX.byteOffset,this.dataHeapY.byteOffset,this.dataHeapZ.byteOffset, this.rows, this.cols,this.timeT);

            // Move this to cpp
            this.timeT = this.timeT + 10;

            this.resultX.set(this.dataHeapX.buffer, this.data.length);

            this.resultY.set(this.dataHeapY.buffer,  this.data.length);
            this.resultZ.set(this.dataHeapZ.buffer,  this.data.length);

            // this.resultZ = new Float32Array(this.dataHeapZ.buffer, this.dataHeapZ.byteOffset, this.data.length);

            //The free below messes up the values
            // for resultX[0] and resultX[1] for some reason

            if (null !== this.resultX && null!==this.resultY && null !== this.resultZ)
            {
                iSurfaceObj.xData = this.resultX.slice(0);
                iSurfaceObj.yData = this.resultY.slice(0);
                iSurfaceObj.zData = this.resultZ.slice(0);
            }
            else{
                console.log("resultX,resultY, and/or resultZ is null");
            }


            // for (let i = 0; i < newResult.length; i++) {
            //     console.log(newResult[i]);
            // }  
            


            // this.resultX = null;
            // this.resultY = null;
            // this.resultZ = null;
        //   newResult = null;




        }
        else {
            console.log("Points computer is null");
        }
    }


    //Might want some sort of destructor to deal with  
    // myMod._free(this.dataHeapX.byteOffset);
    // myMod._free(this.dataHeapY.byteOffset);
    // myMod._free(this.dataHeapZ.byteOffset);



}

export function CreateCPPRunner(iRows,iCols){
    const cppRunner = new CPPRunner(iRows,iCols);
    return cppRunner;
}
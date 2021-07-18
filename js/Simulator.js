import  CPPRunner  from './CPPRunner.js';

//Meant to be a 2D simulator
// x,y which are independent
// which gives back output z
export default class Simulator {

    constructor(
        iRowNums,
        iColNums){
        this.rowNums = iRowNums;
        this.colNums = iColNums;
        this.contiueSimulation = true;
        this.xData = null;
        this.yData = null;
        this.zData = null;
        this.surfaceToVisualize = {
            xData: this.xData,
            yData: this.yData,
            zData: this.zData
        };
        this.cppRunner = new CPPRunner(this.rowNums,this.colNums);
        this.VisualizerFunc = null;
    }

    AddVisualizer(iVisualizerFunc){
        this.VisualizerFunc = iVisualizerFunc;
    }

    Update(){
        // Run Simulate code here and update visuals
        this.UpdateSurface();



        // console.log("before visualizing")
        // for (let i = 0; i < this.surfaceToVisualize.length; i++) {
        //   console.log(this.surfaceToVisualize[i]);
        //   }  

        if (null !== this.surfaceToVisualize){
            this.VisualizerFunc([this.surfaceToVisualize.xData,this.surfaceToVisualize.yData,this.surfaceToVisualize.zData]);
        }
        else{
            console.log("Surface is null");
        }

        // console.log("After viz")
        // for (let i = 0; i < this.surfaceToVisualize.length; i++) {
        //   console.log(this.surfaceToVisualize[i]);
        //   }  
        
    }

    UpdateSurface(){
        this.cppRunner.GetNewSurface(this.surfaceToVisualize);
    }

    //Add a pause cpp code section here

    ShouldContinueSimulation(){
        return this.contiueSimulation;
    }


}


export function CreateSimulator(iRows,iCols)
{
    const simulator = new Simulator(iRows,iCols);
    return simulator;
}
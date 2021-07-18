// import {runTestFunc}  from './cppDataGetter.js';
import Simulator from './Simulator.js';

import * as THREE from './dependencies/three.module.js';

//Dont like the mixing, but some issue with couldn't find 'three' with the line below this
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from './dependencies/OrbitControls.js'


//17 July 2021 Don't like having this renderer, camera, scene and orbit controls floating out 
// as global variables.
// Think of ways to better manage this
// and how to better manage the visualizing
var renderer, camera, scene,orbitControls

var doSimulation = false;

var rowNums = 100;
var colNums = 4;

const surfaceSimulator = new Simulator(rowNums,colNums);




export function VisualizeFunc(){

    console.log(`Hello World Visualizer`);
    surfaceSimulator.AddVisualizer(DoVizualize);


    doSimulation = surfaceSimulator.ShouldContinueSimulation();

    surfaceSimulator.Update();
}

function DoVizualize(result)
{

    scene.remove.apply(scene, scene.children);


    //Fix up later to make cleaner if possible
    var resultX = result[0];
    var resultY = result[1];
    var resultZ = result[2];


    // console.log("Vizualizing");


    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


    var points = [];

    // resultX,resultY,resultZ should all have same length;
    // 1D (flattened 2D array)
    // Use an assert here?
    for (let ii = 0; ii < resultX.length; ii++) {

        var x = resultX[ii];
        var y = resultY[ii];
        var z = resultZ[ii];
        points.push( new THREE.Vector3( x, y, z ) );

      } 

    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // const line = new THREE.Line( geometry, material );
    // scene.add( line );



    // var dotGeometry = new THREE.Geometry();
    // dotGeometry.vertices.push(new THREE.Vector3( 0, 0, 0));
    var dotMaterial = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
    var dot = new THREE.Points( geometry, dotMaterial );
    scene.add( dot );


    renderer.render( scene, camera );


    geometry.dispose();
    dotMaterial.dispose();
    // dot.dispose();
    material.dispose();
   
    window.requestAnimationFrame(animate);
    points = null;
    resultX = null;
    resultY = null;
    resultZ = null;
    dotMaterial = null;
    dot = null;
    material = null;
    geometry = null;

    // console.log("Done visualizing");
}




function Init3DView()
{
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
    //const camera = new THREE.OrthographicCamera(-10,10,-10,10,0.01,50);
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 20, 0, 0 );
    
    scene = new THREE.Scene();



    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(5, 0, 5);
 
    orbitControls.enablePan = true;
    //orbitControls.maxPolarAngle = Math.PI / 2;
   
    orbitControls.enableDamping = true;


    orbitControls.mouseButtons = {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: THREE.MOUSE.RIGHT,
        RIGHT: THREE.MOUSE.RIGHT
    }


    Simple2DCupVisualize();

}



function Simple2DCupVisualize()
{

    scene.remove.apply(scene, scene.children);
    console.log("Vizualizing");

    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


    const points = [];


    points.push( new THREE.Vector3( 0, 10, 0 ) );
    points.push( new THREE.Vector3( 10, 0, 0 ) );
    points.push( new THREE.Vector3( 0, -10, 0 ) );
    points.push( new THREE.Vector3( -10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );

    scene.add( line );
    renderer.render( scene, camera );

    console.log("Done visualizing");

   
    window.requestAnimationFrame(animate);


    console.log("Done visualizing");
}


function animate(){
    setTimeout(()=> {
    orbitControls.update();
    renderer.render(scene,camera);



    // How to make a better update loop?
    // running out of memoery
    if (true === doSimulation) {
        surfaceSimulator.Update(); 
        //surfaceSimulator.Update(); 

    }
    else {
        window.requestAnimationFrame(animate);  
    }
    //else dont run simulation

    // window.requestAnimationFrame(animate);
     }, 20);
}

function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

window.onload = Init3DView;
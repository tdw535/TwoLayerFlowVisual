import {runTestFunc}  from './cppDataGetter.js';
import * as THREE from './dependencies/three.module.js';



export function visualizeFunc(){

    console.log(`Hello World Visualizer`);
    var result = runTestFunc(DoVizualize);


}

function DoVizualize(result)
{

    //Fix up later to make cleaner if possible
    const resultX = result[0];
    const resultY = result[1];
    const resultZ = result[2];


    console.log("Vizualizing");


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    const camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 500 );
    camera.position.set( 0, 0, 100 );
    camera.lookAt( 20, 0, 0 );
    
    const scene = new THREE.Scene();


    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );


    const points = [];

    //resultX,resultY,resultZ should all have same length;
    //1D (flattened 2D array)
    // Use an assert here?
    for (let ii = 0; ii < resultX.length; ii++) {

        var x = resultX[ii];
        var y = resultY[ii];
        var z = resultZ[ii];
        points.push( new THREE.Vector3( x, y, z ) );

      } 


    // points.push( new THREE.Vector3( 0, 10, 0 ) );
    // points.push( new THREE.Vector3( 10, 0, 0 ) );
    // points.push( new THREE.Vector3( 0, -10, 0 ) );
    // points.push( new THREE.Vector3( -10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );

    scene.add( line );
    renderer.render( scene, camera );

    console.log("Done visualizing");
}

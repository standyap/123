{
console.log("initialized")
    
/**
 *  Show bar stool
 */

let helperBarStool = new THREE.BoxHelper( scene.getObjectByName( "bar_stool" ), 0xffff00 );

document.getElementById("bar_stool_icon").addEventListener("click", addBarStool)
function addBarStool()
{
    scene.getObjectByName( "bar_stool_1" ).visible = true
    scene.getObjectByName( "bar_stool_2" ).visible = true
    scene.add(helperBarStool)

}

/**
 *  Drag move bar stool setup
 */  
const objectsBarStool = []
objectsBarStool.push(scene.getObjectByName( "bar_stool_1" ))
objectsBarStool.push(scene.getObjectByName( "bar_stool_2" ))
const dragBarStool = new DragControls(objectsBarStool, camera, renderer.domElement)

   
/**
 *  Drag Move bar stool
 */ 


		
dragBarStool.addEventListener( 'dragstart', function () 
{
scene.add(helperBarStool)
controls.enabled = false; } );

dragBarStool.addEventListener( 'drag', onDragEvent );
dragBarStool.addEventListener( 'drag', function () {helperBarStool.update()} );
dragBarStool.addEventListener( 'dragend', function () {scene.remove(helperBarStool), controls.enabled = true } )

var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
//var intersects = new THREE.Vector3();


function onMouseMove(event)
{
mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
raycaster.setFromCamera(mouse, camera);
var intersects = raycaster.intersectObject(objectsBarStool)

for (let i = 0; i< intersects.length; i++)
{
    console.log(intersects);
}
}
window.addEventListener( 'mousemove', onMouseMove  );

function onDragEvent(e) {

raycaster.setFromCamera(mouse, camera);
raycaster.ray.intersectPlane(plane, intersects);

scene.getObjectByName( "bar_stool_1" ).position.set(intersects.x, intersects.y, intersects.z);
scene.getObjectByName( "bar_stool_2" ).position.set(intersects.x, intersects.y, intersects.z); //e değil de bar stool_1,2 gibi yazarsan tam tıkladığın yerden değil de farklı bir yerden drage başlıyor.
console.log('drag')
}

const objectsDragFront = []
const dragFront = scene.getObjectByName( "drag_front" )
objectsDragFront.push(scene.getObjectByName( "drag_front" ))
const dragDragFront = new DragControls(objectsDragFront, camera, renderer.domElement)
// Limit Drag front movement

function constDragFront()
{
    dragFront.position.y = 0
    dragFront.position.x = 0
if (dragFront.position.z < 0) 
{
    dragFront.position.z = 0
} 
else if (dragFront.position.z > 6) 
{
    dragFront.position.z = 6
}
}

/**
 *  Drag Move drag front
 */ 

dragDragFront.addEventListener( 'dragstart', ()=> 
{
console.log('drag start')
controls.enabled = false    
})

dragDragFront.addEventListener ( 'drag', ()=>
{
constDragFront()
console.log('drag')


    
// morphTargetDictionary: back: 0depth: 4floor_height: 5left: 2right: 1width: 3

 if (dragFront.position.z < 0.25)
    {
        dragFront.position.z = 0
        scene.getObjectByName( "stand_1" ).morphTargetInfluences[4]=0
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4]=0
        scene.getObjectByName( "back_wall_1" ).position.z = 1.9
        scene.getObjectByName( "back_wall_2" ).position.z = 1.9
        
    } 
    else if (dragFront.position.z >= 0.25 && dragFront.position.z < -0.75)
    {
        dragFront.position.z = 0.6
        scene.getObjectByName( "stand_1" ).morphTargetInfluences[4]= 0.17
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4]= 0.17
        scene.getObjectByName( "back_wall_1" ).position.z = 2.4
        scene.getObjectByName( "back_wall_2" ).position.z = 2.4
       
    }
    else if (dragFront.position.z >= 0.75 && dragFront.position.z < 1.25)
    {
        dragFront.position.z = 1.0023
        scene.getObjectByName( "stand_1" ).morphTargetInfluences[4]= 0.33
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4]= 0.33
        scene.getObjectByName( "back_wall_1" ).position.z = 2.9
        scene.getObjectByName( "back_wall_2" ).position.z = 2.9
        
    } 
     
      
    })
    dragDragFront.addEventListener( 'dragend', ()=> 
    {
    console.log('drag end')
    controls.enabled = true
    
    })
} 
# ##### ###### ##   ## #######  
## ## ##   ##   ### ###  ##   #  
   ##      ##   #######  ##      
   ##      ##   ## # ##  ####    
   ##      ##   ##   ##  ##      
   ##      ##   ##   ##  ##   #  
  ####   ###### ### ### #######  
                                 
  setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, "1000");

  
setTimeout(myFunction, 3000)
function myFunction() 
{
  
}

##   ##  ##### ######  ######  ##  ##  
### ### ### ### ##  ##  ##  ## ##  ##  
####### ##   ## ##  ##  ##  ## ##  ##  
## # ## ##   ## #####   #####  ######  
##   ## ##   ## ## ##   ##     ##  ##  
##   ## ### ### ## ##   ##     ##  ##  
### ###  ##### #### ## ####    ##  ##  
                                       
// https://jsfiddle.net/3wtwzuh3/3/
// Create two different cubes for morphing
geometry = new THREE.BoxGeometry(100, 100, 100);
geometryMorph = new THREE.BoxGeometry(200, 400, 200);

material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true, morphTargets: true  } );

// Set morphtargets for cube
geometry.morphTargets[0] = {name: 't1', vertices: geometryMorph.vertices};
geometry.computeMorphNormals();

mesh = new THREE.Mesh( geometry, material );

scene.add(mesh);

// Dat gui controls
var guiControls = new function () {
  this.influence1 = 0;
  this.update = function () {
  	
    // Update morphtarget influence on change of control
    mesh.morphTargetInfluences[0] = guiControls.influence1;
    render();
  };
};

var gui = new dat.GUI();
gui.add(guiControls, 'influence1', 0, 1).onChange(guiControls.update);

function render() {
		renderer.render( scene, camera );
    
    // Outputting the Y pos of first vertex for demo purposes
    elInfo.innerHTML = getMorphValue();
}

render();

function getMorphValue() {

	var morphTargets = mesh.geometry.morphTargets;
	var morphInfluences = mesh.morphTargetInfluences;

	var vA = new THREE.Vector3();
	var tempA = new THREE.Vector3();

	var fvA = geometry.vertices[ 0 ]; // the vertex to transform

	for ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {

		var influence = morphInfluences[ t ];

		if ( influence === 0 ) continue;

		var targets = morphTargets[ t ].vertices;

		vA.addScaledVector( tempA.subVectors( targets[ 0 ], fvA ), influence );

	}

	vA.add( fvA ); // the transformed value

	return vA.y;

}

#####  ##   ## ######  
##   ## ##   ##   ##    
##      ##   ##   ##    
## #### ##   ##   ##    
##   ## ##   ##   ##    
##   ## ##   ##   ##    
 #####   #####  ######  

// IMPORT GUI
 import * as dat from 'three/examples/jsm/libs/lil-gui.module.min.js'
                        
// Dat gui controls
var guiControls = new function () {
    this.influence1 = 0;
    this.update = function () {
        
      // Update morphtarget influence on change of control
      mesh.morphTargetInfluences[0] = guiControls.influence1;
      render();
    };
  };
  
  var gui = new dat.GUI();
  gui.add(guiControls, 'influence1', 0, 1).onChange(guiControls.update);
 
  ##   ##   ###   # ##### ######   
  ### ###  ## ## ## ## ##  ##  ##  
  ####### ##   ##   ##     ##  ##  
  ## # ## ##   ##   ##     #####   
  ##   ## #######   ##     ## ##   
  ##   ## ##   ##   ##     ## ##   
  ### ### ##   ##  ####   #### ##  
                                   
  

    let texture = new THREE.TextureLoader().load( "./media/carpet0_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material.map = texture */

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
   


    texture.repeat.set( 0.5, 0.5 );

import { newFunction } from "./newFunction";

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
         /**
         * Tried to write div in Java
         */
        let switch1 = document.createElement('toogle_switch_left_wall')
        let switch2 = document.createElement('toogle_switch_left_wall_switch')
        let text = document.querySelector(".toogle_switch_text").innerHTML += 'left wall';
        text.style.marginLeft = 'margin-left:-5px'
        switch1.appendChild(text)
        switch1.appendChild(switch2)
        switch2.setAttribute("type", "checkbox");
        switch2.classList.add("switch");
             
        
        /**
         *  Show Hide Walls
         */
        //LEFT WALL
        document.addEventListener('DOMContentLoaded', function ()
        {
            let checkbox = document.getElementById("toogle_switch_left_wall_switch")

            checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                scene.getObjectByName( "left_wall_1" ).visible = true;
                scene.getObjectByName( "left_wall_2" ).visible = true;
                console.log('Checked');
            } else {
                scene.getObjectByName( "left_wall_1" ).visible = false;
                scene.getObjectByName( "left_wall_2" ).visible = false;
                console.log('Not Checked');
            }
            });
        });

    

        //BACK WALL
        document.addEventListener('DOMContentLoaded', function ()
        {
            let checkbox = document.getElementById("toogle_switch_back_wall_switch")
        
            checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                scene.getObjectByName( "back_wall_1" ).visible = true;
                scene.getObjectByName( "back_wall_2" ).visible = true;
                console.log('Checked');
            } else {
                scene.getObjectByName( "back_wall_1" ).visible = false;
                scene.getObjectByName( "back_wall_2" ).visible = false;
                console.log('Not Checked');
            }
            });
        });

        //RIGHT WALL
        document.addEventListener('DOMContentLoaded', function ()
        {
            let checkbox = document.getElementById("toogle_switch_right_wall_switch")
        
            checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                scene.getObjectByName( "right_wall_1" ).visible = true;
                scene.getObjectByName( "right_wall_2" ).visible = true;
                console.log('Checked');
            } else {
                scene.getObjectByName( "right_wall_1" ).visible = false;
                scene.getObjectByName( "right_wall_2" ).visible = false;
                console.log('Not Checked');
            }
            });
        });

        //RAISED FLOOR SWITCH
        document.addEventListener('DOMContentLoaded', function ()
        {
        let checkbox = document.getElementById("toogle_switch_raised_floor_switch")

        checkbox.addEventListener('change', function () {
        if (checkbox.checked)
        {
            scene.getObjectByName( "stand_1" ).morphTargetInfluences[5]=1
            scene.getObjectByName( "stand_2" ).morphTargetInfluences[5]=1
            console.log('Checked');
        } 
        else
        {
            scene.getObjectByName( "stand_1" ).morphTargetInfluences[5]=0
            scene.getObjectByName( "stand_2" ).morphTargetInfluences[5]=0
            console.log('Not Checked');
        }
        });
        });

         //FLOOR LIGHT SWITCH
         document.addEventListener('DOMContentLoaded', function ()
         {
        let checkbox = document.getElementById("toogle_switch_floor_light_switch")

        checkbox.addEventListener('change', function () {
        if (checkbox.checked)
        {
        
            console.log(scene.getObjectByName( "stand_2" ).material);
            
            scene.getObjectByName( "stand_2" ).material.emissive.setStyle("#FFFAF0")
            
        console.log('Checked');
        } 
        else
        {
            scene.getObjectByName( "stand_2" ).material.emissive.setStyle("#000000")
            console.log('Not Checked');
        }
        });
        });

        //DARK MODE SWITCH
        document.addEventListener('DOMContentLoaded', function ()
        {
        let checkbox = document.getElementById("toogle_switch_dark_theme_switch")

        checkbox.addEventListener('change', function () {
        if (checkbox.checked)
        {
        global.envMapIntensity = 1.5
        console.log('Checked');
        } 
        else
        {
        global.envMapIntensity = 0.5
        console.log('Not Checked');
        }
        });
        });



const myTimeout = setTimeout(loadScrool, 500);

function loadScrool()
{
    
}


export class ScroolPanel
{
    constructor()
    {
    this.scroolFunction()
    
    }
            scroolFunction()
            {
                /**
                 * Left Panel
                 */
                function scrollByDownLeft()
                {
                document.getElementById("left_panel_icon_group").scrollBy(0, -50);
                }
                function scrollByUpLeft()
                {
                document.getElementById("left_panel_icon_group").scrollBy(0, 50);
                }
                document.getElementById("up_icon_left_panel").addEventListener("click", scrollByDownLeft);
                document.getElementById("down_icon_left_panel").addEventListener("click", scrollByUpLeft);
                /**
                 * Right Panel
                 */
                function scrollByDownRight()
                {
                document.getElementById("right_panel_icon_group").scrollBy(0, -50);
                }
                function scrollByUpRight()
                {
                document.getElementById("right_panel_icon_group").scrollBy(0, 50);
                }
                document.getElementById("up_icon_right_panel").addEventListener("click", scrollByDownRight);
                document.getElementById("down_icon_right_panel").addEventListener("click", scrollByUpRight);
                       
        }
}



 /* const myTimeout = setTimeout(loadScrool, 500);
        function loadScrool()
        {
            const scroolPanel = new ScroolPanel()
            
        } */

export const checkbox = document.getElementById("toogle_switch_right_wall_switch")
export const obj1 = scene.getObjectByName( "right_wall_1" )
export const obj2 = scene.getObjectByName( "right_wall_2" )




#####  ######    ###    #####   
 ## ##  ##  ##  ## ##  ##   ##  
 ##  ## ##  ## ##   ## ##       
 ##  ## #####  ##   ## ## ####  
 ##  ## ## ##  ####### ##   ##  
 ## ##  ## ##  ##   ## ##   ##  
#####  #### ## ##   ##  #####   
 


//console.log(bBox1.intersectsBox(bBox2))
const stand = scene.getObjectByName( "stand_1" )

/* let bBox1 = new THREE.Box3().setFromObject(stand); */

let barStool = scene.getObjectByName( "bar_stool")
/*  let bBox2 = new THREE.Box3().setFromObject(barStool);
console.log(bBox1.intersectsBox(bBox2))
*/



/**
    *  Drag Hover 
    */
function dragFuncBarStool()
{
    const dragBarStool = new DragControls(objectsBarStool, camera, renderer.domElement)
    
    dragBarStool.transformGroup = true //bu ayar ile drag parent objeye etki edebiliyor bu ayar false olursa drag direk children'a etki ediyor.ama drag control obj bölümünde group olarak belirtilmesi de gerekiyor.
    
    dragBarStool.addEventListener( 'dragstart', function () 
    {
        scene.add(helperBarStool)
        controls.enabled = false; 
      //  window.addEventListener( 'mousemove', onMouseMove)           

      //  window.removeEventListener('mousemove', onMouseMove)   //drag start aynı zamanda click görevi görüyor.çünkü hover anında fare imleci zaten objeyle kesiştiğinden "standın herhangi bir yerinde" click drag start oluyor.
                
                           
    })
    
    dragBarStool.addEventListener( 'drag' )
    {  

      /*       barStool.position.y = 0.1
        
        if (barStool.position.z < -2) 
        {
            barStool.position.z = -2
            
        } 
        else if (barStool.position.z > 2) 
        {
            barStool.position.z = 2
            
        }   

        if (barStool.position.x < -2) 
        {
            barStool.position.x = -2
            
        } 
        else if (barStool.position.x > 2) 
        {
            barStool.position.x = 2
            
        }  */ 
        helperBarStool.update()
    }


    dragBarStool.addEventListener( 'dragend', function () {scene.remove(helperBarStool), controls.enabled = true } )

    dragBarStool.addEventListener( 'hoveron', function () {console.log("hover on"),scene.add(helperBarStool)})
} 

    const bar_stool = new Group();
    const bar_stool1 = scene.getObjectByName( "bar_stool_1" )
    const bar_stool2 = scene.getObjectByName( "bar_stool_2" )
    bar_stool.add( bar_stool1 );
    bar_stool.add( bar_stool2 );
    scene.add( bar_stool );

/* const objects = [];
objects.push( scene.getObjectByName( "bar_stool_1" ) );
const dragControls = new THREE.DragControls(objects, camera, renderer.domElement);

dragControls.addEventListener( 'dragstart', function ( event ) {
 console.log('drag start');
});
dragControls.addEventListener ( 'drag', function( event ){
 console.log('drag');
 event.scene.getObjectByName( "bar_stool_1" ).position.z = 0; // This will prevent moving z axis, but will be on 0 line. change this to your object position of z axis.
})
dragControls.addEventListener( 'dragend', function ( event ) {
 console.log('drag end');
}); */


/**
 *  Show bar stool
 */
document.getElementById("bar_stool_icon").addEventListener("click", addBarStool);
function addBarStool()
{
    scene.getObjectByName( "bar_stool_1" ).visible = true;
    scene.getObjectByName( "bar_stool_2" ).visible = true;
     
}


scene.getObjectByName( "stand_1" ).material.needsUpdate = true
scene.getObjectByName( "stand_2" ).material.needsUpdate = true

//CONSTRAINTS
const drag_front = scene.getObjectByName( "drag_front" )
/* drag_front.userData.limit = 
{
min: new THREE.Vector3(0, 0, -6),
max: new THREE.Vector3(0, 0, 0)
}
drag_front.userData.update = function()
{
    drag_front.position.clamp(drag_front.userData.limit.min, drag_front.userData.limit.max)
}


 /*    if (drag_front.position.z > -0.25)
    {
        drag_front.position.z = 0
        scene.getObjectByName( "stand_1" ).morphTargetInfluences[4]=0
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4]=0
        scene.getObjectByName( "back_wall_1" ).position.z = 1.9
        scene.getObjectByName( "back_wall_2" ).position.z = 1.9
    } 
    else if (drag_front.position.z <= -0.25 && drag_front.position.z > -0.75)
    {
        drag_front.position.z = 0.6
        scene.getObjectByName( "stand_1" ).morphTargetInfluences[4]= 0.17
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4]= 0.17
        scene.getObjectByName( "back_wall_1" ).position.z = 2.4
        scene.getObjectByName( "back_wall_2" ).position.z = 2.4
    }
    else if (drag_front.position.z <= -0.75 && drag_front.position.z > -1.25)
    {
        drag_front.position.z = 1.0023
        scene.getObjectByName( "stand_1" ).morphTargetInfluences[4]= 0.33
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4]= 0.33
        scene.getObjectByName( "back_wall_1" ).position.z = 2.9
        scene.getObjectByName( "back_wall_2" ).position.z = 2.9
    } */


  ####   #####  ##   ##  #####   ##### ####    #######  
 ##  ## ### ### ###  ## ##   ## ### ### ##      ##   #  
##      ##   ## #### ## ##      ##   ## ##      ##      
##      ##   ## #######  #####  ##   ## ##      ####    
##      ##   ## ## ####      ## ##   ## ##      ##      
 ##  ## ### ### ##  ### ##   ## ### ### ##  ##  ##   #  
  ####   #####  ##   ##  #####   ##### ####### #######  
                                                        


console.log(
    "x = " + Math.round(cube.position.x),
    "y = " + Math.round(cube.position.y),
    "z = " + Math.round(cube.position.y))


    console.log("back wall_1 parent is:" + scene.getObjectByName( "back_wall_1" ).parent.name)
    console.log("stand_1 parent is:" + scene.getObjectByName( "stand_1" ).parent.name)
    console.log("bar_stool group object:" + bar_stool)



 ##### ######   #####  ##   ## ######   
##   ## ##  ## ### ### ##   ##  ##  ##  
##      ##  ## ##   ## ##   ##  ##  ##  
## #### #####  ##   ## ##   ##  #####   
##   ## ## ##  ##   ## ##   ##  ##      
##   ## ## ##  ### ### ##   ##  ##      
 ##### #### ##  #####   #####  ####     
                                        


    const bar_stool = new THREE.Group();
    const bar_stool1 = scene.getObjectByName( "bar_stool_1" )
    const bar_stool2 = scene.getObjectByName( "bar_stool_2" )
    bar_stool.add( bar_stool1 )
    bar_stool.add( bar_stool2 )
    scene.add( bar_stool )

    

/*
    ##  ## ####### ####    ###### ####### ######   #####   
    ##  ##  ##   #  ##      ##  ## ##   #  ##  ## ##   ##  
    ##  ##  ##      ##      ##  ## ##      ##  ## ##       
    ######  ####    ##      #####  ####    #####   #####   
    ##  ##  ##      ##      ##     ##      ## ##       ##  
    ##  ##  ##   #  ##  ##  ##     ##   #  ## ##  ##   ##  
    ##  ## ####### ####### ####   ####### #### ##  #####   
*/                                                          
   
                                                        
/**
 *  Axis Helper
 */ 
const axesHelper = new THREE.AxesHelper( 5 );
axesHelper.position.y = 0.05;
scene.add( axesHelper );

/**
 *  Grid Helper
 */ 
scene.add(new THREE.GridHelper(50, 50));
let grid = new THREE.GridHelper(20, 20, "aqua", "aqua");
grid.position.y = 0.01;
getObjectByName( "stand" ).add(grid);






 ##  ##  #####  ##   ## ####### ######   
 ##  ## ### ### ##   ##  ##   #  ##  ##  
 ##  ## ##   ## ##   ##  ##      ##  ##  
 ###### ##   ##  ## ##   ####    #####   
 ##  ## ##   ##  ## ##   ##      ## ##   
 ##  ## ### ###   ###    ##   #  ## ##   
 ##  ##  #####    ###   ####### #### ##  
                                         


/**
 *  Hover bar stool BU ŞEKİLDE YAPILIRSA VERGEDEKİ GİBİ POINTER DROP ŞEKLİNDE OLUYOR.
 */

if (intersects.length > 0)
{
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObject(scene.getObjectByName( "bar_stool" ));
    console.log('hover')
    
    intersects[0].scene.getObjectByName( "bar_stool" )
    scene.add(helperBarStool)
}


window.addEventListener( 'mousemove', onDragEvent, false );
window.addEventListener( 'mousemove', onMouseMove, false );
		
dragBarStool.addEventListener( 'dragstart', function () 
{
scene.add(helperBarStool)
controls.enabled = false; } );
dragBarStool.addEventListener( 'drag', onDragEvent );
dragBarStool.addEventListener( 'drag', function () {helperBarStool.update()}  );
dragBarStool.addEventListener( 'dragend', function () {scene.remove(helperBarStool), controls.enabled = true } )

}
var mouse = new THREE.Vector2();

function onMouseMove(event)
{
mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
console.log('hover')
}

var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
var raycaster = new THREE.Raycaster();
var intersects = new THREE.Vector3();

function onDragEvent(e) {

raycaster.setFromCamera(mouse, camera);
raycaster.ray.intersectPlane(plane, intersects);
scene.getObjectByName( "bar_stool_1" ).position.set(intersects.x, intersects.y, intersects.z);
scene.getObjectByName( "bar_stool_2" ).position.set(intersects.x, intersects.y, intersects.z); //e değil de bar stool_1,2 gibi yazarsan tam tıkladığın yerden değil de farklı bir yerden drage başlıyor.
console.log('drag')
}

##### #######  # #####   ##### ###### ####### #######  
##   ## ##   # ## ## ##  ##   ##  ##   ##  ##   ##   #  
##      ##        ##     ##       ##      ##    ##      
## #### ####      ##      #####   ##     ##     ####    
##   ## ##        ##          ##  ##    ##      ##      
##   ## ##   #    ##     ##   ##  ##   ##   ##  ##   #  
 ##### #######   ####     ##### ###### ####### #######  
                                                        

// shape keylere etki etmiyor.ama ölçüleri veriyor.
const geometry = new THREE.BoxGeometry( 5, 2, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
var bbox = new THREE.Box3().setFromObject(cube);
let bboxWidth = Math.abs(bbox.max.x)+Math.abs(bbox.min.x)
let bboxDepth = Math.abs(bbox.max.z)+Math.abs(bbox.min.z)
console.log("width:" + bboxWidth)
console.log("depth:" + bboxDepth)


//GET VERTICES LOCATIONS
scene.getObjectByName( "stand_1" ).geometry.attributes.position.array

//GET SPECIFIC VERTEX
var fvA = mesh.geometry.attributes.position.array[ 0 ]; // the vertex to transform




/*
### ### ####### ###  ### ######   #####    ###   ######  #####    
 ## ##   ##   #  ##  ##   ##  ## ### ###  ## ##   ##  ##  ## ##   
 ####    ##       ####    ##  ## ##   ## ##   ##  ##  ##  ##  ##  
 ###     ####      ##     #####  ##   ## ##   ##  #####   ##  ##  
 ####    ##        ##     ##  ## ##   ## #######  ## ##   ##  ##  
 ## ##   ##   #    ##     ##  ## ### ### ##   ##  ## ##   ## ##   
### ### #######   ####   ######   #####  ##   ## #### ## #####    
*/                                                              



// Handle keyboard events to switch cameras
document.addEventListener('keydown', (event) => {
    if (event.key === 'c') {
      switchCamera();
    }
  });

  ####    ###   ##   ## ####### ######    ###    
 ##  ##  ## ##  ### ###  ##   #  ##  ##  ## ##   
##      ##   ## #######  ##      ##  ## ##   ##  
##      ##   ## ## # ##  ####    #####  ##   ##  
##      ####### ##   ##  ##      ## ##  #######  
 ##  ## ##   ## ##   ##  ##   #  ## ##  ##   ##  
  ####  ##   ## ### ### ####### #### ## ##   ##  
                                                 
  document.getElementById("button").addEventListener("click", function() {
    window.cancelAnimationFrame(tick)
    tickRight() 
 
    console.log("camera right")
  });


  document.getElementById("button2").addEventListener("click", function() {
    window.cancelAnimationFrame(tickRight)
    tick() 
   
    console.log("camera base")
  });



  #####    #### ######   #####  ##  ##  # ##### 
  ##   ##  ##  ## ##  ## ##   ## ##  ## ## ## ## 
  ##      ##      ##  ## ##      ##  ##    ##    
   #####  ##      #####   #####  ######    ##    
       ## ##      ## ##       ## ##  ##    ##    
  ##   ##  ##  ## ## ##  ##   ## ##  ##    ##    
   #####    #### #### ##  #####  ##  ##   ####   
                                                 
   function takeScreenshot(image , camera)
   {
       renderer.render(scene, camera);
       image.src = renderer.domElement.toDataURL(); 
      /*  let sceneJson = scene.toJSON();
       let sceneJsonText = JSON.stringify(sceneJson);
       image.setAttribute('data-scene', sceneJsonText); */
   } //    END OF FUNC = takeScreenshot()



   ##  ##  # ##### ##   ## ####     
   ##  ## ## ## ## ### ###  ##      
   ##  ##    ##    #######  ##      
   ######    ##    ## # ##  ##      
   ##  ##    ##    ##   ##  ##      
   ##  ##    ##    ##   ##  ##  ##  
   ##  ##   ####   ### ### #######  
   
   

   document.getElementById("storage_size_text").style.left = "552px";


   
   const node = document.createElement("li");

   mainElement.appendChild(second); 


   const textnode = document.createTextNode("Water");
   node.appendChild(textnode);
   document.getElementById("myList").appendChild(node);  

   document.getElementById("button").onclick = ()=>
{
    console.log("test")
    document.getElementById("e-mail_form").remove()
    
}

   # ##### ####### ###  ##  # ##### 
   ## ## ##  ##   # ###  ## ## ## ## 
      ##     ##      #####     ##    
      ##     ####     ###      ##    
      ##     ##      #####     ##    
      ##     ##   # ##  ###    ##    
     ####   ####### ##  ###   ####   
                                     
   
  var new = text.substring(42) // text cümlesinin 42. harfinden sonuna kadar olan kısımdır.




newFunction();

array.forEach(element => {
    newFunction_1();
});


function newFunction_1() {
   new Promise((resolve, reject) => {
     console.log(test);
   })
}



##### ######    ###   ######  ##  ## ###### ####   
##   ## ##  ##  ## ##   ##  ## ##  ##   ##  ##  ##  
##      ##  ## ##   ##  ##  ## ##  ##   ## ##       
## #### #####  ##   ##  #####  ######   ## ##       
##   ## ## ##  #######  ##     ##  ##   ## ##       
##   ## ## ##  ##   ##  ##     ##  ##   ##  ##  ##  
 ##### #### ## ##   ## ####    ##  ## ###### ####   
                                                    


 function loadGraphicControls() 
 { 
 
 var mouse = new THREE.Vector2();
 var raycaster = new THREE.Raycaster(); 
 var intersect = new THREE.Vector3();
 
 const canvas = document.querySelector('.webgl');
 const backWall = scene.getObjectByName( "back_wall" )
 const elem = document.getElementById("graphics_control_icon_group_back_wall")
 elem.style.visibility = "hidden";
        
 window.addEventListener( 'mousemove', detectClickBackWall);
 function detectClickBackWall(event)
 {
     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
     console.log("mouse coordinates:" + mouse.x , mouse.y)
 
     raycaster.setFromCamera(mouse, camera);
     intersect = raycaster.intersectObject(backWall)
     if (intersect.length > 0)
     {
         console.log("hovered back wall")
         canvas.style.cursor = "pointer"
         window.addEventListener( 'mousedown', onClickBackWall);
     }
     else
     {
         canvas.style.cursor = "default"
         cancelAnimationFrame(onClickBackWall)
     }
 }
 
 function onClickBackWall()
 {
     console.log("clicked back wall")
     
     var tempV = new THREE.Vector3();
     const backWallPart = scene.getObjectByName( "back_wall_1" )
        
 
     // get the position of the center of the cube
     backWallPart.updateWorldMatrix(true, false);
     backWallPart.getWorldPosition(tempV);
     console.log("backwall world position:" + backWallPart.getWorldPosition(tempV))
 
     // get the normalized screen coordinate of that position
     // x and y will be in the -1 to +1 range with x = -1 being
     // on the left and y = -1 being on the bottom
     tempV.project(camera);
 
     // convert the normalized position to CSS coordinates
     const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
     const y = (tempV.y * -.5 + .5) * canvas.clientHeight;
     console.log(x,y)
 
     // move the elem to that position
     elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
     elem.style.visibility = "visible"
     requestAnimationFrame(onClickBackWall)
    }
    
    
 }
 







 ##   ## ###### ####     #####    ###   #####    
 ##   ##  ##  ## ##     ### ###  ## ##   ## ##   
 ##   ##  ##  ## ##     ##   ## ##   ##  ##  ##  
 ##   ##  #####  ##     ##   ## ##   ##  ##  ##  
 ##   ##  ##     ##     ##   ## #######  ##  ##  
 ##   ##  ##     ##  ## ### ### ##   ##  ## ##   
  #####  ####   #######  #####  ##   ## #####    
                                                 
 



     var client = new XMLHttpRequest();
      client.open('GET', '/media/passwords.csv');
      client.onreadystatechange = function() {
      //console.log(client.responseText);
      }
      client.send();


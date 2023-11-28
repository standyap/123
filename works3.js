function generateRenders()  //INCLUDES FUNC = addTemporaryBackground() 
{
    document.getElementById("loader").style.display = "block";  
    addTemporaryBackground() 
    setTimeout(timeRender1, 300)
        function timeRender1() 
        {
            document.querySelector("#v3d-container > canvas").style.filter = "opacity(0)"
            scene.add(cameraFront) 
            setTimeout(timeRender1, 200)
                function timeRender1() 
                {
                    renderCam1()
                    setTimeout(timeRender1, 400)
                        function timeRender1() 
                        {
                            scene.add(cameraLeft) 
                            setTimeout(timeRender1, 200)
                                function timeRender1() 
                                {
                                    renderCam2()
                                    setTimeout(timeRender1, 400)
                                        function timeRender1() 
                                        {
                                            scene.add(cameraRight) 
                                            setTimeout(timeRender1, 200)
                                                function timeRender1() 
                                                {
                                                    renderCam3()
                                                    setTimeout(timeRender1, 200)
                                                        function timeRender1() 
                                                        {
                                                            sendConfiguration()   
                                                        } 
                                                }  
                                        }  
                                }  
                            }  
                }       
        }

        
        
        






    
   
} //    END OF FUNC = renderCam3()


setTimeout(loadFurnitures, 5000)
function loadFurnitures() 
{

let helperBarStool = new THREE.BoxHelper( scene.getObjectByName( "bar_stool" ), 0xffff00 );

document.getElementById("bar_stool_icon").addEventListener("click", addBarStool)
function addBarStool()
{
     
    scene.getObjectByName( "bar_stool_1").visible = true
    scene.getObjectByName( "bar_stool_2").visible = true

}
function onFirstDrop()
{
    mouse.x = ( clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( clientY / window.innerHeight ) * 2 + 0.9;
    //raycaster.setFromCamera(mouse, camera);

    scene.getObjectByName( "bar_stool_1").position.set (mouse.x , mouse.y)
    scene.getObjectByName( "bar_stool_2").position.set (mouse.x , mouse.y)
}



   /* var intersect = raycaster.intersectObject(scene.getObjectByName( "bar_stool_1" ),scene.getObjectByName( "bar_stool_2" ))
    
     if (intersect.length > 0 )
    {
        console.log("hover")
       
    }
    else
    {
       
    }
    } */
    
/**
 *  First Click
 */
              



        /**
         *  Constraint bar stool
         */
        barStool = scene.getObjectByName( "bar_stool" )
        const objectsBarStool = [] //drag bu şekilde grup objeye etki ediyor sadece object verirsek etki etmiyor o yüzden tek bir obje bile olsa grup içine aldık.
        objectsBarStool.push(barStool)


        

    *
    *  Drag bar stool
    */
        
      /*   const dragBarStool = new DragControls(objectsBarStool, camera, renderer.domElement)
        dragBarStool.transformGroup = true //bu ayar ile drag parent objeye etki edebiliyor bu ayar false olursa drag direk children'a etki ediyor.ama drag control obj bölümünde group olarak belirtilmesi de gerekiyor.


        dragBarStool.addEventListener( 'dragstart', function () 
        {
            
            scene.add(helperBarStool)
            controls.enabled = false; 
                   
        })
       // dragBarStool.addEventListener( 'drag', onDragEvent )
        dragBarStool.addEventListener( 'drag' , function ()
        {
            barStool.position.clamp(
            new THREE.Vector3(-2, 0.1, -2),
            new THREE.Vector3(2, 0.1, 2));
            helperBarStool.update()

            
            
        });
        dragBarStool.addEventListener( 'dragend', function () {scene.remove(helperBarStool), controls.enabled = true } )

        
        function onDragEvent() 
        {
             
        }
        

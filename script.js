import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'


import gsap from 'gsap';
import { Scrool } from './scrool.js'
//import { SendServerAddParam } from './send.js'
import * as dat from 'three/examples/jsm/libs/lil-gui.module.min.js'
import * as Functions from './functions.js'
import { jsPDF } from "jspdf";
                                

/**
 * Loaders
 */

const gltfLoader = new GLTFLoader()
const rgbeLoader = new RGBELoader()


/**
 * Load Panel Settings function after 5 seconds
 */
const timeLoadScrool = setTimeout(loadScrool, 5000);

    function loadScrool()
    {
        const scrFunc = new Scrool()
    } 

const global = {}
/**
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl')
document.querySelector('.webgl').preserveDrawingBuffer=true 

// Scene
const scene = new THREE.Scene()
//const light = new THREE.PointLight( 0xff0000, 5, 100 ); light.position.set( 0, 50, 0 ); scene.add( light );

/**
 * Update all materials
 */
const updateAllMaterials = ()=>
{
    scene.traverse(
        (child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = global.envMapIntensity
           // console.log(child.material)
            //console.log(child)

            //Hide All Objects on first initilazation
            child.visible = false;

            //Show first scene objects
            scene.getObjectByName( "environment" ).visible = true;
            scene.getObjectByName( "environment_floor" ).visible = true;
            scene.getObjectByName( "stand_1" ).visible = true;
            scene.getObjectByName( "stand_2" ).visible = true;
            scene.getObjectByName( "drag_front" ).visible = true;
                    
        }
    })
}

const loadEnvironmentMap = ()=>
{
    /**
     * Environment map
     */
    global.envMapIntensity = 1.2
    // HDR (RGBE) equirectangular (Load after gltf model loaded)
    const environmentMap = rgbeLoader.load('/media/environment.hdr', (environmentMap) =>
    {
     // console.log(environmentMap)
     environmentMap.mapping = THREE.EquirectangularReflectionMapping
   
    

    scene.environment = environmentMap
    scene.background = environmentMap
    })
}
/*

##   ##   #####   #####    #######  ####     
### ###  ### ###   ## ##    ##   #   ##      
#######  ##   ##   ##  ##   ##       ##      
## # ##  ##   ##   ##  ##   ####     ##      
##   ##  ##   ##   ##  ##   ##       ##      
##   ##  ### ###   ## ##    ##   #   ##  ##  
### ###   #####   #####    #######  #######  
  
*/

const loader = document.createElement("div")
loader.id = "loader"
document.body.appendChild(loader);


gltfLoader.load(
    '/model/expo_project.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(1, 1, 1)
        scene.add(gltf.scene)
        loadEnvironmentMap()
        updateAllMaterials()
        document.getElementById("loader").style.display = "none";  
        
  
    })
/**
 * Update Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', function resizeAll()
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/*


  ####    ###   ##   ## ####### ######    ###    
 ##  ##  ## ##  ### ###  ##   #  ##  ##  ## ##   
##      ##   ## #######  ##      ##  ## ##   ##  
##      ##   ## ## # ##  ####    #####  ##   ##  
##      ####### ##   ##  ##      ## ##  #######  
 ##  ## ##   ## ##   ##  ##   #  ## ##  ##   ##  
  ####  ##   ## ### ### ####### #### ## ##   ##  
                                                 

*/                                             
// Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
    camera.position.set(0, 2, 20)
    scene.add(camera)
    // Smooth camera movement
    gsap.to(camera.position,
        {
        duration: 6,
        x: 5,
        y: 10,
        z: 25,
        delay: 2,
    });
    // Camera Controls
    const controls = new OrbitControls(camera, canvas)
    controls.target.y = 3.5
    controls.enableDamping = true
    // Min Max Distance and Rotation Limits
    controls.minPolarAngle = 0;
    controls.maxPolarAngle =  Math.PI * 0.5;
    controls.maxDistance = 15
    controls.minDistance = 5



// Render cameras

const cameraRight = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
cameraRight.position.set(14, 4, 0)
scene.add(cameraRight)
cameraRight.lookAt(0,0,0)

const controlsRight = new OrbitControls(cameraRight, canvas)
controlsRight.target.y = 3.5
controlsRight.enableDamping = true
controlsRight.minPolarAngle = 0;
controlsRight.maxPolarAngle =  Math.PI * 0.5;
controlsRight.maxDistance = 15
controlsRight.minDistance = 5



const cameraLeft = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
cameraLeft.position.set(-20, 6, 0)
//scene.add(cameraLeft)

const cameraBack = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
cameraBack.position.set(0, 6, 20)
//scene.add(cameraBack)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({canvas: canvas , preserveDrawingBuffer: true})


//configure WebGLRenderer as follows when using glTF
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate main camera
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    
    renderer.render(scene, camera)
   
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    //console.log(camera.position)
}

tick();

/**
 * Animate right camera
 */

const clockRight = new THREE.Clock()
function tickRight()
{
    // Time
    const elapsedTime = clockRight.getElapsedTime()

    // Update controls
    controlsRight.update()

    // Render
    
    renderer.render(scene, cameraRight)
   
    // Call tick again on the next frame
    window.requestAnimationFrame(tickRight)
    //console.log(camera.position)
}

/*

 #####   ##   ##   ######   # #####    ####    ##  ##  #######   #####   
##   ##  ##   ##     ##    ## ## ##   ##  ##   ##  ##   ##   #  ##   ##  
##       ##   ##     ##       ##     ##        ##  ##   ##      ##       
 #####   ## # ##     ##       ##     ##        ######   ####     #####   
     ##  #######     ##       ##     ##        ##  ##   ##           ##  
##   ##  ### ###     ##       ##      ##  ##   ##  ##   ##   #  ##   ##  
 #####   ##   ##   ######    ####      ####    ##  ##  #######   #####   
 
 */



/**
 *  Global Variables
 */
var switchBack , switchLeft , switchRight , standWidth , standDepth , standInfo , standSize ,currentUrl
/**
 *  Global Variables
 */





setTimeout(switchesLoaded, 5000);
function switchesLoaded()
{
    
//INIT

    switchLeft = document.getElementById("toogle_switch_left_wall_switch")
    switchBack = document.getElementById("toogle_switch_back_wall_switch")
    switchRight = document.getElementById("toogle_switch_right_wall_switch")
/**
 * TEMPORARILY USED THESE INIT VALUES BECAUSE IF WE INIT WITH URL PARAMETERS WE NEED TO SET VALUES BY VISIBILITIES OF WALLS
 */
    standWidth = 2 
    standDepth = 2
    standInfo = "island"
    document.getElementById("stand_info_text").style.left = "330px";
    document.getElementById("stand_info_text").style.bottom = "20px";
    standSize = standWidth + "m" + " x " + standDepth + "m"
    document.getElementById("stand_info_text").innerHTML = standInfo + " " + " " + standSize

//CHECK BACK WALL
        switchBack.addEventListener('change', function () {
        if (switchBack.checked ) 
        {
            scene.getObjectByName( "back_wall_1" ).visible = true;
            scene.getObjectByName( "back_wall_2" ).visible = true;
            loadGraphicControls()
            
            var standInfo = "peninsula"
            document.getElementById("stand_info_text").style.left = "315px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standInfo + standSize
//PARAMS SAVE BACK WALL
            Functions.addOrUpdateURLParam ("backwall" , "visible")

            //SEND CURRENT URL TO FILESTACK
            var currentUrl = window.location.href    
           // Functions.sendData(currentUrl)          

        } 
            
        else 
        {
            scene.getObjectByName( "back_wall_1" ).visible = false;
            scene.getObjectByName( "back_wall_2" ).visible = false;
            scene.getObjectByName( "left_wall_1" ).visible = false;
            scene.getObjectByName( "left_wall_2" ).visible = false;
            scene.getObjectByName( "right_wall_1" ).visible = false;
            scene.getObjectByName( "right_wall_2" ).visible = false;
            console.log('Island');

            let standInfo = "island"
            document.getElementById("stand_info_text").style.left = "330px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standInfo + standSize
            
            //switchLeft.setAttribute("checked" , false) bu şekilde kullanım kabul etmiyor.
            //IF LEFT AND RIGHT SWITCHES ARE CHECKED UNCHECK THEM
            switchLeft.checked = false
            switchRight.checked = false
          
            
            Functions.removeURLParameters(['backwall'])
            
        }
               
        });

//CHECK LEFT WALL
//CHECK RIGHT WALL
//RAISED FLOOR SWITCH

    let checkbox4 = document.getElementById("toogle_switch_raised_floor_switch")

    checkbox4.addEventListener('change', function () {
    if (checkbox4.checked)
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
   
    
//FLOOR LIGHT SWITCH
   let checkbox5 = document.getElementById("toogle_switch_floor_light_switch")

    checkbox5.addEventListener('change', function () {
    if (checkbox5.checked)
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
  

//DARK MODE SWITCH
    let checkbox6 = document.getElementById("toogle_switch_dark_theme_switch")

    checkbox6.addEventListener('change', function () {
    if (checkbox6.checked)
    {
    global.envMapIntensity = 2
    console.log('Checked');
    } 
    else
    {
    global.envMapIntensity = 0.5
    console.log('Not Checked');
    }
    });
   


//STORAGE SWITCH

    let storageWidth = 0 
    let storageDepth = 0
    let storageSize = "N/A"
    document.getElementById("storage_size_text").style.left = "552px";
    //let storageSize = storageWidth + "m" + storageDepth + "m"
    document.getElementById("storage_size_text").innerHTML = "Storage" + "" + " " + storageSize

    let switchStorage = document.getElementById("toogle_switch_storage_switch")
    
    switchStorage.addEventListener('change', function () {
    if (switchStorage.checked)
    {
        scene.getObjectByName( "storage_1" ).visible = true;
        scene.getObjectByName( "storage_2" ).visible = true;
        scene.getObjectByName( "storage_3" ).visible = true;
        scene.getObjectByName( "storage_4" ).visible = true;
        scene.getObjectByName( "storage_5" ).visible = true;
        
        
        

        console.log('Checked');
        let storageWidth = 1
        let storageDepth = 1
        document.getElementById("storage_size_text").style.left = "540px";
        let storageSize = storageWidth + "m" + " x " + storageDepth + "m"
        document.getElementById("storage_size_text").innerHTML = "Storage" + "" + " " + storageSize
    } 
    else
    {
        console.log('Not Checked');
        scene.getObjectByName( "storage_1" ).visible = false;
        scene.getObjectByName( "storage_2" ).visible = false;
        scene.getObjectByName( "storage_3" ).visible = false;
        scene.getObjectByName( "storage_4" ).visible = false;
        scene.getObjectByName( "storage_5" ).visible = false;
        
        

        document.getElementById("storage_size_text").style.left = "552px";
        let storageSize = "N/A"
        document.getElementById("storage_size_text").innerHTML = "Storage" + "" + " " + storageSize
        
    }
    });

} //END OF SWITCHES FUNCTION


/*
 ####### ##   ## ######  ##   ##  # ##### ######   
  ##   # ##   ##  ##  ## ###  ## ## ## ##  ##  ##  
  ##     ##   ##  ##  ## #### ##    ##     ##  ##  
  ####   ##   ##  #####  #######    ##     #####   
  ##     ##   ##  ## ##  ## ####    ##     ## ##   
  ##     ##   ##  ## ##  ##  ###    ##     ## ##   
 ####     #####  #### ## ##   ##   ####   #### ##  
                                                                            
*/


setTimeout(loadFurnitures, 5000)
function loadFurnitures() 
{
    let stand = scene.getObjectByName( "stand_1" )
    let barStool = scene.getObjectByName( "bar_stool")
    let objectsBarStool = []
    objectsBarStool.push(barStool)
    const dragBarStool = new DragControls(objectsBarStool, camera, renderer.domElement)
    dragBarStool.getRaycaster()

     dragBarStool.transformGroup = true //bu ayar ile drag parent objeye etki edebiliyor bu ayar false olursa drag direk children'a etki ediyor.ama drag control obj bölümünde group olarak belirtilmesi de gerekiyor.
    


        /**
         *  Show bar stool
         */

       
             
        let helperBarStool = new THREE.BoxHelper( barStool, 0xffff00 );

        var mouse = new THREE.Vector2();
        var raycaster = new THREE.Raycaster(); 
        var intersect = new THREE.Vector3();

        var bbox = new THREE.Box3().setFromObject(helperBarStool);
        var bboxWidth = Math.abs(bbox.max.x)+Math.abs(bbox.min.x)
        var bboxDepth = Math.abs(bbox.max.z)+Math.abs(bbox.min.z)

        
        let grid = new THREE.GridHelper(4, 30, "aqua", "aqua");
        grid.position.y = 0.1;
        stand.add(grid);
        


                        
        document.getElementById("bar_stool_icon").addEventListener("click", addBarStool)

        function addBarStool()  //ADD BAR STOOL
        {
            scene.getObjectByName( "bar_stool_1").visible = true
            scene.getObjectByName( "bar_stool_2").visible = true
            window.addEventListener( 'mousemove', onMouseMove);
           
        }

        function onMouseMove(event) //FOLLOW CURSOR
        {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
        scene.add(helperBarStool)
        raycaster.setFromCamera(mouse, camera);
        intersect = raycaster.intersectObject(stand)
        controls.enabled = false; 

        window.addEventListener( 'click', function()   //FIRST DROP
        {
            window.removeEventListener('mousemove', onMouseMove)
            scene.remove(helperBarStool)
            
           
          
        });

        for ( let i = 0; i < intersect.length; i ++ )
        {
            var bboxWidth = Math.abs(bbox.max.x)+Math.abs(bbox.min.x)
            var bboxDepth = Math.abs(bbox.max.z)+Math.abs(bbox.min.z)
            console.log("mouse.x:" + mouse.x)
            console.log("mouse.y:" + mouse.y)

            var a = intersect[ i ].point.x 
            var c = intersect[ i ].point.z  
            var b = intersect[ i ].point.y 
            
            barStool.position.set(a,b,c)
            helperBarStool.update()
        } 
    }

    dragBarStool.addEventListener( 'drag', function () 
    {
        window.addEventListener( 'mousemove', onMouseHover);
        intersect = raycaster.intersectObject(stand)
        controls.enabled = false; 
       

    })


    function onMouseHover(event) //CHECK INTERSECTIONS THEN DRAG
    {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
            scene.add(helperBarStool)
            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObject(stand)
            controls.enabled = false; 

        if(intersect.length>0)
        {
            dragBarStool.activate()
            
        }
        else
        {
            dragBarStool.deactivate()
        }
    }
        
    
} 
      


/*
# ##### ####### ###  ##  # ##### ##   ## ######  #######  
## ## ##  ##   # ###  ## ## ## ## ##   ##  ##  ##  ##   #  
   ##     ##      #####     ##    ##   ##  ##  ##  ##      
   ##     ####     ###      ##    ##   ##  #####   ####    
   ##     ##      #####     ##    ##   ##  ## ##   ##      
   ##     ##   # ##  ###    ##    ##   ##  ## ##   ##   #  
  ####   ####### ##  ###   ####    #####  #### ## #######  
*/  


setTimeout(loadTextures, 5000)
function loadTextures() 
{
    // Carpet 0

    document.getElementById("carpet0_icon").addEventListener("click", replaceTextureCarpet0)
    function replaceTextureCarpet0()
    {
    const texture = new THREE.TextureLoader().load( "./media/carpet0_icon.jpg" );
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "stand_1" ).material.map = texture

    }

    // Carpet 1

    /* document.getElementById("carpet1_icon").addEventListener("click", replaceTextureCarpet1)
    function replaceTextureCarpet1()
    {
    let texture = new THREE.TextureLoader().load( "./media/carpet1_icon.jpg" );
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "stand_1" ).material.map = texture
    } */

}

/*
#####  ######    ###    #####   
 ## ##  ##  ##  ## ##  ##   ##  
 ##  ## ##  ## ##   ## ##       
 ##  ## #####  ##   ## ## ####  
 ##  ## ## ##  ####### ##   ##  
 ## ##  ## ##  ##   ## ##   ##  
#####  #### ## ##   ##  #####   
                                

*/                                         


setTimeout(loadDrags, 5000)
function loadDrags() 
{

let stand = scene.getObjectByName( "stand_1" )
let texture = scene.getObjectByName( "stand_1" ).material.map
let bboxWidth,bboxDepth


function updateSizes() {
    let bbox = new THREE.Box3().setFromObject(stand);
    bboxWidth = Math.abs(bbox.max.x)+Math.abs(bbox.min.x)   //GET WIDTH
    bboxDepth = Math.abs(bbox.max.z)+Math.abs(bbox.min.z)   //GET DEPTH
    //let bboxHeight = Math.abs(bbox.max.y)+Math.abs(bbox.min.y) //GET HEIGHT
    
         
    console.log("width:" + bboxWidth)
    console.log("depth:" + bboxDepth)
   // console.log("height:" + bboxHeight)
   
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
updateSizes()
onDragEventDragFront()


console.log('drag')

//scale.set(width,height,depth)
function onDragEventDragFront(params) {
     if (dragFront.position.z < 0.25)
        {
            dragFront.position.z = 0
           
            scene.getObjectByName( "back_wall" ).position.z = -1.9
                        
            scene.getObjectByName( "stand_1" ).scale.set(1, 1, 1)
            scene.getObjectByName( "stand_2" ).scale.set(1, 1, 1)
                        
            texture.repeat.set(1, 1);
            
        } 
        else if (dragFront.position.z >= 0.25 && dragFront.position.z < 0.75)
        {
            dragFront.position.z = 0.6
            
            scene.getObjectByName( "back_wall" ).position.z = -2.4
            
    
            scene.getObjectByName( "stand_1" ).scale.set(1, 1, 1.25)
            scene.getObjectByName( "stand_2" ).scale.set(1, 1, 1.25)
            
            texture.repeat.set(1, 1.25);
           
            
        }
        else if (dragFront.position.z >= 0.75 && dragFront.position.z < 1.25)
        {
            dragFront.position.z = 1.0023
            
            scene.getObjectByName( "back_wall" ).position.z = -2.9
               
            scene.getObjectByName( "stand_1" ).scale.set(1, 1, 1.5)
            scene.getObjectByName( "stand_2" ).scale.set(1, 1, 1.5)
            
            texture.repeat.set(1, 1.5);
            
        } 
}
 
      
})
dragDragFront.addEventListener( 'dragend', ()=> 
{
console.log('drag end')
controls.enabled = true


})
} 


/*
  #####    ###   ##   ## #######  
  ##   ##  ## ##  ##   ##  ##   #  
  ##      ##   ## ##   ##  ##      
   #####  ##   ##  ## ##   ####    
       ## #######  ## ##   ##      
  ##   ## ##   ##   ###    ##   #  
   #####  ##   ##   ###   #######  
*/  


var rendersResponseUrl; // vergedeki gibi bir variable bir fonksiyonun içindetanımlanmış ise başka bir fonksiyonun içinde ayrı bir değer alacaksa bu şekilde veriyoruz.
const renderPage = document.getElementById("render_page")
const imgRight = document.getElementById("test_img")
const tempBackground = document.getElementById("temp_background")
     
function generateRenders()
{
   // document.querySelector('.webgl').preserveDrawingBuffer=true //BU AYAR EKRAN GÖRÜNTÜSÜ ALMAK İÇİN KULLANILIYOR BU AYAR VARSAYILAN DEĞERDE OLDUĞUNDA KONSOLDA ÇOK HATA MESAJI ÇIKIYOR.
    renderer.render(scene, camera);
    tempBackground.src = renderer.domElement.toDataURL(); 

    setTimeout(function() // AFTER 0.3 SEC
    { 
                // SET ACTIVE CAMERA : CAMERA RIGHT
                window.cancelAnimationFrame(tick);
                console.log("switched to camera right")
                tickRight()

                setTimeout(function() // AFTER 0.3 SEC
                { 
                        // TAKE SCREENSHOT AND ADD IT AS SRC TO DIV
                             
                            imgRight.style.display = "block"; 
                            renderer.render(scene, cameraRight);
                            imgRight.src = renderer.domElement.toDataURL(); 
                            setTimeout(function() // AFTER 0.3 SEC
                            { 
                              // document.querySelector('.webgl').preserveDrawingBuffer=false //BACK TO DEFAULT VALUE
                                sendConfiguration()

                            },300)

                }, 300);

    }, 300);
        
    
   
} 

function sendConfiguration()
{
    
    var doc = new jsPDF();
    doc.html(renderPage, {
    callback: function(doc) {
          
        const renders = doc.output("blob"); 

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.filestackapi.com/api/store/S3?key=A5pOILz7YRTG1Mef3iIMCz");
        xhr.onload = () => console.log("xhr.status:" + xhr.status);
       
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) 
            {
                console.log("xhr.responseText:" + xhr.responseText);

                // GET URL FROM XHR.RESPONSETEXT

                var url = xhr.responseText;
                var jsonResponse = JSON.parse(url);
                console.log(jsonResponse["url"]);

                rendersResponseUrl = jsonResponse["url"] 
               //var rendersResponse = jsonResponse["url"] => DİKKAT BU ŞEKİLDE KULLANMAYALIM SENDEMAIL FONKSİYONUNUN BU İFADEYİ OKUYABİLMESİ İÇİN DIŞARDAN NULL OLARAK TANIMLAMAMIZ GEREKİYOR.
                
                document.getElementById("temp_background").remove()
                document.getElementById("test_img").remove()
                document.querySelector(".webgl").style.opacity = "100";

              // SET ACTIVE CAMERA : CAMERA BASE
            window.cancelAnimationFrame(tickRight);
            console.log("switched to base camera")
            tick()
            document.getElementById("loader").style.display = "none";  
            
            sendEmail()  
                  
            }}

         xhr.send(renders);
       
       
    },
    margin: [5, 5, 5, 5],
    x: 0,
    y: 0,
    width: 520, //target width in the PDF document
    windowWidth: 1305, //window width in CSS pixels*/

    
    });
    
} 
var inputMail
setTimeout(loadConf, 5000) //INPUT MAIL AND CLICK SAVE
function loadConf() 
{
    //ON EVENT OF INPUT E-MAIL ADRESS IN PLACEHOLDER SET VARIABLE INPUT MAIL

    
    document.getElementById('email_form').addEventListener("input", updateValue);
    function updateValue(e) 
    {
        inputMail = e.target.value
    }

    //RUN THE SAVING PROCEDURES WHEN CLICKED SAVE BUTTON

    document.getElementById("send_button").addEventListener("click", function() 
    {
        //document.querySelector(".webgl").style.opacity = "0";
        document.getElementById("loader").style.display = "block";  
        generateRenders() //THIS FUNCTON ICLUDES : SENDCONFIGURATON / SENDEMAIL
    })
}

function sendEmail()
{
    
    Email.send(
    {
        Host : "smtp.elasticemail.com",
        Username : "tg.verge3d.test@gmail.com",
        Password : "B349E0EC4A5EDAA9FF8EEEDD6A60E99B0178",
        To : inputMail,
        From : "tg.verge3d.test@gmail.com",
        Subject : "Your ID and Configuration Link",
        Body : "<html> <img src=https://cdn.filestackcontent.com/dcKRUKtBTbWYjsyXDvs0> + Use your ID in scene or click the url to load your configuration</h2>"+
        "<br></br>"+
        "<strong>Your Configuration Link is: </strong>"+ window.location.href  + 
        "<br></br>"+
        "</html>",
        Attachments : 
        [ //WE CAN ADD MULTIPLE ATTACHMENTS BETWEEN THESE YELLOW BRACKETS
        {
        name : "temp.pdf",
        path : `${rendersResponseUrl}`
        },
        ]

    }).then(message => alert(message));
    setTimeout(function() // AFTER 0.3 SEC
    { 
    document.getElementById("e-mail_form").remove()
        setTimeout(function() // AFTER 0.3 SEC
        { 
            let element = document.createElement("div")
            let topPanel = document.getElementById("top_panel_background")
            element.id = "e-mail_form"
            element.innerHTML =
                    "<div class='content'>" +
                    "<form class='subscription'>" + 
                    "<input id='email_form' class='add-email' type='email' placeholder='myconfiguration@me.now'>" +
                    "<button class='submit-email' type='button'>" +
                    "<span id='send_button' class='before-submit'>Save</span>" +
                    "<span class='after-submit'>Your Configuration Saved</span>" +
                    "</button>" +
                    "</form>" +
                    "</div>"
                topPanel.appendChild(element);  
        },300)
    },300)
}  




/*
# ##### #######  #####   # ##### 
## ## ##  ##   # ##   ## ## ## ## 
   ##     ##     ##         ##    
   ##     ####    #####     ##    
   ##     ##          ##    ##    
   ##     ##   # ##   ##    ##    
  ####   #######  #####    ####   
*/                                


document.getElementById("button").onclick = ()=>
{

   
}


document.getElementById("button2").onclick = ()=>
{

    
}




// Dat gui controls
var gui = new dat.GUI();

var guiControls = new function () 
{
    this.depth = 0;
    this.width = 0;
    this.x = 1;
    this.updateDepth = function () 
    {
        // Update morphtarget influence on change of control
        /* scene.getObjectByName( "stand_1" ).morphTargetInfluences[4] = guiControls.depth;
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[4] = guiControls.depth;
        scene.getObjectByName( "left_wall_1" ).morphTargetInfluences[0] = guiControls.depth;
        scene.getObjectByName( "left_wall_2" ).morphTargetInfluences[0] = guiControls.depth;
        scene.getObjectByName( "right_wall_1" ).morphTargetInfluences[0] = guiControls.depth;
        scene.getObjectByName( "right_wall_2" ).morphTargetInfluences[0] = guiControls.depth; */
               
    }
    this.updateWidth = function ()
    {
        
        /* scene.getObjectByName( "stand_1" ).morphTargetInfluences[3] = guiControls.width;
        scene.getObjectByName( "stand_2" ).morphTargetInfluences[3] = guiControls.width;
        scene.getObjectByName( "back_wall_1" ).morphTargetInfluences[0] = guiControls.width;
        scene.getObjectByName( "back_wall_2" ).morphTargetInfluences[0] = guiControls.width; */
    } 
}
gui.add(guiControls, 'depth', 0, 1).onChange(guiControls.updateDepth); //bu son satıra gelmeli
gui.add(guiControls, 'width', 0, 1).onChange(guiControls.updateWidth); //bu son satıra gelmeli


/*
###### ######  ###### #### #######  #####   
 ##  ## ##  ##   ##  ##  ## ##   # ##   ##  
 ##  ## ##  ##   ## ##      ##     ##       
 #####  #####    ## ##      ####    #####   
 ##     ## ##    ## ##      ##          ##  
 ##     ## ##    ##  ##  ## ##   # ##   ##  
####   #### ## ###### #### #######  #####   
*/                                       

var pricebarStool = 0
var priceBistroTable = 0
var priceSingleSofa = 0
var priceDoubleSofa = 0
var priceChair = 0
var priceCoffeeTable = 0
var priceHightTable = 0
var priceTv42 = 0
var priceTv55 = 0
var priceBrochureRack = 0

var priceShelves = 0
var priceKettle = 0
var priceWaterDispenser = 0
var priceRefrigator = 0
var pricePlant = 0
var priceTrashCan = 0

var icon , price

setTimeout(loadPrices, 5000)
function loadPrices() 
{

//PRICE HOVER BAR STOOL

var element = document.getElementById("top_panel_furniture_list_bar_stool_price")
element.innerHTML = pricebarStool + "$"

icon = document.getElementById("bar_stool_icon")
icon.addEventListener
( 
    'mouseover', 
    ()=>
    {
        console.log("mouseover")
        price = document.createElement('p')
        icon.appendChild(price)
        price.id = "bar_stool_default_price"
        price.innerHTML = "200$"
    }
)
document.getElementById("bar_stool_icon").addEventListener
( 
    'mouseout', 
    ()=>
    {
        console.log("mouseout")
        document.getElementById("bar_stool_default_price").remove()
    }
)


let element2 = document.getElementById("top_panel_furniture_list_bistro_table_price")
element2.innerHTML = priceBistroTable + "$"

let element3 = document.getElementById("top_panel_furniture_list_single_sofa_price")
element3.innerHTML = priceSingleSofa + "$"

let element4 = document.getElementById("top_panel_furniture_list_double_sofa_price")
element4.innerHTML = priceDoubleSofa + "$"

let element5 = document.getElementById("top_panel_furniture_list_chair_price")
element5.innerHTML = priceChair + "$"

let element6 = document.getElementById("top_panel_furniture_list_coffee_table_price")
element6.innerHTML = priceCoffeeTable + "$"

let elemen7 = document.getElementById("top_panel_furniture_list_high_table_price")
elemen7.innerHTML = priceHightTable + "$"

let element8 = document.getElementById("top_panel_furniture_list_tv42_price")
element8.innerHTML = priceTv42 + "$"

let element9 = document.getElementById("top_panel_furniture_list_tv55_price")
element9.innerHTML = priceTv55 + "$"

let element10 = document.getElementById("top_panel_furniture_list_brochure_rack_price")
element10.innerHTML = priceBrochureRack + "$"

let element11 = document.getElementById("top_panel_furniture_list_shelves_price")
element11.innerHTML = priceShelves + "$"

let element12 = document.getElementById("top_panel_furniture_list_kettle_price")
element12.innerHTML = priceKettle + "$"

let element13 = document.getElementById("top_panel_furniture_list_water_dispenser_price")
element13.innerHTML = priceWaterDispenser + "$"

let element14 = document.getElementById("top_panel_furniture_list_refrigator_price")
element14.innerHTML = priceRefrigator + "$"

let element16 = document.getElementById("top_panel_furniture_list_plant_price")
element16.innerHTML = pricePlant + "$"

let element17 = document.getElementById("top_panel_furniture_list_trash_can_price")
element17.innerHTML = priceTrashCan + "$"

}



/*

##### ######    ###   ######  ##  ## ###### ####   
##   ## ##  ##  ## ##   ##  ## ##  ##   ##  ##  ##  
##      ##  ## ##   ##  ##  ## ##  ##   ## ##       
## #### #####  ##   ##  #####  ######   ## ##       
##   ## ## ##  #######  ##     ##  ##   ## ##       
##   ## ## ##  ##   ##  ##     ##  ##   ##  ##  ##  
 ##### #### ## ##   ## ####    ##  ## ###### ####   

*/

/**
 * INIT 
 */

var tempV , backWallUploadResponseUrl,i

/**
 * INIT
 */



function loadGraphicControls() // FUNCTION WORKS WHEN BACKWALL SWITCH ON
{ 

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster(); 
var intersect = new THREE.Vector3();

const backWall = scene.getObjectByName( "back_wall" )
const backWallGraphicControl = document.getElementById("graphics_control_icon_group_back_wall")       
window.addEventListener( 'mousemove', detectClickBackWall);
function detectClickBackWall(event)
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
    //console.log("mouse coordinates:" + mouse.x , mouse.y)

    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObject(backWall)
    if (intersect.length > 0)
    {
        console.log("hovered back wall")
        canvas.style.cursor = "pointer"
        window.addEventListener( 'mousedown', onClickBackWall); //WHEN HOVERED DETECT CLICK EVENT
    }
    else
    {
        canvas.style.cursor = "default"
        window.removeEventListener( 'mousedown', onClickBackWall);
        
    }
}


function onClickBackWall()
{
    
   // console.log("clicked back wall")
    tempV = backWall.getWorldPosition(new THREE.Vector3())
    tempV.project(camera);// get the normalized screen coordinate of world position

    // convert the normalized position to CSS coordinates
    const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
    const y = (tempV.y * -.5 + .5) * canvas.clientHeight;
    
    backWallGraphicControl.style.left = `${x}px`
    backWallGraphicControl.style.top = `${y}px`
    backWallGraphicControl.style.visibility = "visible"
    
}
document.getElementById("add_icon").onclick = ()=>
{   
    var input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = e => 
    { 
    
       // getting a hold of the file reference
       var file = e.target.files[0]; 
    
       // setting up the reader
       var reader = new FileReader();
       reader.readAsDataURL(file); // this is reading as data url
    
       // here we tell the reader what to do when it's done reading...
       reader.onload = readerEvent => 
       {
        var content = readerEvent.target.result; // this is the content!
        
        var textureV = new THREE.TextureLoader().load(content);

        
        Functions.sendDataParams(content , backWallUploadResponseUrl , "backwall_image" )
        

        scene.getObjectByName( "back_wall_1" ).material.map = textureV
        textureV.rotation = THREE.MathUtils.degToRad(90);
        textureV.colorSpace = THREE.SRGBColorSpace;
        textureV.wrapS = THREE.RepeatWrapping;
        textureV.wrapT = THREE.RepeatWrapping;
        textureV.repeat.set( 1, 1 );
            
    //The last thing to note about the example is that if you change wrapS or wrapT on the texture you must also set texture.needsUpdate so three.js knows to apply those settings. The other settings are automatically applied.
    // textureV.needsUpdate =true
    //scene.getObjectByName( "back_wall_1" ).material.needsUpdate = true

        
       }
    }
    input.click();
}

i=1
document.getElementById("zoom_out_icon").onclick = ()=>
{   
i = i   + 0.2
scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( i, i );
}

document.getElementById("left_icon").onclick = ()=>
{   
i = i   - 0.2
scene.getObjectByName( "back_wall_1" ).material.map.offset.set(i, 1)
}

document.getElementById("apply_icon").onclick = ()=>
{ 
    backWallGraphicControl.style.visibility = "hidden"       

}





} //end of onClickBackWall function



/*
####     #####   ##### ###### ##   ##  
 ##     ### ### ##   ##  ##   ###  ##  
 ##     ##   ## ##       ##   #### ##  
 ##     ##   ## ## ####  ##   #######  
 ##     ##   ## ##   ##  ##   ## ####  
 ##  ## ### ### ##   ##  ##   ##  ###  
#######  #####   ##### ###### ##   ##  
*/

/**
 * INIT
 */
var userName1, userName2 , userName3 , password1 , password2 , password3 , loginEmail , loginPassword , adminPassword ,  getUrlLoginEntry , newLoginEntry , newLoginUsername , newLoginPassword
/**
 * INIT
 */


//loginPanel()
function loginPanel()
{
  

      document.getElementById('login_email').addEventListener("input", updateValue);
      function updateValue(e) 
      {
      loginEmail = e.target.value
      console.log("you input e-mail:" +  loginEmail )
      }

      document.getElementById('login_password').addEventListener("input", updateValue2);
      function updateValue2(e) 
      {
      loginPassword = e.target.value
      console.log("you input password:" +  loginPassword )
      }


      
      fetch('/media/passwords.csv')
      .then(response => response.text())
      .then((data) => {

      //BU İŞLEMLERİ TEKRARLI BİR LOOPA GÖRE PROGRAMLAYALIM

      userName1 =  data.split("\n" )[0].split("," )[0]
      userName2 =  data.split("\n" )[1].split("," )[0]
      userName3 =  data.split("\n" )[2].split("," )[0]
      console.log("username:" + userName1)
      console.log("username2:" + userName2)
      console.log("username3:" + userName3)

      password1 = data.split("\n" )[0].split("," )[1]
      password2=  data.split("\n" )[1].split("," )[1]
      password3 =  data.split("\n" )[2].split("," )[1]
      console.log("password:" + password1)
      console.log("password2:" + password2)
      console.log("password3:" + password3)


      })

    document.getElementById("login_login_button").onclick = ()=>
    {   
    document.getElementById("login_form").remove()
    console.log("match")

    /*
      console.log(loginEmail)
      console.log(userName1)
      console.log(loginPassword)
      console.log(password1)
      console.log("clicked") 
      
      if ((loginEmail == "") && (loginPassword == "")) 
        {
            document.getElementById("login_form").remove()
            console.log("match")
        }
    */

    }

/**
 * ADMIN PANEL
 */

    document.getElementById("admin_button").onclick = ()=>
    {
        document.getElementById("login_form").style.display = "none";
        document.getElementById("admin_login_form").style.display = "block";

    }
    document.getElementById('login_password_admin').addEventListener("input", updateValue);
    function updateValue(e) 
    {
        adminPassword = e.target.value
    }
    document.getElementById("login_login_button_admin").onclick = ()=>
    { 
        if(adminPassword = "admin12345")
        {

        newLoginEntry = " "

        newLoginUsername = prompt("Please add new user", "New User");
        newLoginPassword = prompt("Please add password for " + `${newLoginUsername}`);

        newLoginEntry = newLoginUsername + " " + " " + newLoginPassword

        setTimeout(() => 
        {
            console.log("newLoginEntry:" + newLoginEntry)
            Functions.sendData(newLoginEntry , getUrlLoginEntry)    //NOT: BU ŞEKİLDE HAZIRLADIĞIMIZ TEXT DOSYALARINA *.TEMP HARİCİNDE BİR İSİM VERDİĞİMİZ ZAMAN SERVER TARAFINDA PASSWORD DOSYALARINI BU ŞEKİLDE OKUTABİLİRİZ.
        }, "3000")

        }
    }
    document.getElementById("login_close_button_admin").onclick = ()=>
    { 
        document.getElementById("login_form").style.display = "block";
        document.getElementById("admin_login_form").style.display = "none";
    }
}

/*
####     #####    ###   #####    
 ##     ### ###  ## ##   ## ##   
 ##     ##   ## ##   ##  ##  ##  
 ##     ##   ## ##   ##  ##  ##  
 ##     ##   ## #######  ##  ##  
 ##  ## ### ### ##   ##  ## ##   
#######  #####  ##   ## #####    
*/  


setTimeout(loadParameters, 5000)
function loadParameters() 
{
    
//BACKWALL VISIBILITY
        if (Functions.getQueryVariable("backwall"))
        {
            switchBack.checked = true
            scene.getObjectByName( "back_wall_1" ).visible = true;
            scene.getObjectByName( "back_wall_2" ).visible = true;
            loadGraphicControls()
                
            var standInfo = "peninsula"
            document.getElementById("stand_info_text").style.left = "315px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standInfo + standSize
        }
//BACKWALL CUSTOM IMAGE
        if (Functions.getQueryVariable("backwall_image"))
        {
            var uploadCodeBw = Functions.getQueryVariable("backwall_image")

            new THREE.FileLoader().load //It can also be used directly to load any file type that does not have a loader. 
            (
                `https://cdn.filestackcontent.com/${uploadCodeBw}`,

                // WHEN LOADED , DO 
                function ( mapUrlBw ) 
                {
                    var textureLoaderBw = new THREE.TextureLoader().load(mapUrlBw)
                    scene.getObjectByName( "back_wall_1" ).material.map = textureLoaderBw
                    textureLoaderBw.colorSpace = THREE.SRGBColorSpace;
                }
            )
        }

}


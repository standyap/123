import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'

//import gsap from 'gsap';
import * as dat from 'three/examples/jsm/libs/lil-gui.module.min.js'
import * as Functions from './functions.js'
//import { jsPDF } from "jspdf";
//import { _forEachName } from 'gsap/gsap-core.js'

/*                                
###### ##   ## ###### # ##### 
##   ###  ##   ##  ## ## ## 
##   #### ##   ##     ##    
##   #######   ##     ##    
##   ## ####   ##     ##    
##   ##  ###   ##     ##    
###### ##   ## ######  ####   
*/                         

{//START OF MAIN GROUP
var container = document.querySelector('.container');
var overlay = document.querySelector('.html');
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster(); 
var intersect = new THREE.Vector3();
var intersect2 = new THREE.Vector3();
var intersect3 = new THREE.Vector3();
/**
 * Loaders
 */

var gltfLoader = new GLTFLoader()
var rgbeLoader = new RGBELoader()

var global = {}
/**
 * Canvas
 */
var canvas = document.querySelector('canvas.webgl')
document.querySelector('.webgl').preserveDrawingBuffer=true 
var scene = new THREE.Scene()
//var light = new THREE.PointLight( 0xff0000, 5, 100 ); light.position.set( 0, 50, 0 ); scene.add( light );
/**
 * Update all materials
 */
updateAllMaterials()
function updateAllMaterials()
{
    scene.traverse(
        (child) =>
    {
        if(child.isMesh && child.material.isMeshStandardMaterial)
        {
            child.material.envMapIntensity = global.envMapIntensity
           // console.log(child.material)
            console.log(child)
            //Hide All Objects on first initilazation
            child.visible = false;
            //Show first scene objects
            scene.getObjectByName( "environment" ).visible = true;
            scene.getObjectByName( "environment_floor" ).visible = true;
            scene.getObjectByName( "stand_1" ).visible = true;
            scene.getObjectByName( "stand_2" ).visible = true;
            scene.getObjectByName( "stand_2" ).material.emissive.setStyle("#000000")
            scene.getObjectByName( "drag_front" ).visible = true;
            scene.getObjectByName( "drag_right" ).visible = true;
            scene.getObjectByName( "drag_left" ).visible = true;
            //scene.getObjectByName( "limiter_people" ).visible = true;
            scene.getObjectByName( "limiter_double_sofa" ).visible = true;
            scene.getObjectByName( "limiter_double_sofa90" ).visible = true;
                    
        }
    })
}

function loadEnvironmentMap()
{
    /**
     * Environment map
     */
    global.envMapIntensity = 1.2
    // HDR (RGBE) equirectangular (Load after gltf model loaded)
    var environmentMap = rgbeLoader.load('/media/environment.hdr', (environmentMap) =>
    {
     // console.log(environmentMap)
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = environmentMap
    scene.background = environmentMap
    })
}


    var loader = document.createElement("div")
    loader.id = "loader"
    document.body.appendChild(loader);
    
    
    gltfLoader.load(
        '/model/standyap.gltf',
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
    var sizes = {
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
    
}//END OF MAIN GROUP


/*


  ####    ###   ##   ## ####### ######    ###    
 ##  ##  ## ##  ### ###  ##   #  ##  ##  ## ##   
##      ##   ## #######  ##      ##  ## ##   ##  
##      ##   ## ## # ##  ####    #####  ##   ##  
##      ####### ##   ##  ##      ## ##  #######  
 ##  ## ##   ## ##   ##  ##   #  ## ##  ##   ##  
  ####  ##   ## ### ### ####### #### ## ##   ##  

  ######  ####### ##   ## #####  ####### ######   
 ##  ##  ##   # ###  ##  ## ##  ##   #  ##  ##  
 ##  ##  ##     #### ##  ##  ## ##      ##  ##  
 #####   ####   #######  ##  ## ####    #####   
 ## ##   ##     ## ####  ##  ## ##      ## ##   
 ## ##   ##   # ##  ###  ## ##  ##   #  ## ##   
#### ## ####### ##   ## #####  ####### #### ##  
                                                

*/                                                 
{//START OF MAIN GROUP
    var camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
    camera.position.set(9, 8, 9) //x,y,z
    
    scene.add(camera)
    
    gsap.to(camera.position,
        {
        duration: 3,
        x: 8,
        y: 6,
        z: 12,
        delay: 0,
    });
    /**
 * GSAP KAMERA AYARI YAPARKEN 
 * CAMERA POSITION DEĞERLERİ BAŞLANGIÇ DEĞERLERİ GSAP DEĞERLERİ İSE ULAŞILACAK DEĞERLERİ GÖSTERİYOR.
 * controls.target.y = 1.5 BU KAMERANIN UZAKLIĞINI BELİRLİYOR.
 * KAMERA POZİSYONUNU EKRANDAN OKUYUP ONA GÖRE AYARLAMA YAPMAK İÇİN TEST BUTONUNA CONSOLE.LOG(CAMERA.POSITION) VEYA TICK'İN İÇİNE DE KOYABİLİRİZ BU SAYEDE HER KAREDE 
 * KAMERA POZİSYONU OKUYABİLİRİZ.
 */
    // Camera Controls
    var controls = new OrbitControls(camera, canvas)
    controls.target.y = 1.5
    //controls.enableZoom=true
    controls.enableDamping = true   //used to give a sense of weight to the controls. 
    controls.enablePan = false
    // Min Max Distance and Rotation Limits
    controls.minPolarAngle = 0;
    controls.maxPolarAngle =  Math.PI * 0.5;
    controls.maxDistance = 21   //MAKS ZOOM
    controls.minDistance = 5    //MIN ZOOM

// Render cameras

var cameraRight = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
cameraRight.position.set(14, 4, 0)
scene.add(cameraRight)
cameraRight.lookAt(0,0,0)

var controlsRight = new OrbitControls(cameraRight, canvas)
controlsRight.target.y = 3.5
controlsRight.enableDamping = true
controlsRight.minPolarAngle = 0;
controlsRight.maxPolarAngle =  Math.PI * 0.5;
controlsRight.maxDistance = 15
controlsRight.minDistance = 5

var cameraLeft = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
cameraLeft.position.set(-20, 6, 0)
//scene.add(cameraLeft)

var cameraBack = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 5000)
cameraBack.position.set(0, 6, 20)
//scene.add(cameraBack)



/**
 * Renderer
 */
var renderer = new THREE.WebGLRenderer({canvas: canvas , preserveDrawingBuffer: true})


//configure WebGLRenderer as follows when using glTF
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate main camera
 */
var clock = new THREE.Clock()
var tick = () =>
{
    // Time
    var elapsedTime = clock.getElapsedTime()

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

var clockRight = new THREE.Clock()
function tickRight()
{
    // Time
    var elapsedTime = clockRight.getElapsedTime()

    // Update controls
    controlsRight.update()

    // Render
    
    renderer.render(scene, cameraRight)
   
    // Call tick again on the next frame
    window.requestAnimationFrame(tickRight)
    //console.log(camera.position)
}

}//END OF MAIN GROUP

/*
##### ####     ##### ######    ###   ####     
##   ## ##     ### ### ##  ##  ## ##   ##      
##      ##     ##   ## ##  ## ##   ##  ##      
## #### ##     ##   ## #####  ##   ##  ##      
##   ## ##     ##   ## ##  ## #######  ##      
##   ## ##  ## ### ### ##  ## ##   ##  ##  ##  
 ##### #######  ##### ######  ##   ## #######  
                                               
 ####### ##   ## ##   ##   ####   
  ##   # ##   ## ###  ##  ##  ##  
  ##     ##   ## #### ## ##       
  ####   ##   ## ####### ##       
  ##     ##   ## ## #### ##       
  ##     ##   ## ##  ###  ##  ##  
 ####     #####  ##   ##   ####   
 */                                 
 var allObjects = []

 setTimeout(loadGlobalFunctions, 5000)      
 function loadGlobalFunctions() 
 {
    /**
     *  ON EVENT OF CLICK ALL
     */
    
    function getAllObjects()        //  BU KULLANIM ŞEKLİYLE PROJENİN HERHANGİ BİR ALANINDA ALLOBJECTS VARIABLE'I BİE GETALLOBJECTS OLARAK DÖNÜYOR. VARIABLE FONKSİYONUN DIŞINDA YALNIZ BAŞINA TANIMLANMALIDIR.
    {
        scene.traverse( function( objects ) 
        {
            if ( objects.isMesh ) 
                {
                    allObjects.push(objects)
                }
                
        })
    }
    getAllObjects()
    
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
var tempB,tempR,tempL , backWallUploadResponseUrl,bb,rr,ll,rightWallUploadResponseUrl,leftWallUploadResponseUrl,hoverBack,hoverRight,hoverLeft
/**
 * 
 * BU FONKSİYONLARA NEDEN SETTIMEOUT VERMEDİK?
 * ÇÜNKÜ BU FONKSİYONLARI SWITCHLER AKTİF OLDUĞUNDA ÇALIŞTIRACAĞIZ VE SWITCHLERİN AKTİF OLMASI İÇİN İSE ONLARIN SETTIMEOUT METODUNU BEKLEMEMİZ GEREKECEK
 * YANİ ZAMAN DOLMADAN SWITCH'E TIKLARSAK BİR HATA MESAJI ALMAYIZ AMA İŞLEM DE YAPAMAYIZ.SWITCH'İ GERİ DÖNDÜRMEMİZ GEREKİR.
 * 
 */


function loadGraphicControlsBack()// FUNCTION WORKS WHEN RIGHTWALL SWITCH ON
{
var backWall = scene.getObjectByName( "back_wall" )
var rightWall = scene.getObjectByName( "right_wall" )
var leftWall = scene.getObjectByName( "left_wall" )
/**
 * 
 * HER DUVARIN GRAPHIC CONTROL ÖNCEDEN TANIMLAMAMIZ GEREKİYOR Kİ BİRİNE TIKLADIĞIMIZDA DİĞERİNİ GİZLEYEBİLELİM
 * ÖRNEĞİN BİZ LEFT WALL'U BACK WALL'DEN SONRA TANIMLADIK AMA BROWSERDA ÖNCE LEFT WALL'I AÇTIK 
 * /BACK WALL'I AÇTIĞIMIZDA LEFT WALL GRAPHIC CONTROL'U GİZLE DERSEK HENÜZ TANIMLANMADIĞI İÇİN İŞLEM YAPILMAZ
 * 
 */
var backWallGraphicControl = document.getElementById("graphics_control_icon_group_back_wall")   
var rightWallGraphicControl = document.getElementById("graphics_control_icon_group_right_wall")    
var leftWallGraphicControl = document.getElementById("graphics_control_icon_group_left_wall")   

window.addEventListener( 'mousemove', detectClickBackWall);
function detectClickBackWall(event)
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
    //console.log("mouse coordinates:" + mouse.x , mouse.y)

    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObject(backWall)
    intersect2= raycaster.intersectObject(rightWall)
    intersect3= raycaster.intersectObject(leftWall)

/**
 * 
 * SET CURSOR TO POINTER
 * BU İŞLEMİ NEDEN YAPIYORUZ? ÇÜNKÜ HERBİRİNİ TEKER TEKER YAPARSAK BİRİNİN HOVEROUT'U DİĞERİNİN HOVERIYLA KESİŞİYOR
 * BU DURUMDA SADECE SON EKLENEN HOVER POINTER OLUYOR DİĞERLERİ HOVER OLSA BİLE İLK OBJENİN HOVEROUTU GİBİ İŞLEM GÖRÜYOR.
 * 
 */
    if ((intersect.length > 0) || (intersect2.length > 0) || (intersect3.length > 0))
    {          
        canvas.style.cursor = "pointer"
    }
    else
    {   
        canvas.style.cursor = "default"
    }
    if (intersect.length > 0) 
    {
        canvas.addEventListener( 'mousedown', onClickBackWall); //WHEN HOVERED DETECT CLICK EVENT
    }
    else
    {
        canvas.removeEventListener( 'mousedown', onClickBackWall);
    }
}
function onClickBackWall()
{
    leftWallGraphicControl.style.visibility = "hidden"
    rightWallGraphicControl.style.visibility = "hidden"
    setTimeout(() => {
        tempB = backWall.getWorldPosition(new THREE.Vector3())
        tempB.project(camera);// get the normalized screen coordinate of world position
    
        // convert the normalized position to CSS coordinates
        var x = (tempB.x *  .5 + .5) * canvas.clientWidth;
        var y = (tempB.y * -.5 + .5) * canvas.clientHeight;
        
        backWallGraphicControl.style.left = `${x}px`
        backWallGraphicControl.style.top = `${y}px`
        backWallGraphicControl.style.visibility = "visible"
      }, "200");
    
}
document.getElementById("add_icon").onclick = ()=>
{   
    var inputBack = document.createElement('input');
    inputBack.type = 'file';
    
    inputBack.onchange = e => 
    { 
       // getting a hold of the file reference
       var fileBack = e.target.files[0]; 
       // setting up the reader
       var readerBack = new FileReader();
       readerBack.readAsDataURL(fileBack); // this is reading as data url
       // here we tell the reader what to do when it's done reading...
       readerBack.onload = readerEvent => 
       {
        var contentBack = readerEvent.target.result; // this is the content!
        var textureBack = new THREE.TextureLoader().load(contentBack);
        
        Functions.sendDataParams(contentBack , backWallUploadResponseUrl , "backwall_image" )
        scene.getObjectByName( "back_wall_1" ).material.map = textureBack
        textureBack.rotation = THREE.MathUtils.degToRad(90);
        textureBack.colorSpace = THREE.SRGBColorSpace;
        textureBack.wrapS = THREE.RepeatWrapping;
        textureBack.wrapT = THREE.RepeatWrapping;
        textureBack.repeat.set( 1, 1 );
            
    //The last thing to note about the example is that if you change wrapS or wrapT on the texture you must also set texture.needsUpdate so three.js knows to apply those settings. The other settings are automatically applied.
    // textureBack.needsUpdate =true
    //scene.getObjectByName( "back_wall_1" ).material.needsUpdate = true
       }
    }
    inputBack.click();
}


/**
 * 
 * 
 * BACK WALL GRAPHIC ICONS
 * 
 * 
 */ 

bb=1
document.getElementById("zoom_out_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb + 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( bb, bb );
Functions.addOrUpdateURLParam ("backwall_image_zoom" , `${bb}`)//PARAMS SAVE BACK WALL ZOOM OUT
}

document.getElementById("zoom_in_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb - 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( bb, bb );
Functions.addOrUpdateURLParam ("backwall_image_zoom" , `${bb}`)//PARAMS SAVE BACK WALL ZOOM IN
}

document.getElementById("left_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb - 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.offset.set(bb, Functions.getQueryVariable("backwall_image_position_ver"))
Functions.addOrUpdateURLParam ("backwall_image_position_hor" , `${bb}`)//PARAMS SAVE BACK WALL POSITION LEFT
}

document.getElementById("right_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb + 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.offset.set(bb, Functions.getQueryVariable("backwall_image_position_ver"))
Functions.addOrUpdateURLParam ("backwall_image_position_hor" , `${bb}`)//PARAMS SAVE BACK WALL POSITION RIGHT
}

document.getElementById("up_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb + 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.offset.set(Functions.getQueryVariable("backwall_image_position_hor"), bb)
Functions.addOrUpdateURLParam ("backwall_image_position_ver" , `${bb}`)//PARAMS SAVE BACK WALL POSITION UP
}
document.getElementById("down_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb - 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.offset.set(Functions.getQueryVariable("backwall_image_position_hor"), bb)
Functions.addOrUpdateURLParam ("backwall_image_position_ver" , `${bb}`)//PARAMS SAVE BACK WALL POSITION DOWN
}

document.getElementById("apply_icon").onclick = ()=>
{ 
    backWallGraphicControl.style.visibility = "hidden"       
}
document.getElementById("refresh_icon").onclick = ()=>
{ 
    scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( 1, 1 );
    Functions.addOrUpdateURLParam ("backwall_image_zoom" , "1")
}
}
function loadGraphicControlsRight()// FUNCTION WORKS WHEN RIGHTWALL SWITCH ON
{
var rightWall = scene.getObjectByName( "right_wall" )
/**
 * 
 * HER DUVARIN GRAPHIC CONTROL ÖNCEDEN TANIMLAMAMIZ GEREKİYOR Kİ BİRİNE TIKLADIĞIMIZDA DİĞERİNİ GİZLEYEBİLELİM
 * ÖRNEĞİN BİZ LEFT WALL'U BACK WALL'DEN SONRA TANIMLADIK AMA BROWSERDA ÖNCE LEFT WALL'I AÇTIK 
 * BACK WALL'I AÇTIĞIMIZDA LEFT WALL GRAPHIC CONTROL'U GİZLE DERSEK HENÜZ TANIMLANMADIĞI İÇİN İŞLEM YAPILMAZ
 * 
 */
var backWallGraphicControl = document.getElementById("graphics_control_icon_group_back_wall")   
var rightWallGraphicControl = document.getElementById("graphics_control_icon_group_right_wall")    
var leftWallGraphicControl = document.getElementById("graphics_control_icon_group_left_wall")   
    
window.addEventListener( 'mousemove', detectClickRightWall);
function detectClickRightWall(event)
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;
    //console.log("mouse coordinates:" + mouse.x , mouse.y)

    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObject(rightWall)
    if (intersect.length > 0)
    {   
        console.log("hovered right wall")
        canvas.addEventListener( 'mousedown', onClickRightWall); //WHEN HOVERED DETECT CLICK EVENT
    }
    else
    {   
        canvas.removeEventListener( 'mousedown', onClickRightWall);
    }
}

function onClickRightWall()
{   leftWallGraphicControl.style.visibility = "hidden"
    backWallGraphicControl.style.visibility = "hidden"
    setTimeout(() => {
   // console.log("clicked back wall")
    tempR = rightWall.getWorldPosition(new THREE.Vector3())
    tempR.project(camera);// get the normalized screen coordinate of world position

    // convert the normalized position to CSS coordinates
    var x = (tempR.x *  .5 + .5) * canvas.clientWidth;
    var y = (tempR.y * -.5 + .5) * canvas.clientHeight;
    
    rightWallGraphicControl.style.left = `${x}px`
    rightWallGraphicControl.style.top = `${y}px`
    rightWallGraphicControl.style.visibility = "visible"
}, "200");
    
}
document.getElementById("add_icon_right").onclick = ()=>
{   
    var inputRight = document.createElement('input');
    inputRight.type = 'file';
    
    inputRight.onchange = e => 
    { 
    
       // getting a hold of the file reference
       var fileRight = e.target.files[0]; 
    
       // setting up the reader
       var readerRight = new FileReader();
       readerRight.readAsDataURL(fileRight); // this is reading as data url
    
       // here we tell the reader what to do when it's done reading...
       readerRight.onload = readerEvent => 
       {
        var contentRight = readerEvent.target.result; // this is the content!
        var textureRight = new THREE.TextureLoader().load(contentRight);
        
        Functions.sendDataParams(contentRight , rightWallUploadResponseUrl , "rightwall_image" )
        scene.getObjectByName( "right_wall_1" ).material.map = textureRight
        textureRight.rotation = THREE.MathUtils.degToRad(90);
        textureRight.colorSpace = THREE.SRGBColorSpace;
        textureRight.wrapS = THREE.RepeatWrapping;
        textureRight.wrapT = THREE.RepeatWrapping;
        textureRight.repeat.set( 1, 1 );
   
       }
    }
    inputRight.click();
}
rr=1
document.getElementById("zoom_out_icon_right").onclick = ()=>
{   
rr = Functions.roundXSteps(rr + 0.2 , 2) 
scene.getObjectByName( "right_wall_1" ).material.map.repeat.set( rr, rr );
Functions.addOrUpdateURLParam ("rightwall_image_zoom" , `${rr}`)//PARAMS SAVE RIGHT WALL ZOOM OUT
}
document.getElementById("zoom_in_icon_right").onclick = ()=>
{   
rr = Functions.roundXSteps(rr - 0.2 , 2) 
scene.getObjectByName( "right_wall_1" ).material.map.repeat.set( rr, rr );
Functions.addOrUpdateURLParam ("rightwall_image_zoom" , `${rr}`)//PARAMS SAVE RIGHT WALL ZOOM IN
}

document.getElementById("left_icon_right").onclick = ()=>
{   
rr = Functions.roundXSteps(rr - 0.2 , 2) 
scene.getObjectByName( "right_wall_1" ).material.map.offset.set(rr, 1)
Functions.addOrUpdateURLParam ("rightwall_image_position_left" , `${rr}`)//PARAMS SAVE RIGHT WALL POSITION LEFT
}
document.getElementById("right_icon_right").onclick = ()=>
{   
rr = Functions.roundXSteps(rr + 0.2 , 2) 
scene.getObjectByName( "right_wall_1" ).material.map.offset.set(rr, 1)
Functions.addOrUpdateURLParam ("rightwall_image_position_right" , `${rr}`)//PARAMS SAVE RIGHT WALL POSITION RIGHT
}
document.getElementById("up_icon_right").onclick = ()=>
{   
rr = Functions.roundXSteps(rr + 0.2 , 2) 
scene.getObjectByName( "right_wall_1" ).material.map.offset.set(1, rr)
Functions.addOrUpdateURLParam ("rightwall_image_position_up" , `${rr}`)//PARAMS SAVE RIGHT WALL POSITION UP
}
document.getElementById("down_icon_right").onclick = ()=>
{   
rr = Functions.roundXSteps(rr - 0.2 , 2) 
scene.getObjectByName( "right_wall_1" ).material.map.offset.set(1, rr)
Functions.addOrUpdateURLParam ("rightwall_image_position_down" , `${rr}`)//PARAMS SAVE RIGHT WALL POSITION DOWN
}

document.getElementById("apply_icon_right").onclick = ()=>
{ 
    rightWallGraphicControl.style.visibility = "hidden"       
}
document.getElementById("refresh_icon_right").onclick = ()=>
{ 
    scene.getObjectByName( "right_wall_1" ).material.map.repeat.set( 1, 1 );
    Functions.addOrUpdateURLParam ("rightwall_image_zoom" , "1")
}
}
function loadGraphicControlsLeft()// FUNCTION WORKS WHEN LEFTWALL SWITCH ON
{
var leftWall = scene.getObjectByName( "left_wall" )
/**
 * 
 * HER DUVARIN GRAPHIC CONTROL ÖNCEDEN TANIMLAMAMIZ GEREKİYOR Kİ BİRİNE TIKLADIĞIMIZDA DİĞERİNİ GİZLEYEBİLELİM
 * ÖRNEĞİN BİZ LEFT WALL'U BACK WALL'DEN SONRA TANIMLADIK AMA BROWSERDA ÖNCE LEFT WALL'I AÇTIK 
 * /BACK WALL'I AÇTIĞIMIZDA LEFT WALL GRAPHIC CONTROL'U GİZLE DERSEK HENÜZ TANIMLANMADIĞI İÇİN İŞLEM YAPILMAZ
 * 
 */
var backWallGraphicControl = document.getElementById("graphics_control_icon_group_back_wall")   
var rightWallGraphicControl = document.getElementById("graphics_control_icon_group_right_wall")    
var leftWallGraphicControl = document.getElementById("graphics_control_icon_group_left_wall")   
     
window.addEventListener( 'mousemove', detectClickLeftWall);
function detectClickLeftWall(event)
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 0.9;

    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObject(leftWall)
    if (intersect.length > 0)
    {   
        console.log("hovered left wall")
        canvas.addEventListener( 'mousedown', onClickLeftWall); //WHEN HOVERED DETECT CLICK EVENT
    }
    else
    {   
        canvas.removeEventListener( 'mousedown', onClickLeftWall);
    }
}

function onClickLeftWall()
{
    backWallGraphicControl.style.visibility = "hidden"
    rightWallGraphicControl.style.visibility = "hidden"
    setTimeout(() => {
   // console.log("clicked back wall")
    tempL = leftWall.getWorldPosition(new THREE.Vector3())
    tempL.project(camera);// get the normalized screen coordinate of world position

    // convert the normalized position to CSS coordinates
    var x = (tempL.x *  .5 + .5) * canvas.clientWidth;
    var y = (tempL.y * -.5 + .5) * canvas.clientHeight;
    
    leftWallGraphicControl.style.left = `${x}px`
    leftWallGraphicControl.style.top = `${y}px`
    leftWallGraphicControl.style.visibility = "visible"
    }, "200");
}
document.getElementById("add_icon_left").onclick = ()=>
{   
    var inputLeft = document.createElement('input');
    inputLeft.type = 'file';
    
    inputLeft.onchange = e => 
    { 
    
       // getting a hold of the file reference
       var fileLeft = e.target.files[0]; 
    
       // setting up the reader
       var readerLeft = new FileReader();
       readerLeft.readAsDataURL(fileLeft); // this is reading as data url
    
       // here we tell the reader what to do when it's done reading...
       readerLeft.onload = readerEvent => 
       {
        var contentLeft = readerEvent.target.result; // this is the content!
        
        var textureLeft = new THREE.TextureLoader().load(contentLeft);
        
        Functions.sendDataParams(contentLeft , leftWallUploadResponseUrl , "leftwall_image" )
        scene.getObjectByName( "left_wall_1" ).material.map = textureLeft
        textureLeft.rotation = THREE.MathUtils.degToRad(180);
        textureLeft.colorSpace = THREE.SRGBColorSpace;
        textureLeft.wrapS = THREE.RepeatWrapping;
        textureLeft.wrapT = THREE.RepeatWrapping;
        textureLeft.repeat.set( 1, 1 );
       }
    }
    inputLeft.click();
}
document.getElementById("refresh_icon_left").onclick = ()=>
{   
scene.getObjectByName( "left_wall_1" ).material.map.repeat.set( 1, 1 );
Functions.removeURLParameters (['leftwall_image_zoom'])
}
ll=1
document.getElementById("zoom_out_icon_left").onclick = ()=>
{   
ll = Functions.roundXSteps(ll + 0.2 , 2) 
scene.getObjectByName( "left_wall_1" ).material.map.repeat.set( ll, ll );
Functions.addOrUpdateURLParam ("leftwall_image_zoom" , `${ll}`)//PARAMS SAVE LEFT WALL ZOOM OUT
}
document.getElementById("zoom_in_icon_left").onclick = ()=>
{   
ll = Functions.roundXSteps(ll - 0.2 , 2) 
scene.getObjectByName( "left_wall_1" ).material.map.repeat.set( ll, ll );
Functions.addOrUpdateURLParam ("leftwall_image_zoom" , `${ll}`)//PARAMS SAVE LEFT WALL ZOOM IN
}

document.getElementById("left_icon_left").onclick = ()=>
{   
ll = Functions.roundXSteps(ll - 0.2 , 2) 
scene.getObjectByName( "left_wall_1" ).material.map.offset.set(ll, 1)
Functions.addOrUpdateURLParam ("leftwall_image_position_left" , `${ll}`)//PARAMS SAVE LEFT WALL POSITION LEFT
}
document.getElementById("right_icon_left").onclick = ()=>
{   
ll = Functions.roundXSteps(ll + 0.2 , 2) 
scene.getObjectByName( "left_wall_1" ).material.map.offset.set(ll, 1)
Functions.addOrUpdateURLParam ("leftwall_image_position_right" , `${ll}`)//PARAMS SAVE LEFT WALL POSITION RIGHT
}
document.getElementById("up_icon_left").onclick = ()=>
{   
ll = Functions.roundXSteps(ll + 0.2 , 2) 
scene.getObjectByName( "left_wall_1" ).material.map.offset.set(1, ll)
Functions.addOrUpdateURLParam ("leftwall_image_position_up" , `${ll}`)//PARAMS SAVE LEFT WALL POSITION UP
}
document.getElementById("down_icon_left").onclick = ()=>
{   
ll = Functions.roundXSteps(ll - 0.2 , 2) 
scene.getObjectByName( "left_wall_1" ).material.map.offset.set(1, ll)
Functions.addOrUpdateURLParam ("leftwall_image_position_down" , `${ll}`)//PARAMS SAVE LEFT WALL POSITION DOWN
}

document.getElementById("apply_icon_left").onclick = ()=>
{ 
    leftWallGraphicControl.style.visibility = "hidden"       
}

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
var standWidth , standDepth , standInfo , standSize ,currentUrl
/**
 *  Global Variables
 */
setTimeout(switchesLoaded, 5000);
function switchesLoaded()
{
    
//INIT

    var switchLeft = document.getElementById("toogle_switch_left_wall_switch")
    var switchBack = document.getElementById("toogle_switch_back_wall_switch")
    var switchRight = document.getElementById("toogle_switch_right_wall_switch")
/**
 * TEMPORARILY USED THESE INIT VALUES BECAUSE IF WE INIT WITH URL PARAMETERS WE NEED TO SET VALUES BY VISIBILITIES OF WALLS
 */
    standWidth = 2 
    standDepth = 2
    standInfo = "island"
    document.getElementById("stand_info_text").style.left = "330px";
    document.getElementById("stand_info_text").style.bottom = "20px";
    standSize = standWidth + "m" + " x " + standDepth + "m"
    document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo

//CHECK BACK WALL
        switchBack.addEventListener('change', function () {
        if (switchBack.checked ) 
        {
            scene.getObjectByName( "back_wall_1" ).visible = true;
            scene.getObjectByName( "back_wall_2" ).visible = true;
           scene.getObjectByName( "back_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
           scene.getObjectByName( "back_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
           scene.getObjectByName( "back_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
           scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( 1, 1 );
           scene.getObjectByName( "back_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);

/**
 *  DRAG'LER VISIBLE OLMADIĞINDA DRAG CONTROLLERİ AÇIK OLUYORDU VE KAPATAMIYORDUK
 *   AMA BU SİSTEMİ KULLANARAK DRAG FRONTU KULLANILAMAYACAK BİR ALANA KAYDIRIYORUZ VE BİR TÜR TRICK YAPIYORUZ.
 *   AYNI SİSTEM LEFT VE RIGHT İÇİN DE GEÇERLİ  
 */
            scene.getObjectByName( "back_wall" ).position.y=1.6
            
            loadGraphicControlsBack()
            
            var standInfo = "peninsula"
            document.getElementById("stand_info_text").style.left = "315px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
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

            scene.getObjectByName( "back_wall" ).position.y=-20
            scene.getObjectByName( "right_wall" ).position.y=-20
            scene.getObjectByName( "left_wall" ).position.y=-20
            console.log('Island');

            var standInfo = "island"
            document.getElementById("stand_info_text").style.left = "330px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
            
            //switchLeft.setAttribute("checked" , false) bu şekilde kullanım kabul etmiyor.
            //IF LEFT AND RIGHT SWITCHES ARE CHECKED UNCHECK THEM
            switchLeft.checked = false
            switchRight.checked = false
          
            
            Functions.removeURLParameters(['backwall'])
            Functions.removeURLParameters(['rightwall'])
            Functions.removeURLParameters(['leftwall'])
            Functions.removeURLParameters(['backwall_image'])
            Functions.removeURLParameters(['leftwall_image'])
            Functions.removeURLParameters(['rightwall_image'])
            
        }
               
        });

//CHECK LEFT WALL
switchLeft.addEventListener('change', function () {
    if (switchLeft.checked ) 
    {
      
       if (scene.getObjectByName( "right_wall_1" ).visible)
       {
            scene.getObjectByName( "left_wall_1" ).visible = true;
            scene.getObjectByName( "left_wall_2" ).visible = true;
            scene.getObjectByName( "back_wall_1" ).visible = true;
            scene.getObjectByName( "back_wall_2" ).visible = true;

            scene.getObjectByName( "back_wall" ).position.y=1.6
            scene.getObjectByName( "left_wall" ).position.y=1.6

            scene.getObjectByName( "left_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
            scene.getObjectByName( "left_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
            scene.getObjectByName( "left_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
            scene.getObjectByName( "left_wall_1" ).material.map.repeat.set( 1, 1 );
            scene.getObjectByName( "left_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);


            loadGraphicControlsBack()
            loadGraphicControlsLeft()
           var standInfo = "row"
           document.getElementById("stand_info_text").style.left = "350px";
           document.getElementById("stand_info_text").style.bottom = "22px";
           document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
           //PARAMS SAVE LEFT WALL
            Functions.addOrUpdateURLParam ("leftwall" , "visible")
            Functions.addOrUpdateURLParam ("backwall" , "visible")

            //SEND CURRENT URL TO FILESTACK
            var currentUrl = window.location.href    
          // Functions.sendData(currentUrl)       
          switchBack.checked = true 
       }
       else
       {
        scene.getObjectByName( "left_wall_1" ).visible = true;
        scene.getObjectByName( "left_wall_2" ).visible = true;
        scene.getObjectByName( "back_wall_1" ).visible = true;
        scene.getObjectByName( "back_wall_2" ).visible = true;

        scene.getObjectByName( "back_wall" ).position.y=1.6
        scene.getObjectByName( "left_wall" ).position.y=1.6

        scene.getObjectByName( "left_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
        scene.getObjectByName( "left_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
        scene.getObjectByName( "left_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
        scene.getObjectByName( "left_wall_1" ).material.map.repeat.set( 1, 1 );
        scene.getObjectByName( "left_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);

        loadGraphicControlsBack()
        loadGraphicControlsLeft()
        
        var standInfo = 
        "&nbspCorner" + 
        "<br></br>"+
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspLeft"
        document.getElementById("stand_info_text").style.left = "315px";
        document.getElementById("stand_info_text").style.bottom = "15px";
        document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
//PARAMS SAVE LEFT WALL
        Functions.addOrUpdateURLParam ("leftwall" , "visible")
        Functions.addOrUpdateURLParam ("backwall" , "visible")

        //SEND CURRENT URL TO FILESTACK
        var currentUrl = window.location.href    
       // Functions.sendData(currentUrl)       
       switchBack.checked = true 
       } 

    } 
        
    else 
    {
        if (scene.getObjectByName( "right_wall_1" ).visible)
        {
            scene.getObjectByName( "left_wall_1" ).visible = false;
            scene.getObjectByName( "left_wall_2" ).visible = false;

            scene.getObjectByName( "back_wall" ).position.y=-20
            scene.getObjectByName( "left_wall" ).position.y=-20

            var standInfo = 
            "&nbspCorner" + 
            "<br></br>"+
            "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRight"
           
            document.getElementById("stand_info_text").style.left = "325px";
            document.getElementById("stand_info_text").style.bottom = "15px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
            switchLeft.checked = false
            Functions.removeURLParameters(['leftwall'])
            Functions.removeURLParameters(['leftwall_image'])
        }
        else
        {
            scene.getObjectByName( "left_wall_1" ).visible = false;
            scene.getObjectByName( "left_wall_2" ).visible = false;

            scene.getObjectByName( "left_wall" ).position.y=-20
    
            var standInfo = "peninsula"
            document.getElementById("stand_info_text").style.left = "330px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
            
            //switchLeft.setAttribute("checked" , false) bu şekilde kullanım kabul etmiyor.
            //IF LEFT AND RIGHT SWITCHES ARE CHECKED UNCHECK THEM
            switchLeft.checked = false
            Functions.removeURLParameters(['leftwall'])
            Functions.removeURLParameters(['leftwall_image'])
        }
        
    }
})
//CHECK RIGHT WALL
switchRight.addEventListener('change', function () {
    if (switchRight.checked ) 
    {
        if (scene.getObjectByName( "left_wall_1" ).visible)
        {
            scene.getObjectByName( "right_wall_1" ).visible = true;
            scene.getObjectByName( "right_wall_2" ).visible = true;
            scene.getObjectByName( "back_wall_1" ).visible = true;
            scene.getObjectByName( "back_wall_2" ).visible = true;

            scene.getObjectByName( "back_wall" ).position.y=1.6
            scene.getObjectByName( "right_wall" ).position.y=1.6

            scene.getObjectByName( "right_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
            scene.getObjectByName( "right_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
            scene.getObjectByName( "right_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
            scene.getObjectByName( "right_wall_1" ).material.map.repeat.set( 1, 1 );
            scene.getObjectByName( "right_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);

            loadGraphicControlsBack()
            loadGraphicControlsRight()

            var standInfo = "row"
            document.getElementById("stand_info_text").style.left = "350px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
             //PARAMS SAVE BACK WALL
             Functions.addOrUpdateURLParam ("rightwall" , "visible")
             Functions.addOrUpdateURLParam ("backwall" , "visible")
     
             //SEND CURRENT URL TO FILESTACK
             var currentUrl = window.location.href    
            // Functions.sendData(currentUrl)          
            switchBack.checked = true  
        }
        else
        {
            scene.getObjectByName( "right_wall_1" ).visible = true;
            scene.getObjectByName( "right_wall_2" ).visible = true;
            scene.getObjectByName( "back_wall_1" ).visible = true;
            scene.getObjectByName( "back_wall_2" ).visible = true;

            scene.getObjectByName( "back_wall" ).position.y=1.6
            scene.getObjectByName( "right_wall" ).position.y=1.6

            scene.getObjectByName( "right_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
            scene.getObjectByName( "right_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
            scene.getObjectByName( "right_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
            scene.getObjectByName( "right_wall_1" ).material.map.repeat.set( 1, 1 );
            scene.getObjectByName( "right_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);

            loadGraphicControlsBack()
            loadGraphicControlsRight()
            
            var standInfo =
            "&nbspCorner" + 
            "<br></br>"+
            "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRight"
            document.getElementById("stand_info_text").style.left = "315px";
            document.getElementById("stand_info_text").style.bottom = "15px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
    //PARAMS SAVE BACK WALL
            Functions.addOrUpdateURLParam ("rightwall" , "visible")
            Functions.addOrUpdateURLParam ("backwall" , "visible")
    
            //SEND CURRENT URL TO FILESTACK
            var currentUrl = window.location.href    
           // Functions.sendData(currentUrl)          
           switchBack.checked = true  
        }
      
    } 
        
    else 
    {
        if (scene.getObjectByName( "left_wall_1" ).visible)
        {
            scene.getObjectByName( "right_wall_1" ).visible = false;
            scene.getObjectByName( "right_wall_2" ).visible = false;

            scene.getObjectByName( "right_wall" ).position.y=-20

            var standInfo = 
            "&nbspCorner" + 
            "<br></br>"+
            "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspLeft"
            document.getElementById("stand_info_text").style.left = "330px";
            document.getElementById("stand_info_text").style.bottom = "15px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo

             //switchLeft.setAttribute("checked" , false) bu şekilde kullanım kabul etmiyor.
            //IF LEFT AND RIGHT SWITCHES ARE CHECKED UNCHECK THEM
            switchRight.checked = false
            Functions.removeURLParameters(['rightwall'])
            Functions.removeURLParameters(['rightwall_image'])
        }
        else
        {
            scene.getObjectByName( "right_wall_1" ).visible = false;
            scene.getObjectByName( "right_wall_2" ).visible = false;

            scene.getObjectByName( "right_wall" ).position.y=-20
    
            var standInfo = "peninsula"
            document.getElementById("stand_info_text").style.left = "330px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standSize +"&nbsp"+"&nbsp"+ standInfo
            
            //switchLeft.setAttribute("checked" , false) bu şekilde kullanım kabul etmiyor.
            //IF LEFT AND RIGHT SWITCHES ARE CHECKED UNCHECK THEM
            switchRight.checked = false
            Functions.removeURLParameters(['rightwall'])
            Functions.removeURLParameters(['rightwall_image'])
        }
    }
})
//RAISED FLOOR SWITCH

    var checkbox4 = document.getElementById("toogle_switch_raised_floor_switch")

    checkbox4.addEventListener('change', function () {
    if (checkbox4.checked)
    {
        scene.getObjectByName( "stand_1" ).scale.y = 0.1
        scene.getObjectByName( "stand_2" ).scale.y = 0.1

        if ( scene.getObjectByName( "back_wall" ).visible==true)
        {
            scene.getObjectByName( "back_wall" ).position.y = 1.5
        }
        if ( scene.getObjectByName( "right_wall" ).visible==true)
        {
            scene.getObjectByName( "right_wall" ).position.y = 1.5
        }
        if ( scene.getObjectByName( "left_wall" ).visible==true)
        {
            scene.getObjectByName( "left_wall" ).position.y = 1.5
        }

    } 
    else
    {
        scene.getObjectByName( "stand_1" ).scale.y = 1
        scene.getObjectByName( "stand_2" ).scale.y = 1
        if ( scene.getObjectByName( "back_wall" ).visible==true)
        {
            scene.getObjectByName( "back_wall" ).position.y = 1.6
        }
        if ( scene.getObjectByName( "right_wall" ).visible==true)
        {
            scene.getObjectByName( "right_wall" ).position.y = 1.6
        }
        if ( scene.getObjectByName( "left_wall" ).visible==true)
        {
            scene.getObjectByName( "left_wall" ).position.y = 1.6
        }
    }
    });
   
    
//FLOOR LIGHT SWITCH
   var checkbox5 = document.getElementById("toogle_switch_floor_light_switch")
   scene.getObjectByName( "stand_2" ).material.emissive.setStyle("#000000")
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
    var checkbox6 = document.getElementById("toogle_switch_dark_theme_switch")

    checkbox6.addEventListener('change', function () {
    if (checkbox6.checked)
    {
        scene.traverse(
            (child) =>
        {
            if(child.isMesh && child.material.isMeshStandardMaterial)
            {
                child.material.envMapIntensity = global.envMapIntensity
                global.envMapIntensity = 0.2
            }
        })
    } 
    else
    {
        scene.traverse(
            (child) =>
        {
            if(child.isMesh && child.material.isMeshStandardMaterial)
            {
                child.material.envMapIntensity = global.envMapIntensity
                global.envMapIntensity = 1.2
            }
        })
    }
    });
   


//STORAGE SWITCH

    var storageWidth = 0 
    var storageDepth = 0
    var storageSize = "N/A"
    document.getElementById("storage_size_text").style.left = "552px";
    //var storageSize = storageWidth + "m" + storageDepth + "m"
    document.getElementById("storage_size_text").innerHTML = "Storage" + "" + "" + storageSize

    var switchStorage = document.getElementById("toogle_switch_storage_switch")
    
    switchStorage.addEventListener('change', function () {
    if (switchStorage.checked)
    {
      //  switchOnStorage()
        console.log('Checked');
        var storageWidth = 1
        var storageDepth = 1
        document.getElementById("storage_size_text").style.left = "540px";
        var storageSize = storageWidth + "m" + " x " + storageDepth + "m"
        document.getElementById("storage_size_text").innerHTML = "Storage" + "" + " " + storageSize
    } 
    else
    {
      //  switchOffStorage()
        console.log('Not Checked');
        document.getElementById("storage_size_text").style.left = "552px";
        var storageSize = "N/A"
        document.getElementById("storage_size_text").innerHTML = "Storage" + "" + " " + storageSize
        
    }
    });

    //CONTROLS SWITCH
    var checkbox7 = document.getElementById("toogle_switch_controllers_switch")
    checkbox7.checked = true
    checkbox7.addEventListener('change', function () {
    if (checkbox7.checked)
    {
        scene.getObjectByName( "drag_front" ).visible = true
        scene.getObjectByName( "drag_right" ).visible = true
        scene.getObjectByName( "drag_left" ).visible = true
/**
 *  DRAG'LER VISIBLE OLMADIĞINDA DRAG CONTROLLERİ AÇIK OLUYORDU VE KAPATAMIYORDUK
 *  AMA BU SİSTEMİ KULLANARAK DRAG FRONTU KULLANILAMAYACAK BİR ALANA KAYDIRIYORUZ VE BİR TÜR TRICK YAPIYORUZ.
 *  AYNI SİSTEM LEFT VE RIGHT İÇİN DE GEÇERLİ  
 */
     
        scene.getObjectByName( "drag_front" ).position.y = 0
        scene.getObjectByName( "drag_right" ).position.y = 0
        scene.getObjectByName( "drag_left" ).position.y = 0
       
        
    } 
    else
    {
        scene.getObjectByName( "drag_front" ).visible = false
        scene.getObjectByName( "drag_right" ).visible = false
        scene.getObjectByName( "drag_left" ).visible = false

        scene.getObjectByName( "drag_front" ).position.y = -20
        scene.getObjectByName( "drag_right" ).position.y = -20
        scene.getObjectByName( "drag_left" ).position.y = -20
        
    }
    });

} //END OF SWITCHES FUNCTION

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
/**
 *  DEFAULTS
 */ 
var getScaleFront , getScaleLeft

if (Functions.getQueryVariable("depth"))
{
    getScaleFront = Functions.getQueryVariable("depth")
}
else
{
    getScaleFront = 1
}
if (Functions.getQueryVariable("width"))
{
    getScaleLeft = Functions.getQueryVariable("width")
}
else
{
    getScaleLeft = 1
}

    /**
     * SCALE FRONT VE SCALE LEFT(VE RIGHT) DEĞİŞKENLERİNE NEDEN İLK DEĞERLER VERİYORUZ?
     * ÇÜNKÜ EĞER BU İLK DEĞERLERİ VERMEZSEK, DRAG FRONTU KULLANDIĞIMIZDA SCALE LEFT HENÜZ YAPILMIŞSA SLAE LEFT DEĞERİ HİÇ TANIMLANMAMIŞ OLUR VE 
     * DRAG FRONTA DOKUNDUĞUMUZ ANDA STANDBASE KAYBOLUR.
     */
    var standBase = scene.getObjectByName( "stand_1" )
    var standSides = scene.getObjectByName( "stand_2" )
    var rightWall = scene.getObjectByName( "right_wall" )
    var backWall = scene.getObjectByName( "back_wall" )
    var leftWall = scene.getObjectByName( "left_wall" )
    var dragFront = scene.getObjectByName( "drag_front" )
    var dragRight = scene.getObjectByName( "drag_right" )
    var dragLeft = scene.getObjectByName( "drag_left" )
    var standTexture = standBase.material.map
    var backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    var rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
    var leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
    var furnitureAdded = false
/**
 * FURNITURE LIMITERS
 */
var limiterPeople = scene.getObjectByName( "limiter_people" )

/**
 *  DRAG FRONT
 */ 
 
    var objectsDragFront = []
    objectsDragFront.push(dragFront)
    var dragDragFront = new DragControls(objectsDragFront, camera, renderer.domElement)
/**
 *  DRAG FRONT EVENT LISTENERS
 */ 

    dragDragFront.addEventListener( 'dragstart', ()=> 
    {
    controls.enabled = false   
    scene.getObjectByName( "right_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "right_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
    scene.getObjectByName( "right_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
    scene.getObjectByName( "right_wall_1" ).material.map.repeat.set( 1, 1 ); 
    scene.getObjectByName( "right_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);
    scene.getObjectByName( "left_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "left_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
    scene.getObjectByName( "left_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
    scene.getObjectByName( "left_wall_1" ).material.map.repeat.set( 1, 1 ); 
    scene.getObjectByName( "left_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);

    })
    
    dragDragFront.addEventListener ( 'drag', onDragEventDragFront)
    
    function onDragEventDragFront() { 
        if(scene.getObjectByName( "people0" ).visible == true){
            let dragAlert = "Furnitures are available in the scene.If you change the size furnitures will be removed"
            if (confirm(dragAlert) == true) {scene.getObjectByName( "people0" ).visible = false} 
        }
        else if(scene.getObjectByName( "people0" ).visible == false){
        
         
        //CONSTRAINTS
        /**
         * CONSTRAINTS'İ DRAG START'A KOYMAYALIM.
         * ÇÜNKÜ DRAG START ONLARI BİR KERE OKUYOR VE DRAG ANINDA TEKRAR ETMİYOR.
         * DRAG ANLIK OLARAK HER KAREDE O DEĞERLERİ GÖRMEK İSTİYOR.
         */
        dragFront.position.y = 0
        dragFront.position.x = 0
    
        if (dragFront.position.z < 0) 
        {
            dragFront.position.z = 0
        } 
        else if (dragFront.position.z > 3) 
        {
            dragFront.position.z = 3
        }
        //CONSTRAINTS
        /**
         * standTexture = standBase.material.map NEDEN HER STAIRA EKLİYORUZ?
         * ÇÜNKÜ TEXTURE'I HERHANGİ BİR ANDA DEĞİŞTİRDİĞİMİZDE STANDTEXTURE VARIABLE'I İLK TEXTURE'A TANIMLANMIŞ OLARAK KALACAK
         */
        if (dragFront.position.z < 0.25)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 0
                backWall.position.z = -1.9  //scale.set(width,height,depth)
                standBase.scale.set(getScaleLeft, 1, 1)
                limiterPeople.scale.set(getScaleLeft, 1, 1)
                standSides.scale.set(getScaleLeft, 1, 1)
                standTexture.repeat.set(getScaleLeft, 1);
                rightWallTexture.repeat.set(1, 1);
                leftWallTexture.repeat.set(1, 1);
                rightWall.scale.set(1,1,1)
                leftWall.scale.set(1,1,1)
                getScaleFront = 1
            } 
            else if (dragFront.position.z >= 0.25 && dragFront.position.z < 0.75)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 0.6
                backWall.position.z = -2.4
                standBase.scale.set(getScaleLeft, 1, 1.25)
                limiterPeople.scale.set(getScaleLeft, 1, 1.25)
                standSides.scale.set(getScaleLeft,1, 1.25)
                standTexture.repeat.set(getScaleLeft, 1.25);
                rightWallTexture.repeat.set(1.25,1);
                leftWallTexture.repeat.set(1.25,1);
                rightWall.scale.set(1,1,1.26)
                leftWall.scale.set(1,1,1.26)
                getScaleFront = 1.25
            }
            else if (dragFront.position.z >= 0.75 && dragFront.position.z < 1.25)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 1.0023
                backWall.position.z = -2.9
                standBase.scale.set(getScaleLeft, 1, 1.5)
                limiterPeople.scale.set(getScaleLeft, 1, 1.5)
                standSides.scale.set(getScaleLeft, 1, 1.5)
                standTexture.repeat.set(getScaleLeft, 1.5);
                rightWallTexture.repeat.set(1.5,1);
                leftWallTexture.repeat.set(1.5,1);
                rightWall.scale.set(1,1,1.52)
                leftWall.scale.set(1,1,1.52)
                getScaleFront = 1.5
            } 
            else if (dragFront.position.z >= 1.25 && dragFront.position.z < 1.75)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 1.5
                backWall.position.z = -3.4
                standBase.scale.set(getScaleLeft, 1, 1.75)
                limiterPeople.scale.set(getScaleLeft, 1, 1.75)
                standSides.scale.set(getScaleLeft, 1, 1.75)
                standTexture.repeat.set(getScaleLeft, 1.75);
                rightWallTexture.repeat.set(1.75,1);
                leftWallTexture.repeat.set(1.75,1);
                rightWall.scale.set(1,1,1.775)
                leftWall.scale.set(1,1,1.775)
                getScaleFront = 1.75
                
                
            } 
            else if (dragFront.position.z >= 1.75 && dragFront.position.z < 2.25)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 1.998
                backWall.position.z = -3.9
                standBase.scale.set(getScaleLeft, 1, 2)
                limiterPeople.scale.set(getScaleLeft, 1, 2)
                standSides.scale.set(getScaleLeft, 1, 2)
                standTexture.repeat.set(getScaleLeft, 2);
                rightWallTexture.repeat.set(2,1);
                leftWallTexture.repeat.set(2,1);
                rightWall.scale.set(1,1,2.03)
                leftWall.scale.set(1,1,2.03)
                getScaleFront = 2
                
                
            } 
            else if (dragFront.position.z >= 2.25 && dragFront.position.z < 2.75)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 2.499
                backWall.position.z = -4.4
                standBase.scale.set(getScaleLeft, 1, 2.25)
                limiterPeople.scale.set(getScaleLeft, 1, 2.25)
                standSides.scale.set(getScaleLeft, 1, 2.25)
                standTexture.repeat.set(getScaleLeft, 2.25);
                rightWallTexture.repeat.set(2.25,1);
                leftWallTexture.repeat.set(2.25,1);
                rightWall.scale.set(1,1,2.28)
                leftWall.scale.set(1,1,2.28)
                getScaleFront = 2.25
                
                
            }
            else if (dragFront.position.z >= 2.75)
            {
                standTexture = standBase.material.map
                backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
                rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
                leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
                dragFront.position.z = 3
                backWall.position.z = -4.9
                standBase.scale.set(getScaleLeft, 1, 2.5)
                limiterPeople.scale.set(getScaleLeft, 1, 2.5)
                standSides.scale.set(getScaleLeft, 1, 2.5)
                standTexture.repeat.set(getScaleLeft, 2.5)
                rightWallTexture.repeat.set(2.5,1);
                leftWallTexture.repeat.set(2.5,1);
                rightWall.scale.set(1,1,2.54)
                leftWall.scale.set(1,1,2.54)
                getScaleFront = 2.5
            }  
    }
    dragDragFront.addEventListener( 'dragend', ()=> 
    {
    controls.enabled = true
    if (dragFront.position.z < 0.25)
{
    Functions.addOrUpdateURLParam ("depth", "1")
} 
else if (dragFront.position.z >= 0.25 && dragFront.position.z < 0.75)
{
    
    Functions.addOrUpdateURLParam ("depth", "1.25")
}
else if (dragFront.position.z >= 0.75 && dragFront.position.z < 1.25)
{
    
    Functions.addOrUpdateURLParam ("depth", "1.5")
} 
else if (dragFront.position.z >= 1.25 && dragFront.position.z < 1.75)
{
    
    Functions.addOrUpdateURLParam ("depth", "1.75")
} 
else if (dragFront.position.z >= 1.75 && dragFront.position.z < 2.25)
{
    
    Functions.addOrUpdateURLParam ("depth", "2")
} 
else if (dragFront.position.z >= 2.25 && dragFront.position.z < 2.75)
{

    Functions.addOrUpdateURLParam ("depth", "2.25")
}
else if (dragFront.position.z >= 2.75)
{
    
    Functions.addOrUpdateURLParam ("depth", "2.5")
} 
    })

   
/**
 *  DRAG RIGHT
 */ 
var objectsDragRight = []
objectsDragRight.push(dragRight)
var dragDragRight = new DragControls(objectsDragRight, camera, renderer.domElement)

/**
*  DRAG RIGHT EVENT LISTENERS
*/ 
dragDragRight.addEventListener( 'dragstart', ()=> 
{ 
controls.enabled = false  
scene.getObjectByName( "back_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
scene.getObjectByName( "back_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
scene.getObjectByName( "back_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( 1, 1 ); 
scene.getObjectByName( "back_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);

})

dragDragRight.addEventListener ( 'drag', onDragEventDragRight)

function onDragEventDragRight() {  
//CONSTRAINTS
dragRight.position.y = 0
dragRight.position.z = 0
if (dragRight.position.x < 0) 
{
    dragRight.position.x = 0
} 
else if (dragRight.position.x > 3) 
{
    dragRight.position.x = 3
}
//CONSTRAINTS

if (dragRight.position.x < 0.25)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 0
        dragLeft.position.x = 0
    
        rightWall.position.x = 1.95
        leftWall.position.x = -1.95
         //scale.set(width,height,depth)           
        standBase.scale.set(1, 1, getScaleFront)
        limiterPeople.scale.set(1, 1, getScaleFront)
        standSides.scale.set(1, 1, getScaleFront)
        backWall.scale.set(1,1,1)
        getScaleLeft = 1
        standTexture.repeat.set(1, getScaleFront);
        backWallTexture.repeat.set(1, 1);
        
    } 
    else if (dragRight.position.x >= 0.25 && dragRight.position.x < 0.75)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 0.6
        dragLeft.position.x = -0.6
        
        rightWall.position.x = 2.45
        leftWall.position.x = -2.45

        standBase.scale.set(1.25, 1, getScaleFront)
        limiterPeople.scale.set(1.25, 1, getScaleFront)
        standSides.scale.set(1.25, 1, getScaleFront)
        backWall.scale.set(1.25,1,1)
        getScaleLeft = 1.25
        standTexture.repeat.set(1.25, getScaleFront);
        backWallTexture.repeat.set(1.25,1);
    }
    else if (dragRight.position.x >= 0.75 && dragRight.position.x < 1.25)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 1.0023
        dragLeft.position.x = -1.0023

        rightWall.position.x = 2.95
        leftWall.position.x = -2.95
        
        standBase.scale.set(1.5, 1, getScaleFront)
        limiterPeople.scale.set(1.5, 1, getScaleFront)
        standSides.scale.set(1.5, 1, getScaleFront)
        backWall.scale.set(1.5,1,1)
        getScaleLeft = 1.5
        standTexture.repeat.set(1.5, getScaleFront);
        backWallTexture.repeat.set(1.5,1);
        
        
    }
    else if (dragRight.position.x >= 1.25 && dragRight.position.x < 1.75)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 1.5
        dragLeft.position.x = -1.5

        rightWall.position.x = 3.45
        leftWall.position.x = -3.45
        
        standBase.scale.set(1.75, 1, getScaleFront)
        limiterPeople.scale.set(1.75, 1, getScaleFront)
        standSides.scale.set(1.75, 1, getScaleFront)
        backWall.scale.set(1.75,1,1)
        getScaleLeft = 1.75
        standTexture.repeat.set(1.75, getScaleFront);
        backWallTexture.repeat.set(1.75,1);
        
        
    } 
    else if (dragRight.position.x >= 1.75 && dragRight.position.x < 2.25)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 1.998
        dragLeft.position.x = -1.998

        rightWall.position.x = 3.95
        leftWall.position.x = -3.95
        
        standBase.scale.set(2, 1, getScaleFront)
        limiterPeople.scale.set(2, 1, getScaleFront)
        standSides.scale.set(2, 1, getScaleFront)
        backWall.scale.set(2,1,1)
        getScaleLeft = 2
        standTexture.repeat.set(2, getScaleFront);
        backWallTexture.repeat.set(2,1);
        
        
    }
    else if (dragRight.position.x >= 2.25 && dragRight.position.x < 2.75)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 2.499
        dragLeft.position.x = -2.499

        rightWall.position.x = 4.45
        leftWall.position.x = -4.45
        
        standBase.scale.set(2.25, 1, getScaleFront)
        limiterPeople.scale.set(2.25, 1, getScaleFront)
        standSides.scale.set(2.25, 1, getScaleFront)
        backWall.scale.set(2.25,1,1)
        getScaleLeft = 2.25
        standTexture.repeat.set(2.25, getScaleFront);
        backWallTexture.repeat.set(2.25,1);
        
        
    }
    else if (dragRight.position.x >= 2.75)
    {
        standTexture = standBase.material.map
        backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
        dragRight.position.x = 3
        dragLeft.position.x = -3

        rightWall.position.x = 4.95
        leftWall.position.x = -4.95
        
        standBase.scale.set(2.5, 1, getScaleFront)
        limiterPeople.scale.set(2.5, 1, getScaleFront)
        standSides.scale.set(2.5, 1, getScaleFront)
        backWall.scale.set(2.5,1,1)
        getScaleLeft = 2.5
        standTexture.repeat.set(2.5, getScaleFront);
        backWallTexture.repeat.set(2.5,1);
        
        
    }  
}

dragDragRight.addEventListener( 'dragend', ()=> 
{
controls.enabled = true
if (dragRight.position.x < 0.25)
{
    Functions.addOrUpdateURLParam ("width", "1")
} 
else if (dragRight.position.x >= 0.25 && dragRight.position.x < 0.75)
{
    Functions.addOrUpdateURLParam ("width", "1.25")
}
else if (dragRight.position.x >= 0.75 && dragRight.position.x < 1.25)
{
    Functions.addOrUpdateURLParam ("width", "1.5")
}
else if (dragRight.position.x >= 1.25 && dragRight.position.x < 1.75)
{
    Functions.addOrUpdateURLParam ("width", "1.75")
} 
else if (dragRight.position.x >= 1.75 && dragRight.position.x < 2.25)
{
    Functions.addOrUpdateURLParam ("width", "2")
}
else if (dragRight.position.x >= 2.25 && dragRight.position.x < 2.75)
{
    Functions.addOrUpdateURLParam ("width", "2.25")
}
else if (dragRight.position.x >= 2.75)
{
    Functions.addOrUpdateURLParam ("width", "2.5")
}  
})
/**
 *  DRAG LEFT
 */ 
var objectsDragLeft = []
objectsDragLeft.push(dragLeft)
var dragDragLeft = new DragControls(objectsDragLeft, camera, renderer.domElement)

/**
*  DRAG LEFT EVENT LISTENERS
*/ 

dragDragLeft.addEventListener( 'dragstart', ()=> 
{ 
controls.enabled = false  
scene.getObjectByName( "back_wall_1" ).material.map.colorSpace = THREE.SRGBColorSpace;
scene.getObjectByName( "back_wall_1" ).material.map.wrapS = THREE.RepeatWrapping;
scene.getObjectByName( "back_wall_1" ).material.map.wrapT = THREE.RepeatWrapping;
scene.getObjectByName( "back_wall_1" ).material.map.repeat.set( 1, 1 ); 
scene.getObjectByName( "back_wall_1" ).material.map.rotation = THREE.MathUtils.degToRad(90);
})

dragDragLeft.addEventListener ('drag', onDragEventDragLeft)

function onDragEventDragLeft() 
{
//CONSTRAINTS
dragLeft.position.y = 0
dragLeft.position.z = 0
if (dragLeft.position.x > 0) 
{
dragLeft.position.x = 0
} 
else if (dragLeft.position.x < -3) 
{
dragLeft.position.x = -3
}
//CONSTRAINTS

if (dragLeft.position.x > -0.25)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = 0
    dragRight.position.x = 0

    leftWall.position.x = -1.95
    rightWall.position.x = 1.95
     //scale.set(width,height,depth)           
    standBase.scale.set(1, 1, getScaleFront)
    limiterPeople.scale.set(1, 1, getScaleFront)
    standSides.scale.set(1, 1, getScaleFront)
    backWall.scale.set(1,1,1)
    getScaleLeft = 1

    standTexture.repeat.set(1, 1);
    backWallTexture.repeat.set(1, 1);
} 
else if (dragLeft.position.x <= -0.25 && dragLeft.position.x > -0.75)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = -0.6
    dragRight.position.x = 0.6
    
    leftWall.position.x = -2.45
    rightWall.position.x = 2.45

    standBase.scale.set(1.25, 1, getScaleFront)
    limiterPeople.scale.set(1.25, 1, getScaleFront)
    standSides.scale.set(1.25, 1, getScaleFront)
    backWall.scale.set(1.25,1,1)
    getScaleLeft = 1.25

    standTexture.repeat.set(1.25, getScaleFront);
    backWallTexture.repeat.set(1.25,1);
}
else if (dragLeft.position.x <= -0.75 && dragLeft.position.x > -1.25)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = -1.0023
    dragRight.position.x = 1.0023

    leftWall.position.x = -2.95
    rightWall.position.x = 2.95
    
    standBase.scale.set(1.5, 1, getScaleFront)
    limiterPeople.scale.set(1.5, 1, getScaleFront)
    standSides.scale.set(1.5, 1, getScaleFront)
    backWall.scale.set(1.5,1,1)
    getScaleLeft = 1.5

    standTexture.repeat.set(1.5, getScaleFront);
    backWallTexture.repeat.set(1.5,1);
} 
else if (dragLeft.position.x <= -1.25 && dragLeft.position.x > -1.75)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = -1.5
    dragRight.position.x = 1.5

    leftWall.position.x = -3.45
    rightWall.position.x = 3.45
    
    standBase.scale.set(1.75, 1, getScaleFront)
    limiterPeople.scale.set(1.75, 1, getScaleFront)
    standSides.scale.set(1.75, 1, getScaleFront)
    backWall.scale.set(1.75,1,1)
    getScaleLeft = 1.75

    standTexture.repeat.set(1.5, getScaleFront);
    backWallTexture.repeat.set(1.5,1);
} 
else if (dragLeft.position.x <= -1.75 && dragLeft.position.x > -2.25)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = -1.998
    dragRight.position.x = 1.998

    leftWall.position.x = -3.95
    rightWall.position.x = 3.95
    
    standBase.scale.set(2, 1, getScaleFront)
    limiterPeople.scale.set(2, 1, getScaleFront)
    standSides.scale.set(2, 1, getScaleFront)
    backWall.scale.set(2,1,1)
    getScaleLeft = 2

    standTexture.repeat.set(2, getScaleFront);
    backWallTexture.repeat.set(2,1);
} 
else if (dragLeft.position.x <= -2.25 && dragLeft.position.x > -2.75)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = -2.499
    dragRight.position.x = 2.499

    leftWall.position.x = -4.45
    rightWall.position.x = 4.45
    
    standBase.scale.set(2.25, 1, getScaleFront)
    limiterPeople.scale.set(2.25, 1, getScaleFront)
    standSides.scale.set(2.25, 1, getScaleFront)
    backWall.scale.set(2.25,1,1)
    getScaleLeft = 2.25

    standTexture.repeat.set(2.25, getScaleFront);
    backWallTexture.repeat.set(2.25,1);
} 
else if (dragLeft.position.x <= -2.75)
{
    standTexture = standBase.material.map
    backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    dragLeft.position.x = -3
    dragRight.position.x = 3

    leftWall.position.x = -4.95
    rightWall.position.x = 4.95
    
    standBase.scale.set(2.5, 1, getScaleFront)
    limiterPeople.scale.set(2.5, 1, getScaleFront)
    standSides.scale.set(2.5, 1, getScaleFront)
    backWall.scale.set(2.5,1,1)
    getScaleLeft = 2.5

    standTexture.repeat.set(2.5, getScaleFront);
    backWallTexture.repeat.set(2.5,1);
} 
}

dragDragLeft.addEventListener( 'dragend', ()=> 
{
controls.enabled = true
})

}
} //END OF MAIN LOAD FUNC

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
        price.remove()
    }
)


var element2 = document.getElementById("top_panel_furniture_list_bistro_table_price")
element2.innerHTML = priceBistroTable + "$"

var element3 = document.getElementById("top_panel_furniture_list_single_sofa_price")
element3.innerHTML = priceSingleSofa + "$"

var element4 = document.getElementById("top_panel_furniture_list_double_sofa_price")
element4.innerHTML = priceDoubleSofa + "$"

var element5 = document.getElementById("top_panel_furniture_list_chair_price")
element5.innerHTML = priceChair + "$"

var element6 = document.getElementById("top_panel_furniture_list_coffee_table_price")
element6.innerHTML = priceCoffeeTable + "$"

var elemen7 = document.getElementById("top_panel_furniture_list_high_table_price")
elemen7.innerHTML = priceHightTable + "$"

var element8 = document.getElementById("top_panel_furniture_list_tv42_price")
element8.innerHTML = priceTv42 + "$"

var element9 = document.getElementById("top_panel_furniture_list_tv55_price")
element9.innerHTML = priceTv55 + "$"

var element10 = document.getElementById("top_panel_furniture_list_brochure_rack_price")
element10.innerHTML = priceBrochureRack + "$"

var element11 = document.getElementById("top_panel_furniture_list_shelves_price")
element11.innerHTML = priceShelves + "$"

var element12 = document.getElementById("top_panel_furniture_list_kettle_price")
element12.innerHTML = priceKettle + "$"

var element13 = document.getElementById("top_panel_furniture_list_water_dispenser_price")
element13.innerHTML = priceWaterDispenser + "$"

var element14 = document.getElementById("top_panel_furniture_list_refrigator_price")
element14.innerHTML = priceRefrigator + "$"

var element16 = document.getElementById("top_panel_furniture_list_plant_price")
element16.innerHTML = pricePlant + "$"

var element17 = document.getElementById("top_panel_furniture_list_trash_can_price")
element17.innerHTML = priceTrashCan + "$"

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

setTimeout(loadTest, 5000)
 function loadTest()
 {
      
    document.getElementById("button").onclick = ()=>
    {
        
    }
    document.getElementById("button2").onclick = ()=>
    {
      
    }
   
 }


/*
#####    #### ######   #####   ##### ####     
##   ##  ##  ## ##  ## ### ### ### ### ##      
##      ##      ##  ## ##   ## ##   ## ##      
 #####  ##      #####  ##   ## ##   ## ##      
     ## ##      ## ##  ##   ## ##   ## ##      
##   ##  ##  ## ## ##  ### ### ### ### ##  ##  
 #####    #### #### ##  #####   ##### #######  
 */                                              

//setTimeout(loadPanels, 5000)
 function loadPanels() 
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
topPanel()
function topPanel()
{
         /**
         * Subscribe form
         */
        document.querySelector('.submit-email').addEventListener('mousedown', (e) => 
        {
                e.preventDefault();
                document.querySelector('.subscription').classList.add('done');
        });
        /**
         * Up Down Icons
         */

        document.getElementById("up_icon_top_panel").addEventListener("click", function () 
        {
                document.getElementById("top_panel_background").style.top = "-200px";
                document.getElementById("down_icon_top_panel").style.display = "block";
                document.getElementById("up_icon_top_panel").style.display = "none";
        }
        )
        document.getElementById("down_icon_top_panel").addEventListener("click", function () 
        {
                document.getElementById("top_panel_background").style.top = "0px";
                document.getElementById("up_icon_top_panel").style.display = "block";
                document.getElementById("down_icon_top_panel").style.display = "none";
        }
        )
}
leftPanel()
function leftPanel()
{   var amountShelves = 0
    var textnode
    var shelvesIcon = document.getElementById("shelves_icon")
    document.getElementById("add_tab").style.color = "cyan"
        /**
         * Storage Icons
         */
        document.getElementById("shelves_icon").addEventListener("click", function () 
        {
            amountShelves = amountShelves + 1
            var updateShelvesAmount = document.createElement('div')
            updateShelvesAmount.id = "shelves_amount"
            shelvesIcon.appendChild(updateShelvesAmount)
            updateShelvesAmount.innerHTML = `${amountShelves}`
            setTimeout(removeHtmlElement, 1000)
            function removeHtmlElement() 
            {
                updateShelvesAmount.remove()
            }
        })
        //ADD TAB
        document.getElementById("add_tab").addEventListener("click", function () 
        {
                document.getElementById("add_tab").style.color = "cyan";
                document.getElementById("storage_tab").style.color = "white";
                document.getElementById("left_panel_icon_group_main").style.display = "block";
                document.getElementById("left_panel_icon_group_storage").style.display = "none";
        })
         //STORAGE TAB
         document.getElementById("storage_tab").addEventListener("click", function () 
         {
                document.getElementById("storage_tab").style.color = "cyan";
                document.getElementById("add_tab").style.color = "white";
                document.getElementById("left_panel_icon_group_main").style.display = "none";
                document.getElementById("left_panel_icon_group_storage").style.display = "block";
         })
}
rightPanel()
function rightPanel()
{
    document.getElementById("carpet_tab").style.color = "#7CFC00";
        /**
         * Carpet Icons
         */

        //CARPET TAB
        document.getElementById("carpet_tab").addEventListener("click", function () 
        {
                document.getElementById("carpet_tab").style.color = "#7CFC00";
                document.getElementById("parquet_tab").style.color = "white";
                document.getElementById("laminate_tab").style.color = "white";
                document.getElementById("right_panel_icon_group_carpet").style.display = "block";
                document.getElementById("right_panel_icon_group_parquet").style.display = "none";
                document.getElementById("right_panel_icon_group_laminate").style.display = "none";
        })
         //PARQUET TAB
         document.getElementById("parquet_tab").addEventListener("click", function () 
         {
                document.getElementById("parquet_tab").style.color = "#7CFC00";
                document.getElementById("carpet_tab").style.color = "white";
                document.getElementById("laminate_tab").style.color = "white";
                document.getElementById("right_panel_icon_group_parquet").style.display = "block";
                document.getElementById("right_panel_icon_group_carpet").style.display = "none";
                document.getElementById("right_panel_icon_group_laminate").style.display = "none";
         })

          //LAMINATE TAB
          document.getElementById("laminate_tab").addEventListener("click", function () 
          {
                document.getElementById("laminate_tab").style.color = "#7CFC00";
                document.getElementById("carpet_tab").style.color = "white";
                document.getElementById("parquet_tab").style.color = "white";
                document.getElementById("right_panel_icon_group_laminate").style.display = "block";
                document.getElementById("right_panel_icon_group_parquet").style.display = "none";
                document.getElementById("right_panel_icon_group_carpet").style.display = "none";  
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

        var xhr = new XMLHttpRequest();
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
            var element = document.createElement("div")
            var topPanel = document.getElementById("top_panel_background")
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

    document.getElementById("carpet0_icon").addEventListener("click", function()
    {
    
    var texture = new THREE.TextureLoader().load( "./media/carpet0_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
    texture.colorSpace = THREE.SRGBColorSpace;
   
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })

    // Carpet 1

    document.getElementById("carpet1_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/carpet1_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })

    // Carpet 2

    document.getElementById("carpet2_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/carpet2_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Carpet 3

    document.getElementById("carpet3_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/carpet3_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Carpet 4

    document.getElementById("carpet4_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/carpet4_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
      // Carpet 5

    document.getElementById("carpet5_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/carpet5_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })

    // Parquet 
    document.getElementById("parquet0_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/parquet0_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Parquet 1
    document.getElementById("parquet1_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/parquet1_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Parquet 2
    document.getElementById("parquet2_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/parquet2_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Parquet 3
    document.getElementById("parquet3_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/parquet3_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Parquet 4
    document.getElementById("parquet4_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/parquet4_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })
    // Parquet 5
    document.getElementById("parquet5_icon").addEventListener("click", function()
    {
    var texture = new THREE.TextureLoader().load( "./media/parquet5_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
   
    texture.colorSpace = THREE.SRGBColorSpace;
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    texture.repeat.set(dimWidthStandBase/4, dimDepthStandBase/4);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })


     // Laminate 0
     document.getElementById("laminate0_icon").addEventListener("click", function()
     {
     scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: 'white'});
     })
    // Laminate 1
    document.getElementById("laminate1_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#C0C0C0'});
    })
    // Laminate 2
    document.getElementById("laminate2_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#808080'});
    })
    // Laminate 3
    document.getElementById("laminate3_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#000000'});
    })
    // Laminate 4
    document.getElementById("laminate4_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#FF0000'});
    })
    // Laminate 5
    document.getElementById("laminate5_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#800000'});
    })
    // Laminate 6
    document.getElementById("laminate6_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#FFFF00'});
    })
    // Laminate 7
    document.getElementById("laminate7_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#808000'});
    })
    // Laminate 8
    document.getElementById("laminate8_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#00FF00'});
    })
    // Laminate 9
    document.getElementById("laminate9_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#008000'});
    })
    // Laminate 10
    document.getElementById("laminate10_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#00FFFF'});
    })
    // Laminate 11
    document.getElementById("laminate11_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#008080'});
    })
    // Laminate 12
    document.getElementById("laminate12_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#0000FF'});
    })
    // Laminate 13
    document.getElementById("laminate13_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#000080'});
    })
    // Laminate 14
    document.getElementById("laminate14_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#FF00FF'});
    })
    // Laminate 15
    document.getElementById("laminate15_icon").addEventListener("click", function()
    {
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({color: '#800080'});
    })
      
    
}

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


######    ###   ######    ###   ##   ##  
 ##  ##  ## ##   ##  ##  ## ##  ### ###  
 ##  ## ##   ##  ##  ## ##   ## #######  
 #####  ##   ##  #####  ##   ## ## # ##  
 ##     #######  ## ##  ####### ##   ##  
 ##     ##   ##  ## ##  ##   ## ##   ##  
####    ##   ## #### ## ##   ## ### ###  
                                         

*/  


setTimeout(loadParameters, 5000)
function loadParameters() 
{
    var switchLeft = document.getElementById("toogle_switch_left_wall_switch")
    var switchBack = document.getElementById("toogle_switch_back_wall_switch")
    var switchRight = document.getElementById("toogle_switch_right_wall_switch")

    var standBase = scene.getObjectByName( "stand_1" )
    var limiterPeople= scene.getObjectByName( "limiter_people" )
    var standSides = scene.getObjectByName( "stand_2" )
    var rightWall = scene.getObjectByName( "right_wall" )
    var backWall = scene.getObjectByName( "back_wall" )
    var leftWall = scene.getObjectByName( "left_wall" )
    var dragFront = scene.getObjectByName( "drag_front" )
    var dragRight = scene.getObjectByName( "drag_right" )
    var dragLeft = scene.getObjectByName( "drag_left" )
    var standTexture = standBase.material.map
    var backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
    var rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
    var leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
   
    var getScaleLeft, getScaleFront    //ÖZELLİKLE SADECE LEFT'İ KOYDUK ÇÜNKÜ WIDTH'İ OKUTUP LEFTİ KENDİMİZ BELİRLİYORUZ 0.2 SN SONRA DA DEPTHİ OKUTUP LEFTİ ORDAN GÖSTERİYORUZ.
    //BURDA ZAMANLAMA ÖNEMLİ EĞER ZAMAN ARALIKLI OLMAZSA YAPAMAYIZ. YANİ HEM SCALELEFT HEM SCALEFRONT VERİRSEK İKİSİ BİRBİRİNE KARIŞIR.

/**
 * 
 * 
 * STAND 
 * 
 * 
 */    


if (Functions.getQueryVariable("width"))
{   
    if (Functions.getQueryVariable("width") == 1)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 0
        dragLeft.position.x = 0
    
        rightWall.position.x = 1.95
        leftWall.position.x = -1.95
         //scale.set(width,height,depth)           
        standBase.scale.set(1, 1, getScaleFront)
        limiterPeople.scale.set(1, 1, getScaleFront)
        standSides.scale.set(1, 1, getScaleFront)
        backWall.scale.set(1,1,1)
        getScaleLeft = 1

        standTexture.repeat.set(1, getScaleFront);
        backWallTexture.repeat.set(1, 1);
    }
    if (Functions.getQueryVariable("width") == 1.25)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 0.6
        dragLeft.position.x = -0.6

        rightWall.position.x = 2.45
        leftWall.position.x = -2.45

        standBase.scale.set(1.25, 1, 1)
        limiterPeople.scale.set(1.25, 1, 1)
        standSides.scale.set(1.25, 1, 1)
        backWall.scale.set(1.25,1,1)
        getScaleLeft = 1.25

        standTexture.repeat.set(1.25, 1);
        backWallTexture.repeat.set(1, 1.25);
    }
    if (Functions.getQueryVariable("width") == 1.5)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 1.0023
        dragLeft.position.x = -1.0023

        rightWall.position.x = 2.95
        leftWall.position.x = -2.95
        
        standBase.scale.set(1.5, 1, 1)
        limiterPeople.scale.set(1.5, 1, 1)
        standSides.scale.set(1.5, 1, 1)
        backWall.scale.set(1.5,1,1)
        getScaleLeft = 1.5

        standTexture.repeat.set(1.5, 1);
        backWallTexture.repeat.set(1, 1.5);
    }
    if (Functions.getQueryVariable("width") == 1.75)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 1.5
        dragLeft.position.x = -1.5

        rightWall.position.x = 3.45
        leftWall.position.x = -3.45
        
        standBase.scale.set(1.75, 1, 1)
        limiterPeople.scale.set(1.75, 1, 1)
        standSides.scale.set(1.75, 1, 1)
        backWall.scale.set(1.75,1,1)
        getScaleLeft = 1.75

        standTexture.repeat.set(1.75, 1);
        backWallTexture.repeat.set(1.75,1);
    }
    if (Functions.getQueryVariable("width") == 2)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 1.998
        dragLeft.position.x = -1.998

        rightWall.position.x = 3.95
        leftWall.position.x = -3.95
        
        standBase.scale.set(2, 1, 1)
        limiterPeople.scale.set(2, 1, 1)
        standSides.scale.set(2, 1, 1)
        backWall.scale.set(2,1,1)
        getScaleLeft = 2

        standTexture.repeat.set(2, 1);
        backWallTexture.repeat.set(2,1);
    }
    if (Functions.getQueryVariable("width") == 2.25)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 2.499
        dragLeft.position.x = -2.499

        rightWall.position.x = 4.45
        leftWall.position.x = -4.45
        
        standBase.scale.set(2.25, 1, 1)
        limiterPeople.scale.set(2.25, 1, 1)
        standSides.scale.set(2.25, 1, 1)
        backWall.scale.set(2.25,1,1)
        getScaleLeft = 2.25

        standTexture.repeat.set(2.25, 1);
        backWallTexture.repeat.set(2.25,1);
    }
    if (Functions.getQueryVariable("width") == 2.5)
    {
        standTexture = standBase.material.map
        dragRight.position.x = 3
        dragLeft.position.x = -3

        rightWall.position.x = 4.95
        leftWall.position.x = -4.95
        
        standBase.scale.set(2.5, 1, 1)
        limiterPeople.scale.set(2.5, 1, 1)
        standSides.scale.set(2.5, 1, 1)
        backWall.scale.set(2.5,1,1)
        getScaleLeft = 2.5

        standTexture.repeat.set(2.5, 1);
        backWallTexture.repeat.set(2.5,1);
    }
    
       
   setTimeout(() => {
    if (Functions.getQueryVariable("depth"))
    {  
        if (Functions.getQueryVariable("depth") == 1)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map

            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 0
            backWall.position.z = -1.9  //scale.set(width,height,depth)
            standBase.scale.set(getScaleLeft, 1, 1)
            limiterPeople.scale.set(getScaleLeft, 1, 1)
            standSides.scale.set(getScaleLeft, 1, 1)
            standTexture.repeat.set(getScaleLeft, 1);
            rightWallTexture.repeat.set(1, 1);
            leftWallTexture.repeat.set(1, 1);
            rightWall.scale.set(1,1,1)
            leftWall.scale.set(1,1,1)
            getScaleFront = 1
        }
        if (Functions.getQueryVariable("depth") == 1.25)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 0.6
            backWall.position.z = -2.4
            standBase.scale.set(getScaleLeft, 1, 1.25)
            limiterPeople.scale.set(getScaleLeft, 1, 1.25)
            standSides.scale.set(getScaleLeft,1, 1.25)
            standTexture.repeat.set(getScaleLeft, 1.25)
            rightWallTexture.repeat.set(1, 1.25)
            leftWallTexture.repeat.set(1, 1.25)
            rightWall.scale.set(1,1,1.26)
            leftWall.scale.set(1,1,1.26)
            getScaleFront = 1.25
        }
        if (Functions.getQueryVariable("depth") == 1.5)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 1.0023
            backWall.position.z = -2.9
            standBase.scale.set(getScaleLeft, 1, 1.5)
            limiterPeople.scale.set(getScaleLeft, 1, 1.5)
            standSides.scale.set(getScaleLeft, 1, 1.5)
            standTexture.repeat.set(getScaleLeft, 1.5);
            rightWallTexture.repeat.set(1, 1.5);
            leftWallTexture.repeat.set(1,1.5);
            rightWall.scale.set(1,1,1.52)
            leftWall.scale.set(1,1,1.52)
            getScaleFront = 1.5
        }
        if (Functions.getQueryVariable("depth") == 1.75)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 1.998
            backWall.position.z = -3.9
            standBase.scale.set(getScaleLeft, 1, 2)
            limiterPeople.scale.set(getScaleLeft, 1, 2)
            standSides.scale.set(getScaleLeft, 1, 2)
            standTexture.repeat.set(getScaleLeft, 2);
            rightWallTexture.repeat.set(2,1);
            leftWallTexture.repeat.set(2,1);
            rightWall.scale.set(1,1,2.03)
            leftWall.scale.set(1,1,2.03)
            getScaleFront = 1.75
        }
        if (Functions.getQueryVariable("depth") == 2)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 1.998
            backWall.position.z = -3.9
            standBase.scale.set(getScaleLeft, 1, 2)
            limiterPeople.scale.set(getScaleLeft, 1, 2)
            standSides.scale.set(getScaleLeft, 1, 2)
            standTexture.repeat.set(getScaleLeft, 2);
            rightWallTexture.repeat.set(2,1);
            leftWallTexture.repeat.set(2,1);
            rightWall.scale.set(1,1,2.03)
            leftWall.scale.set(1,1,2.03)
            getScaleFront = 2
        }
        if (Functions.getQueryVariable("depth") == 2.25)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 2.499
            backWall.position.z = -4.4
            standBase.scale.set(getScaleLeft, 1, 2.25)
            limiterPeople.scale.set(getScaleLeft, 1, 2.25)
            standSides.scale.set(getScaleLeft, 1, 2.25)
            standTexture.repeat.set(getScaleLeft, 2.25);
            rightWallTexture.repeat.set(2.25,1);
            leftWallTexture.repeat.set(2.25,1);
            rightWall.scale.set(1,1,2.28)
            leftWall.scale.set(1,1,2.28)
            getScaleFront = 2.25
        }
        if (Functions.getQueryVariable("depth") == 2.5)
        {
            standTexture = standBase.material.map
            backWallTexture = scene.getObjectByName( "back_wall_1" ).material.map
            rightWallTexture = scene.getObjectByName( "right_wall_1" ).material.map
            leftWallTexture = scene.getObjectByName( "left_wall_1" ).material.map
            dragFront.position.z = 3
            backWall.position.z = -4.9
            standBase.scale.set(getScaleLeft, 1, 2.5)
            limiterPeople.scale.set(getScaleLeft, 1, 2.5)
            standSides.scale.set(getScaleLeft, 1, 2.5)
            standTexture.repeat.set(getScaleLeft, 2.5);
            rightWallTexture.repeat.set(2.5,1);
            leftWallTexture.repeat.set(2.5,1);
            rightWall.scale.set(1,1,2.54)
            leftWall.scale.set(1,1,2.54)
            getScaleFront = 2.5
        }
    }
   }, 200);
}

/**
 * 
 * 
 * BACK WALL
 * 
 * 
 */    
    //BACKWALL VISIBILITY
        if (Functions.getQueryVariable("backwall"))
        {
            switchBack.checked = true
            scene.getObjectByName("back_wall_1" ).visible = true;
            scene.getObjectByName("back_wall_2" ).visible = true;
            loadGraphicControlsBack()
                
            var standInfo = "peninsula"
            document.getElementById("stand_info_text").style.left = "315px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standInfo + standSize
                 if (Functions.getQueryVariable("rightwall")){
                    if (Functions.getQueryVariable("leftwall")){
                        var standInfo = "row"
                        document.getElementById("stand_info_text").style.left = "350px";
                        document.getElementById("stand_info_text").style.bottom = "22px";
                        document.getElementById("stand_info_text").innerHTML = standInfo + standSize
                    }
                 }
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
                    textureLoaderBw.rotation = THREE.MathUtils.degToRad(90);
                    textureLoaderBw.colorSpace = THREE.SRGBColorSpace;
                    textureLoaderBw.wrapS = THREE.RepeatWrapping;
                    textureLoaderBw.wrapT = THREE.RepeatWrapping;
                }
            )
        }


document.getElementById("right_icon").onclick = ()=>
{   
bb = Functions.roundXSteps(bb + 0.2 , 2) 
scene.getObjectByName( "back_wall_1" ).material.map.offset.set(bb, 1)
Functions.addOrUpdateURLParam ("backwall_image_position_right" , `${bb}`)//PARAMS SAVE BACK WALL POSITION RIGHT
}


//BACKWALL CUSTOM IMAGE POSITION RIGHT
if (Functions.getQueryVariable("backwall_image_position_right"))
{
    var posRightBackWall = Functions.getQueryVariable("backwall_image_position_right")
   setTimeout(() => {
     scene.getObjectByName( "back_wall_1" ).material.map.offset.set(posRightBackWall, 1)
   }, 200);
}
//BACKWALL CUSTOM IMAGE POSITION LEFT
if (Functions.getQueryVariable("backwall_image_position_left"))
{
    var posLeftBackWall = Functions.getQueryVariable("backwall_image_position_left")
    setTimeout(() => {
        scene.getObjectByName( "back_wall_1" ).material.map.offset.set(posLeftBackWall, 1)
    }, 200);
}
//BACKWALL CUSTOM IMAGE POSITION UP
if (Functions.getQueryVariable("backwall_image_position_up"))
{
    var posUpBackWall = Functions.getQueryVariable("backwall_image_position_up")
    setTimeout(() => {
        scene.getObjectByName( "back_wall_1" ).material.map.offset.set(1, posUpBackWall)
    }, 200);
}
//BACKWALL CUSTOM IMAGE POSITION DOWN
if (Functions.getQueryVariable("backwall_image_position_down"))
{
    var posDownBackWall = Functions.getQueryVariable("backwall_image_position_down")
    setTimeout(() => {
        scene.getObjectByName( "back_wall_1" ).material.map.offset.set(1, posDownBackWall)
    }, 200);
}
//BACKWALL CUSTOM IMAGE ZOOM ++
if (Functions.getQueryVariable("backwall_image_zoom"))
{
    var zoomBackWall = Functions.getQueryVariable("backwall_image_zoom")
    setTimeout(() => {
        scene.getObjectByName( "back_wall_1" ).material.map.repeat.set(zoomBackWall, zoomBackWall)
    }, 200);
}

/**
 * 
 * 
 * RIGHT WALL
 * 
 * 
 */
//RIGHTWALL VISIBILITY
        if (Functions.getQueryVariable("rightwall"))
        {
            switchRight.checked = true
            scene.getObjectByName( "right_wall_1" ).visible = true;
            scene.getObjectByName( "right_wall_2" ).visible = true;
            loadGraphicControlsRight()
                
            var standInfo = "corner right"
            document.getElementById("stand_info_text").style.left = "315px";
            document.getElementById("stand_info_text").style.bottom = "22px";
            document.getElementById("stand_info_text").innerHTML = standInfo + standSize
        }
//RIGHTWALL CUSTOM IMAGE
        if (Functions.getQueryVariable("rightwall_image"))
        {
            var uploadCodeRw = Functions.getQueryVariable("rightwall_image")

            new THREE.FileLoader().load //It can also be used directly to load any file type that does not have a loader. 
            (
                `https://cdn.filestackcontent.com/${uploadCodeRw}`,

                // WHEN LOADED , DO 
                function ( mapUrlRw ) 
                {
                    var textureLoaderRw = new THREE.TextureLoader().load(mapUrlRw)
                    scene.getObjectByName( "right_wall_1" ).material.map = textureLoaderRw
                    textureLoaderRw.rotation = THREE.MathUtils.degToRad(90);
                    textureLoaderRw.colorSpace = THREE.SRGBColorSpace;
                    textureLoaderRw.wrapS = THREE.RepeatWrapping;
                    textureLoaderRw.wrapT = THREE.RepeatWrapping;
                }
            )
        }

//RIGHTWALL CUSTOM IMAGE POSITION RIGHT
if (Functions.getQueryVariable("rightwall_image_position_right"))
{
    var posRightRightWall = Functions.getQueryVariable("rightwall_image_position_right")
    setTimeout(() => {
        scene.getObjectByName( "right_wall_1" ).material.map.offset.set(posRightRightWall, 1)
    }, 200);
}
//RIGHTWALL CUSTOM IMAGE POSITION LEFT
if (Functions.getQueryVariable("rightwall_image_position_left"))
{
    var posLeftRightWall = Functions.getQueryVariable("rightwall_image_position_left")
   setTimeout(() => {
     scene.getObjectByName( "right_wall_1" ).material.map.offset.set(posLeftRightWall, 1)
   }, 200);
}
//RIGHTWALL CUSTOM IMAGE POSITION UP
if (Functions.getQueryVariable("rightwall_image_position_up"))
{
    var posUpRightWall = Functions.getQueryVariable("rightwall_image_position_up")
    setTimeout(() => {
        scene.getObjectByName( "right_wall_1" ).material.map.offset.set(1, posUpRightWall)
    }, 200);
}
//RIGHTWALL CUSTOM IMAGE POSITION DOWN
if (Functions.getQueryVariable("rightwall_image_position_down"))
{
    var posDownRightWall = Functions.getQueryVariable("rightwall_image_position_down")
    setTimeout(() => {
        scene.getObjectByName( "right_wall_1" ).material.map.offset.set(1, posDownRightWall)
    }, 200);
}
//RIGHTWALL CUSTOM IMAGE ZOOM
if (Functions.getQueryVariable("rightwall_image_zoom"))
{
    var zoomRightWall = Functions.getQueryVariable("rightwall_image_zoom")
    setTimeout(() => {
        scene.getObjectByName( "right_wall_1" ).material.map.repeat.set(zoomRightWall, zoomRightWall)
    }, 200);
}

/**
 * 
 * 
 * LEFT WALL
 * 
 * 
 */
//LEFTWALL VISIBILITY
if (Functions.getQueryVariable("leftwall"))
{
    switchLeft.checked = true
    scene.getObjectByName( "left_wall_1" ).visible = true;
    scene.getObjectByName( "left_wall_2" ).visible = true;
    loadGraphicControlsLeft()
        
    var standInfo = "corner left"
    document.getElementById("stand_info_text").style.left = "315px";
    document.getElementById("stand_info_text").style.bottom = "22px";
    document.getElementById("stand_info_text").innerHTML = standInfo + standSize
}
//LEFTWALL CUSTOM IMAGE
if (Functions.getQueryVariable("leftwall_image"))
{
    var uploadCodeLw = Functions.getQueryVariable("leftwall_image")

    new THREE.FileLoader().load //It can also be used directly to load any file type that does not have a loader. 
    (
        `https://cdn.filestackcontent.com/${uploadCodeLw}`,

        // WHEN LOADED , DO 
        function ( mapUrlLw ) 
        {
            var textureLoaderLw = new THREE.TextureLoader().load(mapUrlLw)
            scene.getObjectByName( "left_wall_1" ).material.map = textureLoaderLw
            textureLoaderLw.rotation = THREE.MathUtils.degToRad(-90);
            textureLoaderLw.colorSpace = THREE.SRGBColorSpace;
            textureLoaderLw.wrapS = THREE.RepeatWrapping;
            textureLoaderLw.wrapT = THREE.RepeatWrapping;
        }
    )
}
//LEFTWALL CUSTOM IMAGE POSITION RIGHT
if (Functions.getQueryVariable("leftwall_image_position_right"))
{
    var posRightLeftWall = Functions.getQueryVariable("leftwall_image_position_right")
    setTimeout(() => {
        scene.getObjectByName( "left_wall_1" ).material.map.offset.set(posRightLeftWall, 1)
    }, 200);
}
//LEFTWALL CUSTOM IMAGE POSITION LEFT
if (Functions.getQueryVariable("leftwall_image_position_left"))
{
    var posLeftLeftWall = Functions.getQueryVariable("leftwall_image_position_right")
    setTimeout(() => {
        scene.getObjectByName( "left_wall_1" ).material.map.offset.set(posLeftLeftWall, 1)
    }, 200);
}
//LEFTWALL CUSTOM IMAGE POSITION UP
if (Functions.getQueryVariable("leftwall_image_position_up"))
{
    var posUpLeftWall = Functions.getQueryVariable("leftwall_image_position_up")
    setTimeout(() => {
        scene.getObjectByName( "left_wall_1" ).material.map.offset.set(1, posUpLeftWall)
    }, 200);
}
//LEFTWALL CUSTOM IMAGE POSITION DOWN
if (Functions.getQueryVariable("leftwall_image_position_down"))
{
    var posDownLeftWall = Functions.getQueryVariable("leftwall_image_position_down")
    setTimeout(() => {
        scene.getObjectByName( "left_wall_1" ).material.map.offset.set(1, posDownLeftWall)
    }, 200);
}
//LEFTWALL CUSTOM IMAGE ZOOM ++
if (Functions.getQueryVariable("leftwall_image_zoom"))
{
    var zoomLeftWall = Functions.getQueryVariable("leftwall_image_zoom")
    setTimeout(() => {
        scene.getObjectByName( "left_wall_1" ).material.map.repeat.set(zoomLeftWall, zoomLeftWall)
    }, 200);
}

}
         
/*
 ###### ##   ## #######  #####   
   ##   ###  ##  ##   # ### ###  
   ##   #### ##  ##     ##   ##  
   ##   #######  ####   ##   ##  
   ##   ## ####  ##     ##   ##  
   ##   ##  ###  ##     ### ###  
 ###### ##   ## ####     #####   
                                 

#####  #######  ##### ### ###  
 ## ##  ##   # ##   ## ## ##   
 ##  ## ##     ##      ####    
 ##  ## ####    #####  ###     
 ##  ## ##          ## ####    
 ## ##  ##   # ##   ## ## ##   
#####  #######  ##### ### ###  
*/    

/**
*  ON EVENT OF CLICK INFO DESK ICON
*/


//setTimeout(loadInfoDesk, 5000)      
function loadInfoDesk() 
{
    var infoDeskUploadResponseUrl,dd, rotate90InfoDesk

    rotate90InfoDesk = false
  
    var envFloor = scene.getObjectByName( "environment_floor")
    var infoDeskFurnitureControl = document.getElementById("furniture_icon_group_info_desk")
    var infoDeskGraphicControl =  document.getElementById("graphics_control_icon_group_info_desk")

    var infoDesk = scene.getObjectByName( "info_desk")
    var infoDeskSides = scene.getObjectByName( "info_desk_1")
    var infoDeskPoster = scene.getObjectByName( "info_desk_2")
    var switchInfoDesk = document.getElementById("toogle_switch_info_desk_switch")   
            
    var standBase = scene.getObjectByName( "stand_1" )
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    var limiterPlaneGeoInfoDesk = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthInfoDesk , dimDepthStandBase -  dimDepthInfoDesk);
    var limiterPlaneMatInfoDesk = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var limiterPlaneInfoDesk = new THREE.Mesh( limiterPlaneGeoInfoDesk, limiterPlaneMatInfoDesk );
    scene.add(limiterPlaneInfoDesk)
    limiterPlaneInfoDesk.rotation.x = THREE.MathUtils.degToRad(90)
    limiterPlaneInfoDesk.position.y = 0.11
    //limiterPlaneInfoDesk.visible = false
    var dimInfoDesk = new THREE.Box3().setFromObject(infoDesk);
    var dimWidthInfoDesk = Math.abs(dimInfoDesk.max.x)+Math.abs(dimInfoDesk.min.x)
    var dimDepthInfoDesk = Math.abs(dimInfoDesk.max.z)+Math.abs(dimInfoDesk.min.z)
   
    //var dimHeightInfoDesk = Math.abs(dimInfoDesk.max.y)+Math.abs(dimInfoDesk.min.y)
    

/**
 *  INIT TEXTURE SETTINGS
 */
    var textureInfoDesk = new THREE.TextureLoader().load( "./media/info_desk.jpg" );
    infoDeskPoster.material = new THREE.MeshBasicMaterial({map :  textureInfoDesk})
    
    textureInfoDesk.colorSpace = THREE.SRGBColorSpace;
    textureInfoDesk.wrapS = THREE.RepeatWrapping;
    textureInfoDesk.wrapT = THREE.RepeatWrapping;
    textureInfoDesk.repeat.set( 8, 8 )
   
    switchInfoDesk.addEventListener('change', function () 
    {
        if (switchInfoDesk.checked)
        {
            var standBase = scene.getObjectByName( "stand_1" )
            var dimInfoDesk = new THREE.Box3().setFromObject(infoDesk);
            var dimWidthInfoDesk = Math.abs(dimInfoDesk.max.x)+Math.abs(dimInfoDesk.min.x)
            var dimDepthInfoDesk = Math.abs(dimInfoDesk.max.z)+Math.abs(dimInfoDesk.min.z)
            var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
            var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
            var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
            var limiterPlaneGeoInfoDesk = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthInfoDesk , dimDepthStandBase -  dimDepthInfoDesk);
            var limiterPlaneMatInfoDesk = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var limiterPlaneInfoDesk = new THREE.Mesh( limiterPlaneGeoInfoDesk, limiterPlaneMatInfoDesk );
            scene.add(limiterPlaneInfoDesk)
            limiterPlaneInfoDesk.rotation.x = THREE.MathUtils.degToRad(90)
            limiterPlaneInfoDesk.position.y = 0.11
            //limiterPlaneInfoDesk.visible = false
            
           
            scene.getObjectByName( "info_desk_1").visible = true
            scene.getObjectByName( "info_desk_2").visible = true
            console.log("info desk switch checked")
            window.addEventListener( 'mousemove', onMouseMoveInfoDesk);

    function infoDeskFurnitureControls()
    {
        setTimeout(() =>
        {
            infoDeskFurnitureControl.style.visibility = "visible" 
            var getPositionInfoDesk = infoDesk.getWorldPosition(new THREE.Vector3())
            getPositionInfoDesk.project(camera);

            var x = (getPositionInfoDesk.x *  .5 + .5) * canvas.clientWidth;
            var y = (getPositionInfoDesk.y * -.5 + .5) * canvas.clientHeight;

            infoDeskFurnitureControl.style.left = `${x}px`
            infoDeskFurnitureControl.style.top = `${y}px`
        }, "200");
    }

/**
 *  CLICK FOLLOW CURSOR
 */
        
        function onMouseMoveInfoDesk(event)
        {
            
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            controls.enabled = false; 
            infoDeskSides.material.transparent = true;
            infoDeskSides.material.opacity = 0.5; 
           
            if(intersect.length>0)
            {
                // console.log("intersection true")
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                    infoDesk.position.set(a,0.902,c)
                } 
            }
            else        
            {
                intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  

                    if (Math.abs(a)<= dimWidthStandBase/2-dimWidthInfoDesk/2)
                    {
                        if(c<0){infoDesk.position.x=a}
                        else if(c>0){infoDesk.position.x=a}
                    }

                    if (Math.abs(c)<= dimDepthStandBase/2-dimDepthInfoDesk/2)
                    {
                        if(a<0){infoDesk.position.z=c }
                        else if(a>0){infoDesk.position.z=c}
                    }
                }
            } 
        window.addEventListener( 'click', function()
        {
            //  console.log("first drop")
            controls.enabled = true;
            window.removeEventListener( 'mousemove', onMouseMoveInfoDesk);
            infoDeskSides.material.opacity = 1
        })
            
        }

        canvas.addEventListener( 'click', function(event)   //3D İÇİN CANVAS HTML İÇİN WINDOW CLICK
        {
            //console.log("second click event")
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObject(infoDesk)

            if(intersect.length>0)
            {
                infoDeskFurnitureControls()
            }
           
        })  

/**
 *  FURNITURE CONTROL ICONS
 */
    
    rot90Info()
    function rot90Info()
    {
        
        document.getElementById("rotate_icon_info_desk").onclick = ()=>
        {
            
            infoDesk.rotateY(THREE.MathUtils.degToRad(90))
            rotate90InfoDesk = true
            console.log(rotate90InfoDesk)
            var limiterPlaneGeoInfoDesk2 = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthInfoDesk , dimDepthStandBase -  dimDepthInfoDesk);
            var limiterPlaneMatInfoDesk2 = new THREE.MeshBasicMaterial( {color: "white", side: THREE.DoubleSide} );
            var limiterPlaneInfoDesk2 = new THREE.Mesh( limiterPlaneGeoInfoDesk2, limiterPlaneMatInfoDesk2 );
            scene.add(limiterPlaneInfoDesk2)
            limiterPlaneInfoDesk2.rotation.x = THREE.MathUtils.degToRad(90)
            limiterPlaneInfoDesk2.position.y = 0.11
            //limiterPlaneInfoDesk2.visible = false
            document.getElementById("move_icon_info_desk").onclick = ()=>
            {    
                window.addEventListener( 'mousemove', function onMouseMoveInfoDesk2()
                {
                infoDeskFurnitureControl.style.visibility = "hidden" 
                infoDeskGraphicControl.style.visibility = "hidden"
                infoDeskSides.material.transparent = true;
                infoDeskSides.material.opacity = 0.5; 
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
                raycaster.setFromCamera(mouse, camera);
                intersect = raycaster.intersectObject(limiterPlaneInfoDesk2)
                controls.enabled = false 
        
                if(intersect.length>0)
                {
                    // console.log("intersection true")
                    for ( var i = 0; i < intersect.length; i ++ )
                    {
                        var a = intersect[ i ].point.x 
                        var c = intersect[ i ].point.z  
                        infoDesk.position.set(a,0.902,c)
                    } 
                }
                else        
                {
                    intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                    for ( var i = 0; i < intersect.length; i ++ )
                    {
                        var a = intersect[ i ].point.x 
                        var c = intersect[ i ].point.z  
        
                        if (Math.abs(a)<= dimWidthStandBase/2-dimDepthInfoDesk/2)
                        {
                            if(c<0){infoDesk.position.x=a}
                            else if(c>0){infoDesk.position.x=a}
                        }
                        if (Math.abs(c)<= dimDepthStandBase/2-dimWidthInfoDesk/2)
                        {
                            if(a<0){infoDesk.position.z=c }
                            else if(a>0){infoDesk.position.z=c}
                        }
                    }
                } 
                window.addEventListener( 'click', function()
                {
                    controls.enabled = true;
                    window.removeEventListener( 'mousemove' , onMouseMoveInfoDesk2);
                    infoDeskSides.material.transparent = true;
                    infoDeskSides.material.opacity = 1
                })
        
        
        
                })
            }
                document.getElementById("rotate_icon_info_desk").onclick = ()=>
                {
                    infoDesk.rotateY(THREE.MathUtils.degToRad(90))
                    rotate90InfoDesk = false
                    var limiterPlaneGeoInfoDesk = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthInfoDesk , dimDepthStandBase -  dimDepthInfoDesk);
                    var limiterPlaneMatInfoDesk = new THREE.MeshBasicMaterial( {color: "white", side: THREE.DoubleSide} );
                    var limiterPlaneInfoDesk = new THREE.Mesh( limiterPlaneGeoInfoDesk, limiterPlaneMatInfoDesk );
                    scene.add(limiterPlaneInfoDesk)
                    limiterPlaneInfoDesk2.rotation.x = THREE.MathUtils.degToRad(90)
                    limiterPlaneInfoDesk2.position.y = 0.11
                    rot90Info()
                    console.log(rotate90InfoDesk)
                    document.getElementById("move_icon_info_desk").onclick = ()=>
                    {    
                        window.addEventListener( 'mousemove', function onMouseMoveInfoDesk2()
                        {
                        infoDeskFurnitureControl.style.visibility = "hidden" 
                        infoDeskGraphicControl.style.visibility = "hidden"
                        infoDeskSides.material.transparent = true;
                        infoDeskSides.material.opacity = 0.5; 
                        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                
                        raycaster.setFromCamera(mouse, camera);
                        intersect = raycaster.intersectObject(limiterPlaneInfoDesk)
                        controls.enabled = false 
                
                        if(intersect.length>0)
                        {
                            // console.log("intersection true")
                            for ( var i = 0; i < intersect.length; i ++ )
                            {
                                var a = intersect[ i ].point.x 
                                var c = intersect[ i ].point.z  
                                infoDesk.position.set(a,0.902,c)
                            } 
                        }
                        else        
                        {
                            intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                            for ( var i = 0; i < intersect.length; i ++ )
                            {
                                var a = intersect[ i ].point.x 
                                var c = intersect[ i ].point.z  
                
                                if (Math.abs(a)<= dimWidthStandBase/2-dimWidthInfoDesk/2)
                                {
                                    if(c<0){infoDesk.position.x=a}
                                    else if(c>0){infoDesk.position.x=a}
                                }
                                if (Math.abs(c)<= dimDepthStandBase/2-dimDepthInfoDesk/2)
                                {
                                    if(a<0){infoDesk.position.z=c }
                                    else if(a>0){infoDesk.position.z=c}
                                }
                            }
                        } 
                        window.addEventListener( 'click', function()
                        {
                            controls.enabled = true;
                            window.removeEventListener( 'mousemove' , onMouseMoveInfoDesk2);
                            infoDeskSides.material.transparent = true;
                            infoDeskSides.material.opacity = 1
                        })
                
                
                
                        })
                    }
                }
        }
    }
    
    document.getElementById("trash_icon_info_desk").onclick = ()=>
    {
        infoDesk.position.set(0,0.902,-20)
        scene.getObjectByName( "info_desk_1").visible = false
        scene.getObjectByName( "info_desk_2").visible = false
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden" 
        switchInfoDesk.checked = false
    }
    document.getElementById("move_icon_info_desk").onclick = ()=>   //ON CLICK MOVE FONKSİYONUNU ROTATE'İN İÇİNE HER ROTATE DE AYRI OLARAK KOYDUK VE ROTATE 90'DA INTERSECTION PLANE'İ DEĞİŞTİRDİK
    {    
        window.addEventListener( 'mousemove', function onMouseMoveInfoDesk2()
        {
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden"
        infoDeskSides.material.transparent = true;
        infoDeskSides.material.opacity = 0.5; 
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        intersect = raycaster.intersectObject(limiterPlaneInfoDesk)
        controls.enabled = false 

        if(intersect.length>0)
        {
            // console.log("intersection true")
            for ( var i = 0; i < intersect.length; i ++ )
            {
                var a = intersect[ i ].point.x 
                var c = intersect[ i ].point.z  
                infoDesk.position.set(a,0.902,c)
            } 
        }
        else        
        {
            intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
            for ( var i = 0; i < intersect.length; i ++ )
            {
                var a = intersect[ i ].point.x 
                var c = intersect[ i ].point.z  

                if (Math.abs(a)<= dimWidthStandBase/2-dimWidthInfoDesk/2)
                {
                    if(c<0){infoDesk.position.x=a}
                    else if(c>0){infoDesk.position.x=a}
                }
                if (Math.abs(c)<= dimDepthStandBase/2-dimDepthInfoDesk/2)
                {
                    if(a<0){infoDesk.position.z=c }
                    else if(a>0){infoDesk.position.z=c}
                }
            }
        } 
        window.addEventListener( 'click', function()
        {
            controls.enabled = true;
            window.removeEventListener( 'mousemove' , onMouseMoveInfoDesk2);
            infoDeskSides.material.transparent = true;
            infoDeskSides.material.opacity = 1
        })



        })
    }

    document.getElementById("info_icon_info_desk").onclick = ()=>
    {
        setTimeout(() =>
        {
            infoDeskFurnitureControl.style.visibility = "hidden" 
            infoDeskGraphicControl.style.visibility = "visible"
            
            var getPositionInfoDesk = infoDesk.getWorldPosition(new THREE.Vector3())
            getPositionInfoDesk.project(camera);

            var x = (getPositionInfoDesk.x *  .5 + .5) * canvas.clientWidth;
            var y = (getPositionInfoDesk.y * -.5 + .5) * canvas.clientHeight;

            infoDeskGraphicControl.style.left = `${x}px`
            infoDeskGraphicControl.style.top = `${y}px`
        }, "200");
         
    }

    }
    else
    {
        scene.getObjectByName( "info_desk_1").visible = false
        scene.getObjectByName( "info_desk_2").visible = false
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden" 
        infoDesk.position.set(0,0.902,-20)
    }

/**
 * 
 * 
 * INFO DESK GRAPHIC ICONS
 * 
 * 
 */ 
document.getElementById("refresh_icon_info_desk").onclick = ()=>
{ 
    textureInfoDesk.repeat.set( 8, 8 )
}
dd=8
document.getElementById("zoom_out_icon_info_desk").onclick = ()=>
{   
dd = Functions.roundXSteps(dd + 0.2 , 2) 
    infoDeskPoster.material.map.repeat.set( dd, dd );
    Functions.addOrUpdateURLParam ("info_desk_image_zoom_out" , `${dd}`)//PARAMS SAVE BACK WALL ZOOM OUT
}

document.getElementById("zoom_in_icon_info_desk").onclick = ()=>
{   
dd = Functions.roundXSteps(dd - 0.2 , 2) 
    infoDeskPoster.material.map.repeat.set( dd, dd );
    Functions.addOrUpdateURLParam ("info_desk_image_zoom_in" , `${dd}`)//PARAMS SAVE BACK WALL ZOOM IN
}

document.getElementById("left_icon_info_desk").onclick = ()=>
{   
dd = Functions.roundXSteps(dd - 0.2 , 2) 
    infoDeskPoster.material.map.offset.set(dd, 8)
    Functions.addOrUpdateURLParam ("info_desk_image_position_left" , `${dd}`)//PARAMS SAVE BACK WALL POSITION LEFT
}

document.getElementById("right_icon_info_desk").onclick = ()=>
{   
dd = Functions.roundXSteps(dd + 0.2 , 2) 
    infoDeskPoster.material.map.offset.set(dd, 8)
    Functions.addOrUpdateURLParam ("info_desk_image_position_right" , `${dd}`)//PARAMS SAVE BACK WALL POSITION RIGHT
}

document.getElementById("up_icon_info_desk").onclick = ()=>
{   
dd = Functions.roundXSteps(dd + 0.2 , 2) 
    infoDeskPoster.material.map.offset.set(8, dd)
    Functions.addOrUpdateURLParam ("info_desk_image_position_up" , `${dd}`)//PARAMS SAVE BACK WALL POSITION UP
}
document.getElementById("down_icon_info_desk").onclick = ()=>
{   
dd = Functions.roundXSteps(dd - 0.2 , 2) 
    infoDeskPoster.material.map.offset.set(8, dd)
    Functions.addOrUpdateURLParam ("info_desk_image_position_down" , `${dd}`)//PARAMS SAVE BACK WALL POSITION DOWN
}

document.getElementById("apply_icon_info_desk").onclick = ()=>
{ 
    infoDeskGraphicControl.style.visibility = "hidden"       
}
document.getElementById("add_icon_info_desk").onclick = ()=>
{   
    var inputDesk = document.createElement('input');
    inputDesk.type = 'file';
    
    inputDesk.onchange = e => 
    { 
       // getting a hold of the file reference
       var fileDesk = e.target.files[0]; 
       // setting up the reader
       var readerDesk = new FileReader();
       readerDesk.readAsDataURL(fileDesk); // this is reading as data url
       // here we tell the reader what to do when it's done reading...
       readerDesk.onload = readerEvent => 
       {
        var contentDesk = readerEvent.target.result; // this is the content!
        var textureDesk = new THREE.TextureLoader().load(contentDesk);
        
        Functions.sendDataParams(contentDesk , infoDeskUploadResponseUrl , "info_desk_image" )
        infoDeskPoster.material.map = textureDesk
        textureDesk.rotation = THREE.MathUtils.degToRad(90);
        
        textureDesk.colorSpace = THREE.SRGBColorSpace;
        textureDesk.wrapS = THREE.RepeatWrapping;
        textureDesk.wrapT = THREE.RepeatWrapping;
        textureDesk.repeat.set( 8, 8 );
            
    //The last thing to note about the example is that if you change wrapS or wrapT on the texture you must also set texture.needsUpdate so three.js knows to apply those settings. The other settings are automatically applied.
    // textureDesk.needsUpdate =true
    //scene.getObjectByName( "back_wall_1" ).material.needsUpdate = true
       }
    }
    inputDesk.click();
}
   

    })  //      END OF        //        checkbox.addEventListener('change', function () 
    
}   //      END OF        //        setTimeout(loadInfoDesk, 5000)    

/*
###### #######  ##### ###### ####    #######  
 ##  ## ##   # ### ### ##  ## ##      ##   #  
 ##  ## ##     ##   ## ##  ## ##      ##      
 #####  ####   ##   ## #####  ##      ####    
 ##     ##     ##   ## ##     ##      ##      
 ##     ##   # ### ### ##     ##  ##  ##   #  
####   #######  ##### ####   ####### #######  
*/                                              

setTimeout(loadPeople, 5000)
function loadPeople()
{
    
    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster(); 
    var intersect = new THREE.Vector3();

    document.getElementById("people0_icon").onclick = ()=>
    {   
        window.addEventListener( 'mousemove', onMouseMovePeople)
        function onMouseMovePeople(event) //BASIC FOLLOW CURSOR FUNCTIONS
        {
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                
                intersect = raycaster.intersectObject(scene.getObjectByName( "limiter_people" ))
                controls.enabled = false; 
                scene.getObjectByName("people0").visible = true
                
                if(intersect.length>0)
                {
                    console.log("intersection true")
                    document.getElementById("furniture_icon_group_people0").style.visibility = "hidden" 
                    for ( var i = 0; i < intersect.length; i ++ )
                    {
                        var a = intersect[ i ].point.x 
                        var c = intersect[ i ].point.z 
                        scene.getObjectByName("people0").position.set(a,1,c)
                    } 
                    window.addEventListener( 'click', function ()   //FIRST DROP
                    {   
                        controls.enabled = true;
                        setTimeout(() => {
                            window.removeEventListener('mousemove' , onMouseMovePeople)
                            container.addEventListener('click' , onMouseMovePeopleClick)
                        }, 200);
                    })
                
                }
                
        }
    }

//AFTER DROP PEOPLE
//CLICK TO MOVE BUTTON TO MOVE PEOPLE AGAIN


    function onMouseMovePeopleClick() { 
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObject(scene.getObjectByName( "people0" ))
            if(intersect.length>0)
            {
                    
                    setTimeout(() => 
                    {
                    document.getElementById("furniture_icon_group_people0").style.visibility = "visible"
                    var tempV = scene.getObjectByName( "people0" ).getWorldPosition(new THREE.Vector3())
                    tempV.project(camera)
           
                    var x = (tempV.x *  .5 + .5) * canvas.clientWidth;
                    var y = (tempV.y * -.5 + .5) * canvas.clientHeight;
           
                    document.getElementById("furniture_icon_group_people0").style.left = `${x}px`
                    document.getElementById("furniture_icon_group_people0").style.top = `${y}px`
                    }, "200")   
                }
            
           
    } 
    
    document.getElementById("move_icon_people0").onclick = ()=>
    {
        window.removeEventListener( 'mousemove', onMouseMovePeopleClick)
        window.addEventListener( 'mousemove', onMouseMovePeopleDrag)
        function onMouseMovePeopleDrag(event) //DRAG
        {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            
            intersect = raycaster.intersectObject(scene.getObjectByName( "limiter_people" ))
            controls.enabled = false; 
            
            if(intersect.length>0)
            {
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    document.getElementById("furniture_icon_group_people0").style.visibility = "hidden"
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z 
                    scene.getObjectByName("people0").position.set(a,1,c)
                } 
                window.addEventListener( 'click', function ()   
                {
                    window.removeEventListener( 'mousemove', onMouseMovePeopleDrag)
                    controls.enabled = true;
                  
                })
            }
        }
    }
    document.getElementById("rotate_icon_people0").onclick = ()=>
    {
        scene.getObjectByName( "people0" ).rotateY(THREE.MathUtils.degToRad(90))
    }
    document.getElementById("trash_icon_people0").onclick = ()=>
    {
        document.getElementById("furniture_icon_group_people0").style.visibility = "hidden" //VISIBILITY STİLİ BURDA ÇALIŞMIYOR O YÜZDEN DISPLAY KULLANDIK.
        scene.getObjectByName( "people0" ).visible = false
        scene.getObjectByName( "people0" ).layers.set( 1 )
        furnitureAdded = false
    }
    document.getElementById("apply_icon_people0").onclick = ()=>
    {
        document.getElementById("furniture_icon_group_people0").style.visibility = "hidden" //VISIBILITY STİLİ BURDA ÇALIŞMIYOR O YÜZDEN DISPLAY KULLANDIK.
        
    }
}

                                                                        
 /*                                                                       
  ####  ##  ## #######  #### ### ###  
 ##  ## ##  ##  ##   # ##  ## ## ##   
##      ##  ##  ##    ##      ####    
##      ######  ####  ##      ###     
##      ##  ##  ##    ##      ####    
 ##  ## ##  ##  ##   # ##  ## ## ##   
  ####  ##  ## #######  #### ### ###  
                                      
##   ## ###### ##### ###### ###### ####    #######  
##   ##   ##  ##   ##  ##    ##  ## ##      ##   #  
##   ##   ##  ##       ##    ##  ## ##      ##      
 ## ##    ##   #####   ##    #####  ##      ####    
 ## ##    ##       ##  ##    ##  ## ##      ##      
  ###     ##  ##   ##  ##    ##  ## ##  ##  ##   #  
  ###   ###### ##### ###### ###### ####### #######  

*/ 
setTimeout(loadCheckVisible, 5000)
function loadCheckVisible()
{  
var furnitureAdded = false                                          
setInterval(() => { console.log(furnitureAdded)
    if(
        scene.getObjectByName("people0").visible==true || 
        scene.getObjectByName("double_sofa_1").visible==true)
        {
            furnitureAdded = true  
        }
    else{furnitureAdded = false}
}, 500);
}
/*
####    ###### ##   ## ###### # ##### ####### ######   #####   
 ##       ##   ### ###   ##  ## ## ##  ##   #  ##  ## ##   ##  
 ##       ##   #######   ##     ##     ##      ##  ## ##       
 ##       ##   ## # ##   ##     ##     ####    #####   #####   
 ##       ##   ##   ##   ##     ##     ##      ## ##       ##  
 ##  ##   ##   ##   ##   ##     ##     ##   #  ## ##  ##   ##  
####### ###### ### ### ######  ####   ####### #### ##  #####   
*/

/**
 * TEMP.JS DOSYASININ İÇİNDE HAZIRLANIYOR...
 */

/*
#####    #####  ##   ## ###### ####    #######          
 ## ##  ### ### ##   ##  ##  ## ##      ##   #          
 ##  ## ##   ## ##   ##  ##  ## ##      ##              
 ##  ## ##   ## ##   ##  #####  ##      ####            
 ##  ## ##   ## ##   ##  ##  ## ##      ##              
 ## ##  ### ### ##   ##  ##  ## ##  ##  ##   #          
#####    #####   #####  ###### ####### #######          
                                                        
 #####   ##### #######  ###    
##   ## ### ### ##   # ## ##   
##      ##   ## ##    ##   ##  
 #####  ##   ## ####  ##   ##  
     ## ##   ## ##    #######  
##   ## ### ### ##    ##   ##  
 #####   ##### ####   ##   ##  
*/                                                                              

setTimeout(loadDoubleSofa, 5000)
function loadDoubleSofa()
{
    
    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster(); 
    var intersect = new THREE.Vector3();

    document.getElementById("double_sofa_icon").onclick = ()=>
    {
        if(scene.getObjectByName("double_sofa_1").visible==false){window.addEventListener( 'mousemove', onMouseMoveDoubleSofa01)}
        if(scene.getObjectByName("double_sofa_1").visible==true){/* onMouseMoveDoubleSofa02 */}
    }
    function onMouseMoveDoubleSofa01()
    {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        intersect = raycaster.intersectObject(scene.getObjectByName( "limiter_double_sofa" ))
        controls.enabled = false; 
        scene.getObjectByName("double_sofa_1").visible = true
        scene.getObjectByName("double_sofa_2").visible = true

        if(intersect.length>0)
        {
            console.log("intersection true")
            document.getElementById("furniture_icon_group_double_sofa").style.visibility = "hidden" 
            for ( var i = 0; i < intersect.length; i ++ )
            {
                var a = intersect[ i ].point.x 
                var c = intersect[ i ].point.z 
                scene.getObjectByName("double_sofa").position.set(a,0.554,c)
            } 
            window.addEventListener( 'click', function ()   //FIRST DROP
            {   
                controls.enabled = true;
                setTimeout(() => {
                window.removeEventListener('mousemove' , onMouseMoveDoubleSofa01)
                container.addEventListener('click' , onMouseMoveDoubleSofaClick)
                }, 200);
            })

        }
    }

//AFTER DROP DOUBLE SOFA
//CLICK TO MOVE BUTTON TO MOVE DOUBLE SOFA AGAIN


function onMouseMoveDoubleSofaClick() { 
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    intersect = raycaster.intersectObject(scene.getObjectByName( "double_sofa" ))
    if(intersect.length>0)
    {
            
            setTimeout(() => 
            {
            document.getElementById("furniture_icon_group_double_sofa").style.visibility = "visible"
            var tempV = scene.getObjectByName( "double_sofa" ).getWorldPosition(new THREE.Vector3())
            tempV.project(camera)
   
            var x = (tempV.x *  .5 + .5) * canvas.clientWidth;
            var y = (tempV.y * -.5 + .5) * canvas.clientHeight;
   
            document.getElementById("furniture_icon_group_double_sofa").style.left = `${x}px`
            document.getElementById("furniture_icon_group_double_sofa").style.top = `${y}px`
            }, "200")   
        }
    
   
} 
document.getElementById("move_icon_double_sofa").onclick = ()=>
    {
        window.removeEventListener( 'mousemove', onMouseMoveDoubleSofaClick)
        window.addEventListener( 'mousemove', onMouseMoveDoubleSofaDrag)
        function onMouseMoveDoubleSofaDrag(event) //DRAG
        {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            
            if(scene.getObjectByName( "double_sofa" ).rotation.y == 0)
            {intersect = raycaster.intersectObject(scene.getObjectByName( "limiter_double_sofa" ))}

            if(scene.getObjectByName( "double_sofa" ).rotation.y == THREE.MathUtils.degToRad(90))
            {intersect = raycaster.intersectObject(scene.getObjectByName( "limiter_double_sofa90" ))}
            
            controls.enabled = false; 
            
            if(intersect.length>0)
            {
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    document.getElementById("furniture_icon_group_double_sofa").style.visibility = "hidden"
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z 
                    scene.getObjectByName("double_sofa").position.set(a,0.554,c)
                } 
                window.addEventListener( 'click', function ()   
                {
                    window.removeEventListener( 'mousemove', onMouseMoveDoubleSofaDrag)
                    controls.enabled = true;
                  
                })
            }
        }
}
document.getElementById("rotate_icon_double_sofa").onclick = ()=>
{
    scene.getObjectByName( "double_sofa" ).rotateY(THREE.MathUtils.degToRad(90))
}
document.getElementById("trash_icon_double_sofa").onclick = ()=>
{
    document.getElementById("furniture_icon_group_double_sofa").style.visibility = "hidden" //VISIBILITY STİLİ BURDA ÇALIŞMIYOR O YÜZDEN DISPLAY KULLANDIK.
    scene.getObjectByName( "double_sofa" ).visible = false
    scene.getObjectByName( "double_sofa_1" ).layers.set( 1 )
    scene.getObjectByName( "double_sofa_2" ).layers.set( 1 )
}
document.getElementById("apply_icon_double_sofa").onclick = ()=>
{
    document.getElementById("furniture_icon_group_double_sofa").style.visibility = "hidden" //VISIBILITY STİLİ BURDA ÇALIŞMIYOR O YÜZDEN DISPLAY KULLANDIK.
    
}



}

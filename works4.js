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
    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster(); 
    var intersect = new THREE.Vector3();
    var intersectInfoDeskPoster = new THREE.Vector3();
    var intersectInfoDeskSides = new THREE.Vector3();
    var standBase = scene.getObjectByName( "stand_1" )
    var envFloor = scene.getObjectByName( "environment_floor")
    var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
    var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
    var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
    
    var infoDeskFurnitureControl = document.getElementById("furniture_icon_group_info_desk")
    var infoDeskGraphicControl =  document.getElementById("graphics_control_icon_group_info_desk")

    var infoDesk = scene.getObjectByName( "info_desk")
    var infoDeskPoster = scene.getObjectByName( "info_desk_2")
    var infoDeskSides = scene.getObjectByName( "info_desk_1")
    var switchInfoDesk = document.getElementById("toogle_switch_info_desk_switch")   

    var draggerInfoDesk = new THREE.Mesh( new THREE.BoxGeometry(dimWidthInfoDesk , dimHeightInfoDesk , dimDepthInfoDesk), new THREE.MeshBasicMaterial( {color: 0x00ff00} ))    //DRAG EDİLEBİLİR GÖRÜNMEZ BİR OBJE YAPIYORUZ VE BU OBJENİN HELPER BOYUTUNDA OLMASI GEREKİYOR Kİ İMLEÇ ÜZERİNE GELDİĞİNDE HER YÖNDEN DRAG EDİLEBİLSİN.
    draggerInfoDesk.visible = false
    draggerInfoDesk.position.y = 0.11
    var helperInfoDesk = new THREE.BoxHelper( infoDesk, 0xffff00 );
    helperInfoDesk.material = new THREE.MeshBasicMaterial({color: "#00FFFF"})

    var dimInfoDesk = new THREE.Box3().setFromObject(infoDesk);
    var dimWidthInfoDesk = Math.abs(dimInfoDesk.max.x)+Math.abs(dimInfoDesk.min.x)
    var dimDepthInfoDesk = Math.abs(dimInfoDesk.max.z)+Math.abs(dimInfoDesk.min.z)
    var dimHeightInfoDesk = Math.abs(dimInfoDesk.max.y)+Math.abs(dimInfoDesk.min.y)

    var limiterPlaneGeoInfoDesk = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthInfoDesk , dimDepthStandBase -  dimDepthInfoDesk);
    var limiterPlaneMatInfoDesk = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var limiterPlaneInfoDesk = new THREE.Mesh( limiterPlaneGeoInfoDesk, limiterPlaneMatInfoDesk );
    scene.add(limiterPlaneInfoDesk)
    limiterPlaneInfoDesk.rotation.x = THREE.MathUtils.degToRad(90)
    limiterPlaneInfoDesk.position.y = 0.11
    limiterPlaneInfoDesk.visible = false

/**
 *  INIT TEXTURE SETTINGS
 */
    var textureInfoDesk = new THREE.TextureLoader().load( "./media/info_desk.jpg" );
    scene.getObjectByName( "info_desk_2" ).material = new THREE.MeshBasicMaterial({map :  textureInfoDesk})
    
    textureInfoDesk.colorSpace = THREE.SRGBColorSpace;
    textureInfoDesk.wrapS = THREE.RepeatWrapping;
    textureInfoDesk.wrapT = THREE.RepeatWrapping;
    textureInfoDesk.repeat.set( 8, 8 )

/**
 *  INIT CLICK VARIABLES
 */
    var clickEventInfoDesk = false
    var dragEventInfoDesk = false
    var hoverEventInfoDesk = false

/**
 *  INIT DRAG SETTINGS FOR INFO DESK
 */
        
     var objectsInfoDesk = []
     objectsInfoDesk.push(draggerInfoDesk)
     var dragInfoDesk = new DragControls(objectsInfoDesk, camera, renderer.domElement)
     dragInfoDesk.enabled = false
    
    switchInfoDesk.addEventListener('change', function () 
    {
        if (switchInfoDesk.checked)
        {
            scene.getObjectByName( "info_desk_1").visible = true
            scene.getObjectByName( "info_desk_2").visible = true

           /*  raycaster.layers.set( 0 ); 
            draggerInfoDesk.layers.enable( 0 );  
            infoDeskPoster.layers.enable( 0 ); 
            infoDeskSides.layers.enable( 0 ); 
            infoDesk.layers.enable( 0 ) */

        console.log("info desk switch checked")
        window.addEventListener( 'mousemove', onMouseMoveInfoDesk);

    function onClickAllObjects()
    {
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden" 
        scene.remove(helperInfoDesk)
    }


    function onClickInfoDeskPoster()
    {
        scene.remove(helperInfoDesk)    // HIDE ALL HELPERS
        
        
        setTimeout(() =>
        {
            scene.add(helperInfoDesk)  
            infoDeskGraphicControl.style.visibility = "visible" 
            infoDeskFurnitureControl.style.visibility = "hidden" 
            
            var getPositionInfoDesk = infoDesk.getWorldPosition(new THREE.Vector3())
            getPositionInfoDesk.project(camera);

            var x = (getPositionInfoDesk.x *  .5 + .5) * canvas.clientWidth;
            var y = (getPositionInfoDesk.y * -.5 + .5) * canvas.clientHeight;

            infoDeskGraphicControl.style.left = `${x}px`
            infoDeskGraphicControl.style.top = `${y}px`
        }, "200");
    }

    function onClickInfoDeskSides()
    {
        scene.remove(helperInfoDesk)    // HIDE ALL HELPERS
        
        setTimeout(() =>
        {
            scene.add(helperInfoDesk)  
            infoDeskFurnitureControl.style.visibility = "visible" 
            infoDeskGraphicControl.style.visibility = "hidden"
            
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

            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObject(limiterPlaneInfoDesk)
            controls.enabled = false; 

            scene.add(helperInfoDesk)

            if(intersect.length>0)
            {
                // console.log("intersection true")
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                    infoDesk.position.set(a,0.11,c)
                    draggerInfoDesk.position.set(a,dimHeightInfoDesk,c)
                    helperInfoDesk.update()
                } 
            }
            else        
            {
                intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                    // console.log("projected coordinates on 3d space x=" + a + "z=" + c)
                    helperInfoDesk.update()

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
                console.log("first drop action")
                scene.remove(helperInfoDesk)
                controls.enabled = true;
                draggerInfoDesk.position.set(infoDesk.position.x,dimHeightInfoDesk,infoDesk.position.z)  //STAND INTERSECTION ALANI DIŞINDA DROP YAPTIĞIMIZDA DRAGGER SPHERE (DRAG OBJE SADECE KENDİSİ OLDUĞUNDAN) DIŞARDA KALIYOR O YÜZDEN TEKRAR OBJEYİ DRAG EDEBİLMEK İÇİN BU AYARI YAPIYORUZ.
                dragInfoDesk.enabled = true
                scene.add(draggerInfoDesk)
            })
            
        }window.removeEventListener( 'mousemove', onMouseMoveInfoDesk);

        container.addEventListener( 'mousedown', function(event)
        {
            console.log("second click event")
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            
            intersectInfoDeskPoster = raycaster.intersectObject(infoDeskPoster)
            intersectInfoDeskSides = raycaster.intersectObject(infoDeskSides)

            if(intersectInfoDeskPoster.length>0)
            {
                onClickInfoDeskPoster()
                console.log("clicked info desk poster")
                helperInfoDesk.material = new THREE.MeshBasicMaterial({color: "#00FF00"})
            }
            else if (intersectInfoDeskSides.length>0)
            {
                onClickInfoDeskSides()
                console.log("clicked info desk sides")
                helperInfoDesk.material = new THREE.MeshBasicMaterial({color: "#00FF00"})
            }
            else        //ÜSTTEKİ İKİ DURUMUN DA OLMAMASI HALİ
            {
                onClickAllObjects()
                console.log("clicked all objects")
            }
           
        })  
        
/**
 *  FIRST DRAG
 */

    dragInfoDesk.addEventListener( 'drag', function()
    {
        dragEventInfoDesk  = true
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden" 
        helperInfoDesk.material = new THREE.MeshBasicMaterial({color: "#32CD32"})
        window.addEventListener( 'mousemove', onMouseHover);
        controls.enabled = false
        scene.add(helperInfoDesk)
        helperInfoDesk.update()
    })
    
    function onMouseHover(event) //CHECK INTERSECTIONS THEN DRAG
    {   
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        intersect = raycaster.intersectObject(limiterPlaneInfoDesk)

        if(intersect.length>0)
        {
           // console.log("intersection true")
            
            for ( var i = 0; i < intersect.length; i ++ )
            {
                var a = intersect[ i ].point.x 
                var c = intersect[ i ].point.z  
                draggerInfoDesk.position.set(a,dimHeightInfoDesk,c)
                infoDesk.position.set(a,0.11,c)
                
            } 
        }
        else        
        {
            intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
            for ( var i = 0; i < intersect.length; i ++ )
            {
                var a = intersect[ i ].point.x 
                var c = intersect[ i ].point.z  
                // console.log("projected coordinates on 3d space x=" + a + "z=" + c)

                    
                if (Math.abs(a)<= dimWidthStandBase/2-dimWidthInfoDesk/2)
                {
                    if(c<0){infoDesk.position.x=a}
                    else if(c>0){infoDesk.position.x=a}
                }

                if (Math.abs(c)<= dimDepthStandBase/2-dimDepthInfoDesk/2)
                {
                    if(a<0){infoDesk.position.z=c}
                    else if(a>0){infoDesk.position.z=c}
                }
                                
            }
            
        } 
        
    }

/**
 *  FURNITURE CONTROL ICONS
 */
            
    dragInfoDesk.addEventListener( 'dragend', function () //DRAGSTARTI CLICK OLARAK KULLANDIĞINDA CLICKTEN ELİNİ KALDIRDIĞINDA DROP'U İŞLEME ALIYOR.O YÜZDEN BİR OBJENİN CLICK'INI DRAG'IN HOVERINA EVENTLISTENER OLARAK VERİYORUZ
    {
        dragEventInfoDesk  = false
        draggerInfoDesk.position.set(infoDesk.position.x,dimHeightInfoDesk,infoDesk.position.z)  //STAND INTERSECTION ALANI DIŞINDA DRAGEND YAPTIĞIMIZDA DRAGGER SPHERE (DRAG OBJE SADECE KENDİSİ OLDUĞUNDAN) DIŞARDA KALIYOR O YÜZDEN TEKRAR OBJEYİ DRAG EDEBİLMEK İÇİN BU AYARI YAPIYORUZ.
        window.removeEventListener( 'mousemove', onMouseHover)
        controls.enabled = true; 
        scene.remove(helperInfoDesk)
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden" 
        
        
    })
    
    document.getElementById("rotate_icon_info_desk").onclick = ()=>
    {
        scene.add(helperInfoDesk)
        infoDesk.rotateY(THREE.MathUtils.degToRad(15))
        helperInfoDesk.update()
    }
    document.getElementById("trash_icon_info_desk").onclick = ()=>
    {
        console.log("clicked trash icon info desk")
        scene.getObjectByName( "info_desk_1").visible = false
        scene.getObjectByName( "info_desk_2").visible = false
        infoDeskFurnitureControl.style.visibility = "hidden" 
        infoDeskGraphicControl.style.visibility = "hidden" 
        
       // raycaster.layers.set( 1 ); 
        switchInfoDesk.checked = false
    }


    }
    /*if switchInfoDesk is not checked*/
        else    
        {
            container.removeEventListener( 'mousedown', onEventOfClick )
            console.log("switched off info switch")
            scene.getObjectByName( "info_desk_1").visible = false
            scene.getObjectByName( "info_desk_2").visible = false
            infoDeskFurnitureControl.style.visibility = "hidden" 
            infoDeskGraphicControl.style.visibility = "hidden"
            // raycaster.layers.set( 1 ); 
        }

    })  //      END OF        //        checkbox.addEventListener('change', function () 
    
}   //      END OF        //        setTimeout(loadInfoDesk, 5000)    




/*
#####   # #####  ##### ######    ###    ##### #######  
##   ## ## ## ## ### ### ##  ##  ## ##  ##   ## ##   #  
##         ##    ##   ## ##  ## ##   ## ##      ##      
 #####     ##    ##   ## #####  ##   ## ## #### ####    
     ##    ##    ##   ## ## ##  ####### ##   ## ##      
##   ##    ##    ### ### ## ##  ##   ## ##   ## ##   #  
 #####    ####    ##### #### ## ##   ##  ##### #######  
*/

//function switchOnStorage() 
{
    /**
     * INIT VARIABLES
     */
        {
            {//DEFAULTS
                var mouse = new THREE.Vector2();
                var raycaster = new THREE.Raycaster(); 
                var intersect = new THREE.Vector3();
                var storage = scene.getObjectByName( "storage")
                var standBase = scene.getObjectByName( "stand_1" )
                var envFloor = scene.getObjectByName( "environment_floor")
                var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
                var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
                var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
            }
            {//HELPER
                var helperStorage = new THREE.BoxHelper( storage, 0xffff00 );
                helperStorage.material = new THREE.MeshBasicMaterial({color: "#00FFFF"})
            }
            {//STORAGE SIZES
            var dimStorage = new THREE.Box3().setFromObject(storage);
            var dimWidthStorage = Math.abs(dimStorage.max.x)+Math.abs(dimStorage.min.x)
            var dimDepthStorage = Math.abs(dimStorage.max.z)+Math.abs(dimStorage.min.z)
            var dimHeightStorage = Math.abs(dimStorage.max.y)+Math.abs(dimStorage.min.y)
            }
            {// LIMITER PLANE
            var limiterPlaneGeoStorage = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthStorage/2 , dimDepthStandBase -  dimDepthStorage/2);
            var limiterPlaneMatStorage = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
            var limiterPlaneStorage = new THREE.Mesh( limiterPlaneGeoStorage, limiterPlaneMatStorage );
            limiterPlaneStorage.rotation.x = THREE.MathUtils.degToRad(90)
            limiterPlaneStorage.position.y = -0.5
            scene.add(limiterPlaneStorage)
            limiterPlaneStorage.visible = true
            }
        }
        
    /**
    * INIT DRAG SETTINGS
    */
        {
        /* NOTLAR
            AÇIK KAPILARIN TAŞMA PAYI : 0.3m
            BoxGeometry(width : Float, height : Float, depth : Float)
            width — Width;  X axis.
            height —  Y axis.
            depth —  Z axis.*/
        var draggerStorage = scene.getObjectByName("dragger_storage")
        draggerStorage.position.y = 0.11
        draggerStorage.visible = false
        var objectsStorage = []
        objectsStorage.push(draggerStorage)
        var dragStorage = new DragControls(objectsStorage, camera, renderer.domElement)
        dragStorage.transformGroup = true
        scene.getObjectByName("dragger_storage").layers.set(0)
        
        }
    /**
    * SETUP DRAG EVENTSLISTENERS
    */
        {
            dragStorage.addEventListener( 'drag', function()
            {
                controls.enabled = false
                scene.add(helperStorage)
                helperStorage.material = new THREE.MeshBasicMaterial({color: "#32CD32"})
                helperStorage.update()
                window.addEventListener( 'mousemove', onEventstorageDragMouseMove);
            })
            dragStorage.addEventListener( 'dragend', function()
            {
                controls.enabled = true
                window.removeEventListener( 'mousemove', onEventstorageDragMouseMove);
                scene.remove(helperStorage)
            })
    
            function onEventstorageDragMouseMove(event) //CHECK INTERSECTIONS THEN DRAG
            {   
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObject(limiterPlaneStorage)
    
            if(intersect.length>0)
            {
               // console.log("intersection true")
                
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                    draggerStorage.position.set(a,0.11,c)
                    storage.position.set(a,3.10,c)
                } 
            }
            else  //EĞER KESİŞME YOKSA...STANDIN SINIRLARININ DIŞINDAKİ İMLEÇ HAREKETLERİNİ ENVFLOOR İLE YENİ KESİŞİM BELİRLEYEREK YAPIYORUZ.  
            {
                intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                        
                    if (Math.abs(a)<= dimWidthStandBase/2-dimWidthStorage/2)
                    {
                        if(c<0){storage.position.x=a}
                        else if(c>0){storage.position.x=a}
                    }
    
                    if (Math.abs(c)<= dimDepthStandBase/2-dimDepthStorage/2)
                    {
                        if(a<0){storage.position.z=c}
                        else if(a>0){storage.position.z=c}
                    }
                                    
                }
                
            } 
            
        }
            
        }
    
    /**
    * SET STORAGE LAYERS TO "VISIBLE"
    */
        {
            scene.getObjectByName( "storage_1" ).visible = true;
            scene.getObjectByName( "storage_2" ).visible = true;
            scene.getObjectByName( "storage_3" ).visible = true;
            scene.getObjectByName( "storage_4" ).visible = true;
            scene.getObjectByName( "storage_5" ).visible = true;
        }
    
    /**
     *  INIT TEXTURE SETTINGS
     */
        {
            //1:INSIDE 2:FRONT
            var textureStorageFrontWall = new THREE.TextureLoader().load( "./media/storage_front_wall.jpg" )
            scene.getObjectByName( "storage_2" ).material = new THREE.MeshBasicMaterial({map :  textureStorageFrontWall})
            textureStorageFrontWall.colorSpace = THREE.SRGBColorSpace;
            textureStorageFrontWall.wrapS = THREE.RepeatWrapping;
            textureStorageFrontWall.wrapT = THREE.RepeatWrapping;
            textureStorageFrontWall.repeat.set( 2, 2 )
    
        }
    /**
    * SET CONTROLLERS VISIBLE
    */
        {
            
            scene.getObjectByName( "drag_right_storage" ).visible = true;
            scene.getObjectByName( "drag_front_door_storage" ).visible = true;
            
        }
            
    }
    //function switchOffStorage() 
    {
    /**
     * INIT VARIABLES
     */
        {
        {//DEFAULTS
            var mouse = new THREE.Vector2();
            var raycaster = new THREE.Raycaster(); 
            var intersect = new THREE.Vector3();
            var storage = scene.getObjectByName( "storage")
            var standBase = scene.getObjectByName( "stand_1" )
            var envFloor = scene.getObjectByName( "environment_floor")
            var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
            var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
            var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
        }
        {//HELPER
            var helperStorage = new THREE.BoxHelper( storage, 0xffff00 );
            helperStorage.material = new THREE.MeshBasicMaterial({color: "#00FFFF"})
        }
        {//STORAGE SIZES
        var dimStorage = new THREE.Box3().setFromObject(storage);
        var dimWidthStorage = Math.abs(dimStorage.max.x)+Math.abs(dimStorage.min.x)
        var dimDepthStorage = Math.abs(dimStorage.max.z)+Math.abs(dimStorage.min.z)
        var dimHeightStorage = Math.abs(dimStorage.max.y)+Math.abs(dimStorage.min.y)
        }
        {// LIMITER PLANE
        var limiterPlaneGeoStorage = new THREE.PlaneGeometry( dimWidthStandBase - dimWidthStorage/2 , dimDepthStandBase -  dimDepthStorage/2);
        var limiterPlaneMatStorage = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        var limiterPlaneStorage = new THREE.Mesh( limiterPlaneGeoStorage, limiterPlaneMatStorage );
        limiterPlaneStorage.rotation.x = THREE.MathUtils.degToRad(90)
        limiterPlaneStorage.position.y = 0.11
        scene.add(limiterPlaneStorage)
        limiterPlaneStorage.visible = false
        }
        }
    /**
    * INIT DRAG SETTINGS
    */
        {
        //AÇIK KAPILARIN TAŞMA PAYI : 0.3m
        // NOT: LAYERS SET OBJECT3D'İ GÖRÜYOR MESH'İ GÖRMÜYOR.KENDİ EKLEDİĞİMİZ DRAGGER STORAGE'İN LAYER SETİNİ YAPAMADIM.AMA GLTF EKLEDİĞİMİZ OBJELERE LAYER SET 
            //UYGULANIYOR VE DRAG CONTROLLER AÇILIP KAPATILABİLİYOR.
            
        var draggerStorage = scene.getObjectByName("dragger_storage")
        draggerStorage.visible = false
        scene.getObjectByName("dragger_storage").layers.set(1)
        
        var objectsStorage = []
        objectsStorage.push(draggerStorage)
        var dragStorage = new DragControls(objectsStorage, camera, renderer.domElement)
        dragStorage.transformGroup = true
        }
    /**
    * SETUP DRAG EVENTSLISTENERS
    */
        {
            dragStorage.addEventListener( 'drag', function()
            {
                controls.enabled = false
                scene.add(helperStorage)
                helperStorage.material = new THREE.MeshBasicMaterial({color: "#32CD32"})
                helperStorage.update()
             window.addEventListener( 'mousemove', onEventstorageDragMouseMove);
            })
            dragStorage.addEventListener( 'dragend', function()
            {
                controls.enabled = true
                scene.remove(helperStorage)
              window.removeEventListener( 'mousemove', onEventstorageDragMouseMove);
            })
    
            function onEventstorageDragMouseMove(event) //CHECK INTERSECTIONS THEN DRAG
            {   
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            intersect = raycaster.intersectObject(limiterPlaneStorage)
    
            if(intersect.length>0)
            {
            // console.log("intersection true")
                
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                    draggerStorage.position.set(a,0.11,c)
                    storage.position.set(a,3.11,c)
                } 
            }
            else  //EĞER KESİŞME YOKSA...STANDIN SINIRLARININ DIŞINDAKİ İMLEÇ HAREKETLERİNİ ENVFLOOR İLE YENİ KESİŞİM BELİRLEYEREK YAPIYORUZ.  
            {
                intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                for ( var i = 0; i < intersect.length; i ++ )
                {
                    var a = intersect[ i ].point.x 
                    var c = intersect[ i ].point.z  
                        
                    if (Math.abs(a)<= dimWidthStandBase/2-dimWidthStorage/2)
                    {
                        if(c<0){storage.position.x=a}
                        else if(c>0){storage.position.x=a}
                    }
    
                    if (Math.abs(c)<= dimDepthStandBase/2-dimDepthStorage/2)
                    {
                        if(a<0){storage.position.z=c}
                        else if(a>0){storage.position.z=c}
                    }
                                    
                }
                
            } 
            
        }
            
        }
    /**
    * SET STORAGE LAYERS TO "1"
    */
        {
            
       
        }
    /**
    * SET STORAGE LAYERS TO VISIBLE FALSE
    */   
        {
            scene.getObjectByName( "storage_1" ).visible = false;
            scene.getObjectByName( "storage_2" ).visible = false;
            scene.getObjectByName( "storage_3" ).visible = false;
            scene.getObjectByName( "storage_4" ).visible = false;
            scene.getObjectByName( "storage_5" ).visible = false;
        }
    
    /**
    * SET CONTROLLERS VISIBLE FALSE
    */
        {
                
            scene.getObjectByName( "drag_right_storage" ).visible = false;
            scene.getObjectByName( "drag_front_door_storage" ).visible = false;
            
        }
    }

    
    
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
    
    {//DEFAULTS
        var mouse = new THREE.Vector2();
        var raycaster = new THREE.Raycaster(); 
        var intersect = new THREE.Vector3();
        var people = scene.getObjectByName("people0")
       // var draggerPeople = scene.getObjectByName("dragger_people")
        var envFloor = scene.getObjectByName( "environment_floor")
        var standBase = scene.getObjectByName( "stand_1" )
        var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
        var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
        var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)
        var helperPeople = new THREE.BoxHelper( people, 0xffff00 );
        helperPeople.material = new THREE.MeshBasicMaterial({color: "#00FFFF"})
        var dimPeople = new THREE.Box3().setFromObject(people);  //BoxGeometry(width , height , depth)
        var dimWidthPeople = Math.abs(dimPeople.max.x)+Math.abs(dimPeople.min.x)
        var dimDepthPeople = Math.abs(dimPeople.max.x)+Math.abs(dimPeople.min.x)

        var limiterPlaneGeo = new THREE.PlaneGeometry(dimWidthStandBase - dimWidthPeople , dimDepthStandBase - dimDepthPeople );
        var limiterPlaneMat = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        var limiterPlane = new THREE.Mesh( limiterPlaneGeo, limiterPlaneMat );

        limiterPlane.rotation.x = THREE.MathUtils.degToRad(90)
        limiterPlane.position.y = 0.11
        limiterPlane.visible = false
    }
   
/**
* ADD PEOPLE
*/
var amount=0
var clonedPeople=[]
var clonedDraggerPeople=[]
var clonedHelperPeople=[]

document.getElementById("people0_icon").onclick = ()=>
{
    addPeople()
    function addPeople() 
    {   
        scene.add(helperPeople)
        scene.add(limiterPlane)
        window.addEventListener( 'mousemove', onMouseMovePeople)
    }
    
        function onMouseMovePeople(event) //FOLLOW CURSOR
        {
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                
                intersect = raycaster.intersectObject(limiterPlane)
                controls.enabled = false; 
                people.visible = true
                helperPeople.update()

                if(intersect.length>0)
                {
                    console.log("intersection true")
                  
                    for ( var i = 0; i < intersect.length; i ++ )
                    {
                        var a = intersect[ i ].point.x 
                        var c = intersect[ i ].point.z  
                        people.position.set(a,1,c)
                    } 
                }
                else        
                {
                    intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                    for ( var i = 0; i < intersect.length; i ++ )
                    {
                        var a = intersect[ i ].point.x 
                        var c = intersect[ i ].point.z  
                                                  
                        if (Math.abs(a)<= dimWidthStandBase/2-dimWidthPeople/2)
                        {
                            if(c<0){people.position.x=a}
                            else if(c>0){people.position.x=a}
                        }
    
                        if (Math.abs(c)<= dimDepthStandBase/2-dimDepthPeople/2)
                        {
                            if(a<0){people.position.z=c }
                            else if(a>0){people.position.z=c}
                        }
                                      
                    }
                    
                } 
               
        
                window.addEventListener( 'click', function()   //FIRST DROP
                {
                    window.removeEventListener('mousemove', onMouseMovePeople)
                    scene.remove(helperPeople)
                    controls.enabled = true;
                    
                })
            
        }
    }
}


/*
 ####### ##   ## ######  ##   ##  # ##### ######   
  ##   # ##   ##  ##  ## ###  ## ## ## ##  ##  ##  
  ##     ##   ##  ##  ## #### ##    ##     ##  ##  
  ####   ##   ##  #####  #######    ##     #####   
  ##     ##   ##  ## ##  ## ####    ##     ## ##   
  ##     ##   ##  ## ##  ##  ###    ##     ## ##   
 ####     #####  #### ## ##   ##   ####   #### ##  
                                                                            
*/




 //  setTimeout(loadFurnitures, 5000)      
 function loadFurnitures() 
 {
     var mouse = new THREE.Vector2();
     var raycaster = new THREE.Raycaster(); 
     var intersect = new THREE.Vector3();
     var standBase = scene.getObjectByName( "stand_1" )
     var envFloor = scene.getObjectByName( "environment_floor")
     var dimStandBase = new THREE.Box3().setFromObject(standBase);  //BoxGeometry(width , height , depth)
     var dimWidthStandBase = Math.abs(dimStandBase.max.x)+Math.abs(dimStandBase.min.x)
     var dimDepthStandBase = Math.abs(dimStandBase.max.z)+Math.abs(dimStandBase.min.z)

     var barStool = scene.getObjectByName( "bar_stool")
     var helperBarStool = new THREE.BoxHelper( barStool, 0xffff00 );
     
 
     var bboxHelper = new THREE.Box3().setFromObject(helperBarStool);
     var bboxWidthHelper = Math.abs(bboxHelper.max.x)+Math.abs(bboxHelper.min.x)
     var bboxDepthHelper = Math.abs(bboxHelper.max.z)+Math.abs(bboxHelper.min.z)
     var bboxHeightHelper = Math.abs(bboxHelper.max.y)+Math.abs(bboxHelper.min.y)
 

     var draggerBarStool = new THREE.Mesh( new THREE.BoxGeometry(bboxWidthHelper , bboxHeightHelper , bboxDepthHelper), new THREE.MeshBasicMaterial( {color: 0x00ff00} ))    //DRAG EDİLEBİLİR GÖRÜNMEZ BİR OBJE YAPIYORUZ VE BU OBJENİN HELPER BOYUTUNDA OLMASI GEREKİYOR Kİ İMLEÇ ÜZERİNE GELDİĞİNDE HER YÖNDEN DRAG EDİLEBİLSİN.
     scene.add(draggerBarStool)
     
     draggerBarStool.visible = false
     draggerBarStool.position.y = bboxHeightHelper/2
     

     var limiterPlaneGeo = new THREE.PlaneGeometry(dimWidthStandBase - bboxWidthHelper , dimDepthStandBase - bboxDepthHelper );
     var limiterPlaneMat = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
     var limiterPlane = new THREE.Mesh( limiterPlaneGeo, limiterPlaneMat );
    
     limiterPlane.rotation.x = THREE.MathUtils.degToRad(90)
     limiterPlane.position.y = 0.11
     limiterPlane.visible = false

   
    container.addEventListener( 'mousedown',
    function (event) 
     {
             mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
             mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
             
             raycaster.setFromCamera(mouse, camera);
            
             intersect = raycaster.intersectObjects(allObjects)

             if(intersect.length>0)
             {
                 onClickAllObjects()
             }
     })
/**
*  ON EVENT OF CLICK OBJECT
*/
     window.addEventListener( 'mousedown',
     function (event) 
     {
         mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
         mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

         raycaster.setFromCamera(mouse, camera);
         
         intersect = raycaster.intersectObject(barStool)

         if(intersect.length>0)
         {
             onClickBarStool()
         }
     })



/**
*  INIT DRAG SETTINGS FOR BAR STOOL
*/

     var objectsBarStool = []
     objectsBarStool.push(draggerBarStool)
     var dragBarStool = new DragControls(objectsBarStool, camera, renderer.domElement)
     dragBarStool.enabled = false

/**
*  ON EVENT OF CLICK BAR STOOL ICON
*/
 
     document.getElementById("bar_stool_icon").addEventListener("click", addBarStool)
 
     function addBarStool()  //ADD BAR STOOL
     {
         
         scene.add(limiterPlane)
         
         window.addEventListener( 'mousemove', onMouseMove);
     }
 
     function onMouseMove(event) //FOLLOW CURSOR
     {
             mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
             mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
             
             raycaster.setFromCamera(mouse, camera);
             
             intersect = raycaster.intersectObject(limiterPlane)
             controls.enabled = false; 
     
        
             scene.getObjectByName( "bar_stool_1").visible = true
             scene.getObjectByName( "bar_stool_2").visible = true
             scene.add(helperBarStool)
             
             

             if(intersect.length>0)
             {
                 console.log("intersection true")
               
                 for ( var i = 0; i < intersect.length; i ++ )
                 {
                     var a = intersect[ i ].point.x 
                     var c = intersect[ i ].point.z  
                     barStool.position.set(a,0.11,c)
                     draggerBarStool.position.set(a,bboxHeightHelper/2,c)
                     helperBarStool.update()
                     
                 } 
             }
             else        
             {
                 intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
                 for ( var i = 0; i < intersect.length; i ++ )
                 {
                     var a = intersect[ i ].point.x 
                     var c = intersect[ i ].point.z  
                    // console.log("projected coordinates on 3d space x=" + a + "z=" + c)
                    helperBarStool.update()
                         
                     if (Math.abs(a)<= dimWidthStandBase/2-bboxWidthHelper/2)
                     {
                         if(c<0){barStool.position.x=a}
                         else if(c>0){barStool.position.x=a}
                     }
 
                     if (Math.abs(c)<= dimDepthStandBase/2-bboxDepthHelper/2)
                     {
                         if(a<0){barStool.position.z=c }
                         else if(a>0){barStool.position.z=c}
                     }
                                   
                 }
                 
             } 
            
     
             window.addEventListener( 'click', function()   //FIRST DROP
             {
                 window.removeEventListener('mousemove', onMouseMove)
                
                 scene.remove(helperBarStool)
                 controls.enabled = true;
                 draggerBarStool.position.set(barStool.position.x,bboxHeightHelper/2,barStool.position.z)  //STAND INTERSECTION ALANI DIŞINDA DROP YAPTIĞIMIZDA DRAGGER SPHERE (DRAG OBJE SADECE KENDİSİ OLDUĞUNDAN) DIŞARDA KALIYOR O YÜZDEN TEKRAR OBJEYİ DRAG EDEBİLMEK İÇİN BU AYARI YAPIYORUZ.
                 dragBarStool.enabled = true
             })
         
     }
    
     dragBarStool.addEventListener( 'drag', function()
     {
         barStoolFurnitureControl.style.visibility = "hidden" 

         window.addEventListener( 'mousemove', onMouseHover);
         controls.enabled = false
         scene.add(helperBarStool)
         helperBarStool.update()
         scene.add(draggerBarStool)
         
     })
 
 
     function onMouseHover(event) //CHECK INTERSECTIONS THEN DRAG
     {   
         mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
         mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
         
         raycaster.setFromCamera(mouse, camera);
         intersect = raycaster.intersectObject(limiterPlane)
 
         if(intersect.length>0)
         {
             console.log("intersection true")
           
             for ( var i = 0; i < intersect.length; i ++ )
             {
                 var a = intersect[ i ].point.x 
                 var c = intersect[ i ].point.z  
                 draggerBarStool.position.set(a,bboxHeightHelper/2,c)
                 barStool.position.set(a,0.11,c)
                 
             } 
         }
         else        
         {
             intersect = raycaster.intersectObject(envFloor) //MOUSE KOORDİNATLARININ 3D SAHNEDEKİ DEĞERLERİNİ BU ŞEKİLDE ALIYORUZ.
             for ( var i = 0; i < intersect.length; i ++ )
             {
                 var a = intersect[ i ].point.x 
                 var c = intersect[ i ].point.z  
                // console.log("projected coordinates on 3d space x=" + a + "z=" + c)

                     
                 if (Math.abs(a)<= dimWidthStandBase/2-bboxWidthHelper/2)
                 {
                     if(c<0){barStool.position.x=a}
                     else if(c>0){barStool.position.x=a}
                 }

                 if (Math.abs(c)<= dimDepthStandBase/2-bboxDepthHelper/2)
                 {
                     if(a<0){barStool.position.z=c}
                     else if(a>0){barStool.position.z=c}
                 }
                               
             }
             
         } 
        
     }
        
     var newHelperBarStool 
      /*   var helperBarStoolClones = []

             dragBarStool.addEventListener( 'hoveron', function () 
             {   
                 newHelperBarStool = helperBarStool.clone()
                 scene.add(newHelperBarStool)
                 helperBarStoolClones.push(newHelperBarStool)
                                  
             })
                dragBarStool.addEventListener( 'hoveroff', function () 
             {  
                 //scene.remove(newHelperBarStool)
                 for (var i = 0; i < helperBarStoolClones.length; i++) {
                     scene.remove(helperBarStoolClones[i]); // Remove from the scene
                 }
                 helperBarStoolClones = []; // Clear the array
                 
             }) */


/**
*  FURNITURE CONTROL ICONS
*/

     var barStoolFurnitureControl = document.getElementById("furniture_icon_group_bar_stool")
     
     dragBarStool.addEventListener( 'dragend', function () //DRAGSTARTI CLICK OLARAK KULLANDIĞINDA CLICKTEN ELİNİ KALDIRDIĞINDA DROP'U İŞLEME ALIYOR.O YÜZDEN BİR OBJENİN CLICK'INI DRAG'IN HOVERINA EVENTLISTENER OLARAK VERİYORUZ
     {
         draggerBarStool.position.set(barStool.position.x,bboxHeightHelper/2,barStool.position.z)  //STAND INTERSECTION ALANI DIŞINDA DRAGEND YAPTIĞIMIZDA DRAGGER SPHERE (DRAG OBJE SADECE KENDİSİ OLDUĞUNDAN) DIŞARDA KALIYOR O YÜZDEN TEKRAR OBJEYİ DRAG EDEBİLMEK İÇİN BU AYARI YAPIYORUZ.
         window.removeEventListener( 'mousemove', onMouseHover)
         controls.enabled = true; 
         scene.remove(helperBarStool)
         barStoolFurnitureControl.style.visibility = "hidden" 
         
         
     })


     function onClickBarStool()
     {
         //scene.remove(helperBarStool)    // HIDE ALL HELPERS
         
         console.log("clicked bar stool object")
         setTimeout(() => 
         {
         scene.add(helperBarStool)  
         barStoolFurnitureControl.style.visibility = "visible" 
         
         var tempV = barStool.getWorldPosition(new THREE.Vector3())
         tempV.project(camera)

         var x = (tempV.x *  .5 + .5) * canvas.clientWidth;
         var y = (tempV.y * -.5 + .5) * canvas.clientHeight;

         barStoolFurnitureControl.style.left = `${x}px`
         barStoolFurnitureControl.style.top = `${y}px`
         }, "200")
     }
         
     document.getElementById("rotate_icon_bar_stool").onclick = ()=>
     {
         scene.add(helperBarStool)
         barStool.rotateY(5);
         helperBarStool.update()
         //onMouseHover()

     }
     document.getElementById("trash_icon_bar_stool").onclick = ()=>
     {

         console.log("clicked trash icon bar stool")
         scene.getObjectByName( "bar_stool_1").visible = false
         scene.getObjectByName( "bar_stool_2").visible = false
         barStoolFurnitureControl.style.visibility = "hidden" 
         scene.remove(barStool)
         scene.remove(helperBarStool)
         draggerBarStool.layers.set( 1 );        
         //DISABLES DRAGLISTENERS FOR INVISIBLE OBJECTS  :   BU AYAR KENDİ BAŞINA FONKSİYON BAŞINDA TRUE FALSE GİBİ BİR DEĞER ALIYOR MU HENÜZ BULAMADIM O YÜZDEN
         //dragBarStool.enabled = false KULLANDIK FOLLOW OBJECTTEN SONRA DRAG BAŞLADIĞI ANDA İSE dragBarStool.enabled = true KULLANDIK ÇÜNKÜ BÖYLE YAPMAZSAK
         //BU SEFER BAR STOOL EKLENMEDİĞİ HALDE DRAG LISTENER ONU GÖRMEYE BAŞLIYOR 

     }
             
             function onClickAllObjects()
             {
                 barStoolFurnitureControl.style.visibility = "hidden" 
                 peopleFurnitureControl.style.visibility = "hidden" 
         
                 scene.remove(currentHelperPeople)
                 console.log("clicked all objects")
                 scene.remove(helperBarStool)
             }

           
 
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

var backWall = scene.getObjectByName( "back_wall" )
var backWallGraphicControl = document.getElementById("graphics_control_icon_group_back_wall")       
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
    var x = (tempV.x *  .5 + .5) * canvas.clientWidth;
    var y = (tempV.y * -.5 + .5) * canvas.clientHeight;
    
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
    texture = new THREE.TextureLoader().load( "./media/carpet0_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
    
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })

    // Carpet 1

    document.getElementById("carpet1_icon").addEventListener("click", function()
    {
    texture = new THREE.TextureLoader().load( "./media/carpet1_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "stand_1" ).material.map = texture
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })

    // Parquet 1

    document.getElementById("parquet0_icon").addEventListener("click", function()
    {
    texture = new THREE.TextureLoader().load( "./media/parquet0_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "stand_1" ).material.map = texture
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    })

    
    // Parquet 2

    document.getElementById("parquet1_icon").addEventListener("click", function()
    {
    texture = new THREE.TextureLoader().load( "./media/parquet1_icon.jpg" );
    scene.getObjectByName( "stand_1" ).material = new THREE.MeshBasicMaterial({map :  texture})
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.getObjectByName( "stand_1" ).material.map = texture
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

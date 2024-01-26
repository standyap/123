/**
 * BURAYA TÜM LIMITERLARI EKLEYİP
 * LIMITERLARI BİR FONKSİYON HALİNDE DRAG MENÜYE TEK SATIRDA KOYMAYI DENEYELİM.
 * ÖRNEK:
 *  else if (dragFront.position.z >= 0.75 && dragFront.position.z < 1.25)
            {
                limiterFurnituresAll()
            } 
 */

var limiterPeople = scene.getObjectByName( "limiter_people" )
if (dragFront.position.z < 0.25)
{
    limiterPeople.scale.set(getScaleLeft, 1, 1)
    limiterDoubleSofa.scale.set(getScaleLeft, 1, 1)
    limiterSingleSofa.scale.set(getScaleLeft, 1, 1)
    limiterBarStool.scale.set(getScaleLeft, 1, 1)
    limiterBrochureRack.scale.set(getScaleLeft, 1, 1)
    limiterBistroTable.scale.set(getScaleLeft, 1, 1)
    limiterCoffeeTable.scale.set(getScaleLeft, 1, 1)
    limiterChair.scale.set(getScaleLeft, 1, 1)
} 
else if (dragFront.position.z >= 0.25 && dragFront.position.z < 0.75)
{
    limiterPeople.scale.set(getScaleLeft, 1, 1.25)
}
else if (dragFront.position.z >= 0.75 && dragFront.position.z < 1.25)
{
    limiterPeople.scale.set(getScaleLeft, 1, 1.5)
} 
else if (dragFront.position.z >= 1.25 && dragFront.position.z < 1.75)
{
    limiterPeople.scale.set(getScaleLeft, 1, 1.75)
} 
else if (dragFront.position.z >= 1.75 && dragFront.position.z < 2.25)
{
    limiterPeople.scale.set(getScaleLeft, 1, 2)
} 
else if (dragFront.position.z >= 2.25 && dragFront.position.z < 2.75)
{
    limiterPeople.scale.set(getScaleLeft, 1, 2.25)
}
else if (dragFront.position.z >= 2.75)
{
    limiterPeople.scale.set(getScaleLeft, 1, 2.5)
}  

/**
 * DRAG RIGHT
 */



if (dragRight.position.x < 0.25)
{
    limiterPeople.scale.set(1, 1, getScaleFront)
    limiterDoubleSofa.scale.set(1, 1, getScaleFront)
    limiterSingleSofa.scale.set(1, 1, getScaleFront)
    limiterBarStool.scale.set(1, 1, getScaleFront)
    limiterBrochureRack.scale.set(1, 1, getScaleFront)
    limiterBistroTable.scale.set(1, 1, getScaleFront)
    limiterCoffeeTable.scale.set(1, 1, getScaleFront)
    limiterChair.scale.set(1, 1, getScaleFront)
} 
else if (dragRight.position.x >= 0.25 && dragRight.position.x < 0.75)
{
    limiterPeople.scale.set(1.25, 1, getScaleFront)
}
else if (dragRight.position.x >= 0.75 && dragRight.position.x < 1.25)
{
    limiterPeople.scale.set(1.5, 1, getScaleFront)
}
else if (dragRight.position.x >= 1.25 && dragRight.position.x < 1.75)
{
    limiterPeople.scale.set(1.75, 1, getScaleFront)
} 
else if (dragRight.position.x >= 1.75 && dragRight.position.x < 2.25)
{
    limiterPeople.scale.set(2, 1, getScaleFront)
}
else if (dragRight.position.x >= 2.25 && dragRight.position.x < 2.75)
{
    limiterPeople.scale.set(2.25, 1, getScaleFront)
}
else if (dragRight.position.x >= 2.75)
{
    limiterPeople.scale.set(2.5, 1, getScaleFront)
}  

/**
 * DRAG LEFT
 */


if (dragLeft.position.x > -0.25)
{
  
    limiterPeople.scale.set(1, 1, getScaleFront)
    limiterDoubleSofa.scale.set(1, 1, getScaleFront)
    limiterSingleSofa.scale.set(1, 1, getScaleFront)
    limiterBarStool.scale.set(1, 1, getScaleFront)
    limiterBrochureRack.scale.set(1, 1, getScaleFront)
    limiterBistroTable.scale.set(1, 1, getScaleFront)
    limiterCoffeeTable.scale.set(1, 1, getScaleFront)
    limiterChair.scale.set(1, 1, getScaleFront)
   
} 
else if (dragLeft.position.x <= -0.25 && dragLeft.position.x > -0.75)
{
    limiterPeople.scale.set(1.25, 1, getScaleFront)
}
else if (dragLeft.position.x <= -0.75 && dragLeft.position.x > -1.25)
{
    limiterPeople.scale.set(1.5, 1, getScaleFront)
} 
else if (dragLeft.position.x <= -1.25 && dragLeft.position.x > -1.75)
{
    limiterPeople.scale.set(1.75, 1, getScaleFront)
} 
else if (dragLeft.position.x <= -1.75 && dragLeft.position.x > -2.25)
{
    limiterPeople.scale.set(2, 1, getScaleFront)
} 
else if (dragLeft.position.x <= -2.25 && dragLeft.position.x > -2.75)
{
    limiterPeople.scale.set(2.25, 1, getScaleFront)
} 
else if (dragLeft.position.x <= -2.75)
{
    limiterPeople.scale.set(2.5, 1, getScaleFront)
} 

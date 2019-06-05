document.getElementById("info-object").style.display = "none";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = window.innerWidth;
const HEIGHT = window.outerHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;
//faz o desenho do triângulo

var objects = []; //lista de objetos
var objectSelected = null;
var flag=0;
function drawCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    drawAxis();
}

function drawAxis() {
    ctx.strokeStyle = "#f3c1c6";
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.setLineDash([1, 1]);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);


}

window.addEventListener("load", drawCanvas);

function pushBox() {
    var obj = new Box();
    objects.push(obj);
    objectSelected = objects[objects.length - 1];
    updateDisplay(objectSelected);
    document.getElementById("info-object").style.display = "block";
    drawCanvas();

}

function pushCircle(){
    var obj = new Circle();
    objects.push(obj);
    objectSelected = objects[objects.length - 1];
    updateDisplay(objectSelected);
    document.getElementById("info-object").style.display = "block";
    drawCanvas();

}

function updateDisplay(objectSelected) {
    document.getElementById("posx").value = objectSelected.getTranslate()[0];
    document.getElementById("posy").value = objectSelected.getTranslate()[1];
}

function updatePosition() {
    if (objectSelected != null) {
        try {
            posx = parseFloat(document.getElementById("posx").value);
            posy = parseFloat(document.getElementById("posy").value);
            objectSelected.setTranslate(posx, posy);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}
function updateRotate() {
    if (objectSelected != null) {
        try {
            var posx = parseFloat(document.getElementById("theta").value);
            objectSelected.setRotate(posx);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}
function updateScale() {
    if (objectSelected != null) {
        try {
            var posx = parseFloat(document.getElementById("x").value);
            var posy = parseFloat(document.getElementById("y").value);
            objectSelected.setScale(posx, posy);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}


function updateFill() {
    if (objectSelected != null) {
        try {
            var posx = document.getElementById("fill").value;
            
            objectSelected.setFill(posx);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}
function updateStroke() {
    if (objectSelected != null) {
        try {
            var posx = document.getElementById("stroke").value;
            
            objectSelected.setStroke(posx);
            drawCanvas();
        } catch (error) {
            alert(error);
        }
    }
}

function onClickMouse(event){
    
    var x = event.offsetX - canvas.offsetLeft;
    var y = event.offsetY - canvas.offsetTop;

    var newc = multVec(transformUsual(WIDTH,HEIGHT),[x,y,1]);
    //console.log("WIDTH: "+WIDTH+" HEIGHT: "+HEIGHT+" X: "+x+" Y: "+y);
    objectSelected=null;
    console.log("X_Usual: "+newc[0]+" Y_Usual: "+newc[1]);
    for(var i=0; i<objects.length;i++){
        if(objects[i].tryIntersection(newc)){
            console.log("Houve inserção!");
            objectSelected = objects[i];
        }else{console.log("Não houve interseção!");}
    }



}
function overClick(event){
    flag =0;
}
function setToMoveObject(){
    flag =1;
}

document.addEventListener("dblclick",setToMoveObject);
document.addEventListener("mousemove",moveObject);
document.addEventListener("click",overClick);

function moveObject(event){
    console.log("oioioioi");
    if(flag==1){
        if(objectSelected!=null){
            let x = event.offsetX;
            let y = event.offsetY;
            console.log("aloaloalo");
             console.log("X: "+x+" Y: "+y);
            M = transformUsual(WIDTH,HEIGHT);

            pos = multVec(M,[x,y,1]);
            objectSelected.setTranslate(pos[0],pos[1]);
            drawCanvas();

        }
   }
}

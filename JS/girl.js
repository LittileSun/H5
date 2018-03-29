/**
 * Created by LeiFeng on 2018/3/9.
 */
var can;
var ctx;
var width;
var height;
var girlPic = new Image();
var starPic = new Image();
var num = 80;
var stars = [];
var lastTime;   //上一次刷新的事件
var deltaTime;  //时间差
var switchy = false;
var life = 0;
function init(){
    can = document.getElementById("canvas");
    ctx = can.getContext('2d');
    width = can.width;
    height = can.height;

    document.addEventListener("mousemove",mousemove,false);   //添加鼠标移动的事件监听
    girlPic.src = "../Image/girl.jpg";
    starPic.src = "../Image/starmin.jpg" ;

    for(var i = 0; i < num; i++){
        var obj = new starObj();
        stars.push(obj);
        stars[i].init();
    }

    lastTime = Date.now();   //获取上一帧时间
    gameloop();
}
document.body.onload = init;

//主循环
function gameloop(){
    window.requestAnimationFrame(gameloop);   //循环

    var now = Date.now();
    deltaTime = now - lastTime;   //时间间隔
    lastTime = now;

    drawBackground();             //绘制背景
    drawGirl();
    drawStar();
    aliveUpdate();
}

function drawBackground(){
    ctx.fillStyle = "#393550";
    ctx.fillRect(0,0,width,height);
}

function drawGirl(){
    //drawImage(img,x,y,width,height)
    //canvas x轴正方向向右，y轴正方向向下
    ctx.drawImage(girlPic,100,150,600,300);
}

//鼠标监听事件
function mousemove(e){
    if(e.offsetX || e.layerX){   //鼠标发生了移动
        var px = e.offsetX == undefined ? e.layerX : e.offsetX;  //存在则赋值给px不存在则等于layerX
        var py = e.offsetY == undefined ? e.layerY : e.offsetY;

        //px在范围内并且py也在
        if(px > 100 && px < 700 && py >150 && py<450){
            switchy = true;
        }else{
            switchy = false;
        }
    }
}
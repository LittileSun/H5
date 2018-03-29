/**
 * Created by LeiFeng on 2018/3/13.
 */

//多边形画法可依据圆和坐标来画
window.onload = function() {
    var canvas = document.getElementById("canvas");
    // canvas.width = window.width;
    // canvas.height = window.height;
    canvas.width = 1450;
    canvas.height = 600;
    var context = canvas.getContext("2d");

    //绘制背景
 //   var linearGrad = context.createLinearGradient(0,0,0,canvas.height);
    var syStyle = context.createRadialGradient(canvas.width / 2,canvas.height,0,
        canvas.width / 2,canvas.height,canvas.height);    //createRadialGradient(x0,y0,r0,x1,y1,r1) 第一个圆到第二个圆
    syStyle.addColorStop(0.0,"#035")  ;  //起点
    syStyle.addColorStop(1.0,"black");  //终点
    context.fillStyle = syStyle;
    context.fillRect(0,0,canvas.width,canvas.height);   //填充画布

    for(var i = 0; i < 200; i++) {
        var r = Math.random() * 3 + 3;   //半径为3到6
        var x = Math.random() * canvas.width;  //x,y轴偏移量
        var y = Math.random() * canvas.height * 0.65;      //出现天和地的效果 下边35%将不会出现星星
        var a = Math.random() * 360;   //设置旋转0~360度
        drawStar(context, x, y, r, r/2, a);
    }
    fillMoon(context,2,1100,100,60,15);
    drawLand(context);
    drawPeople(context);
}

function drawLand(cxt){
       cxt.save();
       cxt.beginPath();

       cxt.moveTo(0,500);
       cxt.bezierCurveTo(500,350,600,550,1350,600);  //三次贝塞尔曲线
       cxt.lineTo(1200,800);
       cxt.lineTo(0,800);

       cxt.closePath();

       //绘制渐变色效果
       var landStyle = cxt.createLinearGradient(0,800,0,0);
       landStyle.addColorStop(0.0,"#030");
       landStyle.addColorStop(1.0,"#580");
       cxt.fillStyle = landStyle;
       cxt.fill();
       cxt.restore();
}

function drawStar(cxt,x,y,R,rot) { //x,y为位置偏移量rot为旋转角度
       cxt.save();
       cxt.translate(x,y);     //位移translate(x,y)
       cxt.rotate(rot / 180 * Math.PI);   //旋转rotate(deg)
       cxt.scale(R,R);                    //缩放scale(sx,sy)
       starPath(cxt);
        //绘制出在(x,y)大小r旋转角度rot
       cxt.fillStyle = "#fff";
       cxt.fill();
       cxt.restore();
    }

    function starPath(cxt){
        cxt.beginPath();
        //指定五角星的十个点
        for (var i = 0; i < 5; i++) { //先指定大圆上的点
            cxt.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI),  //x的坐标 把角度转换成弧度
                -Math.sin((18 + i * 72) / 180 * Math.PI));                //y轴坐标向上为负

            //指定小圆上的点
            cxt.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5,    //第一个点对应54度
                -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5);
    }
        cxt.closePath();
}

//绘制月亮
function fillMoon(cxt,d,x,y,R,rot,fillColor){  //d为控制点的横坐标的值xy表月亮的位置
        cxt.save();
        cxt.translate(x,y);
        cxt.rotate(rot * Math.PI / 180);
        cxt.scale(R,R);
        pathMoon(cxt,d);
        cxt.fillStyle = fillColor || "#fff";
        cxt.fill();
        cxt.restore();
}

//绘制月亮轮廓
function pathMoon(cxt,d){
    cxt.beginPath();
    cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
    cxt.moveTo(0,-1);   //当前点移到(0,-1) 开始点
    cxt.arcTo(d,0,0,1,dis(0,-1,d,0) / d);   //artTo(x1,y1,x2,y2,r)控制点(d,0)内弧结束点(0，1)dis为半径
    cxt.closePath();
}

function dis(x1,y1,x2,y2){
    return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));
}

function drawPeople(cxt) {
    cxt.save();
    cxt.beginPath();
    cxt.arc(350,410,8,0,2*Math.PI,false);
    cxt.moveTo(355,423);       //右边
    cxt.lineTo(365,435);
    cxt.moveTo(355,435);
    cxt.lineTo(370,447);

    cxt.moveTo(350,423);      //左边
    cxt.lineTo(340,435);
    cxt.moveTo(350,435);
    cxt.lineTo(335,447);

    cxt.arc(380,410,8,0,2*Math.PI,true);
    cxt.moveTo(385,423);       //右边
    cxt.lineTo(395,435);
    cxt.moveTo(385,435);
    cxt.lineTo(400,447);

    cxt.moveTo(380,423);      //左边
    cxt.lineTo(370,435);
    cxt.moveTo(380,435);
    cxt.lineTo(365,447);
    cxt.closePath();
    cxt.restore();

    cxt.lineWidth = 2;
    cxt.strokeWidth = 5;
    cxt.strokeStyle = "#ccc ";
    cxt.fillStyle = "#000";
    cxt.stroke();
    cxt.fill();


    cxt.restore();
}
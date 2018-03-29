/**
 * Created by LeiFeng on 2018/3/17.
 */

var balls = [];
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

window.onload = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for(var i = 0; i < 60; i++){
        var radius = Math.random() * 30 + 20;
       // context.globalAlpha = 0.7;
        var aBall = {
            radius:radius,
            x:Math.random() * (canvas.width - 2 * radius) + radius,
            y:Math.random() * (canvas.height - 2 * radius) + radius,
            vx:(Math.random() * 5 + 5) * Math.pow(-1,Math.floor(Math.random() * 100)),
            vy:(Math.random() * 5 + 5) * Math.pow(-1,Math.floor(Math.random() * 100))
        };
        balls[i] = aBall;
    }

    draw();
//    动画效果
    // setInterval(function () {
    //     drawCircl(context);
    // },
    // 50
    // );
}

//画圆
function draw(){
    //绘制背景颜色
    context.fillStyle = "#55AA00";
    context.save();   //保存颜色
    context.beginPath();
    context.fillRect(0,0,canvas.width,canvas.height);
    context.restore();

   // context.clearRect(0,0,canvas.width,canvas.height);  //清空画布

    for(var i = 0; i < balls.length; i++){console.log(balls.length);
        context.beginPath();
        context.arc(balls[i].x,balls[i].y,balls[i].radius,0,2*Math.PI,false);
        context.fillStyle = "#fff";
        context.closePath();
        context.fill();

    }
}

function update(canvasWidth,canvasHeight){
    for(var i = 0; i < balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;

    }
}
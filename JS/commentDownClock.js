/**
 * Created by LeiFeng on 2018/3/10.
 */

var WINDOW_WIDTH = 1024;   //方便屏幕自适应
var WINDOW_HEIGHT = 668;
var RADIUS =  8;     //半径
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2018,2,13,17,27,52);  //定义截止时间
var curShowTimeSeconds = 0;   //定义中间差毫秒

var balls = [];   //存储生成的小球
const colors = ["#33B5E5","#DC143C","#FFFF00","#9ACD32","#9370DB","#4169E1","#FF4500","#FF1493","#F0E68C","#FF1493"];
window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    //封装毫秒
    curShowTimeSeconds = getCurShowTimeSeconds();

    //制作动画效果
    setInterval(function(){
       render(context);
       update();
    },
    50
    );
}

function getCurShowTimeSeconds(){
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime(); //毫秒的时间差
    ret = Math.round(ret/1000);  //返回秒数

    return ret >= 0 ? ret : 0;
}

//判断时间变化
function update(){
    var nextShowTimeSeconds = getCurShowTimeSeconds();   //获取当前秒数 进行分解
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);  //前一秒的改变
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    //判断时间是否改变 根据时间的改变生成一系列的小球
    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        if(parseInt(curSeconds/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    //对已存在的状态进行更新小球
    updateBall();
}

function updateBall(){
    for(var i = 0;i < balls.length;i++){
        balls[i].x += balls[i].vx;   //对坐标轴进行变化
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;   //众坐标受重力加速度影响

        if(balls[i].y >= WINDOW_HEIGHT - RADIUS){   //判断是否着地
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = - balls[i].vy * 0.75;
        }

    }
}

function addBalls(x,y,num){
    for(var i = 0;i < digit[num].length;i++){
        for(var j = 0;j < digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                var aBall = {    //创建类对象 类对象用逗号而不是分号
                    x:x + j*2*(RADIUS+1) + (RADIUS + 1),   //radius为小球半径 radius+1为正方形半径 1px间隔小球
                    y:y + i*2*(RADIUS+1) + (RADIUS + 1),
                    g:1.5 + Math.random(),   //重力加速度
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,  //pow()次方 ceil()取整 x轴方向为负或正
                    vy:-5,  //有向上抛的趋势
                    color:colors[Math.floor(Math.random()*colors.length)]  //随机取整
                }
                balls.push(aBall);   //可向数组的末尾添加一个或多个元素,并返回新的长度
            }
        }
    }
}
//绘制画布
function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);  //对当前矩形进行刷新 以防覆盖

    var hours = parseInt(curShowTimeSeconds / 3600);         //获取当前时间
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    //  一个字符串2px
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);                     //获取每一位数字，此处获取十位
    renderDigit(MARGIN_LEFT + 15*(RADIUS + 1),MARGIN_TOP,parseInt(hours%10),cxt);   //获取个位数 一数字有2*14px,1px为间隔
    renderDigit(MARGIN_LEFT + 30*(RADIUS + 1),MARGIN_TOP,10,cxt);                   //10表示冒号的位置
    renderDigit(MARGIN_LEFT + 39*(RADIUS + 1),MARGIN_TOP,parseInt(minutes/10),cxt); //分钟的十位 冒号占2*4像素
    renderDigit(MARGIN_LEFT + 54*(RADIUS + 1),MARGIN_TOP,parseInt(minutes%10),cxt); //分钟的个位
    renderDigit(MARGIN_LEFT + 69*(RADIUS + 1),MARGIN_TOP,10,cxt);                   //冒号
    renderDigit(MARGIN_LEFT + 78*(RADIUS + 1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT + 93*(RADIUS + 1),MARGIN_TOP,parseInt(seconds%10),cxt);

    //最后一步在render中对小球进行渲染
    for(var i = 0; i < balls.length; i++){
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x,y,num,cxt){
    cxt.fillStyle = "rgb(0,102,153)";
    //遍历二维点阵
    for(var i = 0;i < digit[num].length;i++){
        for(var j = 0;j < digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc(x + j*2*(RADIUS+1) + (RADIUS+1),y + i*2*(RADIUS+1) + (RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();

                cxt.fill();  //填充小球
            }
        }
    }
}


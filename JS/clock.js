/**
 * Created by LeiFeng on 2018/3/8.
 */

var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');  //getContext() 方法返回一个用于在画布上绘图的环境,该对象导出一个二维绘图 API
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;        //定义比例

//画圆
function drawBackground(){
    ctx.save();
    ctx.translate(r,r);  //translate() 方法为画布的变换矩阵添加水平的和垂直的偏移
    ctx.beginPath();     //beginPath() 丢弃任何当前定义的路径并且开始一条新的路径。它把当前的点设置为 (0,0)
    ctx.lineWidth = 10 * rem;        //外圆相应变大
    ctx.arc(0,0,r - ctx.lineWidth / 2,2*Math.PI,false);  //原点半径起始角结束角顺时针 arc() 方法创建弧/曲线（用于创建圆或部分圆）
    ctx.stroke();          //绘制一条路径

    var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];   //创建数组存储当前时钟数字3为起始点
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';       //左右对齐
    ctx.textBaseline = 'middle';   //上下对其
    hourNumbers.forEach(function(number,i){
        var rad = 2*Math.PI / 12*i;     //定义弧度
        var x = Math.cos(rad) * (r-30 * rem);   //每个点的位置所在
        var y = Math.sin(rad) * (r-30 * rem);
        ctx.fillText(number,x,y);  //把数字填充进画布
    });

    //画点
    for(var i = 0;i < 60;i++){
        var rad = 2*Math.PI /60 * i;
        var x = Math.cos(rad) * (r - 18  * rem);
        var y = Math.sin(rad) * (r - 18  * rem);
        ctx.beginPath();
        if(i%5 === 0){         //小时点则为黑色
            ctx.fillStyle = '#000';
            ctx.arc(x,y,2 * rem,0,2*Math.PI,false);
        }else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

//画时针
function drawHour(hour,minute){
    ctx.save();  //保存当前环境的状态
    ctx.beginPath();
    var rad = 2*Math.PI / 12 * hour;
    var mrad = 2*Math.PI / 12 / 60 * minute;
    ctx.rotate(rad + mrad);   //旋转
    ctx.lineWidth = 6 * rem;
    ctx.lineCap = 'round';  //指定线段的末端为圆
    ctx.moveTo(0,10 * rem);      //把窗口的左上角移动到一个指定的坐标
    ctx.lineTo(0,-r / 2);   //从当前位置到指定的点
    ctx.stroke();
    ctx.restore();         //返回之前保存的路径状态和属性
}

//画分针
function drawMinute(minute){
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0,-r + 30 * rem);
    ctx.stroke();
    ctx.restore();
}

//画秒针
function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    var rad = 2*Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem,20 * rem);
    ctx.lineTo(2 * rem,20 * rem);
    ctx.lineTo(1,-r + 18 * rem);
    ctx.lineTo(-1,-r + 18 * rem);
    ctx.fill();       //填充
    ctx.restore();
}

function drawDot(){
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
    ctx.fill();
}

function draw(){
    ctx.clearRect(0,0,width,height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
draw();
setInterval(draw,1000);   //每秒绘画一次，秒钟移一
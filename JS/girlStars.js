/**
 * Created by LeiFeng on 2018/3/9.
 */
var starObj = function(){ //获取坐标
    this.x;
    this.y;
    this.picNo;
    this.time;
    this.xSpd;       //定义加速
    this.ySpd;
}

starObj.prototype.init = function(){
    this.x = Math.random() * 600 + 100;  //random()返回【0，1}
    this.y =Math.random() * 300 + 150 ;
    this.picNo = Math.floor(Math.random() * 7);
    this.time = 0;
    this.xSpd = Math.random() * 3 - 1.5;  //[-1.5,1.5)          //初始化生成随机的速度
    this.ySpd = Math.random() * 3 - 1.5;
}

starObj.prototype.update = function(){

    this.x += this.xSpd * deltaTime * 0.008;  //改变坐标
    this.y += this.ySpd * deltaTime * 0.008;
    this.time += deltaTime;   //同步
    if(this.time > 50){
        this.picNo += 1;
        this.picNo %= 7;
        this.time = 0;
    }

    //x超出范围 init初始化
    if(this.x < 100 || this.x > 700){
        init();
        return ;
    }
    //y超出范围 init
    if(this.y < 150 || this.y > 450){
        init();
        return;
    }
}

starObj.prototype.draw = function(){
    //globalAlpha 全局透明度
    //save() 属性只作用于之间 restore()
    ctx.save();
    ctx.globalAlpha = life;  //【0，1】
    //drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
    ctx.drawImage(starPic,this.picNo*8,0,8,8,this.x,this.y,8,8);
    ctx.restore();
}

//绘制多个星星
function drawStar(){
   for(var i = 0;i < num; i++){
       stars[i].update();
       stars[i].draw();
   }
}

//判断是否显示星星
function aliveUpdate(){
    if(switchy){
        //show stars
        life += 0.03 * deltaTime * 0.05;
        if(life > 1){
            life = 1;
        }
    }
    else{
        //hide stars
        life -= 0.03 * deltaTime * 0.05;
        if(life < 0){
            life = 0;
        }
    }
    // console.log(switchy) 每步都应该调试
}
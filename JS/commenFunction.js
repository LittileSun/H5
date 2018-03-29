/**
 * Created by LeiFeng on 2018/3/9.
 */
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
    || function(callback,element){
        return window.setTimeout(callback,1000 / 60);
    };
})();
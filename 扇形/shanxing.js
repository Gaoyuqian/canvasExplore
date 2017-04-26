/**
 * Created by yuqiangao on 2017/4/26.
 */


var sxArray = [];
var canvas = document.getElementById('shanxing');
var g = canvas.getContext('2d');
//添加动画效果变成粒子特效


function shanxing(x, y, radiu, color) {
    this.x = x;
    this.y = y;
    this.radius = radiu;
    this.color = color;
    this.isSelected = false;
}//定义一个扇形对象


function getCanvas(id) {
    var canvas = document.getElementById(id);
    var g = canvas.getContext('2d');
    return g;
} //获取canvas节点

function addShanXing() {
    var shan = new shanxing(randomFromTo(0,1000), randomFromTo(0,1000), randomFromTo(0,10), '#ff5700');
    sxArray.push(shan);
    drawShanXing();
}//添加扇形元素

function drawShanXing() {
    g.clearRect(0,0,1000,1000);
    for (var i = 0; i < sxArray.length; i++) {
        var shanxing = sxArray[i];
        g.beginPath();
        g.arc(shanxing.x, shanxing.y, shanxing.radius, 0, 2 * Math.PI);
        g.fillStyle = shanxing.color;
        g.strokeStyle = shanxing.color;
        g.fill();
        g.stroke();
    }
}//画出元素

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标




var defaultSelect ;//用于存放被选中的图形
var moving = false;

function clickEvent(e){
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;
    for(var i = sxArray.length - 1;i>=0;i--){
        var shanxing = sxArray[i];
        var distanceFromCenter = Math.sqrt(Math.pow(shanxing.x - clickX,2) + Math.pow(shanxing.y - clickY,2))

        if(distanceFromCenter<=shanxing.radius){//判断点击位置是否在某个圆内
            if(defaultSelect!=null){
                defaultSelect.isSelected = false;//还原上一个点击的圆的选中状态为false
            }
            defaultSelect = shanxing;
            shanxing.isSelected = true; //若在 改变对象的属性
            moving = true;
        }
    }
}

function moveEvent(e){
    if(moving){
        if(defaultSelect!=null){
            var x = e.pageX - canvas.offsetLeft;  //获取移动的坐标 根据坐标画图
            var y = e.pageY - canvas.offsetTop;


            defaultSelect.x=x;
            defaultSelect.y=y;

            drawShanXing();


        }
    }
}
function outEvent(){
    moving = false;
}

window.onload = function(){
   setInterval(addShanXing,1000);
    canvas.onmousedown = clickEvent;
    canvas.onmousemove = moveEvent;
    canvas.onmouseout = outEvent;
    canvas.onmouseup = outEvent;

}

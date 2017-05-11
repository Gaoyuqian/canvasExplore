/**
 * Created by yuqiangao on 2017/4/26.
 */


var sxArray = [];
var canvas = document.getElementById('arc');
var g = canvas.getContext('2d');
//添加动画效果变成粒子特效


function arc(x, y, radiu, color) {
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

function addarc() {
    var shan = new arc(randomFromTo(0,1000), randomFromTo(0,1000), randomFromTo(0,10), '#ff5700');
    sxArray.push(shan);
    drawarc();
}//添加扇形元素

function drawarc() {
    g.clearRect(0,0,1000,1000);
    for (var i = 0; i < sxArray.length; i++) {
        var arc = sxArray[i];
        g.beginPath();
        g.arc(arc.x, arc.y, arc.radius, 0, 2 * Math.PI);
        g.fillStyle = arc.color;
        g.strokeStyle = arc.color;
        g.fill();
        g.stroke();
    }
}//画出元素

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标




var defaultSelect ;//用于存放被选中的图形
var moving = false;

function clickEvent(e){{}
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;
    for(var i = sxArray.length - 1;i>=0;i--){
        var arc = sxArray[i];
        var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX,2) + Math.pow(arc.y - clickY,2))

        if(distanceFromCenter<=arc.radius){//判断点击位置是否在某个圆内
            if(defaultSelect!=null){
                defaultSelect.isSelected = false;//还原上一个点击的圆的选中状态为false
            }
            defaultSelect = arc;
            arc.isSelected = true; //若在 改变对象的属性
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

            drawarc();


        }
    }
}
function outEvent(){
    moving = false;
}

window.onload = function(){
   setInterval(addarc,1000);
    canvas.onmousedown = clickEvent;
    canvas.onmousemove = moveEvent;
    canvas.onmouseout = outEvent;
    canvas.onmouseup = outEvent;

}

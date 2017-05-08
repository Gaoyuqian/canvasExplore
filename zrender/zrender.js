/**
 * Created by yuqiangao on 2017/5/5.
 */
/*
 模仿zrender首页动画
 */
var canvas = document.getElementById('zrender');
var g = canvas.getContext('2d');
var body = document.getElementsByTagName('body');
//zrender动画开始
var lineArray = [];
var color = ['red', 'green', 'orange', 'gold'];
function Line(y, length, color, speed) {
    this.y = y;
    this.x = 0;
    this.length = length;
    this.color = color;
    this.speed = speed;
}
function newLine() {
    var newline = new Line(getRandom(0, canvas.height), getRandom(30, 150), color[getRandom(0, 3)], getRandom(5, 50));
    lineArray.push(newline);
    drawLine(lineArray)
}
function drawLine(arg) {
    g.clearRect(0, 0, 2000, 2000);
    for (i in arg) {
        g.beginPath();
        g.moveTo(arg[i].x - arg[i].length, arg[i].y);
        g.lineTo(arg[i].x + arg[i].speed, arg[i].y);
        g.strokeStyle = arg[i].color;
        g.stroke();
        arg[i].x += arg[i].speed;
        if (arg[i].x - arg[i].length >= canvas.width) {
            remove(arg, i);
        }
    }
}
//zrender动画结束

//公共方法部分


function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标
function remove(arg, index) {
    arg.splice(index, 1);
}


//公共方法结束



window.onload = function () {

    var time = setInterval(newLine, 30)
}


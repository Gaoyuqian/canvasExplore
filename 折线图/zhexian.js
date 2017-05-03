/**
 * Created by yuqiangao on 2017/5/2.
 */


var test = {
    O: {'x': 100, 'y': 900}, //坐标系中心
    offset: {'x': 1000, 'y': 500},//坐标系长度 随info长度而变化
    info: {'name1': [44, 177, 33, 21, 300, 11, 33, 35]},//数据存放数组 核心
}

//获取最大最小值

var canvas = document.getElementById('zhexian');
var g = canvas.getContext('2d');
var jizhi = getMax(test.info.name1) - getMin(test.info.name1);
var each = jizhi;//每单位高度表示的数值
function drawZuobiao(arg) {
    g.beginPath();
    g.moveTo(arg.O.x, arg.O.y);
    g.lineTo(arg.O.x, arg.O.y - arg.offset.y);
    g.moveTo(arg.O.x, arg.O.y);
    g.lineTo(arg.O.x + arg.offset.x, arg.O.y);
    g.strokeStyle = 'red';
    g.arc(arg.O.x, arg.O.y, 10, 0, 2 * Math.PI);
    g.fillStyle = 'red';
    g.fill();
    g.stroke();
    drawZhexian(arg);
    drawKedu();
}


function drawZhexian(arg) {
    g.beginPath();
    g.translate(arg.O.x, arg.O.y);
    for (var i in arg.info.name1) {
        g.lineTo((parseInt(i)) * 100, -arg.info.name1[(parseInt(i))]-100);
    }
    g.lineWidth = '1';
    g.strokeStyle = 'blue';
    g.stroke();
}
function drawKedu(){
    g.beginPath();
    for(var i = 100;i<=test.offset.y;i+=100){
        g.moveTo(0,-i);
        g.lineTo(-10,-i);
        g.font = '20px';
        g.fillStyle = 'black';
        g.fillText(i-100,-35,-i+5)
        console.log(i);
    }
    for(var i = 100;i<=test.offset.x;i+=100){
        g.moveTo(i,0);
        g.lineTo(i,-5);
    }
    g.lineWidth = '1';
    g.strokeStyle = 'green';
    g.stroke();
}





function drawPoint(){
    g.beginPath();

}

function getMax(arg) {
    var temp = arg[0];
    for (var i = 0; i < arg.length - 1; i++) {
        if (temp > arg[i + 1]) {
            break;
        } else {
            temp = arg[i + 1];
        }
    }
    return temp;
}

function getMin(arg) {
    var temp = arg[0];
    for (var i = 0; i < arg.length - 1; i++) {
        if (temp < arg[i + 1]) {
            break;
        } else {
            temp = arg[i + 1];
        }
    }
    return temp;
}


window.onload = function () {
    drawZuobiao(test);
    console.log(jizhi,each);
}
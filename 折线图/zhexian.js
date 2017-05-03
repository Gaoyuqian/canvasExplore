/**
 * Created by yuqiangao on 2017/5/2.
 */


var test = {
    O: {'x': 200, 'y': 900}, //坐标系中心
    offset: {'x': 1000, 'y': 500},//坐标系长度 随info长度而变化
    info: {'name1': [110, 555, 123, 543, 123, 110, 122, 654]},//数据存放数组 核心

}
var canvas = document.getElementById('zhexian');
var g = canvas.getContext('2d');
var jizhi = getMax(test.info.name1) - getMin(test.info.name1);
var each = jizhi/test.offset.y;//每单位高度表示的数值
function drawZuobiao(arg) {
    g.beginPath();
    g.moveTo(arg.O.x, arg.O.y);
    g.lineTo(arg.O.x, arg.O.y - arg.offset.y);
    g.moveTo(arg.O.x, arg.O.y);
    g.lineTo(arg.O.x + arg.offset.x, arg.O.y)
    g.strokeStyle = 'red';
    g.arc(arg.O.x, arg.O.y, 10, 0, 2 * Math.PI);
    g.fillStyle = 'red';
    g.fill();
    g.stroke();
    drawZhexian(arg);
}


function drawZhexian(arg) {
    g.beginPath();
    g.translate(arg.O.x, arg.O.y);
    for (let i in arg.info.name1) {
        g.lineTo((parseInt(i)) * 100*each, -arg.info.name1[(parseInt(i))]*each);
        console.log(arg.info.name1[(parseInt(i))]*each)
    }
    g.lineWidth = '3';
    g.strokeStyle = 'blue';
    g.stroke();
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
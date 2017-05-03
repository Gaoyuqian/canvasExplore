/**
 * Created by yuqiangao on 2017/5/2.
 */


var test = {
    O: {'x': 100, 'y': 900}, //坐标系中心
    offset: {'x': 1000, 'y': 500},//坐标系长度 随info长度而变化
    info: {'name1': [44, 133, 144, 21, 155, 11, 33, 35]},//数据存放数组 核心
}

//获取最大最小值

var canvas = document.getElementById('zhexian');
var g = canvas.getContext('2d');
var max = getMax(test.info.name1);
var min = getMin(test.info.name1);
var xuxianLength = 10;
var offset = 100
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
    drawXuxian();
    //解决获取最大值最小值问题
}

function drawXuxian() {
    g.beginPath();
    for (var i = 0; i < test.offset.x; i += 30) {
        g.moveTo(i, -max - offset);
        g.lineTo(i + 10, -max - offset);
        g.lineWidth = '1';
    }
    g.font = '20px';
    g.fillStyle = 'red'
    g.fillText(max, -35, -max - offset + 5);
    g.strokeStyle = 'black';
    g.stroke();

    g.beginPath();
    for (var i = 0; i < test.offset.x; i += 30) {
        g.moveTo(i, -min - offset);
        g.lineTo(i + 10, -min - offset);
        g.lineWidth = '1';
    }
    g.font = '20px';
    g.fillStyle = 'red'
    g.fillText(min, -35, -min - offset + 5);
    g.strokeStyle = 'black';
    g.stroke();
}


function drawZhexian(arg) {
    g.beginPath();
    g.translate(arg.O.x, arg.O.y);
    for (var i in arg.info.name1) {
        g.lineTo((parseInt(i)) * 100, -arg.info.name1[(parseInt(i))] - offset);
    }
    g.lineWidth = '1';
    g.strokeStyle = 'blue';
    g.stroke();
}
function drawKedu() {
    g.beginPath();
    for (var i = 100; i <= test.offset.y; i += 100) {
        g.moveTo(0, -i);
        g.lineTo(-10, -i);
        g.font = '20px';
        g.fillStyle = 'black';
        g.fillText(i - 100, -35, -i + 5)
    }
    for (var i = 100; i <= test.offset.x; i += 100) {
        g.moveTo(i, 0);
        g.lineTo(i, -5);
    }

    g.lineWidth = '1';
    g.strokeStyle = 'green';
    g.stroke();
}


function drawPoint() {
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
}
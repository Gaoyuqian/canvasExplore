/**
 * Created by yuqiangao on 2017/5/2.
 */

/*
*   需要找到坐标和折线的关系 适配不同环境
*   支持多个数组存放在一张图上
*
*
*
*/
var test = {
    O: {'x': 100, 'y': 900}, //坐标系中心
    offset: {'x': 700, 'y': 300},//坐标系长度
    info: {'name1': [44, 133, 144, 21, 155, 11, 33, 35]}//数据存放数组 核心
}

//获取最大最小值

var canvas = document.getElementById('zhexian');
var g = canvas.getContext('2d');
var canvas1 = document.getElementById('zhexian1');
var gg = canvas1.getContext('2d');
var max = getMax(test.info.name1);
var min = getMin(test.info.name1);
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
    g.translate(arg.O.x, arg.O.y);

    drawKedu();
    drawXuxian();
    //解决获取最大值最小值问
    drawZhexian(arg);

}

function drawXuxian() {
    g.beginPath();
    var i = 0;
    var j = 0;

    var maxTime = setInterval(function(){
        if(i<test.offset.x){
            g.moveTo(i, -max - offset);
            g.lineTo(i + 10, -max - offset);
            g.strokeStyle = 'black';
            g.stroke();
            i+=30;
        }else{
            g.fillStyle = 'red'
            g.fillText(max,i+10, -max - offset + 5);
            clearInterval(maxTime);
        }
    },700/30)


    g.beginPath();

    var minTime = setInterval(function(){
        if(j<test.offset.x){
            g.moveTo(j, -min - offset);
            g.lineTo(j + 10, -min - offset);
            g.strokeStyle = 'black';
            g.stroke();
            j+=30;
        }else{
            g.fillStyle = 'red'
            g.fillText(min, j+10, -min - offset + 5);

            clearInterval(minTime);
        }
    },700/30)
}


function drawZhexian(arg) {
    gg.beginPath();
    gg.translate(arg.O.x, arg.O.y);
    var i  =0;
    setInterval(function(){
        if(i<arg.info.name1.length){
            gg.lineTo((parseInt(i)) * 100, -arg.info.name1[(parseInt(i))] - offset);
            i++;
            gg.lineWidth = '1';
            gg.strokeStyle = 'blue';
            gg.stroke();
        }
    },70)
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
        if (temp <= arg[i]) {
            temp = arg[i];
        }
    }
    return temp;
}

function getMin(arg) {
    var temp = arg[0];
    for (var i = 0; i < arg.length - 1; i++) {
        if (temp>=arg[i] ) {
            temp = arg[i];
        }
    }
    return temp;
}


window.onload = function () {
    drawZuobiao(test);
}
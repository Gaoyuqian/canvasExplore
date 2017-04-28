/**
 * Created by yuqiangao on 2017/4/27.
 */





//画一个饼图


var bArray = [];
var colorArray = ['red', 'orange', 'yellow', 'black', 'grey', 'green']
var canvas = document.getElementById('bingA');
var g = canvas.getContext('2d');


function getBing(x, y, radius, color, value, name) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.value = value;
    this.name = name;
    this.isSelected = false;
    this.newX = 0;
    this.newY = 0;
}

//接受对象为参数

var total = 0;
var temp = 0;//负责接收上一个
function drawBing(arg) {
    var temp = 0;//负责接收上一个
    g.clearRect(0, 0, 1000, 1000);
    if (typeof arg == 'object') {
        for (let i of arg) {
            total += i.value;
            bArray.push(new getBing(200, 200, 100, colorArray[colorArray.length - 1], i.value, i.name));
            colorArray.pop();
        }
    }
    for (let i in bArray) {
        g.beginPath();
        g.arc(bArray[i].newX || bArray[i].x, bArray[i].newY || bArray[i].y, bArray[i].radius, temp * Math.PI, ((bArray[i].value / total * 2) + temp) * Math.PI, false);
        g.lineTo(bArray[i].newX || bArray[i].x, bArray[i].newY || bArray[i].y);
        g.fillStyle = bArray[i].color;
        g.fill();
        bArray[i].begin = temp * 180;
        bArray[i].end = ((bArray[i].value / total * 2) + temp) * 180;
        temp = (bArray[i].value / total * 2) + temp;
    }
}


function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标


function moveEvent(e) {
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    //判断点是否在扇形上
    for (var i in bArray) {
        //判断在哪个圆内
        var bing = bArray[i];
        if (bing.isSelected) {
            var distance = Math.sqrt(Math.pow(bing.newX - mouseX, 2) + Math.pow(bing.newY - mouseY, 2))
        } else {
            var distance = Math.sqrt(Math.pow(bing.x - mouseX, 2) + Math.pow(bing.y - mouseY, 2))
        }
        if (distance <= bing.radius) {
            var XformO = mouseX - (bing.newX || bing.x);
            var YformO = mouseY - (bing.newX || bing.y);
            var angle;
            var angleX = Math.atan(XformO / YformO) * 180 / Math.PI;
            if (YformO >= 0 && XformO >= 0 || YformO >= 0 && XformO < 0) {//第一、二象限
                angle = 90 - angleX;
            } else if (YformO <= 0 && XformO >= 0 || YformO <= 0 && XformO < 0) {//第三、四象限
                angle = 90 - angleX + 180
            }
            if (angle >= bing.begin && (angle <= bing.end)) {
                bing.isSelected = !bing.isSelected;

            } else {
                bing.isSelected = false;
            }
            if (bing.isSelected) {
                bing.newX = bing.x + 20 * Math.cos((bing.end-parseInt(bing.end - bing.begin) / 2)*Math.PI / 180);
                bing.newY = bing.y + 20 * Math.sin((bing.end-parseInt(bing.end - bing.begin) / 2)*Math.PI / 180);
            } else {
                bing.newX = 0;
                bing.newY = 0;
            }
        }
    }
    drawBing();
}


window.onload = function () {
    drawBing([{'name': '测试1', 'value': 3333}, {'name': '测试1', 'value': 5555},{'name': '测试3', 'value': 2342}, {'name': '测试3', 'value': 3212}])
    canvas.onmousedown = moveEvent;
}
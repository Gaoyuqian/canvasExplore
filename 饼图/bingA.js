/**
 * Created by yuqiangao on 2017/4/27.
 */





//画一个饼图


var bArray = [];
var lArray = [];
var colorArray = ['red', 'orange', 'blue', 'black', 'grey', 'green']
var canvas = document.getElementById('bingA');
var g = canvas.getContext('2d');
var total = 0;

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


function getLine(x, y, deg, length, color) {

    this.Bx = x;
    this.By = y;
    this.NBx = 0;
    this.NBy = 0;
    this.deg = deg;//角度
    this.length = length;//长度
    this.Ex = x + length * Math.cos(deg);
    this.Ey = y + length * Math.sin(deg);
    this.color = color;
}


function drawBing(arg,move) {
    var temp = 0;//负责接收上一个
    g.clearRect(0, 0, canvas.width, canvas.height);


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


        //drawLine
        var deg = ( bArray[i].end - parseInt(bArray[i].end - bArray[i].begin) / 2) * Math.PI / 180;
        if (lArray.length < bArray.length) {
            lArray.push(new getLine(bArray[i].x, bArray[i].y, deg, 150, bArray[i].color));
        }
        var line = lArray[i];
        g.beginPath();
        g.moveTo(line.NBx || line.Bx, line.NBy || line.By);
        g.lineTo(line.Ex, line.Ey);
        if (line.Ex > (line.NBx || line.Bx)) {//在一二象限
            g.lineTo(line.Ex + 10, line.Ey);
            g.font = '20px';
            g.fillStyle = bArray[i].color;
            g.fillText(bArray[i].name, line.Ex + 15, line.Ey + 5);

        } else if (line.Ex < (line.NBx || line.Bx)) {//在三四象限
            g.lineTo(line.Ex - 10, line.Ey);
            g.font = '20px';
            g.fillStyle = bArray[i].color;
            g.fillText(bArray[i].name, line.Ex - 10 - (bArray[i].name.length+1) * 10, line.Ey+5);

        }
        g.strokeStyle = line.color;
        g.stroke();
        //console.log(lArray);


        //判断Ex和Ey 的象限来确定是横线的加减关系，
    }

   if(move){
       canvas.onmousedown = moveEvent;
   }
}


function moveEvent(e) {
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    //判断点是否在扇形上
    for (var i in bArray) {
        //判断在哪个圆内
        var bing = bArray[i];
        var line = lArray[i];


        if (bing.isSelected) {//计算点到扇形圆心的距离
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


            if (angle >= bing.begin && (angle <= bing.end)) {//判断点击区域是否在扇形区域内
                bing.isSelected = !bing.isSelected;

            } else {
                bing.isSelected = false;
            }


            if (bing.isSelected) {//选中后重新画
                bing.newX = bing.x + 20 * Math.cos((bing.end - parseInt(bing.end - bing.begin) / 2) * Math.PI / 180);
                bing.newY = bing.y + 20 * Math.sin((bing.end - parseInt(bing.end - bing.begin) / 2) * Math.PI / 180);
                line.NBx = bing.newX;
                line.NBy = bing.newY;
            } else {
                bing.newX = 0;
                bing.newY = 0;
                line.NBx = bing.x;
                line.NBy = bing.y;
            }


        }
    }
    drawBing();
}


window.onload = function () {
    drawBing([{'name': '蚂蚁', 'value': 3333}, {'name': '饿了么', 'value': 3333}, {
        'name': '百度',
        'value': 2222
    }, {'name': '京东', 'value': 5555}, {'name': '淘宝', 'value': 2342}, {'name': '知乎', 'value': 3212}],true);
}
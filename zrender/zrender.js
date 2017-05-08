/**
 * Created by yuqiangao on 2017/5/5.
 */
/*
 模仿zrender首页动画
 */
var canvas = document.getElementById('zrender');
var g = canvas.getContext('2d');
var body = document.getElementsByTagName('body');
var canvas1 = document.getElementById('zrender1');
var gg = canvas1.getContext('2d');
//zrender动画开始
var lineArray = [];
var textArray = [];
var arcArray = [];
var color = ['red', 'green', 'orange', 'gold'];

function Line(y, length, color, speed) {
    this.y = y;
    this.x = 0;
    this.length = length;
    this.color = color;
    this.speed = speed;
}//动态的线


function CreateText(text, size, color) {
    this.size = size;
    this.color = color;
    this.text = text;
}//文字


function createArc(x, y, r, color, name) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.name = name;

}//begin圆形


function newLine() {
    var newline = new Line(getRandom(0, canvas.height), getRandom(50, 200), color[getRandom(0, 3)], getRandom(5, 50));
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
//-----end-----zrender动画结束


//添加文字开始


function newText() {
    if (textArray.length == 0) {
        var newText = new CreateText('canvas', 100, color[getRandom(0, 3)]);
        textArray.push(newText);
    }
    drawText(textArray)
}


function drawText(arg) {
    for (i in arg) {
        g.beginPath();
        g.font = arg[i].size + "px Verdana";
        g.strokeStyle = arg[i].color;
        g.strokeText(arg[i].text, (canvas.width - g.measureText(arg[i].text).width) / 2, canvas.height / 2);
        arg[i].size++;
        if (arg[i].size >= 300) {
            remove(arg, i);
            var newText = new CreateText('canvas', 100, color[getRandom(0, 3)]);
            textArray.push(newText);
        }
    }
}
//-----end-----   文字结束


//begin按钮开始

function newArc() {
    var arc = new createArc(canvas.width / 2, 4 * canvas.height / 5, 20, color[getRandom(0, 3)], 'out');
    arcArray.push(arc);

    var arc = new createArc(canvas.width / 2, 4 * canvas.height / 5, 25, color[getRandom(0, 3)], 'in');
    arcArray.push(arc);
    drawArc(arcArray);
}


function drawArc(arg) {
    gg.clearRect(0, 0, 2000, 2000);
    for (i in arg) {
        gg.beginPath();
        gg.strokeStyle = arg[i].color;
        gg.arc(arg[i].x, arg[i].y, arg[i].r, 0, 2 * Math.PI);
        gg.stroke();

    }
    gg.beginPath();
    gg.font = '10px Verdana';
    gg.fillStyle = 'gold'
    gg.fillText('begin', canvas.width / 2 - 16, 4 * canvas.height / 5 + 4)
}


function redrawArc(arg) {
    gg.clearRect(0, 0, 2000, 2000);
    for (var i = arg.length - 1; i > 0; i--) {
        gg.beginPath();
        gg.fillStyle = arg[i].color;
        gg.arc(arg[i].x, arg[i].y, arg[i].r, 0, 2 * Math.PI);
        gg.fill();
    }

    gg.beginPath();
    gg.arc(canvas.width / 2 - 10, 4 * canvas.height / 5 - 2, 5, 1.25 * Math.PI, 1.75 * Math.PI);
    gg.strokeStyle = 'black'
    gg.stroke();
    gg.beginPath();
    gg.arc(canvas.width / 2 + 10, 4 * canvas.height / 5 - 2, 5, 1.25 * Math.PI, 1.75 * Math.PI);
    gg.strokeStyle = 'black'
    gg.stroke();
    gg.beginPath();
    gg.arc(canvas.width / 2, 4 * canvas.height / 5 + 4, 10, 0.25 * Math.PI, 0.75 * Math.PI);
    gg.strokeStyle = 'black'
    gg.stroke();
}

//begin按钮结束


//鼠标事件


function mouseMoving(e) {
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;

    for (i in arcArray) {
        var arc = arcArray[i];
        var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX, 2) + Math.pow(arc.y - clickY, 2))
        if (distanceFromCenter <= arc.r) {
            if (arc.name == 'in') {
                arc.color = 'orange';
                redrawArc(arcArray);
            }
        } else {
            drawArc(arcArray);

        }
    }
}

function mouseClick(e) {
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;


    for (i in arcArray) {
        var arc = arcArray[i];
        var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX, 2) + Math.pow(arc.y - clickY, 2))
        if (distanceFromCenter <= arc.r) {
            if (arc.name == 'in') {
                g.clearRect(0, 0, 2000, 2000);
                gg.clearRect(0, 0, 2000, 2000);
                window.onmousemove = '';
                window.onclick = '';
                clearInterval(first);
            }
        }
    }
}


//end


//公共方法部分


function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标
function remove(arg, index) {
    arg.splice(index, 1);
}


//公共方法结束


window.onload = function () {
    newArc();
    first = setInterval(function () {
        newLine();
        newText();
    }, 30)


    window.onmousemove = mouseMoving;
    window.onclick = mouseClick;

}


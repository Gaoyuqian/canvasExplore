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
var canvas2 = document.getElementById('zrender2');
var ggg = canvas2.getContext('2d');
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
    this.height = height;
    this.x = x;
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
function drawChineseText(arg) {
    ggg.clearRect(0, 0, 2000, 2000);
    for (i in arg) {
        ggg.beginPath();
        ggg.font = arg[i].size + "px Verdana";
        ggg.fillStyle = arg[i].color;
        ggg.fillText(arg[i].text, arg[i].x, arg[i].height);
    }
}
//-----end-----   文字结束


//begin按钮开始

function newArc() {
    var arc = new createArc(canvas.width / 2, 4 * canvas.height / 5, 20, color[getRandom(0, 3)], 'out');
    arcArray.push(arc);

    var arc = new createArc(canvas.width / 2, 4 * canvas.height / 5, 25, color[getRandom(0, 3)], 'in');
    arcArray.push(arc);
    drawArc(arcArray, 1);
}


function drawArc(arg, key) {
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
    if (key == 1) {
        gg.fillText('begin', canvas.width / 2 - 16, 4 * canvas.height / 5 + 4)
    } else {
        gg.fillText('next', canvas.width / 2 - 13, 4 * canvas.height / 5 + 4)
    }
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

//  ---------第一页end---------


//  ---------第二页start----------

var secondText = 'canvas和svg都是HTML5推荐使用的图形技术，Canvas基于像素，提供2D绘制函数，是一种HTML元' +
    '素类型，依赖于HTML，只能通过脚本绘制图形；SVG为矢量，提供一系列图' +
    '形元素（Rect, Path, Circle, Line …),还有完整的动画，事件机制，本身就能独立使用，也可以嵌入到HTML中。' +
    'Canvas提供的功能更原始，适合像素处理，动态渲染和大数据量绘制，' +
    'SVG功能更完善，适合静态图片展示，高保真文档查看和打印的应用场景';

var thirdText = 'canvas通过对相应的dom添加事件绑定，在相应的条件下进行正确高效的canvas重绘，来实现canvas的动画效果';
var count1 = 0;
var count2 = 0;
var height = 50;
var x = 30;
function newTextSecond() {
    var text = new CreateText(secondText.substring(count1, count1 + 1), 30, 'red');
    count1++;
    count2++;
    textArray.push(text);
    x += 30;
    if ((count2 + 1) * 30 > canvas.width - 30) {
        height += 30;
        count2 = 0;
        x = 30;
    }
    drawChineseText(textArray);
    if (count1 > secondText.length) {
        drawArc(arcArray, 2)
        clearInterval(second);
    }
}
//----------第二页结束------------


//----------第三页开始------------
function newTextThird() {
    var text = new CreateText(thirdText.substring(count1, count1 + 1), 30, 'red');
    count1++;
    count2++;
    textArray.push(text);
    x += 30;
    if ((count2 + 1) * 30 > canvas.width - 30 - 500) {
        height += 30;
        count2 = 0;
        x = 500;
    }
    drawChineseText(textArray);
    if (count1 > thirdText.length) {
        drawArc(arcArray, 2)
        count2 = 0;
        count1 = 0;
        clearInterval(third);
    }
}

/*
 *   数据可视化
 *
 *   动画效果
 *
 *   html游戏
 *
 */
//用zrender做动画效果 做一个球群  触摸散开




//----------第三页结束------------


//事件绑定
var clickMoving = 0;
function movingevent(e) {
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
            drawArc(arcArray, clickMoving + 1);
        }
    }
}
function clickEvent(e) {
    var clickX = e.pageX - canvas.offsetLeft;
    var clickY = e.pageY - canvas.offsetTop;
    for (i in arcArray) {
        var arc = arcArray[i];
        var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX, 2) + Math.pow(arc.y - clickY, 2))
        if (distanceFromCenter <= arc.r) {
            if (arc.name == 'in') {
                g.clearRect(0, 0, 2000, 2000);
                gg.clearRect(0, 0, 2000, 2000);
                ggg.clearRect(0, 0, 2000, 2000);
                lineArray = [];
                textArray = [];
                count2 = 0;
                count1 = 0;
                height = 50;
                clickMoving++;
                switch (clickMoving) {
                    case 1:
                        clearInterval(first);
                        second = setInterval(newTextSecond, 50);
                        break;
                    case 2:
                        clearInterval(second);
                        cD.init(200, 200, 200, 'zrender1');
                        x = 500;
                        third = setInterval(newTextThird, 50);
                        break;
                    case 3:
                        cD.destroy();
                        clearInterval(third);
                        break;
                }
            }
        }
    }
}

//事件绑定结束


window.onload = function () {
    newArc();
    first = setInterval(function () {
        newLine();
        newText();
    }, 30)
    window.onmousemove = movingevent;
    window.onclick = clickEvent;

}


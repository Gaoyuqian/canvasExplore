/*
 * Created by yuqiangao on 2017/5/4.
 */


var test = {
    o: {'x': 100, 'y': 700},
    offset: {'x': 400, 'y': 301},
    rectWidth: 50,
    jianju: 10,
    beishu: 1,
    info: [{'name': '淘宝', 'value': 10}, {'name': '淘宝', 'value': 220}, {'name': '淘宝', 'value': 220}, {
        'name': '淘宝',
        'value': 220
    }, {'name': '美团', 'value': 158}, {'name': '百度', 'value': 378}]
}
var canvas = document.getElementById('zhuzhuang');
var g = canvas.getContext('2d');
var rectArray = [];


function getEect(x, y, width, height, color, name) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.name = name;
    this.value = '';
    this.isSelect = false;
}

function drawZuobiao() {
    g.beginPath();
    g.translate(test.o.x, test.o.y);
    g.moveTo(0, 0);
    g.lineTo(test.offset.x, 0);
    g.moveTo(0, 0);
    g.lineTo(0, -test.offset.y);
    g.lineWidth = '1';
    g.strokeStyle = '#ff5700';
    g.stroke();
    drawKedu();
    drawRect();
}


function addRect() {
    for (var i = 0; i < test.info.length; i++) {
        var rect = new getEect((i + 1) * (test.rectWidth + test.jianju), -(test.info[i].value * test.beishu), test.rectWidth, test.info[i].value * test.beishu, 'green', test.info[i].name);
        rectArray.push(rect);
    }
    console.log(rectArray);
}
function drawKedu() {
    g.beginPath();
    for (var i = 0; i < rectArray.length; i++) {
        g.moveTo(rectArray[i].x, 0)
        g.lineTo(rectArray[i].x + rectArray[i].width, -5);
        g.moveTo(rectArray[i].x + rectArray[i].width, 0);
        g.lineTo(rectArray[i].x + rectArray[i].width, -5);
        g.strokeStyle = 'red';
        g.stroke();
    }

    g.beginPath();
    for (var i = 100; i < test.offset.y; i += 100) {
        g.moveTo(0, -i);
        g.lineTo(-10, -i);
        g.font = '20px';
        g.fillStyle = 'black';
        g.fillText(parseInt(i / test.beishu), -35, -i + 5)
    }
    g.lineWidth = '1';
    g.strokeStyle = 'green';
    g.stroke();
}

function drawRect(first) {

    for (let i = 0; i < rectArray.length; i++) {
        g.beginPath();
        g.fillStyle = !rectArray[i].isSelect ? rectArray[i].color : 'red';
        g.fillRect(rectArray[i].x, rectArray[i].y, rectArray[i].width, rectArray[i].height);
        //首次动画
        if (!first) {
            g.beginPath();
            g.fillStyle = 'grey';
            g.fillText(test.info[i].name, (i + 1) * (test.rectWidth + test.jianju) + (test.rectWidth - g.measureText(test.info[i].name).width) / 2, 15)
        }
    }
}

function mousemoving(e) {
    var movX = Math.abs(e.pageX - canvas.offsetLeft - test.o.x);
    var movY = Math.abs(e.pageY - canvas.offsetTop - test.o.y);
    for (var i = 0; i < rectArray.length; i++) {
        rectArray[i].isSelect = false;
        if ((movX > rectArray[i].x && movX < rectArray[i].x + rectArray[i].width) && (movX > 0 && movY < -rectArray[i].y)) {
            rectArray[i].isSelect = true;
            rectArray[i].value = rectArray[i].height;
        }
        drawRect(true);
    }
}

window.onload = function () {
    addRect();
    drawZuobiao();


    window.onmousemove = mousemoving;
}
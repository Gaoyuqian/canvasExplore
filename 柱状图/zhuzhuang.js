/*
 * Created by yuqiangao on 2017/5/4.
 */


var test = {
    o: {'x': 100, 'y': 700},
    offset: {'x': 700, 'y': 400},
    rectWidth: 70,
    jianju: 100,
    beishu: 1,
    info: [{'name': '淘宝', 'value': 220}, {'name': '美团', 'value': 158}, {'name': '百度', 'value': 378}]
}
var canvas = document.getElementById('zhuzhuang');
var g = canvas.getContext('2d');
var rectArray = [];


function getEect(x, y, width, height, color, name, value) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.name = name;
    this.value = value;
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
        var rect = new getEect((i + 1) * (test.rectWidth + test.jianju), -(test.info[i].value * test.beishu), test.rectWidth, test.info[i].value * test.beishu, 'green', test.info[i].name, test.info[i].value);
        rectArray.push(rect);
    }
    console.log(rectArray);
}
function drawKedu() {
    g.beginPath();
    for (var i = 0; i < rectArray.length; i++) {
        g.moveTo(rectArray[i].x, 0)
        g.lineTo(rectArray[i].x+rectArray[i].width, -5)
        g.moveTo(rectArray[i].x+rectArray[i].width, 0)
        g.lineTo(rectArray[i].x+rectArray[i].width, -5)
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

function drawRect() {
    for (var i = 0; i < rectArray.length; i++) {
        g.beginPath();
        g.fillStyle = rectArray[i].color;
        g.fillRect( rectArray[i].x, rectArray[i].y, rectArray[i].width, rectArray[i].height);
        g.beginPath();
        g.fillStyle = 'grey';
        g.fillText(test.info[i].name, (i + 1) * (test.rectWidth + test.jianju) + (test.rectWidth - g.measureText(test.info[i].name).width) / 2, 15)
    }
}


/*添加鼠标事件*/

function mousemoving(e){

    var movX = e.pageX - canvas.offsetLeft-test.o.x;
    var movY = e.pageY - canvas.offsetTop-test.o.y;


    for(var i = 0;i<rectArray.length;i++){
        //坐标计算错误
        if((movX>rectArray[i].x&&movX<rectArray[i].x+rectArray[i].width)&&(movX>0&&movY<-rectArray[i].y)){
            console.log(rectArray[i]);
        }
    }




}

window.onload = function () {
    addRect();
    drawZuobiao();



    window.onmousemove=mousemoving;
}
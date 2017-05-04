/*
 * Created by yuqiangao on 2017/5/4.
 */


var test = {
    o: {'x': 100, 'y': 700},
    offset: {'x': 700, 'y': 400},
    rectWidth: 70,
    jianju: 100,
    info: [{'name': 'test1', 'value': 22}, {'name': 'test1', 'value': 15}, {'name': 'test2', 'value': 37}]
}
var canvas = document.getElementById('zhuzhuang');
var g = canvas.getContext('2d');
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

function drawKedu() {
    g.beginPath();
    var total = test.info.length;
    for (var i = 1; i <= total; i++) {
        g.moveTo(i * (test.rectWidth + test.jianju) + test.rectWidth, 0)
        g.lineTo(i * (test.rectWidth + test.jianju) + test.rectWidth, -5)
        g.moveTo(i * (test.rectWidth + test.jianju), 0)
        g.lineTo(i * (test.rectWidth + test.jianju), -5)
        g.strokeStyle = 'red';
        g.stroke();
    }

    g.beginPath();
    for (var i = 100; i < test.offset.y; i += 100) {
        g.moveTo(0, -i);
        g.lineTo(-10, -i);
        g.font = '20px';
        g.fillStyle = 'black';
        g.fillText(i/10, -35, -i + 5)
    }
    g.lineWidth = '1';
    g.strokeStyle = 'green';
    g.stroke();
}

function drawRect() {
    var total = test.info.length;

    for (var i = 0; i < total; i++) {
        g.beginPath();
        g.fillStyle = 'green';
        g.fillRect((i + 1) * (test.rectWidth + test.jianju), -(test.info[i].value*10), test.rectWidth, test.info[i].value*10)
        g.beginPath();
        g.fillStyle = 'grey';
        g.fillText(test.info[i].name, (i + 1) * (test.rectWidth + test.jianju) + (test.rectWidth - g.measureText(test.info[i].name).width) / 2, 15)
    }


}
window.onload = function () {
    drawZuobiao();
}
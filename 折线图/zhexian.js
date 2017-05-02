/**
 * Created by yuqiangao on 2017/5/2.
 */


var test = {
    O: {'x': '200', 'y': '900'}, //坐标系中心
    offset:{'x':'100','y':'500'},//坐标系长度 随info长度而变化
    info:{'name1':[110,555,123,543,123,110,122,654]},//数据存放数组 核心

}
var temp = 0 ;
var canvas = document.getElementById('zhexian');
var g = canvas.getContext('2d');
function drawZuobiao(arg) {
    g.beginPath();
    g.moveTo(arg.O.x,arg.O.y);
    g.lineTo(arg.O.x,arg.O.y-arg.offset.y);
    g.moveTo(arg.O.x,arg.O.y);
    g.lineTo(arg.O.x+arg.offset.x,arg.O.y)
    g.strokeStyle = 'red';
    //g.lineWidth = '20';
    g.arc(arg.O.x,arg.O.y,10,0,2*Math.PI);
    g.fillStyle = 'red';
    g.fill();
    g.stroke();
    drawZhexian(arg);
}


function drawZhexian(arg){
    g.beginPath();
    g.translate(arg.O.x,arg.O.y);
    for(var i in arg.info.name1){
        g.lineTo((parseInt(i))*100,-arg.info.name1[(parseInt(i))]);
    }
    g.strokeStyle = 'blue';
    g.stroke();

}
window.onload = function(){
    drawZuobiao(test);
}
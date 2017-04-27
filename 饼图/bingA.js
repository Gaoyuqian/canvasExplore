/**
 * Created by yuqiangao on 2017/4/27.
 */





//画一个饼图




var bArray = [];
var colorArray = ['red','orange','yellow','black','grey','green']
var canvas = document.getElementById('bingA');
var g = canvas.getContext('2d');



function getBing(x,y,radius,color,value,name){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.value = value;
    this.name = name;
}

//接受对象为参数

var total = 0;
var temp = 0;//负责接收上一个
function drawBing(arg){
    console.log(typeof arg);

    if(typeof arg == 'object'){
        for(let i of arg){
            total += i.value;
            bArray.push(new getBing(200,200,100,colorArray[colorArray.length-1], i.value, i.name));
            colorArray.pop();
            console.log(colorArray)
        }
    }
    for(let i in bArray) {
        g.beginPath();
        g.arc(  bArray[i].x,   bArray[i].y,   bArray[i].radius, temp * Math.PI,((bArray[i].value/total*2)+temp)* Math.PI, false);
        g.lineTo( bArray[i].x,   bArray[i].y);
        g.fillStyle = bArray[i].color;
        g.fill();
        temp  = (bArray[i].value/total*2)+temp;
        if(g.isPointInPath(200,240)){
            console.log(bArray[i])
        }
    }
}


function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标



window.onload = function(){
    drawBing([{'name':'测试1','value':3333},{'name':'测试3','value':1112},{'name':'测试3','value':2342}])
}
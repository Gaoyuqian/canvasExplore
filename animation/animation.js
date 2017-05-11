/**
 * Created by yuqiangao on 2017/5/10.
 */
var animation = {

    arcArray: [],
    time:'',

    init: function (id) {
        var zj = document.getElementById(id);
        var canvas = document.createElement('canvas');
        canvas.width = parseInt(zj.style.width);
        canvas.height = parseInt(zj.style.height);
        zj.appendChild(canvas);
        this.createArc();
        this.drawArc();
        var gg = setInterval(animation.main,1000);
    },
    animationArc:function(x, y, r, color){
        this.x = x;
        this.oldY = y;
        this.oldX= x;
        this.y = y;
        this.r = r;
        this.color = color;
    },
    createArc: function () {
        var newArc = new this.animationArc(100, 100, 50, 'red');
        var newArc1 = new this.animationArc(200 , 100, 50, 'red');
        var newArc2 = new this.animationArc(300 , 100, 50, 'red');
        this.arcArray.push(newArc);
        this.arcArray.push(newArc1);
        this.arcArray.push(newArc2);

    },
    drawArc: function () {

        var canvas = document.getElementsByTagName('canvas');
        console.log(animation.arcArray,canvas[0].height,canvas[0].width);

        var g = canvas[0].getContext('2d');

        g.clearRect(0, 0, 500, 500)
        g.beginPath();
        for (var i in this.arcArray) {
            var arc = this.arcArray[i];
            g.arc(arc.x, arc.y, arc.r, 0, 2 * Math.PI);
            g.fillStyle = arc.color;
            g.fill();
        }
    },


    redraw: function (x,y,r) {
        var canvas = document.getElementsByTagName('canvas');
        var g = canvas[0].getContext('2d');
        g.clearRect(0, 0, 500, 500);
        g.beginPath();
        g.arc(x, y, r, 0, 2 * Math.PI);
        g.fillStyle = 'rgba(216,216,216,0.2)';
        g.fill();
    },
    isPath:function(e){
        var clickX = e.pageX
        var clickY = e.pageY

        for (var i in animation.arcArray) {
            var arc = animation.arcArray[i];
            var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX, 2) + Math.pow(arc.y - clickY, 2))
            if (distanceFromCenter <= arc.r) {
                arc.x+=2;
                for(var j in  animation.arcArray){
                    var jrc = animation.arcArray[j];
                    if(arc.x+arc.r*2>jrc.x){
                        if(j!=i){
                            jrc.x+=2
                        }
                        animation.drawArc();
                    }
                }
            }
        }
    },

    animatinate:function(){
        var canvas = document.getElementsByTagName('canvas');
        var g = canvas[0].getContext('2d');
        g.clearRect(0,0,1000,1000);
        g.beginPath();
        for (var i in this.arcArray) {
            var arc = this.arcArray[i];
            g.arc(arc.x, arc.y, arc.r, 0, 2 * Math.PI);
            g.fillStyle = arc.color;
            g.fill();
        }
    },
    main:function(){
        var canvas = document.getElementsByTagName('canvas');
        var g = canvas[0].getContext('2d');
        for (var i in animation.arcArray) {
            var arc = animation.arcArray[i];
            console.log(arc.y + arc.r ,arc.y + arc.r >= canvas[0].height)

            if (arc.x + arc.r >= canvas[0].width) {
                arc.y+=50;
            }else if (arc.y + arc.r >= canvas[0].height) {
                arc.x-=50;
            }else if (arc.x - arc.r <= 0) {
                arc.y-=50;
            }else if (arc.y - arc.r <= 0) {
                arc.x+=50;
            }else{
                arc. x+=50
            }
            animation.drawArc();
        }


        //利用坐标定位
        //  例如  要去500,500 计算出从500到起点的直线距离， 通过角度计算路线  ！！！！
    }
}



window.onload = function () {
    animation.init('main');
}
/**
 * Created by yuqiangao on 2017/5/10.
 */
var animation = {
//舍弃
    arcArray: [],
    time: '',
    aa: true,
    animationArray:[],
    init: function (id) {
        var zj = document.getElementById(id);
        var canvas = document.createElement('canvas');
        canvas.width = parseInt(zj.style.width);
        canvas.height = parseInt(zj.style.height);
        zj.appendChild(canvas);
        this.createArc();
        this.drawArc();
        //var gg = setInterval(animation.main,1000);
        this.main(400, 400);

    },
    animationArc: function (x, y, r, color) {
        this.x = x;
        this.oldY = y;
        this.oldX = x;
        this.y = y;
        this.r = r;
        this.color = color;
    },
    createArc: function () {
        var newArc = new this.animationArc(100, 100, 50, 'red');
        //var newArc1 = new this.animationArc(200, 100, 50, 'green');
        //var newArc2 = new this.animationArc(300, 100, 50, 'gold');
        this.arcArray.push(newArc);
        //this.arcArray.push(newArc1);
        //this.arcArray.push(newArc2);

    },
    drawArc: function () {

        var canvas = document.getElementsByTagName('canvas');
        console.log(animation.arcArray, canvas[0].height, canvas[0].width);

        var g = canvas[0].getContext('2d');

        g.clearRect(0, 0, 500, 500)
        for (var i in this.arcArray) {
            g.beginPath();
            var arc = this.arcArray[i];
            g.arc(arc.x, arc.y, arc.r, 0, 2 * Math.PI);
            g.fillStyle = arc.color;
            g.fill();
        }
    },


    redraw: function (x, y, r) {
        var canvas = document.getElementsByTagName('canvas');
        var g = canvas[0].getContext('2d');
        g.clearRect(0, 0, 500, 500);
        g.beginPath();
        g.arc(x, y, r, 0, 2 * Math.PI);
        g.fillStyle = 'rgba(216,216,216,0.2)';
        g.fill();
    },
    isPath: function (e) {
        var clickX = e.pageX
        var clickY = e.pageY

        for (var i in animation.arcArray) {
            var arc = animation.arcArray[i];
            var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX, 2) + Math.pow(arc.y - clickY, 2))
            if (distanceFromCenter <= arc.r) {
                arc.x += 2;
                for (var j in  animation.arcArray) {
                    var jrc = animation.arcArray[j];
                    console.log(i);
                    if (arc.x + arc.r * 2 > jrc.x) {
                        if (j != i) {
                            jrc.x += 2
                        }
                        animation.drawArc();
                    }
                }
            }
        }
    },

    animatinate: function (toX, toY) {
        var canvas = document.getElementsByTagName('canvas');
        var g = canvas[0].getContext('2d');
        for (var i in animation.arcArray) {
            var arc = animation.arcArray[i];
            g.clearRect(0, 0, 500, 500);

            console.log(arc.x <= toX && arc.y <= toY);
            if (arc.x <= toX && arc.y <= toY) {
                g.beginPath();
                g.arc(arc.x, arc.y, arc.r, 0, 2 * Math.PI);
                g.fillStyle = arc.color;
                g.fill();
            } else {
                animation.aa = false;
            }
        }
    },
    main: function (toX, toY) {
        var canvas = document.getElementsByTagName('canvas');
        var g = canvas[0].getContext('2d');
        var toX = toX;
        var toY = toY;
        for (var i in animation.arcArray) {
            var arc = animation.arcArray[i];
            var angleToO = Math.atan((toX - arc.x) / (toY - arc.y)) * 180 / Math.PI;
            arc.x +=2*Math.abs(Math.sin(angleToO));
            arc.y +=2*Math.abs(Math.cos(angleToO));
            console.log(arc.x, arc.y)

            animationTime = setTimeout(function () {
                if (animation.aa) {
                    animation.animatinate(toX, toY);
                    return animation.main(400, 400)
                }
            }, 16)
        }
        //利用坐标定位
        //将所有的动画 集合到一个数组里循环运行
    }
}


window.onload = function () {
    animation.init('main');
    window.onclick = animation.isPath;
}
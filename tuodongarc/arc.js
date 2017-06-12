/**
 * Created by yuqiangao on 2017/4/26.
 */


var canvas = document.getElementById('arc');
var g = canvas.getContext('2d');


var arcForZR = {
    defaultSelect: '',
    moving: false,
    sxArray: [],
    color: ['red', 'green', 'orange', 'gold'],


    arc: function (x, y, radiu, color) {
        this.x = x;
        this.y = y;
        this.radius = radiu;
        this.color = color;
        this.isSelected = false;
    },//定义一个扇形对象


    addarc: function () {
        var shan = new arcForZR.arc(arcForZR.getRandom(0, 800),arcForZR.getRandom(0, 400), arcForZR.getRandom(10, 30), arcForZR.color[arcForZR.getRandom(0, 3)]);
        arcForZR.sxArray.push(shan);
        arcForZR.drawarc();

    },//添加扇形元素

    getRandom: function (from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    },//获取随机坐标
    drawarc: function () {
        g.clearRect(0, 0, 2000, 2000);
        for (var i = 0; i < arcForZR.sxArray.length; i++) {
            var arc = arcForZR.sxArray[i];
            g.beginPath();
            g.arc(arc.x, arc.y, arc.radius, 0, 2 * Math.PI);
            g.fillStyle = arc.color;
            g.strokeStyle = arc.color;
            g.fill();
            g.stroke();
        }

        if (arcForZR.sxArray.length >= 10) {
            arcForZR.destory();
        }
        canvas.onmousedown = arcForZR.clickEvent;
        canvas.onmousemove = arcForZR.moveEvent;
        canvas.onmouseout = arcForZR.outEvent;
        canvas.onmouseup = arcForZR.outEvent;
    },//画出元素

    clickEvent: function (e) {
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;

        for (var i = arcForZR.sxArray.length - 1; i >= 0; i--) {
            var arc = arcForZR.sxArray[i];
            var distanceFromCenter = Math.sqrt(Math.pow(arc.x - clickX, 2) + Math.pow(arc.y - clickY, 2))

            if (distanceFromCenter <= arc.radius) {//判断点击位置是否在某个圆内

                if (arcForZR.defaultSelect != null) {
                    arcForZR.defaultSelect.isSelected = false;//还原上一个点击的圆的选中状态为false
                }
                arcForZR.defaultSelect = arc;
                arc.isSelected = true; //若在 改变对象的属性
                arcForZR.moving = true;
            }
        }
    },
    moveEvent: function (e) {
        if (arcForZR.moving) {
            if (arcForZR.defaultSelect != null) {
                var x = e.pageX - canvas.offsetLeft;  //获取移动的坐标 根据坐标画图
                var y = e.pageY - canvas.offsetTop;
                arcForZR.defaultSelect.x = x;
                arcForZR.defaultSelect.y = y;
                arcForZR.drawarc();
            }
        }
    },
    outEvent: function () {
        arcForZR.moving = false;
    },


    begin: function () {
        timeout = setInterval(arcForZR.addarc, 200);
    },
    destory: function () {
        clearInterval(timeout)
    }

}

//添加动画效果变成粒子特效
// 画出元素


window.onload = function () {
}

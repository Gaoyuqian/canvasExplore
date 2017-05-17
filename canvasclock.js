/**
 * Created by yuqiangao on 2017/4/6.
 * end 2017／4／19
 * 6小时左右工时
 *
 *
 */



var cD = {
    init: function (oX, oY, r, hasCanvas) {
        var oX = oX;
        var oY = oY;
        var r = r;
        var hasCanvas = hasCanvas;
        //需要页面上有canvas id为mycanvas
        var that = cD;
        if (hasCanvas) {
            var canvas = document.getElementById(hasCanvas);
            if (canvas.width < 2 * r) {
                canvas.width = 2 * r;
            }
            if (canvas.height < 2 * r) {
                canvas.height = 2 * r;
            }
        } else {

            var body = document.getElementsByTagName('body');
            var canvas = document.createElement('canvas');
            canvas.width = 2 * r;
            canvas.height = 2 * r;

            if (oX < r) {
                oX = r
            }
            if (oY < r) {
                oY = r
            }
            if (oX > r) {
                canvas.width = 2 * r + oX;
            }
            if (oY > r) {
                canvas.height = 2 * r + oY;
            }
            canvas.id = 'mycanvas';
            body[0].appendChild(canvas);
        }

        that.setParame(r);
        canvas.onload = this.drawBP(oX, oY, r);
        canvas.onload = this.drawBPLine(oX, oY, that.r1, that.r2, that.r3);
        canvas.onload = this.drawBZ(oX, oY, that.sR, that.mR, that.hR);
        canvas.onload = this.drawCenter(oX, oY);
          draw = setInterval(function () {
            that.drawBP(oX, oY, r);
            that.drawBPLine(oX, oY, that.r1, that.r2, that.r3);
            that.drawBZ(oX, oY, that.sR, that.mR, that.hR);
            that.drawCenter(oX, oY);
        }, 1000);
    },
    getCanvas: function () {
        return document.getElementsByTagName('canvas')[0].getContext('2d');
    },
    setParame: function (r) {
        var that = cD;
        that.sR = 3 * r / 5;
        that.mR = 2 * r / 5;
        that.hR = r / 5;
        that.r1 = 290 * r / 310;
        that.r2 = 230 * r / 310;
        that.r3 = 270 * r / 310;
    },
    drawBPLine: function (oX, oY, r1, r2, r3) {          //画表盘
        //圆心为310，310   线长60
        var cts = this.getCanvas();
        cts.beginPath();
        for (var i = 1; i < 13; i++) {
            cts.moveTo(Math.sin(30 * i * Math.PI / 180) * r1 + oX, oY - Math.cos(30 * i * Math.PI / 180) * r1);
            cts.lineTo(Math.sin(30 * i * Math.PI / 180) * r2 + oX, oY - Math.cos(30 * i * Math.PI / 180) * r2);
        }
        cts.lineWidth = 3;
        cts.stroke();
        cts.beginPath();

        for (var i = 1; i < 60; i++) {
            cts.moveTo(Math.sin(6 * i * Math.PI / 180) * r1 + oX, oY - Math.cos(6 * i * Math.PI / 180) * r1);
            cts.lineTo(Math.sin(6 * i * Math.PI / 180) * r3 + oX, oY - Math.cos(6 * i * Math.PI / 180) * r3);
        }

        cts.lineWidth = 2;
        cts.stroke();
    },
    drawBZ: function (oX, oY, sR, mR, hR) { //画表针
        var cts = this.getCanvas();
        var Time = new Date();
        console.log(Time.getMinutes(), Time.getSeconds());
        //秒针 长200 每秒钟转6*math.pi/180
        cts.moveTo(oX, oY);
        cts.lineTo(oX + sR * Math.cos((Time.getSeconds() - 15) * 6 * Math.PI / 180), oY + sR * Math.sin((Time.getSeconds() - 15) * 6 * Math.PI / 180));
        cts.strokeStyle = 'black';
        cts.lineWidth = 1;
        cts.stroke();

        //分针
        cts.beginPath();
        cts.moveTo(oX, oY);
        cts.lineTo(oX + mR * Math.cos((Time.getMinutes() - 15) * 6 * Math.PI / 180), oY + mR * Math.sin((Time.getMinutes() - 15) * 6 * Math.PI / 180));
        cts.strokeStyle = 'red';
        cts.lineWidth = 5;
        cts.stroke();

        cts.beginPath();
        cts.moveTo(oX, oY);
        cts.lineTo(oX + hR * Math.cos((Time.getHours() - 15) * 30 * Math.PI / 180), oY + hR * Math.sin((Time.getHours() - 15) * 30 * Math.PI / 180));
        cts.strokeStyle = 'orange';
        cts.lineWidth = 8;
        cts.stroke();


    },
    drawBP: function (x, y, r) { //画圆形
        var cts = this.getCanvas();
        cts.beginPath();
        cts.arc(x, y, r, 0, 2 * Math.PI);
        cts.fillStyle = 'skyblue';
        cts.strokeStyle = 'black';
        cts.lineWidth = 1;
        cts.fill();
        cts.stroke()
    },
    drawCenter: function (x, y) {
        var cts = this.getCanvas();
        cts.beginPath();
        cts.arc(x, y, 5, 0, 2 * Math.PI);
        cts.fillStyle = 'white';
        cts.strokeStyle = 'grey';
        cts.lineWidth = 2;
        cts.fill();
        cts.stroke()
    },
    destroy:function(){
        clearInterval(draw);
    }
};

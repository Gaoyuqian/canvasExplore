/**
 * Created by yuqiangao on 2017/10/20.
 */


//扇形
define(function (requier) {
    var sector = function sector(option) {
        this.x = option.x;  //x
        this.y = option.y;  //y
        this.r = option.r;  //r
        this.startAngle = option.startAngle;
        this.endAngle = option.endAngle;
        this.lineWidth = option.lineWidth;
        this.color = option.color;
        this.canSelected = option.canSelected || false;  //是否可以被选中
        this.onclick = option.onclick;
        this.onmousedown = option.onmousedown;
        this.onmouseup = option.onmouseup;
        this.willMoving = false;
        this.canMoving = option.canMoving;
        this.newColor = 'pink'
    };
    sector.prototype = {
        constructor: sector,
        draw: function (can) {
            g = can.getContext('2d');

            g.beginPath();
            g.fillStyle = this.color;
            g.strokeStyle = this.color;
            //g.lineWidth = this.lineWidth || 0;
            g.lineTo(this.x, this.y);
            g.arc(this.x, this.y, this.r, this.startAngle / 180 * Math.PI, this.endAngle / 180 * Math.PI, false);
            g.closePath();
            g.stroke();
            g.fill();


            return this
        },
        init: function () {
            g.arc(this.x, this.y, this.r, this.startAngle * Math.PI, this.endAngle * Math.PI);
            g.lineTo(this.x, this.y);
        }
    }
    return sector;
})
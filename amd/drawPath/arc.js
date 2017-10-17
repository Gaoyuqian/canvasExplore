define(function (require) {
    var arcArray = [];//有留着的必要  辅助event代码的编写
    var event = require('./../event/eventHandle')
    //var baseModel = require('./../base/base')
    //var base = new baseModel();
    var arc = function arc(option) {
        this.x = option.x;  //x
        this.y = option.y;  //y
        this.r = option.r;  //r
        this.name = 'arc';
        this.jindu = option.jindu || 1;
        this.color = option.color;  //颜色
        this.newColor = '';  //重绘颜色
        this.isSelected = false;  //被选中状态
        this.single = option.single || false;  //是否单选
        this.canSelected = option.canSelected || false;  //是否可以被选中
        this.beginAngle = 0;
        this.endAngle = 2 * this.jindu;
        this.onclick = option.onclick;
        this.onmousedown = option.onmousedown;
        this.onmouseup = option.onmouseup;

    };

    arc.prototype = {
        constructor: arc,
        draw: function (can) {
            const g = can.getContext('2d');
            g.beginPath();
            g.fillStyle = this.newColor || this.color;
            g.arc(this.x, this.y, this.r, this.beginAngle, this.endAngle * Math.PI);
            g.fill();
            return this
        },
        redraw: function (x, y) {
            g.arc(this.x, this.y, this.r, this.beginAngle, this.endAngle * Math.PI);
        }
    }
    return arc
});

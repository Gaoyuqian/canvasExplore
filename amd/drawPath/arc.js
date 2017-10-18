define(function (require) {
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
            g = can.getContext('2d');
            g.beginPath();
            g.fillStyle = this.newColor || this.color;
            g.arc(this.x, this.y, this.r, this.beginAngle, this.endAngle * Math.PI);
            g.fill();
            return this
        },
        init: function () {
            g.arc(this.x, this.y, this.r, this.beginAngle, this.endAngle * Math.PI);
        }
    };
    return arc
});

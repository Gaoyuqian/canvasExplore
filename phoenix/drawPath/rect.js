/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var rect = function (option) {
        this.x = option.x;
        this.y = option.y;
        this.width = option.width;
        this.height = option.height;
        this.lineWidth = option.lineWidth;
        this.color = option.color;
        this.name = 'rect';
        this.isSelected = false;  //被选中状态
        this.single = option.single;  //是否单选
        this.canSelected = option.canSelected;  //是否可以被选中
        this.onclick = option.onclick;
        this.willMoving = false;
        this.strokeStyle = option.strokeStyle;
        this.canMoving = option.canMoving;
    };

    rect.prototype = {
        constructor: rect,
        draw: function (can) {
            g = can.getContext('2d');
            g.beginPath();
            g.rect(this.x, this.y, this.width, this.height);
            g.lineWidth = this.lineWidth || 1;
            g.strokeStyle = this.strokeStyle || 'black';
            g.fillStyle = this.color || 'black';
            g.stroke();
            g.fill();
        },
        init: function () {
            g.rect(this.x, this.y, this.width, this.height);
        },
    };

    return rect
});

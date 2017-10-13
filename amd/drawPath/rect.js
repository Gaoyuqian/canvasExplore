/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    /*
     * 矩形
     */
    var event = require('./../event/eventHandle');
    var baseModel = require('./../base/base');
    var ph = require('./../init/init');
    var base = new baseModel();
    var canvas = new ph('main').create();
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
    };

    rect.prototype = {
        constructor: rect,
        draw: function () {
            var g = canvas.getContext('2d');
            g.beginPath();
            g.rect(this.x, this.y, this.width, this.height);
            g.lineWidth = this.lineWidth || 1;
            g.fillStyle = this.color || 'black';
            if (this.canSelected) {
                canvas.onclick = event.onClick;
                base.eventArray.push(this);
            }
            g.fill();
        }
    };

    return rect
});

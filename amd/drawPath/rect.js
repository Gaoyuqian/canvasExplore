/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {


    /*
     * 矩形
     *
     *
     */


    var base = require('./../base/base')
    var event = require('./../event/eventHandle')
    var ph = require('./../init/init');
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
    }


    rect.prototype = {
        constructor: rect,

        drawRect: function () {
            var g = canvas.getContext('2d')
            console.log(g)

            g.beginPath();
            g.rect(this.x, this.y, this.width, this.height);
            g.lineWidth = this.lineWidth || 1;
            g.fillStyle = this.color || 'black';
            g.fill();
        },
    }

    return rect
});

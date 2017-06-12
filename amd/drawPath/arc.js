define(function (require) {
    var arcArray = [];//有留着的必要  辅助event代码的编写
    var event = require('./../event/eventHandle')

    var baseModel = require('./../base/base')
    var ph = require('./../init/init');
    var base = new baseModel();

    var canvas = new ph('main').create();

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
        this.endAngle = 2*this.jindu;
    };


    arc.prototype = {

        constructor: arc,


        drawArc: function () {
            var g = canvas.getContext('2d')
            console.log(g);
            g.beginPath();
            this.isSelected ? this.newColor = 'red' : this.newColor = '';
            g.fillStyle = this.newColor || this.color;
            g.arc(this.x, this.y, this.r,this.beginAngle, this.endAngle * Math.PI);

            if(this.canSelected){
                canvas.onclick = event.onClick;
                base.eventArray.push(this);
                console.log(base.eventArray);
            }
            g.fill();
            //if (this.canSelected && !window.onclick) {
            //    //绑定事件(目前只绑定点击事件，之后会根据path的定义绑定更多事件)
            //    //添加事件时, 把所有不为空的数组合并到一个事件数组中 循环该数组
            //    document.addEventListener('click', event.onClick, false);
            //}
            return this
        },
        redraw: function (x, y) {
            g.arc(this.x, this.y, this.r, this.beginAngle, this.endAngle * Math.PI);
        }
    }
    return arc
});

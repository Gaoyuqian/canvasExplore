/**
 * Created by yuqiangao on 2017/5/16.
 */
define(function (require) {
    var main = function () {
        //每一个实例对应一个canvas
    };

    main.prototype = {
        mainArray: [],
        constructor: main,
        addSharp: function (v) {
            this.mainArray.push(v);
        },
        //绘画主体(sharp多了应该是个坑)
        //通过每个的draw方法解决
        //易于维护
        draw: function () {
            for (var i in this.mainArray) {
                this.mainArray[i].draw();
            }
        },
        //清空  //待填坑
        clear: function () {
            this.mainArray = [];
            this.draw();
        },
        //开始挖坑
        redraw: function () {//基于事件event的重绘函数

        }
    };
    return main;
})

/*
事件的所有操作进入mainArray 调用redraw 触发状态改变
*/
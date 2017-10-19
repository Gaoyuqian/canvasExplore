/**
 * Created by yuqiangao on 2017/5/16.
 */
define(function (require) {
    var mainCanvas = require('../init/init');
    var eventHandle = require('../event/eventHandle');
    var main = function (canvas) {
        //每一个实例对应一个canvas
        this.canvas = new mainCanvas(canvas).create();
    };

    main.prototype = {
        mainArray: [],
        constructor: main,
        addSharp: function (v) {
            // 单例的事件
            this.mainArray.push(v);
        },
        draw: function () {
            for (var i in this.mainArray.reverse()) {
                this.mainArray[i].draw(this.canvas);
            }
        },
        on: function (eventName, callback) {
            const _this = this;
            const callFn = function (e) {
                // 加入自己的东西
                if (eventName == 'click') {
                    eventHandle.onclick(e, _this.canvas, _this.mainArray, e.pageX - _this.canvas.offsetLeft, e.pageY - _this.canvas.offsetTop);
                }
                //不推荐绑定其他事件
                callback(e);
            }
            this.canvas.addEventListener(eventName, callFn, false);
        }
    };
    return main;
})

/*
 事件的所有操作进入mainArray 调用redraw 触发状态改变
 */
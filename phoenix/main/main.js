/**
 * Created by yuqiangao on 2017/5/16.
 */
define(function (require) {
    var mainCanvas = require('../init/init');
    var base = require('../base/base');
    //var eventHandle = require('../event/eventHandle');
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
            base.addEvent(this);
            base.addEventArray(this.mainArray);
            for (var i in this.mainArray) {
                this.mainArray[i].draw(this.canvas);
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
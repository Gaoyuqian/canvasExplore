/**
 * Created by yuqiangao on 2017/5/16.
 */
define(function (require) {
    var initArc = require('./../drawPath/arc');
    var initRect = require('./../drawPath/rect');
    var main = function () {

    }


    main.prototype = {

        mainArray: [],


        constructor: main,


        //main.addSharp
        addSharp: function (v) {
            this.mainArray.push(v);
        },


        //绘画主体(sharp多了应该是个坑)
        draw: function () {
            console.log(this.mainArray);
            for (var i in this.mainArray) {
                var main = this.mainArray[i];
                switch (main.name) {
                    case 'arc':
                        var arc = new initArc(main);
                        arc.drawArc();
                        break;
                    case 'rect':
                        var rect = new initRect(main);
                        rect.drawRect();
                        break;
                }
            }
        },


        //清空
        clear: function () {
            this.mainArray = [];
        },


        //开始挖坑

        redraw: function () {//基于事件event的重绘函数

        }


    };

    return main;
})

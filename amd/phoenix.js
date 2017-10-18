/**
 * Created by yuqiangao on 2017/5/11.
 */
define(function (require) {

    /*
     主函数
     用户端文件
     */

    var main = require('./main/main');
    //var event = require('./event/eventHandle');
    var initArc = require('./drawPath/arc');
    var initRect = require('./drawPath/rect');
    //var ph = require('./init/init');
    var myPh = new main('main');
    //var canvas = new ph('main').create();

    console.log(myPh);
    myPh.addSharp(new initRect({
        x: 444, y: 344, width: 100, height: 100, color: 'red', canSelected: true, onclick: function () {
            console.log(this)
        },canMoving: true,
    }));
    myPh.addSharp(new initArc({
        x: 122, y: 122, r: 100, color: 'green', canSelected: true, single: true, onclick: function () {
            console.log(this);
        }
    }));
    myPh.addSharp(new initArc({
        x: 111, y: 111, r: 100, color: 'black', canSelected: true, single: false, onclick: function () {
            console.log(this);
        }
    }));
    myPh.draw();
    //当window点击事件触发时，会进行判断是否在某个图形上， 默认给全局绑定一个同一个事件 该事件触发时会判断当前点击区域位于哪个sharp上，
    // 并以先画出来的优先处理 然后执行该对象的对应事件方法
    //画布实例化应该放在一个文件下然后均引用该实例

});


//待解决问题
//  1. 解决多选和单选问题  （delay）
//  2. 所有图形都存在一个数组里 （可操作的图形存在一个数组里  已解决）
//  3. new 之后直接调用build (已解决)
//  4. 其他鼠标事件  给canvas绑定事件可以控制当前canvas上的所有path、


// 5. 给每个sharp绑定事件
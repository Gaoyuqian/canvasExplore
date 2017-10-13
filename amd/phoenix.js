/**
 * Created by yuqiangao on 2017/5/11.
 */
define(function (require) {

    /*
     主函数
     用户端文件
     */

    var main = require('./main/main');
    var event = require('./event/eventHandle');
    var initArc = require('./drawPath/arc');
    var initRect = require('./drawPath/rect');
    var ph = require('./init/init');
    var myPh = new main();
    var canvas = new ph('main').create();

    myPh.addSharp(new initRect({
        x: 444, y: 344, width: 100, height: 100, color: 'red', canSelected: true
    }));
    myPh.addSharp(new initArc({
        x: 235, y: 443, r: 100, color: 'green', canSelected: true, single: true
    }));
    myPh.addSharp(new initArc({
        x: 111, y: 111, r: 100, color: 'black', canSelected: true, single: false
    }));
    myPh.draw();
    canvas.onclick = event.onClickCopy(function () {
        console.log(this);
    });
    //window.myPh = myPh;
});


//待解决问题
//  1. 解决多选和单选问题  （delay）
//  2. 所有图形都存在一个数组里 （可操作的图形存在一个数组里  已解决）
//  3. new 之后直接调用build (已解决)
//  4. 其他鼠标事件  给canvas绑定事件可以控制当前canvas上的所有path
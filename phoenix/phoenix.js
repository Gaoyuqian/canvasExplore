/**
 * Created by yuqiangao on 2017/5/11.
 */
define(function (require) {

    /*
     主函数
     用户端文件
     */

    var main = require('./main/main');
    var initArc = require('./drawPath/arc');
    var initRect = require('./drawPath/rect');
    var initSector = require('./drawPath/Sector');
    var myPh = new main('main');
    myPh.addSharp(new initRect({
        x: 444, y: 344, width: 100, height: 100, color: 'gold', canSelected: true, onclick: function () {
            console.log(this.name + '被点击啦');
        }, canMoving: true, lineWidth: 20
    }));
    myPh.addSharp(new initArc({
        x: 133, y: 133, r: 100, color: 'green', canSelected: true, single: true, onclick: function () {
            console.log(this.name + '被点击啦');
        }, canMoving: true
    }));
    myPh.addSharp(new initArc({
        x: 111, y: 111, r: 100, color: 'pink', canSelected: true, single: false, onclick: function () {
            console.log(this.name + '被点击啦');
        }, canMoving: true
    }));
    myPh.addSharp(new initSector({
        x: 444,
        y: 555,
        r: 300,
        color: 'blue',
        startAngle: 20,
        endAngle: 60,
        canSelected: true,
        single: false,
        lineWidth:55,
        onclick: function () {
            console.log(this.color );
        },
        canMoving: true
    }));

    myPh.draw();

    myPh.on('click', function (e) {
        console.log('canvas被点击啦！！！', e)
    });


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
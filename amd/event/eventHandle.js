///**
// * Created by yuqiangao on 2017/5/15.
// */


define(function (require) {
    var g;
    //当触发全局点击事件时，触发该点击事件
    const isPath = function (path, clickX, clickY) {
        if (g.isPointInPath(clickX, clickY)) {
            path.isSelected = !path.isSelected;
        } else {
            path.isSelected = false;
        }
        return g.isPointInPath(clickX, clickY)
    }
    const onclick = function (e) {
        //do
        const canvas = e.target;
        g = canvas.getContext('2d');
        const clickX = e.pageX - canvas.offsetLeft;
        const clickY = e.pageY - canvas.offsetTop;
        for (var i in eventArray.reverse()) {
            g.beginPath();
            const ac = eventArray[i];
            switch (ac.name) {
                case 'arc':
                    g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
                    if (isPath(ac, clickX, clickY)) {
                        ac.onclick();
                        return;
                    }
                    break;
                case 'rect':
                    g.rect(ac.x, ac.y, ac.width, ac.height);
                    g.lineWidth = ac.lineWidth || 1;
                    if (isPath(ac, clickX, clickY)) {
                        ac.onclick();
                        return;
                    }
                    break;
            }

        }
        //捕获坐标 判断是否在图形上
    };
    const onmousemove = function () {

    };
    const eventArray = [];
    return {onclick: onclick, eventArray: eventArray}

});
//define(function (require) {
//    var g, reDraw;
//    //var baseModel = require('./../base/base');
//    //var main = require('./../main/main');
//    //var myPh = new main();
//    //var base = new baseModel();
//    //reDraw = base.eventArray;
//    //console.log(base.eventArray);
//    var isPath = function (ac, clickX, clickY, i) {//单选不能和任何其他形式共存，多选可以和多选共存。
//        console.log(ac, clickX, clickY, g.isPointInPath(clickX, clickX));
//        //if (!!ac.single) {
//            if (g.isPointInPath(clickX, clickY)) {
//                //if (!ac.canSelected) {
//                //    return;
//                //}
//                //for (var j = 0; j < eventArray.length; j++) {
//                //    eventArray[j].isSelected = false;
//                //}
//                ac.isSelected = !ac.isSelected;
//
//            } else {
//                ac.isSelected = false;
//                console.log('1231231231')
//            }
//        //} else {
//        //    if (g.isPointInPath(clickX, clickY)) {
//        //        if (!ac.canSelected) {
//        //            return;
//        //        }
//        //        ac.isSelected = !ac.isSelected;
//        //    }
//        //}
//
//        if (ac.isSelected) {//点击之后的状态  之后变成高介函数 可以自定义点击之后的样式行为
//            ac.newColor = 'gold';
//        } else if (!ac.isSelected) {
//            ac.newColor = '';
//        }
//        return ac
//    };
//    var onclick = function (e) {
//        var canvas = e.target;
//        g = canvas.getContext('2d');
//        //引入main的redraw  =>main的redraw指向各模块的redraw
//        //只判断是否在path上
//        //点击事件 mouseup mousedown 可以提供外部方法接口
//        //moving事件只修改x，y坐标值进行重绘
//        //点击事件兼顾重绘z功能
//        //不同path的不同事件如何叠加混合
//        var clickX = e.pageX - canvas.offsetLeft;
//        var clickY = e.pageY - canvas.offsetTop;
//        //g.clearRect(0, 0, canvas.width, canvas.height);//改改改
//        for (var i in eventArray) {
//            var ac = eventArray[i];
//            g.beginPath();
//            switch (ac.name) {
//                case 'arc':
//                    g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
//                    isPath(ac, clickX, clickY, i)
//                    break;
//                case 'rect':
//                    g.rect(ac.x, ac.y, ac.width, ac.height);
//                    g.lineWidth = ac.lineWidth || 1;
//                    isPath(ac, clickX, clickY, i)
//                    break;
//            }
//            //可控制是stroke还是fill
//            g.fillStyle = ac.newColor || ac.color;
//            g.fill();
//        }
//    };
//    var onClickCopy = function (fn) {//需修改事件绑定机制  或由用户手动修改
//        //事件绑定无法获取this  所以需要绑定到相应的图形对象上～
//        if (Object.prototype.toString.call(fn) === "[object Function]") {
//            //高介函数
//            reDraw.map(fn);
//        }
//        return false;
//    };
//    const eventArray = [];
//    return {eventArray: eventArray, onclick: onclick, onClickCopy: onClickCopy}
//})

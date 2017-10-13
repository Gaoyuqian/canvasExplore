/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var g, reDraw;
    var baseModel = require('./../base/base');
    var main = require('./../main/main');
    var myPh = new main();
    var base = new baseModel();
    reDraw = base.eventArray;
    console.log(base.eventArray);
    var isPath = function (ac, clickX, clickY, i) {//单选不能和任何其他形式共存，多选可以和多选共存。
        if (!!ac.single) {
            if (g.isPointInPath(clickX, clickY)) {
                if (!ac.canSelected) {
                    return;
                }
                for (var j = 0; j < reDraw.length; j++) {
                    reDraw[j].isSelected = false;
                }
                ac.isSelected = !ac.isSelected;

            } else {
                ac.isSelected = false;
            }
        } else {
            if (g.isPointInPath(clickX, clickY)) {
                if (!ac.canSelected) {
                    return;
                }
                ac.isSelected = !ac.isSelected;
            }
        }

        if (ac.isSelected) {//点击之后的状态  之后变成高介函数 可以自定义点击之后的样式行为
            ac.newColor = 'gold';
        } else if (!ac.isSelected) {
            ac.newColor = '';
        }
        return ac
    };
    var onClick = function (e) {
        var canvas = e.target;
        g = canvas.getContext('2d');
        //引入main的redraw  =>main的redraw指向各模块的redraw
        //只判断是否在path上
        //点击事件 mouseup mousedown 可以提供外部方法接口
        //moving事件只修改x，y坐标值进行重绘
        //点击事件兼顾重绘z功能
        //不同path的不同事件如何叠加混合
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;
        g.clearRect(0, 0, canvas.width, canvas.height);//改改改
        for (var i in reDraw) {
            var ac = reDraw[i];
            g.beginPath();
            switch (ac.name) {
                case 'arc':
                    g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
                    isPath(ac, clickX, clickY, i)
                    console.log(ac);
                    break;
                case 'rect':
                    g.rect(ac.x, ac.y, ac.width, ac.height);
                    g.lineWidth = ac.lineWidth || 1;
                    isPath(ac, clickX, clickY, i)
                    console.log(ac);
                    break;
            }
            //可控制是stroke还是fill
            g.fillStyle = ac.newColor || ac.color;
            g.fill();
        }
    };
    var onClickCopy = function (fn) {//需修改事件绑定机制  或由用户手动修改
        //事件绑定无法获取this  所以需要绑定到相应的图形对象上～
        if (Object.prototype.toString.call(fn) === "[object Function]") {
            //高介函数
            reDraw.map(fn);
        }
        return false;
    };
    return {onClick: onClick, onClickCopy: onClickCopy}

})

/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var isPath = function (ac, clickX, clickY, i) {
        if (ac.single) {
            if (g.isPointInPath(clickX, clickY)) {
                if (!ac.canSelected) {
                    return;
                }
                for (var j = 0; j < redrwaA.length; j++) {
                    if (i != j) {
                        redrwaA[j].isSelected = false;
                    }
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

        if (ac.isSelected) {
            ac.newColor = 'gold';
        } else if (!ac.isSelected) {
            ac.newColor = '';
        }
    }
    var onClick = function (e) {
        var baseModel = require('./../base/base')

        var base = new baseModel();


        //发现问题
        //  arc.js中push到base.eventArray数组中的数并不能在其他页面访问
        var redrwaA =  base.eventArray;
        console.log(base.eventArray);

        var canvas = e.target;
        var g = canvas.getContext('2d');

        //引入main的redraw  =>main的redraw指向各模块的redraw
        //只判断是否在path上
        //点击事件 mouseup mousedown 可以提供外部方法接口
        //moving事件只修改x，y坐标值进行重绘

        //点击事件兼顾重绘功能
        //不同path的不同事件如何叠加混合
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;
        g.clearRect(0, 0, canvas.width, canvas.height);
        for (var i in redrwaA) {
            var ac = redrwaA[i];
            g.beginPath();
            switch (ac.name) {
                case 'arc':
                    g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
                    isPath(ac, clickX, clickY, i)
                    break;
                case 'rect':
                    g.rect(ac.x, ac.y, ac.width, ac.height);
                    g.lineWidth = ac.lineWidth || 1;
                    isPath(ac, clickX, clickY, i)

                    break;
            }
            //可控制是stroke还是fill
            g.fillStyle = ac.newColor || ac.color;
            g.fill();
        }
    }
    return {onClick: onClick}

})

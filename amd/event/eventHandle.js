/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var baseModel = require('./../base/base')
    var base = new baseModel();
    var redrwaA =  base.getEventArray();
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

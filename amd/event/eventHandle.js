///**
// * Created by yuqiangao on 2017/5/15.
// */


define(function (require) {
    var g;
    //当触发全局点击事件时，触发该点击事件
    const isPath = function (path, clickX, clickY) {
        if (g.isPointInPath(clickX, clickY)) {
            eventArray.forEach(function (item) {
                item.isSelected = false;
            })
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
        for (var i in eventArray) {
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


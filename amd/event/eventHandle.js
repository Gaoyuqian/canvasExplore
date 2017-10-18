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
            eventArray[i].init();
            if (isPath(eventArray[i], clickX, clickY)) {
                eventArray[i].onclick();
                return;
            }
        }
    };
    const onmousedown = function () {

    };
    const onmousemove = function () {

    };
    const onmouseup = function () {

    };
    const eventArray = [];
    return {onclick: onclick, eventArray: eventArray}

});


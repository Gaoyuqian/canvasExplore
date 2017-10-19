define(function (require) {
    var g;
    //当触发全局点击事件时，触发该点击事件
    const isPath = function (pathArr, clickX, clickY, g) {
        // 返回所有图形中  onPath的第一个图形 然后调用图形相对应的事件。
        var tempArr = [];
        for (var item = pathArr.length - 1; item >= 0; item--) {
            tempArr.push(pathArr[item]);
        }
        for (var item in tempArr) {
            g.beginPath();
            tempArr[item].init();
            if (g.isPointInPath(clickX, clickY)) {
                return tempArr[item]
            }
        }
    }
    const onclick1 = function (e) {
        const canvas = e.target;
        g = canvas.getContext('2d');
        const clickX = e.pageX - canvas.offsetLeft;
        const clickY = e.pageY - canvas.offsetTop;
        for (var i in ReEventArray) {
            g.beginPath();
            ReEventArray[i].init();
            if (isPath(ReEventArray[i], clickX, clickY)) {
                //do  将属性变为true
                ReEventArray.forEach(function (item) {
                    item.isSelected = false;
                })
                ReEventArray[i].isSelected = !ReEventArray[i].isSelected;
                ReEventArray[i].onclick();
                return;
            } else {
                ReEventArray[i].isSelected = false;
            }
        }
    };
    const onclick = function (e, canvas, pathArr, x, y) {
        const g = canvas.getContext('2d');
        isPath(pathArr, x, y, g)&&isPath(pathArr, x, y, g).onclick();
    };
    const onmousedown = function (e) {
        const canvas = e.target;
        g = canvas.getContext('2d');
        const clickX = e.pageX - canvas.offsetLeft;
        const clickY = e.pageY - canvas.offsetTop;
        for (var i in eventArray) {
            g.beginPath();
            eventArray[i].init();
            if (eventArray[i].canMoving) {
                if (isPath(eventArray[i], clickX, clickY)) {
                    //do  将属性变为true
                    eventArray.forEach(function (item) {
                        item.willMoving = false;
                    })
                    eventArray[i].willMoving = !eventArray[i].willMoving;
                    if (eventArray[i].onmousedown) {
                        eventArray[i].onmousedown();
                    }
                    return;
                } else {
                    eventArray[i].willMoving = false;
                }
            }
        }
    };

    const onmousemove = function (e) {
        const canvas = e.target;
        g = canvas.getContext('2d');
        g.clearRect(0, 0, canvas.width, canvas.height);
        const clickX = e.pageX - canvas.offsetLeft;
        const clickY = e.pageY - canvas.offsetTop;
        eventArray.forEach(function (item) {
            if (item.willMoving) {
                item.x = clickX;
                item.y = clickY;
                //此处添加path的自带事件
                if (item.onmousemove) {
                    item.onmousemove();
                }
            }
            item.draw(e.target);
        })
    };
    const onmouseup = function () {
        eventArray.forEach(function (item) {
            item.willMoving = false;
        })
    };
    const eventArray = [];
    const ReEventArray = [];
    return {
        isPath: isPath,
        onmousemove: onmousemove,
        onmouseup: onmouseup,
        onmousedown: onmousedown,
        onclick: onclick,
        eventArray: eventArray,
        ReEventArray: ReEventArray
    }

});


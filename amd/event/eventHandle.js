define(function (require) {
    var g;
    //当触发全局点击事件时，触发该点击事件
    const isPath = function (path, clickX, clickY) {
        return g.isPointInPath(clickX, clickY)
    }
    const onclick = function (e) {
        const canvas = e.target;
        g = canvas.getContext('2d');
        const clickX = e.pageX - canvas.offsetLeft;
        const clickY = e.pageY - canvas.offsetTop;
        for (var i in eventArray) {
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
                    console.log(eventArray);
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
            }
            item.draw(e.target);
        })
    };
    const onmouseup = function () {
        eventArray.forEach(function (item) {
            item.willMoving = false;
        })
        console.log(eventArray)
    };
    const eventArray = [];
    const ReEventArray = [];
    return {
        onmousemove: onmousemove,
        onmouseup: onmouseup,
        onmousedown: onmousedown,
        onclick: onclick,
        eventArray: eventArray,
        ReEventArray: ReEventArray
    }

});


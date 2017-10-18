/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var eventHandle = require('../event/eventHandle');
    // 为事件服务
    const addEvent = function (self) {
        if (!self.canvas.onclick) {
            self.canvas.onclick = eventHandle.onclick
        }
        if (!self.canvas.onmousemove) {
            self.canvas.onmousemove = eventHandle.onmousemove
        }
    }
    const removeEventArray = function () {
        eventHandle.eventArray.length = 0;
    }
    const addEventArray = function (arg) {
        for (var i in arg) {
            if (arg[i].canSelected) {
                eventHandle.eventArray.push(arg[i]);
            }
            eventHandle.eventArray.reverse();
        }
    }
    return {
        addEventArray: addEventArray,
        addEvent: addEvent,
        removeEventArray: removeEventArray
    };
});
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
        if (!self.canvas.onmousedown) {
            self.canvas.onmousedown = eventHandle.onmousedown
        }
        if (!self.canvas.onmouseup) {
            self.canvas.onmouseup = eventHandle.onmouseup
        }
    };
    const removeEventArray = function () {
        eventHandle.eventArray.length = 0;
    };
    const addEventArray = function (arg) {
        for (var i in arg) {
            if (arg[i].canSelected) {
                eventHandle.eventArray.push(arg[i]);
            }
        }
        for (var item = eventHandle.eventArray.length - 1; item >= 0; item--) {
            eventHandle.ReEventArray.push( eventHandle.eventArray[item]);
        }
        console.log(eventHandle.ReEventArray)
    };
    return {
        addEventArray: addEventArray,
        addEvent: addEvent,
        removeEventArray: removeEventArray
    };
});
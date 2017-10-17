/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var eventHandle = require('../event/eventHandle');
    // 为事件服务
    const addEvent = function () {
        if (!window.onclick) {
            window.onclick = eventHandle.onclick
        }
        if (!window.onmousemove) {
            window.onmousemove = eventHandle.onmousemove
        }
    }
    //const eventArray = [];
    const removeEventArray = function () {
        eventHandle.eventArray.length = 0;
    }
    const addEventArray = function (arg) {
        for (var i in arg) {
            if (arg[i].canSelected) {
                eventHandle.eventArray.push(arg[i]);
            }
        }
    }
    return {
        addEventArray: addEventArray,
        //eventArray: eventArray,
        addEvent: addEvent,
        removeEventArray: removeEventArray
    };
});
/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {

    // 为事件服务？？？
    var base = function () {
        if (this.eventArray) {
        } else {
            this.eventArray = [];
        }
    }
    base.prototype = {
        constructor: base,
        eventArray: [],
        add: function (_this) {
            this.eventArray.push(_this);
        },
        destroy: function () {
            this.eventArray = [];
        },
        getEventArray: function () {
            return this.eventArray;
        }
    }
    return base;

});
/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {

    var base = function () {
        if(this.eventArray){

        }else{
            this.eventArray = [];
        }
    }
    base.prototype = {
        constructor: base,
        add: function (_this) {
            this.eventArray.push(_this);
        },
        destroy: function () {
            this.eventArray = [];
        },
        getEventArray: function () {
            console.log(this);
            return this.eventArray;
        }
    }
    return base;

});
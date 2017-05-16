/**
 * Created by yuqiangao on 2017/5/15.
 */
define(function (require) {
    var init = function(name){
        this.name = name
    }
    init.prototype.create = function(){
        var zj = document.getElementById(this.name);
        console.log(this);
        if (document.getElementById(this.name + '-canvas')) {
            var canvas = document.getElementById(this.name + '-canvas');

        } else {
            var canvas = document.createElement('canvas');
            canvas.width = parseInt(zj.style.width);
            canvas.height = parseInt(zj.style.height);
            canvas.id = this.name + '-canvas';
            zj.appendChild(canvas);
        }
        return canvas
    }
    return init;
});
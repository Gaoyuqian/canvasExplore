/**
 * Created by yuqiangao on 2017/5/11.
 */
define('create', function () {
    var init = function (name) {
        var zj = document.getElementById(name);
        if(document.getElementById(name+'-canvas')){
            var canvas = document.getElementById(name+'-canvas');

        }else{
            var canvas = document.createElement('canvas');
            canvas.width = parseInt(zj.style.width);
            canvas.height = parseInt(zj.style.height);
            canvas.id = name+'-canvas';
            zj.appendChild(canvas);

        }
        return canvas;
    };
    return {init: init};
});

define('arc', ['create'], function (create) {

    var arcArray = [];

    var arc = function arc(option) {
        this.x = option.x;
        this.y = option.y;
        this.r = option.r;
        this.color = option.color;
        this.isSelected = false;
        this.canSelected = option.canSelected;
    }
    var getArc = function (arr) {
        for (var i in arr) {
            var newArc = new arc(arr[i]);
            arcArray.push(newArc);
        }
        return arcArray;
    }

    var drawArc = function (name, option) {
        var canvas = create.init(name)
        var g = canvas.getContext('2d');
        g.clearRect(0, 0, canvas.width, canvas.height);
        for (var i in getArc(option)) {
            g.beginPath();
            var ac = arcArray[i];
            g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
            g.fillStyle = ac.color;
            g.fill();
        }
    }
    return {drawArc: drawArc}
});


require(['arc'], function (arc) {

    arc.drawArc('main', [{x: 444, y:344, r: 100, color: 'green'}, {x: 235, y: 443, r: 100, color: 'black'}]);
    arc.drawArc('main', [{x: 100, y: 100, r: 100, color: 'red'}, {x: 222, y: 222, r: 100, color: 'yellow'}]);

})

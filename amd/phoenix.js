/**
 * Created by yuqiangao on 2017/5/11.
 */
define('create', function () {
    var init = function (name) {
        var zj = document.getElementById(name);
        if (document.getElementById(name + '-canvas')) {
            var canvas = document.getElementById(name + '-canvas');

        } else {
            var canvas = document.createElement('canvas');
            canvas.width = parseInt(zj.style.width);
            canvas.height = parseInt(zj.style.height);
            canvas.id = name + '-canvas';
            zj.appendChild(canvas);

        }
        return canvas;
    };
    return {init: init};
});

define('mouseEvent', ['arc', 'create'], function (arc, create) {
    var canvas = create.init('main')
    var isPath = function (x, y, path) {
        var distanceFromCenter = Math.sqrt(Math.pow(path.x - x, 2) + Math.pow(path.y - y, 2))
        if (distanceFromCenter <= path.r) {//判断点击位置是否在某个圆内
            return true;
        } else {
            return false;
        }
    };
    var onClick = function (e) {
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;
        var arcArray = arc.getArc(null, true);
        var isCover;
        for (var i in arcArray) {
            var ac = arcArray[i];
            isCover = isPath(clickX, clickY, ac);
            ac.isSelected = isCover;
            console.log(ac);

            arc.drawArc('main');
        }
    }
    return {onClick: onClick, isPath: isPath}
})


define('arc', ['create'], function (create) {
    var arcArray = [];
    var arc = function arc(option) {
        this.x = option.x;
        this.y = option.y;
        this.r = option.r;
        this.color = option.color;
        this.newColor = '';
        this.isSelected = false;
        this.canSelected = option.canSelected;
    };

    var getArc = function (arr, isGet) {
        if (!isGet) {
            for (var i in arr) {
                var newArc = new arc(arr[i]);
                arcArray.push(newArc);
            }
        }
        return arcArray;
    };

    var drawArc = function (name, option) {
        var canvas = create.init(name)
        var g = canvas.getContext('2d');
        g.clearRect(0, 0, canvas.width, canvas.height);
        if (option) {
            getArc(option)
        }

        for (var i in arcArray) {
            g.beginPath();
            var ac = arcArray[i];
            ac.isSelected ? ac.newColor = 'red' : ac.newColor = '';
            g.fillStyle = ac.newColor || ac.color;
            g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
            g.fill();
        }
        return this
    };
    return {drawArc: drawArc, getArc: getArc}
});


require(['arc', 'mouseEvent'], function (arc, mouseEvent) {

    arc.drawArc('main', [{x: 444, y: 344, r: 100, color: 'green', canSelected: true}, {
        x: 235,
        y: 443,
        r: 100,
        color: 'black',
        canSelected: true
    }, {x: 100, y: 100, r: 50, color: 'green', canSelected: true}]);
    window.onclick = mouseEvent.onClick;

})

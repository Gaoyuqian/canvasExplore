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
define('arc', ['create'], function (create) {
    var arcArray = [];
    var arc = function arc(option) {
        this.x = option.x;  //x
        this.y = option.y;  //y
        this.r = option.r;  //r
        this.color = option.color;  //颜色
        this.newColor = '';  //重绘颜色
        this.isSelected = false;  //被选中状态
        this.single = option.single;  //是否单选
        this.canSelected = option.canSelected;  //是否可以被选中
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
            if (ac.canSelected && !window.onclick) {
                //绑定事件(目前只绑定点击事件，之后会根据path的定义绑定更多事件)
                document.addEventListener('click', onClick, false);
            }
        }
        return this
    };
    var destroy = function () {
        arcArray = [];
    };
    var isPath = function (x, y, path) {
        var distanceFromCenter = Math.sqrt(Math.pow(path.x - x, 2) + Math.pow(path.y - y, 2))
        if (distanceFromCenter <= path.r && path.canSelected) {//判断点击位置是否在某个圆内
            return true;
        } else {
            return false;
        }
    };
    var onClick = function (e) {
        var canvas = create.init('main');

        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;
        var arcArray = getArc(null, true);
        var isCover;
        for (var i in arcArray) {
            var ac = arcArray[i];
            isCover = isPath(clickX, clickY, ac);
            if (ac.single) {
                if (isCover) {
                    for (var j = 0; j < arcArray.length; j++) {
                        if (i != j) {
                            arcArray[j].isSelected = false;
                        }
                    }
                    ac.isSelected = !ac.isSelected;

                } else {
                    ac.isSelected = false;
                }
            } else {
                if (isCover) {
                    ac.isSelected = !ac.isSelected;
                }
            }
            drawArc('main');
        }
    }

    return {drawArc: drawArc, getArc: getArc, destroy: destroy}
});


require(['arc'], function (arc) {

    arc.drawArc('main', [{x: 444, y: 344, r: 100, color: 'green', canSelected: true}, {
        x: 235,
        y: 443,
        r: 100,
        color: 'black',
        canSelected: true,
        single: true,
    }, {x: 100, y: 100, r: 50, color: 'green', canSelected: true}]);


    //待解决问题
    //  1.解决多选和单选问题   (已解决)
    //  2.所有图形都存在一个数组里
    //  2补充.   同一个种类的图形存放在一个数组里方便分类
    //  4. 其他鼠标事件  给canvas绑定事件可以控制当前canvas上的所有path

})

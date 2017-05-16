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
define('arc', ['base', 'create', 'event'], function (base, create, event) {
    var arcArray = [];

    var arc = function arc(option) {
        this.x = option.x;  //x
        this.y = option.y;  //y
        this.r = option.r;  //r
        this.name = 'arc';
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
                base.add(newArc);
            }
        }
        return arcArray;
    };
    var drawArc = function (name, option) {
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
            g.closePath();

            if (ac.canSelected && !window.onclick) {
                //绑定事件(目前只绑定点击事件，之后会根据path的定义绑定更多事件)
                //添加事件时, 把所有不为空的数组合并到一个事件数组中 循环该数组
                document.addEventListener('click', event.onClick, false);
            }
        }
        return this
    };
    var destroy = function () {
        arcArray = [];
    };

    return {drawArc: drawArc, getArc: getArc, destroy: destroy}
});
define('rect', ['create', 'base'], function (create, base) {
    var rectArray = [];
    var rect = function (option) {
        this.x = option.x;
        this.y = option.y;
        this.width = option.width;
        this.height = option.height;
        this.lineWidth = option.lineWidth;
        this.color = option.color;
        this.name = 'rect';
        this.isSelected = false;  //被选中状态
        this.single = option.single;  //是否单选
        this.canSelected = option.canSelected;  //是否可以被选中
    }
    var getRect = function (arr, isGet) {
        if (!isGet) {
            for (var i in arr) {
                var newRect = new rect(arr[i]);
                rectArray.push(newRect);
                base.add(newRect);
            }
        }
        return rectArray;
    };


    var drawRect = function (name, option) {

        if (option) {
            getRect(option)
        }
        for (var i in rectArray) {
            var rt = rectArray[i];
            g.beginPath();
            g.rect(rt.x, rt.y, rt.width, rt.height);
            g.lineWidth = rt.lineWidth || 1;
            g.fillStyle = rt.color ||  'black';
            g.fill();
            g.closePath();

        }
        console.log(g.isPointInPath(521, 427), g.isPointInPath(224, 225))
    }
    var destroy = function () {
        arcArray = [];
    };

    return {drawRect: drawRect, destroy: destroy}
});

define('base', function () {
    var eventArray = [];
    var add = function (_this) {
        eventArray.push(_this);

    }
    var destroy = function () {
        eventArray = [];
    };
    var getEventArray = function () {
        return eventArray
    }
    return {add: add, destroy: destroy, getEventArray: getEventArray};

});

define('event', ['base'], function (base) {

    var redrwaA = base.getEventArray();
    var isPath = function(ac,clickX,clickY,i){
        if (ac.single) {
            if (g.isPointInPath(clickX, clickY)) {
                if(!ac.canSelected){
                    return;
                }
                for (var j = 0; j < redrwaA.length; j++) {
                    if (i != j) {
                        redrwaA[j].isSelected = false;
                    }
                }
                ac.isSelected = !ac.isSelected;

            } else {
                ac.isSelected = false;
            }
        } else {
            if (g.isPointInPath(clickX, clickY)) {
                if(!ac.canSelected){
                    return;
                }
                ac.isSelected = !ac.isSelected;
            }
        }

        if (ac.isSelected) {
            ac.newColor = 'gold';
        } else if (!ac.isSelected) {
            ac.newColor = '';
        }
    }
    var onClick = function (e) {
        //点击事件兼顾重绘功能
        //不同path的不同事件如何叠加混合
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;
        g.clearRect(0, 0, canvas.width, canvas.height);
        for (var i in redrwaA) {
            var ac = redrwaA[i];
            g.beginPath();
            switch (ac.name) {
                case 'arc':
                    g.arc(ac.x, ac.y, ac.r, 0, 2 * Math.PI);
                    isPath(ac,clickX,clickY,i)
                    break;
                case 'rect':
                    g.rect(ac.x, ac.y, ac.width, ac.height);
                    g.lineWidth = ac.lineWidth || 1;
                    isPath(ac,clickX,clickY,i)

                    break;
            }
            //可控制是stroke还是fill
            g.fillStyle = ac.newColor || ac.color;
            g.fill();
        }
    }
    return {onClick: onClick}

})




require(['create', 'arc', 'rect'], function (create, arc, rect) {
    canvas = create.init('main');
    g = canvas.getContext('2d');
    g.clearRect(0, 0, canvas.width, canvas.height);
    arc.drawArc('main', [{
        x: 235,
        y: 443,
        r: 100,
        color: 'black',
        canSelected: true,
        single: true
    }, {x: 100, y: 100, r: 50, color: 'green', canSelected: true}, {
        x: 500,
        y: 500,
        r: 50,
        color: 'green',
    }]);
    rect.drawRect('main', [{
        x: 444, y: 344, width: 100, height: 100, color: 'green', canSelected: true
    }, {
        x: 222,
        y: 222,
        width: 100,
        height: 100,
        color: 'green',
        lineWidth:8
    }])


    //单文件代码


    //待解决问题
    //  1.解决多选和单选问题   (已解决)
    //  2.所有图形都存在一个数组里 （可操作的图形存在一个数组里）
    //  4. 其他鼠标事件  给canvas绑定事件可以控制当前canvas上的所有path
})
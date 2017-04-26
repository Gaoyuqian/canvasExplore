(function() {
    var H, W, animationCurve, canvas, colorStops, getColors, i, k, lut, maxDraws, numDraws, pMax, rand, render, row, speed, step, styles, transformations, v, xRange, xSpan, yRange, ySpan, _i, _len, _ref;

    speed = 11;  //画点的速度

    W = 350;  //叶子宽

    H = 500;   //叶子高

    transformations = [       // 一个立即执行函数数组
                                //猜测和树的倾斜度有关，包括点的密集程度
        [
            (function(x, y) {
                return 0;
            }), (function(x, y) {
            return 0.16 * y;
        }), 1
        ], [
            (function(x, y) {
                return 0.2 * x - 0.26 * y;
            }), (function(x, y) {
                return 0.23 * x + 0.22 * y + 1.6;
            }), 7
        ], [
            (function(x, y) {
                return -0.15 * x + 0.28 * y;
            }), (function(x, y) {
                return 0.26 * x + 0.24 * y + 0.44;
            }), 7
        ], [
            (function(x, y) {
                return 0.85 * x + 0.04 * y;
            }), (function(x, y) {
                return -0.04 * x + 0.85 * y + 1.6;
            }), 85
        ]
    ];

    maxDraws = 200000;  //最大点数。可能有是区间值

    xRange = [-2.182, 2.6558];

    yRange = [0, 9.9983]; //和 w h 一起 控制叶子形状 宽和高

    canvas = document.getElementById("world");  //获取canvas

    canvas.width = W;

    canvas.height = H;

    styles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: "-" + (~~(H / 2)) + "px 0 0 -" + (~~(W / 2)) + "px"  //控制整个canvas图形的绘画区域  ～为异或运算
    };

    colorStops = [[0, "rgba(255,255,255,1)"], [1000, "rgba(253,253,52,0.6)"], [5000, "rgba(0,171,56,0.7)"], [10000, "rgba(168,210,110,0.7)"], [20000, "rgba(246,243,27,0.6)"], [40000, "rgba(138,215,39,0.7)"], [65000, "rgba(243,205,8,0.5)"], [90000, "rgba(150,204,104,0.4)"], [125000, "rgba(137,230,101,0.5)"], [150000, "rgba(246,243,27,0.5)"], [190000, "rgba(255,255,255,0.8)"]];
    //[判断条件,点的颜色]

    animationCurve = function(frame) {
        if (frame < 1000) return 25;
        if (frame < 5000) return 50;
        if (frame < 10000) return 75;
        if (frame < 20000) return 100;
        if (frame < 40000) return 150;
        if (frame < 65000) return 250;
        if (frame < 90000) return 400;
        if (frame < 150000) return 600;
        if (frame < 190000) return 400;
        if (frame < 200000) return 100;
    };

    lut = {};

    numDraws = 0;

    pMax = 0;

    for (_i = 0, _len = transformations.length; _i < _len; _i++) {  //循环立即执行函数数组
        row = transformations[_i];   //row为嵌套内数组
        for (i = pMax, _ref = row[2] + pMax - 1; pMax <= _ref ? i <= _ref : i >= _ref; pMax <= _ref ? i++ : i--) {
            lut[i] = [row[0], row[1]];
        }
        pMax += row[2];
    }

    getColors = function() {    //获取颜色
        var colors;
        colors = colorStops.slice();  //color是数组类型
        return function() {
            var colorStop;
            if (!(colors[0] && numDraws >= colors[0][0])) return;  //点的范围区间为1000-190000  每一个区间都有不同的颜色  最多画190000个点
            colorStop = colors.shift();
            return ctx.fillStyle = colorStop[1]; //填充颜色
        };
    };

    for (k in styles) {
        v = styles[k];
        canvas.style[k] = v;
    }

    window.ctx = canvas.getContext("2d");//绘制开始

    xSpan = xRange[1] - xRange[0];//获取x区间

    ySpan = yRange[1] - yRange[0];//获取y区间

    window.updateColor = getColors();

    render = function() {
        var drawsPerFrame, f, i, iter, x, y, _ref2, _ref3;
        if (numDraws > maxDraws) return;
        updateColor();
        drawsPerFrame = speed * animationCurve(numDraws); // 返回绘图速率
        for (i = 0; 0 <= drawsPerFrame ? i <= drawsPerFrame : i >= drawsPerFrame; 0 <= drawsPerFrame ? i++ : i--) {
            iter = 0;
            _ref2 = [rand(xRange[0], xRange[1]), rand(yRange[0], yRange[1])], x = _ref2[0], y = _ref2[1];
            while (iter++ < 50) {
                f = lut[~~rand(0, pMax)];
                _ref3 = [f[0](x, y), f[1](x, y)], x = _ref3[0], y = _ref3[1];
            }
            x = W * (x - xRange[0]) / xSpan;
            y = H * (1 - y / ySpan);
            ctx.fillRect(x, y, 1, 1);
        }
        return numDraws += drawsPerFrame;
    };

    window.onclick = function() {
        numDraws = 0;
        window.updateColor = getColors();
        return ctx.clearRect(0, 0, W, H);
    };

    rand = function(a, b) {
        return (b - a) * Math.random() + a;
    };

    window.requestAnimationFrame || (window.requestAnimationFrame = (function() {
        var prefix, r, _j, _len2, _ref2;
        _ref2 = ['webkit', 'moz', 'ms', 'o'];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
            prefix = _ref2[_j];
            if (r = window["" + prefix + "RequestAnimationFrame"]) return r;
        }
        return function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })());

    (step = function() {
        return requestAnimationFrame(step) && render();
    })();

}).call(this);
/**
 * Created by yuqiangao on 2017/4/11.
 */

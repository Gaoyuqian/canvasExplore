/**
 * Created by yuqiangao on 2017/4/20.
 */
var bing = {
    color: [
        'blue', 'green', 'red', 'yellow', 'black'
    ],

    init: function (data) {
        /*构思
         1.接受参数为对象，对象的值为  [{name:value,point:value}]
         2.分多个阶段画圆，每一个对象中的值对应一部分圆形线条，按百分比计算对应的大小
         3.实现时，多个圆同时开始绘画，颜色随机或枚举。预计使用定时器。
         4.适配不同场景。

         q:若要判断点是否在绘制的图形上，可能需要多个canvas绘制方法而非单一的方法绘制多次。
         c.isPointInPath();判断点是否在路径上 返回boolean
         */
        /*未完成
          4
                触摸特效，绑定重绘
         */

        var total = 0
        for (let i of data) {
            total += i.value;
        }
        var canvas = document.getElementById('bing');
        var c = canvas.getContext('2d');
        var canvasa = document.getElementById('binga');
        var c1 = canvasa.getContext('2d');
        this.drawa(c, total, data);
        this.drawb(c1);

    },
    drawa: function (c, total, data) {//画圆环图
        var o = 0;
        var first = 0;
        var bili = 0
        for (let i of data) {
            bili += i.value / total * 2;
            c.beginPath();
            c.arc(200, 200, 100, first * Math.PI, bili * Math.PI);
            c.strokeStyle = this.color[o++];
            c.lineWidth = '40';
            c.stroke();
            first = bili;
        }
    },
    drawb: function (c1) {//画饼图
        c1.beginPath();
        c1.font="20px Georgia";
        c1.fillStyle='black';
        c1.fillText('哈哈哈哈哈哈',0,55)
        c1.fill();

    }
}
window.onload = function(){
    bing.init([{'name': '蚂蚁金服', 'value': 3333}, {'name': '饿了么', 'value': 3333},{'name': '饿了么', 'value': 3333},{'name': '饿了么', 'value': 3333}, {
        'name': '百度贴吧',
        'value': 2222
    }])
}
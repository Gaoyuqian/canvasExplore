/**
 * Created by yuqiangao on 2017/4/19.
 * end  2017/4/20 6.30
 */
var JDT = {
    biaoshi:false,
    init: function (first, end, text,WZ) {
        // argument     起始点， 最好是0
        // argument     结束点， 支持小数或百分比
        //  目前不支持获取文档   =>默认画一个和canvas一样大的圆=>获取多个canvas=>？？？？
        //圆形的路径是fill看出来的 并不是stroke 所以 pointInPath 并不能准确的找到圆内部的点
        //半成品


        var canvas = document.getElementById('right-a');
        var c = canvas.getContext('2d');
        var canvasa = document.getElementById('right-b');
        var c1 = canvasa.getContext('2d');
        var end = 2*end;
        var i = 0;
        c.clearRect(60, 50, canvas.width, canvas.height);
        this.drawJ(c, this.format(first), this.format(end), first,WZ);
        draw = setInterval(function () {
            i++;
            var now = JDT.format(first) + i/10;
            JDT.drawJ(c, JDT.format(first), JDT.format(end), now, WZ)
        }, 20);
        canvas.addEventListener('mousemove',function(e){
            (c.isPointInPath(e.clientX-canvas.offsetLeft-40,e.clientY-canvas.offsetTop-40)||c.isPointInPath(e.clientX-canvas.offsetLeft+40,e.clientY-canvas.offsetTop+40))?JDT.drawText(c1,text,JDT.biaoshi):JDT.changeBiaoShi(c1,JDT.biaoshi);
        })
    },
    drawJ: function (c,first,end,now,WZ) {
        var first = first+1.5;
        var end = end+1.5;
        var now = now+1.5;
        var isWZ =false ;
        if((end-1.5)%2 == 0 ){
            isWZ = true;
        }
        if(parseFloat(now.toFixed(1))==parseFloat((end+0.1).toFixed(1))){//画到了终点
            clearInterval(draw);//清除定时器
            if(WZ||isWZ){//如果想画完整的圆e
                c.beginPath();
                c.arc(200,200,100,first*Math.PI,(end%2+2)*Math.PI)
                c.strokeStyle = 'red';
                c.lineWidth = '40';
                c.stroke();
                return;
            }
            return;//结束
        }
        c.beginPath();
        c.arc(200, 200, 100, (first%2) * Math.PI, (now%2) * Math.PI);
        c.strokeStyle = 'red';
        c.lineWidth = '40';
        c.stroke()
    },
    format:function(num){
        if(num>2){
            return num%2;
        }else{
            return num;
        }
    },
    changeBiaoShi:function(c){
        c.clearRect(0,0,100,100);
        JDT.biaoshi = false;
    },
    drawText:function(c,text,biaoshi){//通过文字的长度计算位置
        var leg = text.length;


        if(!biaoshi){
            c.beginPath();
            c.fillStyle = '#ff5700';
            c.font = '25px verdana';
            c.fillText(text,(100-leg*25)/2,100/2+5);
            c.restore()
        }
        JDT.biaoshi = true;
    }
}
/**
 * Created by yuqiangao on 2017/5/8.
 */
//公共方法库


function getRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}//获取随机坐标



function remove(arg, index) {
    arg.splice(index, 1);
}
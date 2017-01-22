$(function () {
    //判断页面中间区域的高度，决定尾部的位置，
    //当底部的自身高度＋距离顶部的高度小于屏幕可视高度，那么底部就定位到屏幕底部
    var hei = $(window).height();
    //获取底部的自身高度
    var footer = $(".footer").height();
    //距离顶部的高度
    var hei1 = $(".footer").offset().top;
    //设置最小高度
    if ((footer + hei1) < hei) {
        $(".footer").css({"position": "fixed", "bottom": 0, "left": 0})
    }
});
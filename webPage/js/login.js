$(function(){
	//占满屏幕
	//获取窗口高度
    var height = $(window).height();
    var width = $(window).width();
    if(width > 768){
    	$(".wrap").css("height", height);
    }
    
    console.log(height);
});
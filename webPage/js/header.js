/**
 * Created by sheldon on 1/19/2017.
 */
(function($){
    $(function(){
        //????????
        /*$(".navbar-left>li").bind('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
        });*/
        $(".a_href").each(function(){
		    if($($(this))[0].href==String(window.location))
		        $(this).parent().addClass('active');
		});
    });
})(jQuery);
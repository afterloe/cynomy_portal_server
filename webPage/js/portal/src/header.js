/**
 * Created by sheldon on 1/19/2017.
 */
(function($) {
    $(function() {
        //????????
        /*$(".a_href").bind('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
        });*/

        $(".a_href").each(function() {
            if ($($(this))[0].href == String(window.location))
                $(this).parent().addClass('active');
            }
        );

    });
})(jQuery);

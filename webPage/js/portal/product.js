$(function() {
    //弹窗出来后的一些操作
    var input = document.getElementById("source");
    //文件域选择文件时, 执行readFile函数,把上传的文档信息放置dataFile中
    input.addEventListener('change', readFile, false);
    var i = 1;
    function readFile() {
        var file = this.files[0];
        console.log(file)
        console.log("文件名:" + file.name);
        console.log("文件类型:" + file.type);
        console.log("文件大小:" + file.size);
        var date = new Date();
        var dateString = date.toLocaleDateString();

        //把每次上传的文档名字传入dataFile
        var html = "<li><span>" + (i++) + "、</span><span>" + file.name + "</span><span>" + dateString + "</span><span class='closeFile'></span></li>";
        $(".dataFile").append(html);
        //点击关闭按钮，取消该项文档的添加
        $(".closeFile").on("click", function() {
            console.log($(this).parent("li"))
            $(this).parent("li").remove();
        });
    }
    //关闭遮罩层
    $(".btn_close").on("click", function() {
        $(".popup").css("display", "none");
    });
    //打开遮罩层
    $(".upload").on("click", function() {
        $(".popup").css("display", "block");
    });

    //点击关闭按钮，取消该项文档的添加
    $(".dataClose").on("click", function() {
        console.log($(this).parent("div").parent("li"))
        $(this).parent("div").parent("li").remove();
    });

    //进入该页面，content_one从上往下运动
    var width = $(window).width();
    if (width > 768) {
        var contentOne = $(".content_one").height();
        console.log(contentOne);
        var height = -contentOne;
        console.log(typeof height);
        $(".content_one").css("margin-top", height);
        $(".content_one").animate({
            "margin-top": 0
        }, 1000, function() {
            $(".content_one").css("margin-top", 0);
        });
        //根据ul.data的内容，改变tab每个li的背景图片
        if ($(".dataPlan").find("li").length > 0) {
            $(".plan").css("background", "url(http://almcloud.jwis.cn/images/portal/3.1.1.png) no-repeat left center");

        }
        if ($(".dataDesign").find("li").length > 0) {
            $(".design").css("background", "url(http://almcloud.jwis.cn/images/portal/3.2.2.png) no-repeat left center");

        }
        if ($(".dataDevelopment").find("li").length > 0) {
            $(".development").css("background", "url(http://almcloud.jwis.cn/images/portal/3.3.3.png) no-repeat left center");

        }
        if ($(".dataTest").find("li").length > 0) {
            $(".test").css("background", "url(http://almcloud.jwis.cn/images/portal/3.4.4.png) no-repeat left center");

        }
        if ($(".dataRelease").find("li").length > 0) {
            $(".release").css("background", "url(http://almcloud.jwis.cn/images/portal/3.5.5.png) no-repeat left center")

        };
        //当每个ul下都有上传的文档时，更换产品菜单的背景图
        if ($(".dataRelease").find("li").length > 0 && $(".dataTest").find("li").length > 0 && $(".dataDevelopment").find("li").length > 0 && $(".dataDesign").find("li").length > 0 && $(".dataPlan").find("li").length > 0) {
            $(".plan").css("background", "url(http://almcloud.jwis.cn/images/portal/plan.png) no-repeat left center");
            $(".design").css("background", "url(http://almcloud.jwis.cn/images/portal/design.png) no-repeat left center");
            $(".development").css("background", "url(http://almcloud.jwis.cn/images/portal/development.png) no-repeat left center");
            $(".test").css("background", "url(http://almcloud.jwis.cn/images/portal/test.png) no-repeat left center");
            $(".release").css("background", "url(http://almcloud.jwis.cn/images/portal/release.png) no-repeat left center")
        }
    } else {
        $(".content_one").css("margin-top", 0);
        //根据ul.data的内容，改变tab每个li的背景图片
        if ($(".dataPlan").find("li").length > 0) {
            $(".plan").css("background", "url(http://almcloud.jwis.cn/images/portal/c44.png) no-repeat left center");

        }
        if ($(".dataDesign").find("li").length > 0) {
            $(".design").css("background", "url(http://almcloud.jwis.cn/images/portal/c55.png) no-repeat left center");

        }
        if ($(".dataDevelopment").find("li").length > 0) {
            $(".development").css("background", "url(http://almcloud.jwis.cn/images/portal/1.5.png) no-repeat left center");

        }
        if ($(".dataTest").find("li").length > 0) {
            $(".test").css("background", "url(http://almcloud.jwis.cn/images/portal/c77.png) no-repeat left center");

        }
        if ($(".dataRelease").find("li").length > 0) {
            $(".release").css("background", "url(http://almcloud.jwis.cn/images/portal/c88.png) no-repeat left center")

        };
        //当每个ul下都有上传的文档时，更换产品菜单的背景图
        if ($(".dataRelease").find("li").length > 0 && $(".dataTest").find("li").length > 0 && $(".dataDevelopment").find("li").length > 0 && $(".dataDesign").find("li").length > 0 && $(".dataPlan").find("li").length > 0) {
            $(".plan").css("background", "url(http://almcloud.jwis.cn/images/portal/1.3.png) no-repeat left center");
            $(".design").css("background", "url(http://almcloud.jwis.cn/images/portal/1.4.png) no-repeat left center");
            $(".development").css("background", "url(http://almcloud.jwis.cn/images/portal/1.5.png) no-repeat left center");
            $(".test").css("background", "url(http://almcloud.jwis.cn/images/portal/1.6.png) no-repeat left center");
            $(".release").css("background", "url(http://almcloud.jwis.cn/images/portal/1.7.png) no-repeat left center")
        }
    }

    //wrapper中默认显示第一个产品的第一个产品值
    var element = $(".pc_content").find(".pcBox:first-child");
    var li = element.find("ul li:first-child");
    var val = li.find("span").html().trim();
    console.log(val);
    $(".titlePlan").html(val);
    $(".titleDesign").html(val);
    $(".titleDevelopment").html(val);
    $(".titleTest").html(val);
    $(".titleRelease").html(val);

    //点击不同端的不同产品，相应的改变wrapper中的值
    $(".aLink").on("click", function() {
        //获取此时点击的产品的值
        var $link = $(this).html().trim();
        console.log($link);
        $(".titlePlan").html($link);
        $(".titleDesign").html($link);
        $(".titleDevelopment").html($link);
        $(".titleTest").html($link);
        $(".titleRelease").html($link);
        /*$(this).addClass("activeLink");
		$(this).parent("li").siblings().find(".aLink").removeClass("activeLink");*/
    });

});

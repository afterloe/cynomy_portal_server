$(function(){
	//进入该页面，content_one从上往下运动
	var width = $(window).width();
	if(width > 768){
		var contentOne = $(".content_one").height();
		console.log(contentOne);
		var height = -contentOne;
		console.log(typeof height);
		$(".content_one").css("margin-top",height);
		$(".content_one").animate({"margin-top":0},1000,function(){
			$(".content_one").css("margin-top",0);
		});
		//根据ul.data的内容，改变tab每个li的背景图片
		if($(".dataPlan").find("li").length > 0){
			$(".plan").css("background","url(images/3.1.1.png) no-repeat left center");
			$(".plan").closest("li").find(".product").addClass("ac");
		}
		if($(".dataDesign").find("li").length > 0){
			$(".design").css("background","url(images/3.2.2.png) no-repeat left center");
			$(".design").closest("li").find(".product").addClass("ac");
		}
		if($(".dataDevelopment").find("li").length > 0){
			$(".development").css("background","url(images/3.3.3.png) no-repeat left center");
			$(".development").closest("li").find(".product").addClass("ac");
		}
		if($(".dataTest").find("li").length > 0){
			$(".test").css("background","url(images/3.4.4.png) no-repeat left center");
			$(".test").closest("li").find(".product").addClass("ac");
		}
		if($(".dataRelease").find("li").length > 0){
			$(".release").css("background","url(images/3.5.5.png) no-repeat left center")
			$(".release").closest("li").find(".product").addClass("ac");
		};

	}else{
		$(".content_one").css("margin-top",0);
		//根据ul.data的内容，改变tab每个li的背景图片
		if($(".dataPlan").find("li").length > 0){
			$(".plan").css("background","url(images/c44.png) no-repeat left center");
			$(".plan").closest("li").find(".product").addClass("ac");
		}
		if($(".dataDesign").find("li").length > 0){
			$(".design").css("background","url(images/c55.png) no-repeat left center");
			$(".design").closest("li").find(".product").addClass("ac");
		}
		if($(".dataDevelopment").find("li").length > 0){
			$(".development").css("background","url(images/c66.png) no-repeat left center");
			$(".development").closest("li").find(".product").addClass("ac");
		}
		if($(".dataTest").find("li").length > 0){
			$(".test").css("background","url(images/c77.png) no-repeat left center");
			$(".test").closest("li").find(".product").addClass("ac");
		}
		if($(".dataRelease").find("li").length > 0){
			$(".release").css("background","url(images/c88.png) no-repeat left center")
			$(".release").closest("li").find(".product").addClass("ac");
		};
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
	$(".aLink").on("click",function(){
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
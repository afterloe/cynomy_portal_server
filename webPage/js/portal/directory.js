$(function(){
	//弹窗出来后的一些操作
	var input = document.getElementById("source");
	//文件域选择文件时, 执行readFile函数,把上传的文档信息放置dataFile中
	input.addEventListener('change',readFile,false);
	var i = 1;
	function readFile(){ 
	    var file = this.files[0]; 
	    console.log(file)
	    console.log("文件名:"+file.name);
		console.log("文件类型:"+file.type);
		console.log("文件大小:"+file.size);
		var date =  new Date();
		var dateString = date.toLocaleDateString();

		//把每次上传的文档名字传入dataFile
		var html = "<li><span>"+(i++)+"、</span><span>"+file.name+"</span><span>"+dateString+"</span><span class='closeFile'></span></li>";
		$(".dataFile").append(html);	
		//点击关闭按钮，取消该项文档的添加
		$(".closeFile").on("click",function(){
			console.log($(this).parent("li"))
			$(this).parent("li").remove();
		});
	}
	//关闭zhezhaoc
	$(".btn_close").on("click",function(){
		$(".popup").css("display","none");
	});
	//打开遮罩层
	$(".upload").on("click",function(){
		$(".popup").css("display","block");
	});

	//点击关闭按钮，取消该项文档的添加
	$(".dataClose").on("click",function(){
		console.log($(this).parent("div").parent("li"))
		$(this).parent("div").parent("li").remove();
	});

});
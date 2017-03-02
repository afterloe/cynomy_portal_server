(function($){
    $(function(){
        let $save = $(".save");
        let targetPage = "platform";

        const ajaxData = path => {
          $.ajax({
            type: "GET",
            url: `/workflow/${path}`,
            dataType: "json",
            beforeSend: xhr => xhr.setRequestHeader("accept","application/json"),
            success: result => {
              if (401.5 === result.code) {
                alert("登录许可已失效，请重新获取登录许可");
                location.href = "/portal/login";
                return ;
              }
              if (200 !== result.code) {
                alert("服务器繁忙");
              } else {
                loadData(result.result);
              }
            }
          });
        };

        // 点击反馈跳转到bbs
        $(".feedback").bind("click", function() {
            window.open("http://bbs.jwis.cn");
        });

        // 目录点击
        $(".dir-menu>li").bind("click",function(){
            let $this = $(this);
            if($(".catalogShadow >div").is(":visible")){
                //标记可见时  才允许切换
                let index = $(".dir-menu>li").index($this);
                let $currentCataMark = $(".currentCataMark" +  (index + 1));
                $currentCataMark.show();
                $currentCataMark.siblings().hide();
            }
            targetPage=$(this).attr("data-type");
            ajaxData($this.attr("data-path"));
        });

        // 点击平台
        $(".content").on("mousedown",'.platformName',function(e){
            if(e.button != "2") {
              return; //非右键单击  不响应
            }
            let $this = $(this);
            if('pointer' != $this.css('cursor')){
              return; //不是允许点击的样式 不响应
            }
            let $menu = $this.find('.menu');
            if(!$menu.length){
                $menu = $(".menu:first");
                $this.append($menu);
            }
            $menu.css({
                top:e.offsetY +　10,
                left: e.offsetX +　10
            }).show();

            return false;
        });

        // 点击弹出菜单
        $(".content").on("click",'.menu>p',function(){
            $(this).parent().hide();
        });

        $("body").bind("click",function(e){
            //取消弹出菜单
            let $target = $(e.target);
            if(!$target.hasClass('platformName') && !$target.parent().hasClass('platformName')){
                $(".menu").hide();
            }
        });

        // 点击产品名
        $(".content").on("click",'.productName',function(){
            // 跳转到TRU平台导航栏中对应的该产品的信息
            // const id = $(this).attr("data-id");
            // window.location.href = `/workflow/${id}`;
            window.location.href = "/portal/" + targetPage;
        });

        // 点击产品链接
        $(".content").on("click",'.productLink',function(){
            // 跳转到产品对应的主页信息
            const url = $(this).attr("data-link");
            window.open(url);
        });

        // 删除平台
        $(".content").on("click",'.del',function(){
            $(this).parent().parent().parent().remove();
        });

        // 增加同级
        $(".content").on("click",'.addNext',function(){
            let  $firstPlatform = $(".platform:first");
            $(this).parent().parent().parent().before($firstPlatform.clone().addClass('platformEdit'));
            // 显示保存按钮
            if(!$save.is(':visible')){
              $save.show();
            }

        });

        //增加子级
        $(".content").on("click",'.addSub',function(){
            let  [$firstProduct,$platform]= [$(".product:first"),$(this).parent().parent().parent()];
            $platform.find('.platformDetail').prepend($firstProduct.clone().addClass('productSubEdit'));
            //显示保存按钮
            if(!$save.is(':visible')){
              $save.show();
            }
        });

        //点击保存，console输入的值
        $(".save").bind('click',function(){
            let $platformEdit = $(".platformEdit"); //编辑的同级
            for(var i = 0;i<$platformEdit.length;i++){
                let $platform = $($platformEdit[0]);
                console.log($platform.find(".platformName >input").val());//平台名

                let $products = $platform.find('.product');
                for(var j = 0;j<$products.length;j++){
                    let $product = $($products[0]);
                    console.log($product.find(".productName").val());//应用名
                    console.log($product.find(".linkURL").val());//应用链接地址
                    $product.find(".productLink").attr('data-link',$product.find(".linkURL").val()); //赋值到icon
                }
            }

            let $productEdited = $(".productSubEdit"); //编辑的子级
            for(var j = 0;j<$productEdited.length;j++){
                let $product = $($productEdited[0]);
                console.log($product.find(".productName").val());//应用名
                console.log($product.find(".linkURL").val());//应用链接地址
                $product.find(".productLink").attr('data-link',$product.find(".linkURL").val()); //赋值到icon
            }

            //删除编辑的样式
            $(".platform").removeClass('platformEdit');
            $(".product").removeClass('productSubEdit');
            $("input").attr('readonly','false');
            $("input").removeAttr("readonly");
            //$(".form-control").removeAttr("readonly");
            $(this).hide();
        });

        const loadData = data => {
          $(".table-responsive tbody").html("");
          let [$firstPlatform, $firstProduct, $platform, $product] = [$(".platform:first")];
          for(let platform of data){
              $platform = $firstPlatform.clone();
              $platform.find(".platformName>input").val(platform.platformName).attr("readonly", "true");
              //$platform.find(".platformName>input").val(platform.platformName);

              $firstProduct = $platform.find(".product").clone();
              $platform.find(".product").remove();

              let $products = $platform.find(".platformDetail");
              for(let product of platform.products){
                  $product = $firstProduct.clone();
                  $product.find(".productName").val(product.productName).attr("readonly", "true").attr("data-id", product.produceId);
                  $product.find(".productLink").attr("data-link", product.productLink);

                  let status = product.status || [];
                  for(let sta of status){
                    let $newStatus = $(".productStatus>li:first").clone();
                    $newStatus.addClass("planStatus" + sta.index).show();
                    $product.find(".productStatus").append($newStatus);
                  }
                  $products.append($product);
              }
              $("tbody").append($platform);
          }
        };

        ajaxData("overviews/platform"); // 进入页面自动加载数据
    });
})(jQuery);

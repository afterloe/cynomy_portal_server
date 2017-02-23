/**
 * Created by sheldon on 1/19/2017.
 */
(function($) {
    $(function() {
        let $save = $(".save");

        //目录点击
        $(".dir-menu>li").bind('click', function() {
            let $this = $(this);
            if ($(".catalogShadow >div").is(":visible")) {
                //标记可见时  才允许切换
                let index = $(".dir-menu>li").index($this);
                let $currentCataMark = $(".currentCataMark" + (index + 1));
                $currentCataMark.show();
                $currentCataMark.siblings().hide();
            }
        });

        //点击平台
        $(".content").on("mousedown", '.platformName', function(e) {
            if (e.button != "2") {
                return; //非右键单击  不响应
            }
            let $this = $(this);
            if ('pointer' != $this.css('cursor'))
                return; //不是允许点击的样式 不响应
            let $menu = $this.find('.menu');
            if (!$menu.length) {
                $menu = $(".menu:first");
                $this.append($menu);
            }
            $menu.css({
                top: e.offsetY + 10,
                left: e.offsetX + 10
            }).show();
            return false;
        });

        //点击弹出菜单
        $(".content").on("click", '.menu>p', function() {
            $(this).parent().hide();
        });

        $("body").bind("click", function(e) {
            //取消弹出菜单
            let $target = $(e.target);
            if (!$target.hasClass('platformName') && !$target.parent().hasClass('platformName')) {
                $(".menu").hide();
            }
        });

        //点击产品名
        $(".content").on("click", '.productName', function() {
            //跳转到TRU平台导航栏中对应的该产品的信息
        });

        /**点击产品链接
         * TRU Mate 超链：market portal上pc mate的下载地址
         *TRU Enterprise超链：API Server首页地址
         *TRU Marketplace超链：Market Portal首页地址
         */
        $(".content").on("click", '.productLink', function() {});

        //删除平台
        $(".content").on("click", '.del', function() {
            $(this).parent().parent().parent().remove();
        });

        //增加同级
        $(".content").on("click", '.addNext', function() {
            let $firstPlatform = $(".platform:first");
            $(this).parent().parent().parent().before($firstPlatform.clone().addClass('platformEdit'));
            //显示保存按钮
            if (!$save.is(':visible')) {
                $save.show();
            }

        });

        //增加子级
        $(".content").on("click", '.addSub', function() {
            let [$firstProduct,
                $platform] = [$(".product:first"), $(this).parent().parent().parent()];
            $platform.find('.platformDetail').prepend($firstProduct.clone().addClass('productSubEdit'));
            //显示保存按钮
            if (!$save.is(':visible')) {
                $save.show();
            }
        });

        //点击保存，console输入的值
        $(".save").bind('click', function() {
            let $platformEdit = $(".platformEdit"); //编辑的同级
            for (var i = 0; i < $platformEdit.length; i++) {
                let $platform = $($platformEdit[0]);
                console.log($platform.find(".platformName >input").val()); //平台名

                let $products = $platform.find('.product');
                for (var j = 0; j < $products.length; j++) {
                    let $product = $($products[0]);
                    console.log($product.find(".productName").val()); //应用名
                    console.log($product.find(".linkURL").val()); //应用链接地址
                    $product.find(".productLink").attr('data-link', $product.find(".linkURL").val()); //赋值到icon
                }
            }

            let $productEdited = $(".productSubEdit"); //编辑的子级
            for (var j = 0; j < $productEdited.length; j++) {
                let $product = $($productEdited[0]);
                console.log($product.find(".productName").val()); //应用名
                console.log($product.find(".linkURL").val()); //应用链接地址
                $product.find(".productLink").attr('data-link', $product.find(".linkURL").val()); //赋值到icon
            }

            //删除编辑的样式
            $(".platform").removeClass('platformEdit');
            $(".product").removeClass('productSubEdit');
            $("input").attr('readonly', 'false');
            $("input").removeAttr("readonly");
            //$(".form-control").removeAttr("readonly");
            $(this).hide();
        });

        /**
         * 初始化  请求数据
         */
        let data = [
            {
                platformName: '平台1',
                products: [
                    {
                        productName: 'TRU Matsfsdfsdfsdsde V1.0.1',
                        productLink: 'tru.jwis.cn',
                        status: [1, 2, 3, 4]
                    }, {
                        productName: 'TRU Matsfsdfsdfsdsde V1.0.1',
                        productLink: 'tru.jwis.cn',
                        status: [1, 2, 3, 4]
                    }
                ]
            }, {
                platformName: '平台1',
                products: [
                    {
                        productName: 'TRU Matsfsdfsdfsdsde V1.0.1',
                        productLink: 'tru.jwis.cn',
                        status: [1, 2, 3, 4]
                    }, {
                        productName: 'TRU Matsfsdfsdfsdsde V1.0.1',
                        productLink: 'tru.jwis.cn',
                        status: [1, 2, 3, 4]
                    }
                ]
            }, {
                platformName: '平台1',
                products: [
                    {
                        productName: 'TRU Matsfsdfsdfsdsde V1.0.1',
                        productLink: 'tru.jwis.cn',
                        status: [1, 2, 3, 4]
                    }, {
                        productName: 'TRU Matsfsdfsdfsdsde V1.0.1',
                        productLink: 'tru.jwis.cn',
                        status: [1, 2, 3, 4]
                    }
                ]
            }
        ];

        let [$firstPlatform,
            $firstProduct,
            $platform,
            $product] = [$(".platform:first")];

        for (let platform of data) {
            $platform = $firstPlatform.clone();
            $platform.find(".platformName>input").val(platform.platformName).attr('readonly', 'true');
            //$platform.find(".platformName>input").val(platform.platformName);

            $firstProduct = $platform.find('.product').clone();
            $platform.find('.product').remove();

            let $products = $platform.find(".platformDetail");
            for (let product of platform.products) {
                $product = $firstProduct.clone();
                $product.find('.productName').val(product.productName).attr('readonly', 'true');
                $product.find('.productLink').attr('data-link', product.productLink);

                let status = product.status;
                $product.find('.productStatus>li:nth-child(1)').attr('class', 'planStatus' + status[0]);
                $product.find('.productStatus>li:nth-child(2)').attr('class', 'planStatus' + status[1]);
                $product.find('.productStatus>li:nth-child(3)').attr('class', 'planStatus' + status[2]);
                $product.find('.productStatus>li:nth-child(4)').attr('class', 'planStatus' + status[3]);
                $products.append($product);
            }
            $("tbody").append($platform);
        }
    });
})(jQuery);

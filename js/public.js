$(function () {
    // 头部导航
    var index = 0;
    $('.nav-list .nav-item').each(function (i, v) {
        if ($(v).hasClass('cur')) {
            index = i;
        }
    })
    $(".nav-list .nav-item").on("mouseover", function () {
        $(this).addClass("cur");
        $(this).siblings(".nav-item").removeClass("cur");
    });
    $(".nav-list").on("mouseout", function () {
        $('.nav-list .nav-item').eq(index).addClass("cur");
        $('.nav-list .nav-item').eq(index).siblings(".nav-item").removeClass("cur");
    });

    // 回到顶部

    if ($(".contact").length) {
        $('.contact .item').on('mouseenter', function () {
            $(this).addClass("cur").siblings().removeClass("cur");
        }).on("mouseleave", function () {
            $(this).removeClass("cur");
        });
        $('.contact .top').on('click', function () {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 500);
        })

        $(window).on("load scroll", function () {
            var scrollT = $(document).scrollTop()
            var windowH = $(window).height();
            if (scrollT > windowH) {
                $(".contact .top").fadeIn("fast");
                $(".contact").height('404px');
            } else {
                $(".contact .top").hide();
                $(".contact").height('304px');
            }
        });
    }
});
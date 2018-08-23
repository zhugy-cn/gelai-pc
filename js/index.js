(function () {
    // 轮播图
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        grabCursor: true,
        effect: 'fade',
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                swiperAnimateCache(this);
                swiperAnimate(this);
            },
            slideChangeTransitionEnd: function () {
                swiperAnimate(this);
            }
        }
    })
    // 动画
    var aniList = $('.animated');
    $(window).on('scroll load', function () {
        var scrollT = $(document).scrollTop();  // 网页被卷去的头部
        var windowH = $(window).height();       // 屏幕高度
        aniList.each(function () {
            var itemT = $(this).offset().top;   // 选中的元素距离上边的距离
            var itemH = $(this).height();       // 自身的高度
            var aniName = $(this).data('aniName')
            var aniDelay = $(this).data('aniDelay')
            if (scrollT + windowH >= itemT + (itemH / 3)) {
                $(this).removeClass("hide").addClass(aniName).css({
                    "animation-delay": aniDelay,
                });
            }
        })
    })

    $(".steps-list .steps-item").on("mouseenter", function () {
        $(".stpes-line .line-step").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
    });
    $(".steps-list .steps-item").on("mouseleave", function () {
        $(".stpes-line .line-step").removeClass("cur");
    });
})();


(function ($) {
    $.fn.numberAnimate = function (setting) {

        var defaults = {
            speed: 1000, //动画速度
            num: "", //初始化值
            iniAnimate: true, //是否要初始化动画效果
            symbol: '', //默认的分割符号，千，万，千万
            dot: 0 //保留几位小数点
        };
        //如果setting为空，就取default的值
        setting = $.extend(defaults, setting);

        //如果对象有多个，提示出错
        if ($(this).length > 1) {
            console.log("just only one obj!");
            return;
        }

        //如果未设置初始化值。提示出错
        if (setting.num === "") {
            alert("must set a num!");
            return;
        }
        var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';

        //数字处理
        var numToArr = function (num) {
            num = parseFloat(num).toFixed(setting.dot);
            var arrStr;
            if (typeof (num) === 'number') {
                arrStr = num.toString().split("");
            } else {
                arrStr = num.split("");
            }
            //console.log(arrStr);
            return arrStr;
        };

        //设置DOM symbol:分割符号
        var setNumDom = function (arrStr) {
            var shtml = '<div class="mt-number-animate">';
            for (var i = 0, len = arrStr.length; i < len; i++) {
                if (i !== 0 && (len - i) % 3 === 0 && setting.symbol !== "" && arrStr[i] !== ".") {
                    shtml += '<div class="mt-number-animate-dot">' + setting.symbol + '</div>' + nHtml.replace("{{num}}", arrStr[i]);
                } else {
                    shtml += nHtml.replace("{{num}}", arrStr[i]);
                }
            }
            shtml += '</div>';
            return shtml;
        };

        //执行动画
        var runAnimate = function ($parent) {
            $parent.find(".mt-number-animate-dom").each(function () {
                var num = $(this).attr("data-num");
                num = (num === "." ? 10 : num);
                var spanHei = $(this).height() / 11; //11为元素个数
                var thisTop = -num * spanHei + "px";
                if (thisTop !== $(this).css("top")) {
                    if (setting.iniAnimate) {
                        //HTML5不支持
                        if (!window.applicationCache) {
                            $(this).animate({
                                top: thisTop
                            }, setting.speed);
                        } else {
                            $(this).css({
                                'transform': 'translateY(' + thisTop + ')',
                                'transition': setting.speed / 1000 + 's'
                            });
                        }
                    } else {
                        setting.iniAnimate = true;
                        $(this).css({
                            top: thisTop
                        });
                    }
                }
            });
        };

        //初始化
        var init = function ($parent) {
            //初始化
            $parent.html(setNumDom(numToArr(setting.num)));
            runAnimate($parent);
        };

        //重置参数
        this.resetData = function (num) {
            var newArr = numToArr(num);
            var $dom = $(this).find(".mt-number-animate-dom");
            if ($dom.length < newArr.length) {
                $(this).html(setNumDom(numToArr(num)));
            } else {
                $dom.each(function (index, el) {
                    $(this).attr("data-num", newArr[index]);
                });
            }
            runAnimate($(this));
        };
        //init
        init($(this));
        return this;
    };
})(jQuery);

setTimeout(function () {
    var numRun = $(".number1").numberAnimate({
        num: '1999',
        speed: 1500,
    });
    var numRun2 = $(".number2").numberAnimate({
        num: '120',
        speed: 1500,
    });
    var numRun3 = $(".number3").numberAnimate({
        num: '80',
        speed: 1500
    });
    var numRun4 = $(".number4").numberAnimate({
        num: '24',
        speed: 1500
    });
    var numRun4_1 = $(".number4-1").numberAnimate({
        num: '365',
        speed: 1500
    });
    var numRun5 = $(".number5").numberAnimate({
        num: '2000',
        speed: 1500
    });
}, 1500);
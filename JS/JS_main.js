/**
 * Created by maizi on 2017/6/27.
 */
$(document).ready(function () {

    $(function () {
        var i = 0;
        var $btn = $('.section-btn li'),
            $wrap = $('.section-wrap'),
            $arrow = $('.arrow');
        /*当前页面赋值*/
        function up() {
            i++;
            if (i == $btn.length) {
                i = 0
            }
            ;
        }

        function down() {
            i--;
            if (i < 0) {
                i = $btn.length - 1
            }
            ;
        }

        /*页面滑动*/
        function run() {
            $btn.eq(i).addClass('on').siblings().removeClass('on');
            $wrap.attr("class", "section-wrap").addClass(function () {
                return "put-section-" + i;
            }).find('.section').eq(i).find('.title').addClass('active');
        };
        /*右侧按钮点击*/
        $btn.each(function (index) {
            $(this).click(function () {
                i = index;
                run();
            })
        });
        /*翻页按钮点击*/
        $arrow.one('click', go);
        function go() {
            up();
            run();
            setTimeout(function () {
                $arrow.one('click', go)
            }, 1000)
        };
        /*响应鼠标*/
        $wrap.one('mousewheel', mouse_);
        function mouse_(event) {
            if (event.deltaY < 0) {
                up()
            }
            else {
                down()
            }
            run();
            setTimeout(function () {
                $wrap.one('mousewheel', mouse_)
            }, 1000)
        };
        /*响应键盘上下键*/
        $(document).one('keydown', k);
        function k(event) {
            var e = event || window.event;
            var key = e.keyCode || e.which || e.charCode;
            switch (key) {
                case 38:
                    down();
                    run();
                    break;
                case 40:
                    up();
                    run();
                    break;
            }
            ;
            setTimeout(function () {
                $(document).one('keydown', k)
            }, 1000);
        }

    });
    /******************************************************
     进度条事件
     *******************************************************/
    var timeOutID;
    $('.process').animate({right: "20%"}, 1000, function () {
        //为防止页面加载失败之后的不能看到页面的情况，10000mills认为加载失败
        timeOutID = setTimeout(showPage, 10000);
    });

    $(window).load(function () {
        /* Act on the event */
        //页面加载成功之后清除timeout，防止反复调用
        clearTimeout(timeOutID);
        showPage();
    });

//********************显示主页面函数******************
    function showPage() {
        $('.process').animate({right: 0}, 200).promise().done(function () {
            $('.loading').hide();
            $('.wait h1').hide();
            $('.slideUp').animate({height: 0}, 1000, function () {
                /* stuff to do after animation is complete */
                $('.wait').hide();
                $(document.body).css('overflow', 'hidden');
            });

            $('.slideDown').animate({height: 0}, 1000, function () {
                /* stuff to do after animation is complete */
                $('.wait').hide();
                $(document.body).css('overflow', 'hidden');
            });
        });
    }

    /******************************************************
     蒙版响应函数
     *******************************************************/
    // 联系方式点击事件
    $(".button").click(function (event) {
        /* Act on the event */
        $(".mask").addClass('active');
        return false;
    });
    $(".button1").click(function (event) {
        /* Act on the event */
        $(".mask").addClass('active');
        return false;
    });
    //蒙版消失
    $(".mask").click(function (event) {
        /* Act on the event */
        $(this).removeClass('active');
    });
    //防止冒泡
    $(".card").click(function (event) {
        /* Act on the event */
        return false;
    });
});
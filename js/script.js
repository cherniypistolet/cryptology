/**
 * Флаги слайдов
 *
 * Флаг используемый при переключении слайдов
 *
 *@var number f
 *@var number f2
 *@var number ff2
 *@var number ff
 *@var number flag
 */
var f = 0,
    f2 = 0,
    ff = 0,
    ff2 = 0,
    flag = -1;

/**
 * Начало эффекта прилипания слайда
 *
 * Храним  высчитанное начало, при котором  
 * слайд прилипает к экрану
 *
 *@var number hBegin
 */

/**
 * Конец эффекта прилипания слайда
 *
 * Храним  высчитанный конец, при котором  
 * слайд отлипает от экрана
 *
 *@var number hEnd
 */

/**
 * Высоста меню
 *
 * Храним  высчитанную высоту меню
 *
 *@var number menuH
 */
var menuH = 0,
    hBegin = 0,
    hEnd = 0;

/**
 * Начало эффекта прилипания для сотрудников
 *
 * Храним  высчитанное начало, при котором  
 * блок с фото и описанием сотрудника
 * прилипает к экрану
 *
 *@var number hBegin2
 */

/**
 * Конец эффекта прилипания слайда
 *
 * Храним  высчитанный конец, при котором  
 * блок с фото и описанием сотрудника
 * отлипает от экрана
 *
 *@var number hEnd2
 */

/**
 * Отступ слева для блока с описанием
 *
 * Храним  отступ слева блока с фото 
 * и описанием сотрудника
 *
 *@var number leftBig
 */
var hBegin2 = 0,
    hEnd2 = 0,
    leftBig = 0;

/**
 * Новое положение скролла
 *
 * Храним  текущее положение скролла
 *
 *@var number hNow
 */

/**
 * Положение скролла
 *
 * Храним  предыдущее положение скролла
 *
 *@var number prewH
 */
var hNow = 0,
    prewH = 0;

/**
 * Отступ первых четырех разделов 
 *
 * Отступ от начала первых четырех разделов 
 * страницы index
 *
 *@var number offset1
 *@var number offset2
 *@var number offset3
 *@var number offset4
 */
var offset1, offset2, offset3, offset4;

/**
 * Флаг скролла
 *
 * Флаг перехвата скролла колесиком
 *
 *@var boolean flWheel
 */

/**
 * Флаг о замене html
 *
 * Флаг, показывающий надо ли
 * заменять html  в блоке с ценами
 *
 *@var boolean flagHtml
 */
var flWheel = false,
    flagHtml = true;
$(document).ready(function() {

    /**
     * Флаг меню
     *
     * Флаг показывает что меню
     * открытое или  закрытое
     *
     *@var boolean isOpen
     */
    var isOpen = false;

    /**
     * Работа с меню
     *
     * Открывает закрытое меню.
     * Закрывает октрытое меню.
     */
    function open() {
        if (isOpen == false) {
            isOpen = true;
            $(".menublock").addClass("openmenu");
        } else {
            isOpen = false;
            $(".menublock").removeClass("openmenu");
        }
    };
    $(".btnmenu").click(function() {
        open();
    });
    $(".closemenu").click(function() {
        open();
    });
    $(".ssulki a").click(function() {
        open();
        scrollAnimate(this);
    });
    if ($(".block2").html() != undefined) {
        $('body').fullpage({
            scrollBar: true,
            fitToSectionDelay: 300,
            loopBottom: false,
            responsiveWidth: 990,
            sectionSelector: '.blocks1,.block2,.block3, .block4',
            normalScrollElements: '.block4,.block5, .block6, .block7, .block8, .block9',
            fitToSection: false
        });
        /**
         * Работа с анимацией
         *
         * Запускает анимацию fadeInUp
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation(obj, delay) {
            obj.addClass('wow');
            obj.addClass('fadeInUp');
            obj.attr("data-wow-offset", 150);
            obj.attr("data-wow-duration", "2.5s");
            obj.attr("data-wow-delay", delay + "s");
        }
        /**
         * Работа с анимацией
         *
         * Запускает анимацию fadeInDown
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation2(obj, delay) {
            obj.addClass('wow');
            obj.addClass('fadeInDown');
            obj.attr("data-wow-offset", 150);
            obj.attr("data-wow-duration", "2.5s");
            obj.attr("data-wow-delay", delay + "s");
        }
        /**
         * Работа с анимацией
         *
         * Запускает анимацию fadeInDownOP
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation3(obj, delay) {
            obj.addClass('wow');
            obj.addClass('fadeInDownOP');
            obj.attr("data-wow-offset", 150);
            obj.attr("data-wow-duration", "2s");
            obj.attr("data-wow-delay", delay + "s");
        }
        /**
         * Работа с анимацией
         *
         * Запускает анимацию animate-text
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation4(obj, delay) {
            obj.addClass('wow');
            obj.addClass('animate-text');
            obj.attr("data-wow-offset", 150);
            obj.attr("data-wow-duration", "2s");
            obj.attr("data-wow-delay", delay + "s");
        }
        /**
         * Работа с анимацией
         *
         * Запускает анимацию fadeInUpNext
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation5(obj, delay) {
            obj.addClass('wow');
            obj.addClass('fadeInUpNext');
            obj.attr("data-wow-offset", 50);
            obj.attr("data-wow-duration", "1s");
            obj.attr("data-wow-delay", delay + "s");
        }
        /**
         * Работа с анимацией
         *
         * Запускает анимацию fadeInUp
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation6(obj, delay) {
            obj.addClass('wow');
            obj.addClass('fadeInUp');
            obj.attr("data-wow-offset", 50);
            obj.attr("data-wow-duration", "2.8s");
            obj.attr("data-wow-delay", delay + "s");
        }
        /**
         * Работа с анимацией
         *
         * Запускает анимацию fadeIn
         *
         * @param object obj
         * @param number delay
         */
        function goAnimation7(obj, delay) {
            obj.addClass('wow');
            obj.addClass('fadeIn');
            obj.attr("data-wow-offset", 150);
            obj.attr("data-wow-duration", "1.5s");
            obj.attr("data-wow-delay", delay + "s");
        }
        goAnimation($('.whiteline1'), 0);
        goAnimation2($('.whiteline2'), 0.3);
        goAnimation($('.greyline1'), 0);
        goAnimation2($('.greyline2'), 0.3);
        goAnimation2($('.greyline3'), 0);
        goAnimation2($('.greyline4'), 0);
        goAnimation($('.greyline5'), 0);
        goAnimation2($('.greyline6'), 0);
        goAnimation2($('.greyline7'), 0);
        goAnimation2($('.greyline8'), 0);
        goAnimation($('.greyline9'), 0);
        goAnimation($('.greyline00copy'), 0);
        goAnimation($('.greyline0'), 0.3);
        goAnimation($('.greyline00'), 0);
        goAnimation3($('h2'), 0);
        goAnimation5($('.nextblock'), 0.5);
        goAnimation5($('.nextblock2'), 0.5);
        goAnimation5($('.nextblock3'), 0.5);
        goAnimation6($('.manydevices'), 0);
        goAnimation7($('.doublephone'), 0);
        goAnimation7($('.triplephone'), 0);
        WOW.prototype.addBox = function(element) {
            this.boxes.push(element);
        };
        var wow = new WOW();
        wow.init();
        $('.wow').on('scrollSpy:exit', function() {
            $(this).css({
                'visibility': 'hidden',
                'animation-name': 'none'
            }).removeClass('animated');
            wow.addBox(this);
        }).scrollSpy();
        var modules = $(".modules .module .nummod");
        var lines = $(".whiteline, .greyline0, .greyline00, .greyline00copy");
        for (i = 0; i < modules.length; i++) {
            if (i < 9) {
                num = "0";
            } else {
                num = "";
            }
            num = num + (i + 1) + "";
            modules.eq(i).text(num);
        }
        /**
         * Функция изменяет свойства страницы case 
         *
         * Функция вызывается при изменении размера окна
         */
        function resize() {
            for (i = 0; i < lines.length; i++) {
                parent = lines.eq(i).parent();
                heightline = parent.parent().parent().offset().top + parent.parent().parent().innerHeight() - parent.offset().top - parent.innerHeight();
                lines.eq(i).css("height", heightline + 15 + "px");
                lines.eq(i).css("bottom", -heightline + "px");
            }
            $(".greyline4").css("left", $(".greyline6").offset().left);
            $(".greyline3").css("left", $(".greyline0").offset().left);
            $(".greyline03").css("left", $(".greyline00").offset().left);
            $(".greyline5").css("left", $(".greyline00").offset().left);
            $(".greyline7").css("left", $(".greyline00copy").offset().left);
            if ($(window).outerWidth() > 1320) {
                $(".number").css("left", $(".greyline00").offset().left - 147);
                $(".number0").css("left", $(".greyline00").offset().left - 154);
            } else if ($(window).outerWidth() > 990) {
                $(".number").css("left", $(".greyline00").offset().left - 110);
                $(".number0").css("left", $(".greyline00").offset().left - 113);
            } else if ($(window).outerWidth() > 477) {
                $(".number").css("left", $(".greyline00").offset().left - 60);
                $(".number0").css("left", $(".greyline00").offset().left - 60);
            } else {
                $(".number").attr("style", "");
            }
            if ($(window).outerWidth() < 991) {
                $("blocks1, .block2, .block3, .block4, .fp-tableCell").attr("style", "");
            }
        }
        resize();
        $(window).resize(function() {
            resize();
        });

        if ($(window).outerWidth() < 991) {
            $(".blocks1, .block2, .block3, .block4, .fp-tableCell").attr("style", "");
        }

        colors = $(".colors .color p");
        circleColor = $(".colors .color .circlecolor");
        for (i = 0; i < colors.length; i++) {
            circleColor.eq(i).css("background-color", colors.eq(i).text());
            if (colors.eq(i).text() == "#FFFFFF" || colors.eq(i).text() == "#ffffff")
                circleColor.eq(i).css("box-shadow", "0px 6px 10px 5px rgba(0, 0, 0, 0.05)");
        }
    }
    // index.html----------------------------------------------------------------------------------
    if ($(".bgheader2").html() != undefined) {
        $(".foto").eq(0).addClass("activefoto");
        infoFoto();
        /**
         * Инициализация значений для сотрудников
         *
         * Подставляет значения при выборе сотрудника
         */
        function infoFoto() {
            $(".bigfoto").attr("style", $(".activefoto .smallfoto").attr("style"));
            $(".name2").text($(".activefoto .name").text());
            $(".doljnost2").text($(".activefoto .doljnost").text());
            $(".opischlena2").text($(".activefoto .opischlena").text());
        }
        allPortfolio = $(".portfolionone");
        /**
         * Работа с анимацией
         *
         * Запускает анимацию указанную в параметре
         *
         * @param object object
         * @param string animationName
         * @param number animationOffset
         * @param number animationDuration
         * @param number animationDelay
         */
        function bestAnimation(object, animationName, animationOffset, animationDuration, animationDelay) {
            object.addClass('wow');
            object.addClass(animationName);
            object.attr("data-wow-offset", animationOffset);
            object.attr("data-wow-duration", animationDuration + "s");
            object.attr("data-wow-delay", animationDelay + "s");
        }
        //bestAnimation($('.bgheader2'),"scaleHeader",0,1,0);
        bestAnimation($('.bgheader2 h1'), "fadeIn", 0, 1, 0);
        bestAnimation($('.bgheader2 li'), "fadeIn", 0, 1, 0.3);
        bestAnimation($('.bgheader2 li').last(), "fadeIn", 0, 1, 0.7);
        // Init WOW.js and get instance
        var wow = new WOW();
        wow.init();
        $(".vuborrab ul li").eq(0).addClass("activevuborrab");
        $(".vuborrab ul li").click(function() {
            $(".activevuborrab").removeClass("activevuborrab");
            $(this).addClass("activevuborrab");
        });

        $(".foto").click(function() {
            $(".activefoto").removeClass("activefoto");
            $(this).addClass("activefoto");
            infoFoto();
        });

        allNumRab = $(".nomerrabotaem");
        for (i = 0; i < allNumRab.length; i++) {
            if (i < 9)
                num = "0";
            else num = "";
            num = num + (i + 1) + "";
            allNumRab.eq(i).text(num);
        }
        $(".forma input[type=range]").on("input", cost);
        /**
         * Управление стоимостью
         *
         * Записывает значение ползунка
         */
        function cost() {
            countItems = $("#cost").val();
            $(".costrange").text(countItems + " руб");
        }
        allSsulki = $(".ssulki a");
        opacitySsulka = 1;
        for (i = 0; i < allSsulki.length; i++) {
            allSsulki.eq(i).css("opacity", opacitySsulka);
            opacitySsulka -= 0.1;
        }
        $(".rightagency a").click(function() {
            scrollAnimate(this);
        });
        /**
         * Анимация скролла
         *
         * Запускает анимацию скролла для обьекта 
         *
         * @param object object
         */
        function scrollAnimate(object) {
            $("html, body").animate({
                scrollTop: $($(object).attr("href")).offset().top - $(".menu").innerHeight() + "px"
            }, {
                duration: 600,
                easing: "swing"
            });
        }
        /**
         * Подставляет значение в слайд
         *
         * При пролистывании берет информацию из скрытого блока
         *
         * @param number i
         */
        function zamena(i) {
            p = 0;
            var interval = setInterval(function() {
                if ($(".leftrab h2").css("opacity") == "0" || p >= 600) {
                    clearInterval(interval);
                    $(".portfolio .leftrab h2").text($(".portfolionone h2").eq(i).text());
                    $(".portfolio .leftrab p").text($(".portfolionone p").eq(i).text());
                    $(".portfolio .leftrab .btnsmotr").attr("href", $(".portfolionone .btnsmotr").eq(i).attr("href"));
                    $(".portfolio .bgrhomb").attr("style", $(".portfolionone .bgrhomb").eq(i).attr("style"));
                    $(".portfolio .numberrab").text("0" + (i + 1));
                }
                p++;
            }, 1);
        }
        if ($(".greyrec").html() != undefined) {
            zamena(0);
            /**
             * Отслеживание скролла
             *
             * Изменяет свойства элементов страницы при скролле
             */
            $(window).scroll(function() {
                hNow = Math.ceil($(window).scrollTop());
                if (f2 == 1 && hNow < hEnd) {
                    $(".portfolio").css("position", "fixed");
                    $(".portfolio").css("top", menuH + "px");
                    f2 = 0;
                }
                if (f == 0 && hNow >= hBegin && hNow < hEnd) {
                    $(".portfolio").css("position", "fixed");
                    $(".portfolio").css("top", menuH + "px");
                    f = 1;
                } else if (hNow > hEnd && f2 == 0) {
                    $(".portfolio").css("position", "absolute");
                    topa = allPortfolio.eq(0).innerHeight() * (allPortfolio.length - 1);
                    $(".portfolio").css("top", topa + "px");
                    f2 = 1;
                } else if (hNow < hBegin && f == 1) {
                    f = 0;
                    $(".portfolio").css("position", "absolute");
                    $(".portfolio").css("top", 0 + "px");
                    flag = 0;
                }
                if (hNow >= hBegin && hNow < hEnd) {
                    if (prewH < hNow) {
                        if (hNow >= offset1 && flag == -1) {
                            flag = 0;
                        } else if (hNow >= offset1 && hNow < offset2 && flag == 0) {
                            flag = 1;
                            $(".portfolio").addClass("prtnext");
                            zamena(1);
                        } else if (hNow >= offset2 && flag == 1) {
                            flag = 2;
                            $(".rhomb").addClass("circleanim");
                        } else if (hNow >= offset2 && hNow < offset3 && flag == 2) {
                            flag = 3;
                            $(".portfolio").addClass("prtnext");
                            zamena(2);
                            $(".rhomb").addClass("squareanim");
                        }
                    } else {
                        if (hNow <= offset3 && flag == 4) {
                            flag = 3;
                        } else if (hNow > offset2 && hNow <= offset3 && flag == 3) {
                            flag = 2;
                            $(".portfolio").addClass("prtnext");
                            zamena(1);
                            $(".rhomb").addClass("circleanim");
                            $(".rhomb").removeClass("squareanim");
                        } else if (hNow <= offset2 && flag == 2) {
                            flag = 1;
                        } else if (hNow > offset1 && hNow <= offset2 && flag == 1) {
                            flag = 0;
                            $(".rhomb").removeClass("circleanim");
                            $(".portfolio").addClass("prtnext");
                            zamena(0);
                        }
                    }
                }
                prewH = hNow;
                if (hNow < offset1) {
                    flag = -1;
                    zamena(0);
                    $(".rhomb").removeClass("circleanim");
                    $(".rhomb").removeClass("squareanim");
                    $(".portfolio").addClass("prtnext");
                }
                if (hNow >= offset4 && flWheel == false) {
                    zamena(2);
                    flag = 4;
                    $(".rhomb").addClass("circleanim");
                    $(".rhomb").addClass("squareanim");
                    $(".portfolio").addClass("prtnext");
                    window.removeEventListener("wheel", onWheel);
                    flWheel = true;
                } else if (hNow > offset3 && hNow < offset4 && flWheel == true) {
                    window.addEventListener("wheel", onWheel);
                    flWheel = false;
                }
            });
        }
        var lastAnimation = new Date().getTime();
        var quietPeriod = 100;
        var animationTime = 500;
        var objAnim;
        /**
         * Перехват события колесика
         *
         * Перелистывание слайда
         *
         * @param event e
         */
        function onWheel(e) {
            e = e || window.event;
            var timeNow = new Date().getTime();
            if (timeNow - lastAnimation < quietPeriod + animationTime) {
                e.preventDefault();
                return;
            }
            lastAnimation = timeNow;
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta > 0) {
                if (hNow < offset1) {
                    scroll(offset1);
                } else if (hNow >= offset1 && hNow < offset2 && flag == 0) {
                    scroll(offset2);
                } else if (hNow >= offset2 && hNow < offset3 && (flag == 2 || flag == 1)) {
                    scroll(offset3);
                } else if (hNow >= offset3 && hNow < offset4 && (flag == 3 || flag == -1)) {
                    scroll(offset4);
                }
            } else {
                if (hNow > offset3 && hNow <= offset4 && flag == 4) {
                    scroll(offset3);
                } else if (hNow > offset2 && hNow <= offset3 && flag == 3) {
                    scroll(offset2);
                } else if (hNow > offset1 && hNow <= offset2 && (flag == 2 || flag == 1)) {
                    scroll(offset1);
                } else if (hNow <= offset1) {
                    scroll(0);
                }
            }
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
        window.addEventListener("wheel", onWheel);
        /**
         * Анимация скролла
         *
         * Запускает анимацию скролла на заданное кол-во px
         *
         * @param number numberScroll
         */
        function scroll(numberScroll) {
            $(".portfolio").removeClass("prtnext");
            $("html, body").animate({
                scrollTop: numberScroll + "px"
            }, {
                duration: 500,
                easing: "swing"
            });
        }
        // komanda---------------------------------------------------------------
        if ($(".flexkomanda").html() != undefined) {
            /**
             * Эффект прилипания
             *
             * Эффект прилипания для сотрудников
             */
            $(window).scroll(function() {
                if (ff2 == 1 && hNow < hEnd2) {
                    $(".flexbig").css("position", "fixed");
                    $(".flexbig").css("top", menuH + "px");
                    $(".flexbig").css("left", leftBig + "px");
                    ff2 = 0;
                }
                if (ff == 0 && hNow >= hBegin2 && hNow < hEnd2) {
                    $(".flexbig").css("position", "fixed");
                    $(".flexbig").css("top", menuH + "px");
                    $(".flexbig").css("left", leftBig + "px");
                    ff = 1;
                } else if (hNow > hEnd2 && ff2 == 0) {
                    $(".flexbig").css("position", "absolute");
                    topa = $(".flexkomanda").innerHeight() - $(".flexbig").innerHeight();
                    $(".flexbig").css("top", topa + "px");
                    $(".flexbig").css("left", leftBig - $(".flexkomanda").offset().left + "px");
                    ff2 = 1;
                } else if (hNow < hBegin2 && ff == 1) {
                    ff = 0;
                    $(".flexbig").attr("style", "");
                }
            });
        }

        var oldHtml;
        var arr = [];
        var allUslZagl = $(".uslugi h3");
        var allUsl = $(".uslugi .ul");
        /**
         * Расчет отступов и высоты
         *
         * Расчет отступов и высоты для серых блоков прайс-листа  
         */
        function allTopGreyUsl() {
            topGrey = 0;
            for (i = 0; i < allUsl.length; i++) {
                $(arr[i]).css("height", $(".uslugi .ul").eq(i).innerHeight() + $(".uslugi h3").eq(i).innerHeight());
                $(arr[i]).css("top", topGrey);
                topGrey += $(arr[i]).height();
            }
        }
        for (i = 0; i < allUslZagl.length; i++) {
            if (i % 2 == 0) {
                allUsl.eq(i).append("<div class='leftgreyusl'></div>");
                arr[i] = allUsl.eq(i).find(".leftgreyusl");
            } else {
                allUsl.eq(i).append("<div class='rightgreyusl'></div>");
                arr[i] = allUsl.eq(i).find(".rightgreyusl");
            }
        }
        /**
         * Изменяет свойства страницы Index
         *
         * Изменяет свойства страницы при изминении размера окна
         */
        function resize2() {
            allTopGreyUsl();
            menuH = $(".menu").innerHeight();
            $(".portfolionone").css("height", $(".portfolio").innerHeight());
            hBegin2 = Math.ceil($(".flexkomanda").offset().top - menuH);
            hEnd2 = Math.ceil(hBegin2 + $(".flexkomanda").innerHeight() - $(".flexbig").innerHeight());
            leftBig = $(".flexbig").offset().left;
            hBegin = Math.ceil($(".block1").offset().top - menuH + $(".block1").innerHeight());
            hEnd = Math.ceil(allPortfolio.eq(allPortfolio.length - 1).offset().top);
            offset1 = Math.ceil(allPortfolio.eq(0).offset().top - menuH);
            offset2 = Math.ceil(allPortfolio.eq(1).offset().top - menuH);
            offset3 = Math.ceil(allPortfolio.eq(2).offset().top - menuH);
            offset4 = Math.ceil($("#komanda").offset().top - menuH);
            if ($(window).outerWidth() <= 600 && flagHtml == true) {
                oldHtml = $(".uslugi").html();
                zagolovki = $(".zaglflex");
                flagHtml = false;
                for (i = 0; i < zagolovki.length; i++) {
                    ulParent = zagolovki.eq(i).parent().parent().parent();
                    allLi = ulParent.find("li:not(.usl ul li)");
                    flexStart = zagolovki.eq(i).find(".flexstart");
                    for (j = 0; j < flexStart.length; j++) {
                        strCost = ".costusl:nth-child(" + (j + 2) + "):not(.flexstart)";
                        allLi.find(strCost).prepend("<div>" + flexStart.eq(j).find("div").text() + "</div>");
                    }
                    allLi.find(".costusl").addClass("flexstart");
                }
            } else if ($(window).outerWidth() > 600 && flagHtml == false) {
                $(".uslugi").html(oldHtml);
                flagHtml = true;
            }
        }
        resize2();
        $(window).resize(function() {
            resize2();
        });
    }
});
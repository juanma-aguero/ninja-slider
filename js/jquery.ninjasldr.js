/**
 * ninjaSlider v0.1
 *
 * Parameters:
 * loop: to loop or not to loop (default: false).
 * switchSelector: selector of DOM element who is gonna fire the swtich event.
 * speed: interval speed (default: 2000).
 *
 * @param {type} params
 */
(function($) {
    $.fn.ninjaSlider = function(params) {
        /* default config */
        var speed = 5000;
        var speedLevel1 = 600;
        var speedLevel2 = 800;
        var timeLevel1 = 700;
        var timeLevel2 = 1500;
        var slideIndex = 0;
        var slideWidth = 640;
        var slides = new Array();
        var isRunning = false;
        var isAnimating = false;
        var loopProcess;
        var mainSelector = "#" + $(this).attr("id");
        var sliderSelector = mainSelector + " > .ninja-sldr-async-slider";
        var slideSelector = ".ninja-sldr-slide";
        var loop = false;




        /* user config */
        if (params && params.speed) {
            speed = params.speed;
        }
        if (params && params.loop) {
            loop = params.loop;
        }



        slides = $(slideSelector);

        var methods = {
            switchTo: function(index) {
                slideIndex = index;
                methods.update();
            },
            update: function() {
                isAnimating = true;
                $(sliderSelector).stop().animate({
                    left: (-1 * slideIndex * slideWidth) + "px"
                }, 1000, function() {
                    $(".ninja-sldr-slide-2level").css("right", "-" + slideWidth + "px").hide();
                    $(".ninja-sldr-slide-1level").css("right", "-100px").hide();

                    /* 1 level */
                    setTimeout(function() {
                        var level1 = $(slides[slideIndex]).children(".ninja-sldr-slide-1level");
                        level1.show();
                        level1.stop().animate({
                            right: '15%'
                        }, speedLevel1, function() {
                            setTimeout(function() {
                                $(slides[slideIndex]).children(".ninja-sldr-slide-1level").stop().animate({
                                    right: '+' + slideWidth
                                }, speedLevel2, function() {
                                    /* 2 level */
                                    var level2 = $(slides[slideIndex]).children(".ninja-sldr-slide-2level");
                                    level2.show();
                                    level2.stop().animate({
                                        right: '-25%'
                                    }, speedLevel1, function() {
                                        isAnimating = false;
                                    });
                                });

                            }, timeLevel2);
                        });
                    }, timeLevel1);

                });
            },
            switchBG: function() {
                if (slideIndex < slides.length - 1) {
                    slideIndex++;
                } else {
                    slideIndex = 0;
                }
                methods.update();
            },
            playPause: function() {
                if (isRunning) {
                    methods.stopLoop();
                } else {
                    methods.run();
                }
            },
            run: function() {
                function sliderLoop() {
                    isRunning = true;
                    methods.switchBG();
                }
                methods.stopLoop();
                loopProcess = setInterval(sliderLoop, speed);
            },
            stopLoop: function() {
                clearInterval(loopProcess);
                isRunning = false;
            },
            adjustToWindow: function() {
                slideWidth = $(mainSelector).width();
                $(slideSelector).width(slideWidth);
                $(sliderSelector).width($(slideSelector).length * slideWidth);
            }
        }

        if (params && params.switchSelector) {
            $(params.switchSelector).click(function() {
                methods.switchTo($(this).attr("data-ninja"));
            });
        }

        window.onresize = function() {
            methods.adjustToWindow();
        };

        /* If is set to loop*/
        if (loop) {
            methods.run();
        }
        methods.update();
        methods.adjustToWindow();
    }

})(jQuery);
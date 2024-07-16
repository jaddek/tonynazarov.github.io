(function ($) {
    "use strict";
    var body = $('body');

    // Animate layout
    function animateLayout() {
        var windowWidth = $(window).width(),
            animatedContainer = '',
            animateType = $('#page_container').attr('data-animation')

        if (windowWidth > 991) {
            animatedContainer = $(".page-container");
        } else {
            animatedContainer = $(".site-main");
        }

        animatedContainer.addClass("animated " + animateType);
        $('.page-scroll').addClass('add-prespective');
        animatedContainer.addClass('transform3d');
        setTimeout(function () {
            $('.page-scroll').removeClass('add-prespective');
            animatedContainer.removeClass('transform3d');
        }, 1000);
    }
    // /Animate layout

    function scrollTop() {
        if ($(body).scrollTop() > 150) {
            $('.lmpixels-scroll-to-top').removeClass('hidden-btn');
        } else {
            $('.lmpixels-scroll-to-top').addClass('hidden-btn');
        }
    }

    function skillsStyles() {
        var custom_styles = "";
        $('.skill-container').each(function () {
            var value = $(this).attr('data-value');

            if (value >= 101) {
                value = '100';
            }

            if (typeof value != 'undefined') {
                var id = $(this).attr('id'),
                    $custom_style = '#' + id + ' .skill-percentage { width: ' + value + '%; } ';
                custom_styles += $custom_style;
            }
        });
        $('head').append('<style data-styles="leven-theme-skills-css" type="text/css">' + custom_styles + '</style>');
    }

    //On Window load & Resize
    $(window)
        .on('load', function () { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut(800, "linear");
            animateLayout();
        })
        .on('hashchange', function (event) {
            if (location.hash) {
                ajaxLoader();
            }
        });


    // On Document Load
    $(document).ready(function () {
        var movementStrength = 15;
        var height = movementStrength / $(document).height();
        var width = movementStrength / $(document).width();
        $("body").on('mousemove', function (e) {
            var pageX = e.pageX - ($(document).width() / 2),
                pageY = e.pageY - ($(document).height() / 2),
                newvalueX = width * pageX * -1,
                newvalueY = height * pageY * -1;
            if ($('.page-container').hasClass('bg-move-effect')) {
                var elements = $('.home-photo .hp-inner:not(.without-move), .lm-animated-bg');
            } else {
                var elements = $('.home-photo .hp-inner:not(.without-move)');
            }
            elements.addClass('transition');
            elements.css({
                "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
            });

            setTimeout(function () {
                elements.removeClass('transition');
            }, 300);
        })
            .scroll(function () {
                scrollTop();
            });




        $('.lmpixels-scroll-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });


        scrollTop();

        skillsStyles();
    });

})(jQuery);
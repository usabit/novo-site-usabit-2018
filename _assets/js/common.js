(function ($, window, document) {
    'use strict';
    console.log('common.js init;');

    // side navigation
    $('.site-header__open-menu').on('click', function(e) {
        e.preventDefault();
        $('.sidenav').addClass('active');
        $('html').css('overflow', 'hidden');
    });

    $('.sidenav__close-menu').on('click', function(e) {
        e.preventDefault();
        $('.sidenav').removeClass('active');
        $('html').css('overflow', 'initial');
    });

    /* front-page .box-services
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 430) {
            $('.box-services').css({
              zIndex: 0
            });
        } else {
            $('.box-services').css({
                zIndex: 2
            });
        }
    });
    */

})(jQuery, window, document);

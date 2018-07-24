(function ($, window, document) {
    'use strict';
    console.log('common.js init;');

    // Navbar Scroll Animation
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 0){
            $('header.site-header').css({
                transition: 'all 500ms',
                background: '#1c1c1c'
            });
        }else{
            $('header.site-header').css({
                background: 'transparent'
            });
        }
    });

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

})(jQuery, window, document);

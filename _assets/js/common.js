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

    // Scroll to Top
    $('.btn-go-top').on('click', function(e) {
        e.preventDefault();
       $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    $(window).on('scroll', function () {

        // Navbar scroll animação
        if ($(window).scrollTop() > 0) {
            $('header.site-header').css({
                transition: 'all 500ms',
                background: '#1c1c1c',
                color: '#ffffff'
            });
        } else {
            $('header.site-header').css({
                transition: 'all 500ms',
                background: 'transparent',
                color: '#1c1c1c'
            });
        }

        if(window.innerWidth < 601) {

            var footerOfSet = $('footer.footer').position();
            var headerHeight = $('header.site-header').height() + $('.lets-talk').height();
            
            // Lets Talk
            if(window.pageYOffset > 980 && window.pageYOffset < 2000) {
                $('.lets-talk').addClass('active');
            } else {
                $('.lets-talk').removeClass('active');
            }
            
            // Go Top
            if($(window).scrollTop() > footerOfSet.top - headerHeight) {
                $('.btn-go-top').addClass('active');
            } else {
                $('.btn-go-top').removeClass('active');
            }
        }

    });

})(jQuery, window, document);

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

    // Effect fadeOut
    $(window).scroll(function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if(scrollTop > 420){
            $('.banner-intro').css({ 'position': 'sticky'} );
        }else{
            $('.banner-intro').css({ 'position': 'initial'} );
        }
        $('.effect-fadeout').each(function(){
            if($(this).offset().top - scrollTop < 70){
                if(!$(this).hasClass('effect-fadeout-active')){
                    $(this).addClass('effect-fadeout-active');
                }
            } else {
                if($(this).hasClass('effect-fadeout-active')){
                    $(this).removeClass('effect-fadeout-active');
                }
            }
        });
    });

})(jQuery, window, document);

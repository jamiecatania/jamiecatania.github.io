
$(document).ready(function () {

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#page-nav-wrapper', offset: 100 });

    /* ======= ScrollTo ======= */
    $('.scrollto').on('click', function (e) {

        //store hash
        var target = this.hash;

        e.preventDefault();

        $('body').scrollTo(target, 800, { offset: -60, 'axis': 'y' });

    });

    /* ======= Fixed page nav when scrolled ======= */
    $(window).on('scroll resize load', function () {

        $('#page-nav-wrapper').removeClass('fixed');

        var scrollTop = $(this).scrollTop();
        var topDistance = $('#page-nav-wrapper').offset().top;

        if ((topDistance) > scrollTop) {
            $('#page-nav-wrapper').removeClass('fixed');
            $('body').removeClass('sticky-page-nav');
        }
        else {
            $('#page-nav-wrapper').addClass('fixed');
            $('body').addClass('sticky-page-nav');
        }

    });

    /* ======= Chart ========= */

    $('.chart').easyPieChart({
        barColor: '#00BCD4',//Pie chart colour
        trackColor: '#e8e8e8',
        scaleColor: false,
        lineWidth: 5,
        animate: 2000,
        // onStep: function(from, to, percent) {
        // 	$(this.el).find('span').text(Math.round(percent));
        // }
    });



    /* ======= Isotope plugin ======= */
    /* Ref: http://isotope.metafizzy.co/ */
    // init Isotope    
    var $container = $('.isotope');

    $container.imagesLoaded(function () {
        $('.isotope').isotope({
            itemSelector: '.item'
        });
    });

    // filter items on click
    $('#filters').on('click', '.type', function () {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.filters').each(function (i, typeGroup) {
        var $typeGroup = $(typeGroup);
        $typeGroup.on('click', '.type', function () {
            $typeGroup.find('.active').removeClass('active');
            $(this).addClass('active');
        });
    });

    // scroll body to target on click
    $('.scroll-up, .scroll-down').click(function () {
        var target = $(this).data("target");

        $('body,html').animate({
            scrollTop: $(target).offset().top,
        }, 800);
        return false;
    });

    // Show/hide buttons
    $(window).on('scroll resize load', function () {
        var scrollTop = $(this).scrollTop();
        var wHeight = $(this).innerHeight();

        // Handle scroll-down on intro
        if (scrollTop <= wHeight / 3) {
            $('#intro .scroll-down').show();
        } else {
            $('#intro .scroll-down').hide();
        }

        // Handle scroll-up on overview
        if (scrollTop >= (wHeight * 2) / 3) {
            $('#overview .scroll-up').show();
            $('#overview .scroll-down').show();
        } else {
            $('#overview .scroll-up').hide();
            $('#overview .scroll-down').hide();
        }
    });

    // $(window).on('load', function () {
    // if ($('body').hasClass('mobile')) {
    //     $('#intro').css({ height: window.innerHeight });
    //   }
    // });

    $(window).on('load resize orientationchange', function () {
    // if ($('body').hasClass('mobile')) {
        $('#intro').css({ height: window.innerHeight });
    // }

    });

    $(window).on('load resize orientationchange', function () {
       var nameWidth = $('#intro-content > #name').width();
       $('#intro-content').width(nameWidth + 'px');
       $('#vid-wrapper').width(nameWidth + 'px');
       
        console.log(`nameWidth = ${nameWidth}`);
        console.log(`nameWidth = ${nameWidth}`);
        });
});
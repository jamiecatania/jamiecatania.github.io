jQuery(document).ready(function ($) {

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
    var didScroll;
    // on scroll, let the interval function know the user has scrolled
    $(window).on('scroll resize load', function (event) {
        didScroll = true;
    });
    // run hasScrolled() and reset didScroll status
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    function hasScrolled() {
        $('#page-nav-wrapper').removeClass('fixed');

        var scrollTop = $(this).scrollTop(),
            windowHeight = $(this).height();

        // Handle whether to fix page nav to top
        var topDistance = $('#page-nav-wrapper').offset().top;

        if ((topDistance) > scrollTop) {
            $('#page-nav-wrapper').removeClass('fixed');
            $('body').removeClass('sticky-page-nav');
        }
        else {
            $('#page-nav-wrapper').addClass('fixed');
            $('body').addClass('sticky-page-nav');
        }

        // Handle whether to fade intro-btn
        var introBtnDistance = $('#intro-btn').offset().top;

        console.log(`scrollTop: ${scrollTop} | windowHeight: ${windowHeight}`)

        if (scrollTop >= windowHeight * .66) {
            console.log('Fading In...');
            $('#intro-btn').hide().fadeIn();
        }
        else {
            console.log('Fading Out...');
            $('#intro-btn').show().fadeOut();

        }
    }



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

    // scroll body to overview on click
    $('#to-overview').click(function () {
        $('body,html').animate({
            scrollTop: $("#overview").offset().top
        }, 800);
        return false;
    });

    // scroll body to header on click
    $('#to-header').click(function () {
        $('body,html').animate({
            scrollTo: $("#overview").offset().top
        }, 800);
        return false;
    });

    // animated underline on navbar
    var $el,
        leftPos,
        newWidth,
        $mainNav = $(".page-nav");

    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");

    $magicLine
        .width($(".active").width())
        .css("left", $(".active a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());

    // move magic-line on hover
    $(".page-nav li a").hover(
        function () {
            $el = $(this);
            leftPos = $el.position().left;
            newWidth = $el.parent().width();
            $magicLine.stop().animate({
                left: leftPos,
                width: newWidth
            });
        },
        function () {
            $magicLine.stop().animate({
                left: $magicLine.data("origLeft"),
                width: $magicLine.data("origWidth")
            });
        }
    );

    // lock magic line to new position on click
    $(".page-nav li a").click(
        function () {
            $el = $(this);
            leftPos = $el.position().left;
            newWidth = $el.parent().width();

            $(".active").removeClass("active");
            $el.parent().addClass("active");

            $magicLine
                .width($(".active").width())
                .css("left", $(".active a").position().left)
                .data("origLeft", $magicLine.position().left)
                .data("origWidth", $magicLine.width());
        });

    // update magic line to new position via scrollspy
    $('#myScrollspy').on('activate.bs.scrollspy', function () {
        // do something…
    })

    // fade magic line out if overview is visible
    $(window).on("load scroll resize", function () {
        if ($(".page-nav-wrapper").hasClass("fixed")) {
            $("#magic-line").fadeIn();
        } else {
            $("#magic-line").fadeOut();
        }
    });
});
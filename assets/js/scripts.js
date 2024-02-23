/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#particles').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point reveal2"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon reveal2"><i class="fa-solid fa-building"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    $(window).scroll(function() {
    if ($(this).scrollTop() > 0 || window.location.pathname !== '/') {
        $('header').addClass('scrolled');
        $('#menu').addClass('shadow');
        $('#sage_logo').attr('src', 'assets/favicons/logo-blue.svg');
    } else {
        $('header').removeClass('scrolled');
        $('#menu').removeClass('shadow');
        $('#sage_logo').attr('src', 'assets/favicons/logo-white.svg');
    }
});

})(jQuery);

$(document).ready(function() {
    $('#particles').particleground({
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
    });
    $('#intro').css({
        'margin-top': -($('#intro').height() / 2)
    });
});

new TypeIt("#myJobs", {
    speed: 90,
    startDelay: 900,
    loop: true,
})
  .type("PhD Student", { delay: 400 })
    .pause(500)
    .delete(7, { delay: 400 })
    .type("Researcher", { delay: 400 })
    .pause(500)
    .move(-10, { delay: 400 })
    .delete(4, { delay: 400 })
    .type("AI ", { delay: 400 })
    .pause(500)
    .move(10, { delay: 400 })
    .delete(10, { delay: 400 })
    .type("Engineer", { delay: 400 })
    .pause(500)
    .move(-8, { delay: 400 })
    .delete(3, { delay: 400 })
    .type("Data ", { delay: 400 })
    .pause(500)
    .move(8, { delay: 400 })
    .delete(8, { delay: 400 })
    .type("Scientist", { delay: 400 })
    .pause(500)
    .delete(14, { delay: 400 })
    .type("PhD Student | AI Researcher | Data Scientist", { delay: 400 })
    .pause(2000)
  .go();

new TypeIt("#disclaimer", {
    speed: 90,
    startDelay: 3000,
    loop: true,
})
  .type("<i>(Disclaimer: I shouldn't tell, but I'm an AI writing this text for Pascal &#x1F609;)</i>", { delay: 800 })
    .pause(10000)

  .go();
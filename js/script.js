$(".scrollTo").on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: ($(target).offset().top)
    }, 2000);
 });

$(window).scroll(function() { // when the page is scrolled run this
    if($(this).scrollTop() != 0) { // if you're NOT at the top
        $('#returnImg').fadeIn("fast"); // fade in
    } else { // else
        $('#returnImg').fadeOut("fast"); // fade out
    }
});
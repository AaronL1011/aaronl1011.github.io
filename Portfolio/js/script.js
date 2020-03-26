const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const body = document.body;

// Button Event Handlers

darkButton.onclick = () => {
    body.classList.replace('light', 'dark');
};

lightButton.onclick = () => {
    body.classList.replace('dark', 'light');
};

$(".scrollTo").on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: ($(target).offset().top)
    }, 1500);
 });

 $(window).scroll(function() { // when the page is scrolled run this
    if($(this).scrollTop() != 0) { // if you're NOT at the top
        $('#top').fadeIn("fast"); // fade in
    } else { // else
        $('#top').fadeOut("fast"); // fade out
    }
});


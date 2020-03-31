function setTheme() {
    var theme = window.localStorage.portfolioTheme;

    if (theme == "light") {
        body.classList.replace('dark', 'light');
    } else if (localStorage.portfolioTheme == "dark") {
        body.classList.replace('light', 'dark');
    } else {};;
};

const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const body = document.body;

window.onload = setTheme();

// Button Event Handlers

darkButton.onclick = () => {
    localStorage.portfolioTheme = "dark";
    body.classList.replace('light', 'dark');
    return false; // Prevents screen returning to top when theme is changed
};

lightButton.onclick = () => {
    localStorage.portfolioTheme = "light";
    body.classList.replace('dark', 'light');
    return false; // Prevents screen returning to top when theme is changed
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

function openNav() {
    document.getElementById("mySidenav").style.width = "80px";
}
  
  /* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


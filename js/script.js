const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');
const body = document.body;

// Button Event Handlers

darkButton.onclick = () => {
    body.classList.replace('light', 'dark');
    return false; // Prevents screen returning to top when theme is changed
};

lightButton.onclick = () => {
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


var bodyElement = document.querySelector("body");
    
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
    
var delay = 0;
    
function changeColor() {
    delay++;
        
    if (delay > 3) {
        document.body.style.background = getRandomColor();
        delay = 0;
    }
    
    requestAnimationFrame(changeColor);
}         
    
function getRandomColor() {
    // creating a random number between 0 and 255
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
        
    // going from decimal to hex
    var hexR = r.toString(16);
    var hexG = g.toString(16);
    var hexB = b.toString(16);
        
    // making sure single character values are prepended with a "0"
    if (hexR.length == 1) {
        hexR = "0" + hexR;
    }
        
    if (hexG.length == 1) {
        hexG = "0" + hexG;
    }
    
    if (hexB.length == 1) {
        hexB = "0" + hexB;
    }
    
    // creating the hex value by concatenatening the string values
    var hexColor = "#" + hexR + hexG + hexB;
    return hexColor.toUpperCase();
}


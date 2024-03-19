let rotation = 0;
$(document).ready(function() {
 $('#test').animate({
    'right' : '-400px'
 }, 1500, function() {
    $('#test2').animate({
      'right' : '10px'
    }, 1500);
 });

 for (let i = 0; i < 100; i++) {
    $('#load').animate({
      'left' : '1810px'
    }, 3000).animate({
      'left' : '10px'
    }, 3000);

    $('#test3').animate({
      'fontSize' : '100px'
    }, 1500).animate({
      'fontSize' : '50px',
    }, 1500);
 }
 });
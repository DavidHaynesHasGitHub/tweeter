const maxLetters = 140;

$(document).ready(function () {

  $('.new-tweet textarea').on('keyup', function () {
    let lettersUsed = $(this).val().length;
    //set the text on the page
    $(this).parent().children('.counter').text(140 - lettersUsed);
    //set the color to orange when there are 15 chars left
    if (lettersUsed > 125) {
        $(this).parent().children('.counter').css('color', 'orange');
    }
    //sets the color to red when there are no more chars left
    if (lettersUsed > 139) {
      $(this).parent().children('.counter').css('color', 'red');
    }
  });
})

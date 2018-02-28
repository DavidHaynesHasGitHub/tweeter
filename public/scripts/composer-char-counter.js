const maxLetters = 140;

$(document).ready(function () {

    $('.new-tweet textarea').on('keyup', function () {
        let lettersUsed = $(this).val().length;

        $(this).parent().children('.counter').text(140 - lettersUsed);

        if (lettersUsed > maxLetters) {
            $(this).parent().children('.counter').css('color', 'red');
        }
    });
})

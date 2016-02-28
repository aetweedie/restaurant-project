// add scripts

$(document).on('ready', function() {
    var originalString = $('.truncate').text();
    var truncatedString = $('.truncate').succinct({
            size: 80,
            omission: '<a class="truncLink" href="">...</a>'
        });
});

$(document).on('click', '.truncLink', function(event) {
    event.preventDefault();
    $(document).find('.truncate').text(originalString);
});
// add scripts


$(document).on('ready', function() {
    var truncated = $('.truncate');
    var truncateLength = 80;


    truncated.each(function(review) {
        var text = $(this).text();
        if (text.length > truncateLength) {
            $(this).html(text.slice(0, truncateLength) + '<a href="#" class="untruncate" data-toggle="tooltip" title="Click for more" data-placement="bottom">...</a>');
        }

        $('.untruncate').on('click', function(event) {
            event.preventDefault();
            $(this).hide();
            $(this).parent().text(text);
        });

        $('[data-toggle="tooltip"]').tooltip();
    });

});

$(document).on('click', '#delete', function(event) {
    event.preventDefault();
    bootbox.confirm('Are you sure you want to delete this restaurant?', function(val) {
        if (val) {
          var href = $('#delete').attr('href');
          $.ajax({url: href}).done(function(result) {
            window.location.replace('/');
          });
        }
    });
});

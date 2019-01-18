function moreSprouts() {
  var baseLink = $('.more-sprouts:eq(0)');
  if (baseLink.length > 0) {
    var currentURL = baseLink.attr('href');
    $.get(currentURL).success(function(data) {
      for (var i = 0; i < data.length; i++) {
          $('.tweets').append(
            $('<li>').attr('class', 'tweet').append(
              $('<div>').attr('class', 'body').text(data[i].text),
              $('<div>').attr('class', 'user').text(data[i].username)
            )
          )
        }
    });

    var match = baseLink.attr('href').match(/page=(\d+)/);
    var newURL = currentURL.replace(match[0], 'page=' + (parseInt(match[1]) + 1));
    $.get(newURL).success(function(data) {
      if (data.length > 0) {
        baseLink.attr('href', newURL);
      }
      else {
        baseLink.remove();
      }
    });
  }
}

// onClick load
$('.more-sprouts').on('click', function(event) {
  event.preventDefault();
  moreSprouts();
});

// scroll load
// more sprouts link not hidden for onClick load version (above) to work; if need to hide it, can hide the link on page load.
$(window).scroll(function() {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    moreSprouts();
  }
});

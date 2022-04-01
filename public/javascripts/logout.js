$(document).ready(function() {
  $("#logout").on('click tap', function() {
    $.ajax({
      type: "POST",
      url: "/logout", 
      success: function(response) {
        if (response.result == 'redirect') {
          //redirecting to main page from here.
          window.location.replace(response.url);
        }
      }
    });
  })
});
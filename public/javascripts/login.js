$(document).ready(function() {
    $("#login").on('click tap', function() {

        const username = $("#username").val();
        const password = $("#password").val();
        const credentials = { 'username' : username, 'password': password };

        // Produktiv nur mit SSL verwenden
        $.ajax({
            type: "POST",
            url: "/login",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(credentials),
            traditional: true,
            success: function(response) {
                if (response.result == 'redirect') {
                    //redirecting to main page from here.
                    window.location.replace(response.url);
                }
            } 
        });
    }
    )
});
     
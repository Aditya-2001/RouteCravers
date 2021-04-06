$("#login_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("login_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            $("#login_form").trigger('reset');
            alert("Login is Successfull")
            
            location.reload();
        },
        error: function (response) {
            document.getElementById("inputPassword").value=""
            document.getElementById("error").innerHTML=response["responseJSON"]["error"];
            $('#error').fadeIn();
            $('#error').delay(1000).fadeOut(500);
            document.getElementById("login_button").disabled = false;
        }
    })
})
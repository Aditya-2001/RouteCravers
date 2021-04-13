$("#change_password").submit(function (e) {
    e.preventDefault();
    if(validate()==false){
        return false
    }
    document.getElementById("add_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            $("#change_password").trigger('reset');
            alert("Password Changed Successfully")
            location.reload();
        },
        error: function (response) {
            document.getElementById("add_button").disabled = false;
            document.getElementById("message").innerHTML=response["responseJSON"]["error"];
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
        }
    })
})

function validate() {
    password1 = document.getElementById('password1').value
    password2 = document.getElementById('password2').value
    if (password1 != password2) {
        document.getElementById("message").innerHTML = "Both the passwords are diferent";
        $('#message').fadeIn();
        $('#message').delay(4000).fadeOut(4000);
        return false;
    } else {
        var val = passwordchecker(password1)
        if (!val) {
            document.getElementById("message").innerHTML = "Password must have atleast 8 characters with digits, letters and special characters";
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
            return false
        }
        return true
    }
}

function passwordchecker(str) {
    if ((str.match(/[a-z]/g) || str.match(/[A-Z]/g)) && str.match(
            /[0-9]/g) && str.match(
            /[^a-zA-Z\d]/g) && str.length >= 8)
        return true;
    return false;
}
$("#signup_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("signup_button").disabled = true;
    if(validate()==false){
        document.getElementById("signup_button").disabled = false;
        return false;
    }
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("inputEmail1").value=document.getElementById("inputEmailAddress").value
            $("#signup_form").trigger('reset');
            document.getElementById("details_entering").style.display="none"
            document.getElementById("otp_verification").style.display="block"
            alert("Signup is Successfull")
        },
        error: function (response) {
            document.getElementById("inputPassword").value=""
            document.getElementById("inputConfirmPassword").value=""
            document.getElementById("error").innerHTML=response["responseJSON"]["error"];
            $('#error').fadeIn();
            $('#error').delay(1000).fadeOut(500);
            document.getElementById("signup_button").disabled = false;
        }
    })
})

function validate() {
    password1 = document.getElementById('inputPassword').value
    password2 = document.getElementById('inputConfirmPassword').value
    if (password1 != password2) {
        document.getElementById("error").innerHTML = "Both the passwords are diferent";
        $('#error').fadeIn();
        $('#error').delay(1000).fadeOut(500);
        return false;
    } else {
        var val = passwordchecker(password1)
        if (!val) {
            document.getElementById("error").innerHTML = "Password must have atleast 8 characters with digits, letters and special characters";
            $('#error').fadeIn();
            $('#error').delay(1000).fadeOut(500);
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


$("#otp_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("otp_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "otp/verify/",
        data: serializedData,
        success: function (response) {
            call_ajax_for_login_page()
        },
        error: function (response) {
            document.getElementById("otp").value=""
            document.getElementById("error1").innerHTML=response["responseJSON"]["error"];
            $('#error1').fadeIn();
            $('#error1').delay(1000).fadeOut(500);
            document.getElementById("otp_button").disabled = false;
        }
    })
})

function call_ajax_for_login_page(){
    alert("account_created")
}
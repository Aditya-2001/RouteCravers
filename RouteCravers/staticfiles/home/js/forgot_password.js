$("#forgot_password_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("forgot_password_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("inputEmail1").value=document.getElementById("inputEmailAddress").value
            $("#forgot_password_form").trigger('reset');
            document.getElementById("details_entering").style.display="none"
            document.getElementById("otp_verification").style.display="block"
        },
        error: function (response) {
            document.getElementById("error").innerHTML=response["responseJSON"]["error"];
            $('#error').fadeIn();
            $('#error').delay(1000).fadeOut(500);
            document.getElementById("forgot_password_button").disabled = false;
        }
    })
})

$("#otp_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("otp_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "otp/verify/reset_password/",
        data: serializedData,
        success: function (response) {
            document.getElementById("otp_verification").style.display="none"
            document.getElementById("new_password_form_verification").style.display="block"
            document.getElementById("inputEmail2").value=document.getElementById("inputEmail1").value
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

function resend_otp(){
    email=document.getElementById("inputEmail1").value
    serializedData='email='+ email
    $.ajax({
        type: 'GET',
        url: "otp/resend/reset_password/",
        data: serializedData,
        success: function (response) {
            document.getElementById("error1").innerHTML="We have sent a new OTP, Check it...";
            $('#error1').fadeIn();
            $('#error1').delay(1000).fadeOut(500);
        },
        error: function (response) {
            document.getElementById("error1").innerHTML="Unable to send OTP...";
            $('#error1').fadeIn();
            $('#error1').delay(1000).fadeOut(500);
        }
    })
}

$("#new_password_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("reset_password_button").disabled = true;
    if(validate()==false){
        document.getElementById("reset_password_button").disabled = false;
        return false;
    }
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "new_password/",
        data: serializedData,
        success: function (response) {
            document.getElementById("new_password_form_verification").style.display="none"
            document.getElementById("redirection").style.display="block"
        },
        error: function (response) {
            document.getElementById("error2").innerHTML=response["responseJSON"]["error"];
            $('#error2').fadeIn();
            $('#error2').delay(1000).fadeOut(500);
            document.getElementById("reset_password_button").disabled = false;
        }
    })
})

function validate() {
    password1 = document.getElementById('inputPassword').value
    password2 = document.getElementById('inputConfirmPassword').value
    if (password1 != password2) {
        document.getElementById("error2").innerHTML = "Both the passwords are diferent";
        $('#error2').fadeIn();
        $('#error2').delay(1000).fadeOut(500);
        return false;
    } else {
        var val = passwordchecker(password1)
        if (!val) {
            document.getElementById("error2").innerHTML = "Password must have atleast 8 characters with digits, letters and special characters";
            $('#error2').fadeIn();
            $('#error2').delay(1000).fadeOut(500);
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
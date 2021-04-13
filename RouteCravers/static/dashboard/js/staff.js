$("#add_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("add_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("message").innerHTML="Staff Added and login credentials send successfully";
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
            document.getElementById("add_button").disabled = false;
            tableBody = $("table tbody")
            markup=`<tr>
                    <td>-</td>
                    <td>`+document.getElementById("username").value+`</td>
                    <td>`+document.getElementById("email").value+`</td>
                    <td>`+document.getElementById("first_name").value + " " + document.getElementById("last_name").value +`</td>
                </tr>    `
            tableBody.append(markup);
            $("#add_form").trigger('reset');
        },
        error: function (response) {
            document.getElementById("add_button").disabled = false;
            document.getElementById("message").innerHTML=response["responseJSON"]["error"];
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
        }
    })
})
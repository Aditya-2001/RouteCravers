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
                    <td>Active</td>
                    <td>-</td>
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

function change_status(id){
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "delete/",
        data: serializedData,
        success: function (response) {
            if(document.getElementById(String(id)).innerHTML=="Active"){
                document.getElementById(String(id)).innerHTML="Disabled"
            }
            else{
                document.getElementById(String(id)).innerHTML="Active"
            }
            alert("Staff Account's Status Changed")
        },
        error: function (response) {
            alert(response["responseJSON"]["error"]);
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
        }
    })
}
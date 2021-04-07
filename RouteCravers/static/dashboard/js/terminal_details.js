$("#add_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("add_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("message").innerHTML="Terminal Detail Added successfully";
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
            document.getElementById("add_button").disabled = false;
            tableBody = $("table tbody")
            markup=`<tr>
                    <td>-</td>
                    <td>`+document.getElementById("name").value+`</td>
                    <td>`+document.getElementById("city").value+`</td>
                    <td>`+document.getElementById("state").value+`</td>
                    <td>`+document.getElementById("terminal_code").value+`</td>
                    <td>Just Now</td>
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

function open_edit_modal(id){
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "get/",
        data: serializedData,
        success: function (response) {
            data=response.data
            // alert(data)
            data=JSON.parse(data)[0]
            document.getElementById("accomodation_code1").value = data.fields.accomodation_code
            document.getElementById("accomodation_name1").value = data.fields.accomodation_name
            document.getElementById("multiplier1").value = data.fields.multiplier
            document.getElementById("refund_percentage1").value = data.fields.refund_percentage
            document.getElementById("no_refund_time1").value = data.fields.no_refund_time
            document.getElementById("min_refund_time1").value = data.fields.min_refund_time
            document.getElementById("addition_deduction_percentage1").value = data.fields.addition_deduction_percentage
            document.getElementById("addition_deduction_rate1").value = data.fields.addition_deduction_rate
        },
        error: function (response) {
            document.getElementById("message1").innerHTML=response["responseJSON"]["error"];
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
        }
    })

    document.getElementById("edit_entry").style.display="block"
}

$("#edit_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("edit_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("message1").innerHTML="Bus Detail Updated successfully";
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
            document.getElementById("edit_button").disabled = false;
            node=document.getElementById(document.getElementById("accomodation_code1").value)
            node.remove()
            tableBody = $("table tbody")
            markup=`<tr>
                    <td>`+document.getElementById("accomodation_code1").value+`</td>
                    <td>`+document.getElementById("accomodation_name1").value+`</td>
                    <td>`+document.getElementById("multiplier1").value+`</td>
                    <td>`+document.getElementById("refund_percentage1").value+`</td>
                    <td>`+document.getElementById("no_refund_time1").value+`</td>
                    <td>`+document.getElementById("min_refund_time1").value+`</td>
                    <td>`+document.getElementById("addition_deduction_percentage1").value+`</td>
                    <td>`+document.getElementById("addition_deduction_rate1").value+`</td>
                    <td>Just Now</td>
                    <td>-</td>
                </tr>    `
            tableBody.append(markup);
            $("#edit_form").trigger('reset');
        },
        error: function (response) {
            document.getElementById("edit_button").disabled = false;
            document.getElementById("message1").innerHTML=response["responseJSON"]["error"];
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
        }
    })
})
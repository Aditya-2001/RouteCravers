$("#add_form").submit(function (e) {
    e.preventDefault();
    document.getElementById("add_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("message").innerHTML="Bus Added successfully";
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
            document.getElementById("add_button").disabled = false;
            tableBody = $("table tbody")
            active="Yes"
            if(parseInt(document.getElementById("active").value)==2){
                active="No"
            }
            markup=`<tr>
                    <td>-</td>
                    <td>`+document.getElementById("name").value+`</td>
                    <td>`+document.getElementById("RTO_number").value+`</td>
                    <td>`+document.getElementById("details").value+`</td>
                    <td>`+document.getElementById("seats").value+`</td>
                    <td>`+active+`</td>
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
            document.getElementById("name1").value = data.fields.name
            document.getElementById("RTO_number1").value = data.fields.RTO_number
            document.getElementById("details1").value = data.fields.details
            document.getElementById("seats1").value = parseInt(data.fields.seats)
            if(data.fields.active==true)
                document.getElementById("active1").value = '1'
            else
                document.getElementById("active1").value = '2'
            document.getElementById("pk_id").value = id
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
            document.getElementById("message1").innerHTML="Bus Updated successfully";
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
            document.getElementById("edit_button").disabled = false;
            node=document.getElementById(document.getElementById("pk_id").value)
            node.remove()
            tableBody = $("table tbody")
            active="Yes"
            if(parseInt(document.getElementById("active1").value)==2){
                active="No"
            }
            bus_details=document.getElementById("details1")
            markup=`<tr>
                    <td>`+document.getElementById("pk_id").value+`</td>
                    <td>`+document.getElementById("name1").value+`</td>
                    <td>`+document.getElementById("RTO_number1").value+`</td>
                    <td>`+bus_details.options[bus_details.selectedIndex].text+`</td>
                    <td>`+document.getElementById("seats1").value+`</td>
                    <td>`+active+`</td>
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
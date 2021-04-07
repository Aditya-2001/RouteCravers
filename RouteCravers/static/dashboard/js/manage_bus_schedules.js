$("#add_form").submit(function (e) {
    e.preventDefault();
    s=document.getElementById("bus").value
    d=document.getElementById("busR").value
    if(s==d){
        document.getElementById("message").innerHTML="Bus for forward and reverse route can't be same";
        $('#message').fadeIn();
        $('#message').delay(4000).fadeOut(4000);
        return false;
    }
    document.getElementById("add_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            document.getElementById("message").innerHTML="Bus Schedule Added successfully";
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
            document.getElementById("add_button").disabled = false;
            tableBody = $("table tbody")
            bus=document.getElementById("bus")
            day=document.getElementById("departure_day")
            markup=`<tr>
                    <td>-</td>
                    <td>`+bus.options[bus.selectedIndex].text+`</td>
                    <td>`+document.getElementById("fare").value+`</td>
                    <td>No</td>
                    <td>-</td>
                    <td>`+document.getElementById("schedule").value+`</td>
                    <td>`+day.options[day.selectedIndex].text+`</td>
                    <td>`+document.getElementById("departure_time").value+`</td>
                    <td>Just now</td>
                    <td>-</td>
                </tr>    `
            tableBody.append(markup);
            bus=document.getElementById("busR")
            day=document.getElementById("departure_dayR")
            markup=`<tr>
                    <td>-</td>
                    <td>`+bus.options[bus.selectedIndex].text+`</td>
                    <td>`+document.getElementById("fare").value+`</td>
                    <td>Yes</td>
                    <td>-</td>
                    <td>`+document.getElementById("schedule").value+`</td>
                    <td>`+day.options[day.selectedIndex].text+`</td>
                    <td>`+document.getElementById("departure_time").value+`</td>
                    <td>Just now</td>
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
            document.getElementById("schedule1").value = data.fields.schedule
            document.getElementById("bus1").value = data.fields.bus
            document.getElementById("departure_day1").value = data.fields.departure_day
            document.getElementById("departure_time1").value = data.fields.departure_time
            document.getElementById("fare1").value = data.fields.fare
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
            document.getElementById("message1").innerHTML="Schedule Updated successfully";
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
            document.getElementById("edit_button").disabled = false;
            node=document.getElementById(document.getElementById("pk_id").value)
            node.remove()
            tableBody = $("table tbody")
            bus=document.getElementById("bus1")
            day=document.getElementById("departure_day1")
            markup=`<tr>
                    <td>-</td>
                    <td>`+bus.options[bus.selectedIndex].text+`</td>
                    <td>`+document.getElementById("fare1").value+`</td>
                    <td>No</td>
                    <td>-</td>
                    <td>`+document.getElementById("schedule1").value+`</td>
                    <td>`+day.options[day.selectedIndex].text+`</td>
                    <td>`+document.getElementById("departure_time1").value+`</td>
                    <td>Just now</td>
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
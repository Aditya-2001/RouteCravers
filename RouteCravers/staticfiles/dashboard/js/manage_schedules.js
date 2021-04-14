$("#add_form").submit(function (e) {
    e.preventDefault();
    s=document.getElementById("source").value
    d=document.getElementById("destination").value
    if(s==d){
        document.getElementById("message").innerHTML="Source and Destination can't be same";
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
            document.getElementById("message").innerHTML="Schedule Added successfully";
            $('#message').fadeIn();
            $('#message').delay(4000).fadeOut(4000);
            document.getElementById("add_button").disabled = false;
            tableBody = $("table tbody")
            source=document.getElementById("source")
            destination=document.getElementById("destination")
            markup=`<tr>
                    <td>-</td>
                    <td>`+source.options[source.selectedIndex].text+`</td>
                    <td>`+destination.options[destination.selectedIndex].text+`</td>
                    <td>`+document.getElementById("distance").value+`</td>
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
            document.getElementById("source1").value = data.fields.source
            document.getElementById("destination1").value = data.fields.destination
            document.getElementById("distance1").value = data.fields.distance
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
            source=document.getElementById("source1")
            destination=document.getElementById("destination1")
            markup=`<tr>
                    <td>`+document.getElementById("pk_id").value+`</td>
                    <td>`+source.options[source.selectedIndex].text+`</td>
                    <td>`+destination.options[destination.selectedIndex].text+`</td>
                    <td>`+document.getElementById("distance1").value+`</td>
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
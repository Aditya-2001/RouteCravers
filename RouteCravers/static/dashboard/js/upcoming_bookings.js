function cancel_booking(id){
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "cancel/",
        data: serializedData,
        success: function (response) {
            alert("Booking Cancelled")
            // data=response.data
            // data=JSON.parse(data)[0]
            // document.getElementById("schedule1").value = data.fields.schedule
            // document.getElementById("terminal1").value = data.fields.terminal
            // document.getElementById("distance_from_source1").value = data.fields.distance_from_source
            // document.getElementById("pk_id").value = id
        },
        error: function (response) {
            alert(response["responseJSON"]["error"]);
        }
    })
}
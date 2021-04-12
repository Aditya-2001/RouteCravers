function cancel_booking(id){
    if(confirm("Are you sure to cancel booking?")==false){
        return false
    }
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "cancel/",
        data: serializedData,
        success: function (response) {
            alert("Booking Cancelled")
            document.getElementById(id).remove()
        },
        error: function (response) {
            alert(response["responseJSON"]["error"]);
        }
    })
}
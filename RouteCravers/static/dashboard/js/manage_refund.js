function initiate_refund(id){
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "refund/",
        data: serializedData,
        success: function (response) {
            document.getElementById(id).remove()
            alert("Refund given successfully")
        },
        error: function (response) {
            alert(response["responseJSON"]["error"]);
        }
    })
}
$("#routes").submit(function (e) {
    e.preventDefault();
    document.getElementById("find_routes").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "",
        data: serializedData,
        success: function (response) {
            data=response.data
            data=JSON.parse(data)
            n=Object.keys(data).length
            document.getElementById("layoutAuthentication_content").style.display="none"
            document.getElementById("parent").innerHTML=""
            if(n==0){
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body">Sorry! No Route Found</div></div></div>'
                $("#parent").append(message)
            }
            else{
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body">'+n+' Routes found!!!</div></div></div>'
                $("#parent").append(message)
            }
            $("#parent").append("")
            for(var i=0;i<n;i++){
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Source Terminal : '+data[i].fields.source+', Destination Terminal : '+data[i].fields.destination+', Total Distance : '+data[i].fields.distance+'Km <br><br><button type="button" class="btn btn-primary" onclick="show_details('+data[i].pk+')">See Details</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-success" onclick="book('+data[i].pk+')">Book</button></div></div></div>'
                $("#parent").append(message)
            }

            document.getElementById("find_routes").disabled = false;
            // $("#routes").trigger('reset');
        },
        error: function (response) {
            document.getElementById("find_routes").disabled = false;
            document.getElementById("error").innerHTML=response["responseJSON"]["error"];
            $('#error').fadeIn();
            $('#error').delay(4000).fadeOut(4000);
        }
    })
})

function show_details(id){
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "get/",
        data: serializedData,
        success: function (response) {
            data=JSON.parse(response.data)[0]
            terminals=JSON.parse(response.terminals)
            stops=JSON.parse(response.stops)
            bus_schedules=JSON.parse(response.bus_schedules)
            n=Object.keys(stops).length
            if(n==0){
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8  bg-danger"><div class="card-body">Sorry! No Stop Found</div></div></div>'
                $("#terminals_to_be_added").append(message)
                document.getElementById("show_entry").style.display="block"
                return ;
            }
            for(var i=0;i<n;i++){
                id=parseInt(stops[i].fields.terminal)
                n1=Object.keys(terminals).length
                var name_=""
                var city=""
                var state=""
                var terminal_code=""
                for(var j=0;j<n1;j++){
                    if(id==parseInt(terminals[j].pk)){
                        name_=terminals[j].fields.name
                        city=terminals[j].fields.city
                        state=terminals[j].fields.state
                        terminal_code=terminals[j].fields.terminal_code
                        break
                    }
                }
                if(i==0){
                    message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Terminal Name : '+name_+', Code : '+terminal_code+', City : '+city+' , State : '+state+'</div><div class="card-body">First Terminal of journey</div></div></div><br>'
                }
                else{
                    if(i==n-1){
                        message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Terminal Name : '+name_+', Code : '+terminal_code+', City : '+city+' , State : '+state+'</div><div class="card-body">Distance Covered yet : '+ stops[i].fields.distance_from_source +' Km</div><div class="card-body">Last Terminal of journey</div></div></div><br>'
                    }
                    else{
                        message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Terminal Name : '+name_+', Code : '+terminal_code+', City : '+city+' , State : '+state+'</div><div class="card-body">Distance Covered yet : '+ stops[i].fields.distance_from_source +' Km</div></div></div><br>'
                    }
                }
                
                $("#terminals_to_be_added").append(message)
            }
            

            n=Object.keys(bus_schedules).length
            if(n==0){
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8 bg-danger"><div class="card-body">Sorry! No Bus Scheduled on this route</div></div></div>'
                $("#terminals_to_be_added").append(message)
                document.getElementById("show_entry").style.display="block"
                return ;
            }
            else{
                message='<br><br><div class="row justify-content-center"><div class="card text-center col-lg-8 bg-primary"><div class="card-body">Buses Available on this route</div></div></div><br>'
                $("#terminals_to_be_added").append(message)
            }
            for(var i=0;i<n;i++){
                if(bus_schedules[i].fields.reverse_route==false){
                    reverse_route="No"
                }
                else{
                    reverse_route="Yes"
                }
                departure_day=get_day(parseInt(bus_schedules[i].fields.departure_day))
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>RTO Number : '+ bus_schedules[i].fields.bus +', Fare : Rs.'+bus_schedules[i].fields.fare+', Bus Number : '+bus_schedules[i].fields.bus_number+' , Available on : '+departure_day + ' '+bus_schedules[i].fields.departure_time +'</div><div class="card-body">For Reverse Route : '+ reverse_route +' </div></div></div><br>'

                $("#terminals_to_be_added").append(message)
            }
            document.getElementById("show_entry").style.display="block"
        },
        error: function (response) {
            alert(response["responseJSON"]["error"])
        }
    })
}

function get_day(id){
    if(id==1){
        return "Monday"
    }
    if(id==2){
        return "Tuesday"
    }
    if(id==3){
        return "Wednesday"
    }
    if(id==4){
        return "Thursday"
    }
    if(id==5){
        return "Friday"
    }
    if(id==6){
        return "Saturday"
    }
    if(id==7){
        return "Sunday"
    }
    return "Unavailable"
}

bus_schedules=[]
stops=[]
terminals=[]
my_data=[]

function book(id){
    var serializedData = 'id='+ id
    $.ajax({
        type: 'GET',
        url: "get/",
        data: serializedData,
        success: function (response) {
            data=JSON.parse(response.data)[0]
            terminals=JSON.parse(response.terminals)
            stops=JSON.parse(response.stops)
            bus_schedules=JSON.parse(response.bus_schedules)
            my_data=data

            n=Object.keys(stops).length
            document.getElementById("source_stop").innerHTML=""
            document.getElementById("destination_stop").innerHTML=""
            for(var i=0;i<n;i++){
                var x= document.getElementById("source_stop")
                var option= document.createElement("option")
                option.value=stops[i].pk
                id=parseInt(stops[i].fields.terminal)
                n1=Object.keys(terminals).length
                var name_=""
                var city=""
                var state=""
                var terminal_code=""
                for(var j=0;j<n1;j++){
                    if(id==parseInt(terminals[j].pk)){
                        name_=terminals[j].fields.name
                        city=terminals[j].fields.city
                        state=terminals[j].fields.state
                        terminal_code=terminals[j].fields.terminal_code
                        break
                    }
                }
                option.innerHTML=name_+" , "+city+" , "+state+" , "+terminal_code
                x.appendChild(option)
            }
            document.getElementById("destination_stop").innerHTML=""
            for(var i=0;i<n;i++){
                var x= document.getElementById("destination_stop")
                var option= document.createElement("option")
                option.value=stops[i].pk
                id=parseInt(stops[i].fields.terminal)
                n1=Object.keys(terminals).length
                var name_=""
                var city=""
                var state=""
                var terminal_code=""
                for(var j=0;j<n1;j++){
                    if(id==parseInt(terminals[j].pk)){
                        name_=terminals[j].fields.name
                        city=terminals[j].fields.city
                        state=terminals[j].fields.state
                        terminal_code=terminals[j].fields.terminal_code
                        break
                    }
                }
                option.innerHTML=name_+" , "+city+" , "+state+" , "+terminal_code
                x.appendChild(option)
            }

            document.getElementById("bus").innerHTML=""
            n=Object.keys(bus_schedules).length
            for(var i=0;i<n;i++){
                var x= document.getElementById("bus")
                var option= document.createElement("option")
                option.value=bus_schedules[i].pk
                if(bus_schedules[i].fields.reverse_route==false){
                    reverse_route="No"
                }
                else{
                    reverse_route="Yes"
                }
                departure_day=get_day(parseInt(bus_schedules[i].fields.departure_day))

                option.innerHTML=bus_schedules[i].fields.bus+" , Rs."+bus_schedules[i].fields.fare+" , Number="+bus_schedules[i].fields.bus_number+" , "+terminal_code+" , "+departure_day+" , "+bus_schedules[i].fields.departure_time+" , Reverse Route : "+reverse_route
                x.appendChild(option)
            }
            document.getElementById("seats_booked").value=0
            document.getElementById("date_wise_schedule").value=data.pk
            document.getElementById("book_entry").style.display="block"
        },
        error: function (response) {
            alert(response["responseJSON"]["error"])
        }
    })
}

function close_show_entry(){
    document.getElementById("show_entry").style.display="none"
    document.getElementById("terminals_to_be_added").innerHTML=""
}

function close_book_entry(){
    document.getElementById("book_entry").style.display="none"
    document.getElementById("terminals_to_be_added1").innerHTML=""
}

$("#submit_form").submit(function (e) {
    e.preventDefault();
    if(validate()==false){
        return ;
    }
    document.getElementById("add_button").disabled = true;
    var serializedData = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: "check/seat/availability/",
        data: serializedData,
        success: function (response) {
            alert("Ticket Booked Successfully")
            document.getElementById("add_button").disabled = false;
            $("#submit_form").trigger('reset');
            location.reload();
        },
        error: function (response) {
            document.getElementById("add_button").disabled = false;
            document.getElementById("message1").innerHTML=response["responseJSON"]["error"];
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
            alert(response["responseJSON"]["error"])
        }
    })
})

selected_bus=[]

function  cal_fare(){
    source_stop=document.getElementById("source_stop").value
    destination_stop=document.getElementById("destination_stop").value
    if(source_stop==destination_stop){
        document.getElementById("fare").value=0
        return ;
    }
    bus_selc=document.getElementById("bus").value
    seats_opted=document.getElementById("seats_booked").value

    total_dis=parseInt(my_data.fields.distance)
    n=Object.keys(stops).length
    source_distance=0
    for(var i=0;i<n;i++){
        if(parseInt(source_stop)==parseInt(stops[i].pk)){
            source_distance=parseInt(stops[i].fields.distance_from_source)
            break;
        }
    }
    destination_distance=0
    for(var i=0;i<n;i++){
        if(parseInt(destination_stop)==parseInt(stops[i].pk)){
            destination_distance=parseInt(stops[i].fields.distance_from_source)
            break;
        }
    }
    new_distance=destination_distance-source_distance
    
    fare=0
    n=Object.keys(bus_schedules).length
    bus_is_reverse=false
    for(var i=0;i<n;i++){
        if(parseInt(bus_selc)==parseInt(bus_schedules[i].pk)){
            fare=parseInt(bus_schedules[i].fields.fare)
            selected_bus=bus_schedules[i].fields
            bus_is_reverse=bus_schedules[i].fields.reverse_route
            break;
        }
    }

    if(seats_opted<1){
        fare=0
    }


    new_fare=new_distance/total_dis*fare*(parseInt(seats_opted))
    if(new_fare<0){
        if(bus_is_reverse==false){
            alert("Hey!!!, the bus you selected runs on the reverse route of what you selected, choose another bus or another route")
            document.getElementById("fare").value=new_fare
        }
        else{
            document.getElementById("fare").value=0-new_fare
        }
    }
    else{
        if(bus_is_reverse==true){
            alert("Hey!!!, the bus you selected runs on the reverse route of what you selected, choose another bus or another route")
            document.getElementById("fare").value=0-new_fare
        }
        else{
            document.getElementById("fare").value=new_fare
        }
    }
}


function validate(){
    source_stop=document.getElementById("source_stop").value
    destination_stop=document.getElementById("destination_stop").value
    if(source_stop==destination_stop){
        document.getElementById("message1").innerHTML="Source and Destination must be different.";
        $('#message1').fadeIn();
        $('#message1').delay(4000).fadeOut(4000);
        return false;
    }

    seats_opted=document.getElementById("seats_booked").value
    if(seats_opted<=0){
        document.getElementById("message1").innerHTML="You must book minimum 1 seat.";
        $('#message1').fadeIn();
        $('#message1').delay(4000).fadeOut(4000);
        return false;
    }

    fare=document.getElementById("fare").value
    if(fare<=0){
        document.getElementById("message1").innerHTML="Fare must be positive, you must selected the reverse route, please select the other bus which has its reverse route as what you opted now.";
        $('#message1').fadeIn();
        $('#message1').delay(4000).fadeOut(4000);
        return false;
    }

    departure_day=document.getElementById("departure_day").value;
    var d=new Date(departure_day);

    if (!!d.valueOf()) {
        day = d.getDay();
        day_of_bus=parseInt(selected_bus.departure_day)%7
        if(day!=day_of_bus){
            scheduled_day=get_day(parseInt(selected_bus.departure_day))
            document.getElementById("message1").innerHTML="Hey the bus you have seleted is scheduled on " + scheduled_day;
            $('#message1').fadeIn();
            $('#message1').delay(4000).fadeOut(4000);
            return false;
        }
    } 
    else{
        document.getElementById("message1").innerHTML="Date is not in proper format.";
        $('#message1').fadeIn();
        $('#message1').delay(4000).fadeOut(4000);
        return false;
    }
}

window.onload = function(){
    var today = new Date().toISOString().split('T')[0];
    var nextMonthDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    document.getElementsByName("departure_day")[0].setAttribute('min', today);
    document.getElementsByName("departure_day")[0].setAttribute('max', nextMonthDate)
}
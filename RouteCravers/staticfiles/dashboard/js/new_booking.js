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
            terminal_distance=[]
            terminal_id=[]
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
                    message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Terminal Name : '+name_+', Code : '+terminal_code+', City : '+city+' , State : '+state+'</div><div class="card-body" id="'+stops[i].pk+'">First Terminal of journey</div></div></div><br>'
                }
                else{
                    if(i==n-1){
                        message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Terminal Name : '+name_+', Code : '+terminal_code+', City : '+city+' , State : '+state+'</div><div class="card-body" id="'+stops[i].pk+'">Distance Covered yet : '+ stops[i].fields.distance_from_source +' Km</div><div class="card-body">Last Terminal of journey</div></div></div><br>'
                    }
                    else{
                        message='<div class="row justify-content-center"><div class="card text-center col-lg-8"><div class="card-body" '+'>Terminal Name : '+name_+', Code : '+terminal_code+', City : '+city+' , State : '+state+'</div><div class="card-body" id="'+stops[i].pk+'">Distance Covered yet : '+ stops[i].fields.distance_from_source +' Km</div></div></div><br>'
                    }
                }
                terminal_distance.push(stops[i].fields.distance_from_source)
                terminal_id.push(stops[i].pk)
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
                message='<br><br><div class="row justify-content-center"><div class="card text-center col-lg-8" style="background: linear-gradient(to bottom left, #78ff34 0%, #1188ff 99%);"><div class="card-body">Buses Available on this route</div></div></div><br>'
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
                message='<div class="row justify-content-center"><div class="card text-center col-lg-8 change_my_color"><div onclick="set_timings(\''+bus_schedules[i].fields.departure_day+'\',\''+bus_schedules[i].fields.departure_time+'\',\''+terminal_distance+'\',\''+terminal_id+'\')" class="card-body" '+'>RTO Number : '+ bus_schedules[i].fields.bus +', Fare : Rs.'+bus_schedules[i].fields.fare+', Bus Number : '+bus_schedules[i].fields.bus_number+' , Available on : '+departure_day + ' '+bus_schedules[i].fields.departure_time +'</div><div class="card-body">For Reverse Route : '+ reverse_route +' </div></div></div><br>'

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
schedule_id=0

function book(id){
    var serializedData = 'id='+ id
    schedule_id=id
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
    if(set_seats_left()==false)
        document.getElementById("seats_lefted").innerHTML="iyg"

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

function set_seats_left(){

    date=document.getElementById("departure_day").value
    bus_id=document.getElementById("bus").value
    source=document.getElementById("source_stop").value
    destination=document.getElementById("destination_stop").value
    ajax_data={'id': schedule_id, 'date': date, 'bus_id': bus_id, 'source_stop': source, 'destination_stop': destination}
    $.ajax({
        type: 'GET',
        url: "check/seat/left/",
        data: ajax_data,
        dataType: "json",
        success: function (response) {
            data=JSON.parse(response.seats_left)
            document.getElementById("seats_lefted").innerHTML=" , "+String(data)+" seats left"
        },
        error: function (response) {
            
        }
    })
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

function set_timings(departure_day,departure_time,terminal_distance,terminal_id){
    alert("Timing set for the bus you selected")

    departure_time=departure_time.split(':')
    terminal_distance=terminal_distance.split(',')
    terminal_id=terminal_id.split(',')
    n=Object.keys(terminal_id).length
    
    // Assume 60km/hr
    speed=60
    for(var i=0;i<n;i++){
        html_content=document.getElementById(terminal_id[i]).innerHTML
        if(html_content.includes("Estimated")){
            index=html_content.search("Estimated")-1
        }
        else{
            index=html_content.length
        }
        day=departure_day
        extra_time=parseInt(terminal_distance[i])/speed
        minutes=Math.floor((parseInt(terminal_distance[i])/speed - Math.floor(extra_time))*60)

        extra_time=Math.floor(extra_time)
        
        new_time=Math.floor(parseInt(departure_time[0])+extra_time + (parseInt(departure_time[1]) + minutes)/60)
        day=Math.floor(day)+Math.floor(new_time/24)

        minutes=Math.floor((parseInt(departure_time[1]) + minutes)%60)

        new_time%=24
        if(day>7){
            day=day%7
        }
        
        arrival=String(new_time)+":"+String(minutes)

        html_content=String(html_content.substring(0,index+1))+"<br>Estimated Arrival : "+get_day(day)+", "+arrival
        document.getElementById(terminal_id[i]).innerHTML=html_content
    }
}

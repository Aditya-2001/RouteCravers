from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import (login,authenticate,logout)
from django.conf import settings
from django.core.mail import send_mail
import math,random,string,datetime,array,secrets
from .models import *
import math,random,string,array,secrets
from os import urandom
from random import choice
import os
from django.http import FileResponse
from threading import *
from django.http import JsonResponse
from django.core import serializers
# from .forms import *

# Create your views here.
def dashboard(request):
    if request.user.is_authenticated:
        return render(request,"dashboard/dashboard.html",context={})
    else:
        return redirect('home')
    
def bus_details(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                accomodation_code=int(request.POST.get('accomodation_code'))
                accomodation_name=(request.POST.get('accomodation_name'))
                multiplier=float(request.POST.get('multiplier'))
                refund_percentage=float(request.POST.get('refund_percentage'))
                no_refund_time=int(request.POST.get('no_refund_time'))
                min_refund_time=int(request.POST.get('min_refund_time'))
                addition_deduction_rate=int(request.POST.get('addition_deduction_rate'))
                addition_deduction_percentage=float(request.POST.get('addition_deduction_percentage'))
                type_=request.POST.get('type')
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            if int(type_)== 1:
                try:
                    BusDetail.objects.get(accomodation_code=accomodation_code)
                    return JsonResponse({"error": "Bus Details with the given accomodation already exists"}, status=400)
                except:
                    pass
                BusDetail.objects.create(accomodation_code=accomodation_code, 
                                         accomodation_name=accomodation_name,
                                         multiplier=multiplier,
                                         refund_percentage=refund_percentage,
                                         no_refund_time=no_refund_time,
                                         min_refund_time=min_refund_time,
                                         addition_deduction_percentage=addition_deduction_percentage,
                                         addition_deduction_rate=addition_deduction_rate)
                return JsonResponse({"success": ""}, status=200)
            elif int(type_) == 2:
                try:
                    details=BusDetail.objects.get(accomodation_code=accomodation_code)
                except:
                    return JsonResponse({"error": "Bus Details with the given accomodation donot exists"}, status=400)
                details.accomodation_code=accomodation_code
                details.accomodation_name=accomodation_name
                details.multiplier=multiplier
                details.refund_percentage=refund_percentage
                details.no_refund_time=no_refund_time
                details.min_refund_time=min_refund_time
                details.addition_deduction_rate=addition_deduction_rate
                details.addition_deduction_percentage=addition_deduction_percentage
                details.save()
                return JsonResponse({"success": ""}, status=200)
            else:
                return JsonResponse({"error": "Internal Error"}, status=400)
            
        else:
            data=BusDetail.objects.all()
            return render(request,"dashboard/bus_details.html",context={"data": data})
        
    else:
        return redirect('home')
    
def get_bus_details(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == False:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=BusDetail.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('bus_details')

def terminal_details(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                name=request.POST.get('name')
                city=request.POST.get('city')
                state=request.POST.get('state')
                terminal_code=request.POST.get('terminal_code')
                type_=request.POST.get('type')
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            if int(type_)== 1:
                try:
                    Terminal.objects.get(name=name,
                                         city=city,
                                         state=state,
                                         terminal_code=terminal_code)
                    return JsonResponse({"error": "Terminal Details with the given accomodation already exists"}, status=400)
                except:
                    pass
                Terminal.objects.create(name=name,
                                     city=city,
                                     state=state,
                                     terminal_code=terminal_code)
                return JsonResponse({"success": ""}, status=200)
            elif int(type_) == 2:
                pk=int(request.POST.get('pk_id'))
                try:
                    details=Terminal.objects.get(id=pk)
                except:
                    return JsonResponse({"error": "Terminal Details with the given details donot exists"}, status=400)
                details.name=name
                details.city=city
                details.state=state
                details.terminal_code=terminal_code
                details.save()
                return JsonResponse({"success": ""}, status=200)
            else:
                return JsonResponse({"error": "Internal Error"}, status=400)
            
        else:
            data=Terminal.objects.all()
            return render(request,"dashboard/terminal_details.html",context={"data": data})
        
    else:
        return redirect('home')
    
def get_terminal_details(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == False:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=Terminal.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('terminal_details')

def manage_buses(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                type_=request.POST.get('type')
                name=request.POST.get('name')
                if int(type_)==1:
                    RTO_number=request.POST.get('RTO_number')
                seats=int(request.POST.get('seats'))
                active=request.POST.get('active')
                details=int(request.POST.get('details'))
                if int(active)==1:
                    active=True
                else:
                    active=False
                details=BusDetail.objects.get(id=details)
                bus_details=details
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            if int(type_)== 1:
                try:
                    Bus.objects.get(RTO_number=RTO_number)
                    return JsonResponse({"error": "Bus already exists with given RTO number."}, status=400)
                except:
                    pass
                Bus.objects.create(name=name,
                                     RTO_number=RTO_number,
                                     seats=seats,
                                     active=active,
                                     details=details)
                return JsonResponse({"success": ""}, status=200)
            elif int(type_) == 2:
                pk=int(request.POST.get('pk_id'))
                try:
                    details=Bus.objects.get(id=pk)
                except:
                    return JsonResponse({"error": "Bus Details with the given details donot exists"}, status=400)
                details.name=name
                details.seats=seats
                details.active=active
                details.details=bus_details
                details.save()
                return JsonResponse({"success": ""}, status=200)
            else:
                return JsonResponse({"error": "Internal Error"}, status=400)
            
        else:
            data=Bus.objects.all()
            bus_details=BusDetail.objects.all()
            return render(request,"dashboard/manage_buses.html",context={"data": data, "bus_details": bus_details})
        
    else:
        return redirect('home')
    
def get_manage_buses(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == False:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=Bus.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('manage_buses')

def manage_schedules(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                type_=request.POST.get('type')
                if int(type_)==1:
                    source=Terminal.objects.get(id=int(request.POST.get('source')))
                    destination=Terminal.objects.get(id=int(request.POST.get('destination')))
                distance=float(request.POST.get('distance'))
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            if int(type_)== 1:
                try:
                    Schedule.objects.get(source=source, destination=destination)
                    return JsonResponse({"error": "Route already exists with given source and destination."}, status=400)
                except:
                    pass
                s=Schedule.objects.create(source=source, 
                                        destination=destination, 
                                        distance=distance)
                Stop.objects.create(schedule=s, terminal=s.source, distance_from_source=0)
                Stop.objects.create(schedule=s, terminal=s.destination, distance_from_source=s.distance)
                return JsonResponse({"success": ""}, status=200)
            elif int(type_) == 2:
                pk=int(request.POST.get('pk_id'))
                try:
                    details=Schedule.objects.get(id=pk)
                except:
                    return JsonResponse({"error": "Schedule with the given details donot exists"}, status=400)
                details.distance=distance
                details.save()
                return JsonResponse({"success": ""}, status=200)
            else:
                return JsonResponse({"error": "Internal Error"}, status=400)
            
        else:
            data=Schedule.objects.all()
            terminal_details=Terminal.objects.all()
            return render(request,"dashboard/manage_schedules.html",context={"data": data, "terminal_details": terminal_details})
        
    else:
        return redirect('home')
    
def get_manage_schedules(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == False:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=Schedule.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('manage_schedules')

def manage_bus_schedules(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                type_=request.POST.get('type')
                departure_day=int(request.POST.get('departure_day'))
                departure_time=request.POST.get('departure_time')
                if int(type_)==1:
                    schedule=Schedule.objects.get(id=int(request.POST.get('schedule')))
                    bus=Bus.objects.get(id=int(request.POST.get('bus')))
                    departure_timeR=request.POST.get('departure_timeR')
                    departure_dayR=int(request.POST.get('departure_dayR'))
                    busR=Bus.objects.get(id=int(request.POST.get('busR')))
                    
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            if int(type_)== 1:
                x=BusSchedule.objects.create(schedule=schedule, 
                                        bus=bus, 
                                        reverse_route=False,
                                        departure_day=departure_day,
                                        departure_time=departure_time)
                x1=BusSchedule.objects.create(schedule=schedule, 
                                        bus=busR, 
                                        reverse_route=True,
                                        departure_day=departure_dayR,
                                        departure_time=departure_timeR)
                fare=float(schedule.distance)*float(bus.details.multiplier)*settings.FARE_PER_KM
                fareR=float(schedule.distance)*float(busR.details.multiplier)*settings.FARE_PER_KM
                x.bus_number=x.id
                x.fare=fare
                x.save()
                x1.bus_number=x1.id
                x1.fare=fareR
                x1.save()
                return JsonResponse({"success": ""}, status=200)
            elif int(type_) == 2:
                pk=int(request.POST.get('pk_id'))
                try:
                    details=BusSchedule.objects.get(id=pk)
                except:
                    return JsonResponse({"error": "Bus Schedule with the given details donot exists"}, status=400)
                details.departure_time=departure_time
                details.departure_day=departure_day
                details.save()
                return JsonResponse({"success": ""}, status=200)
            else:
                return JsonResponse({"error": "Internal Error"}, status=400)
            
        else:
            data=BusSchedule.objects.all()
            bus_details=Bus.objects.all()
            schedule=Schedule.objects.all()
            return render(request,"dashboard/manage_bus_schedules.html",context={"data": data, "schedule": schedule, "bus_details": bus_details})
        
    else:
        return redirect('home')
    
def get_manage_bus_schedules(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == False:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=BusSchedule.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('manage_schedules')

def manage_date_wise_bus_schedules(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        data=DateWiseBusSchedule.objects.filter(departure_date__gte=datetime.datetime.now().date())
        return render(request,"dashboard/manage_date_wise_bus_schedules.html",context={"data": data})
    else:
        return redirect('home')
    
def manage_stops(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                type_=request.POST.get('type')
                if int(type_)==1:
                    schedule=Schedule.objects.get(id=int(request.POST.get('schedule')))
                    terminal=Terminal.objects.get(id=int(request.POST.get('terminal')))
                distance_from_source=float(request.POST.get('distance_from_source'))                    
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            if int(type_)== 1:
                try:
                    Stop.objects.get(schedule=schedule, terminal=terminal)
                    return JsonResponse({"error": "Hey!, at this schedule the terminal is already added."}, status=400)
                except:
                    pass
                Stop.objects.create(schedule=schedule, terminal=terminal, distance_from_source=distance_from_source)
                return JsonResponse({"success": ""}, status=200)
            elif int(type_) == 2:
                pk=int(request.POST.get('pk_id'))
                try:
                    details=Stop.objects.get(id=pk)
                except:
                    return JsonResponse({"error": "Stop with the given details donot exists"}, status=400)
                details.distance_from_source=distance_from_source
                details.save()
                return JsonResponse({"success": ""}, status=200)
            else:
                return JsonResponse({"error": "Internal Error"}, status=400)
            
        else:
            data=Stop.objects.all()
            terminal_details=Terminal.objects.all()
            schedule=Schedule.objects.all()
            return render(request,"dashboard/manage_stops.html",context={"data": data, "schedule": schedule, "terminal_details": terminal_details})
        
    else:
        return redirect('home')
    
def get_manage_stops(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == False:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=Stop.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('manage_schedules')

def user_tickets(request):
    if request.user.is_authenticated:
        if request.user.is_staff == False:
            return redirect('dashboard')
        data=UserTicket.objects.filter(date_wise_schedule__departure_date__gte=datetime.datetime.now().date())
        return render(request,"dashboard/user_tickets.html",context={"data": data})
    else:
        return redirect('home')
    
def my_bookings(request,item):
    if request.user.is_authenticated:
        if request.user.is_staff == True:
            return redirect('dashboard')
        if request.method == "GET":
            if int(item)==2:
                data=UserTicket.objects.filter(user=request.user, date_of_booking__lt=datetime.datetime.now().date())
                return render(request,"dashboard/past_bookings.html",context={"data": data})
            if int(item)==1:
                data=UserTicket.objects.filter(user=request.user, date_of_booking__gte=datetime.datetime.now().date())
                return render(request,"dashboard/upcoming_bookings.html",context={"data": data})
            return redirect('home')
    else:
        return redirect('home')
    
def new_booking(request):
    if request.user.is_authenticated:
        if request.user.is_staff == True:
            return redirect('dashboard')
        if request.method == "POST" and request.is_ajax:
            try:
                source=request.POST.get('source')
                destination=request.POST.get('destination')                
            except:
                return JsonResponse({"error": "Invalid Details Entered"}, status=400)
            
            try:
                results=get_results(source,destination)
                results=get_results(destination,source) | results
                serialized_data=serializers.serialize('json', results)
                return JsonResponse({"data": serialized_data}, status=200)
            except:
                return JsonResponse({"error": "Internal Error"}, status=400)
        else:
            terminal_details=Terminal.objects.all()
            return render(request,"dashboard/new_booking.html",context={"terminal_details": terminal_details})
    else:
        return redirect('home')
    
def terminals(request):
    if request.user.is_authenticated:
        if request.user.is_staff == True:
            return redirect('dashboard')
        terminal_details=Terminal.objects.all()
        return render(request,"dashboard/terminals.html",context={"terminal_details": terminal_details})
    else:
        return redirect('home')
    
def get_results(source,destination):
    results=Schedule.objects.filter(source__name=source,destination__name=destination)
    results=Schedule.objects.filter(source__city=source,destination__city=destination) | results
    results=Schedule.objects.filter(source__state=source,destination__state=destination) | results
    results=Schedule.objects.filter(source__terminal_code=source,destination__terminal_code=destination) | results
    all_schedules=Schedule.objects.all()
    for each in all_schedules:
        all_stops=Stop.objects.filter(schedule=each)
        answer=False
        for every in all_stops:
            if every.terminal.name==source or every.terminal.city==source or every.terminal.state==source or every.terminal.terminal_code==source:
                answer=True
                break
        if answer==False:
            continue 
        answer=False
        for every in all_stops:
            if every.terminal.name==destination or every.terminal.city==destination or every.terminal.state==destination or every.terminal.terminal_code==destination:
                answer=True
                break
        if answer==False:
            continue  
        results=results | Schedule.objects.filter(id=each.id)
        
    return results

def get_new_booking(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == True:
            return redirect('dashboard')
        id=request.GET.get('id')
        try:
            data=Schedule.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            stops=Stop.objects.filter(schedule=data).order_by('distance_from_source')
            serialized_data1=serializers.serialize('json', stops)
            terminals=Terminal.objects.all()
            serialized_data2=serializers.serialize('json',terminals)
            bus_schedules=BusSchedule.objects.filter(schedule=data)
            serialized_data3=serializers.serialize('json',bus_schedules)
            return JsonResponse({"data": serialized_data, "stops": serialized_data1, "terminals": serialized_data2, "bus_schedules": serialized_data3}, status=200)

        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('new_booking')

def create_new_booking(request):
    return JsonResponse({"success": ""}, status=200)

def new_booking_confirm(request):
    if request.method == "POST" and request.is_ajax:
        if request.user.is_staff == True:
            return redirect('dashboard')
        
        try:
            source_stop=Stop.objects.get(id=int(request.POST.get('source_stop')))
            destination_stop=Stop.objects.get(id=int(request.POST.get('destination_stop')))
            bus=int(request.POST.get('bus'))
            seats_booked=int(request.POST.get('seats_booked'))
            fare=float(request.POST.get('fare'))
            date_wise_schedule=int(request.POST.get('date_wise_schedule'))
            departure_day=request.POST.get('departure_day')
            #Actually its departure date, by mistake taken as day
        except:
            return JsonResponse({"error": "Invalid Detail Format Found"}, status=400)
        
        try:
            schedule=BusSchedule.objects.get(id=bus)
        except:
            return JsonResponse({"error": "Scehdule Not Found"}, status=400)
        
        date_wise_schedule=get_date_wise_schedule(schedule,departure_day)

        date_wise_schedule.save()
        (seat_availability,date_wise_schedule)=is_seat_available(date_wise_schedule,source_stop.id,destination_stop.id,seats_booked,schedule.bus.seats,schedule.reverse_route)
        if seat_availability==False:
            return JsonResponse({"error": "Seats not available, wither try to reduce them or choose another bus"}, status=400)
        date_wise_schedule.save()
        
        UserTicket.objects.create(source_stop=source_stop,
                                  destination_stop=destination_stop,
                                  user=request.user,
                                  date_wise_schedule=date_wise_schedule,
                                  seats_booked=seats_booked,
                                  booking_status=1,
                                  fare=fare)
        
        return JsonResponse({"success": ""}, status=200)
    else:    
        return redirect('new_booking')

def get_date_wise_schedule(schedule,departure_date):
    stops=Stop.objects.filter(schedule=schedule.schedule).order_by('distance_from_source')
    try:
        date_wise=DateWiseBusSchedule.objects.get(schedule=schedule,departure_date=departure_date)
    except:
        date_wise=DateWiseBusSchedule.objects.create(schedule=schedule,departure_date=departure_date)
        date_wise.seats_opted=[0 for i in range(stops.count())]
        my_list=[]
        for each in stops:
            my_list.append(each.id)
        date_wise.stop_id=my_list
        date_wise.save()
        return date_wise
    
    if(len(date_wise.stop_id)==stops.count()):
        return date_wise
    index=0
    for each in stops:
        if(date_wise.stop_id[index]==each.id):
            index+=1
            continue
        value=min(date_wise.seats_opted[index-1],date_wise.seats_opted[index])
        date_wise.stop_id.insert(index,each.id)
        date_wise.seats_opted.insert(index,value)
        index+=1
    date_wise.save()
    return date_wise

def is_seat_available(date_wise_schedule,s,d,seats_booked,total_seats,reverse_route):
    if seats_booked>total_seats:
        return False
    if reverse_route==False:
        start=(date_wise_schedule.stop_id).index(int(s))
        end=(date_wise_schedule.stop_id).index(int(d))+1
    else:
        end=(date_wise_schedule.stop_id).index(int(s))-1
        start=(date_wise_schedule.stop_id).index(int(d))
    maximum=-1
    for i in range(start,end-1):
        maximum=max(maximum,date_wise_schedule.seats_opted[i])
        
    if maximum+seats_booked<=total_seats:
        for i in range(start,end-1):
            date_wise_schedule.seats_opted[i]+=seats_booked
        date_wise_schedule.seats_booked+=seats_booked
        date_wise_schedule.save()
        return (True,date_wise_schedule)
    else:
        return (False,date_wise_schedule)
    
def cancel_booking(request):
    if request.method == "GET" and request.is_ajax:
        if request.user.is_staff == True:
            return redirect('dashboard')        
        try:
            ticket=UserTicket.objects.get(id=int(request.GET.get('id')))
            if ticket.user!=request.user:
                return JsonResponse({"error": "Booking not found"}, status=400)
        except:
            return JsonResponse({"error": "Booking not found"}, status=400)
        
        can_be_cancelled=cancel_ticket(ticket)
        if can_be_cancelled==True:
            return JsonResponse({"success": 0}, status=200)
        else:
            return JsonResponse({"error": "Ticket can't be cancelled because refund time has gone."}, status=400)
    else:    
        return redirect('my_bookings',1)
    
def cancel_ticket(ticket):
    return False
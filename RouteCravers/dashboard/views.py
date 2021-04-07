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
        id=request.GET.get('id')
        try:
            data=BusDetail.objects.get(id=int(id))
            serialized_data=serializers.serialize('json', [data])
            print(serialized_data)
            return JsonResponse({"data": serialized_data}, status=200)
        except:
            return JsonResponse({"error": "Details Not Found"}, status=400)
    return redirect('bus_details')
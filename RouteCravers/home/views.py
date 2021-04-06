from django.shortcuts import render,HttpResponse,redirect,get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import (login,authenticate,logout)
from django.conf import settings
from django.core.mail import send_mail
import math,random,string,datetime,array,secrets
from .models import *
from dashboard.models import *
import math,random,string,array,secrets
from os import urandom
from random import choice
import os
from django.http import FileResponse
from threading import *
from django.http import JsonResponse
from django.core import serializers
from .forms import *

class Email_thread(Thread):
    def __init__(self,subject,message,email):
        self.email=email
        self.subject=subject
        self.message=message
        Thread.__init__(self)

    def run(self):
        SENDMAIL(self.subject,self.message,self.email)

def SENDMAIL(subject, message, email):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email, ]
    send_mail( subject, message, email_from, recipient_list )

# Create your views here.
def home(request):
    return render(request,"home/home.html",context={})

def login_request(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method=='POST' and request.is_ajax:
        useremail=request.POST.get('user_email')
        password=request.POST.get('password')
        try:
            checker = User.objects.get(username=useremail)
            user = authenticate(request, username=useremail, password=password)
            if user is not None:
                pass
            else:
                return JsonResponse({"error": "Invalid Credentials"}, status=400)
        except:
            try:
                checker = User.objects.get(email=useremail)
                user = authenticate(request, username=checker.username, password=password)
                if user is not None:
                    pass
                else:
                    return JsonResponse({"error": "Invalid Credentials"}, status=400)
            except:
                return JsonResponse({"error": "Invalid Credentials"}, status=400)
        try:
            if user.is_staff==False:
                p=Profile.objects.get(user=user)
                if p.account_banned==True:
                    return JsonResponse({"error": "This account has been banned"}, status=400)
        except:
            return JsonResponse({"error": "Profile Not Found"}, status=400)
        login(request,user)
        return JsonResponse({"success": ""}, status=200)
    else:
        return render(request,"home/login.html",context={})
    
def email_in_use(email):
    try:
        user=User.objects.get(email=email)
        return True
    except:
        return False

def username_in_use(username):
    try:
        user=User.objects.get(username=username)
        return True
    except:
        return False

def signup(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method=="POST" and request.is_ajax:
        email=request.POST.get('email')
        username=request.POST.get('username')
        if email_in_use(email):
            user=User.objects.get(email=email)
            if user.is_active==True:
                return JsonResponse({"error": "Email already in use"}, status=400)
            user.delete()
        if username_in_use(username):
            user=User.objects.get(username=username)
            if user.is_active==True:
                return JsonResponse({"error": "Username already in use"}, status=400)
            user.delete()
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            user=User.objects.get(email=email)
            user.is_active=False
            user.save()
            otp=generate_otp()
            message = f'Hi user, thank you for creating account, your otp is ' + str(otp) + ', do not share it with anyone.\nIt will expire in 15 minutes.\nThanks'
            send_otp(email,message,otp)
            return JsonResponse({"success": ""}, status=200)
        else:
            return JsonResponse({"error": str(form.errors)}, status=400)
    else:
        return render(request,"home/signup.html",context={})
    
def send_otp(email,message,otp):
    try:
        user=User.objects.get(email=email)
    except:
        return False
    subject = 'OTP for email verification in Route Cravers'
    Email_thread(subject,message,email).start()
    try:
        u=Profile.objects.get(user=user)
        u.otp=str(otp)
        u.otp_time=datetime.datetime.now()
        u.save()
    except:
        u=Profile.objects.create(user=user, otp=str(otp), otp_time=datetime.datetime.now())
        u.save()
    return True

def resend_otp(request,item):
    if request.method =='GET' and request.is_ajax:
        email=request.GET.get('email')
        otp=generate_otp()
        if str(item)=="register":
            message = f'Hi user, thank you for creating account, your otp is ' + str(otp) + ', do not share it with anyone.\nIt will expire in 15 minutes.\nThanks'
        elif str(item)=="reset_password":
            message = f'Hi user, your otp for reseting password is ' + str(otp) + ', do not share it with anyone.\nIt will expire in 15 minutes.\nThanks'
        send_otp(email,message,otp)
        return JsonResponse({"success": ""}, status=200)
    else:
        return redirect('home')

def verify_otp(request,item):
    if request.method=='POST' and request.is_ajax:
        email=request.POST.get('email')
        otp=request.POST.get('otp')
        try:
            user=User.objects.get(email=email)
            u=Profile.objects.get(user=user)
            if str(u.otp) == str(otp) and otp!=settings.OTP_EXPIRE_TIME:
                prev_time=u.otp_time
                u.otp_time=datetime.datetime.now()
                u.save()
                u=Profile.objects.get(user=user)
                new_time=u.otp_time
                time_delta = (new_time-prev_time)
                minutes = (time_delta.total_seconds())/60
                if minutes<settings.OTP_EXPIRE_TIME:
                    try:
                        user=User.objects.get(email=email)
                        user.is_active=True
                        user.save()
                        try:
                            u=Profile.objects.get(user=user)
                            u.otp='NULL_akad_bakad_bambe_bo'
                            u.signup_date=u.otp_time
                            u.save()
                            return JsonResponse({"success": ""}, status=200)
                        except:
                            return JsonResponse({"error": "Some error in this registration, try signing up again"}, status=400)
                    except:
                        return JsonResponse({"error": "Some error in this registration, try signing up again"}, status=400)
                else:
                    otp=generate_otp()
                    if str(item)=="register":
                        message = f'Hi user, thank you for creating account, your otp is ' + str(otp) + ', do not share it with anyone.\nIt will expire in 15 minutes.\nThanks'
                    elif str(item)=="reset_password":
                        message = f'Hi user, your otp for reseting password is ' + str(otp) + ', do not share it with anyone.\nIt will expire in 15 minutes.\nThanks'
                    send_otp(email,message,otp)
                    return JsonResponse({"error": "Time limit exceeded, a new OTP is sent"}, status=400)
            else:
                return JsonResponse({"error": "Invalid OTP"}, status=400)
        except:
            return JsonResponse({"error": "Some error in this registration, try signing up again"}, status=400)
    else:
        return redirect('home')
    
def generate_otp():
    digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    OTP = ""
    for i in range(7) :
        OTP += digits[math.floor(random.random() * 62)]
    return OTP
    
def logout_request(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('home')

def reset_password(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method=="POST" and request.is_ajax:
        email=request.POST.get('email')
        try:
            u=User.objects.get(email=email)
        except:
            return JsonResponse({"success": ""}, status=200)
        if u.is_active==False:
            return JsonResponse({"error": "The email associated with this account has not been verified."}, status=400)
        try:
            p=Profile.objects.get(user=u)
        except:
            return JsonResponse({"error": "Getting error in searching this account profile in database. Contact Administrator"}, status=400)
        if p.account_banned==True:
            return JsonResponse({"error": "This account has been banned, you don not have permission to change password."}, status=400)
        otp=generate_otp()
        message = f'Hi user, your otp for reseting password is ' + str(otp) + ', do not share it with anyone.\nIt will expire in 15 minutes.\nThanks'
        send_otp(email,message,otp)
        return JsonResponse({"success": ""}, status=200)
    else:
        return render(request,"home/change_password.html",context={})
    
def new_password(request):
    if request.method=="POST" and request.is_ajax:
        email=request.POST.get("email")
        password=request.POST.get("password2")
        try:
            user=User.objects.get(email=email)
            user.set_password(password)
            user.save()
        except:
            return JsonResponse({"error": "Error in fetching user or unable to change Password"}, status=400)
        subject = 'Password changed in Clean Frame'
        message = f'Hi user, password has been successfully changed.\nThanks'
        Email_thread(subject,message,email).start()
        return JsonResponse({"success": ""}, status=200)
    else:
        return redirect('home')
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

class Email_thread(Thread):
    def __init__(self,subject,message,email):
        self.email=email
        self.subject=subject
        self.message=message
        Thread.__init__(self)

    def run(self):
        SENDMAIL(self.subject,self.message,self.email)

# Create your views here.
def home(request):
    return render(request,"home/home.html",context={})

def login_request(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    if request.method=='POST':
        useremail=request.POST.get('user_email')
        password=request.POST.get('password')
        try:
            checker = User.objects.get(username=useremail)
            user = authenticate(request, username=useremail, password=password)
            if user is not None:
                pass
            else:
                return render(request,"home/login.html",context={"useremail": useremail, "error": "Password is wrong"})
        except:
            try:
                checker = User.objects.get(email=useremail)
                user = authenticate(request, username=checker.username, password=password)
                if user is not None:
                    pass
                else:
                    return render(request,"home/login.html",context={"useremail": useremail, "error": "Password is wrong"})
            except:
                return render(request,"home/login.html",context={"error": "Invalid username/ email"})
        login(request,user)
        return redirect("dashboard")
    else:
        return render(request,"home/login.html",context={})
    
def logout_request(request):
    if request.user.is_authenticated:
        logout(request)
    return redirect('home')
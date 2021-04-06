from django.shortcuts import render,HttpResponse

# Create your views here.
def dashboard(request):
    return HttpResponse("Dashboard")
    return render(request,"dashboard/register.html",context={})
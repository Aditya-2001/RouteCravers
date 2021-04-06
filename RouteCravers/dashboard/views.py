from django.shortcuts import render,HttpResponse

# Create your views here.
def dashboard(request):
    if request.user.is_authenticated:
        return render(request,"dashboard/dashboard.html",context={})
    else:
        return redirect('home')
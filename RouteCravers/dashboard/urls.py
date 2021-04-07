from django.urls import path
from . import views

urlpatterns = [
    path('',views.dashboard,name="dashboard"),
    path('bus/details/',views.bus_details,name="bus_details"),
    path('bus/details/get/',views.get_bus_details,name="get_bus_details"),
    
    
]

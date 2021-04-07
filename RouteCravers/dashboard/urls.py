from django.urls import path
from . import views

urlpatterns = [
    path('',views.dashboard,name="dashboard"),
    path('bus/details/',views.bus_details,name="bus_details"),
    path('bus/details/get/',views.get_bus_details,name="get_bus_details"),
    path('terminal/details/',views.terminal_details,name="terminal_details"),
    path('terminal/details/get/',views.get_terminal_details,name="get_terminal_details"),
    
]

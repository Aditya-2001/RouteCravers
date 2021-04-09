from django.urls import path
from . import views

urlpatterns = [
    path('',views.dashboard,name="dashboard"),
    path('bus/details/',views.bus_details,name="bus_details"),
    path('bus/details/get/',views.get_bus_details,name="get_bus_details"),
    path('terminal/details/',views.terminal_details,name="terminal_details"),
    path('terminal/details/get/',views.get_terminal_details,name="get_terminal_details"),
    path('manage/bus/details/',views.manage_buses,name="manage_buses"),
    path('manage/bus/details/get/',views.get_manage_buses,name="get_manage_buses"),
    path('manage/schedule/details/',views.manage_schedules,name="manage_schedules"),
    path('manage/schedule/details/get/',views.get_manage_schedules,name="get_manage_schedules"),
    path('manage/bus/schedule/details/',views.manage_bus_schedules,name="manage_bus_schedules"),
    path('manage/bus/schedule/details/get/',views.get_manage_bus_schedules,name="get_manage_bus_schedules"),
    path('manage/bus/schedule/details/datewise/',views.manage_date_wise_bus_schedules,name="manage_date_wise_bus_schedules"),
    path('manage/stops/details/',views.manage_stops,name="manage_stops"),
    path('manage/stops/details/get/',views.get_manage_stops,name="get_manage_stops"),
    path('manage/user/tickets/',views.user_tickets,name="user_tickets"),
    path('bookings/all/<str:item>',views.my_bookings,name="my_bookings"),
    path('bookings/new/',views.new_booking,name="new_booking"),
    path('addons/view/terminal/details/',views.terminals,name="terminals")
    
    
    
]

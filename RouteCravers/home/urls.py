from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name="home"),
    path('login/',views.login_request,name="login_request"),
    path('logout',views.logout_request,name="logout_request"),
    path('signup/',views.signup,name="signup"),
    path('signup/otp/verify/<str:item>/',views.verify_otp,name="verify_otp"),
    path('signup/otp/resend/<str:item>/',views.resend_otp,name="resend_otp"),
    path('password/change/',views.reset_password,name="reset_password"),
    path('password/change/otp/verify/<str:item>/',views.verify_otp,name="verify_otp"),
    path('password/change/otp/resend/<str:item>/',views.resend_otp,name="resend_otp"),
    path('password/change/new_password/',views.new_password,name="new_password"),
    
    
    
    
]

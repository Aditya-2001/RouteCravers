from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name="home"),
    path('login/',views.login_request,name="login_request"),
    path('logout',views.logout_request,name="logout_request"),
    path('signup/',views.signup,name="signup"),
    path('signup/otp/verify/',views.verify_otp,name="verify_otp"),
    
    
    
    
]

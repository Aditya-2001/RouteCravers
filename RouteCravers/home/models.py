from django.db import models
from django.contrib.auth.models import User
import datetime


# Create your models here.
class Profile(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    contact_number=models.IntegerField(null=True)
    account_banned=models.BooleanField(default=False)
    otp_time=models.DateTimeField(default=datetime.datetime.now())
    otp=models.CharField(max_length=100, null=True)
    signup_date=models.DateTimeField(default=datetime.datetime.now())
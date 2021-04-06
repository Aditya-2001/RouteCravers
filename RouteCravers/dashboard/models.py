from django.db import models
from django.contrib.auth.models import User
import datetime
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class BusDetail(models.Model):
    #Assuming time is in minutes
    
    accomodation_code=models.IntegerField(default=0)
    #0-seater -> Price reduced to 1/2
    #1-sleeper -> Price reduced to 3/4
    #2-A.C. -> Price reduced to 1/1
    
    refund_percentage=models.FloatField(default=95.0, null=True)
    
    no_refund_time=models.IntegerField(default=60)
    #Time before bus departure after which no refund will be given
    
    min_refund_time=models.IntegerField(default=720)
    #Time before bus departure before which no additional deduction will be there
    
    addition_deduction_percentage=models.FloatField(default=1.0, null=True)
    #After min_refund_time this percentage would be deducted more
    
    addition_deduction_rate=models.IntegerField(default=30)
    #Rate of additional deduction
    
    last_edit=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.id)
    
class Terminal(models.Model):
    name=models.CharField(max_length=1000, null=True)
    city=models.CharField(max_length=1000, null=True)
    state=models.CharField(max_length=1000, null=True)
    terminal_code=models.CharField(max_length=1000, null=True)
    last_edit=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.name)
    
class Bus(models.Model):
    name=models.CharField(max_length=1000, null=True)
    RTO_number=models.CharField(max_length=20, null=True)
    details=models.ForeignKey(BusDetail, on_delete=models.SET_NULL, null=True, blank=True)
    seats=models.IntegerField(default=100)
    active=models.BooleanField(default=True)
    last_edit=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.RTO_number)
    
class Schedule(models.Model):
    source=models.ForeignKey(Terminal, on_delete=models.SET_NULL, null=True, blank=True, related_name="source")
    destination=models.ForeignKey(Terminal, on_delete=models.SET_NULL, null=True, blank=True, related_name="destination")
    
    distance=models.FloatField(default=10.0)
    #In Km
    
    def __str__(self):
        return str(self.source)+" , "+str(self.destination)
    
    
class BusSchedule(models.Model):
    bus=models.ForeignKey(Bus, on_delete=models.SET_NULL, null=True, blank=True)
    fare=models.FloatField(default=50.0, null=True)
    reverse_route=models.BooleanField(default=False)
    bus_number=models.CharField(max_length=10, null=True)
    schedule=models.ForeignKey(Schedule, on_delete=models.SET_NULL, null=True, blank=True)
    
    departure_day=models.IntegerField(default=0)
    #1-Monday, 2-Tuesday, 3-Wednesday, 4-Thursday, 5-Friday, 6-Saturday, 7-Sunday
    
    departure_time=models.DateTimeField(default=datetime.datetime.now())
    last_edit=models.DateTimeField(auto_now=True)

class DateWiseBusSchedule(models.Model):
    schedule=models.ForeignKey(BusSchedule, on_delete=models.SET_NULL, null=True, blank=True)
    departure_date=models.DateTimeField(default=datetime.datetime.now())
    seats_opted=ArrayField(models.IntegerField(default=0),size=100)
    

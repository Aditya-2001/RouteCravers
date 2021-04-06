from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.
class BusDetails(models.Model):
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
    
    def __str__(self):
        return str(self.id)
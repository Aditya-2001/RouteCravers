from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(BusDetail)
admin.site.register(Terminal)
admin.site.register(Bus)
admin.site.register(Schedule)
admin.site.register(BusSchedule)
admin.site.register(DateWiseBusSchedule)
admin.site.register(Stop)
admin.site.register(UserTicket)

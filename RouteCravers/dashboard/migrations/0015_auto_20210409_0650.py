# Generated by Django 2.2.19 on 2021-04-09 01:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0014_auto_20210409_0644'),
    ]

    operations = [
        migrations.AddField(
            model_name='datewisebusschedule',
            name='seats_booked',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='busschedule',
            name='departure_time',
            field=models.TimeField(default=datetime.time(6, 50, 0, 388593)),
        ),
        migrations.AlterField(
            model_name='datewisebusschedule',
            name='departure_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 9, 6, 50, 0, 389175)),
        ),
    ]

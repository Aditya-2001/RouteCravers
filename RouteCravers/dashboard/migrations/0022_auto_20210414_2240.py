# Generated by Django 2.2.19 on 2021-04-14 17:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0021_auto_20210414_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='busschedule',
            name='departure_time',
            field=models.TimeField(default=datetime.time(22, 40, 46, 626493)),
        ),
        migrations.AlterField(
            model_name='userticket',
            name='date_of_booking',
            field=models.DateField(default=datetime.datetime(2021, 4, 14, 22, 40, 46, 630218)),
        ),
    ]

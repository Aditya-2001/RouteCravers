# Generated by Django 2.2.19 on 2021-04-06 20:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0008_auto_20210406_1723'),
    ]

    operations = [
        migrations.AddField(
            model_name='busdetail',
            name='accomodation_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='busschedule',
            name='departure_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 7, 1, 43, 15, 652800)),
        ),
        migrations.AlterField(
            model_name='datewisebusschedule',
            name='departure_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 7, 1, 43, 15, 653702)),
        ),
    ]

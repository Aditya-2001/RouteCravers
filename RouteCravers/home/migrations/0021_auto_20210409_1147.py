# Generated by Django 2.2.19 on 2021-04-09 06:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0020_auto_20210409_0726'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='otp_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 9, 11, 47, 43, 920798)),
        ),
        migrations.AlterField(
            model_name='profile',
            name='signup_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 9, 11, 47, 43, 920849)),
        ),
    ]

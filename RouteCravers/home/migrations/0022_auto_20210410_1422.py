# Generated by Django 2.2.19 on 2021-04-10 08:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0021_auto_20210409_1147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='otp_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 10, 14, 22, 31, 111008)),
        ),
        migrations.AlterField(
            model_name='profile',
            name='signup_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 10, 14, 22, 31, 111058)),
        ),
    ]

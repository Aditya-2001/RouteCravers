# Generated by Django 2.2.19 on 2021-04-06 10:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20210406_0810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='otp_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 16, 29, 6, 137738)),
        ),
        migrations.AlterField(
            model_name='profile',
            name='signup_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 16, 29, 6, 137789)),
        ),
    ]
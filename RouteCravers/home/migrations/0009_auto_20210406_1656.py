# Generated by Django 2.2.19 on 2021-04-06 11:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_auto_20210406_1650'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='otp_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 16, 56, 45, 846090)),
        ),
        migrations.AlterField(
            model_name='profile',
            name='signup_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 16, 56, 45, 846146)),
        ),
    ]
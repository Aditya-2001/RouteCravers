# Generated by Django 2.2.19 on 2021-04-14 17:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0024_auto_20210414_0959'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='otp_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 14, 22, 40, 46, 564669)),
        ),
        migrations.AlterField(
            model_name='profile',
            name='signup_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 14, 22, 40, 46, 564719)),
        ),
    ]
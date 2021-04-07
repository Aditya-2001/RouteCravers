# Generated by Django 2.2.19 on 2021-04-06 11:20

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_auto_20210406_1643'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusSchedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fare', models.FloatField(default=50.0, null=True)),
                ('reverse_route', models.BooleanField(default=False)),
                ('bus_number', models.CharField(max_length=10, null=True)),
                ('departure_day', models.IntegerField(default=0)),
                ('departure_time', models.DateTimeField(default=datetime.datetime(2021, 4, 6, 16, 50, 57, 56618))),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('bus', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.Bus')),
                ('schedule', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.Schedule')),
            ],
        ),
    ]
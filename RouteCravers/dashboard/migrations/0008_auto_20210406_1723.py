# Generated by Django 2.2.19 on 2021-04-06 11:53

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dashboard', '0007_auto_20210406_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='busschedule',
            name='departure_time',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 17, 23, 32, 229948)),
        ),
        migrations.AlterField(
            model_name='datewisebusschedule',
            name='departure_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 6, 17, 23, 32, 230540)),
        ),
        migrations.CreateModel(
            name='UserTicket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seats_booked', models.IntegerField(default=0)),
                ('booking_status', models.IntegerField(default=0)),
                ('fare', models.FloatField(default=0.0)),
                ('date_wise_schedule', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.DateWiseBusSchedule')),
                ('destination_stop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='destination_stop', to='dashboard.Stop')),
                ('source_stop', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='source_stop', to='dashboard.Stop')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
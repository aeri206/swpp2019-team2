# Generated by Django 2.2.6 on 2019-12-04 08:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='nick_name',
        ),
    ]

# Generated by Django 2.2.7 on 2019-11-23 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ml', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ml',
            name='user_id',
            field=models.CharField(default='NONE', max_length=30),
        ),
    ]

# Generated by Django 2.2.6 on 2019-11-26 13:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ml', '0009_auto_20191126_1332'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ml',
            name='base',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.Base'),
        ),
    ]

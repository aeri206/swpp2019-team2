# Generated by Django 2.2.6 on 2019-12-02 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_auto_20191130_1643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='base',
            name='category',
            field=models.CharField(choices=[('BAS_P', 'Powder'), ('BAS_CU', 'Cushion'), ('BAS_C', 'Concealer'), ('BAS_F', 'Foundation'), ('BAS_PR', 'Primer'), ('BAS_B', 'BB & CC')], max_length=6),
        ),
        migrations.AlterField(
            model_name='baseoption',
            name='color',
            field=models.CharField(choices=[('BAS_LT', 'under 21'), ('BAS_MD', '21'), ('BAS_DK', '23 and over'), (None, None)], default=None, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='baseoption',
            name='sub_color',
            field=models.CharField(choices=[('BAS_WM', 'Warm Tone'), ('BAS_NT', 'Neutral Tone'), ('BAS_CL', 'Cool Tone'), (None, None)], default=None, max_length=6, null=True),
        ),
    ]

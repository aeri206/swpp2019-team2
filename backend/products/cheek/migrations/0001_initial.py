# Generated by Django 2.2.6 on 2019-12-02 11:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('brand', '0003_brand_name_ko'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cheek',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('price', models.IntegerField()),
                ('category', models.CharField(choices=[('B', 'Blusher'), ('C', 'Contouring'), ('H', 'Highlighter')], max_length=1)),
                ('product_url', models.CharField(default='//:0', max_length=255)),
                ('img_url', models.CharField(default='//:0', max_length=255)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='brand.Brand')),
            ],
        ),
        migrations.CreateModel(
            name='CheekOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.CharField(choices=[('RD', 'Red'), ('PK', 'Pink'), ('OR', 'Orange')], max_length=2)),
                ('sub_color', models.CharField(max_length=30)),
                ('color_hex', models.CharField(max_length=10)),
                ('optionName', models.CharField(max_length=30)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='color', to='cheek.Cheek')),
            ],
        ),
    ]

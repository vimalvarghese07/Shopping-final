# Generated by Django 4.2.9 on 2024-03-21 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordermodel',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
    ]

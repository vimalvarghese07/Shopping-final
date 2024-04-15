# Generated by Django 4.2.9 on 2024-03-04 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productname', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('description', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='upload/product/')),
            ],
        ),
    ]
from django.db import models

# Create your models here.
class OrderModel (models.Model):
    productid=models.CharField( max_length=50)
    userid=models.CharField(max_length=50)
    quantity = models.IntegerField(default=1)
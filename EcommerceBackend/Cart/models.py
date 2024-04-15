from django.db import models

# Create your models here.
class CartModel(models.Model):
    productid = models.CharField(max_length=10,primary_key=True,null=False)
    quantity = models.IntegerField(default=1)
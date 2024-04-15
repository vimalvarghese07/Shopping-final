from django.db import models

# Create your models here.
class PaymentModel(models.Model):
    razorpay_order_id = models.CharField( max_length=50)
    amount = models.IntegerField()
    currency = models.CharField( max_length=5)
    status = models.CharField( max_length=20)
    
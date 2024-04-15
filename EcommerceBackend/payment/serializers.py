from rest_framework import serializers
from .models import PaymentModel

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentModel
        fields = ['razorpay_order_id','amount','currency','status']
        
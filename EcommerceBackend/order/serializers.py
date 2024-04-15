from rest_framework import serializers
from .models import OrderModel

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = ['productid','userid','quantity']
        
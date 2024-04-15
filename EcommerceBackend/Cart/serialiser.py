from rest_framework import serializers
from .models import CartModel
# from Product.Serializers import ProductSerializer
# from Product.models import ProductModel
class CartSerializer(serializers.ModelSerializer):
    # productid = ProductSerializer()
    class Meta:
        model = CartModel
        fields = ['productid','quantity']
    # def create(self, validated_data):
    #     product_name = validated_data.get('productid')
    #     quantity = validated_data.get('quantity', 1)  

    #     product_instance = ProductModel.objects.get_or_create(name=product_name)

    #     cart_instance = CartModel(productid=product_instance.id, quantity=quantity)
    #     cart_instance.save()

    #     return cart_instance
        
       
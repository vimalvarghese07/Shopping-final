from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from .serialiser import CartSerializer
from Product.Serializers import ProductSerializer
from .models import CartModel
from Product.models import ProductModel
from django.http import FileResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissionsOrAnonReadOnly,AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, FileResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
import os
# Create your views here.


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_product_details(request, pk):
#     try:
#         cart_item = get_object_or_404(CartModel, pk=pk)
#         product_details = ProductModel.objects.get(pk=cart_item.productid.pk)
#         serializer = ProductSerializer(product_details) 
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except ProductModel.DoesNotExist:
#         return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_product_details(request):
#     try:
#         cart_item = CartModel.objects.all()
#         product_ids = cart_item.productid.all().values_list('pk', flat=True)
#         products_in_cart = ProductModel.objects.filter(pk__in=product_ids)
#         serializer = ProductSerializer(products_in_cart, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except CartModel.DoesNotExist:
#         return Response({'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_product_details(request):
    try:
        cart_items = CartModel.objects.all()
        product_ids = [cart_item.productid for cart_item in cart_items]
        products_in_cart = ProductModel.objects.filter(pk__in=product_ids)
        
        product_serializer = ProductSerializer(products_in_cart, many=True)
        
        # Serialize each cart item individually
        cart_data = [CartSerializer(cart_item).data for cart_item in cart_items]
        
        return Response({'products': product_serializer.data, 'cart_items': cart_data}, status=status.HTTP_200_OK)
    except CartModel.DoesNotExist:
        return Response({'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def cart_details(request):
    if request.method == 'POST':
        serializer = CartSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        queryset = CartModel.objects.all()
        serializer = CartSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_cart(request, pk):
    product = get_object_or_404(CartModel, pk=pk)
    product.delete()
    return Response({'message':'product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
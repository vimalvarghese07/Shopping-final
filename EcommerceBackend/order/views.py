from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer
from Product.Serializers import ProductSerializer
from .models import OrderModel
from Product.models import ProductModel
from django.http import FileResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissionsOrAnonReadOnly,AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, FileResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes



@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def add_order(request):
    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
            try:
                order_items = OrderModel.objects.all()
                product_ids = []

                for order_item in order_items:
                    product_ids.append(order_item.productid)

                products_in_order = ProductModel.objects.filter(pk__in=product_ids)
                serializer = ProductSerializer(products_in_order, many=True)
                cart_data = [OrderSerializer(cart_item).data for cart_item in order_items]
                return Response({'order_products':serializer.data,'order_items':cart_data}, status=status.HTTP_200_OK)
            except OrderModel.DoesNotExist:
                return Response({'message': ' no order found'}, status=status.HTTP_404_NOT_FOUND)
        # queryset = OrderModel.objects.all()
        # serializer = OrderSerializer(queryset, many=True)
        # return Response(serializer.data, status=status.HTTP_200_OK)

from django.shortcuts import render
from rest_framework import viewsets
from .Serializers import ProductSerializer
from .models import ProductModel
from django.http import FileResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissionsOrAnonReadOnly,AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, FileResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
import os
# Create your views here.



class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()

    serializer_class = ProductSerializer

    def delete(self,request, pk):
        product = get_objects_or_404(ProductModel,pk=pk)
        product.delete()
        return Response({'message':'product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# def sendFile(request):
#     print(request)
#     return Response({'message':'product deleted successfully'})



def sendFile(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, 'upload/product/', filename)

    if os.path.exists(file_path):
        response = FileResponse(open(file_path, 'rb'), content_type='image/*')  
        return response
    else:
        return HttpResponse(status=404)

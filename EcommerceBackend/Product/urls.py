from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(r'product',ProductViewSet,basename='product')

urlpatterns = [
	path('api/', include(router.urls)),
	path('upload/product/<str:filename>/', sendFile, name = 'filename'),
]
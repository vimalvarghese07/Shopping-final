from django.urls import include, path
from rest_framework import routers
from .views import *



urlpatterns = [
	path('api/add_order', add_order,name='add_order'),
]
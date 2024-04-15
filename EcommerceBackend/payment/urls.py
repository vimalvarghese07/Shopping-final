from django.urls import include, path
from .views import *

urlpatterns = [
    path('createpayment/',createPayment,name='createpayment')
    
]

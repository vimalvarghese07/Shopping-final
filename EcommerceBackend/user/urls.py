from django.urls import include,path
from .views import *

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('details/', UserDetails, name='details'),
    path('update/<int:pk>', update_user, name='update'),
]
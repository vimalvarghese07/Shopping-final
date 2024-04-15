from django.db import models
from django.contrib.auth.models import AbstractUser


class UserModel(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    phonenumber = models.CharField(max_length=100)
    username = models.CharField(unique=True,max_length=100)
    password = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
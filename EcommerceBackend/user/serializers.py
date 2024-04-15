from rest_framework import serializers
from .models import UserModel

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username','password','gender','name','email','phonenumber','id']
        extra_kwargs = {'password':{'write_only': True}}
        
        def create(self, validated_data):
            user = CustomUser(
                username=validated_data['username'],
                email=validated_data['email'],
                phonenumber=validated_data['phonenumber'],
                gender=validated_data['gender'],
                name=validated_data['name'],
                password=validated_data['password']
        )
            user.save()
            return user
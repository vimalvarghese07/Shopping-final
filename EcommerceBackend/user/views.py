from rest_framework import status
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissionsOrAnonReadOnly,AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer
from .models import UserModel

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([AllowAny])
def update_user(request,pk):
    if request.method == 'PUT':
        try:
            user = UserModel.objects.get(pk = pk)
        except UserModel.DoesNotExist:
            return Response({'message':'user does not exist'},status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
              
        
        

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = None
        if '@' in username:
            try:
                user = UserModel.objects.get(email=username,password=password)
            except ObjectDoesNotExist:
                pass

        if not user:
            try:
                user = UserModel.objects.get(username=username, password=password)
            except ObjectDoesNotExist:
                pass
            print(f'{user}')

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['GET'])
@permission_classes([AllowAny])
def UserDetails(request):
    if request.method == 'GET':
        try:
            token = request.headers.get('Authorization').split()[1]
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
            
            user_serializer = UserSerializer(user)
            serialized_user = user_serializer.data
            return Response({'Userdetails':serialized_user}, status=status.HTTP_200_OK)

        except:
            return Response({'message': 'Could not find user.'}, status=status.HTTP_200_OK)
        

                
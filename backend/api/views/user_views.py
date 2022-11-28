from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import permissions, status, generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import UserSerializer, LoginSerializer, RegisterSerializer


class RegisterView(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserView(APIView):
    permission_classes = [permissions.AllowAny]
    model = User
    serializer = UserSerializer

    def get(self, request):
        serializer = self.serializer(self.model.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer = LoginSerializer

    def post(self, request):
        signin_serializer = self.serializer(data=request.data)
        if not signin_serializer.is_valid():
            return Response(signin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(
            username=signin_serializer.data['username'],
            password=signin_serializer.data['password']
        )
        if not user:
            return Response({'detail': 'Invalid Credentials or activate account'}, status=status.HTTP_404_NOT_FOUND)
        user.last_login = timezone.now()
        user.save()

        token, _ = Token.objects.get_or_create(user=user)
        user_serialized = UserSerializer(user)
        return Response({
            'user': user_serialized.data,
            'token': token.key
        }, status=status.HTTP_200_OK)



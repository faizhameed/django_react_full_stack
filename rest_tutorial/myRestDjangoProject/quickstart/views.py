from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import UserSerializer,GroupSerializer
from django.contrib.auth.models import User,Group

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class GroupViewSet(viewsets.ModelViewSet):
    """ 
    API end point that allows user groups to e viewed  or edited
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_class = [permissions.AllowAny]
    
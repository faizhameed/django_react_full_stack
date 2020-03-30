from django.shortcuts import render
from rest_framework import viewsets,permissions,generics
from .serializers import UserSerializer,GroupSerializer,LeadsSerializer
from django.contrib.auth.models import User,Group
from .models import Leads

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    """ 
    API end point that allows user groups to be viewed  or edited
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_class = [permissions.AllowAny]

class LeadsViewSet(generics.ListCreateAPIView):
    """ 
    API end point that allows user groups to be viewed  or edited
    """
    queryset = Leads.objects.all()
    serializer_class = LeadsSerializer
    permission_classes = [permissions.IsAuthenticated]

class LeadsDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leads.objects.all()
    serializer_class = LeadsSerializer
    permission_classes = [permissions.IsAuthenticated]

from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import *


class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ["id", "owner", 'name', 'privacy', 'members']


class UserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username"]


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = ["id", "title", 'board']


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserDetailsSerializer(read_only=True, many=True)

    class Meta:
        model = Task
        fields = ["id", "text", 'order', 'assigned_to', 'list']


class ListDetailSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = List
        fields = ["id", "title", 'board', 'tasks']


class AllDataSerializer(serializers.ModelSerializer):
    lists = ListDetailSerializer(many=True)
    members = UserDetailsSerializer(read_only=True, many=True)

    class Meta:
        model = Board
        fields = ["id", "owner", 'name', 'privacy', 'members', 'lists']

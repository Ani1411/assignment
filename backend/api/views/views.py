from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.constants import *
from api.models import Board, List, Task
from api.serializers import BoardSerializer, ListSerializer, ListDetailSerializer, TaskSerializer, AllDataSerializer


class BoardView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer = BoardSerializer
    model = Board

    def get(self, request):
        public_boards = self.model.objects.filter(Q(privacy='public') | Q(members__id=request.user.id)).distinct()
        serializer = self.serializer(public_boards, many=True)
        return Response({'results': serializer.data, 'message': SUCCESS_MSG}, status=status.HTTP_200_OK)

    def post(self, request):
        board = request.data.get('board')
        board['owner'] = request.user.id
        board['members'].append(board['owner'])
        serializer = self.serializer(data=board)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({"message": CREATED_SUCCESS_MSG}, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        saved_board = get_object_or_404(self.model.objects.all(), pk=pk)
        data = request.data.get('board')
        serializer = self.serializer(instance=saved_board, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({"message": UPDATED_SUCCESS_MSG}, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        board = get_object_or_404(self.model.objects.all(), pk=pk)
        board.delete()
        return Response({"message": DELETED_SUCCESS_MSG}, status=204)


class ListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer = ListSerializer
    model = List

    def get(self, request, **kwargs):
        """
        :param request:
        :param kwargs: id here will be board_id
        """
        tasks = self.model.objects.filter(board=kwargs['id'])
        serializer = ListDetailSerializer(tasks, many=True)
        return Response({'results': serializer.data, 'message': SUCCESS_MSG}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        serializer = self.serializer(data=request.data.get('list'))
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({"message": CREATED_SUCCESS_MSG}, status=status.HTTP_201_CREATED)

    def put(self, request, **kwargs):
        """
                :param request:
                :param kwargs: id here will be list_id
                """
        saved_list = self.model.objects.filter(id=kwargs['id'])
        data = request.data.get('list')
        serializer = self.serializer(instance=saved_list, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({"message": UPDATED_SUCCESS_MSG}, status=status.HTTP_201_CREATED)

    def delete(self, request, **kwargs):
        """
                       :param request:
                       :param kwargs: id here will be list_id
                       """
        list_ = self.model.objects.filter(id=kwargs['id'])
        list_.delete()
        return Response({"message": DELETED_SUCCESS_MSG}, status=204)


class TaskView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer = TaskSerializer
    model = Task

    def post(self, request):
        serializer = self.serializer(data=request.data.get('task'))
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({"message": CREATED_SUCCESS_MSG}, status=status.HTTP_201_CREATED)

    def get(self, request, **kwargs):
        """
                       :param request:
                       :param kwargs: id here will be list_id
                       """
        tasks = self.model.objects.filter(list=kwargs['id'])
        serializer = self.serializer(tasks, many=True)
        return Response({'results': serializer.data, 'message': SUCCESS_MSG}, status=status.HTTP_200_OK)

    def put(self, request, **kwargs):
        """
                               :param request:
                               :param kwargs: id here will be task_id
                               """
        saved_task = self.model.objects.filter(id=kwargs['id'])
        data = request.data.get('task')
        serializer = self.serializer(instance=saved_task, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({"message": UPDATED_SUCCESS_MSG}, status=status.HTTP_201_CREATED)

    def delete(self, request, **kwargs):
        """
                                       :param request:
                                       :param kwargs: id here will be task_id
                                       """
        task = self.model.objects.filter(id=kwargs['id'])
        task.delete()
        return Response({"message": DELETED_SUCCESS_MSG}, status=204)

#
# class TaskOfListView(APIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer = TaskSerializer
#     model = Task
#
#     def get(self, request, **kwargs):
#         tasks = self.model.objects.filter(id=kwargs['list_id'])
#         serializer = self.serializer(tasks, many=True)
#         return Response({'results': serializer.data, 'message': SUCCESS_MSG}, status=status.HTTP_200_OK)
#
#
# class ListOfBoardView(APIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer = ListSerializer
#     model = List
#
#     def get(self, request, **kwargs):
#         tasks = self.model.objects.filter(id=kwargs['board_id'])
#         serializer = self.serializer(tasks, many=True)
#         return Response({'results': serializer.data, 'message': SUCCESS_MSG}, status=status.HTTP_200_OK)


class DataView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    model = Board
    serializer = AllDataSerializer

    def get(self, request, **kwargs):
        print(request.data, kwargs)
        queryset = self.model.objects.filter(id=kwargs['board_id'])
        serializer = self.serializer(queryset, many=True)
        return Response({'results': serializer.data, 'message': SUCCESS_MSG}, status=status.HTTP_200_OK)

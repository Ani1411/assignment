from django.urls import path

from api.views import *

urlpatterns = [
    path('register', RegisterView.as_view(), name='user login'),
    path('login', LoginView.as_view(), name='user login'),
    path('users', UserView.as_view(), name='user view'),

    path('data/<int:board_id>', DataView.as_view(), name='Data view'),

    path('boards', BoardView.as_view(), name='board view'),
    path('boards/<int:pk>', BoardView.as_view(), name='board view'),

    path('lists', ListView.as_view(), name='List view'),
    path('lists/<int:id>', ListView.as_view(), name='List view'),

    path('tasks', TaskView.as_view(), name='Task view'),
    path('tasks/<int:id>', TaskView.as_view(), name='Task view'),
]

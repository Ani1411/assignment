from django.contrib import admin

from api.models import Board, List, Task


# Register your models here.
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'privacy', 'owner', 'created_at', 'updated_at',)


class ListAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'board', 'created_at', 'updated_at',)


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'order', 'list', 'created_at', 'updated_at',)


admin.site.register(Board, BoardAdmin)
admin.site.register(List, ListAdmin)
admin.site.register(Task, TaskAdmin)

from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models import Max


# Create your models here.


class Board(models.Model):
    PRIVACY_CHOICES = [
        ('public', 'Public'),
        ('private', 'Private'),
    ]
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='board_owner')
    name = models.CharField(max_length=50, blank=False, null=False)
    privacy = models.CharField(max_length=8, choices=PRIVACY_CHOICES)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    class Meta:
        db_table = 'board'
        verbose_name = 'Board'
        verbose_name_plural = 'Boards'

    def __str__(self):
        return str(self.name)


class List(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="lists")
    title = models.CharField(max_length=50, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    class Meta:
        db_table = 'list'
        verbose_name = 'List'
        verbose_name_plural = 'Lists'

    def __str__(self):
        return str(self.title)


class Task(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="tasks")
    text = models.CharField(max_length=255, blank=False, null=False)
    order = models.PositiveIntegerField(blank=True, null=True)
    assigned_to = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    class Meta:
        db_table = 'task'
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'

    def __str__(self):
        return str(self.text)

    def save(self, *args, **kwargs):
        lists = Task.objects.filter(list=self.list)
        if not self.order and lists.count() == 0:
            self.order = 100
        elif not self.order:
            self.order = lists.aggregate(Max('order'))['order__max'] + 100
        return super().save(*args, **kwargs)

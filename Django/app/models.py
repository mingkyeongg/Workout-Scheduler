from django.db import models

class CalendarEvent(models.Model):
    title = models.CharField(max_length=200)
    start = models.DateTimeField(auto_now=True)
    end = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=200, default='Unknown')



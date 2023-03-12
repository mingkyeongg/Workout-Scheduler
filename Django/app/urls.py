from django.urls import path
from .views import CalendarEventList, CalendarEventDetail

urlpatterns = [
    path('calendar-events/', CalendarEventList.as_view(), name='calendar-event-list'),
    path('calendar-events/<int:pk>/', CalendarEventDetail.as_view(), name='calendar-event-detail'),
]

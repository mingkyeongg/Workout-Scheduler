from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CalendarEvent
from .serializers import CalendarEventSerializer
from django.http import JsonResponse
from django.http import Http404


class CalendarEventList(APIView):
    # queryset = CalendarEvent.objects.all()
    # serializer_class = CalendarEventSerializer
    def get(self, request):
      reviews = CalendarEvent.objects.all()
      serializer = CalendarEventSerializer(reviews, many=True)
      return Response(serializer.data)
    def post(self, request):
      serializer = CalendarEventSerializer(
        data = request.data
      )
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def my_view(request):
    data = {'key': 'value'}
    response = JsonResponse(data)
    response['Access-Control-Allow-Origin'] = '*'  # 모든 도메인 허용
    return response


class CalendarEventDetail(APIView):
    def get_object(self, pk):
        try:
            return CalendarEvent.objects.get(pk=pk)
        except CalendarEvent.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = CalendarEventSerializer(review)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        review = self.get_object(pk)
        serializer = CalendarEventSerializer(review, data=request.data)
        if serializer.is_valid():  # 유효성 검사
            serializer.save()  # 저장
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        review = self.get_object(pk)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


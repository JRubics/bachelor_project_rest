from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.files.storage import FileSystemStorage
import time, calendar;
from .models import Assignment

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class UploadFileView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        document = request.FILES.get('file')
        if document.size > 1024:
            content = {'error': 'File too big'}
            return Response(content)
        fs = FileSystemStorage()
        filepath = "assignments/"+request.user.username+"/"+ str(calendar.timegm(time.gmtime())) +document.name
        fs.save(filepath, document)

        assignment = Assignment.objects.create(user=request.user, filepath=filepath);

        content = {}
        return Response(content)
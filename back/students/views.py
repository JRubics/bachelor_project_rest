from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.files.storage import FileSystemStorage
import time, calendar;
from .models import Assignment
from .serializers import AssignmentSerializer
from .docker import script
from django.utils.timezone import get_current_timezone
from datetime import datetime
import threading

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
        filename = document.name
        filepath = "assignments/" + request.user.username + "/" + str(calendar.timegm(time.gmtime())) + filename
        savepath = "students/docker/" + filepath
        fs.save(savepath, document)

        assignment = Assignment.objects.create(user=request.user, filepath=savepath, filename=filename, date_added=datetime.now(tz=get_current_timezone()));

        t = threading.Thread(target=script.run_container, kwargs={'callback': script.finished, 'filepath': filepath, 'tag': assignment.id})
        t.start()

        content = {}
        return Response(content)

class AssignmentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        assignments = Assignment.objects.filter(user=request.user.id)
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

class LastAssignmentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        assignment = Assignment.objects.filter(user=request.user.id).last()
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)
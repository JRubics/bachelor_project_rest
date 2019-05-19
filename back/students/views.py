from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.files.storage import FileSystemStorage
import time, calendar;
from .models import Assignment, FixtureFile
from .serializers import AssignmentSerializer
from .docker import script
from django.utils.timezone import get_current_timezone
from datetime import datetime
import requests
import json

class AssignmentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        assignments = Assignment.objects.filter(user=request.user.id)
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        document = request.FILES.get('file')
        fixture_id=1
        if document.size > 1024:
            content = {'error': 'File too big'}
            return Response(content)
        fs = FileSystemStorage()
        filename = document.name
        filepath = "assignments/" + request.user.username + "/" + str(calendar.timegm(time.gmtime())) + filename
        savepath = "students/docker/" + filepath
        fs.save(savepath, document)

        fixture = FixtureFile.objects.get(id=fixture_id)

        assignment = Assignment.objects.create(user=request.user, filepath=savepath, filename=filename, date_added=datetime.now(tz=get_current_timezone()), fixture=fixture)

        script.build_image(filepath=filepath, fixtures=fixture.fixturepath, tag=assignment.id)

        r = requests.post('https://bachelor.theedgeofrage.com/runner/tasks', json={'id':assignment.id})
        r = r.json()
        if r is None:
            return Response("Server error")
        try:
            assignment.result = r['msg']
            if assignment.result == '':
                print(r['err'])
                return Response("Server error2")
        except TypeError:
            return Response("Server error3")
        assignment.save()

        return Response(assignment.result)

class LastAssignmentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        assignment = Assignment.objects.filter(user=request.user.id).last()
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)
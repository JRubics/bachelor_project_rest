from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import FileSystemStorage
import time
import calendar
from .models import Assignment, FixtureFile
from .serializers import AssignmentSerializer, FixtureSerializer
from django.utils.timezone import get_current_timezone
from datetime import datetime
import requests
from django.conf import settings


def handle_task_result(assignment, response):
    r = response.json()
    if response.status_code == 200:
        try:
            assignment.result = r['msg']
            if assignment.result == '':
                return Response("No result")
        except TypeError:
            return Response("Bad result", status=500)
        assignment.save()
        return Response(assignment.result)
    elif response.status_code == 202:
        return Response("waiting", status=202)
    return Response(r['msg'], status=500)


class AssignmentTaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, assignment_id):
        # return Response("2020-03-23 12:47:22,753 [INFO] Program compiled without errors nor warnings")
        assignment = Assignment.objects.get(id=assignment_id)
        response = requests.get(f'{settings.RUNNER_URL}/tasks/{assignment.task_id}')
        return handle_task_result(assignment, response)


class AssignmentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        assignments = Assignment.objects.filter(user=request.user.id).order_by('id')
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        # serializer = AssignmentSerializer(Assignment.objects.get(id=1))
        # return Response({'assignment': serializer.data, 'task_id': 123})
        document = request.FILES.get('file')
        fixture_id = request.POST.get('fixture_id')
        if document.size > 16384:
            return Response('File too big', status=413)
        fs = FileSystemStorage()
        filename = document.name
        filepath = "students/data/assignments/" + request.user.username + "/" + str(calendar.timegm(time.gmtime())) + filename
        fs.save(filepath, document)

        fixture = FixtureFile.objects.get(id=fixture_id)

        assignment = Assignment.objects.create(user=request.user, filepath=filepath, filename=filename, date_added=datetime.now(), fixture=fixture)

        fixturepath = "students/data/fixtures/" + fixture.fixturepath
        files = {'assignment': open(filepath, 'rb'), 'fixtures': open(fixturepath, 'rb') }
        r = requests.post(f'{settings.RUNNER_URL}/api/run', files=files)
        r = r.json()
        task_id = r['task_id']

        assignment.task_id = task_id
        assignment.save()

        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)


class LastAssignmentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        assignment = Assignment.objects.filter(user=request.user.id).last()
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)


class FixtureView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, id=None):
        if id:
            fixture = FixtureFile.objects.get(id=id)
            serializer = FixtureSerializer(fixture)
        else:
            fixtures = FixtureFile.objects.all()
            serializer = FixtureSerializer(fixtures, many=True)

        return Response(serializer.data)

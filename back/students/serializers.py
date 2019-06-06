from rest_framework import serializers
from .models import Assignment, FixtureFile

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'user', 'filepath', 'filename', 'result', 'date_added', 'fixture')

class FixtureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixtureFile
        fields = ('id', 'fixturename')
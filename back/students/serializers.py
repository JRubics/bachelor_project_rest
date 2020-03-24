from rest_framework import serializers
from .models import Assignment, FixtureFile


class FixtureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FixtureFile
        fields = ('id', 'fixturename')


class AssignmentSerializer(serializers.ModelSerializer):
    fixture = FixtureSerializer(many=False, read_only=True)

    class Meta:
        model = Assignment
        fields = ('id', 'filepath', 'filename', 'result', 'date_added', 'fixture', 'task_id')
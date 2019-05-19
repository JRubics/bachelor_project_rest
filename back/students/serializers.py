from rest_framework import serializers
from .models import Assignment

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'user', 'filepath', 'filename', 'result', 'date_added', 'fixture')
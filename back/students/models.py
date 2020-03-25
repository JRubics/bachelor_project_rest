from django.db import models
from django.conf import settings


class FixtureFile(models.Model):
    fixturename = models.CharField(max_length=40)
    # fixturetext = models.CharField(max_length=40)
    fixturepath = models.CharField(max_length=100)

    def __str__(self):
        return self.fixturename + " | " + self.fixturepath


class Assignment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    filepath = models.CharField(max_length=200)
    filename = models.CharField(max_length=40)
    result = models.CharField(null=True, blank=True, max_length=8000)
    date_added = models.DateTimeField()
    fixture = models.ForeignKey(FixtureFile, on_delete=models.CASCADE)
    task_id = models.CharField(null=True, max_length=100)

    def __str__(self):
        return self.user.username + " | " + self.filepath

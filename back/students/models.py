from django.db import models
from django.conf import settings

class Assignment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    filepath = models.CharField(max_length=200)
    result = models.CharField(null=True, blank=True, max_length=3000)
    def __str__(self):
        return self.user.username + " | " + self.filepath
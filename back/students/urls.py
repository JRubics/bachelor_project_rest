from django.urls import path

from . import views

urlpatterns = [
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('upload-file/', views.UploadFileView.as_view(), name='upload-file'),
    path('assignments/', views.AssignmentView.as_view(), name='assignments'),
]
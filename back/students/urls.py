from django.urls import path

from . import views

urlpatterns = [
    path('assignments/', views.AssignmentView.as_view(), name='assignments'),
    path('assignments/last/', views.LastAssignmentView.as_view(), name='assignments'),
]
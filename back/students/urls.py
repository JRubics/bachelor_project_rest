from django.urls import path

from . import views


urlpatterns = [
    path('assignments/', views.AssignmentView.as_view(), name='assignments'),
    path('assignments/last/', views.LastAssignmentView.as_view(), name='assignments'),
    path('assignments/<assignment_id>', views.AssignmentTaskView.as_view(), name='assignments'),
    path('fixtures/', views.FixtureView.as_view(), name='fixtures'),
    path('fixtures/<id>', views.FixtureView.as_view(), name='fixtures'),
]

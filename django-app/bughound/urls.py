"""
URL configuration for bughound project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from bughoundapp.views import (BugReportDelete, BugReportListView,
                               EmployeeNameListView, FormDataAPIView,
                               LoginAPIView, RegisterAPIView, SubmitAPIView)
from django.contrib import admin
from django.urls import path

from bughoundapp.views import SubmitAPIView
from bughoundapp.views import LoginAPIView, RegisterAPIView, BugReportListView, FormDataAPIView, BugReportDelete, BugReportSearchAPIView, UpdateBugReportAPIView
urlpatterns = [
    path("admin/", admin.site.urls),
    path('submit/', SubmitAPIView.as_view(), name='submit-api'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('bug-reports/', BugReportListView.as_view(), name='bug-reports'),
    path('api/form-data/', FormDataAPIView.as_view(), name='form-data'),
    path('bug-reports/<int:report_id>/', BugReportDelete.as_view(), name='bug-report-delete'),
    path('api/employees-names/', EmployeeNameListView.as_view(), name='employee-names'),
    path('bug-reports/search/', BugReportSearchAPIView.as_view(), name='bug-report-search'),  # Add the search API URL pattern
    path('bug-reports/update/<int:pk>/', UpdateBugReportAPIView.as_view(), name='update-bug-report'),
]

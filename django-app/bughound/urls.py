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
from bughoundapp.views import (AddFunctionalAreaAPIView, AddProgramAPIView,
                               BugReportDelete, BugReportListView,
                               BugReportSearchAPIView, EmployeeNameListView,
                               FormDataAPIView, FunctionalAreaListAPIView,
                               EditEmployeeAPIView,
                               LoginAPIView, ProgramFunctionalAreasList,
                               ProgramListView, RegisterAPIView, SubmitAPIView,
                               UpdateBugReportAPIView, UpdateProgramAPIView, 
                               UpdateFunctionalAreaAPIView)

from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



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
    path('api/program-names/', ProgramListView.as_view(), name='program-names'),
    path('api/add-program-names/', AddProgramAPIView.as_view(), name='add-program-names'),
    path('api/functional-area-names/', FunctionalAreaListAPIView.as_view(), name = 'functional-area-names'),
    path('api/add-functional-area-names/', AddFunctionalAreaAPIView.as_view(), name = 'add-functional-area-names'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/program-functional-area-names/<int:program_id>/', ProgramFunctionalAreasList.as_view(), name = 'program-functional-area-names'),

    path('api/update-program-names/<int:program_id>/', UpdateProgramAPIView.as_view(), name='update-program-names'),
    path('api/update-functional-area-names/<int:area_id>/', UpdateFunctionalAreaAPIView.as_view(), name='update-functional-area-names'),
    path('api/employees/<int:pk>/', EditEmployeeAPIView.as_view()),
    path('api/update-program-names/<int:program_id>/', UpdateProgramAPIView.as_view(), name='update-program-names'),
    path('api/update-functional-area-names/<int:area_id>/', UpdateFunctionalAreaAPIView.as_view(), name='update-functional-area-names'),
]

from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bughoundapp.serializers import BugReportSerializer  # Import your serializer
from bughoundapp.models import Employee, BugReport, EmployeeRole,Program, FunctionalArea
from bughoundapp.serializers import LoginSerializer, EmployeeRegistrationSerializer, EmployeeRoleSerializer, ProgramSerializer, FunctionalAreaSerializer, EmployeeSerializer
from django.contrib.auth.hashers import check_password
from rest_framework import generics


class SubmitAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BugReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['Username']
            password = serializer.validated_data['Password']
            try:
                employee = Employee.objects.get(Username=username)
                if check_password(password, employee.Password):
                    return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
            except Employee.DoesNotExist:
                return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmployeeRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BugReportListView(generics.ListAPIView):
    queryset = BugReport.objects.all()
    serializer_class = BugReportSerializer


class FormDataAPIView(APIView):
    """
    API View to aggregate form data for the test case creation form.
    """
    def get(self, request, *args, **kwargs):
        # Fetch data from each model
        employee_roles = EmployeeRole.objects.all()
        programs = Program.objects.all()
        functional_areas = FunctionalArea.objects.all()
        employees = Employee.objects.all()

        # Assuming ReportType, Severity, Status, Priority, Resolution are choices in your models,
        # and for simplicity, they are represented here as lists of dictionaries.
        # You might want to adjust this based on your actual model design or choice fields.
        report_types = [{'id': 1, 'name': 'Bug'}, {'id': 2, 'name': 'Feature Request'}]
        severity_levels = [{'id': 1, 'name': 'Low'}, {'id': 2, 'name': 'Medium'}, {'id': 3, 'name': 'High'}]
        statuses = [{'id': 1, 'name': 'Open'}, {'id': 2, 'name': 'Closed'}, {'id': 3, 'name': 'In Progress'}]
        priorities = [{'id': 1, 'name': 'Low'}, {'id': 2, 'name': 'Medium'}, {'id': 3, 'name': 'High'}]
        resolutions = [{'id': 1, 'name': 'Fixed'}, {'id': 2, 'name': 'Won\'t Fix'}, {'id': 3, 'name': 'Duplicate'}]

        # Serialize the data
        employee_roles_serialized = EmployeeRoleSerializer(employee_roles, many=True).data
        programs_serialized = ProgramSerializer(programs, many=True).data
        functional_areas_serialized = FunctionalAreaSerializer(functional_areas, many=True).data
        employees_serialized = EmployeeSerializer(employees, many=True).data

        # Aggregate data into a single response
        aggregated_data = {
            "employee_roles": employee_roles_serialized,
            "programs": programs_serialized,
            "functional_areas": functional_areas_serialized,
            "employees": employees_serialized,
            "report_types": report_types,
            "severity_levels": severity_levels,
            "statuses": statuses,
            "priorities": priorities,
            "resolutions": resolutions,
            # Add other data as needed
        }

        return Response(aggregated_data)

class BugReportDelete(APIView):
    """
    Deletes a BugReport by its ID.
    """
    def delete(self, request, report_id, format=None):
        try:
            bug_report = BugReport.objects.get(pk=report_id)
            bug_report.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except BugReport.DoesNotExist:
            return Response({'error': 'BugReport not found.'}, status=status.HTTP_404_NOT_FOUND)

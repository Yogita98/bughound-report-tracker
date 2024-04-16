from bughoundapp.models import (BugReport, Employee, EmployeeRole,
                                FunctionalArea, Program)
from bughoundapp.serializers import \
    BugReportSerializer  # Import your serializer
from bughoundapp.serializers import (AddFunctionalSerializer,
                                     AddProgramSerializer,
                                     EmployeeNameSerializer,
                                     EmployeeRegistrationSerializer,
                                     EmployeeRoleSerializer,
                                     EmployeeSerializer,
                                     FunctionalAreaSerializer, LoginSerializer,
                                     ProgramSerializer)
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView


class SubmitAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print("hello world")
        print(request.data)
        serializer = BugReportSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            # Process attachments
            attachments = request.FILES.getlist('attachments')
            for attachment in attachments:
                # Save attachment information to your Attachment model
                Attachment.objects.create(
                    filetype=attachment.content_type,
                    filepath=attachment.name,  # You may need to adjust this depending on your file storage settings
                    bugreportid=serializer.instance.id
                )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateBugReportAPIView(APIView):
    def get_object(self, pk):
        try:
            return BugReport.objects.get(pk=pk)
        except BugReport.DoesNotExist:
            return None

    def put(self, request, pk, format=None):
        bug_report = self.get_object(pk)
        if not bug_report:
            return Response({'error': 'Bug Report not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BugReportSerializer(bug_report, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['Username']
            password = serializer.validated_data['Password']
            try:
                employee = Employee.objects.get(Username=username)
                role = employee.Role.Permissions
                if check_password(password, employee.Password):
                    return Response({"message": "Login successful", "Role" : role}, status=status.HTTP_200_OK)
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
    queryset = BugReport.objects.select_related('Program').all()  # Ensure to select the related program
    serializer_class = BugReportSerializer

class FormDataAPIView(APIView):
    def get(self, request, *args, **kwargs):
        aggregated_data = {
            "employee_roles": EmployeeRoleSerializer(EmployeeRole.objects.all(), many=True).data,
            "programs": ProgramSerializer(Program.objects.all(), many=True).data,
            "functional_areas": FunctionalAreaSerializer(FunctionalArea.objects.all(), many=True).data,
            "employees": EmployeeSerializer(Employee.objects.all(), many=True).data,
            "report_types": [{'id': 1, 'name': 'Bug'}, {'id': 2, 'name': 'Feature Request'}],
            "severity_levels": [{'id': 1, 'name': 'Low'}, {'id': 2, 'name': 'Medium'}, {'id': 3, 'name': 'High'}],
            "statuses": [{'id': 1, 'name': 'Open'}, {'id': 2, 'name': 'Closed'}, {'id': 3, 'name': 'In Progress'}],
            "priorities": [{'id': 1, 'name': 'Low'}, {'id': 2, 'name': 'Medium'}, {'id': 3, 'name': 'High'}],
            "resolutions": [{'id': 1, 'name': 'Fixed'}, {'id': 2, 'name': 'Won\'t Fix'}, {'id': 3, 'name': 'Duplicate'}]
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

class EmployeeNameListView(APIView):
    def get(self, request, *args, **kwargs):
        employees = Employee.objects.all()
        serializer = EmployeeNameSerializer(employees, many=True)
        print(serializer.data)
        return Response(serializer.data)


class BugReportSearchAPIView(APIView):
    def get(self, request):
        description = request.query_params.get('description', '')
        bug_reports = BugReport.objects.filter(ProblemDescription__icontains=description)
        serializer = BugReportSerializer(bug_reports, many=True)
        if bug_reports:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No bug reports found for the given description"}, status=status.HTTP_404_NOT_FOUND)
class ProgramListView(APIView):
    def get(self, request):
        programs = Program.objects.all()
        serializer = ProgramSerializer(programs, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
class AddProgramAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AddProgramSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Program added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FunctionalAreaListAPIView(APIView):
    def get(self, request):
        functionalArea = FunctionalArea.objects.all()
        serializer = FunctionalAreaSerializer(functionalArea, many=True)
        print(serializer.data)
        return Response(serializer.data)
class AddFunctionalAreaAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AddFunctionalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Functional area added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
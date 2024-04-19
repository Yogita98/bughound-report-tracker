from bughoundapp.models import (BugReport, Employee,
                                FunctionalArea, Program, ProgramFunctionalArea)
from bughoundapp.serializers import \
    BugReportSerializer  # Import your serializer
from bughoundapp.serializers import (AddFunctionalSerializer,
                                     AddProgramSerializer,
                                     EmployeeNameSerializer,
                                     EmployeeRegistrationSerializer,
                                    #  EmployeeRoleSerializer,
                                     EmployeeSerializer,
                                     FunctionalAreaSerializer, LoginSerializer,
                                     ProgramFunctionalAreaSerializer,
                                     ProgramSerializer)
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class ExampleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)



class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        username = request.data.get('username')
        password = request.data.get('password')
        print(username)
        print(password)

        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            # Get the employee record for the authenticated user
            try:
                employee = Employee.objects.get(username=username)
                serializer = EmployeeSerializer(employee)
                # res = {"employees": EmployeeSerializer(Employee.objects.all(), many=True).data}

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': serializer.data
                })
            except Employee.DoesNotExist:
                return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class ProgramFunctionalAreasList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, program_id):
        areas = ProgramFunctionalArea.objects.filter(Program=program_id)
        serializer = ProgramFunctionalAreaSerializer(areas, many=True)
        return Response(serializer.data)

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


# class LoginAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             username = serializer.validated_data['Username']
#             password = serializer.validated_data['Password']
#             try:
#                 employee = Employee.objects.get(Username=username)
#                 role = employee.Role.Permissions
#                 if check_password(password, employee.Password):
#                     return Response({"message": "Login successful", "Role" : role}, status=status.HTTP_200_OK)
#                 else:
#                     return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
#             except Employee.DoesNotExist:
#                 return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# if user is not None:
#             refresh = RefreshToken.for_user(user)
#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         else:
#             return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print("Employee data")
        print(request.data)
        serializer = EmployeeRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BugReportListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = BugReport.objects.select_related('Program').all()  # Ensure to select the related program
    serializer_class = BugReportSerializer

class FormDataAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        aggregated_data = {
            # "employee_roles": EmployeeRoleSerializer(EmployeeRole.objects.all(), many=True).data,
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
    permission_classes = [IsAuthenticated]
    def delete(self, request, report_id, format=None):
        try:
            bug_report = BugReport.objects.get(pk=report_id)
            bug_report.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except BugReport.DoesNotExist:
            return Response({'error': 'BugReport not found.'}, status=status.HTTP_404_NOT_FOUND)

class EmployeeNameListView(APIView):
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        print(request.data)
        employees = Employee.objects.all()
        serializer = EmployeeRegistrationSerializer(employees, many=True)
        # print(serializer.data)
        return Response(serializer.data)


class BugReportSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        description = request.query_params.get('description', '')
        bug_reports = BugReport.objects.filter(ProblemDescription__icontains=description)
        serializer = BugReportSerializer(bug_reports, many=True)
        if bug_reports:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No bug reports found for the given description"}, status=status.HTTP_404_NOT_FOUND)

class ProgramListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        programs = Program.objects.all()
        serializer = ProgramSerializer(programs, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
class AddProgramAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = AddProgramSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Program added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FunctionalAreaListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        functionalArea = FunctionalArea.objects.all()
        serializer = FunctionalAreaSerializer(functionalArea, many=True)
        print(serializer.data)
        return Response(serializer.data)

class AddFunctionalAreaAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = AddFunctionalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Functional area added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EditEmployeeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee not found.'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        employee = self.get_object(pk)
        if not isinstance(employee, Response):
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data)
        return employee

    def put(self, request, pk, format=None):
        employee = self.get_object(pk)
        if not isinstance(employee, Response):
            serializer = EmployeeSerializer(employee, data=request.data, partial=True)  # Allow partial updates
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return employee

class UpdateProgramAPIView(APIView):
    def put(self, request, program_id, *args, **kwargs):
        program = Program.objects.filter(id=program_id).first()
        if not program:
            return Response({"error": "Program not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AddProgramSerializer(program, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Program updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateFunctionalAreaAPIView(APIView):
    def put(self, request, area_id, *args, **kwargs):
        functionalArea = FunctionalArea.objects.filter(id=area_id).first()
        if not functionalArea:
            return Response({"error": "Functional Area not found"}, status=status.HTTP_404_NOT_FOUND)

        # Pass the instance to the serializer along with the data
        serializer = AddFunctionalSerializer(functionalArea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Functional Area updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
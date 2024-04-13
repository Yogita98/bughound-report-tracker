from rest_framework import serializers

from .models import (Attachment, BugReport, Employee, EmployeeRole,
                     FunctionalArea, Program)


class EmployeeRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeRole
        fields = '__all__'

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class FunctionalAreaSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True, many=False)
    
    class Meta:
        model = FunctionalArea
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    Username = serializers.CharField(max_length=255)
    Password = serializers.CharField(max_length=255)

class EmployeeSerializer(serializers.ModelSerializer):
    role = EmployeeRoleSerializer(read_only=True, many=False)
    
    class Meta:
        model = Employee
        fields = '__all__'

class BugReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BugReport
        fields = ('id','ReportTypeID', 'Severity', 'ProblemDescription', 'Status', 'Priority', 'Comments', 'ReportedByDate', 'TestedByEmployee')

class AttachmentSerializer(serializers.ModelSerializer):
    bug_report_number = BugReportSerializer(read_only=True, source='BugReportNumber')

    class Meta:
        model = Attachment
        fields = '__all__'
        
class EmployeeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['Name']

class EmployeeRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['Name', 'Username', 'Password', 'ContactInfo', 'Role']
        extra_kwargs = {
            'Password': {'write_only': True}
        }

    def create(self, validated_data):
        employee = Employee.objects.create(
            Name=validated_data['Name'],
            Username=validated_data['Username'],
            Password=validated_data['Password'],
            ContactInfo=validated_data['ContactInfo'],
            Role=validated_data['Role']
        )
        return employee
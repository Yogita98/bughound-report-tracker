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
    ReportedByEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    AssignedToEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True)
    ResolvedByEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True)
    TestedByEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True)
    Program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all())
    FunctionalArea = serializers.PrimaryKeyRelatedField(queryset=FunctionalArea.objects.all(), allow_null=True)

    Program_name = serializers.CharField(source='Program.ProgramName', read_only=True)
    class Meta:
        model = BugReport
        fields = [
            'id','ReportTypeID', 'Severity', 'ProblemSummary', 'ProblemDescription',
            'Reproducible', 'Program', 'SuggestedFix', 'ReportedByDate', 'Comments',
            'Status', 'Priority', 'Resolution', 'ResolutionVersion',
            'ResolvedByDate', 'TestedByDate', 'TreatedAsDeferred',
            'AssignedToEmployee', 'FunctionalArea', 'Program_name',
            'ResolvedByEmployee', 'TestedByEmployee', 'ReportedByEmployee'
        ]

class AttachmentSerializer(serializers.ModelSerializer):
    bugreport = BugReportSerializer(read_only=True, source='bugreport')

    class Meta:
        model = Attachment
        fields = '__all__'
        
class EmployeeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['Name', 'id']

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
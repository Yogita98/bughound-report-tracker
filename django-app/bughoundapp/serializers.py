from rest_framework import serializers

from .models import (Attachment, BugReport, Employee,
                     FunctionalArea, Program, ProgramFunctionalArea)


class ProgramFunctionalAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramFunctionalArea
        fields = ['Program', 'ProgramName', 'FunctionalArea', 'AreaName']

#class EmployeeRoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EmployeeRole
#         fields = '__all__'

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'

class AddProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['ProgramName']
    def validate_ProgramName(self, value):
        if Program.objects.filter(ProgramName=value).exists():
            raise serializers.ValidationError("Program name already exists.")
        return value
    
class FunctionalAreaSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True, many=False)
    
    class Meta:
        model = FunctionalArea
        fields = '__all__'
        
class AddFunctionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunctionalArea
        fields = ['AreaName', 'Program']

class LoginSerializer(serializers.Serializer):
    Username = serializers.CharField(max_length=255)
    Password = serializers.CharField(max_length=255)

class EmployeeSerializer(serializers.ModelSerializer):
    # role = EmployeeRoleSerializer(read_only=True, many=False)
    
    class Meta:
        model = Employee
        fields = '__all__'

class BugReportSerializer(serializers.ModelSerializer):
    ReportedByEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), default=None)
    AssignedToEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True, default=None, required=False)
    ResolvedByEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True, default=None, required=False)
    TestedByEmployee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), allow_null=True, default=None, required=False)
    Program = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all())
    FunctionalArea = serializers.PrimaryKeyRelatedField(queryset=FunctionalArea.objects.all(), allow_null=True, default=None, required=False)
    class Meta:
        model = BugReport
        fields = [
            'id', 'ReportTypeID', 'Severity', 'ProblemSummary', 'ProblemDescription',
            'Reproducible', 'SuggestedFix', 'ReportedByDate', 'Comments',
            'Status', 'Priority', 'Resolution', 'ResolutionVersion',
            'ResolvedByDate', 'TestedByDate', 'TreatedAsDeferred',
            'AssignedToEmployee', 'Program', 'FunctionalArea',
            'ResolvedByEmployee', 'TestedByEmployee', 'ReportedByEmployee'
        ]
        extra_kwargs = {
            'Comments': {'allow_blank': True, 'required': False},
            'Status': {'default': 'Open'},
            'Priority': {'default': 'Normal'},
            'Resolution': {'allow_blank': True, 'required': False, 'default': 'Pending'},
            'ResolutionVersion': {'allow_blank': True, 'required': False, 'default': 'v1'},
            'ResolvedByDate': {'required': False},
            'TestedByDate': {'required': False},
            'TreatedAsDeferred': {'default': False},
        }

    def validate(self, data):
        """
        Add custom validation logic if necessary, for instance, check if employee ids exist.
        """
        return data

class AttachmentSerializer(serializers.ModelSerializer):
    bugreport = BugReportSerializer(read_only=True, source='bugreport')

    class Meta:
        model = Attachment
        fields = '__all__'
        
class EmployeeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['name', 'id']

class EmployeeRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        # fields = ['Name', 'Username', 'Password', 'ContactInfo', 'Role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        employee = Employee.objects.create(
            name=validated_data['name'],
            username=validated_data['username'],
            password=validated_data['password'],
            email = validated_data['email'],
            # ContactInfo=validated_data['ContactInfo'],
            role=validated_data['role']
        )
        return employee
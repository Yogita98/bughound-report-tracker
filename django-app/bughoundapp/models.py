from django.contrib.auth.hashers import make_password
from django.db import models


class EmployeeRole(models.Model):
    RoleName = models.CharField(max_length=255, unique=False)
    Permissions = models.CharField(max_length=255)

class Program(models.Model):
    ProgramName = models.CharField(max_length=255, unique=True)

class FunctionalArea(models.Model):
    AreaName = models.CharField(max_length=255)
    Program = models.ForeignKey(Program, on_delete=models.CASCADE)

class Employee(models.Model):
    Name = models.CharField(max_length=255)
    Username = models.CharField(max_length=255, unique=True)
    Password = models.CharField(max_length=255)  # Consider using Django's built-in user model for authentication
    ContactInfo = models.CharField(max_length=255)
    Role = models.ForeignKey(EmployeeRole, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.Password = make_password(self.Password)
        super(Employee, self).save(*args, **kwargs)
    
class BugReport(models.Model):
    id = models.IntegerField(primary_key=True)
    Program = models.ForeignKey(Program, on_delete=models.CASCADE)
    ReportTypeID = models.IntegerField()
    Severity = models.CharField(max_length=255)
    ProblemSummary = models.TextField()
    ProblemDescription = models.TextField()
    Reproducible = models.BooleanField()
    SuggestedFix = models.TextField()
    ReportedByEmployee = models.ForeignKey(Employee, related_name='reported_bugs', on_delete=models.CASCADE, null=True)
    ReportedByDate = models.DateField()
    FunctionalArea = models.ForeignKey(FunctionalArea, on_delete=models.SET_NULL, null=True, blank=True)
    AssignedToEmployee = models.ForeignKey(Employee, related_name='assigned_bugs', on_delete=models.SET_NULL, null=True, blank=True)
    Comments = models.CharField(max_length=255, null=True, blank=True)
    Status = models.CharField(max_length=100)
    Priority = models.CharField(max_length=100)
    Resolution = models.CharField(max_length=100, null=True, blank=True)
    ResolutionVersion = models.CharField(max_length=100, null=True, blank=True)
    ResolvedByEmployee = models.ForeignKey(Employee, related_name='resolved_bugs', on_delete=models.SET_NULL, null=True, blank=True)
    ResolvedByDate = models.DateField(null=True, blank=True)
    TestedByEmployee = models.ForeignKey(Employee, related_name='tested_bugs', on_delete=models.SET_NULL, null=True, blank=True)
    TestedByDate = models.DateField(null=True, blank=True)
    TreatedAsDeferred = models.BooleanField()


class Attachment(models.Model):
    BugReportNumber = models.ForeignKey(BugReport, on_delete=models.CASCADE)
    FileType = models.CharField(max_length=255)
    FilePath = models.FileField(upload_to='attachments/')
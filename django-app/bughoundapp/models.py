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
    Password = models.CharField(max_length=255)
    ContactInfo = models.CharField(max_length=255)
    Role = models.ForeignKey(EmployeeRole, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.Password = make_password(self.Password)
        super(Employee, self).save(*args, **kwargs)
    
class BugReport(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField is typically used for automatic id
    Program = models.ForeignKey(Program, on_delete=models.CASCADE)
    ReportTypeID = models.IntegerField()
    Severity = models.CharField(max_length=255)
    ProblemSummary = models.TextField()
    ProblemDescription = models.TextField()
    Reproducible = models.BooleanField(default=True)
    SuggestedFix = models.TextField()
    ReportedByEmployee = models.ForeignKey(Employee, related_name='reported_bugs', on_delete=models.CASCADE, default=0)
    ReportedByDate = models.DateField()
    FunctionalArea = models.ForeignKey(FunctionalArea, on_delete=models.SET_NULL, null=True, blank=True, default=0)
    AssignedToEmployee = models.ForeignKey(Employee, related_name='assigned_bugs', on_delete=models.SET_NULL, null=True, blank=True, default=0)
    Comments = models.CharField(max_length=255, null=True, blank=True, default="")
    Status = models.CharField(max_length=100, null=True, blank=True, default='Open')
    Priority = models.CharField(max_length=100, null=True, blank=True, default='Normal')
    Resolution = models.CharField(max_length=100, null=True, blank=True, default='Pending')
    ResolutionVersion = models.CharField(max_length=100, null=True, blank=True, default='v1')
    ResolvedByEmployee = models.ForeignKey(Employee, related_name='resolved_bugs', on_delete=models.SET_NULL, null=True, blank=True, default=0)
    ResolvedByDate = models.DateField(null=True, blank=True)
    TestedByEmployee = models.ForeignKey(Employee, related_name='tested_bugs', on_delete=models.SET_NULL, null=True, blank=True, default=0)
    TestedByDate = models.DateField(null=True, blank=True)
    TreatedAsDeferred = models.BooleanField(default=False)

class Attachment(models.Model):
    FILE_TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('img', 'Image'),
        # Add more file types if needed
    ]
    bugreport = models.ForeignKey(BugReport, on_delete=models.CASCADE)
    FileType = models.CharField(max_length=255, choices=FILE_TYPE_CHOICES)
    FilePath = models.FileField(upload_to='media/')

class ProgramFunctionalArea(models.Model):
    Program =models.IntegerField(primary_key=True)
    ProgramName = models.CharField(max_length=255)
    FunctionalArea = models.IntegerField()
    AreaName = models.CharField(max_length=255)

    class Meta:
        managed = False 
        db_table = 'ProgramsWithFunctionalAreas' 

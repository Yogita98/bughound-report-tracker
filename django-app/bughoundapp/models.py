from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone, dateformat

# class MyUserManager(BaseUserManager):
#     def create_user(self, email, password=None):
#         if not email:
#             raise ValueError('Users must have an email address')

#         user = self.model(
#             email=self.normalize_email(email),
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password):
#         user = self.create_user(
#             email,
#             password=password,
#         )
#         user.is_admin = True
#         user.save(using=self._db)
#         return user

# class MyUser(AbstractBaseUser):
#     email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)

#     objects = MyUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     def __str__(self):
#         return self.email

#     def has_perm(self, perm, obj=None):
#         return True

#     def has_module_perms(self, app_label):
#         return True

#     @property
#     def is_staff(self):
#         return self.is_admin


# class EmployeeRole(models.Model):
#     RoleName = models.CharField(max_length=255, unique=False)
#     Permissions = models.CharField(max_length=255)

class Program(models.Model):
    ProgramName = models.CharField(max_length=255, unique=True)

class FunctionalArea(models.Model):
    AreaName = models.CharField(max_length=255)
    Program = models.ForeignKey(Program, on_delete=models.CASCADE)

# class Employee(models.Model):
#     Name = models.CharField(max_length=255)
#     Username = models.CharField(max_length=255, unique=True)
#     Password = models.CharField(max_length=255)
#     ContactInfo = models.CharField(max_length=255)
#     Role = models.ForeignKey(EmployeeRole, on_delete=models.CASCADE)

#     def save(self, *args, **kwargs):
#         self.Password = make_password(self.Password)
#         super(Employee, self).save(*args, **kwargs)


class EmployeeManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        # print("email"+email)
        user = self.model(username=username, email=email, **extra_fields)
        # user.set_password(password)
        # user.save(using=self._db)
        user.last_login = dateformat.format(timezone.now(), 'Y-m-d')
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class Employee(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True, null=False)
    name = models.CharField(max_length=255)
    # password = models.CharField(max_length=255)
    # contact_info = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)  # Required for admin access
    is_superuser = models.BooleanField(default=False)
    
    objects = EmployeeManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    def __str__(self):
        # return self.normalize_email
        # self.email = self.normalize_email(self.email)
        return self.email

    def save(self, *args, **kwargs):
        # Optionally handle password hashing here if not using set_password
        self.password = make_password(self.password)
        super().save(*args, **kwargs)


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

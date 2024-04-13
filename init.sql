-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: bugreports
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add employee role',7,'add_employeerole'),(26,'Can change employee role',7,'change_employeerole'),(27,'Can delete employee role',7,'delete_employeerole'),(28,'Can view employee role',7,'view_employeerole'),(29,'Can add bug report',8,'add_bugreport'),(30,'Can change bug report',8,'change_bugreport'),(31,'Can delete bug report',8,'delete_bugreport'),(32,'Can view bug report',8,'view_bugreport'),(33,'Can add attachment',9,'add_attachment'),(34,'Can change attachment',9,'change_attachment'),(35,'Can delete attachment',9,'delete_attachment'),(36,'Can view attachment',9,'view_attachment'),(37,'Can add program',10,'add_program'),(38,'Can change program',10,'change_program'),(39,'Can delete program',10,'delete_program'),(40,'Can view program',10,'view_program'),(41,'Can add functional area',11,'add_functionalarea'),(42,'Can change functional area',11,'change_functionalarea'),(43,'Can delete functional area',11,'delete_functionalarea'),(44,'Can view functional area',11,'view_functionalarea'),(45,'Can add employee',12,'add_employee'),(46,'Can change employee',12,'change_employee'),(47,'Can delete employee',12,'delete_employee'),(48,'Can view employee',12,'view_employee');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_attachment`
--

DROP TABLE IF EXISTS `bughoundapp_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_attachment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `FileType` varchar(255) NOT NULL,
  `FilePath` longtext NOT NULL,
  `BugReportNumber_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_attachme_BugReportNumber_id_8ecac1ed_fk_bughounda` (`BugReportNumber_id`),
  CONSTRAINT `bughoundapp_attachme_BugReportNumber_id_8ecac1ed_fk_bughounda` FOREIGN KEY (`BugReportNumber_id`) REFERENCES `bughoundapp_bugreport` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_attachment`
--

LOCK TABLES `bughoundapp_attachment` WRITE;
/*!40000 ALTER TABLE `bughoundapp_attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_bugreport`
--

DROP TABLE IF EXISTS `bughoundapp_bugreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_bugreport` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ReportTypeID` int NOT NULL,
  `Severity` varchar(255) NOT NULL,
  `ProblemSummary` longtext NOT NULL,
  `ProblemDescription` longtext NOT NULL,
  `Reproducible` tinyint(1) NOT NULL,
  `SuggestedFix` longtext NOT NULL,
  `ReportedByDate` date NOT NULL,
  `Comments` varchar(255) DEFAULT NULL,
  `Status` varchar(100) NOT NULL,
  `Priority` varchar(100) NOT NULL,
  `Resolution` varchar(100) DEFAULT NULL,
  `ResolutionVersion` varchar(100) DEFAULT NULL,
  `ResolvedByDate` date DEFAULT NULL,
  `TestedByDate` date DEFAULT NULL,
  `TreatedAsDeferred` tinyint(1) NOT NULL,
  `AssignedToEmployee_id` bigint DEFAULT NULL,
  `FunctionalArea_id` bigint DEFAULT NULL,
  `Program_id` bigint NOT NULL,
  `ReportedByEmployee_id` bigint NOT NULL,
  `ResolvedByEmployee_id` bigint DEFAULT NULL,
  `TestedByEmployee_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_bugrepor_AssignedToEmployee_i_d458030f_fk_bughounda` (`AssignedToEmployee_id`),
  KEY `bughoundapp_bugrepor_FunctionalArea_id_3284d0b2_fk_bughounda` (`FunctionalArea_id`),
  KEY `bughoundapp_bugrepor_Program_id_e2b8881c_fk_bughounda` (`Program_id`),
  KEY `bughoundapp_bugrepor_ReportedByEmployee_i_2b49990c_fk_bughounda` (`ReportedByEmployee_id`),
  KEY `bughoundapp_bugrepor_ResolvedByEmployee_i_a45e3550_fk_bughounda` (`ResolvedByEmployee_id`),
  KEY `bughoundapp_bugrepor_TestedByEmployee_id_af5b3b39_fk_bughounda` (`TestedByEmployee_id`),
  CONSTRAINT `bughoundapp_bugrepor_AssignedToEmployee_i_d458030f_fk_bughounda` FOREIGN KEY (`AssignedToEmployee_id`) REFERENCES `bughoundapp_employee` (`id`),
  CONSTRAINT `bughoundapp_bugrepor_FunctionalArea_id_3284d0b2_fk_bughounda` FOREIGN KEY (`FunctionalArea_id`) REFERENCES `bughoundapp_functionalarea` (`id`),
  CONSTRAINT `bughoundapp_bugrepor_Program_id_e2b8881c_fk_bughounda` FOREIGN KEY (`Program_id`) REFERENCES `bughoundapp_program` (`id`),
  CONSTRAINT `bughoundapp_bugrepor_ReportedByEmployee_i_2b49990c_fk_bughounda` FOREIGN KEY (`ReportedByEmployee_id`) REFERENCES `bughoundapp_employee` (`id`),
  CONSTRAINT `bughoundapp_bugrepor_ResolvedByEmployee_i_a45e3550_fk_bughounda` FOREIGN KEY (`ResolvedByEmployee_id`) REFERENCES `bughoundapp_employee` (`id`),
  CONSTRAINT `bughoundapp_bugrepor_TestedByEmployee_id_af5b3b39_fk_bughounda` FOREIGN KEY (`TestedByEmployee_id`) REFERENCES `bughoundapp_employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_bugreport`
--

LOCK TABLES `bughoundapp_bugreport` WRITE;
/*!40000 ALTER TABLE `bughoundapp_bugreport` DISABLE KEYS */;
INSERT INTO `bughoundapp_bugreport` VALUES (1,2,'High','Sample summary','Detailed problem description here',1,'A potential fix suggestion','2024-04-01','Initial analysis completed','Open','High','Pending','',NULL,NULL,0,1,1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `bughoundapp_bugreport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_employee`
--

DROP TABLE IF EXISTS `bughoundapp_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `ContactInfo` varchar(255) NOT NULL,
  `Role_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Username` (`Username`),
  KEY `bughoundapp_employee_Role_id_54d785c8_fk_bughounda` (`Role_id`),
  CONSTRAINT `bughoundapp_employee_Role_id_54d785c8_fk_bughounda` FOREIGN KEY (`Role_id`) REFERENCES `bughoundapp_employeerole` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_employee`
--

LOCK TABLES `bughoundapp_employee` WRITE;
/*!40000 ALTER TABLE `bughoundapp_employee` DISABLE KEYS */;
INSERT INTO `bughoundapp_employee` VALUES (1,'John Doe','johndoe','password','john@example.com',1),(2,'Jane Doe','janedoe','pbkdf2_sha256$600000$swMAu4yOLszv8or2j6fLhB$kv5jn3jxXZRYW6dAkPQkhv9sbCLcShYS71fTrU1tQTQ=','jane@example.com',1),(3,'Yogita Bhatia','yogitabhatia','saval','ybhatia@example.com',3),(4,'Sharvika Kulkarni','sharvikakulkarni','goodgame','skulkarni@example.com',2),(5,'Riya Lunagariya','riyalunagariya','nikaloisko','rlunagariya@example.com',4),(6,'Sladyn','sladyn','pbkdf2_sha256$600000$1pOxVrvuJDTUOF3tj6wfgs$v4+anBRlRePofpDIYq6gYRPSLP6jUnNOu58vuS92j44=','vighnesh.khatri@gmail.com',2),(7,'Abhinav','abhinav','pbkdf2_sha256$600000$IuH6bwS0W6GbargkiMlssc$0xk35i/2t5ekDe417xEHqBqgtm4X0hG/bfiUglDixhc=','abhinav.chopra@gmail.com',1);
/*!40000 ALTER TABLE `bughoundapp_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_employeerole`
--

DROP TABLE IF EXISTS `bughoundapp_employeerole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_employeerole` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(255) NOT NULL,
  `Permissions` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_employeerole`
--

LOCK TABLES `bughoundapp_employeerole` WRITE;
/*!40000 ALTER TABLE `bughoundapp_employeerole` DISABLE KEYS */;
INSERT INTO `bughoundapp_employeerole` VALUES (1,'Developer','Full Access'),(2,'Tester','Limited Access'),(3,'Project Manager','Full Access'),(4,'HR','Full Access');
/*!40000 ALTER TABLE `bughoundapp_employeerole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_functionalarea`
--

DROP TABLE IF EXISTS `bughoundapp_functionalarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_functionalarea` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `AreaName` varchar(255) NOT NULL,
  `Program_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_function_Program_id_1198c83d_fk_bughounda` (`Program_id`),
  CONSTRAINT `bughoundapp_function_Program_id_1198c83d_fk_bughounda` FOREIGN KEY (`Program_id`) REFERENCES `bughoundapp_program` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_functionalarea`
--

LOCK TABLES `bughoundapp_functionalarea` WRITE;
/*!40000 ALTER TABLE `bughoundapp_functionalarea` DISABLE KEYS */;
INSERT INTO `bughoundapp_functionalarea` VALUES (1,'UI',1);
/*!40000 ALTER TABLE `bughoundapp_functionalarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_program`
--

DROP TABLE IF EXISTS `bughoundapp_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_program` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ProgramName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProgramName` (`ProgramName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_program`
--

LOCK TABLES `bughoundapp_program` WRITE;
/*!40000 ALTER TABLE `bughoundapp_program` DISABLE KEYS */;
INSERT INTO `bughoundapp_program` VALUES (3,'Combio'),(1,'Example Program'),(2,'Sequence');
/*!40000 ALTER TABLE `bughoundapp_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(9,'bughoundapp','attachment'),(8,'bughoundapp','bugreport'),(12,'bughoundapp','employee'),(7,'bughoundapp','employeerole'),(11,'bughoundapp','functionalarea'),(10,'bughoundapp','program'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-04-08 03:16:08.325571'),(2,'auth','0001_initial','2024-04-08 03:16:09.095488'),(3,'admin','0001_initial','2024-04-08 03:16:09.274055'),(4,'admin','0002_logentry_remove_auto_add','2024-04-08 03:16:09.289203'),(5,'admin','0003_logentry_add_action_flag_choices','2024-04-08 03:16:09.305926'),(6,'contenttypes','0002_remove_content_type_name','2024-04-08 03:16:09.419744'),(7,'auth','0002_alter_permission_name_max_length','2024-04-08 03:16:09.497212'),(8,'auth','0003_alter_user_email_max_length','2024-04-08 03:16:09.537088'),(9,'auth','0004_alter_user_username_opts','2024-04-08 03:16:09.552445'),(10,'auth','0005_alter_user_last_login_null','2024-04-08 03:16:09.624452'),(11,'auth','0006_require_contenttypes_0002','2024-04-08 03:16:09.632053'),(12,'auth','0007_alter_validators_add_error_messages','2024-04-08 03:16:09.646130'),(13,'auth','0008_alter_user_username_max_length','2024-04-08 03:16:09.732869'),(14,'auth','0009_alter_user_last_name_max_length','2024-04-08 03:16:09.818300'),(15,'auth','0010_alter_group_name_max_length','2024-04-08 03:16:09.850866'),(16,'auth','0011_update_proxy_permissions','2024-04-08 03:16:09.870377'),(17,'auth','0012_alter_user_first_name_max_length','2024-04-08 03:16:09.954900'),(18,'sessions','0001_initial','2024-04-08 03:16:10.008069'),(19,'bughoundapp','0001_initial','2024-04-08 03:25:09.137414');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-13  5:28:19

-- MySQL dump 10.13  Distrib 8.3.0, for Linux (aarch64)
--
-- Host: localhost    Database: bugreports
-- ------------------------------------------------------
-- Server version       8.3.0

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
-- Temporary view structure for view `ProgramsWithFunctionalAreas`
--

DROP TABLE IF EXISTS `ProgramsWithFunctionalAreas`;
/*!50001 DROP VIEW IF EXISTS `ProgramsWithFunctionalAreas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `ProgramsWithFunctionalAreas` AS SELECT 
 1 AS `Program`,
 1 AS `ProgramName`,
 1 AS `FunctionalArea`,
 1 AS `AreaName`*/;
SET character_set_client = @saved_cs_client;

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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add employee role',7,'add_employeerole'),(26,'Can change employee role',7,'change_employeerole'),(27,'Can delete employee role',7,'delete_employeerole'),(28,'Can view employee role',7,'view_employeerole'),(29,'Can add bug report',8,'add_bugreport'),(30,'Can change bug report',8,'change_bugreport'),(31,'Can delete bug report',8,'delete_bugreport'),(32,'Can view bug report',8,'view_bugreport'),(33,'Can add attachment',9,'add_attachment'),(34,'Can change attachment',9,'change_attachment'),(35,'Can delete attachment',9,'delete_attachment'),(36,'Can view attachment',9,'view_attachment'),(37,'Can add program',10,'add_program'),(38,'Can change program',10,'change_program'),(39,'Can delete program',10,'delete_program'),(40,'Can view program',10,'view_program'),(41,'Can add functional area',11,'add_functionalarea'),(42,'Can change functional area',11,'change_functionalarea'),(43,'Can delete functional area',11,'delete_functionalarea'),(44,'Can view functional area',11,'view_functionalarea'),(45,'Can add employee',12,'add_employee'),(46,'Can change employee',12,'change_employee'),(47,'Can delete employee',12,'delete_employee'),(48,'Can view employee',12,'view_employee'),(49,'Can add my user',13,'add_myuser'),(50,'Can change my user',13,'change_myuser'),(51,'Can delete my user',13,'delete_myuser'),(52,'Can view my user',13,'view_myuser'),(53,'Can add program functional area',14,'add_programfunctionalarea'),(54,'Can change program functional area',14,'change_programfunctionalarea'),(55,'Can delete program functional area',14,'delete_programfunctionalarea'),(56,'Can view program functional area',14,'view_programfunctionalarea'),(57,'Can add resolution new',15,'add_resolutionnew'),(58,'Can change resolution new',15,'change_resolutionnew'),(59,'Can delete resolution new',15,'delete_resolutionnew'),(60,'Can view resolution new',15,'view_resolutionnew'),(61,'Can add program new',16,'add_programnew'),(62,'Can change program new',16,'change_programnew'),(63,'Can delete program new',16,'delete_programnew'),(64,'Can view program new',16,'view_programnew'),(65,'Can add program resolution mapping new',17,'add_programresolutionmappingnew'),(66,'Can change program resolution mapping new',17,'change_programresolutionmappingnew'),(67,'Can delete program resolution mapping new',17,'delete_programresolutionmappingnew'),(68,'Can view program resolution mapping new',17,'view_programresolutionmappingnew'),(69,'Can add functional area mapping new',18,'add_functionalareamappingnew'),(70,'Can change functional area mapping new',18,'change_functionalareamappingnew'),(71,'Can delete functional area mapping new',18,'delete_functionalareamappingnew'),(72,'Can view functional area mapping new',18,'view_functionalareamappingnew'),(73,'Can add functional areas',19,'add_functionalareas'),(74,'Can change functional areas',19,'change_functionalareas'),(75,'Can delete functional areas',19,'delete_functionalareas'),(76,'Can view functional areas',19,'view_functionalareas'),(77,'Can add resolution version new',20,'add_resolutionversionnew'),(78,'Can change resolution version new',20,'change_resolutionversionnew'),(79,'Can delete resolution version new',20,'delete_resolutionversionnew'),(80,'Can view resolution version new',20,'view_resolutionversionnew');
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
-- Table structure for table `bughoundapp_attachment`
--

DROP TABLE IF EXISTS `bughoundapp_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_attachment` (
  `FilePath` varchar(100) NOT NULL,
  `FileType` varchar(255) NOT NULL,
  `bugreport_id` bigint NOT NULL,
  KEY `bugreport_id` (`bugreport_id`),
  CONSTRAINT `bughoundapp_attachment_ibfk_1` FOREIGN KEY (`bugreport_id`) REFERENCES `bughoundapp_bugreport` (`id`)
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
  `id` bigint NOT NULL,
  `ReportTypeID` int NOT NULL,
  `Severity` varchar(255) NOT NULL,
  `ProblemSummary` longtext NOT NULL,
  `ProblemDescription` longtext NOT NULL,
  `Reproducible` tinyint(1) NOT NULL,
  `SuggestedFix` longtext NOT NULL,
  `ReportedByDate` date NOT NULL,
  `Comments` varchar(255) DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  `Priority` varchar(100) DEFAULT NULL,
  `Resolution` varchar(100) DEFAULT NULL,
  `ResolutionVersion` varchar(100) DEFAULT NULL,
  `ResolvedByDate` date DEFAULT NULL,
  `TestedByDate` date DEFAULT NULL,
  `TreatedAsDeferred` tinyint(1) NOT NULL,
  `AssignedToEmployee_id` bigint DEFAULT NULL,
  `FunctionalArea_id` bigint DEFAULT NULL,
  `Program_id` bigint NOT NULL,
  `ReportedByEmployee_id` bigint DEFAULT NULL,
  `ResolvedByEmployee_id` bigint DEFAULT NULL,
  `TestedByEmployee_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_bugrepor_AssignedToEmployee_i_d458030f_fk_bughounda` (`AssignedToEmployee_id`),
  KEY `bughoundapp_bugrepor_FunctionalArea_id_3284d0b2_fk_bughounda` (`FunctionalArea_id`),
  KEY `bughoundapp_bugrepor_Program_id_e2b8881c_fk_bughounda` (`Program_id`),
  KEY `bughoundapp_bugrepor_ReportedByEmployee_i_2b49990c_fk_bughounda` (`ReportedByEmployee_id`),
  KEY `bughoundapp_bugrepor_ResolvedByEmployee_i_a45e3550_fk_bughounda` (`ResolvedByEmployee_id`),
  KEY `bughoundapp_bugrepor_TestedByEmployee_id_af5b3b39_fk_bughounda` (`TestedByEmployee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_bugreport`
--

LOCK TABLES `bughoundapp_bugreport` WRITE;
/*!40000 ALTER TABLE `bughoundapp_bugreport` DISABLE KEYS */;
INSERT INTO `bughoundapp_bugreport` VALUES (421837,4,'Fatal','c','c',1,'c','2024-04-23','','Open','Fix before next milestone','Withdrawn by Reporter','v3','2024-04-23','2024-04-27',0,55,31,16,59,54,58),(421864,2,'Minor','l','l',1,'l','2024-04-21','','Open','Fix immediately','Pending','v1',NULL,NULL,0,56,13,11,55,NULL,NULL);
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
  `username` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` varchar(255) DEFAULT '2000-01-01',
  `is_superuser` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `is_staff` tinyint(1) DEFAULT '1',
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Username` (`username`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_employee`
--

LOCK TABLES `bughoundapp_employee` WRITE;
/*!40000 ALTER TABLE `bughoundapp_employee` DISABLE KEYS */;
INSERT INTO `bughoundapp_employee` VALUES (15,'admin','Admin','admin','pbkdf2_sha256$600000$4xI3SBIjhWXZkrwYwqZNuo$mOi7uAJJ92nJkxkwUCaZfglEdXEDHZKWc7voPKVskGo=',NULL,1,1,1,'admin@company.com'),(45,'tester','Tester','Tester','pbkdf2_sha256$600000$Co1fKCJLvVcJ4mVllgmkIX$u9QH21gKh2+e3fLFZM/byiL63uvZcZVRrecPdnLxgZc=',NULL,0,1,1,'test@gmail.com'),(53,'smithbob','Developer','Bob','pbkdf2_sha256$600000$Pn3nraDuoZhKBBlclopSpt$fw/tJfcjCK6guslUA4r8WckhxPUoFpzRVQvA30lONxQ=',NULL,0,1,1,'bob@company.com'),(54,'jonessue','Designer','Sue','pbkdf2_sha256$600000$6uAzlKFIH30H37WGqdXSQQ$netEUqb4OJlOwPbMf66yNOynsw959IlFjlA2fRgN7dk=',NULL,0,1,1,'sue@company.com'),(55,'smithhabib','Designer','Habib','pbkdf2_sha256$600000$QpbZeMNA86ZubkRz3r2C1o$qFb310CRIp7PG+cUFA2dQ1jGymPIEoZrAlsIi5yQ9o4=',NULL,0,1,1,'habib@company.com'),(56,'jonesyoshi','Developer','Yoshi','pbkdf2_sha256$600000$Kov1D3TWEHS9agVuJr9RMz$DHSb401sFz769wrDu0shUm5jbU8Gb89/554Q9Cekilg=',NULL,0,1,1,'yoshi@company.com'),(57,'smithfrancois','Designer','Francois','pbkdf2_sha256$600000$0ngn2JRQoXxTbUL2eFsKcb$f9pXMlekAgxyLOcsHErYI4CwoZ6RXT5UCt8wnPEbko0=',NULL,0,1,1,'francois@company.com'),(58,'jonesbecky','Tester','Becky','pbkdf2_sha256$600000$rELQ7UchedGy1oCeO1t2NS$lWk0b5CxGj9oEaLVAbh6t0nlmWWAB9Cr/TbjHmgRWhg=',NULL,0,1,1,'becky@company.com'),(59,'smithfelix','Designer','Felix','pbkdf2_sha256$600000$QAZ47teqv7vXOF4Gy6ugyt$R/nhAXzIehbsIX7fiqwBDO2dfln9tCnhh/lCF70eRkc=',NULL,0,1,1,'felix@company.com');
/*!40000 ALTER TABLE `bughoundapp_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_employee_groups`
--

DROP TABLE IF EXISTS `bughoundapp_employee_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_employee_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`employee_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`employee_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_employee_groups`
--

LOCK TABLES `bughoundapp_employee_groups` WRITE;
/*!40000 ALTER TABLE `bughoundapp_employee_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_employee_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_employee_user_permissions`
--

DROP TABLE IF EXISTS `bughoundapp_employee_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_employee_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`employee_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`employee_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_employee_user_permissions`
--

LOCK TABLES `bughoundapp_employee_user_permissions` WRITE;
/*!40000 ALTER TABLE `bughoundapp_employee_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_employee_user_permissions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_functionalarea`
--

LOCK TABLES `bughoundapp_functionalarea` WRITE;
/*!40000 ALTER TABLE `bughoundapp_functionalarea` DISABLE KEYS */;
INSERT INTO `bughoundapp_functionalarea` VALUES (12,'Ada95 Parser',11),(13,'Ada95 Lexer',11),(14,'Ada95 IDE',11),(15,'Logon',12),(16,'Start',12),(17,'DB Maintenance',12),(18,'Search',12),(19,'Insert New',12),(20,'Search Results',12),(21,'Add Edit Areas',12),(22,'Add Employees',12),(23,'Add Programs',12),(24,'View Bugs',12),(25,'Lexer',13),(26,'Parser',13),(27,'Code Generator',13),(28,'Linker',13),(29,'IDE',13),(30,'Lexer',16),(31,'Parser',16),(32,'Code Generator',16),(33,'Linker',16),(34,'IDE',16),(35,'Editor',17),(36,'Spell Checker',17),(37,'Dynodraw',17),(38,'Formulator',17),(39,'Export',12);
/*!40000 ALTER TABLE `bughoundapp_functionalarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_functionalareamappingnew`
--

DROP TABLE IF EXISTS `bughoundapp_functionalareamappingnew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_functionalareamappingnew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `FunctionalAreaID_id` bigint NOT NULL,
  `MappingID_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_function_FunctionalAreaID_id_2527062a_fk_bughounda` (`FunctionalAreaID_id`),
  KEY `bughoundapp_function_MappingID_id_f6aa54b0_fk_bughounda` (`MappingID_id`),
  CONSTRAINT `bughoundapp_function_FunctionalAreaID_id_2527062a_fk_bughounda` FOREIGN KEY (`FunctionalAreaID_id`) REFERENCES `bughoundapp_functionalareas` (`id`),
  CONSTRAINT `bughoundapp_function_MappingID_id_f6aa54b0_fk_bughounda` FOREIGN KEY (`MappingID_id`) REFERENCES `bughoundapp_programresolutionmappingnew` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_functionalareamappingnew`
--

LOCK TABLES `bughoundapp_functionalareamappingnew` WRITE;
/*!40000 ALTER TABLE `bughoundapp_functionalareamappingnew` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_functionalareamappingnew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_functionalareas`
--

DROP TABLE IF EXISTS `bughoundapp_functionalareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_functionalareas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `FunctionalAreaName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_functionalareas`
--

LOCK TABLES `bughoundapp_functionalareas` WRITE;
/*!40000 ALTER TABLE `bughoundapp_functionalareas` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_functionalareas` ENABLE KEYS */;
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
  `Resolution` varchar(100) NOT NULL,
  `ResolutionVersion` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_program`
--

LOCK TABLES `bughoundapp_program` WRITE;
/*!40000 ALTER TABLE `bughoundapp_program` DISABLE KEYS */;
INSERT INTO `bughoundapp_program` VALUES (11,'Ada95 Coder','1','1'),(12,'Bughound','1','1'),(13,'COBOL Coder','1','1'),(14,'COBOL Coder','1','2'),(15,'COBOL Coder','2','1'),(16,'Pascal Coder','1','1'),(17,'Word Writer 2019','1','1');
/*!40000 ALTER TABLE `bughoundapp_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_programnew`
--

DROP TABLE IF EXISTS `bughoundapp_programnew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_programnew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ProgramName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_programnew`
--

LOCK TABLES `bughoundapp_programnew` WRITE;
/*!40000 ALTER TABLE `bughoundapp_programnew` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_programnew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_programresolutionmappingnew`
--

DROP TABLE IF EXISTS `bughoundapp_programresolutionmappingnew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_programresolutionmappingnew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ProgramID_id` bigint NOT NULL,
  `ResolutionID_id` bigint NOT NULL,
  `ResolutionVersionID_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_programr_ProgramID_id_29511951_fk_bughounda` (`ProgramID_id`),
  KEY `bughoundapp_programr_ResolutionID_id_ffaee7c7_fk_bughounda` (`ResolutionID_id`),
  KEY `bughoundapp_programr_ResolutionVersionID__eba86379_fk_bughounda` (`ResolutionVersionID_id`),
  CONSTRAINT `bughoundapp_programr_ProgramID_id_29511951_fk_bughounda` FOREIGN KEY (`ProgramID_id`) REFERENCES `bughoundapp_programnew` (`id`),
  CONSTRAINT `bughoundapp_programr_ResolutionID_id_ffaee7c7_fk_bughounda` FOREIGN KEY (`ResolutionID_id`) REFERENCES `bughoundapp_resolutionnew` (`id`),
  CONSTRAINT `bughoundapp_programr_ResolutionVersionID__eba86379_fk_bughounda` FOREIGN KEY (`ResolutionVersionID_id`) REFERENCES `bughoundapp_resolutionversionnew` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_programresolutionmappingnew`
--

LOCK TABLES `bughoundapp_programresolutionmappingnew` WRITE;
/*!40000 ALTER TABLE `bughoundapp_programresolutionmappingnew` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_programresolutionmappingnew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_resolutionnew`
--

DROP TABLE IF EXISTS `bughoundapp_resolutionnew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_resolutionnew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ResolutionName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_resolutionnew`
--

LOCK TABLES `bughoundapp_resolutionnew` WRITE;
/*!40000 ALTER TABLE `bughoundapp_resolutionnew` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_resolutionnew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bughoundapp_resolutionversionnew`
--

DROP TABLE IF EXISTS `bughoundapp_resolutionversionnew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bughoundapp_resolutionversionnew` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `VersionName` varchar(255) NOT NULL,
  `ResolutionID_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bughoundapp_resoluti_ResolutionID_id_a3b12023_fk_bughounda` (`ResolutionID_id`),
  CONSTRAINT `bughoundapp_resoluti_ResolutionID_id_a3b12023_fk_bughounda` FOREIGN KEY (`ResolutionID_id`) REFERENCES `bughoundapp_resolutionnew` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bughoundapp_resolutionversionnew`
--

LOCK TABLES `bughoundapp_resolutionversionnew` WRITE;
/*!40000 ALTER TABLE `bughoundapp_resolutionversionnew` DISABLE KEYS */;
/*!40000 ALTER TABLE `bughoundapp_resolutionversionnew` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(9,'bughoundapp','attachment'),(8,'bughoundapp','bugreport'),(12,'bughoundapp','employee'),(7,'bughoundapp','employeerole'),(11,'bughoundapp','functionalarea'),(18,'bughoundapp','functionalareamappingnew'),(19,'bughoundapp','functionalareas'),(13,'bughoundapp','myuser'),(10,'bughoundapp','program'),(14,'bughoundapp','programfunctionalarea'),(16,'bughoundapp','programnew'),(17,'bughoundapp','programresolutionmappingnew'),(15,'bughoundapp','resolutionnew'),(20,'bughoundapp','resolutionversionnew'),(5,'contenttypes','contenttype'),(6,'sessions','session');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-04-08 03:16:08.325571'),(2,'auth','0001_initial','2024-04-08 03:16:09.095488'),(3,'admin','0001_initial','2024-04-08 03:16:09.274055'),(4,'admin','0002_logentry_remove_auto_add','2024-04-08 03:16:09.289203'),(5,'admin','0003_logentry_add_action_flag_choices','2024-04-08 03:16:09.305926'),(6,'contenttypes','0002_remove_content_type_name','2024-04-08 03:16:09.419744'),(7,'auth','0002_alter_permission_name_max_length','2024-04-08 03:16:09.497212'),(8,'auth','0003_alter_user_email_max_length','2024-04-08 03:16:09.537088'),(9,'auth','0004_alter_user_username_opts','2024-04-08 03:16:09.552445'),(10,'auth','0005_alter_user_last_login_null','2024-04-08 03:16:09.624452'),(11,'auth','0006_require_contenttypes_0002','2024-04-08 03:16:09.632053'),(12,'auth','0007_alter_validators_add_error_messages','2024-04-08 03:16:09.646130'),(13,'auth','0008_alter_user_username_max_length','2024-04-08 03:16:09.732869'),(14,'auth','0009_alter_user_last_name_max_length','2024-04-08 03:16:09.818300'),(15,'auth','0010_alter_group_name_max_length','2024-04-08 03:16:09.850866'),(16,'auth','0011_update_proxy_permissions','2024-04-08 03:16:09.870377'),(17,'auth','0012_alter_user_first_name_max_length','2024-04-08 03:16:09.954900'),(18,'sessions','0001_initial','2024-04-08 03:16:10.008069'),(19,'bughoundapp','0001_initial','2024-04-08 03:25:09.137414'),(20,'bughoundapp','0002_alter_attachment_filepath_and_more','2024-04-13 09:32:55.728750'),(21,'bughoundapp','0003_rename_assignedtoemployee_bugreport_assignedtoemployee_id','2024-04-14 09:23:33.033897'),(22,'bughoundapp','0004_rename_assignedtoemployee_id_bugreport_assignedtoemployee','2024-04-14 09:27:31.386489'),(23,'bughoundapp','0002_alter_bugreport_assignedtoemployee_and_more','2024-04-15 22:19:32.630147'),(24,'bughoundapp','0002_alter_bugreport_comments','2024-04-15 22:37:05.121703'),(25,'bughoundapp','0003_alter_bugreport_priority_alter_bugreport_status','2024-04-15 22:41:05.170278'),(26,'bughoundapp','0002_remove_employee_contactinfo_remove_employee_name','2024-04-16 08:32:02.286827'),(27,'bughoundapp','0003_employee_name','2024-04-16 08:40:39.304136'),(28,'bughoundapp','0004_employee_contactinfo','2024-04-16 08:45:34.335437'),(29,'bughoundapp','0002_remove_employee_contact_info','2024-04-17 09:54:17.317345'),(30,'bughoundapp','0003_alter_employee_email','2024-04-17 09:59:08.371796'),(31,'bughoundapp','0004_alter_employee_is_staff_alter_employee_is_superuser','2024-04-17 10:52:03.822106'),(32,'bughoundapp','0005_alter_employee_password','2024-04-17 10:58:15.935665'),(33,'bughoundapp','0006_alter_employee_email','2024-04-17 11:09:17.198199'),(34,'bughoundapp','0002_alter_employee_email','2024-04-17 11:28:46.682326'),(35,'bughoundapp','0003_alter_employee_email_alter_employee_password','2024-04-17 12:14:20.095302'),(36,'bughoundapp','0002_program_resolution_program_resolutionversion','2024-04-18 05:27:38.192894'),(37,'bughoundapp','0002_alter_program_programname','2024-04-20 02:58:17.914390'),(38,'bughoundapp','0003_functionalareas_programnew_resolutionnew_and_more','2024-04-22 05:39:34.950970');
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

--
-- Final view structure for view `ProgramsWithFunctionalAreas`
--

/*!50001 DROP VIEW IF EXISTS `ProgramsWithFunctionalAreas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = latin1 */;
/*!50001 SET character_set_results     = latin1 */;
/*!50001 SET collation_connection      = latin1_swedish_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ProgramsWithFunctionalAreas` AS select `p`.`id` AS `Program`,`p`.`ProgramName` AS `ProgramName`,`fa`.`id` AS `FunctionalArea`,`fa`.`AreaName` AS `AreaName` from (`bughoundapp_program` `p` join `bughoundapp_functionalarea` `fa` on((`p`.`id` = `fa`.`Program_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  5:58:53
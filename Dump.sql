CREATE DATABASE  IF NOT EXISTS `Gamedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Gamedb`;
-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: Gamedb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Friends`
--

DROP TABLE IF EXISTS `Friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Friends` (
  `User_id` int NOT NULL AUTO_INCREMENT,
  `Friend_id` int NOT NULL,
  PRIMARY KEY (`User_id`,`Friend_id`),
  KEY `FK_FRIENDS_2` (`Friend_id`),
  CONSTRAINT `FK_FRIENDS_1` FOREIGN KEY (`User_id`) REFERENCES `User` (`User_id`),
  CONSTRAINT `FK_FRIENDS_2` FOREIGN KEY (`Friend_id`) REFERENCES `User` (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friends`
--

LOCK TABLES `Friends` WRITE;
/*!40000 ALTER TABLE `Friends` DISABLE KEYS */;
INSERT INTO `Friends` VALUES (1,2),(4,2),(1,3),(2,3),(4,3),(1,4),(2,4),(3,4);
/*!40000 ALTER TABLE `Friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Game`
--

DROP TABLE IF EXISTS `Game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Game` (
  `Game_id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(200) DEFAULT NULL,
  `Release_date` varchar(20) NOT NULL,
  `Price` varchar(10) NOT NULL,
  `ImageUrl` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`Game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Game`
--

LOCK TABLES `Game` WRITE;
/*!40000 ALTER TABLE `Game` DISABLE KEYS */;
INSERT INTO `Game` VALUES (1,'Wii Sports','2006','8.99','assets/images/games/placeholder.png'),(2,'Super Mario Bros','1985','2.99','assets/images/games/placeholder.png'),(3,'Wii Sports Resort','2009','4.99','assets/images/games/placeholder.png'),(4,'Pokemon Red/Pokemon Blue','1996','2.99','assets/images/games/placeholder.png'),(5,'Tetris','2006','6.99','assets/images/games/placeholder.png'),(6,'New Super Mario Bros.','2006','12.99','assets/images/games/placeholder.png'),(7,'Wii Play','2009','3.99','assets/images/games/placeholder.png');
/*!40000 ALTER TABLE `Game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Game_Genre`
--

DROP TABLE IF EXISTS `Game_Genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Game_Genre` (
  `Game_id` int NOT NULL,
  `Genre_id` int NOT NULL,
  PRIMARY KEY (`Game_id`,`Genre_id`),
  KEY `Genre_id` (`Genre_id`),
  CONSTRAINT `Game_Genre_ibfk_1` FOREIGN KEY (`Game_id`) REFERENCES `Game` (`Game_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Game_Genre_ibfk_2` FOREIGN KEY (`Genre_id`) REFERENCES `Genre` (`Genre_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Game_Genre`
--

LOCK TABLES `Game_Genre` WRITE;
/*!40000 ALTER TABLE `Game_Genre` DISABLE KEYS */;
INSERT INTO `Game_Genre` VALUES (1,1),(3,1),(2,2),(6,2),(4,4),(5,5),(7,7);
/*!40000 ALTER TABLE `Game_Genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genre`
--

DROP TABLE IF EXISTS `Genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Genre` (
  `Genre_id` int NOT NULL AUTO_INCREMENT,
  `Mode_type` varchar(50) NOT NULL,
  `Genre_name` varchar(50) NOT NULL,
  PRIMARY KEY (`Genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genre`
--

LOCK TABLES `Genre` WRITE;
/*!40000 ALTER TABLE `Genre` DISABLE KEYS */;
INSERT INTO `Genre` VALUES (1,'Wii','Sports'),(2,'NES','Platform'),(3,'Will','Racing'),(4,'GB','Role-Playing'),(5,'GB','Puzzle'),(6,'Will','Misc'),(7,'Will','Platform');
/*!40000 ALTER TABLE `Genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PermiumSale`
--

DROP TABLE IF EXISTS `PermiumSale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PermiumSale` (
  `PremiumSale_id` int NOT NULL AUTO_INCREMENT,
  `Purchase_date` date NOT NULL,
  `Expire_date` date NOT NULL,
  `User_id` int DEFAULT NULL,
  PRIMARY KEY (`PremiumSale_id`),
  KEY `user_permium_constraint` (`User_id`),
  CONSTRAINT `user_permium_constraint` FOREIGN KEY (`User_id`) REFERENCES `User` (`User_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PermiumSale`
--

LOCK TABLES `PermiumSale` WRITE;
/*!40000 ALTER TABLE `PermiumSale` DISABLE KEYS */;
INSERT INTO `PermiumSale` VALUES (1,'2020-01-01','2020-02-01',1),(2,'2020-01-01','2020-03-01',2);
/*!40000 ALTER TABLE `PermiumSale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `User_id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `User_email` varchar(50) NOT NULL,
  `User_password` varchar(50) NOT NULL,
  PRIMARY KEY (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Norm','Norm123@qq.com','12313'),(2,'Jason','JasonLee@qq.com','111111'),(3,'Sara','s09231@gmail.com','888888Sara'),(4,'DocterX','DXXD123@outlook.com','docker');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Buy_Game`
--

DROP TABLE IF EXISTS `User_Buy_Game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Buy_Game` (
  `Game_id` int NOT NULL,
  `User_id` int NOT NULL,
  PRIMARY KEY (`Game_id`,`User_id`),
  KEY `User_id` (`User_id`),
  CONSTRAINT `User_Buy_Game_ibfk_1` FOREIGN KEY (`Game_id`) REFERENCES `Game` (`Game_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `User_Buy_Game_ibfk_2` FOREIGN KEY (`User_id`) REFERENCES `User` (`User_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Buy_Game`
--

LOCK TABLES `User_Buy_Game` WRITE;
/*!40000 ALTER TABLE `User_Buy_Game` DISABLE KEYS */;
INSERT INTO `User_Buy_Game` VALUES (1,1),(2,1),(3,1),(1,2),(2,2),(1,3),(2,3),(1,4);
/*!40000 ALTER TABLE `User_Buy_Game` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-09 23:52:12

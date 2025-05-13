/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for osx10.20 (arm64)
--
-- Host: localhost    Database: servme
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `people` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `restaurant` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` enum('Pizza','Sushi','Fast Food') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES
(1,'Pizza Palace','Pizza Palace is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Pizza+Palace','2025-04-10 08:47:23','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(2,'Cheesy Crust','Cheesy Crust is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Cheesy+Crust','2025-04-10 08:47:40','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(3,'Margherita Magic','Margherita Magic is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Margherita+Magic','2025-04-10 08:48:00','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(4,'Pepperoni Place','Pepperoni Place is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Pepperoni+Place','2025-04-10 08:48:24','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(5,'Neapolitan Nights','Neapolitan Nights is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Neapolitan+Nights','2025-04-10 08:48:45','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(6,'Sushi Central','Sushi Central is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Sushi+Central','2025-04-10 08:48:56','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(7,'Wasabi Wonders','Wasabi Wonders is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Wasabi+Wonders','2025-04-10 08:49:07','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(8,'Tokyo Rolls','Tokyo Rolls is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Tokyo+Rolls','2025-04-10 08:49:20','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(9,'Samurai Sushi','Samurai Sushi is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Samurai+Sushi','2025-04-10 08:49:32','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(10,'Nigiri Nest','Nigiri Nest is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Nigiri+Nest','2025-04-10 08:49:46','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(11,'Burger Blitz','Burger Blitz is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Burger+Blitz','2025-04-10 08:49:59','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(12,'Fry Shack','Fry Shack is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Fry+Shack','2025-04-10 08:50:11','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(13,'Taco Town','Taco Town is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Taco+Town','2025-04-10 08:50:22','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(14,'Grill N Go','Grill N Go is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Grill+N+Go','2025-04-10 08:50:35','2025-05-12 12:55:18','2025-05-12 12:55:18'),
(15,'Snack Express','Snack Express is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Snack+Express','2025-04-10 08:50:46','2025-05-12 12:55:18','2025-05-12 12:55:18');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Kostas','Panagiotaropoulos','kostas@gmail.com','1234567890','$2b$10$SVFKpprltMLXz6UVuG8U5O4lJwI3AiU0.ZOUDZC/UbPZ7EPm0O1bS','user','2025-05-13 08:11:18'),
(2,'John','Doe','john@gmail.com','1234567899','$2b$10$AzPGS6z9Tz8TzqIDn34MLenHg4uukYpI3Hi/jvtXnJHKhWlUBegB2','admin','2025-05-13 08:11:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-05-13 11:16:38

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
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES
(1,2,1,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:47:32'),
(2,3,1,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:47:36'),
(3,2,2,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:47:47'),
(4,3,2,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:47:52'),
(5,2,3,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:13'),
(6,3,3,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:18'),
(7,2,4,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:38'),
(8,3,4,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:41'),
(9,2,5,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:49'),
(10,3,5,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:53'),
(11,2,6,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:48:59'),
(12,3,6,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:04'),
(13,2,7,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:10'),
(14,3,7,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:14'),
(15,2,8,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:24'),
(16,3,8,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:27'),
(17,2,9,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:37'),
(18,3,9,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:43'),
(19,2,10,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:51'),
(20,3,10,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:49:56'),
(21,2,11,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:02'),
(22,3,11,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:08'),
(23,2,12,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:15'),
(24,3,12,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:18'),
(25,2,13,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:26'),
(26,3,13,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:30'),
(27,2,14,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:38'),
(28,3,14,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:41'),
(29,2,15,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:50:50'),
(30,3,15,NULL,NULL,NULL,NULL,'2025-04-20','19:00:00','2025-04-10 08:51:18');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES
(1,'Pizza Palace','Pizza Palace is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Pizza+Palace','2025-04-10 08:47:23'),
(2,'Cheesy Crust','Cheesy Crust is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Cheesy+Crust','2025-04-10 08:47:40'),
(3,'Margherita Magic','Margherita Magic is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Margherita+Magic','2025-04-10 08:48:00'),
(4,'Pepperoni Place','Pepperoni Place is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Pepperoni+Place','2025-04-10 08:48:24'),
(5,'Neapolitan Nights','Neapolitan Nights is a top-notch pizza restaurant.',NULL,'https://via.placeholder.com/150?text=Neapolitan+Nights','2025-04-10 08:48:45'),
(6,'Sushi Central','Sushi Central is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Sushi+Central','2025-04-10 08:48:56'),
(7,'Wasabi Wonders','Wasabi Wonders is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Wasabi+Wonders','2025-04-10 08:49:07'),
(8,'Tokyo Rolls','Tokyo Rolls is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Tokyo+Rolls','2025-04-10 08:49:20'),
(9,'Samurai Sushi','Samurai Sushi is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Samurai+Sushi','2025-04-10 08:49:32'),
(10,'Nigiri Nest','Nigiri Nest is a top-notch sushi restaurant.',NULL,'https://via.placeholder.com/150?text=Nigiri+Nest','2025-04-10 08:49:46'),
(11,'Burger Blitz','Burger Blitz is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Burger+Blitz','2025-04-10 08:49:59'),
(12,'Fry Shack','Fry Shack is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Fry+Shack','2025-04-10 08:50:11'),
(13,'Taco Town','Taco Town is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Taco+Town','2025-04-10 08:50:22'),
(14,'Grill N Go','Grill N Go is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Grill+N+Go','2025-04-10 08:50:35'),
(15,'Snack Express','Snack Express is a top-notch fast food restaurant.',NULL,'https://via.placeholder.com/150?text=Snack+Express','2025-04-10 08:50:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Admin','User','admin@gmail.com','691234567','$2b$10$eY6urq.FJxYeBpHPqB0f6.gTLYZaJlwwKHZJf7jskF7s/EdU/d6Wi','admin','2025-04-10 08:47:04'),
(2,'User','One','user1@gmail.com','691234567','$2b$10$xERJjJwX5FcPe.IsCzOYOerXibzvmRohhSWS9/zMZpjBGURNyu0TG','user','2025-04-10 08:47:13'),
(3,'User','Two','user2@gmail.com','691234567','<hash>','user','2025-04-10 08:47:19');
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

-- Dump completed on 2025-04-20 12:08:32

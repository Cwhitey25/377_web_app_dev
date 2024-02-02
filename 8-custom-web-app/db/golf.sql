CREATE DATABASE `golf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `golfers` (
  `golf_id` int NOT NULL AUTO_INCREMENT,
  `golf_name` varchar(45) NOT NULL,
  `golf_age` int NOT NULL,
  `golf_gender` varchar(10) NOT NULL,
  `golf_wins` int DEFAULT NULL,
  `golf_earnings` int DEFAULT NULL,
  `golf_sponsor` varchar(45) DEFAULT NULL,
  `golf_link` varchar(45) DEFAULT NULL,
  `golf_nationality` varchar(45) DEFAULT NULL,
  `golf_joined` int DEFAULT NULL,
  `golf_events` int DEFAULT NULL,
  PRIMARY KEY (`golf_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: atm
-- ------------------------------------------------------
-- Server version	8.0.17

DROP TABLE IF EXISTS `competencies`;
CREATE TABLE `competencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `competencies` WRITE;
INSERT INTO `competencies` VALUES 
(1,'C++'),
(2,'Python 2'),
(3,'Python 3'),
(4,'React'),
(5,'Ruby on Rails'),
(6, 'Java'),
(7, 'PHP');
(8,'Jenkins');
(9, 'Azure');
UNLOCK TABLES;

DROP TABLE IF EXISTS `ideas`;
CREATE TABLE `ideas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `message` varchar(255) NOT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `ideas` WRITE;
INSERT INTO `ideas` VALUES 
(1,'DevOps','2019-12-03 21:41:06','We should use Kubernetes',0),
(2,'Validation','2019-12-03 21:42:06',' Take time to implement own ideas',1),
(3,'DevOps','2019-12-03 21:42:32','Rewrite Onboarding documents',0),
(4,'DevOps','2019-12-03 21:42:56','The Project should use Pandas for data mining',1);
(5,'Security Operations','2019-12-03 21:42:56','We should build SOC',1);
(6,'Data Miners','2019-12-03 21:42:56','Do not store datas in excel files.',1);
UNLOCK TABLES;


DROP TABLE IF EXISTS `issues`;
CREATE TABLE `issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL,
  `evaluation` enum('Worked well','To be improved','Want to do in next sprint') NOT NULL,
  `RetrospectiveId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RetrospectiveId` (`RetrospectiveId`),
  CONSTRAINT `issues_ibfk_1` FOREIGN KEY (`RetrospectiveId`) REFERENCES `retrospectives` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `issues` WRITE;
INSERT INTO `issues` VALUES 
(1,0,'Pair Programming','Worked well',1),
(2,0,'Rewiev','Worked well',1),
(3,0,'Code quality','To be improved',1),
(4,0,'More pair programming','To be improved',1),
(5,0,'More pair programming','Want to do in next sprint',1),
(6,0,'Integrate CI/CD pipelines','Worked well',2),
(7,0,'Test plans','To be improved',2),
(8,0,'Scrum training','Want to do in next sprint',2),
(9,0,'SW Demo','Worked well',2),
(10,0,'Code quality','To be improved',2),
(11,0,'Pair Programming','Want to do in next sprint',2),
(12,0,'Scrum trainings','Want to do in next sprint',1),
(13,0,'Refactoring existing tools written in python 2','Want to do in next sprint',1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `team` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `messages` WRITE;
INSERT INTO `messages` VALUES 
(1,'Levente Fodor','Hello!','2019-11-14 23:00:00','DevOps'),
(2,'Levente Fodor','Whats up team? ','2019-11-14 23:00:00','DevOps'),
(3,'Chyna Greenfelder','I have a problem with accessing NPM repos. Can somebody help me?','2019-10-10 00:00:00','DevOps'),
(4,'Liana Wiegand','I love my team!','2019-10-10 00:00:00','Validation'),
(5,'Presley Ondricka','I think the corporate proxy is the root of your problem.','2019-10-10 00:00:00','DevOps'),
(6,'Liana Wiegand','I feel the same!','2019-10-10 00:00:00','Validation'),
(7,'Chyna Greenfelder','Thanks, I hope it will work.','2019-11-18 23:00:00','DevOps'),
(8,'Levente Fodor','Is the problem fixed?','2019-11-29 23:00:00','DevOps'),
(9,'Chyna Greenfelder','Yes! :)','2019-11-29 23:00:00','DevOps');
UNLOCK TABLES;


DROP TABLE IF EXISTS `niconicos`;
CREATE TABLE `niconicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` enum('1','3','5') NOT NULL,
  `date` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `niconicos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `niconicos` WRITE;
INSERT INTO `niconicos` VALUES 
(1,'1','2019-11-29 23:50:43',1),
(2,'5','2019-11-29 23:50:44',3),
(3,'3','2019-11-29 23:50:45',5),
(4,'1','2019-11-29 23:52:35',7),
(5,'5','2019-11-29 23:52:35',8),
(6,'3','2019-11-29 23:52:36',9),
(1,'5','2019-11-30 23:50:43',1),
(2,'1','2019-11-30 23:50:44',3),
(3,'5','2019-11-30 23:50:45',5),
(4,'3','2019-11-30 23:52:35',7),
(5,'3','2019-11-30 23:52:35',8),
(6,'1','2019-11-30 23:52:36',9),
UNLOCK TABLES;

1,3,5,7,8,9

DROP TABLE IF EXISTS `retrospectives`;
CREATE TABLE `retrospectives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `roomName` varchar(255) NOT NULL,
  `teamId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  CONSTRAINT `retrospectives_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `retrospectives` WRITE;
INSERT INTO `retrospectives` VALUES 
(1,'2019-11-14 23:00:00','PI19.02.1',1),
(2,'2019-11-14 23:00:00','PI19.02.2',1),
(3,'2019-11-14 23:00:00','PI19.02.3',1),
(4,'2019-11-14 23:00:00','PI19.02.4',1),
(5,'2019-11-29 23:00:00','PI19.04.1',1),
(6,'2019-11-30 21:35:30','PI19.04.2',1),
(7,'2019-11-30 21:37:51','PI19.04.3',1),
(8,'2019-11-30 21:39:24','PI19.04.4',1),
(9,'2019-11-30 21:39:30','PI19.06.1',1);
UNLOCK TABLES;


DROP TABLE IF EXISTS `teamcompetency`;
CREATE TABLE `teamcompetency` (
  `teamId` int(11) NOT NULL,
  `competencyId` int(11) NOT NULL,
  PRIMARY KEY (`teamId`,`competencyId`),
  KEY `competencyId` (`competencyId`),
  CONSTRAINT `teamcompetency_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teamcompetency_ibfk_2` FOREIGN KEY (`competencyId`) REFERENCES `competencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `teamcompetency` WRITE;
INSERT INTO `teamcompetency` VALUES 
(1,1),
(1,2),
(1,3),
(1,4);
(1,6);
(1,7);
UNLOCK TABLES;


DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `teams` WRITE;
INSERT INTO `teams` VALUES 
(1,'DevOps'),
(2,'Validation'),
(3,'FullStack Dev Team'),
(4,'Embedded C Devs');
(5,'Security Operations'); 
(6,'Data Miners');
UNLOCK TABLES;


DROP TABLE IF EXISTS `usercompetencies`;
CREATE TABLE `usercompetencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `competencyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `competencyId` (`competencyId`),
  CONSTRAINT `usercompetencies_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `usercompetencies_ibfk_2` FOREIGN KEY (`competencyId`) REFERENCES `competencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `usercompetencies` WRITE;
INSERT INTO `usercompetencies` VALUES 
(1,70,1,1),
(2,30,1,2),
(3,80,1,3),
(4,70,3,2),
(5,20,3,3),
(6,20,1,4);
(7,10,5,1);
(8,20,5,2);
(9,30,5,3);
(10,40,5,4);
(7,20,7,1);
(8,10,7,2);
(9,40,7,3);
(10,30,7,4);
(7,10,8,1);
(8,90,8,2);
(9,50,8,3);
(10,60,8,4);
(7,90,9,1);
(8,40,9,2);
(9,80,9,3);
(10,10,9,4)
(10,50,9,6);
(10,10,9,7);
(10,30,1,6);
(10,40,1,7);
(10,10,5,6);
(10,10,5,7);
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `rank` enum('Scrum Master','Developer') DEFAULT 'Developer',
  `teamId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES 
(1,'Levente Fodor','https://lh3.googleusercontent.com/a-/AAuE7mAyawR4RaQGS1IO_WC6aB4HjvoAmiSUuRRfiupzEQ','levilevi183@gmail.com','Scrum Master',1),
(2,'Liana Wiegand','https://s3.amazonaws.com/uifaces/faces/twitter/jacobbennett/128.jpg','Liana10@hotmail.com','Developer',2),
(3,'Chyna Greenfelder','https://s3.amazonaws.com/uifaces/faces/twitter/pechkinator/128.jpg','Shana44@gmail.com','Developer',1),
(4,'Stone Kris','https://s3.amazonaws.com/uifaces/faces/twitter/lingeswaran/128.jpg','Cindy.Shanahan@yahoo.com','Developer',2),
(5,'Alfonzo Kulas','https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg','Juana_Lemke@hotmail.com','Developer',1),
(6,'Devyn Powlowski','https://s3.amazonaws.com/uifaces/faces/twitter/uxalex/128.jpg','Joesph.Murray@hotmail.com','Developer',3),
(7,'Presley Ondricka','https://s3.amazonaws.com/uifaces/faces/twitter/arashmanteghi/128.jpg','Carmel47@yahoo.com','Developer',1),
(8,'Noelia Fadel','https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg','Efrain.Fisher@yahoo.com','Developer',1),
(9,'Flavie Conn','https://s3.amazonaws.com/uifaces/faces/twitter/jacobbennett/128.jpg','Mara70@hotmail.com','Developer',1),
UNLOCK TABLES;

-- 1,3,5,7,8,9
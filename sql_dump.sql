# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.16)
# Database: newmovies
# Generation Time: 2016-05-19 14:34:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users_google`;
DROP TABLE IF EXISTS `users_facebook`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `level` smallint(1) NOT NULL DEFAULT '1',
  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `regdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users_facebook
# ------------------------------------------------------------

CREATE TABLE `users_facebook` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(255) NOT NULL DEFAULT '',
  `json` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user-facebook` (`user_id`),
  CONSTRAINT `user-facebook` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users_google
# ------------------------------------------------------------

CREATE TABLE `users_google` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(255) NOT NULL DEFAULT '',
  `json` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user-google` (`user_id`),
  CONSTRAINT `user-google` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

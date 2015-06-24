-- MySQL Script generated by MySQL Workbench
-- Fri Jun 19 16:03:30 2015
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema classroom
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `classroom` ;

-- -----------------------------------------------------
-- Schema classroom
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `classroom` ;
USE `classroom` ;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NOT NULL COMMENT '',
  `username` VARCHAR(20) NOT NULL COMMENT '',
  `email` VARCHAR(100) NOT NULL COMMENT '',
  `password` VARCHAR(100) NOT NULL COMMENT '',
  `role` VARCHAR(20) NOT NULL DEFAULT 'student' COMMENT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)  COMMENT '',
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lessons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lessons` ;

CREATE TABLE IF NOT EXISTS `lessons` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(45) NOT NULL COMMENT '',
  `description` VARCHAR(140) NOT NULL COMMENT '',
  `content` TEXT NOT NULL COMMENT '',
  `start_date` DATETIME NOT NULL COMMENT '',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)  COMMENT '')
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Table `grades`
-- -----------------------------------------------------
-- This is temporary and needs to represent real grades
DROP TABLE IF EXISTS `grades` ;

CREATE TABLE IF NOT EXISTS `grades` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(45) NOT NULL COMMENT '',
  `student` VARCHAR(45) NOT NULL COMMENT '',
  `description` VARCHAR(140) NOT NULL COMMENT '',
  `content` TEXT NOT NULL COMMENT '',
  `start_date` DATETIME NOT NULL COMMENT '',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)  COMMENT '')
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `users`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES ('Eric Ihli', 'ericihli', 'loktakwah@gmail.com', 'ericihli', 'student', DEFAULT, DEFAULT);
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES ('Richard Stanley', 'richardstanley', 'rstanley943@gmail.com', 'richardstanley', 'student', DEFAULT, DEFAULT);
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES ('Jake Lee', 'jakelee', 'jake481lee@gmail.com', 'jakelee', 'student', DEFAULT, DEFAULT);
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES ('Devon Harvey', 'devonharvey', 'devonharvey@gmail.com', 'devonharvey', 'student', DEFAULT, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `lessons`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Algorithms', 'Analysis of time and space complexity of algorithms', 'Lots and lots of big O notations', '2015-07-01', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `grades`
-- -----------------------------------------------------
-- This is temporary and needs to be replaced with real grades
START TRANSACTION;
USE `classroom`;
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('GradeAlgorithms', 'p','Analysis of time and space complexity of algorithms', 'Lots and lots of big O notations', '2015-07-01', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('N gradeData Structures', 'n', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('N gradeData Structures', 'n', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('gradeData Structures', 'p', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('gradeData Structures', 'p', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('gradeData Structures', 'p', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('N gradeData Structures', 'n', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('gradeData Structures', 'p', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('N gradeData Structures', 'n', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `grades` (`title`, `student`,`description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('gradeData Structures', 'p', 'Creation of various gradedata structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);

COMMIT;



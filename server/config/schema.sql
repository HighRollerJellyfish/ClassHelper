SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema classroom
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `classroom` ;


CREATE SCHEMA IF NOT EXISTS `classroom` ;
USE `classroom` ;

-- -----------------------------------------------------
-- Table `classroom`.`users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  `username` VARCHAR(20) NOT NULL ,
  `email` VARCHAR(100) NOT NULL ,
  `password` VARCHAR(100) NOT NULL ,
  `role` VARCHAR(20) NOT NULL DEFAULT 'student' ,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`.`lessons`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(45) NOT NULL ,
  `description` VARCHAR(140) NOT NULL ,
  `content` TEXT NOT NULL ,
  `start_date` DATETIME NOT NULL ,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`.`grades`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`grades` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `lesson_title` VARCHAR(45) NOT NULL ,
  `student` VARCHAR(20) NOT NULL ,
  `score` INT NOT NULL ,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `classroom`.`attendance`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `classroom`.`attendance` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `date` VARCHAR(20) NOT NULL ,
  `student` VARCHAR(20) NOT NULL,
  `presence` TINYINT(1) NOT NULL ,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;

USE `classroom` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



-- -----------------------------------------------------
-- Data for table `lessons`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Algorithms', 'Analysis of time and space complexity of algorithms', 'Lots and lots of big O notations', '2015-07-01', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Algorithms2', 'More Analysis of time and space complexity of algorithms', 'More Lots and lots of big O notations', '2015-07-01', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures', 'Creation of various data structures.', 'Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
INSERT INTO `lessons` (`title`, `description`, `content`, `start_date`, `created_at`, `updated_at`) VALUES ('Data Structures2', 'Creation of more data structures.', 'More Binary trees, hash tables, stacks, and queues oh my', '2015-07-08', NULL, NULL);
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
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Algorithms', 'devon', '100', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Data Structures', 'devon', '88', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Algorithms2', 'devon', '77', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Data Structures2', 'devon', '66', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Algorithms', 'jake', '100', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Data Structures', 'jake', '98', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Algorithms2', 'jake', '87', NULL, NULL);
INSERT INTO `grades` (`lesson_title`, `student`, `score`, `created_at`, `updated_at`) VALUES ('Data Structures', 'jake', '76', NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `attendance`
-- -----------------------------------------------------
-- This is temporary and needs to be replaced with real attendance
START TRANSACTION;
USE `classroom`;
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-01', 'devon', '1', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-02', 'devon', '0', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-03', 'devon', '1', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-04', 'devon', '1', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-01', 'jake', '1', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-02', 'jake', '1', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-03', 'jake', '0', NULL, NULL);
INSERT INTO `attendance` (`date`, `student`, `presence`, `created_at`, `updated_at`) VALUES ('2015-07-04', 'jake', '1', NULL, NULL);

COMMIT;



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
START TRANSACTION;
USE `classroom`;
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms', 'devon', '100');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'devon', '88');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms2', 'devon', '77');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures2', 'devon', '66');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms', 'jake', '100');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'jake', '98');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Algorithms2', 'jake', '87');
INSERT INTO `grades` (`lesson_title`, `student`, `score`) VALUES ('Data Structures', 'jake', '76');

COMMIT;


-- -----------------------------------------------------
-- Data for table `attendance`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-01', 'devon', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-02', 'devon', '0');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-03', 'devon', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'devon', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-01', 'jake', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-02', 'jake', '1');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-03', 'jake', '0');
INSERT INTO `attendance` (`date`, `student`, `presence`) VALUES ('2015-07-04', 'jake', '1');

COMMIT;

-- -----------------------------------------------------
-- Data for table `users`
-- -----------------------------------------------------
START TRANSACTION;
USE `classroom`;
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Devon Harvey', 'devon', 'devon@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'student');
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Richard Stanley', 'richard', 'richard@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'student');
INSERT INTO `users` (`name`, `username`, `email`, `password`, `role`) VALUES ('Jake Lee', 'jake', 'jake@a.com', '$2a$05$cf.yjZq7w8.J0xqTph5GuODea5/6NywitFojEtJIT5gaXv3kFrvfC', 'teacher');

COMMIT;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema movie_libary
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema movie_libary
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `movie_libary` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `movie_libary` ;

-- -----------------------------------------------------
-- Table `movie_libary`.`actors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`actors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `age` INT NOT NULL,
  `country` VARCHAR(56) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 71
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_libary`.`movies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`movies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(255) NOT NULL,
  `releaseYear` YEAR NOT NULL,
  `genre` VARCHAR(25) NOT NULL,
  `poster` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 81
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_libary`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  `movie_id` INT NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `dateTime` DATETIME(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `movie_id` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movie_libary`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_libary`.`directors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`directors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 77
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_libary`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `likes_ibfk_1` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `likes_ibfk_1`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movie_libary`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_libary`.`movie_actors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`movie_actors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `actor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `actor_id` (`actor_id` ASC) VISIBLE,
  INDEX `movie_id` (`movie_id` ASC) VISIBLE,
  CONSTRAINT `movie_actors_ibfk_1`
    FOREIGN KEY (`actor_id`)
    REFERENCES `movie_libary`.`actors` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `movie_actors_ibfk_2`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movie_libary`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 53
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movie_libary`.`movie_directors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movie_libary`.`movie_directors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `director_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `moive_id_idx` (`movie_id` ASC) VISIBLE,
  INDEX `director_id_idx` (`director_id` ASC) VISIBLE,
  CONSTRAINT `director_id`
    FOREIGN KEY (`director_id`)
    REFERENCES `movie_libary`.`directors` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `moive_id`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movie_libary`.`movies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 60
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

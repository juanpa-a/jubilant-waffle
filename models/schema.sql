<<<<<<< HEAD
CREATE TABLE IF NOT EXISTS `WAFFLES` (
  `id` INTEGER NOT NULL auto_increment,
  `title` VARCHAR(255),
  `description` TEXT,
  `isLeaf` TINYINT(1),
  `isActive` TINYINT(1),
  `parentId` INTEGER,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Nodes` (
  `id` INTEGER NOT NULL auto_increment,
  `title` VARCHAR(255),
  `description` TEXT,
  `isLeaf` TINYINT(1),
  `isActive` TINYINT(1),
  `parentId` INTEGER,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
)
/* CREATE TABLE WAFFLES(
 id AUTO_INCREMENT NOT NULL INT primary,
 parentId INT,
 leaf BOOLEAN,
 title TEXT,
 body TEXT,
 question TEXT,
 hidden BOOLEAN
 ); */
-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;
-- DROP DATABASE IF EXISTS testdb;
-- CREATE DATABASE testdb;
=======
DROP DATABASE IF EXISTS jubilantWaffle;
CREATE DATABASE jubilantWaffle;
>>>>>>> 07384dfb0fa1354b6299a37b359808cd806ac6e0

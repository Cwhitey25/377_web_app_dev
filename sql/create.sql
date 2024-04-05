-- CREATE tables

CREATE TABLE `sis`.`awards` (
  `awa_id` INT NOT NULL AUTO_INCREMENT,
  `awa_stu_id` VARCHAR(14) NOT NULL,
  `awa_date` DATETIME NULL,
  `awa_name` VARCHAR(100) NULL,
  PRIMARY KEY (`awa_id`));

SELECT *
FROM students
WHERE stu_first_name = 'John' AND stu_last_name = 'Whelan'
;
-- ID = stdX2000003405

INSERT  INTO awards (awa_stu_id, awa_date, awa_name)
VALUES ('stdX2000003405','2023-09-20', 'Spelling Bee')
;

SELECT *
FROM awards
;
-- Can't execute because the ID is a primary key and must be unique
INSERT  INTO awards (awa_id, awa_stu_id)
VALUES (1, 'stdX2000003405')
;

DROP TABLE IF EXISTS fees; -- removes table safely

CREATE TABLE `sis`.`fees` (
  `fee_id` INT NOT NULL AUTO_INCREMENT,
  `fee_stu_id` VARCHAR(14) NOT NULL,
  `fee_owed` DECIMAL(6,2) NULL,  -- Allows fees up to 9999.99
  `fee_paid` DECIMAL(6,2) NULL,
  `fee_date` DATETIME NULL,
  `fee_name` VARCHAR(45) NULL,
  PRIMARY KEY (`fee_id`));

DELETE FROM table_name WHERE condition;
-- Select Columns
-- From Table
-- Join Table On Condition
-- Where Condition And/Or Condition
-- Group By Columns
-- Having Condition And/Or Condition
-- Order By columns Asc/Desc
-- Limit Number

-- Q1: Write a skeleton SELECT statement with all 8 clauses
--     we have learned in this class (8 points)
-- A1: 
Select Columns
From Table
Join Table On Condition
Where Condition And/Or Condition
Group By Columns
Having Condition And/Or Condition
Order By columns Asc/Desc
Limit Number


-- Q2: What is Rose Blackburn's grade level? (1 points)
-- A2: 09

SELECT * 
FROM students 
WHERE stu_first_name = 'Rose' AND stu_last_name = 'Blackburn'
;



-- Q3: What were Taylor Keil's four term and final grades
--     in ALGEBRA 1? (2 points)
-- A3: A, B-, A, B+, B
SELECT trn_term1_grade, trn_term2_grade , trn_term3_grade , trn_term4_grade , trn_final
FROM students
JOIN transcripts ON stu_id = trn_stu_id
WHERE stu_first_name = 'Taylor' AND stu_last_name = 'Keil' AND trn_course = 'ALGEBRA 1'
;


-- Q4: How many active students at Adams Elementary School
--     are in homeroom 21? (2 points)
-- A4: 310

SELECT COUNT(*) 
FROM students
JOIN schools ON stu_skl_id = skl_id
JOIN teachers ON skl_id = tch_skl_id
WHERE stu_status = 'Active' AND skl_name = 'Adams Elementary School' AND tch_homeroom = 21
;


-- Q5: How many active elementary school students were
--     absent in September 2023? (3 points)
-- A5: 1431
SELECT COUNT(*)
FROM students
JOIN attendance ON stu_id = att_stu_id
WHERE stu_status = 'Active' AND att_code = 'A' AND att_date LIKE '%2023-09%'
;

SELECT * FROM attendance;


-- Q6: How many section of History 6 does Sebastian
--     Matthews teach? (2 points)
-- A6: 4
SELECT COUNT(*)
FROM classes
JOIN teachers ON cls_tch_id = tch_id
WHERE tch_first_name = 'Sebastian' AND tch_last_name = 'Matthews' AND cls_course = 'History 6'
;


-- Q7: How many sections of History 6 are being taught
--     overall and what is the total enrollment across
--     all those sections? (3 points)
-- A7: 12, 252
SELECT COUNT(*)
FROM classes
WHERE cls_course = 'History 6'
;

SELECT cls_enrollment_total
FROM classes
WHERE cls_course = 'History 6'
;


-- Q8: What is the first student, alphabetically by last
--     name, on the roster for History 6, section 11?
--     (5 points)
-- A8:
SELECT stu_first_name, stu_last_name
FROM students
JOIN transcripts ON stu_id = trn_stu_id
JOIN classes ON trn_course = cls_course
WHERE cls_course = 'History 6' AND cls_section = 11
GROUP BY stu_last_name, stu_first_name
ORDER BY stu_last_name, stu_first_name
LIMIT 1
;

SELECT * FROM transcripts WHERE trn_course = 'History 6';

SELECT * FROM students
JOIN transcripts ON stu_id = trn_stu_id
JOIN classes ON trn_course = cls_course
WHERE cls_course = 'History 6' AND cls_section = 11;


-- Q9: There was a new hire in the guidance department.
--     Write an UPDATE statement that will change students
--     who have counselor 'McDonnell, Kristen' to
--     'Rodriguez, Oscar' (2 points)
-- A9:
UPDATE students
SET stu_counselor = 'Rodriguez, Oscar'
WHERE  stu_counselor = 'McDonnell, Kristen'
;

-- Q10: There was bad weather on the morning of Jan 26, 2022.
--      Write a DELETE statement that will remove all tardy
--      attendance records (code = 'T') on that date. (2 points)
-- A10:

DELETE FROM attendance WHERE att_time LIKE '%2022-01-26%' AND att_code = 'T'
;

select * from attendance;
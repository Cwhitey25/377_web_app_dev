SELECT * 
FROM students
WHERE stu_first_name = 'Kristian' AND stu_last_name = 'Saunders'
;

-- Update the address (UNSAFE VERSION)

UPDATE students
SET stu_address = '287 Cedar Street' , stu_city = 'Hanover', stu_zip_code = '02339'
WHERE  stu_first_name = 'Kristian' AND stu_last_name = 'Saunders'
;

-- Update the address (SAFE VERSION)

UPDATE students
SET stu_address = '287 Cedar Street' , stu_city = 'Hanover', stu_zip_code = '02339'
WHERE  stu_id = 'STD000000173cr'
;

-- example of updating all records (UNSAFE) 
SELECT * 
FROM schools
;

UPDATE schools
SET skl_level = 'All levels'
;

SELECT *
FROM students
WHERE stu_status = 'Active' AND stu_grade_level = '12'
;

UPDATE students
SET stu_yog = '2024'
WHERE stu_status = 'Active' AND stu_grade_level = '12'
;

UPDATE students
SET stu_yog = stu_yog + 5
WHERE stu_status = 'Active' AND stu_grade_level <> '12'
;

SELECT *
FROM students
WHERE stu_middle_name = 'Nmn'
;

UPDATE students
SET stu_middle_name = ''
WHERE stu_middle_name = 'Nmn'
;
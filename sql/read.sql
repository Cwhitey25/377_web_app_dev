SELECT COUNT(*)
FROM students
;

SELECT COUNT(*)
FROM attendance
;

SELECT stu_first_name, stu_last_name, stu_grade_level
FROM students
ORDER BY 2,1
;

SELECT DISTINCT stu_grade_level
FROM students
;

SELECT att_code, COUNT(*)
FROM attendance
GROUP BY 1
ORDER BY 2 DESC
;

SELECT stu_first_name, stu_last_name, stu_grade_level, stu_status
FROM students
WHERE stu_grade_level = 12 AND stu_status = 'Active'
;

SELECT stu_first_name, stu_last_name, skl_name
FROM students
JOIN schools ON stu_skl_id = skl_id
WHERE stu_grade_level = 12 AND stu_status = 'Active'
ORDER BY 3,2,1
;

SELECT COUNT(*) AS `enrollment` , skl_name AS `school`
FROM students
JOIN schools ON stu_skl_id = skl_id
WHERE stu_grade_level = 12 AND stu_status = 'Active'
GROUP BY 2
ORDER BY 2
;

SELECT attendance.*
FROM attendance
JOIN students on stu_id = att_stu_id
WHERE stu_first_name = "Suzanne" AND stu_last_name = "Grant"
ORDER BY 1
;

SELECT tch_first_name, tch_last_name, tch_department
FROM teachers
WHERE tch_department IN ('MA' ,'ELA')
AND tch_status = 'active'
;

SELECT tch_first_name, tch_last_name, cls_meeting_times
FROM teachers
JOIN classes ON tch_id = cls_tch_id
WHERE tch_department IN ('MA' ,'ELA')
AND tch_status = 'Active'
AND cls_course <> 'DST'
AND cls_meeting_times IS NOT NULL
ORDER BY 2,1,3
;

SELECT stu_first_name, stu_last_name, att_code
FROM students
LEFT JOIN attendance ON stu_id = att_stu_id AND att_code = 'A' 
WHERE stu_grade_level = '09' AND stu_status = 'Active' AND att_code IS NULL
ORDER BY 1,2
;
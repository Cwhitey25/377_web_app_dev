<!DOCTYPE html>
<html>

<head>
    <title>PHP Lesson 1</title>
</head>

<body>
    <h1>Welcome to Sample School District</h1>

    <h2>Student List</h2>

    <p>Filter by last name starting with <a href="student-list.php">All</a>
        <?php
        for ($i = 0; $i < 26; $i++) {
            $letter = chr($i + ord("A"));
            echo "<a href='student-list.php?last_name=$letter'> $letter</a>";
        }
        ?><br> Filter by first name contains
        <form action="student-list.php">
            <input type="text" name="first_name" />
            <input type="submit" value="filter" />
        </form>
        
        <br> Filter by YOG: 
        <form action="student-list.php">
            <input type="text" name="yog" />
            <input type="submit" value="filter" />
        </form>
        
        Filter by Homeroom: 
        <form action="student-list.php">
            <input type="text" name="homeroom" />
            <input type="submit" value="filter" />
        </form>
    </p>

    <table border="1">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>YOG</th>
            <th>Homeroom</th>
            <th>Guidance Counselor</th>
            <th>School Name</th>
        </tr>
        <?php

        $servername = "localhost";
        $username = "root";
        $password = "password";
        $dbname = "sis";

        $connection = new mysqli($servername, $username, $password, $dbname);
        if ($connection->connect_error) {
            die("Connection failed: " . $connection->connect_error);
        }

        // gives access to a $last_name and $first_name variable
        extract($_REQUEST);

        $sql = "SELECT stu_first_name, stu_last_name, stu_yog, stu_homeroom, stu_counselor, skl_name 
                FROM students 
                JOIN schools ON skl_id = stu_skl_id ";

        if (isset($first_name)) {
            $sql .= " WHERE stu_first_name LIKE '%$first_name%' ";
        }

        if (isset($last_name)) {
            $sql .= " AND stu_last_name LIKE '$last_name%' ";
        }

        if (isset($yog)) {
            $sql .= " AND stu_yog = $yog ";
        }

        if (isset($homeroom)) {
            $sql .= " AND stu_homeroom = '$homeroom' ";
        }

        $sql .= " ORDER BY stu_last_name, stu_first_name ";

        $result = $connection->query($sql);
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . $row['stu_first_name'] . "</td>";
            echo "<td>" . $row['stu_last_name'] . "</td>";
            echo "<td>" . $row['stu_yog'] . "</td>";
            echo "<td>" . $row['stu_homeroom'] . "</td>";
            echo "<td>" . $row['stu_counselor'] . "</td>";
            echo "<td>" . $row['skl_name'] . "</td>";
            echo "</tr>";
        }

        ?>
    </table>

</body>

</html>
<!DOCTYPE html>
<html>
    <head>
        <title>PHP Lesson 1</title>
    </head>

    <body>

        <?php
        //keywords are NOT case-sensitive (variables and functions are)
        echo "<h1>Welcome to PHP!</h1>";
        eCHo "<br>";
        ECHO "It's a great language to know";
        ECho "<br><br>";

        echo "<h2>This is my first PHP website</h2>";

        //variables made by dollar sign
        $name = "Colin";

        // String concatenation uses "."
        echo "Hello " . $name . "! (with concatenation)";
        echo "<br>";

        //string interpolation - it only works with double-quoted strings
        echo "Hello $name! (with interpolation)";
        echo "<br>";
        echo 'Hello $name!';  //would literally print $name not the actual name
        echo "<br><br>";

        // Some math
        $x = 5;
        $y = 3;

        echo "$x * $y = " . ($x * $y);

        //functions are similar to javascript but variables contain '$'
        function square($number)
        {
            return $number * $number;
        }

        echo "<br><br>";
        echo "4 squared is " . square(4);
        
        ?>
    </body>
<html>
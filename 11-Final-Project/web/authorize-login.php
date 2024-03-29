<?php

include('library.php');
$connection = get_database_connection();

session_start(); 


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['username']) || empty($_POST['password'])) {
        header("Location: login.php?error=Both fields are required.");
        exit();
    }

    $check_user_query = "SELECT * FROM users WHERE username='$username'";
    $result = $connection->query($check_user_query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password_hash'])) {
            $_SESSION['username'] = $username;
            header("Location: play.php");
            exit();
        } else {
            header("Location: login.php?error=Incorrect password.");
            exit();
        }
    } else {
        header("Location: login.php?error=User does not exist.");
        exit();
    }

    $connection->close();
} else {
    header("Location: play.php");
    exit();
}
?>
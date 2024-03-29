<?php

include('library.php');
$connection = get_database_connection();


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST['username']) || empty($_POST['password'])) {
        header("Location: signup.html?error=Both fields are required.");
        exit();
    }


    $check_username_query = "SELECT * FROM users WHERE username='$username'";
    $result = $connection->query($check_username_query);
    if ($result->num_rows > 0) {
        header("Location: signup.php?error=Username already exists.");
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $insert_user_query = "INSERT INTO users (username, password_hash) VALUES ('$username', '$hashed_password')";
    if ($connection->query($insert_user_query) === TRUE) {
        header("Location: login.php");
        exit();
    } else {
        echo "Error: " . $insert_user_query . "<br>" . $connection->error;
    }

    $connection->close();
} else {
    header("Location: signup.php");
    exit();
}
?>
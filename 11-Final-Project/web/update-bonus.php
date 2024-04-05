<?php

include('library.php');
$connection = get_database_connection();

session_start();
$username = $_SESSION['username'];

$sql = "SELECT coins FROM users WHERE username = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    $coins = $user['coins'] + 1000; 

    $sql = "UPDATE users SET coins = ?, last_bonus_at = NOW() WHERE username = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('is', $coins, $username);
    $stmt->execute();

    echo "Bonus updated successfully."; 
} else {
    echo "User not found."; 
}

$stmt->close();
$connection->close();
?>
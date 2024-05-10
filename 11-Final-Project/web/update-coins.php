<?php
session_start();

include('library.php');
$connection = get_database_connection();

$username = $_SESSION['username'];

$sql = "SELECT coins FROM users WHERE username = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$key = $_POST['key'];

if ($user) {
    $coins = $user['coins'] + $key; 

    $sql = "UPDATE users SET coins = ? WHERE username = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('is', $coins, $username);
    $stmt->execute();

    echo "Coins updated successfully."; 
} else {
    echo "User not found."; 
}

$stmt->close();
$connection->close();
?>
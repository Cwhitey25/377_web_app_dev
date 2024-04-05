<?php

extract($_REQUEST);

if (!isset($content) || $content == '' || strpos($content, '://') || !file_exists($content . '.php'))
{
    $content = 'login.php';
}

function get_database_connection()
{
    $config = parse_ini_file(__DIR__ . '/../connection/config.ini', true);

    $dbConfig = $config['database'];

    $host = $dbConfig['host'];
    $user = $dbConfig['user'];
    $password = $dbConfig['password'];
    $database = $dbConfig['database'];

    $connection = new mysqli($host, $user, $password, $database);
    if ($connection->connect_error)
    {
        die('Connection failed: ' . $connection->connect_error);
    }

    return $connection;
}
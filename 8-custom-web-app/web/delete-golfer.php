<?php

include('library.php');

$connection = get_database_connection();

$sql =<<<SQL
DELETE
  FROM golfers
 WHERE golf_id = $id
SQL;

$connection->query($sql);

header('Location: index.php');
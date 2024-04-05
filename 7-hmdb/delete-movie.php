<?php

include('library.php');

$connection = get_database_connection();

$sql =<<<SQL
DELETE
  FROM movies
 WHERE mov_id = $id
SQL;

$connection->query($sql);

header('Location: index.php');
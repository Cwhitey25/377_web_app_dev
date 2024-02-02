<?php

include('library.php');

$connection = get_database_connection();

$sql = '';

$name = $connection->real_escape_string($name);
$sponsor = $connection->real_escape_string($sponsor);
$nationality = $connection->real_escape_string($nationality);

if (isset($id) && $id != '')
{
    $sql =<<<SQL
    UPDATE golfers
       SET golf_name = '$name',
           golf_age = $age,
           golf_gender = '$gender',
           golf_wins = $wins,
           golf_earnings = $earnings,
           golf_sponsor = '$sponsor',
           golf_link = $link,
           golf_nationality = '$nationality',
           golf_joined = $joined,
           golf_events = $events
     WHERE golf_id = $id
    SQL;
}
else
{
    $sql =<<<SQL
    INSERT INTO golfers (golf_name, golf_age, golf_gender, golf_wins, golf_earnings, golf_sponsor, golf_link, golf_nationality, golf_joined, golf_events)
    VALUES ('$name', $age, '$gender', $wins, $earnings, '$sponsor', '$link', '$nationality', $joined, $events)
    SQL;
}
echo $sql;
$connection->query($sql);

header('Location: index.php');
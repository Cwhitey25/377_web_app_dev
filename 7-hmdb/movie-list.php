<table class="table table-striped table-hover">
    <thead>
        <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>iMDB Link</th>
        </tr>
    </thead>

    <tbody>
<?php

$connection = get_database_connection();

$sql =<<<SQL
SELECT mov_id, mov_title, mov_year, mov_genre, mov_imdb_id
  FROM movies
 ORDER BY mov_title, mov_year
SQL;

$result = $connection->query($sql);
while ($row = $result->fetch_assoc())
{
    echo '<tr>';
    echo '<td>';
    echo '<a href="index.php?content=movie-detail&id=' . $row['mov_id'] . '">' . $row['mov_title'] . '</a>';
    echo '</td>';
    echo '<td>' . $row['mov_year'] . '</td>';
    echo '<td>' . $row['mov_genre'] . '</td>';
    echo '<td>';
    if ($row['mov_imdb_id'] != '')
    {
        echo '<a href="https://www.imdb.com/title/' . $row['mov_imdb_id'] . '" target="_blank" title="View on iMDB"><i class="bi bi-film"></i></a>';
    }
    echo '<td>' . $row['mov_duration'] . '</td>';
    echo '<td>' . $row['mov_director'] . '</td>';
    echo '<td>' . $row['mov_budget'] . '</td>';
    echo '<td>' . $row['mov_earnings'] . '</td>';
    echo '</td>';
    echo '</tr>';
}

?>
    </tbody>
</table>

<a href="index.php?content=movie-detail" class="btn btn-primary" role="button" aria-disabled="true">Add a Movie</a>
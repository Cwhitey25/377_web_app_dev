<?php

$title = '';
$year = '';
$genre = '';
$imdb_id = '';
$duration = '';
$director = '';
$budget = '';
$earnings = '';

if (isset($id))
{
    $connection = get_database_connection();

    $sql =<<<SQL
    SELECT mov_id, mov_title, mov_year, mov_genre, mov_imdb_id, mov_duration, mov_director, mov_budget, mov_earnings
      FROM movies
      WHERE mov_id = $id
    SQL;

    $result = $connection->query($sql);
    $row = $result->fetch_assoc();

    $title = $row['mov_title'];
    $year = $row['mov_year'];
    $genre = $row['mov_genre'];
    $imdb_id = $row['mov_imdb_id'];
    $duration = $row['mov_duration'];
    $director = $row['mov_director'];
    $budget = $row['mov_budget'];
    $earnings = $row['mov_earnings'];
}

?>
<form action="save-movie.php">
    <input type="hidden" class="form-control" id="id" name="id" value="<?php echo isset($id) ? $id : '' ?>" />

    <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" name="title" value="<?php echo $title ?>" />
    </div>

    <div class="mb-3">
        <label for="Year" class="form-label">Year</label>
        <input type="number" class="form-control" id="year" name="year" value="<?php echo $year ?>" />
    </div>

    <div class="mb-3">
        <label for="genre" class="form-label">Genre</label>
        <select class="form-select" name="genre">
            <option <?php echo $genre == 'Action' ? 'selected' : '' ?>>Action</option>
            <option <?php echo $genre == 'Comedy' ? 'selected' : '' ?>>Comedy</option>
            <option <?php echo $genre == 'Drama' ? 'selected' : '' ?>>Drama</option>
            <option <?php echo $genre == 'Family' ? 'selected' : '' ?>>Family</option>
            <option <?php echo $genre == 'Horror' ? 'selected' : '' ?>>Horror</option>
        </select>
    </div>


    <div class="mb-3">
        <label for="imdb_id" class="form-label">iMDB ID</label>
        <input type="text" class="form-control" id="imdb_id" name="imdb_id" value="<?php echo $imdb_id ?>" />
    </div>

    <div class="mb-3">
        <label for="Duration" class="form-label">Duration</label>
        <input type="number" class="form-control" id="duration" name="duration" value="<?php echo $duration ?>" />
    </div>

    <div class="mb-3">
        <label for="Director" class="form-label">Director</label>
        <input type="text" class="form-control" id="director" name="director" value="<?php echo $director ?>" />
    </div>

    <div class="mb-3">
        <label for="Budget" class="form-label">Budget</label>
        <input type="number" class="form-control" id="budget" name="budget" value="<?php echo $budget ?>" />
    </div>

    <div class="mb-3">
        <label for="Earnings" class="form-label">Earnings</label>
        <input type="number" class="form-control" id="earnings" name="earnings" value="<?php echo $earnings ?>" />
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
    <a href="index.php?content=movie-list" class="btn btn-secondary" role="button" aria-disabled="true">Cancel</a>
<?php if (isset($id)) { ?>
    <button type="button" class="btn btn-danger" onclick="deleteMovie()">Delete</button>
    <script>

    function deleteMovie() {
        if (confirm('Are you sure you want to delete this movie?')) {
            location.href = 'delete-movie.php?id=<?php echo isset($id) ? $id : '' ?>';
        }
    }

    </script>
<?php } ?>
</form>
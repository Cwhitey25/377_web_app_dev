<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="scripts.js"></script>

<?php

$name = '';
$age = '';
$gender = '';
$wins = '';
$earnings = '';
$sponsor = '';
$link = '';
$nationality = '';
$joined = '';
$events = '';

if (isset($id))
{
    $connection = get_database_connection();

    $sql =<<<SQL
    SELECT golf_id, golf_name, golf_age, golf_gender, golf_wins, golf_earnings, 
    golf_sponsor, golf_link, golf_nationality, golf_joined, golf_events
      FROM golfers
      WHERE golf_id = $id
    SQL;

    $result = $connection->query($sql);
    $row = $result->fetch_assoc();

    $name = $row['golf_name'];
    $age = $row['golf_age'];
    $gender = $row['golf_gender'];
    $wins = $row['golf_wins'];
    $earnings = $row['golf_earnings'];
    $sponsor = $row['golf_sponsor'];
    $link = $row['golf_link'];
    $nationality = $row['golf_nationality'];
    $joined = $row['golf_joined'];
    $events = $row['golf_events'];
}

?>
<form id="golferForm" action="save-golfer.php">
    <input type="hidden" class="form-control" id="id" name="id" value="<?php echo isset($id) ? $id : '' ?>" />

    <div class="mb-3">
        <label for="title" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" name="name" value="<?php echo $name ?>" />
        <span id="name-error" class="error-message"></span>
    </div>

    <div class="mb-3">
        <label for="Year" class="form-label">Age</label>
        <input type="number" class="form-control" id="age" name="age" value="<?php echo $age ?>" />
        <span id="age-error" class="error-message"></span>
    </div>

    <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select class="form-select" name="gender">
            <option <?php echo $gender == 'Male' ? 'selected' : '' ?>>Male</option>
            <option <?php echo $gender == 'Female' ? 'selected' : '' ?>>Female</option>
        </select>
        <span id="gender-error" class="error-message"></span>
    </div>


    <div class="mb-3">
        <label for="wins" class="form-label">Wins</label>
        <input type="number" class="form-control" id="wins" name="wins" value="<?php echo $wins ?>" />
    </div>

    <div class="mb-3">
        <label for="Earnings" class="form-label">Earnings</label>
        <input type="number" class="form-control" id="earnings" name="earnings" value="<?php echo $earnings ?>" />
    </div>

    <div class="mb-3">
        <label for="Sponsor" class="form-label">Sponsor</label>
        <input type="text" class="form-control" id="sponsor" name="sponsor" value="<?php echo $sponsor ?>" />
        <span id="sponsor-type-error" class="error-message"></span>
    </div>

    <div class="mb-3">
        <label for="Nationality" class="form-label">Nationality</label>
        <input type="text" class="form-control" id="nationality" name="nationality" value="<?php echo $nationality ?>" />
        <span id="nationality-type-error" class="error-message"></span>
    </div>

    <div class="mb-3">
        <label for="Joined" class="form-label">Joined Tour</label>
        <input type="number" class="form-control" id="joined" name="joined" value="<?php echo $joined ?>" />
    </div>

    <div class="mb-3">
        <label for="Events" class="form-label">Events Played</label>
        <input type="number" class="form-control" id="events" name="events" value="<?php echo $events ?>" />
    </div>
    
    <div class="mb-3">
        <label for="Link" class="form-label">Profile</label>
        <input type="number" class="form-control" id="link" name="link" value="<?php echo $link ?>" />
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
    <a href="index.php?content=movie-list" class="btn btn-secondary" role="button" aria-disabled="true">Cancel</a>
<?php if (isset($id)) { ?>
    <button type="button" class="btn btn-danger" onclick="deleteGolfer()">Delete</button>
    <script>

    function deleteGolfer() {
        if (confirm('Are you sure you want to delete this golfer?')) {
            location.href = 'delete-golfer.php?id=<?php echo isset($id) ? $id : '' ?>';
        }
    }

    </script>
<?php } ?>
</form>
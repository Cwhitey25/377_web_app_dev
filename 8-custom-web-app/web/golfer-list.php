<?php

//sets default filter
$orderByColumn = 'golf_name'; 
$orderByDirection = 'ASC'; 

//retrieves all variables to be used for filters
if (isset($_GET['sort']) && isset($_GET['order'])) {
    $orderByColumn = $_GET['sort'];
    $orderByDirection = $_GET['order'];
}

$content = isset($_GET['content']) ? $_GET['content'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';
$filterBy = isset($_GET['filterBy']) ? $_GET['filterBy'] : '';

// Build the filter condition based on search and filterBy values
$filterCondition = '';
if (!empty($search) && !empty($filterBy)) {
    $filterCondition = "WHERE $filterBy LIKE '%$search%'";
}

$connection = get_database_connection();

$sql =<<<SQL
SELECT golf_id, golf_name, golf_age, golf_gender, golf_wins, golf_earnings, golf_sponsor, 
       golf_link, golf_nationality, golf_joined, golf_events
FROM golfers $filterCondition
ORDER BY $orderByColumn $orderByDirection
SQL;

$result = $connection->query($sql);
?>

<table class="table table-striped table-hover" id='#golferForm'>
    <thead>
        <tr>
        <th>Name</th>
        <th>
            Age
            <!-- builds clickable icon filter for all -->
            <a href="?sort=golf_age&order=<?php echo ($orderByColumn == 'golf_age' && $orderByDirection == 'asc') ? 'desc' : 'asc'; ?>">
                <span id="sort-icon1" data-sort-order="<?php echo $orderByDirection; ?>">
                    <i class="bi bi-filter" style="font-size: 2em;"></i>
                </span>
            </a>
        </th>
        <th>
            Gender
            <a href="?sort=golf_gender&order=<?php echo ($orderByColumn == 'golf_gender' && $orderByDirection == 'asc') ? 'desc' : 'asc'; ?>">
                <span id="sort-icon2" data-sort-order="<?php echo $orderByDirection; ?>">
                    <i class="bi bi-filter" style="font-size: 2em;"></i>
                </span>
            </a>
        </th>
        <th>
            Wins
            <a href="?sort=golf_wins&order=<?php echo ($orderByColumn == 'golf_wins' && $orderByDirection == 'asc') ? 'desc' : 'asc'; ?>">
                <span id="sort-icon3" data-sort-order="<?php echo $orderByDirection; ?>">
                    <i class="bi bi-filter" style="font-size: 2em;"></i>
                </span>
            </a>
        </th>
        <th>
            Earnings
            <a href="?sort=golf_earnings&order=<?php echo ($orderByColumn == 'golf_earnings' && $orderByDirection == 'asc') ? 'desc' : 'asc'; ?>">
                <span id="sort-icon4" data-sort-order="<?php echo $orderByDirection; ?>">
                    <i class="bi bi-filter" style="font-size: 2em;"></i>
                </span>
            </a>
        </th>
        <th>Sponsor</th>
        <th>Nationality</th>
        <th>
            Joined Tour
            <a href="?sort=golf_joined&order=<?php echo ($orderByColumn == 'golf_joined' && $orderByDirection == 'asc') ? 'desc' : 'asc'; ?>">
                <span id="sort-icon5" data-sort-order="<?php echo $orderByDirection; ?>">
                    <i class="bi bi-filter" style="font-size: 2em;"></i>
                </span>
            </a>
        </th>
        <th>
            Events Played
            <a href="?sort=golf_events&order=<?php echo ($orderByColumn == 'golf_events' && $orderByDirection == 'asc') ? 'desc' : 'asc'; ?>">
                <span id="sort-icon6" data-sort-order="<?php echo $orderByDirection; ?>">
                    <i class="bi bi-filter" style="font-size: 2em;"></i>
                </span>
            </a>
        </th>
        <th>Profile</th>
        </tr>
    </thead>
    <tbody>

<?php
while ($row = $result->fetch_assoc())
{
    echo '<tr>';
    echo '<td>';
    echo '<a href="index.php?content=golfer-detail&id=' . $row['golf_id'] . '">' . $row['golf_name'] . '</a>';
    echo '</td>';
    echo '<td>' . $row['golf_age'] . '</td>';
    echo '<td>' . $row['golf_gender'] . '</td>';
    echo '<td>' . $row['golf_wins'] . '</td>';

    // Apply formatting to golf_earnings using JavaScript
    echo '<td class="formatted-value" data-earnings="' . $row['golf_earnings'] . '"></td>'; 

    echo '<td>' . $row['golf_sponsor'] . '</td>';
    echo '<td>' . $row['golf_nationality'] . '</td>';
    echo '<td>' . $row['golf_joined'] . '</td>';
    echo '<td>' . $row['golf_events'] . '</td>';
    echo '<td>';

    if ($row['golf_link'] != '')
    {
        // directs links to either lpga or pga site
        if ($row['golf_gender'] == 'Male') {
            echo '<a href="https://pgatour.com/player/' . $row['golf_link'] . '" target="_blank" title="View Profile"><i class="bi bi-box-arrow-up-right"></i></a>';
        } elseif ($row['golf_gender'] == 'Female') {
            echo '<a href="https://www.lpga.com/players/' . strtolower(str_replace(' ', '-', $row['golf_name'])) . '/' . $row['golf_link'] . '/overview" target="_blank" title="View Profile"><i class="bi bi-box-arrow-up-right"></i></a>';
        }
    }

    echo '</td>';
    echo '</tr>';
?>

<?php
}
?>

    </tbody>
</table>

<a href="index.php?content=golfer-detail" class="btn btn-primary" role="button" aria-disabled="true">Add a Golfer</a>

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="scripts.js"></script>
<script>
    // Accessing data and formatting earnings
    var formattedEarningsElements = document.querySelectorAll('.formatted-value');
    formattedEarningsElements.forEach(function (element) {
        var golfEarnings = element.getAttribute('data-earnings');
        var formattedValue = formatAsCurrency(golfEarnings);
        element.innerText = formattedValue;
    });
</script>
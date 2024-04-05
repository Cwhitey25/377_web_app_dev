

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="scripts.js"></script>
</head>
<body class="game-body">

<?php

$config = parse_ini_file(__DIR__ . '/../connection/config.ini', true);

$dbConfig = $config['database'];

$host = $dbConfig['host'];
$user = $dbConfig['user'];
$password = $dbConfig['password'];
$database = $dbConfig['database'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
    exit();
}

session_start();

$username = $_SESSION['username'];
$sql = "SELECT created_at, last_bonus_at, coins FROM users WHERE username = :username";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':username', $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$lastBonusTime = strtotime($user['last_bonus_at']);
$currentTimestamp = time();
$twentyFourHoursInSeconds = 24 * 60 * 60;
$timeSinceLastBonus = $currentTimestamp - $lastBonusTime;

if ($timeSinceLastBonus >= $twentyFourHoursInSeconds) {
    echo '<script>';
    echo 'showNotification()';
    echo '</script>';
}
?>

    <div class="background"></div>
    <div class="backcard"></div>
    <div class="chip-container">
        <div class="chip"></div>
    </div>
    <div class="svg-container">
        <svg width="800" height="200">
            <defs>
                <path id="curve1" d="M 10,20 Q 150,70 290,20" />
                <path id="curve2" d="M 10,20 Q 150,70 290,20" />
            </defs>
            <text class="curved-text" id="curve1-text">
                <textPath xlink:href="#curve1">Blackjack pays 3 to 2</textPath>
            </text>
            <text class="curved-text" id="curve2-text">
                <textPath xlink:href="#curve2">Dealer must stand on soft 17</textPath>
            </text>
        </svg>
    </div>

    <div class="wood-box">
        <div class="coin-count">
            <?php
                include('library.php');
                $connection = get_database_connection();

            if(isset($_SESSION['username'])) {
                $username = $_SESSION['username'];
            } else {
                header("Location: login.php");
                exit();
            }


                $sql = "SELECT coins FROM users WHERE username = '$username'";
                $result = $connection->query($sql);

                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo '<div class="user-info">';
                        echo '<img src="images/coin.png" class="coin-icon">'; 
                        echo '<span>' . number_format($row["coins"]) . '</span>';
                        echo '</div>'; 
                    }
                } else {
                    echo '<div class="user-info">';
                    echo '<img src="images/coin.png" class="coin-icon">'; 
                    echo '<span>' . "0" . '</span>';
                    echo '</div>';
                }
                $connection->close();
            ?>
        </div>
    </div>

    <div id="place-bet">Place Your Bet</div>

    <script>
        $(document).ready(function() {

            $('#coin-notification-btn').click(function() {
                $.ajax({
                    type: 'POST',
                    url: 'update-bonus.php', 
                    success: function(response) {
                        console.log(response);
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText);
                    }
                });
            });

            setTimeout(function() {
                $('#place-bet').css("visibility", "visible"); 
            }, 3000);

            $.ajax({
                url: "SVG/",
                success: function(data) {
                    $(data).find("a:contains('chip.svg')").each(function() {
                        var filename1 = $(this).attr("href");

                        $.get("SVG/" + filename1, function(svgData) {
                            var $svg = $(svgData.documentElement);
                            $svg.addClass("chip"); 
                            $(".chip-container").append($svg);
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            console.error("Failed to load SVG file:", errorThrown);
                        });
                    });

                    $(data).find("a:contains('back.svg')").each(function() {
                        var filename2 = $(this).attr("href");

                        $.get("SVG/" + filename2, function(svgData) {
                            var $card = $(svgData.documentElement);
                            $card.addClass("backcard"); 
                            $(".game-body").append($card);
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            console.error("Failed to load SVG file:", errorThrown);
                        });
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("Failed to fetch SVG directory:", errorThrown);
                },
                complete: function() {
                    playAnimation();
                }
            });
        });
    </script>

    <div class="notification-container">
        <div class="notification-content">
            Congratulations! You have received a bonus of 1000 coins.
            <button id="coin-notification-btn" onclick="hideNotification()">OK</button>
        </div>
    </div>
</body>
</html>
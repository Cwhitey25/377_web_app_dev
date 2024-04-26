
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="scripts.js"></script>
</head>

<body class="game-body">

<div class="notification-container">
    <div class="notification-content">
        Congratulations! You have received a bonus of 1000 coins.
        <button id="coin-notification-btn" onclick="hideNotification()">OK</button>
    </div>
</div>

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
$accountCreated = strtotime($user['created_at']);
$timeSinceCreated = $currentTimestamp - $accountCreated;

if ($timeSinceLastBonus >= $twentyFourHoursInSeconds && $timeSinceCreated >= $twentyFourHoursInSeconds) {
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
                        echo '<span id="coins">' . number_format($row["coins"]) . '</span>';
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

    <div><span id="totalBet"></span></div>

    <div class="mainbuttons-container">
        <button class="cancel-button" onclick="clearBet()">
            Cancel <i class="bi bi-x-circle"></i>
        </button>
        <button class="deal-button" onclick="startDeal()">
            Deal <i class="bi bi-play-fill" ></i>
        </button>
    </div>

    <div class="gamebuttons-container">
        <button class="hit-button" onclick="Hit()">
            Hit <i class="bi bi-play-fill" ></i>
        </button>
        <button class="stand-button" onclick="stand()">
            Stand <i class="bi bi-sign-stop"></i>
        </button>
        <button class="double-button" onclick="double()">
            Double <i class="bi bi-chevron-double-down"></i>
        </button>
        <button class="split-button" onclick="split()">
            Split <i class="bi bi-layout-split"></i>
        </button>
    </div>

    <div class="card-container">
        <div class="card" id="card"></div>
    </div>

    <div class="bubble dealer">
        <div class="triangle"></div>
        <div class="card-count1">0</div>
    </div>
    <div class="bubble player">
        <div class="triangle"></div>
        <div class="card-count2">0</div>
    </div>

    <script>
        $(document).ready(function() {

            var chipsClickable = false;

            $(".hit-button").click(function() {
                $(this).prop("disabled", true);

                setTimeout(function() {
                    $(".hit-button").prop("disabled", false); 
                }, 900); 
            });

            $.ajax({
                url: "SVG/",
                success: function (data) {
                    let fileNames = $(data).find('a').map(function () {
                    return $(this).text();
                    }).get();

                    fileNames.forEach(function (fileName) {
                    if (!fileName.includes('chip') && !fileName.includes('back') && !fileName.includes('Name') && !fileName.includes('modified') && !fileName.includes('Size') && !fileName.includes('Description') && !fileName.includes('Directory')) {
                        deck.push(fileName);
                    }
                    });

                    console.log(deck);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Failed to fetch SVG directory:", errorThrown);
                }
                });

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

            setTimeout(function() {
                $('#place-bet').css("visibility", "visible"); 
            }, 1400);

            setTimeout(function() {
                $(".chip").on('click', function() {
                    if (!$(this).hasClass("final-chip")) {
                        console.log(this);
                        var chipValue = parseInt($(this).attr("value"));
                        totalBet += chipValue;

                        var coins = $("#coins").text();
                        var cleanNumber = coins.replace(/,/g, '');
                        var number = parseInt(cleanNumber);

                        if(totalBet > number){
                            checkBet();
                            totalBet -= chipValue;
                        } else {

                            $('#place-bet').css("visibility", "hidden");
                            $("#totalBet").text(formatter.format(totalBet));
                            $('.mainbuttons-container').css("visibility", "visible");

                            var original = $(this);
                            var clone = $(this).clone()
                            var container = original.parent();

                            var containerWidth = container.width();
                            var containerHeight = container.height();

                            var offset = original.position();
                            var originalTop = (offset.top / containerHeight) * 80 + '%';
                            var originalLeft = (offset.left / containerWidth) * 98 + '%';

                            clone.css({
                                position: 'absolute',
                                top: originalTop,
                                left: originalLeft
                            });

                            clone.css("box-shadow", "0 0 10px 5px rgba(255, 255, 0, 0.7)");
                            $(".chip-container").append(clone);
                            clone.addClass('placed');

                            chipsToBet++;
                        
                            animateToDestination(clone);
                        }
                    }
                    
                });

                $(".chip-container").on("click", ".final-chip", function() {
                    var chipValue = parseInt($(this).attr("value"));
                    totalBet -= chipValue;

                    $('#place-bet').css("visibility", "hidden");
                    $("#totalBet").text(formatter.format(totalBet));

                    var original = $(this);
                    var clone = $(this).clone();
                    var container = original.parent();

                    var containerWidth = container.width();
                    var containerHeight = container.height();

                    var offset = original.position();
                    var originalTop = (offset.top / containerHeight) * 80 + '%';
                    var originalLeft = (offset.left / containerWidth) * 98 + '%';

                    clone.css({
                        position: 'absolute',
                        top: originalTop,
                        left: originalLeft
                    });

                    clone.css("box-shadow", "0 0 10px 5px rgba(255, 255, 0, 0.7)");
                    original.remove();
                    
                    $(".chip-container").append(clone);

                    chipsToBet--;
                
                    returnChip(clone);
                
                });
            }, 1400);

        });
    </script>
</body>
</html>
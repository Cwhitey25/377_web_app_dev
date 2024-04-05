<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="background"></div>
    <div class="overlay">
        <div class="instructions">
            <h2>Welcome to Blackjack!</h2><br>
            <p> <b>Instructions</b><br><br>
                <span class="close-btn" onclick="window.location.href='play.php'">&times;</span>
                <b>Objective:</b><br> 
                The goal of the game is to beat the dealer without going over 21.<br>

                <b>Card Values:</b><br>
                Number cards are worth their face value.<br>
                Face cards (Jacks, Queens, Kings) are worth 10.<br>
                Aces can be worth 1 or 11, whichever is more advantageous.<br>
                    
                <b>The Game:</b><br>
                You are dealt two cards. The dealer receives one card face up.<br>
                You have the option to "Hit" (draw another card) or "Stand" (end your turn).<br>
                If your total card value exceeds 21, you bust and lose the round.<br>
                    
                <b>Dealer's Turn:</b><br>
                The dealer reveals their face-down card after you stand.<br>
                The dealer must hit until their cards total 17 or higher.<br>
                    
                <b>Winning:</b><br>
                If your card total is higher than the dealer without busting, you win.<br>
                If you get 21 from the first two cards, you get a "Blackjack" and are paid 3 to 2.<br>
                    
                <b>Ties:</b><br>
                A tie is called a "push," and your bet is returned.<br>
                    
                <b>Betting:</b><br>
                Click on the chips to place your bet before starting the game.<br>
                    
                <b>Have Fun!:</b><br>
                Blackjack is both a game of skill and luck. Enjoy playing and best of luck at the tables!<br>
                Once you're ready, press "OK" to begin your Blackjack adventure!<br>
            </p>
            <a href="game.php"><button id="play-button">OK</button></a>
        </div>
    </div>
</body>
</html>
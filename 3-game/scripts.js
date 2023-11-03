var currentValue = 0;
var dealerValue = 0;
var dealNumber = 0;
var currentBet = 0;
var bet = 0;
var winnings = 0;
var isFirstDeal = true;
var showing = true;
var backCardImage;

var dealerX = 500; 
var dealerY = 50; 
var playerX = 500; 
var playerY = 250;
var cardOffsetY = 200; 
var cardOffsetX = 120;

var stand = false;
var betPlaced = false;

$(document).ready(function() {
    $('#startGame').on('click', function() {
        $('.overlay').hide(); // Hide the instructions screen
        // Display the game content
        $('#svg').css("visibility", "visible");
        $('#betText').css("visibility", "visible");
        $('#betAmount').css("visibility", "visible");
        $('#winText').css("visibility", "visible");
        $('#winAmount').css("visibility", "visible");
    });
    $('.chip').click(function() {
        var chipValue = parseInt($(this).data('value'));
        bet += chipValue;
        $('#betAmount').text(bet);
    });
    $('#backCard').on('click', function() {
        betPlaced = true;
        if (betPlaced){
            $('.chip').each(function() {
                $(this).css('pointer-events', 'none'); // Disable clickability
            });
        }
        if (isFirstDeal) {
            deal(); // Perform initial deal
            isFirstDeal = false; // Update game state after the first deal
            $(this).css('pointer-events', 'none'); // Disable clickability of the back card
            $('.game-button').css("visibility", "visible");
        }
    });
    $('#playAgainBtn').on('click', function() {
        resetGame();
    });
});


//gets the value of the selected card
function calculateCardValue(cardSrc) {
    var cardRank = cardSrc.split('_').pop().split('.')[0];
    if (currentValue < 11){
        var aceVal = 11;
    } else {
        var aceVal = 1;
    }
    var values = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'jack': 10,
        'queen': 10,
        'king': 10,
        'ace': aceVal,
    };
    return values[cardRank.toLowerCase()];
}

function playerStand(){
    stand = true;
    drawCardForPlayer();
}

//returns a random card in the deck
function newCard(){
    var suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

    var cardImages = [];

    for (var suit of suits) {
        for (var rank of ranks) {
            var fileName = 'svg/' + suit.toLowerCase() + '_' + rank.toLowerCase() + '.png';
            cardImages.push(fileName);
        }
    }

    var randomIndex = Math.floor(Math.random() * cardImages.length);
    var randomCard = cardImages[randomIndex];
    
    return randomCard;
}


function deal() {
    dealNumber++;
    show = false;
    $(".game-button").css("visibility", "visible");
    if (dealNumber === 1) {
        for (let i = 0; i < 2; i++) {
            drawCardForPlayer();
        }
        drawCardForDealer();
    } else {
        drawCardForDealer();
        drawCardForPlayer();
    }
}

function drawCardForPlayer() {
    if (currentValue >= 21 || stand == true) {
        $('.game-button').css('visibility', 'hidden');
        flipBackCard(backCardImage);
        while(dealerValue <= 16){
            drawCardForDealer();
        }
        checkWinner(currentValue, dealerValue);
    } else {
        var drawnCard = newCard();
        var cardValue = calculateCardValue(drawnCard);
        currentValue += cardValue;
        
        var s = Snap('#svg');
        var newCardImage = s.image(drawnCard, playerX, playerY, 100, 150).attr({ opacity: 1 });
        playerX += cardOffsetX;
    }
}

function drawCardForDealer() {
        var drawnCard = newCard();
        var cardValue = calculateCardValue(drawnCard);
        dealerValue += cardValue;


        var s = Snap('#svg');
        var newCardImage = s.image(drawnCard, dealerX, dealerY, 100, 150).attr({ opacity: 1 });
        dealerX += cardOffsetX;

        if(showing){
            backCardImage = s.image("svg/800px-Back03.svg.png", dealerX, dealerY, 100, 150).attr({ opacity: 1 });
            dealerX += cardOffsetX;
        } 
        showing = false;
        
}

function flipBackCard(cardImage) {
    cardImage.animate(
        { transform: 's1,1 50,50 r180,50,50' },
        300,
        mina.linear,
        function () {
            // Remove the card image to replace it with the new drawn card
            cardImage.remove();
        }
    );
}

// Function to compare player's and dealer's card values to determine the winner
function checkWinner(playerTotal, dealerTotal) {
    $('#game-messages').css('visibility', 'visible');
    var messageBox = $('#game-messages');

    if (playerTotal > 21) {
        messageBox.text("Player busts! Dealer wins.");
        winnings -= bet;
        $('#winAmount').text(winnings);
        $("#playAgainBtn").css("visibility", "visible");

    } else if (dealerTotal > 21) {
        messageBox.text("Dealer busts! Player wins.");
        winnings += Math.round((bet * 3) / 2);
        $('#winAmount').text(winnings);
        $("#playAgainBtn").css("visibility", "visible");

    } else if (playerTotal === 21 && dealerTotal !== 21) {
        messageBox.text("Player wins with a Blackjack!");
        winnings += Math.round((bet * 3) / 2);
        $('#winAmount').text(winnings);
        $("#playAgainBtn").css("visibility", "visible");

    } else if (playerTotal !== 21 && dealerTotal === 21) {
        messageBox.text("Dealer wins with a Blackjack!");
        winnings -= bet;
        $('#winAmount').text(winnings);
        $("#playAgainBtn").css("visibility", "visible");

    } else if (playerTotal > dealerTotal) {
        messageBox.text("Player wins!");
        winnings += Math.round((bet * 3) / 2);
        $('#winAmount').text(winnings);
        $("#playAgainBtn").css("visibility", "visible");

    } else if (playerTotal < dealerTotal) {
        messageBox.text("Dealer wins.");
        winnings -= bet;
        $('#winAmount').text(winnings);
        $("#playAgainBtn").css("visibility", "visible");

    } else {
        messageBox.text("Push!");
        $("#push").css("visibility", "visible");
        winnings += bet;
    }
}

function resetGame() {
    // Clear cards and other game elements
    $('svg image').not('#backCard, .chip').remove();
    
    // Reset the variables to their initial values
    currentValue = 0;
    dealerValue = 0;
    dealNumber = 0;
    currentBet = 0;
    bet = 0;
    isFirstDeal = true;
    showing = true;
    stand = false;
    betPlaced = false;

    dealerX = 500; 
    dealerY = 50; 
    playerX = 500; 
    playerY = 250;

    $('#betAmount').text(0);
    $('.message-box').css("visibility", "hidden");
    $('#playAgainBtn').css("visibility", "hidden");

    // re-enable clickability
    $('.chip').css('pointer-events', 'auto');
    $('#backCard').css('pointer-events', 'auto');
}









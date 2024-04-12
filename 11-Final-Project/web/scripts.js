var chipsToBet = 0;
var totalBet = 0;
let deck = [];
var userX = 50;
var userY = 60;
var dealerX = 50;
var dealerY = 30;
var colorChangeAllowed = true;


function playAnimation() {
    $(".chip").addClass("animated"); 
    $(".backcard").addClass("animated"); 
}

function showNotification() {
    $('.notification-container').css("visibility", "visible");
}

function hideNotification() {
    $('.notification-container').css('backdrop-filter', 'none');
    $('.notification-content').css("visibility", "hidden");

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

    setTimeout(function() {
        location.reload();
    }, 100);
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
});

function animateToDestination(element) {

    element.animate({
        top: 28 + "%",
        left: 66 + "%"
    }, 600);

    if (chipsToBet > 1){
        setTimeout(function() {
            element.css('box-shadow', 'none');
            element.addClass('final-chip');
            $(".final-chip").css("z-index", "9999");
        }, 600);    
    }
}

function returnChip(element){

    var chipValue = parseInt($(element).attr("value"));

    if (chipValue === 5) {
        element.animate({
            top: 34 + "%",
            left: 6 + "%"
        }, 600);
    } else if (chipValue === 25) {
        element.animate({
            top: 41 + "%",
            left: 18 + "%"
        }, 600);
    } else if (chipValue === 50) {
        element.animate({
            top: 48 + "%",
            left: 30 + "%"
        }, 600);
    } else if (chipValue === 100) {
        element.animate({
            top: 53 + "%",
            left: 42 + "%"
        }, 600);
    } else if (chipValue === 500) {
        element.animate({
            top: 56 + "%",
            left: 55 + "%"
        }, 600);
    } else if (chipValue === 1000) {
        element.animate({
            top: 58 + "%",
            left: 68 + "%"
        }, 600);
    }

    setTimeout(function() {
        element.remove();
    }, 600);    
}

function clearBet() {
    $(".mainbuttons-container").css("visibility", "hidden");
    
    $("#totalBet").text("");
    
    $(".placed").fadeOut();

    setTimeout(function() {
        $("#place-bet").css("visibility", "visible");
        totalBet = 0;
    }, 600);    
}

function startDeal() {
    changeTable();
    shuffleDeck();

    for (var i = 0; i < 4; i++) {
        if(i == 3){
            var $backCard = $(".backcard").clone(); 
            $backCard.appendTo(".game-body"); 

            $backCard.animate({
                top: 30 + "%",
                left: 60 + "%"
            }, 1000, function() {
            });
        } else {
            if(i % 2 == 0){
                console.log("yo");
                flipAndMoveCard(getCard(), userX, userY)
                userX += 5;
            }
            if(i % 2 == 1){
                flipAndMoveCard(getCard(), dealerX, dealerY)
                userX += 5;
            }

        }
        
    }

    // setTimeout(function() {
    //     deal();
    // }, 600);

}

function changeTable() {
    $(".mainbuttons-container").css("visibility", "hidden");
    $(".chip").off("click");
    $(".placed").off("click");

    $("#totalBet").animate({
        top: 40 + "%",
        left: 26 + "%"
    }, 600);
    
    $(".placed").animate({
        top: 15 + "%",
        left: 33 + "%"
    }, 600);
}

function shuffleDeck() {

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function deal(){
    
    $(".gamebuttons-container").css("visibility", "visible");

}

function flipAndMoveCard(card, x, y) {

    $.ajax({
        url: "SVG/", 
        method: "GET",
        success: function(response) {
            var containsCard = $(response).filter(function() {
                return $(this).text().indexOf('card') !== -1; 
            });

            $.get("SVG/" + card, function(card) {
                var $card = $(card.documentElement);
                if (containsCard.length === 0) {
                    $card.addClass("card"); 
                    $(".card-container").append($card);
                    $($card).toggleClass('flipped').animate({
                        left: x + "%",
                        top: y + "%"
                    }, 1000);
                } else {
                    $($card).toggleClass('flipped').animate({
                        left: x + "%",
                        top: y + "%"
                    }, 1000);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("Failed to load SVG file:", errorThrown);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error fetching content:", error);
        }
    });
}

function getCard() {
    var randomIndex = Math.floor(Math.random() * deck.length); 
    return deck[randomIndex]; 
}

function checkBet(){
    if (colorChangeAllowed) {
        var originalColor = $(".coin-count").css("color");

        $(".coin-count").css("color", "red");

        colorChangeAllowed = false;

        setTimeout(function() {
            $(".coin-count").css("color", originalColor);
            colorChangeAllowed = true;
        }, 1000);
    }
}
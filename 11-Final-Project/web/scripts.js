var chipsToBet = 0;
var totalBet = 0;
let deck = [];
var userX = 30;
var userY = 50;
var dealerX = 30;
var dealerY = 10;
var colorChangeAllowed = true;
var userVal = 0;
var dealerVal = 0;
var zval = 0;


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
    if (totalBet > 0){
        animateCoin(totalBet);
        $.ajax({
            url: 'update-coins.php',
            type: 'POST', 
            data: { key: -totalBet }, 
            success: function(response) {
                console.log('Response from PHP:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
        $(".card-container").css("z-index", "1");
        changeTable();
        shuffleDeck();

        for (var i = 0; i < 4; i++) {
            if(i == 3){
                var $backCard = $(".backcard").clone(); 
                $backCard.appendTo(".card-container"); 
                $backCard.removeClass('backcard');
                $backCard.addClass('card');
                $backCard.addClass('dealerBackCard');

                setTimeout(function() {
                    $backCard.animate({
                        top: 10 + "%",
                        left: 34 + "%",
                        rotate: "25deg",
                        zIndex: 100
                    }, 1000, function() {
                    });
                }, 1500);
            } else {
                if(i % 2 == 0){
                    setTimeout(function() {
                        var newCard = getCard();
                        flipAndMoveCard(newCard, userX, userY);
                        fetchCardValue(newCard)
                            .then(function(value) {
                                if(value == 20){
                                    handleUserAce();
                                } else {
                                    adjustUserVal(value);
                                }
                            })
                            .catch(function(error) {
                                console.error("Error fetching SVG value:", error);
                            });
                        userX += 4;
                        if(userVal >= 21){
                            endUser();
                        }
                    }, 500);
                }
                if(i % 2 == 1){
                    setTimeout(function() {
                        var newCard = getCard();
                        flipAndMoveCard(newCard, dealerX, dealerY);
                        fetchCardValue(newCard)
                            .then(function(value) {
                                if(value == 20){
                                    handleDealerAce();
                                } else {
                                    adjustDealerVal(value);
                                }
                            })
                            .catch(function(error) {
                                console.error("Error fetching SVG value:", error);
                            });
                        dealerX += 4;
                    }, 100);
                }

            }
            
        }
        
        setTimeout(function() {
            $(".gamebuttons-container").css("visibility", "visible");
            $(".bubble").css("visibility", "visible");
        }, 1900);

        setTimeout(function() {
            var checkDealer = getCard();
            fetchCardValue(checkDealer)
                    .then(function(value) {
                        console.log(parseInt(value));
                        console.log(parseInt(dealerVal));
                        console.log(parseInt(value) + parseInt(dealerVal));
                        if(parseInt(value) + parseInt(dealerVal) == 30){
                            setTimeout(function() {
                                dealerBlackjack(checkDealer);
                                endDealer();
                            }, 1000);
                        }
                    })
                    .catch(function(error) {
                        console.error("Error fetching SVG value:", error);
                    });
        }, 1000);
    }

}

function changeTable() {
    $(".mainbuttons-container").css("visibility", "hidden");
    $(".chip").off("click");
    $(".placed").off("click");

    setTimeout(function() {
        $(".chip-container").children().not('.placed').each(function() {
            $(this).animate({
                left: "-50%"
            }, 1000);
        });
    }, 1000);

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

function flipAndMoveCard(card, x, y) {
    zval += 1;

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
                        top: y + "%",
                        rotate: "25deg",
                        zIndex: zval
                    }, 1000);
                } else {
                    $($card).toggleClass('flipped').animate({
                        left: x + "%",
                        top: y + "%",
                        rotate: "25deg",
                        zIndex: zval
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

function Hit() {
    var card = getCard();
    flipAndMoveCard(card, userX, userY);
    userX += 4;
    fetchCardValue(card)
        .then(function(value) {
            if (value == 20) {
                handleUserAce();
            } else {
                adjustUserVal(value);
            }
            // Check if the text contains a '/'
            if ($(".card-count2").text().includes('/')) {
                var values = $(".card-count2").text().split('/');
                var value1 = parseInt(values[0]);
                var value2 = parseInt(values[1]);
                var closestValue = value1;
                if (value2 <= 21 && value2 > value1) {
                    closestValue = value2;
                }
                if (closestValue > 21) {
                    // Adjust ace value to 1 if the closest value is over 21
                    $(".card-count2").text(value1);
                } else {
                    // Adjust ace value to 11 if the closest value is under or equal to 21
                    $(".card-count2").text(closestValue);
                }
            }
            // Check if the user has busted after the hit
            if (parseInt($(".card-count2").text()) > 21) {
                endUser();
            }
        })
        .catch(function(error) {
            console.error("Error fetching SVG value:", error);
        });
}

function fetchCardValue(card) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "SVG/" + card,
            method: "GET",
            success: function(response) {
                var $card = $(response.documentElement); 
                var value = $card.attr("value");
                resolve(value);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

function adjustUserVal(value) {
    if (value === 20) {
        handleUserAce();
    } else {
        userVal += parseInt(value);
    }
    $(".card-count2").text(userVal);
    if (userVal >= 21) {
        endUser();
    }
}

function adjustDealerVal(value) {
    if (value === 20) {
        handleDealerAce();
    } else {
        dealerVal += parseInt(value);
    }
    $(".card-count1").text(dealerVal);
}

function stand() {
    flyDealerCard();
    var intervalId = setInterval(function() {
        if (win()) {
            clearInterval(intervalId);
            endDealer();
        } else {
            var card = getCard();
            flipAndMoveCard(card, dealerX, dealerY);
            fetchCardValue(card)
                .then(function(value) {
                    if (value == 20) {
                        handleDealerAce();
                    } else {
                        adjustDealerVal(value);
                    }
                    // Check if the text contains a '/'
                    if ($(".card-count1").text().includes('/')) {
                        var values = $(".card-count1").text().split('/');
                        var value1 = parseInt(values[0]);
                        var value2 = parseInt(values[1]);
                        var closestValue = value1;
                        if (value2 <= 21 && value2 > value1) {
                            closestValue = value2;
                        }
                        if (closestValue > 21) {
                            // Adjust ace value to 1 if the closest value is over 21
                            $(".card-count1").text(value1);
                        } else {
                            // Adjust ace value to 11 if the closest value is under or equal to 21
                            $(".card-count1").text(closestValue);
                        }
                    }
                    // Check if the dealer has busted after the hit
                    if (parseInt($(".card-count1").text()) > 21) {
                        endDealer();
                    }
                })
                .catch(function(error) {
                    console.error("Error fetching SVG value:", error);
                });
        }
    }, 1000);
}

function flyDealerCard(){
    $(".dealerBackCard").animate({
        top: -9 + "%"
    }, 1000);
    var newCard = getCard();
    fetchCardValue(newCard)
        .then(function(value) {
            if(value == 20){
                if(DealerVal + value == 30){
                    $(".card-count1").text(21);
                    endDealer();
                } else {
                    handleDealerAce();
                    dealerX += 4;
                    $('.gamebuttons-container').css("visibility", "hidden");
                    setTimeout(function() {
                        $(".dealerBackCard").remove();
                        replaceDealerCard(newCard);
                    }, 1000);
                }
            } else {
                adjustDealerVal(value);
                dealerX += 4;
                $('.gamebuttons-container').css("visibility", "hidden");
                setTimeout(function() {
                    $(".dealerBackCard").remove();
                    replaceDealerCard(newCard);
                }, 1000);
            }
        })
        .catch(function(error) {
            console.error("Error fetching SVG value:", error);
        });
}

function replaceDealerCard(card){
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
                    $card.attr("id", "new");
                    $(".card-container").append($card);
                    $("#new").css({
                        "position": "absolute", 
                        "top": "1%",    
                        "left": "34%",
                        "rotate": "25deg",
                        "zIndex": zval - 1         
                    });
                    $($card).animate({
                        top: 10 + "%"
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

function handleUserAce() {
    if (userVal + 11 <= 21) {
        userVal += 11;
        $(".card-count2").text(userVal + "/" + (userVal - 10));
    } else {
        userVal += 1;
        $(".card-count2").text(userVal);
    }
}

function handleDealerAce() {
    if (dealerVal + 11 <= 21 && dealerVal < 17) {
        dealerVal += 11;
        $(".card-count1").text(dealerVal + "/" + (dealerVal - 10));
    } else {
        dealerVal += 1;
        $(".card-count1").text(dealerVal);
    }
}

function win(){
    return (dealerVal >= 17);
}

function endUser(){
    if(userVal == 21){
        console.log("blackjack");
        flyDealerCard();
    } else {
        console.log("bust");
        flyDealerCard();
    }
}

function endDealer(){
    checkOutcome();
}

function dealerBlackjack(card){
    $(".dealerBackCard").animate({
        top: -9 + "%"
    }, 1000);
    dealerX += 4;
    dealerVal = 21;
    $(".card-count1").text(dealerVal);
    $('.gamebuttons-container').css("visibility", "hidden");
    setTimeout(function() {
        $(".dealerBackCard").remove();
        replaceDealerCard(card);
    }, 1000);
}

function animateCoin(amount) {
    var $coinCount = $(".coin-count"); 
    var currentValue = parseInt($coinCount.text().replace(/,/g, ''), 10); 
    var targetValue = currentValue - amount - 1;

    $({ value: currentValue }).animate({ value: targetValue }, {
        duration: 3000,
        step: function() {
            $coinCount.text(Math.ceil(this.value).toLocaleString()); 
        }
    });
}

function checkOutcome() {
    if (userVal > 21 || (dealerVal <= 21 && dealerVal > userVal)) {
        // Dealer wins
        console.log("You lose!");
    } else if (userVal === 21 || (dealerVal > 21) || (userVal <= 21 && userVal > dealerVal)) {
        // Player wins
        console.log("You win!");
    } else {
        // Push
        console.log("Push!");
    }
}
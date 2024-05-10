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
var userFirst = 0;
var userSecond = 0;
var firstCard = true;
var userAce = false;


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
        var coins = $("#coins").text();
        var cleanNumber = coins.replace(/,/g, '');
        var number = parseInt(cleanNumber);

        animateCoin(-totalBet);
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
                                    if(firstCard = true){
                                        userFirst = 20;
                                    } else {
                                        userSecond = 20;
                                    }
                                    handleUserAce();
                                } else {
                                    if(firstCard = true){
                                        userFirst = parseInt(value);
                                    } else {
                                        userSecond = parseInt(value);
                                    }
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
                    firstCard = false;
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
            if(userFirst == userSecond){
                $('.split-button').css("visibility", "visible");
            }
            if(totalBet < number){
                $(".double-button").css("visibility", "visible");
            }
            console.log(userFirst);
            console.log(userSecond);
        }, 1900);

        setTimeout(function() {
            var checkDealer = getCard();
            fetchCardValue(checkDealer)
                    .then(function(value) {
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
    $('.double-button').css("visibility", "hidden");
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
    if (userAce && userVal > 21) {
        userVal -= 10; 
        userAce = false; 
    }
    userVal += parseInt(value);
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
    $('.double-button').css("visibility", "hidden");
    flyDealerCard();
    var intervalId = setInterval(function() {
        if (win()) {
            clearInterval(intervalId);
            endDealer();
        } else {
            var card = getCard();
            flipAndMoveCard(card, dealerX, dealerY);
            dealerX += 4;
            fetchCardValue(card)
                .then(function(value) {
                    if (value == 20) {
                        handleDealerAce();
                    } else {
                        adjustDealerVal(value);
                    }

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
                if(dealerVal + value == 30){
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
    userAce = true;
    if (userVal + 11 < 21) {
        userVal += 11;
        $(".card-count2").text(userVal);
    } else if(userVal + 11 == 21){
        userVal += 11;
        $(".card-count2").text(21);
        endUser();
    } else {
        userVal += 1;
        $(".card-count2").text(userVal);
    }
}

function handleDealerAce() {
    dealerAce = true;
    if (dealerVal + 11 <= 21 && dealerVal < 17) {
        dealerVal += 11;
        $(".card-count1").text(dealerVal);
    } else {
        dealerVal += 1;
        $(".card-count1").text(dealerVal);
    }
}

function win(){
    return (dealerVal >= 17);
}

function endUser(){
    var messageOverlay = $(".message-overlay");
    var messageContainer = $(".message-container");
    var messageBox = $(".message-box");
    var finalAmount = 0;

    if (userVal > 21) {
        messageBox.html("You Bust! <br> $<span class='loss'>" + -totalBet + "</span>");
    } else if (userVal === 21) {
        finalAmount = totalBet * 2;
        messageBox.html("You Win With Blackjack ! <br> $<span class='win'>" + finalAmount + "</span>");
    }

    $(".dealerBackCard").animate({
        top: -9 + "%"
    }, 1000);
    var newCard = getCard();
    fetchCardValue(newCard)
        .then(function(value) {
            if(value == 20){
                $(".card-count1").text(dealerVal + 11);
                console.log(dealerVal + 11);
            } else {
                $(".card-count1").text(dealerVal + parseInt(value));
                console.log(value);
                $('.gamebuttons-container').css("visibility", "hidden");
            }
        })
        .catch(function(error) {
            console.error("Error fetching SVG value:", error);
        });

    animateCoin(finalAmount);

    $.ajax({
        url: 'update-coins.php',
        type: 'POST', 
        data: { key: finalAmount }, 
        success: function(response) {
            console.log('Response from PHP:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });

    messageOverlay.fadeIn();
    messageContainer.addClass("show");

    flyOffChipsAndBet();

    setTimeout(function() {
        window.location.reload();
    }, 2500);
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
    var targetValue = currentValue + amount;

    $({ value: currentValue }).animate({ value: targetValue}, {
        duration: 3000,
        step: function() {
            $coinCount.text(Math.ceil(this.value).toLocaleString()); 
        },
        complete: function() {
                $coinCount.text((targetValue.toLocaleString()));
        }
    });
}

function checkOutcome() {
    var messageOverlay = $(".message-overlay");
    var messageContainer = $(".message-container");
    var messageBox = $(".message-box");
    var finalAmount = 0;

    if (userVal > 21 || (dealerVal <= 21 && dealerVal > userVal)) {
        messageBox.html("You lose! <br> $<span class='loss'>" + -totalBet + "</span>");
    } else if (userVal === 21 || (dealerVal > 21) || (userVal <= 21 && userVal > dealerVal)) {
        finalAmount = totalBet * 2;
        messageBox.html("You win! <br> $+<span class='win'>" + finalAmount + "</span>");
    } else {
        finalAmount = totalBet;
        messageBox.text("Push!");
        messageBox.addClass("push");
    }

    animateCoin(finalAmount);

    $.ajax({
        url: 'update-coins.php',
        type: 'POST', 
        data: { key: finalAmount }, 
        success: function(response) {
            console.log('Response from PHP:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });

    messageOverlay.fadeIn();
    messageContainer.addClass("show");

    flyOffChipsAndBet();

    setTimeout(function() {
        window.location.reload();
    }, 3000);
}

function flyOffChipsAndBet() {
    $(".chip, .placed, #totalBet").animate({
        top: 0,
        left: 0,
        opacity: 0
    }, 2500, function() {
        $(".chip, .placed, #totalBet").remove();
    });
}

function double(){
    animateCoin(-totalBet);
    totalBet *= 2;
    $("#totalBet").text(formatter.format(totalBet));
    $('.double-button').css("visibility", "hidden");
}

function split(){

}
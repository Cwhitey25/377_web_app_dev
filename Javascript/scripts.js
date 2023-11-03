function testArray(){
    var grades = [ 80, 100, 94, 78, 93, 78 ];

    document.getElementById("grades").innerHTML = "Your grades are" + " " + grades;

    var total = 0;


    for (var i = 0; i < grades.length; i++) {
        total += grades[i];
    }

    var average = total / grades.length;
    document.getElementById("average").innerHTML = "Your average is:" + " " + average;
}

function dealCard(){
   var deck = getDeckOfCards();

   var card = deck[Math.floor(Math.random() * deck.length)];

    document.getElementById("card").innerHTML = "Your card is the " + card.rank + " of " + card.suit;
}

function getDeckOfCards(){
    var deck = [];

    for (var rank = 1; rank <= 13; rank++){
        var rank = Math.floor(Math.random() * 13) + 1;
        var suit = Math.floor(Math.random() * 4) + 1;

        var suitText = "";
        if (suit == 1){
            suitText = "Hearts";
        } else if (suit == 2){
            suitText = "Diamonds"
        } else if (suit == 3){
            suitText = "Spades"
        } else if (suit == 4){
            suitText = "Clubs"
        }

        var card = { 'rank': rank, 'suit': suitText};
        deck.push(card);
    }
    return deck;
}
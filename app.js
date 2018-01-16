$(document).ready(function () {
  // List called deckOfCards initialised and populated with the names of
  // the Font Awesome icons.
  var deckOfCards = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
  "fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle",
  "fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb",
  "fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    /*
    Math.random generates a number between 0 and 1, that isn't a whole number.
    To get a number, for example between 0 and 10, multiply your answer by 10:
    ==> Math.random() * 10
    To make it a whole number, i.e. an integer, apply Math.floor,
    which rounds down to the nearest whole number:
    ==> Math.floor(Math.random() * 10)
    To get a whole number between 1 and 10, add 1 to the answer:
    ==> Math.floor(Math.random() * 10 + 1)
    */
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function timeElapsedPadding(timeInterval) {
    return ((timeInterval < 10 ? "0" : "") + timeInterval);
  }

  function timeElapsedString(startedTime, presentTime ) {
    
    var timeElapsedInSeconds = Math.floor((presentTime - startedTime)/1000); 
    // calculate hours                
            var hours = parseInt(timeElapsedInSeconds/3600);

            // calculate minutes
            var minutes = parseInt(timeElapsedInSeconds/60);
            if (minutes > 60) {minutes %= 60;}

            // calculate seconds
            var seconds = parseInt(timeElapsedInSeconds/1000);
            if (seconds > 60) {seconds %= 60;}
    
    // Pad the minutes and seconds with leading zeros, if required
    hours = timeElapsedPadding(hours);
    minutes = timeElapsedPadding(minutes);
    seconds = timeElapsedPadding(seconds);

    // Compose the string for display
    var currentTimeString = hours + ":" + minutes + ":" + seconds;

    return currentTimeString;
  }

  function modalDisplayParameters() {
    $('.stars').clone().appendTo($('.modal-star-display-element'));
    $('.moves').clone().appendTo($('.modal-move-counter-element'));
    $('.timer').clone().appendTo($('.modal-timer-element'));
  }


  var shuffledCards =[];
  shuffledCards = shuffle(deckOfCards);
  // Creating the HTML element titled "deck" which contains all the cards
  $('.container').append('<ul class="deck"></ul>');
  // Running a loop the length of the 'shuffledCards' array number of times to:
  // (a) Add each card's HTML to the "deck" class.
  // (b) Add a data* attribute called cardDeckPosition that assigns the loop
  //     counter 'i' to each list element.
  for (var i = 0; i < shuffledCards.length; i++) {
    $('.deck').prepend('<li class="card"><i></i></li>');
    $.each($('.deck .card'), function (i, item) {
      $(item).attr('data-cardDeckPosition', i);
    });
  }
  // Assigning each of the shuffled cards in the 'shuffledCards' array to each
  // of the <i> HTML tags through a for loop.
  for (var i = 0; i < shuffledCards.length; i++) {
    $('.deck .card').children().eq(i).addClass(shuffledCards[i]);
  }
  // VARIABLE DEFINITION:
  // (a) displayedCards: List used to store the attributes of the 2 user selected
  //     cards from the deck.
  // (b) cardDeckPosition: List used to store the position of the card in the deck.
  // (c) cardsTurnedOver: Variable used to keep count of the number of cards turned
  //     over at any one time.
  // (d) numberOfMoves: Variable used to indicate number of moves made while playing
  //     the game.
  // (e) numberOfCardsDisplayed: Variable used to indicate the number of cards displayed.
  var displayedCards = [];
  var cardDeckPosition = [];
  var cardsTurnedOver = 0;
  var numberOfMoves = 0;
  var numberOfCardsDisplayed = 0;
  
  //Event handler function to flip open a card when clicked.
  $('.card').click(function (event) {
    if (numberOfMoves === 0) {
    var startTime = new Date().getTime(); 
    }
    var timer = setInterval(function() {
      var timeNow = new Date().getTime();
      $('.score-panel .timer').text(timeElapsedString(startTime, timeNow));
    }, 25);

    // Conditional loop to ensure that:
    // (a) no more than 2 cards are opened at a given time;
    // (b) the card selected is not already turned over i.e. has
    //     it's image hidden.
    if (cardsTurnedOver<2 && !($(this).children().hasClass("open"))) {
      // Using the toggleClass attribute to toggle the user selected card to
      // it's "open" state.
      $(this).toggleClass("open");
      // Incrementing the cardsTurnedOver variable by 1.
      cardsTurnedOver++;
      // Assigning the font awesome name attribute of the first user selected
      // and opened card to the array variable named 'displayedCards' and its
      // respective deck position.
      if (cardsTurnedOver === 1) {
        cardDeckPosition.push($(this).attr("data-cardDeckPosition"));
        displayedCards.push($(this).children().attr("class"));
        // If variable cardsTurnedOver = 1; then the else condition assumes that the
        // second card has been selected.
      }
      else {
        // Assigning the font awesome name attribute of the 2nd user selected
        // and opened card to the array variable named 'displayedCards' and its
        // respective deck position.
        cardDeckPosition.push($(this).attr("data-cardDeckPosition"));
        displayedCards.push($(this).children().attr("class"));
        // For the cards to match the following 2 conditions must be satisfied:
        // (a) The card attributes i.e. icon names must match;
        // (b) The positions of the selected cards must not be the same. This check
        //     ensures that the same card is not clicked twice thereby.
        if ((displayedCards[0] === displayedCards[1]) && (cardDeckPosition[0] !== cardDeckPosition[1])) {
          // If the matching conditions are satisfied the toggleClass
          // attribute is used to toggle the matching cards to the "card match"
          // css state ==> the cards are left open permanently till the end of the game.
          $('.card').filter(".open").removeClass().addClass("card match");
          // The 'displayedCards' array is re-initialised for the next iteration
          // of card selection.
          displayedCards = [];
          // The variable 'numberOfCardsDisplayed' is incremented by 2 so long as
          // the 2 cards selected match.
          numberOfCardsDisplayed += 2;
          // The 'cardDeckPosition' array is re-initialised for the next iteration
          // of card selection.
          cardDeckPosition = [];
          // The variable 'numberOfMoves' is incremented by 1 to account for an
          // attempt to match cards in the deck.
          numberOfMoves +=1;
          // The 'cardsTurnedOver' variable is re-initialised for the next iteration
          // of card selection.
          cardsTurnedOver =0;
          // Conditional statement following on from card equality check above;
          // if the cards do not match then they will be flipped over.
          $('.moves').text(numberOfMoves);
        }
        else {
          setTimeout(function(){
            // As the chosen cards do not match, their css state is altered so that
            // the card image is no longer visible.
            $('.card').filter(".open").removeClass().addClass("card");
            // The 'displayedCards' array is re-initialised for the next iteration
            // of card selection.
            displayedCards = [];
            // The 'cardDeckPosition' array is re-initialised for the next iteration
            // of card selection.
            cardDeckPosition = [];
            // The variable 'numberOfMoves' is incremented by 1 to account for an
            // attempt to match cards in the deck.
            numberOfMoves +=1;
            // The 'cardsTurnedOver' variable is re-initialised for the next iteration
            // of card selection.
            cardsTurnedOver =0;
            $('.moves').text(numberOfMoves);
          }, 600);

        }

      }
      
      // Star rating
    if (numberOfMoves >16 && numberOfMoves < 25) {
    var thirdStarBlack =$('.stars').find('li').eq(2);
    thirdStarBlack.css('color','black');
    }
    if (numberOfMoves > 25) {
    var secondStarBlack =$('.stars').find('li').eq(1);
    secondStarBlack.css('color','black');
    }
      if (numberOfCardsDisplayed === shuffledCards.length){
        

        clearInterval(timer);
        $('.modal').css('display','block');
        modalDisplayParameters();
      }


    }});

  });

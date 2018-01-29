$(document).ready(function() {
  // List called deckOfCards initialised and populated with the names of
  // the Font Awesome icons.
  var deckOfCards = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"
  ];
  // VARIABLE DEFINITION:
  // (a) displayedCards: List used to store the attributes of the 2 user selected
  //     cards from the deck.
  // (b) cardDeckPosition: List used to store the position of the card in the deck.
  // (c) cardsTurnedOver: Variable used to keep count of the number of cards turned
  //     over at any one time.
  // (d) numberOfMoves: Variable used to indicate number of moves made while playing
  //     the game.
  // (e) numberOfCardsDisplayed: Variable used to indicate the number of cards displayed.
  // (f) Pre-definition of the secondsFormatted, minutesFormatted and
  //     hoursFormatted variables used to store related formatted quantities.
  // (g) Pre-definition of the seconds, minutes and
  //     hours variables used to store related quantities obtained after relevant calculations
  //     have been performed on timeElapsedInSeconds quantity.
  // (g) timeElapsedInSeconds: Variable used to store number of seconds elapsed.
  var displayedCards = [];
  var cardDeckPosition = [];
  var cardsTurnedOver = 0;
  var numberOfMoves = 0;
  var numberOfCardsDisplayed = 0;
  var secondsFormatted,
    minutesFormatted,
    hoursFormatted = 0;
  var seconds,
    minutes,
    hours = 0;
  var timeElapsedInSeconds = 0;
  // Shuffle function from http://stackoverflow.com/a/2450976
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
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  // deckHTMLLayout() function used to create the HTML element titled
  // "deck" which contains all the cards.
  function deckHTMLLayout() {
    // Running a loop the length of the 'deckOfCards' array to:
    // (a) Add each card's HTML to the "deck" class.
    // (b) Add a data* attribute called cardDeckPosition that assigns the loop
    //     counter 'i' to each list element.
    $(".container").append('<ul class="deck"></ul>');
    for (var i = 0; i < deckOfCards.length; i++) {
      $(".deck").prepend('<li class="card"><i></i></li>');
      $.each($(".deck .card"), function(i, item) {
        $(item).attr("data-cardDeckPosition", i);
      });
    }
  }
  // cardAssignmentToDeck() function used to assign each of the shuffled cards
  // in the 'shuffledCards' array to each of the <i> HTML tags through a for loop.
  function cardAssignmentToDeck() {
    // Assigning the shuffled 'deckOfCards' array (outputted from 'shuffle' function)
    // to the 'shuffledCards' array and running a loop the length of the 'deckOfCards' array to
    // assign each of the shuffled cards in the 'shuffledCards' array to each
    // of the <i> HTML tags through a for loop
    var shuffledCards = [];
    shuffledCards = shuffle(deckOfCards);
    for (var i = 0; i < deckOfCards.length; i++) {
      $(".deck .card")
        .children()
        .eq(i)
        .addClass(shuffledCards[i]);
    }
  }
  // timeIntervalFormatted() function used to format time elapsed with zero's where
  // needed. Accepts the relevant time interval in either hours, minutes,
  // or seconds and returns appropriate format accordingly.
  function timeIntervalFormatted(timeInterval) {
    return (timeInterval < 10 ? "0" : "") + timeInterval;
  }
  // timeElapsed() function used to determine how much time has elapsed since game
  // play has commenced. timeElapsed() returns the time elapsed in the text format:
  // HOURS : MINUTES : SECONDS for eg: 00:01:07. Accepts the variable timeElapsedInSeconds
  // from where it is declared within the main card click handler function.
  // Function obtained from: https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer
  function timeElapsed(timeElapsedInSeconds) {
    hours = Math.floor(timeElapsedInSeconds / 3600);
    timeElapsedInSeconds %= 3600;
    minutes = Math.floor(timeElapsedInSeconds / 60);
    timeElapsedInSeconds %= 60;
    seconds = Math.floor(timeElapsedInSeconds);
    // Pad the hours, minutes and seconds with leading zeros if required by calling the
    // timeIntervalFormatted() function.
    var hoursFormatted = timeIntervalFormatted(hours);
    var minutesFormatted = timeIntervalFormatted(minutes);
    var secondsFormatted = timeIntervalFormatted(seconds);
    // Compose the string for display
    var currentTimeString =
    hoursFormatted + ":" + minutesFormatted + ":" + secondsFormatted;
    return currentTimeString;
  }
  // timer() function which in turn calls the setInterval() method which simultaneously :
  // (a) calls the function timeElapsed() accepting the incremented-by-1
  //     variable timeElapsedInSeconds;
  // (b) outputs the formatted time elapsed in the text format HH:MM:SS.
  // Refer (d) in https://discussions.udacity.com/t/help-needed-with-the-front-end-inpd-final-project/538486/2
  function timer() {
        timeElapsedInSeconds++;
        $(".score-panel .timer").text(timeElapsed(timeElapsedInSeconds));
  };
  // modalDisplayParameters() function that is used to display the star rating,
  // number of moves counter, time taken to complete game and finally restart
  // all in one popup i.e. the congratulations popup.
  function modalDisplayParameters() {
    $(".score-panel .stars")
      .clone()
      .appendTo($(".modal-star-display-element"));
    $(".moves")
      .clone()
      .appendTo($(".modal-move-counter-element"));
    $(".timer")
      .clone()
      .appendTo($(".modal-timer-element"));
  }
  deckHTMLLayout();
  cardAssignmentToDeck();
  //Event handler function that initiates checking processes when user flips open a card when clicked.
  $(".card").click(function(event) {
    if (timeElapsedInSeconds == 0) {
      setInterval(function(){ timer() }, 1000);
    }
    // Conditional loop to ensure that:
    // (a) no more than 2 cards are opened at a given time;
    // (b) the card selected is not already turned over i.e. avoids
    //     selectong card that is already opened.
    if (
      cardsTurnedOver < 2 &&
      !$(this)
        .children()
        .hasClass("open")
    ) {
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
        displayedCards.push(
          $(this)
            .children()
            .attr("class")
        );
        // If variable cardsTurnedOver = 1; then the else condition assumes that the
        // second card has been selected.
      } else {
        // Assigning the font awesome name attribute of the 2nd user selected
        // and opened card to the array variable named 'displayedCards' and its
        // respective deck position.
        cardDeckPosition.push($(this).attr("data-cardDeckPosition"));
        displayedCards.push(
          $(this)
            .children()
            .attr("class")
        );
        // For the cards to match the following 2 conditions must be satisfied:
        // (a) The card attributes i.e. icon names must match;
        // (b) The positions of the selected cards must not be the same. This check
        //     ensures that the same card is not clicked twice thereby.
        if (
          displayedCards[0] === displayedCards[1] &&
          cardDeckPosition[0] !== cardDeckPosition[1]
        ) {
          // If the matching conditions are satisfied the toggleClass
          // attribute is used to toggle the matching cards to the "card match"
          // css state ==> the cards are left open permanently till the end of the game.
          $(".card")
            .filter(".open")
            .removeClass()
            .addClass("card match");
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
          numberOfMoves += 1;
          // The 'cardsTurnedOver' variable is re-initialised for the next iteration
          // of card selection.
          cardsTurnedOver = 0;
          // Conditional statement following on from card equality check above;
          // if the cards do not match then they will be flipped over.
          // The moves counter is updated accordingly.
          $(".moves").text(numberOfMoves);
        } else if (cardDeckPosition[0] !== cardDeckPosition[1]) {
          setTimeout(function() {
            // As the chosen cards do not match, their css state is altered so that
            // the card image is no longer visible after 600ms - 0.6 seconds.
            $(".card")
              .filter(".open")
              .removeClass()
              .addClass("card");
            // The 'displayedCards' array is re-initialised for the next iteration
            // of card selection.
            displayedCards = [];
            // The 'cardDeckPosition' array is re-initialised for the next iteration
            // of card selection.
            cardDeckPosition = [];
            // The variable 'numberOfMoves' is incremented by 1 to account for an
            // attempt to match cards in the deck.
            numberOfMoves += 1;
            // The 'cardsTurnedOver' variable is re-initialised for the next iteration
            // of card selection.
            cardsTurnedOver = 0;
            // The moves counter is updated accordingly.
            $(".moves").text(numberOfMoves);
          });
                     } else {
          setTimeout(function() {
            // As the chosen cards do not match, their css state is altered so that
            // the card image is no longer visible after 600ms - 0.6 seconds.
            $(".card")
              .filter(".open")
              .removeClass()
              .addClass("card");
            // The 'displayedCards' array is re-initialised for the next iteration
            // of card selection.
            displayedCards = [];
            // The 'cardDeckPosition' array is re-initialised for the next iteration
            // of card selection.
            cardDeckPosition = [];
            // The 'cardsTurnedOver' variable is re-initialised for the next iteration
            // of card selection.
            cardsTurnedOver = 0;
          }, 600);
        }
      }

      // Conditional loops to determine star ratings dependent on number of
      // moves taken to complete game.
      // (a) If number of moves are between 16 and 25: 2 star rating,
      // (b) If number of moves are greater than 25: 1 star rating.
      // The stars are all initially activated i.e. they are all set at gold
      // and depending on the ranking awarded as per conditions (a) and (b)
      // stars are made black to give either 2 star or 1 star ratings.
      if (numberOfMoves > 16 && numberOfMoves < 25) {
        var thirdStarBlack = $(".stars")
          .find("li")
          .eq(2);
        thirdStarBlack.css("color", "black");
      }
      if (numberOfMoves > 25) {
        var secondStarBlack = $(".stars")
          .find("li")
          .eq(1);
        secondStarBlack.css("color", "black");
      }
    }
    // Conditional loop to check whether the numberOfCardsDisplayed and the
    // deckOfCards.length parameters are equal; if yes that means the game is
    // complete as all the cards have been matched. If condition has been
    // satisfied then the timer variable in the runTimer()
    // function i.e. stopwatch is stopped and the popup is activated.
    if (numberOfCardsDisplayed === deckOfCards.length) {
      clearInterval(timer);
      $(".modal").css("display", "block");
      modalDisplayParameters();
    }
  });
});

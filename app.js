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
  // setStopwatch() function used to format time elapsed with zero's where
  // needed. Accepts the relevant time interval in either hours, minutes,
  // or seconds and formats it accordingly.

  function setStopwatch(timeInterval) {
    return ((timeInterval < 10 ? "0" : "") + timeInterval);
  }
  // runTimer() function used to determine how much time has elapsed since game
  // play has commenced. runTimer() returns the time elapsed in the ttext format:
  // HOURS : MINUTES : SECONDS for eg: 00:01:07.
  function runTimer() {
    // Using Date.now() to get current timestamp
    var startTime = Date.now();
    // declaring setInterval fucntion variable timer which will run every 1000
    // milliseconds or 1 second.
    timer = setInterval(function () {
      var timeElapsed = Date.now() - startTime;
      console.log("time elapsed:", timeElapsed);
      hoursFormatted = setStopwatch(Math.floor(timeElapsed / 3600000));
      minutesFormatted = setStopwatch(Math.floor(((timeElapsed / 60000)) % 60));
      secondsFormatted = setStopwatch(Math.floor(((timeElapsed / 1000)) % 60));
      console.log("hours formatted:", hoursFormatted);
      console.log("minutes formatted:", minutesFormatted);
      console.log("seconds formatted:", secondsFormatted);
      // Compose the string for display
      var currentTimeString = hoursFormatted + ":" + minutesFormatted + ":" + secondsFormatted;
      console.log("time formatted:", currentTimeString);
      return currentTimeString;
    }, 1000);
  }
  // modalDisplayParameters() function that is used to display the star rating,
  // number of moves counter, time taken to complete game and finally restart
  // all in one popup i.e. the congratulations popup.
  function modalDisplayParameters() {
    $('.stars li').clone().appendTo($('.modal-star-display-element'));
    $('.moves').clone().appendTo($('.modal-move-counter-element'));
    $('.timer').clone().appendTo($('.modal-timer-element'));
    $('.modal message').click(function(){
      location.reload();
    });
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
  // (f) Pre-fdefinition of the secondsFormatted, minutesFormatted and
  //     hoursFormatted variables used to store related formatted quantities.
  var displayedCards = [];
  var cardDeckPosition = [];
  var cardsTurnedOver = 0;
  var numberOfMoves = 0;
  var numberOfCardsDisplayed = 0;
  var secondsFormatted, minutesFormatted, hoursFormatted;

  //Event handler function to flip open a card when clicked.
  $('.card').click(function (event) {
    // Simultaneously calls runTimer() function and displays its output.
    $('.score-panel .timer').text(runTimer());

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
      // Click handler function to reload the game while in progress.
      $('.restart').click(function(){
        location.reload();
      });
      // Conditional loops to determine star ratings dependent on number of
      // moves taken to complete game.
      // (a) If number of moves are between 16 and 25: 2 star rating,
      // (b) If number of moves are greater than 25: 1 star rating.
      // The stars are all initially activated i.e. they are all set at gold
      // and depending on the ranking awarded as per conditions (a) and (b)
      // stars are made black to give either 2 star or 1 star ratings.
      if (numberOfMoves >16 && numberOfMoves < 25) {
        var thirdStarBlack =$('.stars').find('li').eq(2);
        thirdStarBlack.css('color','black');
      }
      if (numberOfMoves > 25) {
        var secondStarBlack =$('.stars').find('li').eq(1);
        secondStarBlack.css('color','black');
      }
      // Conditional loop to check whether the numberOfCardsDisplayed and the
      // shuffledCards.length paramets are equal; if yes that means the game is
      // complete as all the cards have been matched.
      // If condition has been satisfied then the timer variable in the runTimer()
      // function i.e. stopwatch is stopped and the popup is activated.

      if (numberOfCardsDisplayed === shuffledCards.length){
        clearTimeout(timer);
        $('.modal').css('display','block');
        modalDisplayParameters();
      }


    }});

  });

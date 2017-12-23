$(document).ready(function () {
/*
   * Create a list that holds all of your cards
   */
  var deckOfCards = ["fa-li fa fa-diamond","fa-li fa fa-paper-plane-o","fa-li fa fa-anchor","fa-li fa fa-bolt",
                     "fa-li fa fa-cube","fa-li fa fa-anchor","fa-li fa fa-leaf","fa-li fa fa-bicycle",
                     "fa-li fa fa-diamond","fa-li fa fa-bomb","fa-li fa fa-leaf","fa-li fa fa-bomb",
                     "fa-li fa fa-bolt","fa-li fa fa-bicycle","fa-li fa fa-paper-plane-o","fa-li fa fa-cube"];

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

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

  var shuffledCards =[];
  shuffledCards = shuffle(deckOfCards);

  // Creating the HTML element titled "deck" which contains all the cards
  $('.container').append('<ul class="deck"></ul>');
  // Running a loop the length of the 'shuffledCards' array number of times,
  // and adding each card's HTML to the "deck" class.
   for (var i = 0; i < shuffledCards.length; i++) {
     $('.deck').prepend('<li class="card"></li>');
   }
  // Adding the <i> tags to each of the cards to get the relevant picture on the
  // 'opened' card equivalent of the HTML.
   $('.deck .card').prepend('<i></i>');

  // Assigning each of the shuffled cards in the 'shuffledCards' array to each
  // of the <i> HTML tags through a for loop.
  for (var i = 0; i < shuffledCards.length; i++) {
   $('.card').eq(i).find('i').addClass(shuffledCards[i]);
  }
//$('.card').click(function (event) {
  //$(this).toggleClass("open");
//})

   //Event handler function to flip open a card when clicked.
   var displayedCards = [];
   var numberOfCardsDisplayed;
   var numberOfMoves;
   $('.card').click(function (event) {
      //Conditional loop to ensure no more than 2 cards are opened at a given time.
      if (($(this).attr('class')==='card' && (displayedCards.length<2)) {
        //Conditional statement to check whether first card has been flipped open.
        if (displayedCards.length === 0) {
          $(this).toggleClass("open");
          //Assigning the class attribute of the first flipped open card to the array
          //variable named 'displayedCards'
          displayedCards.push($(this).children().attr('.class'));
          }
        //Conditional statement to check whether second card has been flipped open.
        else if (displayedCards.length === 1) {
          $(this).toggleClass("open");
          //Assigning the class attribute of the second flipped open card to the array
          //variable named 'displayedCards'
          displayedCards.push($(this).children().attr('.class'));
          }
          //Conditional statement to check whether both opened cards match.
        if (displayedCards[0] === displayedCards[1]) {
          //If the cards match then they are displayed i.e, left open.
          $('.card').filter(".card open").toggleClass(".card match");
          // The 'displayedCards' array is cleared and the steos above repeated.
          displayedCards = [];
        }
          //If the cards do not match then they will be flipped over.
        else {
          function turnoverCard () {
            //ISince the cards do not match their css state is altered so that
            //the card image is no longer visible.
            $('.card').filter(".card open").toggleClass(".card");
            // The 'displayedCards' array is cleared and the steos above repeated.
            displayedCards = [];
            }
          setTimeout(turnoverCard, 600);
        }
      }

      //
   });
/*$('.deck').on('click', '.card', function (event) { if ($(this).attr('.card') === 'card' && openedCards.length<2) {
    if (openedCards.length === 0) {

         $(this).toggleClass("card open show");
         openedCards[0] = push($(this).attr('card'));
       }}});
    if (openedCards.length === 1){
      $('.deck').on('click', '.card', function (event) {
         $(this).toggleClass(".card open show");
         openedCards[1] = push($(this).attr('card'));
       })}
    if (openedCards[0] === openedCards[1]) {
      $('.card').filter($(".card open show")).toggleClass(".card match");
      //Increment the number of tilees flipped and number of moves if a pair is made.
      // tilesFlipped=tilesFlipped + 2;
      // numOfmoves=numOfmoves+1;
      // $('.moves').text(numOfmoves);
      //Empty the array for comparison of next two cards.
      openedCards = [];
       }
      else {
      // To avoid flipping of more than two cards at a time and used to flip back cards that are not matching
      function flipBack () {
      $('.card').filter($(".card open show")).toggleClass(".card");
      openedCards = [];
      // numOfmoves=numOfmoves+1;
      // $('.moves').text(numOfmoves);
      }
      setTimeout(flipBack, 600);
      }
*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
});

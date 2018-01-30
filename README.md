# memoryCardGame
Concentration, also known as Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs, is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards. Concentration can be played with any number of players or as solitaire.  Using jquery, css and html to create the game.

About index.html
index.html serves as the basic skeleton for what the user sees when first encountering the game. It contains the following 2 key components.
(a) Header files:
Links are also made to the 'app.css' stylesheet for styles used on the page and the 'app.js' file that details the interactions between user and the webpage. 
(b) Body content:
Within the body of the html page, falls the div class 'container'. This 'container' consists of the following two key parts:
    (i)  The score panel section: This lies on top of the deck of cards and contains the star ratings counter, moves counter and the                restart section. 
    (ii) The modal pop-up class/ congratulations pop-up: This pop-up is activated when game play is completed and clones the content of           the score panel section, defined above. In addition, it contains a game replay option, which resets the game board, timer ,             star and moves counter when clicked by user. 
In addition to visible content defined above, the app.jss file adds the deck and individual cards to the container through function definitions.

About app.css
app.css serves as the stylesheet for the matching card game html page. It makes reference to font as used on previous editions of 'The Guardian' newspaper online. The background is copyright of Matt W. Moore and is part of his Pattern series within his mural work. Credit has been appropriately assigned in both cases. The css file assigns styles to the following 4 componenets:
(a) HTML styling 
Styles are assigned to the body section and it's contituent 'container' class. Additionally styles are assigned to all div, p, span, header h2 tags.
(b) Styles for the deck of cards.
(c) Styles for the congratulations pop-up.
(d) Styles for the score panel.

About app.js
app.js serves as the interaction set-up for the html page. It consists of the following functions:
(a) Shuffle function that takes as input a deck of cards and outputs a randomised list of the same - Shuffle function from http://stackoverflow.com/a/2450976
(b) deckHTMLLayout() function used to create the HTML element titled "deck" which contains all the cards.
(c) cardAssignmentToDeck() function used to assign each of the shuffled cards in the 'shuffledCards' array to each of the <i> HTML tags through a for loop.
(d) timeIntervalFormatted() function used to format time elapsed with zero's where needed. Accepts the relevant time interval in either hours, minutes, or seconds and returns appropriate format accordingly.
(e) timeElapsed() function used to determine how much time has elapsed since game play has commenced. timeElapsed() returns the time    elapsed in the text format - hh:mm:ss for eg: 00:01:07. Accepts the variable timeElapsedInSeconds from where it is declared within the main card click handler function - Function obtained from: https://stackoverflow.com/questions/2604450/how-to-create-a-jquery-clock-timer
(f) timer() function which in turn calls the setInterval() method which simultaneously :
      (i) calls the function timeElapsed() accepting the incremented-by-1
          variable timeElapsedInSeconds;
      (ii) outputs the formatted time elapsed in the text format HH:MM:SS.
    Refer (d) in https://discussions.udacity.com/t/help-needed-with-the-front-end-inpd-final-project/538486/2
(g) modalDisplayParameters() function that is used to display the star rating, number of moves counter, time taken to complete game and finally restart all in one popup i.e. the congratulations popup.
(h) The main event handler function that inititates processes once user flips open a card when clicked.
  
In addition to these functions the following loops are used to check for the following conditions:
(a) To determine star ratings dependent on number of moves taken to complete game.
(b) To check whether the game has been completed (numberOfCardsDisplayed and the deckOfcards.length parameters are equal; if yes that means the game is complete as all the cards have been matched. If condition has been satisfied then timer is stopped and the congratulations popup is activated.

GAME PLAY AND LOAD SEQUENCE:
1. On loading webpage, functions deckHTMLLayout() and cardAssignmentToDeck() are run; these functions are used to create the HTML element titled "deck" which contains all the cards and are used to assign each of the shuffled cards in the 'shuffledCards' array to each of the <i> HTML tags through a for loop, respectively.
2. Once deck is laid out, user clicks on any of the cards in the deck. Doing so initiates the runTimer() function that starts a timer that outputs time elapsed as game play progresses. 
3. Conditional loops are used to check that at all times:
   (a) no more than 2 cards are opened at a given time;
   (b) the card selected is not already turned over i.e. has it's image hidden.
        If condition 3 is satisfied then:
        3.1 The next conditional checks whether the number of cards turned over in the current selection iteration is 1; if true then:
            3.1.1 The font awesome name attribute of the first user selected and opened card, is assigned, to the array variable named 'displayedCards' and its respective deck position.
            3.1.2 If the number of cards turned over is not 1; the else statement assumes that the second card in the current selection iteration has been selected and once again steps given in 3.1.1 are repeated, but for the second card.
                   3.1.2.1 Conditional now used to check whether the cards match. For the cards to match the following 2 conditions must be satisfied:
                           (a) The card attributes i.e. icon names must match;
                           (b) The positions of the selected cards must not be the same. This check ensures that the same card is not clicked twice and hence creates a 'match'.
                    3.1.2.2 Conditional statement following on from card equality check above (3.1.2.1); if the cards do not match then they will be flipped over - move counter is incremented only if different cards are selected in current selection iteration.
                    3.1.2.3 This extra condition is used to account for the possibiliity that the user may be clicking same card 'n' number of times repeatedly. Hence in this else branch moves counter is not updated.
        3.2 Conditional loops to determine star ratings dependent on number of moves taken to complete game. 
            (a) If number of moves are between 16 and 25: 2 star rating,
            (b) If number of moves are greater than 25: 1 star rating.
            The stars are all initially activated i.e. they are all set at gold and depending on the ranking awarded as per conditions               (a) and (b) stars are made black to give either 2 star or 1 star ratings.
  
4. Conditional loop to check whether the numberOfCardsDisplayed and the shuffledCards.length parameters are equal; if yes that means the game is complete as all the cards have been matched. If condition has been satisfied then the timer variable in the runTimer() function i.e. stopwatch is stopped and the congratulations popup is activated.  
    
DEPENDENCIES

1. cardAssignmentToDeck() needs the deckHTMLLayout() function to be called as its predecessor. 
2. cardAssignmentToDeck() uses the shuffle() function to obtain a randomised deckOfCards array.
3. runTimer() function only works if a boolean value registers as false and the variable timeElapsedInSeconds is = to 0.
4. runTimer() function in turn uses the output of the timeElapsed() function.
5. timeElapsed() function uses the timeElapsedInSeconds variable (suitably incremented) as input, to process it into the form - hh:mm:ss, using the timeIntervalFormatted() function.
6. timeIntervalFormatted() function pads the time interval input (either hours, minutes or seconds) with leading zeros as and when required.
7. modalDisplayParameters() clones the score panel elements i.e. timer, moves counter, star rating counter and adds these to the congratulations pop up. 
8. The restart function in the score panel and the modal restart link both reload the html page.

    
    

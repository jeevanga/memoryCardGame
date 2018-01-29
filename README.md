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



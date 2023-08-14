const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startButton");
const startBox = document.getElementById("startBox");
const resetButton = document.getElementById("resetButton");
const resetBox = document.getElementById("endBox");
let firstCard = null;
let secondCard = null;
let correctCards = 0;
let cantClick = false;

function resetGame() {
  firstCard = null;
  secondCard = null;
  correctCards = 0;
  cantClick = false;
  shuffledColors = shuffle(COLORS);
  gameContainer.innerHTML = "";
  createDivsForColors(shuffledColors);

}


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//unflips card by changing color and removing "flipped"
//also turns cantClick off/false
function unflip(capturedFirstCard,capturedSecondCard){
            capturedFirstCard.classList.remove("flipped");
            capturedFirstCard.style.backgroundColor = "antiquewhite";
            capturedSecondCard.classList.remove("flipped");
            capturedSecondCard.style.backgroundColor = "antiquewhite";
            cantClick = false;
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let currentCard = event.target;
  console.log("you just clicked", currentCard);


  //check if card is valid spot to flip
    //it's not flipped
  if(currentCard.classList.contains("flipped")){
    return;
  }
    //cantClick is off/false
  if(cantClick){
    return;
  }

  //card is flipped
  currentCard.classList.add("flipped");
  currentCard.style.backgroundColor = currentCard.classList[0];
    
    //clicking the firstCard
    if (firstCard === null){
      firstCard = currentCard;
      
    }
    //clicking the secondCard
    else if (firstCard !== null){
      secondCard = currentCard;

      //settingColors
      let firstColor = firstCard.classList[0];
      let secondColor = secondCard.classList[0];
      console.log("firstcard: " + firstCard.classList);
      console.log("secondCard: " + secondCard.classList);

      //not a match:(
        if(firstColor !== secondColor){
          //you cant click lol
          cantClick = true;
          let capturedFirstCard = firstCard;
          let capturedSecondCard = secondCard;
          //unflips card by changing color and removing "flipped"
          //also turns cantClick off/false
          setTimeout(function(){
            unflip(capturedFirstCard,capturedSecondCard)}, 1000);
          
        }
        //its a match!!!!
        else{
          console.log("match!");
          correctCards +=2 ;
          console.log("correctCards: "  + correctCards)
          console.log(COLORS.length);
        }
        //this is still after clicking the 2 cards btw
      firstCard = null;
      
    }
    if(correctCards === COLORS.length){
      setTimeout(function(){
        endBox.style.display = "block";
      }, 100)
    }
    
    
  
}
startButton.addEventListener("click", function(){
  createDivsForColors(shuffledColors);
  startBox.style.display = "none";

});
resetButton.addEventListener("click", function(){
  resetButton.preventDefault();
  endBox.style.display = "none";
  resetGame();
  

});
// when the DOM loads


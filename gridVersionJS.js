//vars selecting colors, squares, winning color, message, buttons and h1
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var winningColor = pickColor();
var colorCode = document.querySelector("#colorCode");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var howToButton = document.querySelector("#howTo");

init();

//function containing all the startup functions
function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}
//function highlighting selected button, and deciding the right amount of
//squares depending on mode and then running the reset() function.
function setUpModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			for (var i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			//this.textContent === "EASY" ? numSquares = 3: numSquares = 6; use if only two 
			if(this.textContent === "EASY"){
				numSquares = 3;
			}else if (this.textContent === "MEDIUM"){
				numSquares = 6;
			}else if (this.textContent === "HARD"){
				numSquares = 9;
			}else if (this.textContent === "SUPER"){
				numSquares = 20;
			}else if (this.textContent === "MEGA"){
				numSquares = 36;
			}else
				numSquares = 100;
			reset();
		});
	};
};
//function setting the selected colors to the squares. the click function on the squares selects the clicked square and compares the color on the
//square with the selected winningColor. If there is a match the changeColor function runs to turn all the squares to the winning color.
//The message text changes to "correct" and the resetButtons text changes to "play again?"
function setUpSquares(){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click",function(){
			clickedColor = this.style.backgroundColor;
			if(clickedColor === winningColor){
				console.log(clickedColor,winningColor + "winner");
				message.textContent = "Correct!";
				resetButton.textContent = "Play again?";
				changeColor(clickedColor);
			} else { 
				console.log(clickedColor,winningColor + "no");
				this.style.backgroundColor = "#232323";
				message.textContent = "Try again";
			}
		});
	};
};
//reset function that will generate random colors, pick a winning color, change message
//change resetButtons text and a forloop that will select all squares and assign them a 
//random color. Since there are nine squares the rest of the squares will be set
//on display none if the mode is easy or hard (decided by numSquares) 
function reset(){
	colors = generateRandomColors(numSquares);
	winningColor = pickColor();
	colorCode.textContent = winningColor;
	resetButton.textContent = "New Colors";
	message.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "rgb(115,115,115)";
}
//reset button that will reset using the reset() function and then set the h1 to the starting color.
resetButton.addEventListener("click", function(){
	reset();
});
//Sets the colorcode in the h1 to the winningColor, i.e. the colorcode people are going to try to decipher.
colorCode.textContent = winningColor;

//function that changes the color of all the squares in play to the winning color when it is chosen. 
//the if/else is there so there is only six squares displayed the first time you win (otherwise all nine are shown).
function changeColor(color){
		for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = color;
			h1.style.backgroundColor = color;
		}else{
			squares[i].style.display = "none";
		}
	}
}
//function that generates random numbers and returns a random color code.
function randomColor(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
};
//function that takes the random color codes created in randomColor() and saves them in an array.
function generateRandomColors(num){
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}
//function that pick the winning color by randomly picks a number from the length of the colors.
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

howTo.addEventListener("click", function(){
	alert("RGB stands for red, green and blue and can range from 0-255. All 255 = white, all 0 = black. All equal, different shades of gray. Try to remember the RGB color wheel from preschool and take a guess.")

});


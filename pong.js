// Samel Benison - sambenison66@gmail.com

// Initializing Variables
var canvas, gamePaddle, gameBall;
var play=0;
var mouse = {};
var padX, padY, ballX, ballY;
var vx, vy;
var loopInterval = 0;
var newPaddleY;

// OnLoad method called from Body element
function initialize() {
	//Retrieving the element id and storing it in a variable
    court = document.getElementById('court');
    paddle = document.getElementById('paddle');
    ball = document.getElementById('ball');

    // Retrieve and Store Paddle index values
    padX = paddle.offsetLeft;
    padY = paddle.offsetTop;

    // Retrieve and Store Ball index values
    ballX = ball.offsetLeft;
    ballY = ball.offsetTop;

    // Generate some random speed between 2 and 3 for x and y axis
    vx = Math.floor((Math.random()*(3-2+1))+2);
    vy = Math.floor((Math.random()*(3-2+1))+2);
    //vy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
}

// This function is called from the html when the mouse is moved inside the court
function movePaddle(e)
{
	// Finding the new paddle value
   newPaddleY = (e.pageY - paddle.offsetHeight/2);
   
   if(newPaddleY > (court.offsetHeight - paddle.offsetHeight))
      newPaddleY = (court.offsetHeight - paddle.offsetHeight);

  	// Sending the new paddle value back to paddle
	paddle.style.top = newPaddleY + 'px';
}


// This function is executed when click action happens in the court
function startGame(e) {
	var checked=0;

var radios1 = document.getElementsByName('speed');
	for (var i = 0, length = radios1.length; i < length; i++) {
		if (radios1[i].checked) {
		++checked;  // Validation whether a radio button is checked or not
		}	
   }

 if(checked>0){  // If checked, start the game
   play=play+1;
    
      startAnimation();  
    
 }
 else
	alert("Please select a speed");  // If not checked, alert the user
}

// Function to Reset the score 
function resetCounter(){
element = document.getElementById("message");
	
	element.innerHTML=0;
}

// Function to change the speed
function setSpeed(option) {
  if(option == 0) {
	if(vx<0)
		vx = -Math.floor((Math.random()*(3-1+1))+1);
	else
		vx = Math.floor((Math.random()*(3-1+1))+1);
    if(vy<0)
		vy = -Math.floor((Math.random()*(3-1+1))+1);
	else
		vy = Math.floor((Math.random()*(3-1+1))+1);
  } else if(option == 1) {
		if(vx<0)
			vx = -Math.floor((Math.random()*(6-4+1))+4);
		else
			vx = Math.floor((Math.random()*(6-4+1))+4);
		if(vy<0)
			vy = -Math.floor((Math.random()*(6-4+1))+4);
		else
			vy = Math.floor((Math.random()*(6-4+1))+4);
  } else if(option == 2) {
		if(vx<0)
			vx = -Math.floor((Math.random()*(12-8+1))+8);
		else
			vx = Math.floor((Math.random()*(12-8+1))+8);
		if(vy<0)
			vy = -Math.floor((Math.random()*(12-8+1))+8);
		else
			vy = Math.floor((Math.random()*(12-8+1))+8);
  }
}

// Main function which will start the animation
function startAnimation()
{
   	loopInterval = setInterval('mainLoop()', 10);  
}

// Recurring Loop function which is called everytime
function mainLoop() {

  ballX += vx;
  ballY += vy;
  /*var top_x = ballX - 10;
  var top_y = ballY - 10;
  var bottom_x = ballX + 10;
  var bottom_y = ballY + 10;*/

  if((ballX + ball.offsetWidth) < 40) { // hitting the left wall
    vx = -vx;
  } else if((ballY + ball.offsetHeight) > court.offsetHeight) { // hitting the bottom wall
     vy = -vy;
  } else if((ballY + ball.offsetHeight) < 50) { // hitting the top wall
    vy = -vy;
  } /*else if(this.x + 5 > 1100) { // hitting the bottom wall
     this.x_speed = -this.x_speed;
  }*/


  if(ballX > 1050) { // a point was scored
    //alert("point is scored");
    clearInterval(loopInterval);
    vx = Math.floor((Math.random()*(6-2+1))+2);
    vy = Math.floor((Math.random()*(6-2+1))+2);
	vy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    ballX = 2//Math.floor((Math.random()*500)+1);     // Reseting the ball position
    ballY = 350;
	element = document.getElementById("message");  // Updating the score
	var count=parseInt(element.innerText);
	count=count+1;
	element.innerHTML=count;
	play=2;
	
	//Below code is to set speed when game begins again
	var radios = document.getElementsByName('speed');

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			// checked radio action
			//alert(radios[i].value);
			setSpeed(radios[i].value);
			// only one radio can be logically checked, other's should not be checked
			break;
		}
	}
  }

  	// Action to hit the ball with the paddle move
   if((ballX + ball.offsetWidth) > (paddle.offsetLeft))
   {
     if (((ballY +ball.offsetHeight) > newPaddleY) && (ballY < (newPaddleY + paddle.offsetHeight))) {
       vx = -vx;
      //ballX += vx;
	}
  }

  	// Updating the new position into ball
   ball.style.left = ballX + 'px';
   ball.style.top = ballY + 'px';

}
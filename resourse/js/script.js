const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

const scale = 20;
const rows = canvas.height / scale;//500 / 20=> 25-row
const columns = canvas.width / scale; //500 / 20=> 25-colums


let snake = [];

snake[0]= {
  x : (Math.floor(Math.random() *
    columns)) * scale, //.random()=> ke 0 - 9 yalu random number leyito yemiyawota // foodu keteleyaye bota lay endijemir
  y : (Math.floor(Math.random() *
    rows)) * scale
};
console.log(snake);
	
let food = {
  x : (Math.floor(Math.random() *
    columns)) * scale, 
  y : (Math.floor(Math.random() *
    rows)) * scale
}

let d = "right";

// Use the keyboard keys to control the direction of the snake 
document.onkeydown = direction;//mangnawum key sineka direction yemilewun function tiralegni

function direction(event){
  let key = event.keyCode;// kutrochu ye key bordu fidelochi/miliktochi kutir nw
  if( key == 37 && d != "right"){
      d = "left"; //!= "right"=> wode kegni eyehede wode gira memeles yelebetim
  }else if(key == 38 && d != "down"){
      d = "up";
  }else if(key == 39 && d != "left"){
      d = "right";
  }else if(key == 40 && d != "up"){
      d = "down";
  }
}

// call our draw function every 100 ms// 10 se
let playGame = setInterval(draw,250); // draw yemilewun function lemetirat ena fitinetun lemasitekakell

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draw snake 
	for (let i=0; i<snake.length; i++) {
		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "red";
	  ctx.fillRect(snake[i].x,
	    snake[i].y, scale, scale);
      ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);  

  // Draw circle for each segment
  ctx.beginPath();
  ctx.arc(snake[i].x + scale / 2, snake[i].y + scale / 2, scale / 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
	}

// Draw food 
ctx.fillStyle = "#ff0";// fillStyle=> ye rectanglu coulor
ctx.strokeStyle = "green";// border lemesal
ctx.fillRect(food.x, food.y, scale, scale);// rectanglun lemesal
ctx.strokeRect(food.x, food.y,scale,scale); // borderun lemesal

// old head position
let snakeX = snake[0].x;
let snakeY = snake[0].y;
console.log(snakeX);
// which direction
if( d == "left") snakeX -= scale;
if( d == "up") snakeY -= scale;
if( d == "right") snakeX += scale;
if( d == "down") snakeY += scale;

if (snakeX > canvas.width) {
  snakeX = 0;
}
if (snakeY > canvas.height) {
  snakeY = 0;
}
if (snakeX < 0) {
  snakeX = canvas.width;
}
if (snakeY < 0) {
  snakeY = canvas.height;
}


 // if the snake eats the food, it grows 
if(snakeX == food.x && snakeY == food.y){
  food = {
      x : (Math.floor(Math.random() * columns)) * scale,
      y : (Math.floor(Math.random() * rows)) * scale
  }
  // we don't remove the tail
}else{
  // remove the tail
  snake.pop();
}
console.log(snake);

//snaku kerasu gar ketegache/erasun kebela chewatawu enidikuwaret
// New head position 
let newHead = {
  x : snakeX,
  y : snakeY
}

if(eatSelf(newHead,snake)){
  clearInterval(playGame);
}
snake.unshift(newHead);
}

// check if snake is eating itself 
function eatSelf(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}


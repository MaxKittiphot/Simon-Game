let colours = ["green", "red", "yellow", "blue"];
let gamePattern
let playerPattern
let level;
let isGameStart =false;
let count;


$(document).keypress(()=>{
  if(!isGameStart){
      level = 1;
      gamePattern = [];
      playerPattern = [];
      isGameStart = true;
      addPattern();
  }
})

$(document).on({ 'touchstart' : function(){
  if(!isGameStart){
      level = 1;
      gamePattern = [];
      playerPattern = [];
      isGameStart = true;
      addPattern();
  }
} });

function addPattern(){
  $("#level-title").text("Level "+level);
  let randomColour =  colours[Math.floor(Math.random()*4)];
  gamePattern.push(randomColour);
  $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColour);
  playerPattern = [];
  count = 0;
  console.log(gamePattern);
}

$(".btn").click(function () {
  let clickedColour = $(this).attr("id");
  animatePressButton(clickedColour);
  playSound(clickedColour);
  playerPattern.push(clickedColour);
  console.log(playerPattern);
  console.log(count);
  checkPattern();
})

function checkPattern(){
  if(gamePattern[count]===playerPattern[count]){
    count++;
    if(gamePattern.length===count){
      level++
      setTimeout(()=>{addPattern();},1000);
    }
  }else{
    wrongPattern();
  }
}

function wrongPattern(){
  playSound("wrong");
  $("#level-title").text("Game Over Press Any Key to Continue");
  $("body").addClass("game-over");
  setTimeout(()=>{$("body").removeClass("game-over")},200);
  isGameStart = false;
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePressButton(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function () {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

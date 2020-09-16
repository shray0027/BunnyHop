var differentButtons =["first","second","third","sixth","fourth","fifth"];

var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level =0 ;

$(document).keypress(function(){
  if(!started){
    $(".instructions").html("<h2 class= 'level-title'>LEVEL - "+level+"</h2>");

    $(".btn").html("");
    nextSequence();
    started=true;
    }
});

$(".start").click(function(){
  if(!started){
    $(".instructions").html("<h2 class= 'level-title'>LEVEL - "+level+"</h2>");
    $(".btn").html("");
    nextSequence();
    started=true;
    }
});

$(".btn").click(function() {

  var userChosenButton = $(this).attr("id");
  userClickedPattern.push(userChosenButton);

  playSound(userChosenButton);
  animatePress(userChosenButton);

  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");

    $(".instructions").html("<h1 style ='font-size : 3rem; '>Game Over!!</h1>");

    setTimeout(function(){
     $(".instructions").html(" <h2 class='level-title'>Press Any Key to Start</h2> <hr><h3>Instruction.</h3>  <p>The Game is simple , Find out the pattern as the bunny hops out and tell us which holes did he came out .<br>Suppose in level 1 he came out of hole 1 , you will click hole1.<br>In the next round he came out of hole 3 , you will click hole 1 -> hole 3.</p>");
   },2000);
   setTimeout(function(){
    $(".btn").html("<img src='images/bugs-bunny.png' class='imgr'>");
  },2000);

   $("body").addClass("game-over");

   setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

   startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];   // "<h1 style ='font-size : 7rem; '>level - "+level+"</h1>"
    level+=1;
    $(".instructions").html( "<h1 style ='font-size : 3rem; '>level - "+level+"</h1>");

var randomNumber = Math.floor(Math.random()*6);
var randomChosenButton = differentButtons[randomNumber];
gamePattern.push(randomChosenButton);

$("."+randomChosenButton).html("<img class='imgr' src='./images/bugs-bunny.png'>");
playSound("bunny");
setTimeout(function(){
  $("."+randomChosenButton).html("");
},300);
}


function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver(){
  started=false;
  level =0;
  gamePattern = [];
}

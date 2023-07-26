var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userPattern=[];
var started= false;
var level=0;

$(document).keypress(function(){
      if(!started){
            $("#level-title").text("Level "+level);
            nextSequence();
            started= true;
      }
});


$(".btn").click(function(){
      var userColour= $(this).attr("id");
      userPattern.push(userColour);
      playSound(userColour);
      animatePress(userColour);
      checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
      if (userPattern[currentLevel] === gamePattern[currentLevel]){
            if (userPattern.length === gamePattern.length){
                  setTimeout(function(){
                        nextSequence();
                  }, 1000);
            }
      }
      else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function (){
                  $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
      }
}

function startOver(){
      level = 0;
      gamePattern = [];
      started = false;
}

function nextSequence(){
      userPattern=[];

      level++;
      $("#level-title").text("Level "+level);

      var randomNum= Math.floor(Math.random()*4);
      var randomColour= buttonColours[randomNum];
      gamePattern.push(randomColour);
      $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomColour);

}

function playSound(name){
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
}

function animatePress(currentColour){
      $("#"+currentColour).addClass("pressed");
      setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
      }, 100);
}

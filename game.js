var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var buttonColours = ["red","blue","green","yellow"];

$("body").keydown(function(){
    if(started===false){

        $("#level-title").text("Level 0");
        nextSequence();

    }
    started = true;
})


$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});



function nextSequence(){

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level += 1;
    $("#level-title").text("Level "+level);
}

function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length=== gamePattern.length){
            console.log("Finish");
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startover();
    }
}


function startover(){
    gamePattern = [];

    started = false;

    level = 0;
}
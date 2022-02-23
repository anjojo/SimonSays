var btnColors = ["red", "green", "blue", "yellow"];
var btnSounds = {"red":"red.mp3", "green": "green.mp3", "blue": "blue.mp3", "yellow": "yellow.mp3"}
var allBtns = $("button");

var gamePattern = [];
var userPattern = [];
var index = 0;
var score = 0;


// Add Colors to Buttons
for (let i=0; i < btnColors.length; i++) {
    $(allBtns[i]).css("background-color", btnColors[i]);
}

// Listen to KeyPress

function start() {
    $(document).on("keypress",function(e) {
        if (e.key == 's') {
            $(document).off("keypress")
            // Change h1 tag and Go to nextLevel
            $("h1").text("Level " + (index + 1))
            nextLevel()
        }
    })
}
start()

// Next Level Function
function nextLevel () {
    // Clear User Pattern and Index
    userPattern.length = 0;
    index = 0;

    // Choose random color and Play audio
    // var ran
    var randomClr = allBtns[Math.floor(Math.random()*allBtns.length)];
    // $(randomClr).hide().fadeIn("fast");

    // let clrAudio = new Audio("sounds/" + btnSounds[$(randomClr).attr("name")]);
    // clrAudio.play();

    // Append color to list and enable click 
    gamePattern.push($(randomClr).attr("name"));
  
    function loopThroughPattern(gamePattern) {
        for (var i = 0; i < gamePattern.length; i++) {
            // for each iteration console.log a word
            // and make a pause after it
            (function (i) {
                setTimeout(function () {
                    $("[name=" + gamePattern[i] +"]").hide().fadeIn("fast");
                    let clrAudio = new Audio("sounds/" + btnSounds[gamePattern[i]]);
                    clrAudio.play();
                }, 500 * i);
            })(i);
        };
        enableClick()  
    }
    loopThroughPattern(gamePattern);
}

// Detect Button Clicks

function enableClick() {

    $("button").on("click", function() {
        // Animate Clicks
        $(this).addClass("clicked");
        setTimeout(function() {$("button").removeClass('clicked')}, 100);
    
        // Check Clicks
        var clickedClr = $(this).attr("name");
        let clrAudio = new Audio("sounds/" + btnSounds[clickedClr]);
        clrAudio.play();
    
        if (userPattern.length < gamePattern.length) {
            
            if (clickedClr == gamePattern[index]) {
                index++;
                userPattern.push(clickedClr);
    
                if (userPattern.length == gamePattern.length) {
                    // Change h1 tag and Go to nextLevel
                    $("h1").text("Level " + (index + 1));
                    $("button").off("click");
                    score++;
                    setTimeout(nextLevel, 1000);
                }
            } else {
                gameOver()
            }
        }
    })
}


// Gameover
function gameOver() {
    // Display Score 
    $("h2").text("Score: " + score + " pts.")


    // Restart Global Variables
    userPattern.length = 0;
    gamePattern.length = 0;
    index = 0;
    score = 0;

    // Change Text and enable to Start again
    $("h1").text("Gameover! Press the 's' key to restart.");
    start();

    // Change body background
    
    $("body").css("background-color", "red");
    let clrAudio = new Audio("sounds/wrong.mp3");
    clrAudio.play();
    setTimeout(() => {
        $("body").css("background-color", "rgb(0, 28, 53)");
    }, 100);
}


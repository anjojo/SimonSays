var btnColors = ["red", "green", "blue", "yellow"];
var btnSounds = {"red":"red.mp3", "green": "green.mp3", "blue": "blue.mp3", "yellow": "yellow.mp3"}
var allBtns = $("button");

var gamePattern = [];
var userPattern = [];
var index = 0;
var score = 19;
var difficult = 500;

// Hide Image
$("img").hide()

// Add Colors to Buttons
for (let i=0; i < btnColors.length; i++) {
    $(allBtns[i]).css("background-color", btnColors[i]);
}

// Listen to KeyPress

function start() {
    $("h1").on("click",function(e) {
        $("body").css("background-color", "rgb(0, 28, 53)");
        $("h1").off("click");
        $("h2").text("")
        // Change h1 tag and Go to nextLevel
        $("h1").text("Level " + (index + 1));
        nextLevel()
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
   
    // Append color to list and enable click 
    gamePattern.push($(randomClr).attr("name"));

    if (score > 6) {
        difficult = 300;
    } else if (score > 10) {
        difficult = 250;
    } else if (score > 15) {
        difficult = 200;
    };
    

    function loopThroughPattern(gamePattern) {
        for (var i = 0; i < gamePattern.length; i++) {
            // for each iteration console.log a word
            // and make a pause after it
            (function (i) {
                setTimeout(function () {
                    $("[name=" + gamePattern[i] +"]").hide().fadeIn("fast");
                    let clrAudio = new Audio("sounds/" + btnSounds[gamePattern[i]]);
                    clrAudio.play();
                }, difficult * i);
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
                    if (score == 20) {
                        youWon();
                    } else {
                        setTimeout(nextLevel, 700);
                    }
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
    $("h1").text("Gameover! Click me to restart.");
    start();

    // Change body background
    
    $("body").css("background-color", "red");
    let clrAudio = new Audio("sounds/wrong.mp3");
    clrAudio.play();
    setTimeout(() => {
        $("body").css("background-color", "rgb(0, 28, 53)");
    }, 100);
}


function youWon() {

    // Restart Global Variables
    userPattern.length = 0;
    gamePattern.length = 0;
    index = 0;
    score = 0;

    // Change Text and enable to Start again
    // $("h1").text("🎉🎉Congratulations You Win!🎉🎉");
    var splittedText = "🎉🎉Congratulations You Win!🎉🎉".split("");
    console.log(splittedText)

    function loopThroughSplittedText(splittedText) {
        var word = ""
        for (var i = 0; i < splittedText.length; i++) {
            // for each iteration console.log a word
            // and make a pause after it
            (function (i) {
                setTimeout(function () {
                    word += splittedText[i];
                    $('h1').text(word);
                    console.log(splittedText[i]);
                }, 300 * i);
            })(i);
        };
    }
    loopThroughSplittedText(splittedText);

    // Change body background
    
    $("body").css("background-color", "lightgreen");
    $(".box-container").hide();
    $("img").show();
    let clrAudio = new Audio("sounds/win.mp3");
    let scndAudio = new Audio("sounds/clap.mp3");
    clrAudio.play();
    scndAudio.play();

}

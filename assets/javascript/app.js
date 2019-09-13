// Andre Pseudocode! Clap!
// Create and array of questions
// Have a start button begin a quiz from those questions
// Have a timer set and go through the questions 1 at a time
// Have the questions and choices shown
// Display if the answer was correct or wrong with a gif
// Show how many questions in total with how many is left
// Show how many correct out of the total
// Have a restart button after questions are complete

// this is where the global variables are stored

var counter = 30;
var currentQuestion = 0;
var score = 0;
var wrong = 0;
var timer;

// this function shows the next question that will be displayed

function nextQuestion() {
    var questionsComplete = (quizQuestions.length - 1) === currentQuestion;
    if (questionsComplete) {
        showResult();
        // console.log("Game over!!!");
    }
    else {
        currentQuestion++;
        loadQuestion();
    }

}

// the function for when the player runs out of time, which will also count as a lost

function timeUp() {
    clearInterval(timer);
    wrong++;
    loadImages("lost");
    setTimeout(nextQuestion, 6 * 1000);
}

// a function that will execute and display the countdown

function countDown() {
    counter--;
    $("#time").html("Time remaining: " + counter);
    if (counter === 0) {
        timeUp();
    }
}

// this function will load the questions through jQuery also giving a set interval for all questions with a 1 second interval

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);
    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;
    $("#time").html("Time remaining: " + counter)
    $("#game").html(`
    <h4>${question}</h4>
    <p>${listChoices(choices)}</p>
    <p class="py-4">${showRemainingQuestions()}</p>
    `);
}

// this function shows the array of answers and specifies which answer they choose an attribute
function listChoices(choices) {
    var result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`

    }
    return result;
}

// this captures a players clicked answer, and adds a win or lose depending on their choice, also giving a interval to show whether they are correct or wrong

$(document).on("click", ".choice", function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr("data-answer");
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        loadImages("win");
        setTimeout(nextQuestion, 5 * 1000);
        // console.log("WINNER WINNER CHICKEN DINNER!");
    }
    else {
        wrong++;
        loadImages("wrong");
        setTimeout(nextQuestion, 5 * 1000);
        // console.log("You'll get there");
    }
    // console.log(selectedAnswer);
});

// display results at the end of the game

function showResult() {
    var result = `
    <p>You got ${score} question's correct</p>
    <p>You missed ${wrong} question's</p>
    <p>Total question's ${quizQuestions.length}</p>
    <button class="btn btn-success" id="reset">Reset Game</button>
    `;
    $("#game").html(result);
}

// reset the game if player decides to take it again after completed

$(document).on("click", "#reset", function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    timer = null;

    loadQuestion();
    //  console.log("test");
});

// allow player to see how many questions in total with how many left

function showRemainingQuestions() {
    var remianingQuestions = quizQuestions.length - (currentQuestion + 1);
    var totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remianingQuestions}/${totalQuestion}`
}

// displays the images for win or loss

function randomImage(images) {
    var random = Math.floor(Math.random() * images.length);
    var randomImage = images[random];
    return randomImage;

}

// displays the text for win or lose between question

function loadImages(status) {
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === "win") {
        $("#game").html(`
        <p class="preload-image">Congratulations! You picked the correct answer!!</p>
        <p class="preload-image">The correct answer is ${correctAnswer}</p>
        <img  class="py-4" src="${randomImage(winImages)}" />
        `);
    }
    else {
        $("#game").html(`
        <p class="preload-image">Awww Shucks the correct answer was ${correctAnswer}</p>
        <p class="preload-image">Better luck on the next one!</p>
        <img  class="py-4" src="${randomImage(wrongImages)}" />
        `);
    }
}

// calls up the game when a play is ready, and removing the start button after they start

$("#start").click(function() {
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
});
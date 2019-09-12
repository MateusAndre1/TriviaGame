// Andre Pseudocode! Clap!
// Create and array of questions
// Have a start button begin a quiz from those questions
// Have a timer set and go through the questions 1 at a time
// Have the questions and choices shown
// Display if the answer was correct or wrong with a gif
// Show how many questions in total with how many is left
// Show how many correct out of the total
// Have a restart button after questions are complete

var counter = 30;
var currentQuestion = 0;
var score = 0;
var wrong = 0;
var timer;

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

function timeUp() {
    clearInterval(timer);
    wrong++;
    loadImages("lost");
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;
    $("#time").html("Timer: " + counter);
    if (counter === 0) {
        timeUp();
    }
}

function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);
    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;
    $("#time").html("Timer: " + counter)
    $("#game").html(`
    <h4>${question}</h4>
    <p>${listChoices(choices)}</p>
    ${showRemainingQuestions()}
    `);
}
function listChoices(choices) {
    var result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`

    }
    return result;
}

$(document).on("click", ".choice", function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr("data-answer");
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        loadImages("win");
        setTimeout(nextQuestion, 3 * 1000);
        // console.log("WINNER WINNER CHICKEN DINNER!");
    }
    else {
        wrong++;
        loadImages("wrong");
        setTimeout(nextQuestion, 3 * 1000);
        // console.log("You'll get there");
    }
    // console.log(selectedAnswer);
});

function showResult() {
    var result = `
    <p>You got ${score} question's correct</p>
    <p>You missed ${wrong} question's</p>
    <p>Total question's ${quizQuestions.length}</p>
    <button class="btn btn-success" id="reset">Reset Game</button>
    `;
    $("#game").html(result);
}
$(document).on("click", "#reset", function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    timer = null;

    loadQuestion();
    //  console.log("test");
});

function showRemainingQuestions() {
    var remianingQuestions = quizQuestions.length - (currentQuestion + 1);
    var totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remianingQuestions}/${totalQuestion}`
}
function loadImages(status) {
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === "win") {
        $("#game").html(`
        <p class="preload-image">Congratulations! You picked the correct answer!!</p>
        <p class="preload-image">The correct answer is ${correctAnswer}</p>
        `);
    }
    else {
        $("#game").html(`
        <p class="preload-image">Awww Shucks the correct answer was ${correctAnswer}</p>
        <p class="preload-image">Better luck on the next one!</p>
        `);
    }
}

loadQuestion();
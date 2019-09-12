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
var currentQuestion = 4;
var score = 0;
var wrong = 0;
var timer;

function loadQuestion () {

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;
    $("#time").html("Timer: " + counter)
    $("#game").html(`
    <h4>${question}</h4>
    <p>${listChoices(choices)}</p>
    `);
}
function listChoices(choices) {
    var result = "";
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`
        
    }
    return result;
}
loadQuestion();
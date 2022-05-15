var currentQuestionIndex = 0;
var timer = 180;
var timerInterval;
var questions = [
    {
        question: "Commonly used datatypes DO NOT include",
        choices: [
            "String",
            "Boolean",
            "Alerts",
            "Numbers",
        ],
        answer: "Alerts", //correct answer
    },

    {
        question: "The condition statement if/else is enclosed with",
        choices: [
            "Parentheses",
            "Curly Brackets",
            "Quotes",
            "Square Brackets",
        ],
        answer: "Curly Brackets", 
    },
    {
        question: "Javascript is a case sensitive language",
        choices: [
            "True",
            "False",
            
        ],
        answer: "True",
    },
    {
        question: "Which of the following type of variable is visible only within a function where it is defined?",
        choices: [
            "Global Variable",
            "Local Variable",
            "Both of the Above",
            "None of the Above",
        ],
        answer: "Local Variable",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: [
            "<javascript>",
            "<scripting>",
            "<js>",
            "<script>",
        ],
        answer: "<script>"
    },
    {}
]


var startQuizButton = document.getElementById("start-quiz-button");
var startScreen = document.getElementById("start-screen");
var questionsScreen = document.getElementById("questions-screen");
var questionText = document.getElementById("question-text");
var choicesContainer = document.getElementById("choices-container");
var highScoresScreen = document.getElementById("highscores-screen");
var timerSpan = document.getElementById("timer");

function startQuiz() {
    startScreen.classList.add("hidden");
    timerSpan.textContent = timer;
    displayQuestion();
}

function startTime() {
    timerInterval => setInterval(() => {
        timer--;

        if (timer > 0) {
            timerSpan.textContent = timer;
        }
        if (timer <= 0) { 
            endQuiz();
        }
    }, 1000);
}
questionText.textContent = questions[currentQuestionIndex].question;

var choices = questions[currentQuestionIndex].choices;

for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    var choiceElementButton = document.createElement("button");
    choiceElementButton.textContent = choice;
    choiceElementButton.addEventListener("click", checkAnswer);
    choicesContainer.appendChild(choiceElementButton);

}


function displayQuestion() {
    questionText.textContent = questions[currentQuestionIndex].question;

    var choices = questions[currentQuestionIndex].choices;

    choicesContainer.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        var choiceElementButton = document.createElement("button");
        choiceElementButton.textContent = choice;
        choiceElementButton.addEventListener("click", checkAnswer);
        choicesContainer.appendChild(choiceElementButton);

    }

}

function checkAnswer(event) {
    var choiceClicked = event.target;
    var currentQuestion = questions[currentQuestionIndex];
    var isCorrect = choiceClicked.innerText === currentQuestion.answer;

    if (!isCorrect) {
        timer = timer - 10;
    }
    currentQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();

    }
    else {
        endQuiz();
    }

}

function endQuiz() {
    console.log(endQuiz);
    clearInterval(timerInterval);
    questionsScreen.classList.add("hidden");
    highScoresScreen.classList.remove("hidden");
}



startQuizButton.addEventListener("click", function () {
    console.log("start quiz")

    //show first question

    startQuiz();

    //start timer, display time left
});

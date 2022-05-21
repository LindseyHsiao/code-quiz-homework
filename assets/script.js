

var currentQuestionIndex = 0;
var timer = 108;
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
    }
]


var startQuizButton = document.getElementById("start-quiz-button");
var startScreen = document.getElementById("start-screen");
var questionsScreen = document.getElementById("questions-screen");
var questionText = document.getElementById("question-text");
var choicesContainer = document.getElementById("choices-container");
var highScoresScreen = document.getElementById("highscores-screen");
var timerSpan = document.getElementById("timer");
var finalScore = document.getElementById("final-score");
var submitScoreBtn = document.getElementById("submit-btn");
var timerInterval;
var scoreBoardScreen = document.getElementById("score-board-screen");
var scoreBoard = document.getElementById("score-board");

function startQuiz() {
    startScreen.classList.add("hidden");
    questionsScreen.classList.remove('hidden');
    timerSpan.textContent = timer;
    startTime();
    displayQuestion();
}

function startTime() {
    timerInterval = setInterval(() => {
        timer--;

        if (timer > 0) {
            timerSpan.textContent = timer;
        }
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);
}

// questionText.textContent = questions[currentQuestionIndex].question;

// var choices = questions[currentQuestionIndex].choices;

// for (let i = 0; i < choices.length; i++) {
//     const choice = choices[i];
//     var choiceElementButton = document.createElement("button");
//     choiceElementButton.textContent = choice;
//     choiceElementButton.addEventListener("click", checkAnswer);
//     choicesContainer.appendChild(choiceElementButton);

// }


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
        timerSpan.textContent = timer;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {

        endQuiz();
    }
    else {
        displayQuestion();
    }

}

function endQuiz() {
    console.log(endQuiz);
    clearInterval(timerInterval);
    questionsScreen.classList.add("hidden");
    highScoresScreen.classList.remove("hidden");
    finalScore.textContent = timer;
}

function saveScore() {
    // capture content of initials input
    var initials = document.getElementById("initials").value;

    //create an empty array to store our high scores

    var highScores = [];
    var local = JSON.parse(localStorage.getItem("highScores"));
    // if (local != null) {
    //     highScores.append(local);

    // }

    // create and object that will store your score and intitals together
    var userScore = {
        initials: initials,
        score: timer
    };

    //add the userScore to the highScores array
    highScores.push(userScore); 
    console.log(highScores);

    // save the data into local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    //show scores
    console.log("stored to local")
    displayScoreBoard();
}

function displayScoreBoard() {
    highScoresScreen.classList.add("hidden");
    scoreBoardScreen.classList.remove('hidden');
    var ulEl = document.getElementById("score-board");
    var liEl = document.createElement("li");
    var getStorage = JSON.parse(localStorage.getItem("highScores"));
console.log(getStorage);
    for (var i=0; i < getStorage.length; i++) {
        liEl.setAttribute("class", "score");
        console.log([i]);
        liEl.innerHTML = getStorage[i].initials+": "+getStorage[i].score;
        ulEl.append(liEl);

    }
}


startQuizButton.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", saveScore);

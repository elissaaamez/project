const questions = [
    {
        question: "What does var in JavaScript do?",
        answers: [
            { text: "Declares a variable", correct: true },
            { text: "Creates a function", correct: false },
            { text: "Starts a loop", correct: false },
            { text: "Defines a constant", correct: false },
        ],
    },
    {
        question: "What will typeof null return?",
        answers: [
            { text: "null", correct: false },
            { text: "object", correct: true },
            { text: "undefined", correct: false },
            { text: "boolean", correct: false },
        ],
    },
    {
        question: "Which statement is used to stop or exit a loop?",
        answers: [
            { text: "exit", correct: false },
            { text: "return", correct: false },
            { text: "break", correct: true },
            { text: "stop", correct: false },
        ],
    },
    {
        question: "Which method is used to remove the last element from an array?",
        answers: [
            { text: "shift()", correct: false },
            { text: "splice()", correct: false },
            { text: "remove()", correct: false },
            { text: "pop()", correct: true },
        ],
    },
    {
        question: "What does console.log() do in JavaScript?",
        answers: [
            { text: "Prints messages to the console", correct: true },
            { text: "Runs the script", correct: false },
            { text: "Logs out of the browser", correct: false },
            { text: "Stops the script", correct: false },
        ],
    },
    {
        question: "Which of the following is a valid way to create a function in JavaScript?",
        answers: [
            { text: "const myFunction = () => { }", correct: false },
            { text: "All of the above", correct: true },
            { text: "let myFunction = function() { }", correct: false },
            { text: "function myFunction() { }", correct: false },
        ],
    },
    {
        question: "What is the correct way to write an if statement in JavaScript?",
        answers: [
            { text: "if x = 5 then { }", correct: false },
            { text: "if x == 5 then { }", correct: false },
            { text: "if (x == 5) { }", correct: true },
            { text: "if x = 5 { }", correct: false },
        ],
    },
    {
        question: "What is the difference between map() and forEach() in JavaScript?",
        answers: [
            { text: " map() modifies the original array, forEach() does not.", correct: false },
            { text: "forEach() returns a new array, map() does not.", correct: false },
            { text: "Both return new arrays.", correct: false },
            { text: "map() returns a new array, forEach() does not", correct: true },
        ],
    },
    {
        question: "Which of the following is NOT a valid JavaScript loop?",
        answers: [
            { text: "foreach", correct: true },
            { text: "for", correct: false },
            { text: "while", correct: false },
            { text: "do...while", correct: false },
        ],
    },
    {
        question: "What is the difference between call() and apply() in JavaScript?",
        answers: [
            { text: "call() allows passing arguments as an array, apply() does not.", correct: false },
            { text: "apply() allows passing arguments as an array, call() does not.", correct: true },
            { text: "apply() is for asynchronous calls, call() is for synchronous calls.", correct: false },
            { text: "Both are identical.", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentquestionIndex = 0;
let score = 0;

function startquiz() {
    currentquestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentquestionIndex];
    let questionNo = currentquestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleNextButton() {
    if (currentquestionIndex < questions.length - 1) {
        currentquestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", handleNextButton);

startquiz();
const quiz_list = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", isCorrect: false },
            { text: "Indian Ocean", isCorrect: false },
            { text: "Arctic Ocean", isCorrect: false },
            { text: "Pacific Ocean", isCorrect: true }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", isCorrect: true },
            { text: "Jane Austen", isCorrect: false },
            { text: "Mark Twain", isCorrect: false },
            { text: "J.K. Rowling", isCorrect: false }
        ]
    }
];


let questionElement = document.getElementById("question");
let answer_buttons = document.getElementById("answer-buttons");
let next_button = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

startQuiz();

function showQuestion() {
    resetState();
    let currentQuestion = quiz_list[currentQuestionIndex];
    let currentQuestionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let answer_button = document.createElement("button");
        answer_button.classList.add("btn")
        answer_button.innerHTML = answer.text;
        answer_button.dataset.isCorrect = answer.isCorrect;
        answer_button.addEventListener('click', handleClickAnswer);
        answer_buttons.appendChild(answer_button);
    });
}

function resetState() {
    next_button.style.display = "none";
    while (answer_buttons.firstChild) {
        answer_buttons.firstChild.remove();
    }
}

function handleClickAnswer(e) {
    let buttonClick = e.target;
    if (buttonClick.dataset.isCorrect === "true") {
        buttonClick.classList.add("correct");
        score++;
    }
    else {
        buttonClick.classList.add("incorrect");
    }
    next_button.innerHTML = "Next";
    next_button.style.display = "block";
    answer_buttons.childNodes.forEach(answer => {
        if (answer.dataset.isCorrect === "true") {
            answer.classList.add("correct");
        }
        answer.classList.add("disabled");
    });
}
function showResult() {
    questionElement.innerHTML = `You score ${score} out of 4!`;
    while (answer_buttons.firstChild) {
        answer_buttons.firstChild.remove();
    }
    next_button.innerHTML = "Play Again";
}
function handleClickNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quiz_list.length) {
        showQuestion();
    }
    else {
        if (currentQuestionIndex == quiz_list.length + 1) {
            startQuiz();
        }
        else showResult();
    }
}

next_button.addEventListener('click', handleClickNextButton);
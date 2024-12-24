// Quiz Data
const quizData = [
    {
        question: "What is 22 + 6?",
        options: ["28", "99", "16", "56"],
        answer: 0                            // index of correct option
    },
    {
        question: "What is 5 + 3?",
        options: ["8", "9", "7", "10"],
        answer: 0
    },
    {
        question: "What is 10 + 15?",
        options: ["25", "18", "20", "30"],
        answer: 0
    },
    {
        question: "What is 3 * 4?",
        options: ["10", "12", "9", "8"],
        answer: 1
    },
    {
        question: "What is 9 / 3?",
        options: ["3", "2", "4", "6"],
        answer: 0
    }
];

// Variables
let currentQuestionIndex = 0;
let score = 0;
let attempted = 0;
let correct = 0;
let wrong = 0;
let timer = 60;
let interval;

// Elements
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const questionNumber = document.querySelector('.question-number');
const timerDisplay = document.getElementById('timer-display');
const progressBar = document.querySelector('.progress-bar');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const homeBox = document.querySelector('.home-box');

// Start Quiz
function startQuiz() {
    homeBox.classList.add('hide');
    quizBox.classList.remove('hide');
    resetQuiz();
    loadQuestion();
    startTimer();
}

// Reset Quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    attempted = 0;
    correct = 0;
    wrong = 0;
    timer = 60;
    progressBar.style.width = '0%';
}

// Load Question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    optionContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(optionElement, index);
        optionContainer.appendChild(optionElement);
    });
}

// Select Option
function selectOption(element, selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = optionContainer.querySelectorAll('.option');
    options.forEach(option => option.classList.add('disabled'));

    if (selectedIndex === currentQuestion.answer) {
        element.classList.add('correct');
        score++;
        correct++;
    } else {
        element.classList.add('incorrect');
        options[currentQuestion.answer].classList.add('correct');
        wrong++;
    }

    attempted++;
    updateProgressBar();
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        clearInterval(interval);
        showResult();
    }
}

// Timer
function startTimer() {
    clearInterval(interval); // Ensure no duplicate intervals
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerDisplay.textContent = timer;
        } else {
            clearInterval(interval);
            showResult();
        }
    }, 1000);
}

// Update Progress Bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show Result
function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    updateResultTable();
}

// Update Result Table
function updateResultTable() {
    document.getElementById('total-questions').textContent = quizData.length;
    document.getElementById('total-attempted').textContent = attempted;
    document.getElementById('total-correct').textContent = correct;
    document.getElementById('total-wrong').textContent = wrong;
    const percentage = ((correct / quizData.length) * 100).toFixed(2);
    document.getElementById('percentage').textContent = `${percentage}%`;
    document.getElementById('total-score').textContent = `${score} / ${quizData.length}`;
}

// Try Again
function tryAgain() {
    resultBox.classList.add('hide');
    homeBox.classList.remove('hide');
}

// Go Home
function goHome() {
    resultBox.classList.add('hide');
    homeBox.classList.remove('hide');
}

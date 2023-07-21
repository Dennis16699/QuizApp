let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },

    {
        "question": "Was bedeutet HTML?",
        "answer_1": "Hypertext Mark Language",
        "answer_2": "Hypertext Markup language",
        "answer_3": "Hexatext Markup language",
        "answer_4": "Hypertext Markup Look",
        "right_answer": 2
    },

    {
        "question": "Wer hat CSS entwickelt?",
        "answer_1": "Linus Torvalds",
        "answer_2": "Bill Gates",
        "answer_3": "Steve Jobs",
        "answer_4": "Hakon Wium Lie",
        "right_answer": 4
    },

    {
        "question": "Was bedeutet CSS?",
        "answer_1": "Cool Style Sheet",
        "answer_2": "Cascade Style Sheet",
        "answer_3": "Cascading Style Sheet",
        "answer_4": "Complete Style Sheet",
        "right_answer": 3
    },

    {
        "question": "Wann wurde JavaScript erfunden?",
        "answer_1": "1990",
        "answer_2": "1995",
        "answer_3": "1985",
        "answer_4": "2000",
        "right_answer": 2
    },

    {
        "question": "In welches HTML Element kommt JavaScript?",
        "answer_1": "js",
        "answer_2": "scripting",
        "answer_3": "javascript",
        "answer_4": "script",
        "right_answer": 4
    },

    {
        "question": "Was ist der korrekte Syntax um eine externe js Datei einzubinden?",
        "answer_1": "script link='xxx.js'",
        "answer_2": "script href='xxx.js'",
        "answer_3": "script src='xxx.js'",
        "answer_4": "script name='xxx.js'",
        "right_answer": 3
    },
];

let currentQuestion = 0;
let rightQuestions = 0;
let Audio_Success = new Audio('audio/242501_4414128-lq.mp3');
let Audio_Fail = new Audio('audio/131657_2398403-lq.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQustion();
    }
}

function gameIsOver(){
    return currentQuestion >= questions.length
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;';
    document.getElementById('amount-qustions').innerHTML = questions.length;
    document.getElementById('amount-of-qustions').innerHTML = rightQuestions;
}

function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width:${percent}%;`;
}

function updateToNextQustion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer1').innerHTML = question['answer_1']
    document.getElementById('answer2').innerHTML = question['answer_2']
    document.getElementById('answer3').innerHTML = question['answer_3']
    document.getElementById('answer4').innerHTML = question['answer_4']
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNum = selection.slice(-1);

    let idOfRightAnswer = `answer${question['right_answer']}`;

    if (selectedQuestionNum == question['right_answer']) {
        document.getElementById(selection).classList.add('bg-success');
        Audio_Success.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
        Audio_Fail.play();
    }
    document.getElementById('next-button').disabled = false;
    disableanswer();
}

function nextQuestion() {
    currentQuestion++; //++ bedeutet z.B. von 0 auf 1
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
    resetanswer();
}

function resetAnswerButtons() {
    document.getElementById('answer1').classList.remove('bg-danger');
    document.getElementById('answer1').classList.remove('bg-success');
    document.getElementById('answer2').classList.remove('bg-danger');
    document.getElementById('answer2').classList.remove('bg-success');
    document.getElementById('answer3').classList.remove('bg-danger');
    document.getElementById('answer3').classList.remove('bg-success');
    document.getElementById('answer4').classList.remove('bg-danger');
    document.getElementById('answer4').classList.remove('bg-success');
}

function disableanswer() {
    for (let i = 1; i < 5; i++) {
        const number = i;
        document.getElementById(`answer${number}`).classList.add('no-pointer-event');
    }
}

function resetanswer() {
    for (let i = 1; i < 5; i++) {
        const number = i;
        document.getElementById(`answer${number}`).classList.remove('no-pointer-event');
    }
}

function restarGame() {
    document.getElementById('questionBody').style = '';
    document.getElementById('endScreen').style = 'display: none;';
    currentQuestion = 0;
    rightQuestions = 0
    init();
}
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: 0
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "India"],
    answer: 1
  },
  {
    question: "What is the largest continent by area?",
    options: ["Africa", "Asia", "Europe", "North America"],
    answer: 1
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3
  }
];

let currentQuestionIndex = 0;
let score = 0;
let currentCategory = '';
let questions = [];

const countriesQuestions = [
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "India"],
    answer: 1
  },
  {
    question: "Which country is home to the Eiffel Tower?",
    options: ["Italy", "France", "Germany", "Spain"],
    answer: 1
  }
];

const capitalsQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: 0
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Kyoto"],
    answer: 1
  }
];

const flagsQuestions = [
  {
    question: "Which country's flag is this?",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Japan.svg",  // Japan Flag
    options: ["Japan", "China", "South Korea", "India"],
    answer: 0
  },
  {
    question: "Which country's flag is this?",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_France.svg",  // France Flag
    options: ["France", "Italy", "Spain", "Germany"],
    answer: 0
  }
];

function startQuiz(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  score = 0;
  
  // Show quiz container and hide start menu
  document.querySelector('.start-menu').style.display = 'none';
  document.querySelector('.quiz-container').style.display = 'block';

  // Select questions based on category
  if (category === 'countries') {
    questions = countriesQuestions;
  } else if (category === 'capitals') {
    questions = capitalsQuestions;
  } else if (category === 'flags') {
    questions = flagsQuestions;
  }

  loadQuestion();
}

function loadQuestion() {
  const questionData = questions[currentQuestionIndex];
  document.getElementById('question').textContent = questionData.question;

  // If the question has an image (for flags)
  if (questionData.image) {
    const img = document.createElement('img');
    img.src = questionData.image;
    img.alt = "Flag Image";
    img.style.width = '200px';
    img.style.marginTop = '20px';
    document.getElementById('quiz').appendChild(img);
  }

  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
    option.textContent = questionData.options[index];
  });

  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('next').style.display = 'none';
}

function checkAnswer(selectedOption) {
  const questionData = questions[currentQuestionIndex];
  if (selectedOption === questionData.answer) {
    score++;
  }
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('next').style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById('next').style.display = 'none';
  } else {
    document.getElementById('quiz').innerHTML = `<h2>Quiz Finished! Your final score is ${score}</h2>`;
    document.getElementById('next').style.display = 'none';
  }
}

loadQuestion();

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

function loadQuestion() {
  const questionData = questions[currentQuestionIndex];
  document.getElementById('question').textContent = questionData.question;
  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
    option.textContent = questionData.options[index];
  });
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

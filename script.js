// Category and Question Tracker
let selectedCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 15; // Time limit for each question in seconds
let timerInterval;

// Page Elements
const elements = {
    landingPage: document.getElementById('landing-page'),
    categoryPage: document.getElementById('category-page'),
    mainApp: document.getElementById('main-app'),
    aboutPage: document.getElementById('about-page'),
    startButton: document.getElementById('start-btn'),
    aboutButton: document.getElementById('about-btn'),
    categoryButtons: document.querySelectorAll('.category-btn'),
    lessonContent: document.getElementById('lesson-content'),
    lessonDescription: document.getElementById('lesson-description'),
    quizContent: document.getElementById('quiz-content'),
    feedbackMessage: document.getElementById('feedback-message'),
    questionElement: document.getElementById('question'),
    answerButtons: document.querySelectorAll('.quiz-answer'),
    menuButton: document.getElementById('menu-btn'),
    backButton: document.getElementById('back-btn'),
    menuAboutButton: document.getElementById('menu-about-btn'),
    progressBar: document.getElementById('progress-bar'),
    timerElement: document.getElementById('timer')
};

// Lesson and Quiz Data
const lessonData = {
    verbs: [
        {
            title: "What are Verbs?",
            content: "Verbs are action words that describe what the subject is doing. Examples include: run, jump, sing, etc.",
            examples: ["run", "jump", "eat", "play"]
        },
        {
            title: "Types of Verbs",
            content: "There are different types of verbs: action verbs, linking verbs, and helping verbs.",
            examples: ["am", "is", "are", "have"]
        }
    ],
    nouns: [
        {
            title: "What are Nouns?",
            content: "Nouns are words that name people, places, things, or ideas. Examples: dog, city, love.",
            examples: ["dog", "city", "school", "book"]
        },
        {
            title: "Types of Nouns",
            content: "Nouns can be classified as common nouns, proper nouns, countable nouns, and uncountable nouns.",
            examples: ["dog", "New York", "water", "apple"]
        }
    ],
    adjectives: [
        {
            title: "What are Adjectives?",
            content: "Adjectives are words that describe nouns. They tell us more about the noun, such as its color, size, or shape.",
            examples: ["big", "red", "beautiful", "fast"]
        },
        {
            title: "Types of Adjectives",
            content: "Adjectives can describe a noun’s quality, size, shape, color, and quantity.",
            examples: ["small", "round", "green", "many"]
        }
    ],
    punctuation: [
        {
            title: "What is Punctuation?",
            content: "Punctuation marks are symbols used to organize and clarify writing. Common punctuation marks include periods, commas, exclamation points, and question marks.",
            examples: [".", ",", "!", "?"]
        },
        {
            title: "Types of Punctuation Marks",
            content: "Punctuation marks have different functions. For example, periods end statements, commas separate items, exclamation marks show excitement.",
            examples: [".", ",", "!", "?"]
        }
    ],
    prepositions: [
        {
            title: "What are Prepositions?",
            content: "Prepositions are words that show the relationship between a noun (or pronoun) and another word in a sentence. They describe location, time, direction, and more.",
            examples: ["in", "on", "at", "under"]
        },
        {
            title: "Types of Prepositions",
            content: "Prepositions can indicate place (in, on, under), time (at, during), and direction (to, from).",
            examples: ["in", "on", "before", "from"]
        }
    ]
};

const quizData = {
    verbs: [
        {
            question: "What is the verb in this sentence: 'She runs fast.'?",
            options: ["run", "quickly", "fast", "play"],
            correctAnswer: "run",
            explanation: "The verb is 'run' because it describes the action she is performing."
        },
        {
            question: "Choose the verb: 'I sing every morning.'",
            options: ["sing", "morning", "every", "I"],
            correctAnswer: "sing",
            explanation: "The verb is 'sing' because it describes the action being done."
        }
    ],
    nouns: [
        {
            question: "Which word is a noun: 'The cat sleeps on the mat.'?",
            options: ["cat", "sleeps", "on", "mat"],
            correctAnswer: "cat",
            explanation: "The noun is 'cat' because it names the animal."
        },
        {
            question: "Which word is a proper noun: 'I live in London.'?",
            options: ["live", "in", "London", "I"],
            correctAnswer: "London",
            explanation: "Proper nouns are specific names of people, places, or things."
        }
    ],
    adjectives: [
        {
            question: "Choose the adjective: 'The small cat ran fast.'",
            options: ["small", "cat", "ran", "fast"],
            correctAnswer: "small",
            explanation: "The adjective is 'small' because it describes the noun 'cat'."
        },
        {
            question: "Which word is an adjective: 'The blue sky is beautiful.'?",
            options: ["blue", "sky", "is", "beautiful"],
            correctAnswer: "blue",
            explanation: "The adjective is 'blue' because it describes the noun 'sky'."
        }
    ],
    punctuation: [
        {
            question: "Which punctuation mark ends a question?",
            options: [".", "!", "?"],
            correctAnswer: "?",
            explanation: "A question mark '?' is used to end a question."
        },
        {
            question: "Choose the correct punctuation for this sentence: 'She went to the store ____ she bought milk.'",
            options: [".", ",", ";", "?"],
            correctAnswer: ",",
            explanation: "A comma is used to separate clauses in compound sentences."
        }
    ],
    prepositions: [
        {
            question: "Choose the preposition: 'The book is on the table.'",
            options: ["book", "on", "the", "table"],
            correctAnswer: "on",
            explanation: "The preposition 'on' shows the location of the book in relation to the table."
        },
        {
            question: "Which preposition shows direction: 'She is walking to the park.'?",
            options: ["to", "park", "walking", "is"],
            correctAnswer: "to",
            explanation: "'To' is a preposition showing movement or direction."
        }
    ]
};

// Page Manager for handling page transitions
class PageManager {
    static showPage(page) {
        Object.values(elements).forEach(el => {
            if (el instanceof HTMLElement) {
                el.classList.remove('active');
            }
        });
        page.classList.add('active');
    }
}

// Show Category Page After Landing
elements.startButton.addEventListener('click', () => {
    PageManager.showPage(elements.categoryPage);
});

// Show About Page
elements.aboutButton.addEventListener('click', () => {
    PageManager.showPage(elements.aboutPage);
});

// Handle Category Selection
elements.categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedCategory = button.dataset.category;
        PageManager.showPage(elements.mainApp);
        loadLessonContent();
    });
});

// Load Lesson Content based on selected category
function loadLessonContent() {
    if (!selectedCategory) return;

    const lessons = lessonData[selectedCategory];
    let lessonHTML = '';
    lessons.forEach((lesson, index) => {
        lessonHTML += `
            <div class="lesson">
                <h3>${lesson.title}</h3>
                <p>${lesson.content}</p>
                <p><strong>Examples:</strong> ${lesson.examples.join(', ')}</p>
            </div>
        `;
    });

    elements.lessonDescription.innerHTML = lessonHTML;
    loadQuestion();
}

// Load the current question and options for quiz
function loadQuestion() {
    const currentQuiz = quizData[selectedCategory] || [];
    const question = currentQuiz[currentQuestionIndex];
    if (!question) return;

    elements.questionElement.textContent = question.question;
    elements.answerButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.setAttribute("data-answer", question.options[index]);
    });

    // Start timer for each question
    startTimer();
}

// Start timer for quiz question
function startTimer() {
    let timeLeft = timeLimit;
    elements.timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        elements.timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(null); // Automatically check answer if time runs out
        }
    }, 1000);
}

// Check the answer and provide feedback
function checkAnswer(selectedAnswer) {
    const currentQuiz = quizData[selectedCategory] || [];
    const currentQuestion = currentQuiz[currentQuestionIndex];
    clearInterval(timerInterval); // Stop the timer after checking answer

    const feedbackText = selectedAnswer === currentQuestion.correctAnswer ? 
        "Good job! You picked the correct answer!" :
        `Incorrect! The correct answer is: ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`;

    elements.feedbackMessage.textContent = feedbackText;
    elements.feedbackMessage.style.display = "block";

    // Hide feedback after 3 seconds and move to next question
    setTimeout(() => {
        elements.feedbackMessage.style.display = "none";
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            loadQuestion();
        } else {
            elements.feedbackMessage.textContent = `You've completed all the questions! Your score is ${score}.`;
        }
    }, 3000);
}

// Event listeners for quiz options
elements.answerButtons.forEach(button => {
    button.addEventListener("click", function() {
        const selectedAnswer = this.getAttribute("data-answer");
        checkAnswer(selectedAnswer);
    });
});

// Initialize the first question
loadQuestion();

// Navigation buttons functionality
elements.menuButton.addEventListener('click', () => {
    PageManager.showPage(elements.landingPage);
});

elements.backButton.addEventListener('click', () => {
    PageManager.showPage(elements.categoryPage);
});

elements.menuAboutButton.addEventListener('click', () => {
    PageManager.showPage(elements.landingPage);
});


// CONTENT DATA - VERBATIM COPIED
const STAGES = [
    {
        id: 1,
        question: "In this messy World, where do our souls find the most peace?",
        optionA: {
            label: "Out in nature",
            description: "Somewhere in or near a river...🍃💨"
        },
        optionB: {
            label: "In our room watching",
            description: "Watching Anime and choosing rival sides...✽𝕊𝕒𝕥𝕠𝕣𝕦 𝔾𝕠𝕛𝕠✽ "
        }
    },
    {
        id: 2,
        question: "If our connection was a melody, how would it resonate in your heart?",
        optionA: {
            label: "As a Gentle Lullaby",
            description: "Soft, steady, and keeping us safe 🧸"
        },
        optionB: {
            label: "As a Wild Symphony",
            description: "Passionate, loud, and ❤️‍🔥"
        }
    },
    {
        id: 3,
        question: "When you think about us, what story comes first in your mind?",
        optionA: {
            label: "Our Friendship",
            description: "The laughter, the inside jokes, and the quiet moments we shared 👫"
        },
        optionB: {
            label: "Our Love",
            description: "The way we realized we were meant to be 💜🥰💞"
        }
    },
    {
        id: 4,
        question: "Now, are you ready to discover what my heart has been holding?",
        optionA: {
            label: "I am ready",
            description: "Show me the truth."
        },
        optionB: {
            label: "More than ready",
            description: "I've been waiting for this."
        }
    }
];

const MAGICAL_REASONS = [
    "The way your presence turns the simplest moments into memories I want to keep forever.",
    "Your kindness, which acts as a quiet strength that inspires me every single day to be the best.",
    "The way you understand the parts of me that I haven't even found words for yet.",
    "The simple, beautiful truth that my life is infinitely better just because you are in it."
];

const FINAL_MESSAGE = `PinUp💜,

From the moment our paths crossed, my world shifted, as if I had found its missing rhythm. I am eternally grateful for the way you look at me, for your laughter that I've come to love 😍, and for the quiet strength you bring into my life.

Every day with you is a gift I never expected but always hoped for. You have allowed the man within me to blossom in the freest way.  Thank you for believing in me, for loving me, and for letting me love you. 

This isn't just a day; it’s a reminder that you are my forever favorite person, and I would choose you in every lifetime.

🫵🏻ـaishite kurete arigatou!ﮩ٨ـ❤️️.`;

// STATE MANAGEMENT
let currentState = 'START';
let currentQuizStage = 0;

// DOM ELEMENTS
const screens = {
    'START': document.getElementById('screen-start'),
    'QUIZ': document.getElementById('screen-quiz'),
    'CHOICE': document.getElementById('screen-choice'),
    'MESSAGE': document.getElementById('screen-message'),
    'MAGIC': document.getElementById('screen-magic'),
    'CLOSING': document.getElementById('screen-closing'),
};


const quizUI = {
    step: document.getElementById('quiz-step-count'),
    question: document.getElementById('quiz-question'),
    backText: document.getElementById('quiz-back-text'),
    optionALabel: document.getElementById('quiz-option-a-label'),
    optionADesc: document.getElementById('quiz-option-a-desc'),
    optionBLabel: document.getElementById('quiz-option-b-label'),
    optionBDesc: document.getElementById('quiz-option-b-desc'),
};

const finalMsgElement = document.getElementById('final-message-text');
const reasonsListElement = document.getElementById('magical-reasons-list');

// TRANSITION LOGIC
function setScreen(stateId) {
    // Fade out
    const active = document.querySelector('.active-screen');
    if (active) {
        active.classList.remove('opacity-100');
        active.classList.add('opacity-0');
        active.style.transform = 'translateY(10px)';
        if (stateId === 'CLOSING') startClosingSequence();
    }

    setTimeout(() => {
        // Hide all
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active-screen');
            screen.classList.add('hidden-screen');
            screen.classList.remove('opacity-100');
            screen.classList.add('opacity-0');
        });

        // Show new
        const target = screens[stateId];
        target.classList.remove('hidden-screen');
        target.classList.add('active-screen');
        
        // Render specific logic
        if (stateId === 'QUIZ') updateQuizScreen();
        if (stateId === 'MESSAGE') finalMsgElement.textContent = FINAL_MESSAGE;
        if (stateId === 'MAGIC') renderMagicReasons();

        // Fade in
        setTimeout(() => {
            target.classList.remove('opacity-0');
            target.classList.add('opacity-100');
            target.style.transform = 'translateY(0)';
        }, 50);

        currentState = stateId;
    }, active ? 400 : 0);
}


function updateQuizScreen() {
    const stage = STAGES[currentQuizStage];
    quizUI.step.textContent = `Step ${currentQuizStage + 1} of 4`;
    quizUI.question.textContent = stage.question;
    quizUI.backText.textContent = currentQuizStage === 0 ? "Back to start" : "Previous Question";
    quizUI.optionALabel.textContent = stage.optionA.label;
    quizUI.optionADesc.textContent = stage.optionA.description;
    quizUI.optionBLabel.textContent = stage.optionB.label;
    quizUI.optionBDesc.textContent = stage.optionB.description;
}

function renderMagicReasons() {
    reasonsListElement.innerHTML = '';
    MAGICAL_REASONS.forEach((reason, index) => {
        const div = document.createElement('div');
        div.className = "p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden group opacity-0 transition-all duration-1000 transform translate-x-[-30px]";
        div.style.transitionDelay = `${index * 0.8}s`;
        div.innerHTML = `
            <div class="absolute top-0 left-0 w-1 h-full bg-[#921631] group-hover:bg-[#4d0000] transition-colors"></div>
            <div class="flex items-start gap-4">
                <span class="font-cursive text-2xl text-[#921631]">${index + 1}.</span>
                <p class="text-[#4d0000] leading-relaxed font-medium italic">${reason}</p>
            </div>
        `;
        reasonsListElement.appendChild(div);
        
        // Trigger animation
        setTimeout(() => {
            div.classList.remove('opacity-0', 'translate-x-[-30px]');
            div.classList.add('opacity-100', 'translate-x-0');
        }, 100);
    });
}

function startClosingSequence() {
    const btn = document.getElementById('btn-relive');
    if (btn) {
        btn.classList.remove('opacity-0', 'pointer-events-none');
    }
}


// EVENT LISTENERS
document.getElementById('btn-begin').addEventListener('click', () => {
    currentQuizStage = 0;
    setScreen('QUIZ');
});

document.getElementById('quiz-option-a').addEventListener('click', handleQuizNext);
document.getElementById('quiz-option-b').addEventListener('click', handleQuizNext);

function handleQuizNext() {
    if (currentQuizStage < STAGES.length - 1) {
        currentQuizStage++;
        // Minor fade between quiz stages
        screens['QUIZ'].classList.add('opacity-0');
        setTimeout(() => {
            updateQuizScreen();
            screens['QUIZ'].classList.remove('opacity-0');
        }, 300);
    } else {
        setScreen('CHOICE');
    }
}

document.getElementById('btn-quiz-back').addEventListener('click', () => {
    if (currentQuizStage > 0) {
        currentQuizStage--;
        screens['QUIZ'].classList.add('opacity-0');
        setTimeout(() => {
            updateQuizScreen();
            screens['QUIZ'].classList.remove('opacity-0');
        }, 300);
    } else {
        setScreen('START');
    }
});

document.getElementById('btn-choice-back').addEventListener('click', () => setScreen('START'));
document.getElementById('btn-go-message').addEventListener('click', () => setScreen('MESSAGE'));
document.getElementById('btn-go-magic').addEventListener('click', () => setScreen('MAGIC'));
document.getElementById('btn-msg-back').addEventListener('click', () => setScreen('CHOICE'));
document.getElementById('btn-magic-back').addEventListener('click', () => setScreen('CHOICE'));
document.getElementById('btn-go-closing').addEventListener('click', () => setScreen('CLOSING'));


// HEART BACKGROUND ANIMATION
function createHeart() {
    const container = document.getElementById('particles-container');
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    
    const size = 15 + Math.random() * 20;
    const duration = 10 + Math.random() * 10;
    const delay = Math.random() * 5;
    const colors = ['#fecaca', '#fca5a5', '#f87171', '#ef4444'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    heart.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="${color}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
    
    container.appendChild(heart);
    
    // Cleanup
    setTimeout(() => heart.remove(), (duration + delay) * 1000);
}

// Spawn particles
setInterval(createHeart, 500);
for(let i=0; i<15; i++) createHeart(); // Initial batch

// Initialize Start
window.addEventListener('load', () => {
    // Initial animation for start screen
    screens['START'].style.transform = 'translateY(0)';
    screens['START'].classList.add('opacity-100');
});

document.getElementById('btn-closing-back')
    .addEventListener('click', () => setScreen('MESSAGE'));

document.getElementById('btn-relive')
    .addEventListener('click', () => setScreen('START'));

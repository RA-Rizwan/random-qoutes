const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "Stay hungry, stay foolish.",
        author: "Steve Jobs"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    }
];

const quoteText = document.getElementById('quote-text');
const authorName = document.getElementById('author-name');
const newQuoteBtn = document.getElementById('new-quote');

// Create interactive background dots
function createBackgroundDots() {
    const body = document.body;
    const dotCount = 50;
    const dots = [];

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'background-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        body.appendChild(dot);
        dots.push(dot);
    }

    return dots;
}

// Handle mouse movement for interactive dots
function handleMouseMove(e, dots) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    dots.forEach(dot => {
        const dotX = parseInt(dot.style.left);
        const dotY = parseInt(dot.style.top);
        
        const deltaX = mouseX - (dotX * window.innerWidth / 100);
        const deltaY = mouseY - (dotY * window.innerHeight / 100);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 200) {
            const angle = Math.atan2(deltaY, deltaX);
            const force = (200 - distance) / 200;
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;
            
            dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
            dot.style.background = `rgba(224, 224, 224, ${0.5 + force * 0.5})`;
        } else {
            dot.style.transform = 'translate(0, 0)';
            dot.style.background = '#e0e0e0';
        }
    });
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateQuote() {
    const quote = getRandomQuote();
    
    // Remove fade-in class if it exists
    quoteText.classList.remove('fade-in');
    authorName.classList.remove('fade-in');
    
    // Force a reflow
    void quoteText.offsetWidth;
    
    // Add fade-in class
    quoteText.classList.add('fade-in');
    authorName.classList.add('fade-in');
    
    quoteText.textContent = quote.text;
    authorName.textContent = `- ${quote.author}`;
}

// Initialize background dots
const dots = createBackgroundDots();

// Add mouse move event listener
document.addEventListener('mousemove', (e) => handleMouseMove(e, dots));

// Add click event listener to the button
newQuoteBtn.addEventListener('click', updateQuote);

// Generate first quote on page load
updateQuote(); 
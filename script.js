// Projects Data
const projects = [
    { 
        title: 'Personal Portfolio', 
        description: 'The portfolio site you are currently visiting, built to showcase my projects and skills', 
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        image: './asstes/portfolio_image.png', 
        githubLink: 'https://github.com/atsuchak/portfolio', 
        liveLink: 'https://atsuchak.github.io/portfolio/' 
    },
    { 
        title: 'Link Saver', 
        description: 'A simple web app for saving, organizing, and searching your personal links.', 
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        image: './asstes/link_saver_image.png', 
        githubLink: 'https://github.com/atsuchak/LinkVault', 
        liveLink: 'https://atsuchak.github.io/LinkVault/' 
    },
    { 
        title: 'QR Generator', 
        description: 'A simple web app that generates a QR code from any text or URL.', 
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: './asstes/qr_image.png', 
        githubLink: 'https://github.com/atsuchak/QrGenerator', 
        liveLink: 'https://atsuchak.github.io/QrGenerator/' 
    },
    { 
        title: 'Weather Dashboard', 
        description: 'A dashboard that displays real-time weather forecasts, searchable by city.', 
        techStack: ['HTML', 'JavaScript', 'API', 'CSS'],
        image: './asstes/weather_image.png', 
        githubLink: 'https://github.com/atsuchak/Weather-Dashboard', 
        liveLink: 'https://atsuchak.github.io/Weather-Dashboard/' 
    },
    { 
        title: 'Code Sheet', 
        description: 'A personal, searchable cheatsheet for code, algorithms, and commands.', 
        techStack: ['HTML', 'CSS', 'API', 'JavaScript'],
        image: './asstes/codeSheet_image.png', 
        githubLink: 'https://github.com/atsuchak/CodeSheet', 
        liveLink: 'https://atsuchak.github.io/CodeSheet/' 
    },
];

let currentIndex = 0; // This will now track position, e.g., 0-9
let cardsPerView = 3;
let isPaused = false;
let autoSlideInterval;

// ---
// **NEW** A variable to prevent clicks during the "jump"
// ---
let isJumping = false; 

// Typing Animation
const fullText = 'A problem solver driven by curiosity and creativity';
let textIndex = 0;
function typeText() {
    if (textIndex <= fullText.length) {
        document.getElementById('typingText').textContent = fullText.slice(0, textIndex);
        textIndex++;
        setTimeout(typeText, 50);
    }
}
typeText();

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    menu.classList.toggle('hidden');
}

// Scroll to Section
function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Active Section Observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.dataset.section === id) {
                    link.classList.remove('text-gray-300', 'hover:text-white');
                    link.classList.add('text-blue-400');
                } else {
                    link.classList.remove('text-blue-400');
                    link.classList.add('text-gray-300', 'hover:text-white');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

// Update Cards Per View
function updateCardsPerView() {
    if (window.innerWidth < 640) cardsPerView = 1;
    else if (window.innerWidth < 1024) cardsPerView = 2;
    else cardsPerView = 3;
    
    initializeSlider();
    // ---
    // **CHANGED** Start at 0, no animation on load
    // ---
    currentIndex = 0;
    updateSliderPosition(false); // false = no animation
    renderDots();
}


function initializeSlider() {
    const slider = document.getElementById('projectsSlider');
    slider.innerHTML = ''; 

    // ---
    // **CHANGED** Create a "doubled up" list of projects for the loop
    // ---
    const allCards = [...projects, ...projects];

    allCards.forEach(project => {
        const widthClass = cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-[calc(50%-12px)]' : 'w-[calc(33.333%-16px)]';
        
        const card = document.createElement('div');
        card.className = `${widthClass} flex-shrink-0`; 
        card.innerHTML = `
            <div class="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 transition-all hover:scale-105 hover:border-blue-500 h-full flex flex-col">
                
                <img src="${project.image}" alt="${project.title} screenshot" class="h-48 w-full object-cover">
                
                <div class="p-6 flex flex-col flex-grow"> 
                    <h3 class="text-xl font-semibold text-white mb-3">${project.title}</h3>
                    <p class="text-gray-400 mb-4 text-sm flex-grow">${project.description}</p> 
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.techStack.map(tech => `<span class="px-3 py-1 bg-zinc-800 text-gray-300 rounded-lg text-xs border border-zinc-700">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="flex space-x-4 mt-auto"> 
                        ${project.githubLink ? `
                        <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" title="View source on GitHub">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                        ` : ''}

                        ${project.liveLink ? `
                        <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" title="View live demo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        slider.appendChild(card);
    });
}

// ---
// **CHANGED** Added 'withAnimation' parameter
// ---
function updateSliderPosition(withAnimation = true) {
    const slider = document.getElementById('projectsSlider');
    if (!slider.children.length) return; 

    // ---
    // **NEW** Control the animation
    // ---
    if (withAnimation) {
        slider.style.transition = 'transform 700ms ease-in-out';
    } else {
        slider.style.transition = 'none';
    }

    const card = slider.children[0];
    const cardWidth = card.offsetWidth;
    const gap = 24; // This is your 'gap-6'
    
    const slideDistance = cardsPerView === 1 ? cardWidth : cardWidth + gap;
    const translateX = -currentIndex * slideDistance;
    
    slider.style.transform = `translateX(${translateX}px)`;
}

// ---
// **CHANGED** Dot logic now uses modulus
// ---
function renderDots() {
    const dots = document.getElementById('dotIndicators');
    dots.innerHTML = '';

    // ---
    // **NEW** The active dot is based on the *real* project index
    // ---
    const activeIndex = currentIndex % projects.length;

    projects.forEach((_, index) => {
        const dot = document.createElement('button');
        const isActive = index === activeIndex;
        dot.className = `transition-all ${isActive ? 'w-3 h-3 bg-blue-500 animate-pulse' : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-500'} rounded-full`;
        dot.onclick = () => goToProject(index);
        dots.appendChild(dot);
    });
}


// ---
// **CHANGED** New logic for 'next' with looping
// ---
function goToNext() {
    if (isJumping) return; // Don't do anything if we're in the middle of a jump
    
    currentIndex++;
    updateSliderPosition(true); // Move with animation
    
    // Check if we've moved to the first "cloned" card
    if (currentIndex === projects.length) {
        isJumping = true; // Disable clicks
        const slider = document.getElementById('projectsSlider');
        
        // Listen for the animation to end
        slider.addEventListener('transitionend', () => {
            currentIndex = 0; // Jump back to the real first card
            updateSliderPosition(false); // Move with NO animation
            isJumping = false; // Re-enable clicks
        }, { once: true }); // Automatically remove this listener after it runs
    }
    
    renderDots();
}

// ---
// **CHANGED** New logic for 'previous' with looping
// ---
function goToPrevious() {
    if (isJumping) return;

    if (currentIndex === 0) {
        isJumping = true;
        
        // At the start, so jump to the *end* (the last "cloned" set)
        currentIndex = projects.length; 
        updateSliderPosition(false); // No animation

        // We need a tiny delay (one frame) for the browser to register the jump
        // before we ask it to animate again.
        requestAnimationFrame(() => {
            // Now, slide to the *real* last card
            currentIndex = projects.length - 1;
            updateSliderPosition(true); // Animate
            renderDots();
            isJumping = false;
        });
    } else {
        currentIndex--;
        updateSliderPosition(true);
        renderDots();
    }
}

// ---
// **CHANGED** goToProject now just updates the index
// ---
function goToProject(index) {
    if (isJumping) return;
    currentIndex = index;
    updateSliderPosition(true);
    renderDots();
}

// Auto Slide
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!isPaused) {
            goToNext();
        }
    }, 4000);
}

// Pause on Hover
document.getElementById('projectsContainer').addEventListener('mouseenter', () => {
    isPaused = true;
});

document.getElementById('projectsContainer').addEventListener('mouseleave', () => {
    isPaused = false;
});

// Contact Form Validation
function handleSubmit() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    let hasError = false;

    // Clear previous errors
    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('messageError').classList.add('hidden');

    if (!name.trim()) {
        document.getElementById('nameError').textContent = 'Name is required';
        document.getElementById('nameError').classList.remove('hidden');
        hasError = true;
    }

    if (!email.trim()) {
        document.getElementById('emailError').textContent = 'Email is required';
        document.getElementById('emailError').classList.remove('hidden');
        hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'Email is invalid';
        document.getElementById('emailError').classList.remove('hidden');
        hasError = true;
    }

    if (!message.trim()) {
        document.getElementById('messageError').textContent = 'Message is required';
        document.getElementById('messageError').classList.remove('hidden');
        hasError = true;
    }

    if (!hasError) {
        alert('Message sent successfully!');
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    }
}

// Initialize
window.addEventListener('resize', updateCardsPerView);
updateCardsPerView(); // This will build the doubled-up slider and render dots
startAutoSlide();
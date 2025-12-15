// Theme management
document.addEventListener('DOMContentLoaded', function () {
    const darkMode = localStorage.getItem('darkMode') === 'true' ||
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (darkMode) {
        document.documentElement.classList.add('dark');
    }
});

function toggleTheme() {
    const html = document.documentElement;

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    }
}

// Projects Data (for live demos)
const projects = [
    {
        title: 'Personal Portfolio',
        description: 'The portfolio site you are currently visiting, built to showcase my projects and skills',
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        image: './assets/portfolio_image.png',
        githubLink: 'https://github.com/atsuchak/portfolio',
        liveLink: 'https://atsuchak.github.io/portfolio/'
    },
    {
        title: 'Link Saver',
        description: 'A simple web app for saving, organizing, and searching your personal links.',
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        image: './assets/link_saver_image.png',
        githubLink: 'https://github.com/atsuchak/LinkVault',
        liveLink: 'https://atsuchak.github.io/LinkVault/'
    },
    {
        title: 'QR Generator',
        description: 'A simple web app that generates a QR code from any text or URL.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: './assets/qr_image.png',
        githubLink: 'https://github.com/atsuchak/QrGenerator',
        liveLink: 'https://atsuchak.github.io/QrGenerator/'
    },
    {
        title: 'Weather Dashboard',
        description: 'A dashboard that displays real-time weather forecasts, searchable by city.',
        techStack: ['HTML', 'JavaScript', 'API', 'CSS'],
        image: './assets/weather_image.png',
        githubLink: 'https://github.com/atsuchak/WeatherNow',
        liveLink: 'https://atsuchak.github.io/WeatherNow/'
    },
    {
        title: 'Code Sheet',
        description: 'A personal, searchable cheatsheet for code, algorithms, and commands.',
        techStack: ['HTML', 'CSS', 'API', 'JavaScript'],
        image: './assets/codeSheet_image.png',
        githubLink: 'https://github.com/atsuchak/CodeSheet',
        liveLink: 'https://atsuchak.github.io/CodeSheet/'
    },
];

// Solutions (Non-Web Projects)
const codeSolutions = [
    {
        title: 'Competitive Programming Solutions',
        description: 'Code solutions for various problems found on platforms such as Codeforces, CodeChef and HackerRank',
        techStack: ['C++', 'Java', 'Algorithms', 'Data Structures', 'Problem Solving'],
        githubLink: 'https://github.com/atsuchak/Competitive-Programming.git',
    },
    {
        title: 'Data Structure and Algorithm',
        description: 'Implementations of various core data structures, including searching, sorting, graph, and tree concepts.',
        techStack: ['C++', 'Data Structures', 'Algorithm'],
        githubLink: 'https://github.com/atsuchak/DSA.git',
    },
    {
        title: 'DSA-1 UIU',
        description: 'Notes, assignments, and solved problems DSA-1, covering fundamental Data Structures and Algorithms.',
        techStack: ['C++', 'Algorithms', 'Data Structures'],
        githubLink: 'https://github.com/atsuchak/DSA-1_UIU.git',
    },
    {
        title: 'Star Patterns',
        description: 'A collection of solved star pattern problems using nested loops to build foundational understanding of loop logic.',
        techStack: ['C', 'Basic Programming', 'Nested loop'],
        githubLink: 'https://github.com/atsuchak/Star_Pattern.git',
    },
];

let currentIndex = 0;
let cardsPerView = 3;
let isPaused = false;
let autoSlideInterval;
let isJumping = false;
let currentCodeIndex = 0;
let codeCardsPerView = 2;
let isCodeJumping = false;
let codeAutoSlideInterval;

// Typing Animation
const sentences = [
    'A problem solver driven by curiosity and creativity',
    'A learner exploring new technologies',
    'Passionate about learning and solving problems'
];
let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 45;
const deletingSpeed = 25;
const pauseTime = 1500;
const typingTextElement = document.getElementById('typingText');

function typeLoop() {
    if (!typingTextElement) return;

    const currentSentence = sentences[sentenceIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentSentence.slice(0, charIndex--);
    } else {
        typingTextElement.textContent = currentSentence.slice(0, charIndex++);
    }


    if (!isDeleting && charIndex > currentSentence.length) {
        isDeleting = true;
        setTimeout(typeLoop, pauseTime);
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        charIndex = 0;
        setTimeout(typeLoop, 500);
    } else {
        setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
    }
}

typeLoop();

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    
    // Toggle the 'is-open' class for sliding effect
    menu.classList.toggle('is-open');
    
    // Toggle the 'is-active' class for X animation
    icon.classList.toggle('is-active');

    // Toggle body scroll lock when the menu is open (UX improvement)
    if (menu.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// Theme Toggle Function and Initialization
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

if (userTheme === 'dark' || (!userTheme && systemTheme)) {
    setTheme('dark');
} else {
    setTheme('light');
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

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
                    link.classList.remove('text-zinc-600', 'hover:text-zinc-900', 'dark:text-gray-300', 'dark:hover:text-white');
                    link.classList.add('text-blue-400');
                } else {
                    link.classList.remove('text-blue-400');
                    link.classList.add('text-zinc-600', 'hover:text-zinc-900', 'dark:text-gray-300', 'dark:hover:text-white');
                }
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

function updateCardsPerView() {
    if (window.innerWidth < 640) cardsPerView = 1;
    else if (window.innerWidth < 1024) cardsPerView = 2;
    else cardsPerView = 3;

    initializeSlider();
    currentIndex = 0;
    updateSliderPosition(false);
    renderDots();
}

// initializeSlider
function initializeSlider() {
    const slider = document.getElementById('projectsSlider');
    slider.innerHTML = '';

    const allCards = [...projects, ...projects];

    allCards.forEach(project => {
        const widthClass = cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-[calc(50%-12px)]' : 'w-[calc(33.333%-16px)]';

        const card = document.createElement('div');
        card.className = `${widthClass} flex-shrink-0`;

        card.innerHTML = `
            <div class="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 transition-all hover:border-blue-500 h-full flex flex-col">
                
                <img src="${project.image}" alt="${project.title} screenshot" class="h-48 w-full object-cover">
                
                <div class="p-6 flex flex-col flex-grow"> 
                    <h3 class="text-xl font-semibold text-zinc-900 dark:text-white mb-3">${project.title}</h3>
                    <p class="text-zinc-600 dark:text-gray-400 mb-4 text-sm flex-grow">${project.description}</p> 
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.techStack.map(tech => `<span class="px-3 py-1 bg-gray-100 text-zinc-700 dark:bg-zinc-800 dark:text-gray-300 rounded-lg text-xs border border-gray-200 dark:border-zinc-700">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="flex space-x-4 mt-auto"> 
                        ${project.githubLink ? `
                        <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white transition-colors" title="View source on GitHub">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                        ` : ''}

                        ${project.liveLink ? `
                        <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="text-zinc-500 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-white transition-colors" title="View live demo">
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

// Toggle Competitive Profiles Visibility (FINAL SMOOTH COLLAPSE FIX)
const COLLAPSED_HEIGHT = '208px';

function toggleProfiles() {
    const container = document.getElementById('profilesGridContainer');
    const buttonText = document.getElementById('buttonText');
    const buttonIcon = document.getElementById('buttonIcon');
    const overlay = document.getElementById('mobileOverlay');

    if (!container || !buttonText || !buttonIcon || !overlay) return;

    const isExpanded = container.classList.contains('is-expanded');

    if (!isExpanded) {
        container.style.maxHeight = container.scrollHeight + 'px';
        container.classList.add('is-expanded');

        buttonText.textContent = 'Show Less';
        buttonIcon.classList.add('rotate-180');

        overlay.classList.add('hidden');

        container.addEventListener('transitionend', function handler() {
            container.style.maxHeight = 'initial';
            container.removeEventListener('transitionend', handler);
        }, { once: true });

    } else {
        container.style.maxHeight = container.scrollHeight + 'px';

        requestAnimationFrame(() => {
            container.style.maxHeight = COLLAPSED_HEIGHT;
            container.classList.remove('is-expanded');

            buttonText.textContent = 'Show More';
            buttonIcon.classList.remove('rotate-180');

            setTimeout(() => {
            overlay.classList.remove('hidden');
            // *** FIX: Scroll to the Competitive Profiles heading instead of the whole About section ***
            const profilesHeading = document.getElementById('competitiveProfilesHeading'); 
            if (profilesHeading) {
                profilesHeading.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback to the top of the About section if the specific ID is missing
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
        });
    }
}

// Function to toggle the description on mobile cards
function toggleDescription(button) {
    const cardBody = button.closest('.code-card-body');
    if (!cardBody) return;

    const descriptionWrapper = cardBody.querySelector('.description-wrapper');
    const descriptionText = cardBody.querySelector('.description-text');
    const isExpanded = descriptionWrapper.classList.contains('is-expanded');

    if (isExpanded) {
        // Collapse
        descriptionWrapper.style.maxHeight = '2.5rem'; // Set to 1-2 line height
        button.textContent = '...See More';
        descriptionWrapper.classList.remove('is-expanded');
    } else {
        // Expand
        // Temporarily set height to 'initial' to measure full scrollHeight
        descriptionWrapper.style.maxHeight = 'initial'; 
        const scrollHeight = descriptionText.offsetHeight;

        descriptionWrapper.style.maxHeight = '2.5rem'; // Reset back to collapsed size for smooth animation start
        
        requestAnimationFrame(() => {
            descriptionWrapper.style.maxHeight = scrollHeight + 'px';
            button.textContent = 'See Less';
            descriptionWrapper.classList.add('is-expanded');
        });
    }
}

function updateSliderPosition(withAnimation = true) {
    const slider = document.getElementById('projectsSlider');
    if (!slider.children.length) return;

    if (withAnimation) {
        slider.style.transition = 'transform 700ms ease-in-out';
    } else {
        slider.style.transition = 'none';
    }

    const card = slider.children[0];
    const cardWidth = card.offsetWidth;
    const gap = 24;

    const slideDistance = cardWidth + gap;
    const translateX = -currentIndex * slideDistance;

    slider.style.transform = `translateX(${translateX}px)`;
}

// renderDots
function renderDots() {
    const dots = document.getElementById('dotIndicators');
    dots.innerHTML = '';

    const activeIndex = currentIndex % projects.length;

    projects.forEach((_, index) => {
        const dot = document.createElement('button');
        const isActive = index === activeIndex;
        dot.className = `transition-all ${isActive ? 'w-3 h-3 bg-blue-500 animate-pulse' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 dark:bg-zinc-600 dark:hover:bg-zinc-500'} rounded-full`;
        dot.onclick = () => goToProject(index);
        dots.appendChild(dot);
    });
}

function goToNext() {
    if (isJumping) return;

    currentIndex++;
    updateSliderPosition(true);

    if (currentIndex === projects.length) {
        isJumping = true;
        const slider = document.getElementById('projectsSlider');

        slider.addEventListener('transitionend', () => {
            currentIndex = 0;
            updateSliderPosition(false);
            isJumping = false;
        }, { once: true });
    }

    renderDots();
}

function goToPrevious() {
    if (isJumping) return;

    if (currentIndex === 0) {
        isJumping = true;

        currentIndex = projects.length;
        updateSliderPosition(false);

        requestAnimationFrame(() => {
            currentIndex = projects.length - 1;
            updateSliderPosition(true);
            renderDots();
            isJumping = false;
        });
    } else {
        currentIndex--;
        updateSliderPosition(true);
        renderDots();
    }
}

function goToProject(index) {
    if (isJumping) return;
    currentIndex = index;
    updateSliderPosition(true);
    renderDots();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (!isPaused) {
            goToNext();
        }
    }, 4000);
}

document.getElementById('projectsContainer').addEventListener('mouseenter', () => {
    isPaused = true;
});

document.getElementById('projectsContainer').addEventListener('mouseleave', () => {
    isPaused = false;
});


// Code Solutions Slider Logic
function updateCodeCardsPerView() {
    // This function is simplified to just trigger the card initialization.
    initializeCodeSlider();
}

function initializeCodeSlider() {
    const slider = document.getElementById('codeSolutionsSlider');
    const container = document.getElementById('codeSolutionsContainer');
    
    if (!slider || !container) return;

    // Reset properties previously used for mobile slider mode
    slider.style.transform = '';
    slider.innerHTML = '';
    
    const cardsToRender = codeSolutions; 
    
    // Use the 'contents' class in HTML for the wrapper, and apply card styling directly.
    slider.classList.add('sm:grid-cols-2', 'gap-6');
    slider.classList.remove('flex', 'is-expanded', 'items-stretch'); 

    cardsToRender.forEach((solution) => {
        const card = document.createElement('div');

        card.className = 'sm:col-span-1 h-full'; 

        card.innerHTML = `
            <div class="bg-gray-100 dark:bg-zinc-900 rounded-xl p-6 border border-gray-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all transform hover:shadow-lg flex flex-col justify-between h-full">
                
                <div class="flex flex-col flex-grow code-card-body"> 
                    <h4 class="text-xl font-semibold text-zinc-900 dark:text-white mb-2">${solution.title}</h4>
                    
                    <p class="text-zinc-600 dark:text-gray-400 mb-4 text-sm flex-grow hidden sm:block">${solution.description}</p>
                    
                    <div class="sm:hidden text-zinc-600 dark:text-gray-400 mb-2 text-sm overflow-hidden relative description-wrapper transition-[max-height] duration-500" style="max-height: 2.5rem;">
                         <p class="description-text">${solution.description}</p>
                    </div>

                    <button onclick="toggleDescription(this)" class="sm:hidden text-blue-500 hover:text-blue-600 text-sm font-medium mb-3 self-start">
                        ...See More
                    </button>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${solution.techStack.map(tech => `<span class="px-3 py-1 bg-gray-200 text-zinc-700 dark:bg-zinc-800 dark:text-gray-300 rounded-full text-xs border border-gray-300 dark:border-zinc-700">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="mt-4">
                    <a href="${solution.githubLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition-colors text-sm font-medium group">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        View Repository 
                    </a>
                </div>
            </div>
        `;
        slider.appendChild(card);
    });
}

function updateCodeSliderPosition(withAnimation = true) {
    const slider = document.getElementById('codeSolutionsSlider');
    if (!slider || window.innerWidth >= 640 || !slider.children.length) return;

    if (withAnimation) {
        slider.style.transition = 'transform 700ms ease-in-out';
    } else {
        slider.style.transition = 'none';
    }

    const card = slider.children[0];
    const cardWidth = card.offsetWidth;
    const gap = 24;

    const slideDistance = cardWidth + gap;
    const translateX = -currentCodeIndex * slideDistance;

    slider.style.transform = `translateX(${translateX}px)`;
}

function goToNextCode() {
    if (isCodeJumping || window.innerWidth >= 640) return;

    currentCodeIndex++;
    updateCodeSliderPosition(true);

    if (currentCodeIndex === codeSolutions.length) {
        isCodeJumping = true;

        const slider = document.getElementById('codeSolutionsSlider');

        slider.addEventListener('transitionend', function handler() {
            currentCodeIndex = 0;
            updateCodeSliderPosition(false);
            isCodeJumping = false;
            slider.removeEventListener('transitionend', handler);
        }, { once: true });
    }
}

function goToPreviousCode() {
    if (isCodeJumping || window.innerWidth >= 640) return;

    if (currentCodeIndex === 0) {
        isCodeJumping = true;

        currentCodeIndex = codeSolutions.length;
        updateCodeSliderPosition(false);

        requestAnimationFrame(() => {
            currentCodeIndex = codeSolutions.length - 1;
            updateCodeSliderPosition(true);
            isCodeJumping = false;
        });
    } else {
        currentCodeIndex--;
        updateCodeSliderPosition(true);
    }
}

// Code Auto Slide
function startCodeAutoSlide() {
    codeAutoSlideInterval = setInterval(() => {
        if (window.innerWidth < 640) {
            goToNextCode();
        }
    }, 4000);
}


function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const submitButton = form.querySelector('button[type="submit"]');

    let hasError = false;

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
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const data = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('Message sent successfully!');
                form.reset();
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        console.error(data.errors.map(error => error.message).join(", "));
                    } else {
                        console.error('Oops! There was a problem submitting your form.');
                    }
                });
            }
        }).catch(error => {
            console.error('Oops! There was a network error.', error);
        }).finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    }
}

// Initialize
window.addEventListener('resize', () => {
    updateCardsPerView();
    updateCodeCardsPerView(); // Keep this for responsive rendering between slider/grid
});
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('profilesGridContainer');
    if (window.innerWidth < 640 && container) {
        container.style.maxHeight = '208px';
    }
});

updateCardsPerView();
updateCodeCardsPerView();

startAutoSlide();
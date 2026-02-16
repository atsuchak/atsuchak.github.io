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

const projects = [
    {
        title: 'Tasked ToDo',
        description: 'A sleek and efficient to-do list app featuring visual progress tracking, organized task management, and daily session history for sustained productivity',
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript', 'API'],
        image: './assets/todo_image.png',
        githubLink: 'https://github.com/atsuchak/ToDo-list-app',
        liveLink: 'https://tasked-todo.vercel.app/',
        featured: true,
        category: 'Web Project'
    },
    {
        title: 'Assignment Cover Page',
        description: 'A handy tool that quickly generates UIU-standard assignment cover pages, saving time and effort by removing the need for manual formatting.',
        techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        image: ['./assets/assignment_cover_page_2.png', './assets/assignment_cover_page_1.png', './assets/assignment_cover_page_3.png', './assets/assignment_cover_page_4.png'],
        githubLink: 'https://github.com/atsuchak/uiu-assignment-cover-page-generator',
        liveLink: 'https://uiu-assignment-cover.vercel.app/',
        featured: true,
        category: 'Web Project'
    },
    {
        title: 'Timer Lab',
        description: 'A versatile productivity suite that helps you manage focus sessions with a timer, stopwatch, and clock, keeping your work organized and on track.',
        techStack: ['HTML', 'JavaScript', 'API', 'CSS'],
        image: './assets/timer_lab_1.png',
        images: ['./assets/timer_lab_1.png', './assets/timer_lab_2.png', './assets/timer_lab_3.png'],
        githubLink: 'https://github.com/atsuchak/timer-lab',
        liveLink: 'https://timer-lab.vercel.app/',
        featured: true,
        category: 'Web Project'
    },
    {
        title: 'Code Progress',
        description: 'A simple dashboard to track competitive programming progress and solved problems easily every day, helping you stay organized and focused on improvement.',
        techStack: ['HTML', 'CSS', 'API', 'JavaScript', 'Firebase'],
        image: './assets/code_progress_1.png',
        images: ['./assets/code_progress_1.png', './assets/code_progress_2.png', './assets/code_progress_3.png', './assets/code_progress_4.png'], // Demo multiple
        githubLink: 'private',
        liveLink: 'https://code-progress.vercel.app/',
        category: 'Web Project'
    },
    {
        title: 'QR Generator',
        description: 'A simple and efficient tool for generating QR codes from any text or link, designed for quick sharing and easy scanning on mobile and printed materials.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: './assets/qr_generator_1.png',
        images: ['./assets/qr_generator_1.png', './assets/qr_generator_2.png', './assets/qr_generator_3.png'],
        githubLink: 'https://github.com/atsuchak/QrGenerator',
        liveLink: 'https://atsuchak.github.io/QrGenerator/',
        category: 'Web Project'
    },
];

// Solutions (Non-Web Projects)
const codeSolutions = [
    {
        title: 'Competitive Programming Solutions',
        description: 'Code solutions for various problems found on platforms such as Codeforces, CodeChef and HackerRank',
        techStack: ['C++', 'Java', 'Algorithms', 'Data Structures', 'Problem Solving'],
        githubLink: 'https://github.com/atsuchak/Competitive-Programming.git',
        featured: true,
        category: 'Code Project'
    },
    {
        title: 'Data Structure and Algorithm',
        description: 'Implementations of various core data structures, including searching, sorting, graph, and tree concepts.',
        techStack: ['C++', 'Data Structures', 'Algorithm'],
        githubLink: 'https://github.com/atsuchak/DSA.git',
        featured: true,
        category: 'Code Project'
    },
    {
        title: 'JavaScript',
        description: 'Implementations of javascript small projects, core programming concepts, fundamentals of js.',
        techStack: ['JavaScript', 'HTML', 'CSS'],
        githubLink: 'https://github.com/atsuchak/javascript.git',
        featured: true,
        category: 'Code Project'
    },
    {
        title: 'Star Patterns',
        description: 'A collection of solved star pattern problems using nested loops to build foundational understanding of loop logic.',
        techStack: ['C', 'Basic Programming', 'Nested loop'],
        githubLink: 'https://github.com/atsuchak/Star_Pattern.git',
        category: 'Code Project'
    },
];


function openProjectModal(project) {
    const modal = document.getElementById('projectDetailsModal');
    if (!modal) {
        console.error("Project details modal wrapper not found!");
        return;
    }

    // We will completely replace the sidebar/modal content with a fresh, modern layout
    const modalContent = document.getElementById('modalContentContainer');

    if (!modalContent) {
        console.error("Modal content container not found!");
        return;
    }

    // State for Carousel
    const imagesArray = project.images || (Array.isArray(project.image) ? project.image : [project.image]);
    window.currentProjectImages = imagesArray.filter(img => typeof img === 'string' && img.trim() !== '');
    window.currentImageIndex = 0;

    // Image/Carousel HTML
    let imageSection = '';

    if (window.currentProjectImages.length > 0) {
        const isCarousel = window.currentProjectImages.length > 1;

        imageSection = `
            <img id="modalImage" src="${window.currentProjectImages[0]}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-700">
            
            ${isCarousel ? `
                <!-- Prev Button -->
                <button onclick="prevImage()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                
                <!-- Next Button -->
                <button onclick="nextImage()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                
                <!-- Indicators -->
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    ${window.currentProjectImages.map((_, i) =>
            `<div id="indicator-${i}" class="w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-white scale-125' : 'bg-white/50'}"></div>`
        ).join('')}
                </div>
            ` : ''}
        `;
    } else {
        imageSection = `<div class="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
            <span class="text-4xl text-zinc-700 font-bold opacity-20">Code</span>
        </div>`;
    }

    // simplified tech pills
    const techPills = project.techStack.map(tech =>
        `<span class="text-zinc-500 dark:text-zinc-400 text-xs font-medium mr-3 mb-2 px-2 py-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-md">#${tech}</span>`
    ).join('');

    const liveBtn = project.liveLink ? true : false;
    const githubBtn = project.githubLink ? true : false;

    // Reset container classes for Split Layout (Wider, Flex Row on Desktop)
    modalContent.className = "relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-5xl h-auto md:h-[600px] shadow-2xl transform scale-100 transition-all duration-300 flex flex-col md:flex-row overflow-hidden";

    // Split Layout Design
    modalContent.innerHTML = `
        <!-- Close Button (Absolute Top Right) -->
        <button onclick="closeProjectModal()" class="absolute top-4 right-4 z-50 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-2 bg-white/50 dark:bg-black/20 rounded-full backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <!-- Left: Image Section (Full Height on Desktop) -->
        <div class="w-full md:w-3/5 h-64 md:h-full relative flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 group overflow-hidden">
            ${imageSection}
            <div class="absolute inset-0 bg-black/0 md:group-hover:bg-black/10 transition-colors duration-500 pointer-events-none"></div>
        </div>

        <!-- Right: Content Section -->
        <div class="w-full md:w-2/5 flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-900">
            <div class="p-8 md:p-10 flex flex-col h-full overflow-y-auto custom-scrollbar">
                
                <!-- Header -->
                <div class="mb-6">
                    <span class="inline-block text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-3">
                        ${project.category || 'Featured Project'}
                    </span>
                    <h2 class="text-3xl font-bold text-zinc-900 dark:text-white leading-tight mb-2">${project.title}</h2>
                </div>

                <!-- Body -->
                <div class="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 flex-grow">
                    <p>${project.description}</p>
                </div>

                <!-- Footer: Tech & Actions -->
                <div class="mt-auto">
                    <div class="flex flex-wrap mb-8">
                        ${techPills}
                    </div>

                    <!-- Compact Action Buttons -->
                    <div class="flex flex-wrap items-center gap-4">
                        ${liveBtn ?
            `<a href="${project.liveLink}" target="_blank" class="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-zinc-500/20">
                                <span>Visit Live</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>` : ''
        }
                        
                        ${githubBtn ?
            `<a href="${project.githubLink}" target="_blank" class="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-medium text-sm transition-colors py-2 px-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                <span>Source Code</span>
                            </a>` : ''
        }
                    </div>
                </div>
            </div>
        </div>
    `;

    // Show Modal
    if (modal) {
        modal.classList.add('show');
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
    }
    document.body.style.overflow = 'hidden'; // Lock scroll
}



// Carousel Navigation Logic
function updateCarousel() {
    const imgElement = document.getElementById('modalImage');
    if (imgElement) {
        // Fade effect
        imgElement.style.opacity = '0.5';
        setTimeout(() => {
            imgElement.src = window.currentProjectImages[window.currentImageIndex];
            imgElement.style.opacity = '1';
        }, 150);
    }

    // Update indicators
    window.currentProjectImages.forEach((_, i) => {
        const indicator = document.getElementById(`indicator-${i}`);
        if (indicator) {
            if (i === window.currentImageIndex) {
                indicator.classList.remove('bg-white/50');
                indicator.classList.add('bg-white', 'scale-125');
            } else {
                indicator.classList.remove('bg-white', 'scale-125');
                indicator.classList.add('bg-white/50');
            }
        }
    });
}

function nextImage() {
    if (!window.currentProjectImages || window.currentProjectImages.length <= 1) return;
    window.currentImageIndex = (window.currentImageIndex + 1) % window.currentProjectImages.length;
    updateCarousel();
}

function prevImage() {
    if (!window.currentProjectImages || window.currentProjectImages.length <= 1) return;
    window.currentImageIndex = (window.currentImageIndex - 1 + window.currentProjectImages.length) % window.currentProjectImages.length;
    updateCarousel();
}

function closeProjectModal() {
    const modal = document.getElementById('projectDetailsModal');
    if (!modal) return;

    modal.classList.remove('show');
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    document.body.style.overflow = 'auto'; // Unlock scroll
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeProjectModal();
    }
});


// --- Render Functions (New Grid System) ---

// --- Render Functions (Featured Bento & Library) ---

// Combine all projects for the library
const allProjects = [...projects, ...codeSolutions];

// State for Library
let libraryState = {
    filter: 'All',
    search: '',
    visibleCount: 6,
    increment: 6
};

function renderFeaturedProjects() {
    const grid = document.getElementById('featuredProjectsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const featured = [...projects, ...codeSolutions].filter(p => p.featured);

    featured.forEach((project, index) => {
        const card = document.createElement('div');

        // Bento Grid Spans
        // First item (Code Progress) = Big Hero (2 cols, 2 rows on medium+)
        let spanClass = "row-span-1";
        if (index === 0) {
            spanClass = "md:col-span-2 md:row-span-2";
        } else {
            // ensure others fill nicely if needed, but auto-flow works too.
            // SkyThread, CP, TaskedToDo are remaining 3.
            // Grid is cols-1 md:cols-3.
            // If item 0 is 2x2, it takes 4 cells space? No, CSS Grid spans are helpful.
            // Let's make the first one prominent.
        }

        card.className = `${spanClass} group relative bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col`;
        card.onclick = () => openProjectModal(project);

        // Content
        // Determine Content Styling based on Type (Web vs Code)
        const coverImage = Array.isArray(project.image) ? project.image[0] : project.image;
        const hasImage = !!coverImage;

        let backgroundHTML = '';
        if (hasImage) {
            backgroundHTML = `
                <img src="${coverImage}" alt="${project.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            `;
        } else {
            // Code Project: Solid filled background
            backgroundHTML = `
                <div class="absolute inset-0 w-full h-full bg-zinc-50 dark:bg-zinc-900 transition-colors"></div>
                <div class="absolute inset-0 w-full h-full border border-zinc-200 dark:border-zinc-800/50 rounded-3xl group-hover:border-blue-500/50 transition-colors"></div>
            `;
        }

        // Content Container: Reduced padding on mobile, removed transforms on mobile
        const contentContainerClass = hasImage
            ? "absolute bottom-0 left-0 p-5 md:p-8 w-full md:transform md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300"
            : "absolute inset-0 p-5 md:p-8 flex flex-col justify-start";

        const titleColor = hasImage ? "text-white" : "text-zinc-900 dark:text-white";
        const descColor = hasImage ? "text-gray-300" : "text-zinc-600 dark:text-zinc-400";
        const categoryColor = hasImage ? "text-blue-400" : "text-blue-500";

        // Tech Pills: Reduced padding/border for mobile
        const pillClass = hasImage
            ? "bg-white/5 backdrop-blur-md text-white/90 border border-white/20"
            : "border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500";

        card.innerHTML = `
            ${backgroundHTML}
            
            <div class="${contentContainerClass}">
                <div class="mb-2 md:mb-3">
                     <span class="${categoryColor} font-bold text-[9px] md:text-[10px] tracking-widest uppercase">${project.category || 'Project'}</span>
                </div>
                <h3 class="text-xl md:text-3xl font-bold ${titleColor} mb-2 md:mb-3 leading-tight md:group-hover:text-blue-500 transition-colors">${project.title}</h3>
                <p class="${descColor} text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4 md:mb-6 transition-all duration-300 opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-2 md:group-hover:translate-y-0 hidden md:block">
                    ${project.description}
                </p>
                <div class="flex flex-wrap gap-2 ${hasImage ? '' : 'mt-auto'}">
                    ${project.techStack.slice(0, 3).map(tech =>
            `<span class="px-2.5 py-0.5 md:px-3 md:py-1 ${pillClass} text-[9px] md:text-[10px] rounded-full font-medium transition-colors md:group-hover:border-blue-500/30">${tech}</span>`
        ).join('')}
                </div>
            </div>
            
            <!-- Icon top right - Desktop Only -->
            <div class="absolute top-6 right-6 p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:group-hover:translate-x-0 md:group-hover:translate-y-0 md:translate-x-2 md:-translate-y-2 text-blue-500 hidden md:block">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </div>
        `;

        grid.appendChild(card);
    });
}

function initProjectLibrary() {
    // Define Categories explicitly as requested
    const categories = ['All', 'Web Project', 'Code Project'];
    const filterContainer = document.getElementById('categoryFilters');

    // Custom label mapping for display
    const catLabels = {
        'All': 'All Type',
        'Web Project': 'Web Based Type',
        'Code Project': 'Terminal Based Code Type'
    };

    if (filterContainer) {
        filterContainer.innerHTML = categories.map(cat => `
            <button onclick="setLibraryFilter('${cat}')" 
                class="filter-btn text-sm font-medium transition-all px-3 py-1 ${cat === 'All' ? 'text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white' : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'}"
                data-category="${cat}">
                ${catLabels[cat] || cat}
            </button>
        `).join('');
    }

    // Search Listener
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            libraryState.search = e.target.value.toLowerCase();
            libraryState.visibleCount = libraryState.increment; // Reset pagination on search
            renderProjectLibrary();
        });
    }

    // Load More Listener
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            // Calculate how many we *could* show
            const filteredCount = allProjects.filter(p => {
                const matchesCategory = libraryState.filter === 'All' || p.category === libraryState.filter;
                const matchesSearch = p.title.toLowerCase().includes(libraryState.search) ||
                    p.description.toLowerCase().includes(libraryState.search) ||
                    p.techStack.some(t => t.toLowerCase().includes(libraryState.search));
                return matchesCategory && matchesSearch;
            }).length;

            if (libraryState.visibleCount >= filteredCount) {
                // Showing all, so collapse
                libraryState.visibleCount = libraryState.increment;
                document.getElementById('projectLibraryGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Expand
                libraryState.visibleCount += libraryState.increment;
            }
            renderProjectLibrary();
        };
    }

    renderProjectLibrary();
}

function setLibraryFilter(category) {
    libraryState.filter = category;
    libraryState.visibleCount = libraryState.increment; // Reset pagination

    // Update active button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.className = "filter-btn text-sm font-medium transition-all px-3 py-1 text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white";
        } else {
            btn.className = "filter-btn text-sm font-medium transition-all px-3 py-1 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300";
        }
    });

    renderProjectLibrary();
}

function renderProjectLibrary() {
    const grid = document.getElementById('projectLibraryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!grid) return;

    grid.innerHTML = '';

    // Filter Logic
    const filtered = allProjects.filter(p => {
        const matchesCategory = libraryState.filter === 'All' || p.category === libraryState.filter;
        const matchesSearch = p.title.toLowerCase().includes(libraryState.search) ||
            p.description.toLowerCase().includes(libraryState.search) ||
            p.techStack.some(t => t.toLowerCase().includes(libraryState.search));
        return matchesCategory && matchesSearch;
    });

    // Pagination Logic
    const visibleProjects = filtered.slice(0, libraryState.visibleCount);
    const totalCount = filtered.length;
    const isShowingAll = libraryState.visibleCount >= totalCount;

    if (visibleProjects.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-10 text-zinc-500">No projects found matching your criteria.</div>`;
        if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
        return;
    }

    visibleProjects.forEach(project => {
        const card = document.createElement('div');
        // Clean, Minimalist List Item - Removed borders and background for "cleanest" look
        card.className = "group p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200 cursor-pointer flex flex-col border-b border-zinc-100 dark:border-zinc-800 last:border-0";
        card.onclick = (e) => {
            e.preventDefault();
            openProjectModal(project);
        };

        const thumbImage = Array.isArray(project.image) ? project.image[0] : project.image;
        const icon = thumbImage ?
            `<img src="${thumbImage}" alt="" class="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-zinc-700 grayscale group-hover:grayscale-0 transition-all">` :
            `<div class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">⚡</div>`;

        // Display correct label for category
        // const catLabel = project.category === 'Web Project' ? 'Web App' : 'Code'; // Simplification: remove pill

        card.innerHTML = `
            <div class="flex items-start gap-4">
                ${icon}
                <div class="flex-grow min-w-0">
                    <div class="flex justify-between items-start">
                        <h4 class="font-semibold text-zinc-900 dark:text-zinc-200 text-base truncate pr-4 group-hover:text-blue-600 transition-colors">${project.title}</h4>
                        <span class="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap pt-1">${project.techStack[0]}</span>
                    </div>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                        ${project.description}
                    </p>
                </div>
                <div class="self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-400">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Toggle Load More Button
    if (loadMoreBtn) {
        if (totalCount <= libraryState.increment) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
            if (isShowingAll) {
                loadMoreBtn.textContent = "Show Less";
            } else {
                loadMoreBtn.textContent = "Show More";
            }
        }
    }
}

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

function toggleProfiles() {
    const container = document.getElementById('profilesGridContainer');
    const button = document.getElementById('toggleProfilesButton');
    const text = document.getElementById('buttonText');
    const icon = document.getElementById('buttonIcon');

    if (!container || !button || !text || !icon) return;

    const isExpanding = !container.classList.contains('is-expanded');
    container.classList.toggle('is-expanded');

    if (isExpanding) {
        container.style.maxHeight = container.scrollHeight + "px";
        text.textContent = 'Show Less';
        icon.style.transform = 'rotate(180deg)';
    } else {
        container.style.maxHeight = '240px';
        text.textContent = 'Show More';
        icon.style.transform = 'rotate(0deg)';

        // Optional: scroll back up to the heading if user collapses it
        document.getElementById('competitiveProfilesHeading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// Update the observer settings to be more forgiving on mobile
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
        }
    });
}, {
    threshold: 0.05, // Reduced from 0.2 to 0.05 for small screens
    rootMargin: '50px' // Start animating before the user even reaches the section
});

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Active Section Observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-link').forEach(link => {
                const isMatch = link.dataset.section === id;
                link.classList.toggle('text-blue-400', isMatch);
                link.classList.toggle('text-zinc-600', !isMatch);
                link.classList.toggle('hover:text-zinc-900', !isMatch);
                link.classList.toggle('dark:text-gray-300', !isMatch);
                link.classList.toggle('dark:hover:text-white', !isMatch);
            });
        }
    });
}, {
    threshold: 0.2, // Trigger when 20% is visible
    rootMargin: '-10% 0px -40% 0px' // Bias towards the top/middle of the viewport
});

document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));





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

// --- CP Stats Logic ---
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

async function updateCPStats() {
    const handle = "atsuchak";

    // 1. Codeforces (Official API)
    try {
        const cfInfo = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const cfStatus = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);

        const infoData = await cfInfo.json();
        const statusData = await cfStatus.json();

        if (infoData.status === "OK") {
            const user = infoData.result[0];
            safeSetText('cf-rating', `Rating: ${user.rating} (${user.rank})`);
        }
        if (statusData.status === "OK") {
            const solved = new Set(statusData.result.filter(s => s.verdict === "OK").map(s => s.problem.contestId + s.problem.index)).size;
            safeSetText('cf-solved', `Solved: ${solved}`);
        }
    } catch (e) {
        console.error("CF fetch failed", e);
    }

    // 2. LeetCode (Community API)
    try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
        const data = await res.json();
        if (data.status === "success") {
            safeSetText('lc-solved', `Solved: ${data.totalSolved}`);
            safeSetText('lc-rank', `Global Rank: ${data.ranking.toLocaleString()}`);
        }
    } catch (e) {
        console.error("LC fetch failed", e);
    }

    // 3. CodeChef (Vercel API)
    try {
        const res = await fetch(`https://codechef-api.vercel.app/${handle}`);
        const data = await res.json();
        if (data.success) {
            safeSetText('cc-rating', `Rating: ${data.currentRating}`);
            safeSetText('cc-stars', `Level: ${data.stars}`);
        }
    } catch (e) {
        console.error("CC fetch failed", e);
    }

    // 4. AtCoder (Kenkoooo API)
    try {
        const res = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/info?user=${handle}`);
        const data = await res.json();
        if (data) {
            safeSetText('ac-rating', `Rating: ${data.rating}`);
            safeSetText('ac-rank', `Highest: ${data.max_rating}`);
        }
    } catch (e) {
        console.error("AC fetch failed", e);
    }
    // 5. VJudge (Unofficial API/Scraper)
    try {
        // VJudge often requires a custom proxy/scraper, so we attempt a popular community endpoint
        const res = await fetch(`https://vjudge-api.vercel.app/api/user/${handle}`);
        const data = await res.json();
        if (data.solved) {
            safeSetText('vj-solved', `Solved: ${data.solved}`);
        } else {
            safeSetText('vj-solved', "Solved: 200+"); // Manual fallback
        }
    } catch (e) {
        safeSetText('vj-solved', "Solved: Check Profile");
    }

    // 6. HackerRank (Community Scraper)
    try {
        const res = await fetch(`https://hackerrank-api.vercel.app/api/${handle}`);
        const data = await res.json();
        if (data.solvedCount) {
            safeSetText('hr-solved', `Solved: ${data.solvedCount}`);
            safeSetText('hr-badges', `Badges: ${data.badgesCount}`);
        } else {
            safeSetText('hr-solved', "Solved: Gold Badges");
            safeSetText('hr-badges', "Skill: Problem Solving");
        }
    } catch (e) {
        safeSetText('hr-solved', "View stats on profile");
        safeSetText('hr-badges', "6* Problem Solving");
    }
}

// Popup Control Functions
function showPrivateRepoPopup() {
    document.getElementById('privateRepoPopup').classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closePrivateRepoPopup() {
    document.getElementById('privateRepoPopup').classList.remove('show');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}


// --- Initialization Section ---
function initApp() {
    updateCPStats();

    // Render New Systems
    renderFeaturedProjects();
    initProjectLibrary(); // Initialize Filter & Search Logic + First Render

    const container = document.getElementById('profilesGridContainer');
    if (window.innerWidth < 640 && container) {
        container.style.maxHeight = '240px';
    }
}

window.onload = () => {
    // A tiny 100ms delay gives the mobile browser time to settle the CSS layout
    setTimeout(initApp, 100);
};

// Run everything once the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Handle Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Optional: Re-render if needed, but CSS handles most.
        // Profiles container adjustment
        const container = document.getElementById('profilesGridContainer');
        if (container) {
            if (window.innerWidth < 640) {
                if (!container.classList.contains('is-expanded')) {
                    container.style.maxHeight = '240px';
                }
            } else {
                container.style.maxHeight = 'none';
            }
        }
    }, 250);
});
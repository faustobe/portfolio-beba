document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Filter buttons functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const operaItems = document.querySelectorAll('.opera-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.dataset.filter;

            operaItems.forEach(item => {
                if (filter === 'tutti' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Menu configuration
const menuItems = [
    { text: 'home', path: '/index.html' },
    { text: 'works', path: '/pages/opere.html' },
    { text: 'me', path: '/pages/chi-sono.html' },
    { text: 'connect', path: '/pages/contatti.html' }
];

function initializeNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const currentPath = window.location.pathname;

    // Clear existing menu items
    navMenu.innerHTML = '';

    // Create menu items
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // Adjust paths based on current page location
        const isIndex = currentPath.includes('index.html') || currentPath.endsWith('/');
        const basePath = isIndex ? '' : '../';
        a.href = basePath + item.path.substring(1);
        
        a.textContent = item.text;
        
        // Set active class
        if (currentPath.includes(item.path)) {
            a.classList.add('active');
        }
        
        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeNavigation);

// Lightbox functionality
function createLightbox() {
    const lightboxHtml = `
        <div class="lightbox" id="lightbox">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&lt;</button>
            <button class="lightbox-next">&gt;</button>
            <div class="lightbox-content">
                <img src="" alt="">
                <div class="lightbox-info">
                    <h3></h3>
                    <p></p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHtml);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxTitle = lightbox.querySelector('h3');
    const lightboxInfo = lightbox.querySelector('p');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const opere = document.querySelectorAll('.opera-item');

    opere.forEach((opera, index) => {
        opera.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function updateLightbox() {
        const currentOpera = opere[currentIndex];
        const img = currentOpera.querySelector('img');
        const title = currentOpera.querySelector('h2');
        const info = currentOpera.querySelector('.opera-info p');

        lightboxImg.src = img.src;
        lightboxTitle.textContent = title.textContent;
        lightboxInfo.textContent = info.textContent;
    }

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + opere.length) % opere.length;
        updateLightbox();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % opere.length;
        updateLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
}

// Initialize lightbox
if (document.querySelector('.opera-item')) {
    createLightbox();
}
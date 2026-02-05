// ============================================
// NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll(
    '.skill-category, .timeline-item, .project-card, .cert-card, .detail-card, .contact-card'
);

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

// Add initial styles for reveal animation
const style = document.createElement('style');
style.textContent = `
    .skill-category,
    .timeline-item,
    .project-card,
    .cert-card,
    .detail-card,
    .contact-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .skill-category.revealed,
    .timeline-item.revealed,
    .project-card.revealed,
    .cert-card.revealed,
    .detail-card.revealed,
    .contact-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    /* Stagger animation for grid items */
    .skills-grid .skill-category:nth-child(1) { transition-delay: 0.1s; }
    .skills-grid .skill-category:nth-child(2) { transition-delay: 0.2s; }
    .skills-grid .skill-category:nth-child(3) { transition-delay: 0.3s; }
    .skills-grid .skill-category:nth-child(4) { transition-delay: 0.1s; }
    .skills-grid .skill-category:nth-child(5) { transition-delay: 0.2s; }
    .skills-grid .skill-category:nth-child(6) { transition-delay: 0.3s; }

    .certifications-grid .cert-card:nth-child(1) { transition-delay: 0.1s; }
    .certifications-grid .cert-card:nth-child(2) { transition-delay: 0.2s; }
    .certifications-grid .cert-card:nth-child(3) { transition-delay: 0.1s; }
    .certifications-grid .cert-card:nth-child(4) { transition-delay: 0.2s; }

    .nav-link.active {
        color: var(--color-accent-primary) !important;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // For now, create a mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    const mailtoLink = `mailto:ankurajnlkr@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    // Show success feedback
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Opening Email Client...
    `;
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        contactForm.reset();
    }, 3000);
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// TYPING EFFECT FOR CODE BLOCK (Optional)
// ============================================

const codeContent = document.querySelector('.code-content code');
if (codeContent) {
    const originalHTML = codeContent.innerHTML;

    // Store original content
    codeContent.dataset.original = originalHTML;

    // Typing effect on hero section visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Code is already visible, no typing effect needed
                // but we could add cursor blink
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// ============================================
// SKILL TAG HOVER EFFECT
// ============================================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
        statsAnimated = true;
        // Stats are text-based, so no counter animation needed
        // Just add a subtle pulse effect
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.animation = 'pulse 0.5s ease';
            }, index * 100);
        });
    }
};

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(pulseStyle);

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(`
%c Welcome to Ankur Ajanalkar's Portfolio!

%c If you're looking at the console, you're probably a developer.
%c Let's connect: ankurajnlkr@gmail.com

%c Tech Stack: Java | Spring Boot | AWS | Microservices
`,
'color: #3b82f6; font-size: 20px; font-weight: bold;',
'color: #a1a1aa; font-size: 14px;',
'color: #22c55e; font-size: 14px;',
'color: #f59e0b; font-size: 12px;'
);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images when implemented
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// THEME TOGGLE (Optional - for future)
// ============================================

// Uncomment to enable theme toggle functionality
/*
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
*/

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Here you would normally send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Typing Effect for Hero Section
const typeWriter = () => {
    const text = "Full Stack Developer";
    const titleElement = document.querySelector('.title');
    if (titleElement && titleElement.textContent === text) {
        let i = 0;
        titleElement.textContent = '';
        
        const typing = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 100);
            }
        };
        
        typing();
    }
};

// Run typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add animation to skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    observer.observe(item);
});

// Add animation to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
    
    observer.observe(card);
});

// Dark Mode Toggle (optional feature)
const createDarkModeToggle = () => {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.classList.add('dark-mode-toggle');
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
};

// Initialize dark mode toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', createDarkModeToggle);

// Add CSS for dark mode
const darkModeStyles = `
    body.dark-mode {
        --text-color: #f0f0f0;
        --text-light: #b0b0b0;
        --bg-color: #1a1a1a;
        --white: #2c2c2c;
    }
    
    body.dark-mode .navbar {
        background: #2c2c2c !important;
    }
    
    body.dark-mode .hero {
        background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
    }
    
    body.dark-mode .skill-item {
        background: #333;
    }
    
    body.dark-mode .skill-item:hover {
        background: var(--primary-color);
    }
    
    body.dark-mode .project-card {
        background: #2c2c2c;
    }
    
    body.dark-mode .contact-form {
        background: #2c2c2c;
    }
    
    body.dark-mode .form-group input,
    body.dark-mode .form-group textarea {
        background: #1a1a1a;
        color: #f0f0f0;
        border-color: #444;
    }
`;

// Add dark mode styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);
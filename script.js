// ===== Page Loader =====
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-inner"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
    }, 500);
});

// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// ===== Smooth Scrolling with Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 10;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link with Scroll Spy =====
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (entry.isIntersecting && navLink) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section[id]').forEach(section => {
    navObserver.observe(section);
});

// ===== Navbar Background on Scroll =====
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Hide/Show navbar on scroll
    if (window.scrollY > lastScrollY && window.scrollY > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// ===== Typing Effect for Title =====
const typeWriter = () => {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;
    
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.minHeight = '2.5rem';
    
    let i = 0;
    const typing = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        }
    };
    
    setTimeout(typing, 1000);
};

// Run typing effect when page loads
window.addEventListener('load', typeWriter);

// ===== Animate Elements on Scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .project-card, .timeline-item, .skill-category, .education-card, .highlight-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(element);
    });
};

animateOnScroll();

// ===== Skill Progress Bars Animation =====
const animateSkills = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                if (level) {
                    entry.target.style.setProperty('--skill-level', level + '%');
                    entry.target.classList.add('skill-animated');
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
};

animateSkills();

// ===== Project Cards Hover Effect =====
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== Form Handling with Validation =====
const contactForm = document.getElementById('contactForm');
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/jeelbutani008@gmail.com';
const WHATSAPP_NUMBER = '918511450340';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function collectFormValues(form) {
    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = typeof value === 'string' ? value.trim() : value;
    });
    return data;
}

function validateContact(data) {
    if (!data.name || data.name.length < 2) return 'Please enter your name.';
    if (!EMAIL_REGEX.test(data.email || '')) return 'Please enter a valid email address.';
    if (!data.subject) return 'Please add a subject.';
    if (!data.message || data.message.length < 10) return 'Message should be at least 10 characters.';
    if (data._honey) return 'Submission blocked.';
    return null;
}

function setButtonLoading(btn, loadingHtml) {
    btn.dataset.originalHtml = btn.innerHTML;
    btn.innerHTML = loadingHtml;
    btn.disabled = true;
}

function restoreButton(btn) {
    if (btn.dataset.originalHtml) {
        btn.innerHTML = btn.dataset.originalHtml;
        delete btn.dataset.originalHtml;
    }
    btn.disabled = false;
}

async function sendViaEmail(data, button) {
    setButtonLoading(button, '<i class="fas fa-spinner fa-spin"></i> Sending...');
    try {
        const response = await fetch(FORMSUBMIT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                Name: data.name,
                Email: data.email,
                Phone: data.phone || 'Not provided',
                Subject: data.subject,
                Message: data.message,
                _subject: `Portfolio enquiry: ${data.subject}`,
                _template: 'table',
                _captcha: 'false'
            })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === 'false') {
            throw new Error(result.message || 'Mail server rejected the request.');
        }
        showNotification('Message delivered! I will be in touch shortly.', 'success');
        contactForm.reset();
    } catch (err) {
        console.error('Email send failed:', err);
        showNotification('Could not send right now. Try WhatsApp or email me directly.', 'error');
    } finally {
        restoreButton(button);
    }
}

function sendViaWhatsApp(data, button) {
    const lines = [
        `Hi Jeel, I'm reaching out from your portfolio.`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`
    ];
    if (data.phone) lines.push(`Phone: ${data.phone}`);
    lines.push(`Subject: ${data.subject}`, ``, `Message:`, data.message);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    const whatsappWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!whatsappWindow) {
        showNotification('Pop-up blocked. Please allow pop-ups to open WhatsApp.', 'error');
        return;
    }
    showNotification('Opening WhatsApp with your message ready to send.', 'success');
    setButtonLoading(button, '<i class="fab fa-whatsapp"></i> Opened in WhatsApp');
    setTimeout(() => restoreButton(button), 2500);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = collectFormValues(contactForm);
        const error = validateContact(data);
        if (error) {
            showNotification(error, 'error');
            return;
        }
        await sendViaEmail(data, e.submitter || contactForm.querySelector('[data-action="email"]'));
    });

    const whatsappBtn = contactForm.querySelector('[data-action="whatsapp"]');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const data = collectFormValues(contactForm);
            const error = validateContact(data);
            if (error) {
                showNotification(error, 'error');
                return;
            }
            sendViaWhatsApp(data, whatsappBtn);
        });
    }
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        background: type === 'success' ? '#00C896' : type === 'error' ? '#FF6B6B' : '#5B3FF9',
        color: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease',
        maxWidth: '400px'
    });
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ===== Add CSS for animations =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .skill-animated::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--primary-color);
        width: var(--skill-level, 0);
        transition: width 2s ease;
    }
    
    .project-card::before {
        content: '';
        position: absolute;
        top: var(--mouse-y);
        left: var(--mouse-x);
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(91, 63, 249, 0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .project-card:hover::before {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < 1000) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Copy Email to Clipboard =====
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            showNotification(`Email copied to clipboard: ${email}`, 'success');
        });
    });
});

// ===== Add Loading States for Images =====
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// ===== Console Easter Egg =====
console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #5B3FF9;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 16px; color: #00D4FF;');
console.log('%c📧 jeelbutani008@gmail.com', 'font-size: 14px; color: #fff; background: #5B3FF9; padding: 5px 10px; border-radius: 5px;');

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }
    }
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Press '/' to focus on first nav link
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.querySelector('.nav-link').focus();
    }
    
    // Press ESC to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    });
}
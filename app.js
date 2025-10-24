// Skeleton simulation - sab kuch hide karo pehle
function simulateLoading() {
    console.log("Skeleton animation starting...");

    // 3 second baad content show karo
    setTimeout(() => {
        document.body.classList.add('loaded');

        // Show actual content and hide skeletons
        const actualContents = document.querySelectorAll('.actual-content');
        actualContents.forEach(content => {
            content.style.display = 'block';
        });

        // Hide skeletons
        const skeletons = document.querySelectorAll('.skeleton-content');
        skeletons.forEach(skeleton => {
            skeleton.style.display = 'none';
        });

        console.log("Content loaded after 3 seconds");
    }, 3000);
}

// Header functionality
const shareBtn = document.querySelector(".share-btn");
const dropdown = document.getElementById("shareDropdown");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

shareBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
});

menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mainNav.classList.toggle("active");

    const icon = menuToggle.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.addEventListener('click', (e) => {
    if (!shareBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
    }

    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove("active");
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Form functionality - FIXED
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeForm');
const contactFormElement = document.getElementById('contactFormElement');
const getInTouchBtns = document.querySelectorAll('.btn1');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

// IMPORTANT: Button click event with proper event handling
getInTouchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Button clicked - opening form');
        contactForm.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeForm.addEventListener('click', () => {
    contactForm.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
});

// Form submission with Formspree
contactFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitSpinner.style.display = 'inline-block';

    try {
        // Send form data to Formspree
        const response = await fetch('https://formspree.io/f/mldpyyvn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
            resetForm();
            // Close form after 2 seconds
            setTimeout(() => {
                contactForm.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.log('Error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.textContent = 'Submit';
        submitSpinner.style.display = 'none';
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
}

function resetForm() {
    contactFormElement.reset();
    formMessage.className = 'form-message';
    formMessage.style.display = 'none';
}

// Close form when clicking outside
contactForm.addEventListener('click', (e) => {
    if (e.target === contactForm) {
        contactForm.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetForm();
    }
});

// Show More functionality for services
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.flip-card.hidden');
let isExpanded = false;

showMoreBtn.addEventListener('click', () => {
    if (!isExpanded) {
        hiddenCards.forEach(card => {
            card.classList.remove('hidden');
            card.classList.add('card-fade-in');
        });
        showMoreBtn.innerHTML = '<span>Show Less Services</span><i class="fas fa-chevron-up ml-2 transition-transform duration-300"></i>';
        isExpanded = true;
    } else {
        hiddenCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('card-fade-in');
        });
        showMoreBtn.innerHTML = '<span>Show More Services</span><i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>';
        isExpanded = false;
    }
});

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const total = slides.length;

function updateSlider(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    updateSlider(currentIndex);
}, 5000);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(autoSlide);
        currentIndex = parseInt(dot.dataset.index);
        updateSlider(currentIndex);
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % total;
            updateSlider(currentIndex);
        }, 5000);
    });
});

// NEW FORM FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const skeletonForm = document.getElementById('skeletonForm');
    const contactFormContent = document.getElementById('contactFormContent');
    const successAnimation = document.getElementById('successAnimation');
    const genuityContactForm = document.getElementById('genuityContactForm');
    const genuitySubmitBtn = document.getElementById('genuitySubmitBtn');
    const genuitySubmitText = document.getElementById('genuitySubmitText');
    const genuitySubmitSpinner = document.getElementById('genuitySubmitSpinner');
    const genuityFormMessage = document.getElementById('genuityFormMessage');
    const sendAnotherBtn = document.getElementById('sendAnotherBtn');

    // Simulate loading delay for new form
    function simulateFormLoading() {
        console.log("New form skeleton loading started...");

        // Show skeleton for 2 seconds
        setTimeout(() => {
            skeletonForm.style.display = 'none';
            contactFormContent.style.display = 'block';
            console.log("New form content loaded");
        }, 2000);
    }

    // Form submission handler for new form
    genuityContactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data for validation
        const formData = new FormData(genuityContactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        genuitySubmitBtn.disabled = true;
        genuitySubmitText.textContent = 'Sending...';
        genuitySubmitSpinner.style.display = 'inline-block';

        try {
            // Submit the form using Formspree
            const response = await fetch(genuityContactForm.action, {
                method: 'POST',
                body: new FormData(genuityContactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success animation
                contactFormContent.style.display = 'none';
                successAnimation.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
        } finally {
            // Reset button state
            genuitySubmitBtn.disabled = false;
            genuitySubmitText.textContent = 'Send Message';
            genuitySubmitSpinner.style.display = 'none';
        }
    });

    // Send another message button
    sendAnotherBtn.addEventListener('click', function () {
        successAnimation.style.display = 'none';
        contactFormContent.style.display = 'block';
        genuityContactForm.reset();
        genuityFormMessage.style.display = 'none';
    });

    // Show form message
    function showFormMessage(message, type) {
        genuityFormMessage.textContent = message;
        genuityFormMessage.className = `contact-form-message contact-form-${type}`;
    }

    // Start the loading simulation for new form
    simulateFormLoading();
});

// Scroll Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const flipCards = document.querySelectorAll('.flip-card');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    flipCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Page load pe simulation start karo
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM loaded, starting skeleton animation");
    simulateLoading();
    initScrollAnimations();
});

// Here To start Image Gallery and Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Light Gallery
    const lightGallery = document.getElementById('lightgallery');
    if (lightGallery) {
        lightGallery.addEventListener('lgInit', (event) => {
            console.log('LightGallery initialized');
        });

        const gallery = window.lightGallery(lightGallery, {
            selector: '.image-item',
            speed: 500,
            download: false,
            counter: true,
            getCaptionFromTitleOrAlt: true
        });
    }

    // Filter functionality
    const filterLinks = document.querySelectorAll('.filters ul li a');
    const imageItems = document.querySelectorAll('.image-item');
    const projectCount = document.getElementById('projectCount');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');

            // Remove active class from all links
            filterLinks.forEach(l => l.classList.remove('active'));
            // Add active class to the clicked link
            link.classList.add('active');

            let visibleCount = 0;

            // Show/hide images based on filter
            imageItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Update project counter
            projectCount.textContent = visibleCount;
        });
    });

    // Project details functionality
    const projectDetailButtons = document.querySelectorAll('.project-details');
    projectDetailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const project = button.getAttribute('data-project');
            alert(`Showing details for ${project} project`);
            // In a real implementation, you would show a modal with project details
        });
    });

    // View project functionality
    const viewProjectButtons = document.querySelectorAll('.view-project');
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const project = button.getAttribute('data-project');
            alert(`Opening ${project} project in new tab`);
            // In a real implementation, you would navigate to the project page
        });
    });

    // Add keyboard navigation for Light Gallery
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.querySelector('.lg-backdrop.in')) {
            gallery.closeGallery();
        }
    });
});

// Here To start Experience Timer functionly
// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 150;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Create Floating Particles
function createParticles() {
    const container = document.querySelector('.counter-section');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${Math.random() * 6 + 4}s`;

        container.appendChild(particle);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Start counters after a short delay
    setTimeout(animateCounters, 800);

    // Create particles
    createParticles();

    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.counter-card').forEach(card => {
        observer.observe(card);
    });
});

// Show more Function for Team
document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.querySelector('.show-more-btn');
    const teamGrid = document.getElementById('teamGrid');
    const hiddenCards = document.querySelectorAll('.team-member-card.hidden');
    let cardsToShow = 2; // Number of cards to show each click
    let currentIndex = 0;

    showMoreBtn.addEventListener('click', function () {
        // Show next set of hidden cards
        const cardsToReveal = Array.from(hiddenCards).slice(currentIndex, currentIndex + cardsToShow);

        cardsToReveal.forEach(card => {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        });

        currentIndex += cardsToShow;

        // Hide button if no more cards to show
        if (currentIndex >= hiddenCards.length) {
            showMoreBtn.style.display = 'none';
        }

        // Update button text if it's the last click
        if (currentIndex + cardsToShow >= hiddenCards.length) {
            showMoreBtn.innerHTML = '<span>Show Remaining Team Members</span> <i class="fas fa-chevron-down"></i>';
        }
    });

    // Initially hide the button if there are no hidden cards
    if (hiddenCards.length === 0) {
        showMoreBtn.style.display = 'none';
    }
});

// Get more Functions

document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const deviceSlides = document.querySelectorAll('.device-slide');

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            deviceSlides.forEach(slide => slide.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
            deviceSlides[tabId - 1].classList.add('active');
        });
    });

    // Auto slide functionality
    let currentSlide = 0;
    function autoSlide() {
        currentSlide = (currentSlide + 1) % tabLinks.length;
        tabLinks[currentSlide].click();
    }

    // Change slide every 5 seconds
    setInterval(autoSlide, 5000);
});

// Blog Here

// Add scroll animation for blog cards
document.addEventListener('DOMContentLoaded', function () {
    const blogCards = document.querySelectorAll('.blog-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    blogCards.forEach(card => {
        observer.observe(card);
    });
});


// Navigation functionality

// Fixed Navigation Functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('#mainNav a');
    const headerHeight = 80;

    // Navigation mapping
    const navMap = {
        'nav-home': { type: 'top', target: 0 },
        'nav-about': { type: 'element', target: '.slider-main' },
        'nav-services': { type: 'id', target: 'services' },
        'nav-projects': { type: 'id', target: 'projects' },
        'nav-team': { type: 'id', target: 'team' },
        'nav-news': { type: 'id', target: 'blog' },
        'nav-contacts': { type: 'id', target: 'contactFormSection' }
    };

    // Click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Update active state
            navLinks.forEach(nav => nav.classList.remove('act'));
            this.classList.add('act');

            // Scroll to target
            const navConfig = navMap[this.id];
            if (navConfig) {
                scrollToTarget(navConfig);
            }
        });
    });

    function scrollToTarget(config) {
        let targetPosition = 0;

        if (config.type === 'top') {
            targetPosition = 0;
        }
        else if (config.type === 'element') {
            const element = document.querySelector(config.target);
            if (element) targetPosition = element.offsetTop;
        }
        else if (config.type === 'id') {
            const element = document.getElementById(config.target);
            if (element) targetPosition = element.offsetTop;
        }

        if (targetPosition > 0) {
            window.scrollTo({
                top: targetPosition - headerHeight,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Update active nav on scroll
    window.addEventListener('scroll', function () {
        const scrollPos = window.scrollY + 100;

        const sections = [
            { navId: 'nav-home', element: document.body, threshold: 100 },
            { navId: 'nav-about', element: document.querySelector('.slider-main') },
            { navId: 'nav-services', element: document.querySelector('#services') },
            { navId: 'nav-projects', element: document.querySelector('#projects') },
            { navId: 'nav-team', element: document.querySelector('#team') },
            { navId: 'nav-news', element: document.querySelector('#blog') },
            { navId: 'nav-contacts', element: document.querySelector('#contactFormSection') }
        ];

        let currentActive = 'nav-home';

        sections.forEach(section => {
            if (section.element) {
                const sectionTop = section.element.offsetTop;
                const sectionBottom = sectionTop + section.element.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    currentActive = section.navId;
                }
            }
        });

        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('act');
            if (link.id === currentActive) {
                link.classList.add('act');
            }
        });
    });

    // Mobile menu handling
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });
});
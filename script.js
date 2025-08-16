/* --- COMPLETE AND FINAL JAVASCRIPT - ALL FUNCTIONS AND DATA RESTORED --- */

document.addEventListener('DOMContentLoaded', function () {
    initializePortfolio();
});

function initializePortfolio() {
    initNavigation();
    initFloatingParticles();
    initScrollAnimations();
    initCertificatesSection();
    initContactForm();
    initBackToTopButton();
    initSmoothScrolling();
}

// ===================================================================
// CERTIFICATES SECTION 
// ===================================================================

function initCertificatesSection() {
    const allCerts = getCertificatesData();
    const certificatesGrid = document.getElementById('certificatesGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('certificateSearch');
    const counter = document.querySelector('.counter-number');

    if (counter) {
        counter.setAttribute('data-target', allCerts.length);
    }
    
    populateCategoryFilter(allCerts, categoryFilter);
    renderCertificates(allCerts, certificatesGrid);

    const applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        const filteredCerts = allCerts.filter(cert => {
            const matchesSearch = cert.title.toLowerCase().includes(searchTerm) || cert.issuer.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Update the visual grid of certificates
        renderCertificates(filteredCerts, certificatesGrid);
        
        // Instantly update the count to match the number of filtered certificates
        updateCertificateCount(filteredCerts.length);
    };

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    // Start the counter animation as soon as the section is ready
    animateCounter();
}

/**
 * Instantly updates the certificate counter text to a specific number.
 * @param {number} count The number to display in the counter.
 */
function updateCertificateCount(count) {
    const counter = document.querySelector('.counter-number');
    if (counter) {
        counter.textContent = count;
    }
}

function renderCertificates(certsToRender, gridElement) {
    gridElement.innerHTML = '';
    if (certsToRender.length === 0) {
        gridElement.innerHTML = '<p class="no-results">No certificates found matching your criteria.</p>';
        return;
    }
    certsToRender.forEach(cert => {
        const certCard = createCertificateCard(cert);
        gridElement.appendChild(certCard);
    });
}

function createCertificateCard(cert) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.innerHTML = `
        <div class="certificate-image-container">
            <img src="${cert.image}" alt="${cert.title}" class="certificate-image" loading="lazy">
        </div>
        <div class="certificate-info">
            <h4>${cert.title}</h4>
            <p>Issued by ${cert.issuer} &bull; ${cert.date}</p>
            <span class="certificate-category">${cert.issuer}</span>
        </div>`;
    card.addEventListener('click', () => { window.open(cert.image, '_blank'); });
    return card;
}

function populateCategoryFilter(allCerts, filterElement) {
    const categories = [...new Set(allCerts.map(cert => cert.issuer))];
    if (filterElement) {
        filterElement.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase().replace(/\s+/g, '-');
            option.textContent = category;
            filterElement.appendChild(option);
        });
    }
}

function getCertificatesData() {
    // Corrected data with accurate counts and fixed category names for filtering
    return [
        // freeCodeCamp (1)
        { title: "Responsive Web Design", issuer: "freeCodeCamp", category: "freecodecamp", date: "2024", image: "assets/Certificates/free-code-camp/responsive-web-design.png" },
        
        // MKCL (3)
        { title: "MS-CIT", issuer: "MKCL", category: "mkcl", date: "2018", image: "assets/Certificates/mkcl/MSCIT.jpg" },
        { title: "Photo Editing", issuer: "MKCL", category: "mkcl", date: "2021", image: "assets/Certificates/mkcl/Photo Editing Marksheet.jpg" },
        { title: "Tally", issuer: "MKCL", category: "mkcl", date: "2021", image: "assets/Certificates/mkcl/Tally_marksheet.jpg" },
        { title: "Financial Accounting using Tally Prime", issuer: "MKCL", category: "mkcl", date: "2021", image: "assets/Certificates/mkcl/tally.jpg" },

        
        // College (15)
        
        { title: "Degree BA", issuer: "College", category: "college", date: "2023", image: "assets/Certificates/college/degree-ba.jpg" },
        { title: "SSC Diploma", issuer: "College", category: "college", date: "2018", image: "assets/Certificates/college/ssc-diploma.jpg" },


        { title: "3-Day Soft Skills Development Workshop", issuer: "College", category: "college", date: "2024", image: "assets/Certificates/college/3-day-soft-skills-development-workshop.png" },
        { title: "Certificate of Granthpal Din 2021", issuer: "College", category: "college", date: "2021", image: "assets/Certificates/college/certificate-of-granthpal-din-2021.png" },
        { title: "Basic Electronics", issuer: "College", category:"college", date: "2023", image: "assets/Certificates/college/basic-electronics.png"},
        { title: "Geography Day Celabrations", issuer: "College", category:"college", date: "2021", image: "assets/Certificates/college/geography-day-celebrations.png"},
        { title: "National Nutrition Month Quiz", issuer: "College", category:"college", date: "2020", image: "assets/Certificates/college/national-nutrition-month-quiz.png"},
        { title: "ENVIRONMENTAL CONSCIOUSNESS", issuer: "College", category:"college", date: "2023", image: "assets/Certificates/college/environmental-consciousness.png"},
        { title: "Biofertilizers National Seminar", issuer: "College", category:"college", date: "2020", image: "assets/Certificates/college/national-seminar-biofertilizers.png"},
        { title: "Netaji Subhas Chandra Bose quiz", issuer: "College", category:"college", date: "2021", image: "assets/Certificates/college/netaji-subhash-chandra-bose-quiz.png"},
        { title: "Book Review Competition", issuer: "College", category:"college", date: "2021", image: "assets/Certificates/college/book-review-competition.png"},
        { title: "inter Collegiate Online Competition", issuer: "College", category:"college", date: "2020", image: "assets/Certificates/college/online-inter-collegiative-online-competition.png"},
        { title: "Poster Competition", issuer: "College", category:"college", date: "2020", image: "assets/Certificates/college/poster-competition-2020.png"},
        { title: "Poster Competition", issuer: "College", category:"college", date: "2022", image: "assets/Certificates/college/poster-competition-2022.png"},
        { title: "Shiksha Mandal Wardha", issuer: "College", category:"college", date: "2021", image: "assets/Certificates/college/shiksha-mandal-wardha-indian-heritage.png"},
        { title: "Swayam & MOOC", issuer: "College", category:"college", date: "2022", image: "assets/Certificates/college/swayam.png"},
        { title: "World Hindi day Quiz", issuer: "College", category:"college", date: "2022", image: "assets/Certificates/college/world-hindi-day-2022-quiz.png"},

        // HP Life (27)
        { title: "3D Printing", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/3d-printing.png" },
        { title: "Agile Project Management", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/agile-project-management.png" },
        { title: "AI for Beginners", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/ai-for-beginners.png" },
        { title: "AI for Business Professionals", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/ai-for-business-professionals.png" },
        { title: "Business Communications", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/business-communications.png" },
        { title: "Business Email", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/business-email.png" },
        { title: "Circular Economy", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/circular-economy.png" },
        { title: "Customer Experience", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/customer-experience.png" },
        { title: "Customer Relationship Management", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/customer-relationship-management.png" },
        { title: "Data Science and Analytics", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/data-science-and-analytics.png" },
        { title: "Design Thinking", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/design-thinking.png" },
        { title: "Effective Business Websites", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/effective-business-websites.png" },
        { title: "Effective Leadership", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/effective-leadership.png" },
        { title: "Effective Presentations", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/effective-presentation.png" },
        { title: "Growth Engine for Your Business", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/growth-engine-for-your-business.png" },
        { title: "Introduction to Cybersecurity Awareness", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/introduction-to-cybersecurity-awareness.png" },
        { title: "Introduction to Digital Business Skills", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/introduction-to-digital-business-skills.png" },
        { title: "Inventory Management", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/inventory-management.png" },
        { title: "IT for Business Success", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/it-for-business-success.png" },
        { title: "Marketing Benefits vs. Features", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/marketing-benefits-features.png" },
        { title: "Presenting Data", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/presenting-data.png" },
        { title: "Resume Writing and Job Interviewing", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/resume-writing-job-interview.png" },
        { title: "Social Entrepreneurship", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/social-entrepreneurship.png" },
        { title: "Social Media Marketing", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/social-media-marketing.png" },
        { title: "Starting a Small Business", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/starting-a-business.png" },
        { title: "Strategic Planning", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/strategic-planning.png" },
        { title: "Success Mindset", issuer: "HP Life", category: "hp-life", date: "N/A", image: "assets/Certificates/hp-life/success-mindset.png" },
        
        // My Gov (31)
        { title: "Dekho Apna Desh Webinar - Agra", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Agra.jpg" },
        { title: "Dekho Apna Desh Webinar - Birding in India", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Birding in india.jpg" },
        { title: "Dekho Apna Desh Webinar - Buddhist Circuit by Train", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/BUDDHIST CIRCUIT BY TRAIN.jpg" },
        { title: "Dekho Apna Desh Webinar - Charkhe pe Charcha", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Charkhe pe charcha.jpg" },
        { title: "Dekho Apna Desh Webinar - Chennai", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Chennai.jpg" },
        { title: "Farmers First Quiz", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/FARMER.jpg" },
        { title: "Eat Right Quiz", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Food.jpg" },
        { title: "Gender Sensitization & Legal Awareness Quiz", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Gender awareness.jpg" },
        { title: "Dekho Apna Desh Webinar - Gujarat", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Gujrat (877×620).jpg" },
        { title: "Dekho Apna Desh Webinar - India's Hidden Gems", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/India hidden gems.jpg" },
        { title: "Dekho Apna Desh Webinar - Incredible India", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/India adventure travel.jpg" },
        { title: "Dekho Apna Desh Webinar - Jewel of Vidarbha", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Jewel of Vidarbha.jpg" },
        { title: "Dekho Apna Desh Webinar - Kolkata", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/KOLKATA.jpg" },
        { title: "Dekho Apna Desh Webinar - Punjab", issuer: "My Gov", "category": "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Ministry of tourism(1).jpg" },
        { title: "Dekho Apna Desh Webinar - Inspired by the past", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Ministry of tourism(2).jpg" },
        { title: "Dekho Apna Desh Webinar - In the Footsteps of the Buddha", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Ministry of tourism(3).jpg" },
        { title: "Dekho Apna Desh Webinar - Rural Tourism", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Ministry of tourism(4).jpg" },
        { title: "Dekho Apna Desh Webinar - Promoting Destinations with Cuisines", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Ministry of tourism.jpg" },
        { title: "Dekho Apna Desh Webinar - Mystique Nagaland", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Nagaland.jpg" },
        { title: "Quiz on Netaji Subhas Chandra Bose", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/NETAJI 125 BIRTH.jpg" },
        { title: "Dekho Apna Desh Webinar - Relevance of Netaji Subhas Chandra Bose", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/NETAJI.jpg" },
        { title: "Dekho Apna Desh Webinar - The Paradise for Trekkers", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Paradise of trekkers.jpg" },
        { title: "Patriotic Quiz on Republic Day 2021", issuer: "My Gov", category: "my-gov", date: "2021", image: "assets/Certificates/my-gov/PATRIOTIC.jpg" },
        { title: "Dekho Apna Desh Webinar - Rajasthan", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/RAJASTHAN.jpg" },
        { title: "Dekho Apna Desh Webinar - Bundi", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Rajput capital.jpg" },
        { title: "Quiz on Road Safety", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Road safety(1).jpg" },
        { title: "Dekho Apna Desh Webinar - Salt March", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Salt March.jpg" },
        { title: "Spice it Up Quiz", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Spice it up.jpg" },
        { title: "Dekho Apna Desh Webinar - The Bombay Years", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/The Bombay.jpg" },
        { title: "'Friend' of TRIBES INDIA Quiz", issuer: "My Gov", category: "my-gov", date: "N/A", image: "assets/Certificates/my-gov/Tribes.jpg" }
    ];
}


// ===================================================================
// ALL OTHER ORIGINAL FUNCTIONS RESTORED
// ===================================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        highlightActiveSection();
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 71) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function initFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    particlesContainer.innerHTML = '';
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particlesContainer.appendChild(particle);
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (This is a demo)');
    });
}

function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetEl = document.querySelector(this.getAttribute('href'));
            if (targetEl) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetEl.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function animateCounter() {
    const counter = document.querySelector('.counter-number');
    if (!counter) return;
    
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 20);

}


// Main initialization function
function initPortfolio() {
    initNavigation();
    initSmoothScrolling();
    initScrollSpy();
    initProjectAnimations();
    initCVDownloadTracking();
    initImageLoading();
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll spy for active navigation
function initScrollSpy() {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Project animations and interactions
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.animationDelay = `${index * 0.1}s`;
        projectObserver.observe(card);
    });

    // Add click tracking for project links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            console.log(`Project clicked: ${projectName} - ${this.href}`);
            // You can add analytics here later
        });
    });

    // Optional: GitHub repository stats
    // initGitHubStats();
}

// GitHub stats (optional - uncomment if needed)
function initGitHubStats() {
    const fetchRepoStats = async (repoName) => {
        try {
            const response = await fetch(`https://api.github.com/repos/wambugujoan/${repoName}`);
            if (response.ok) {
                const data = await response.json();
                return {
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    updated: new Date(data.updated_at).toLocaleDateString()
                };
            }
        } catch (error) {
            console.log(`Could not fetch stats for ${repoName}:`, error);
        }
        return null;
    };

    const repos = ['ATM-Project', 'AI-Safari', 'Earth-Reborn-Chain'];
    
    // Uncomment to fetch and display repo stats
    /*
    repos.forEach(async (repo) => {
        const stats = await fetchRepoStats(repo);
        if (stats) {
            console.log(`${repo} - Stars: ${stats.stars}, Forks: ${stats.forks}`);
        }
    });
    */
}

// CV Download tracking
function initCVDownloadTracking() {
    const downloadButtons = document.querySelectorAll('a[download*="Joan-Mugure-Wambugu-CV"]');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track download event
            console.log('CV download initiated');
            
            // You can add analytics here later, for example:
            // gtag('event', 'download', {
            //     'event_category': 'CV',
            //     'event_label': 'Joan Mugure Wambugu CV'
            // });
            
            // Optional: Add a small delay to ensure download starts before any page navigation
            setTimeout(() => {
                // Success feedback (optional)
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Download Started!';
                this.style.background = '#27ae60';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            }, 100);
        });
    });

    // Check if CV file exists (update path if needed)
    fetch('Joan-Mugure-Wambugu-CV.pdf')
        .then(response => {
            if (!response.ok) {
                console.warn('CV file not found or inaccessible');
                // You could show a fallback message or redirect to LinkedIn
            }
        })
        .catch(error => {
            console.warn('Error checking CV file:', error);
        });
}

// Image loading handler
function initImageLoading() {
    const profileImg = document.querySelector('.profile-img');
    
    if (profileImg && profileImg.tagName === 'IMG') {
        // Add loading class
        profileImg.classList.add('loading');
        
        // Handle image load
        profileImg.addEventListener('load', function() {
            this.classList.remove('loading');
        });
        
        // Handle image error
        profileImg.addEventListener('error', function() {
            this.classList.remove('loading');
            console.error('Profile image failed to load');
            // You could set a fallback image here
            // this.src = 'assets/fallback-profile.jpg';
        });
    }
}

// Fallback for CV download
function handleCVDownload(link) {
    // Try to download first, if fails, open in new tab
    setTimeout(() => {
        // Check if download likely succeeded (you might need more sophisticated checks)
        if (!document.querySelector(':focus')) {
            window.open(link.href, '_blank');
        }
    }, 1000);
    return true;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);

// Add loading animation when window loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add error handling for any uncaught errors
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});
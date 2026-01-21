/* ============================================
   KidsVerse - Educational Website for Kids
   Interactive JavaScript Features
   ============================================ */

// ==================== GLOBAL VARIABLES ====================
let favoriteVideos = [];
let readStories = [];
let gamesPlayed = [];

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(155, 89, 182, 0.2)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
        }
    });
});

// ==================== VIDEO PLAY FUNCTIONALITY ====================
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const videoTitle = this.querySelector('.video-title').textContent;
        const videoViews = this.querySelector('.video-meta span:first-child').textContent;
        
        showVideoPlayer({
            title: videoTitle,
            views: videoViews,
            thumbnail: this.querySelector('.video-thumbnail img').src
        });
    });
});

function showVideoPlayer(video) {
    // Create video player modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="video-player" style="
            background: white;
            border-radius: 25px;
            max-width: 900px;
            width: 100%;
            overflow: hidden;
            animation: zoomIn 0.3s ease;
            box-shadow: 0 20px 60px rgba(255, 107, 157, 0.3);
        ">
            <button class="close-video" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 107, 157, 0.9);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
            
            <div class="video-container" style="
                width: 100%;
                height: 500px;
                background: linear-gradient(135deg, #4A90E2, #9B59B6);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 80px;
            ">
                🎬
            </div>
            
            <div style="padding: 30px;">
                <h2 style="
                    font-family: 'Fredoka', sans-serif;
                    font-size: 28px;
                    color: #2C3E50;
                    margin-bottom: 15px;
                ">${video.title}</h2>
                <p style="
                    font-size: 16px;
                    color: #7F8C8D;
                    margin-bottom: 20px;
                ">${video.views}</p>
                <div style="display: flex; gap: 15px;">
                    <button class="btn-like" style="
                        background: linear-gradient(135deg, #FF6B9D, #9B59B6);
                        color: white;
                        padding: 12px 30px;
                        border: none;
                        border-radius: 25px;
                        font-size: 16px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: 'Fredoka', sans-serif;
                    ">
                        <i class="fas fa-heart"></i> Like
                    </button>
                    <button class="btn-share" style="
                        background: linear-gradient(135deg, #4A90E2, #7ED321);
                        color: white;
                        padding: 12px 30px;
                        border: none;
                        border-radius: 25px;
                        font-size: 16px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: 'Fredoka', sans-serif;
                    ">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    modal.querySelector('.close-video').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Like button
    modal.querySelector('.btn-like').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-heart"></i> Liked!';
        this.style.background = 'linear-gradient(135deg, #FF6B6B, #FF6B9D)';
        showNotification('Added to your favorites! ❤️');
        favoriteVideos.push(video.title);
    });
    
    // Share button
    modal.querySelector('.btn-share').addEventListener('click', function() {
        showNotification('Share link copied! 🎉');
    });
}

// ==================== STORY READER ====================
const storyCards = document.querySelectorAll('.story-card');

storyCards.forEach(card => {
    const readButton = card.querySelector('.btn-read-story');
    
    readButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const storyTitle = card.querySelector('.story-title').textContent;
        const storyExcerpt = card.querySelector('.story-excerpt').textContent;
        const storyImage = card.querySelector('.story-cover img').src;
        
        showStoryReader({
            title: storyTitle,
            excerpt: storyExcerpt,
            image: storyImage
        });
    });
});

function showStoryReader(story) {
    const fullStory = `${story.excerpt} The adventure continued as our hero discovered new friends and learned valuable lessons about kindness, bravery, and friendship. Every day brought new surprises and magical moments that would be remembered forever. The story teaches us that with courage and a kind heart, we can overcome any challenge and make the world a better place. And they all lived happily ever after! ✨`;
    
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(74, 144, 226, 0.98), rgba(155, 89, 182, 0.98));
        z-index: 10000;
        overflow-y: auto;
        animation: fadeIn 0.3s ease;
        padding: 40px 20px;
    `;
    
    modal.innerHTML = `
        <div class="story-reader" style="
            background: white;
            border-radius: 30px;
            max-width: 800px;
            margin: 0 auto;
            padding: 50px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideInUp 0.5s ease;
        ">
            <button class="close-story" style="
                position: absolute;
                top: 30px;
                right: 30px;
                background: linear-gradient(135deg, #FF6B9D, #FF6B6B);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
            
            <img src="${story.image}" alt="${story.title}" style="
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 20px;
                margin-bottom: 30px;
            ">
            
            <h1 style="
                font-family: 'Bubblegum Sans', cursive;
                font-size: 42px;
                color: #2C3E50;
                margin-bottom: 30px;
                text-align: center;
            ">${story.title}</h1>
            
            <div style="
                font-family: 'Quicksand', sans-serif;
                font-size: 20px;
                line-height: 2;
                color: #2C3E50;
                text-align: justify;
            ">${fullStory}</div>
            
            <div style="
                margin-top: 40px;
                display: flex;
                gap: 15px;
                justify-content: center;
            ">
                <button class="btn-story-rate" style="
                    background: linear-gradient(135deg, #FFD93D, #FF9F43);
                    color: white;
                    padding: 15px 35px;
                    border: none;
                    border-radius: 30px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Fredoka', sans-serif;
                ">
                    <i class="fas fa-star"></i> Rate Story
                </button>
                <button class="btn-story-save" style="
                    background: linear-gradient(135deg, #4A90E2, #7ED321);
                    color: white;
                    padding: 15px 35px;
                    border: none;
                    border-radius: 30px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Fredoka', sans-serif;
                ">
                    <i class="fas fa-bookmark"></i> Save Story
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    modal.querySelector('.close-story').addEventListener('click', closeModal);
    
    // Rate button
    modal.querySelector('.btn-story-rate').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-star"></i> Rated 5 Stars!';
        showNotification('Thank you for rating! ⭐');
    });
    
    // Save button
    modal.querySelector('.btn-story-save').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-bookmark"></i> Saved!';
        showNotification('Story saved to your library! 📚');
        readStories.push(story.title);
    });
}

// ==================== GAMES FUNCTIONALITY ====================
const gameCards = document.querySelectorAll('.game-card');

gameCards.forEach(card => {
    const playButton = card.querySelector('.btn-play-game');
    
    playButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const gameTitle = card.querySelector('.game-title').textContent;
        const gameIcon = card.querySelector('.game-icon').textContent;
        
        showGameScreen({
            title: gameTitle,
            icon: gameIcon
        });
    });
});

function showGameScreen(game) {
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FFD93D, #FF9F43);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="game-container" style="
            background: white;
            border-radius: 30px;
            max-width: 700px;
            width: 90%;
            padding: 50px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: bounceIn 0.5s ease;
        ">
            <button class="close-game" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #FF6B9D, #9B59B6);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            ">×</button>
            
            <div class="game-icon-big" style="font-size: 120px; margin-bottom: 30px;">
                ${game.icon}
            </div>
            
            <h2 style="
                font-family: 'Bubblegum Sans', cursive;
                font-size: 48px;
                color: #2C3E50;
                margin-bottom: 20px;
            ">${game.title}</h2>
            
            <p style="
                font-size: 22px;
                color: #7F8C8D;
                margin-bottom: 40px;
            ">Get ready to play and learn!</p>
            
            <button class="btn-start-game" style="
                background: linear-gradient(135deg, #7ED321, #4A90E2);
                color: white;
                padding: 20px 50px;
                border: none;
                border-radius: 35px;
                font-size: 24px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Fredoka', sans-serif;
                box-shadow: 0 10px 30px rgba(126, 211, 33, 0.3);
            ">
                🎮 Start Game!
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    modal.querySelector('.close-game').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Start game button
    modal.querySelector('.btn-start-game').addEventListener('click', function() {
        showNotification('Loading game... Have fun! 🎮');
        gamesPlayed.push(game.title);
        setTimeout(closeModal, 1500);
    });
}

// ==================== ACTIVITIES FUNCTIONALITY ====================
const activityCards = document.querySelectorAll('.activity-card');

activityCards.forEach(card => {
    const startButton = card.querySelector('.btn-start-activity');
    
    startButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const activityTitle = card.querySelector('.activity-title').textContent;
        showNotification(`Starting ${activityTitle}! Let's create! 🎨`);
    });
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message) {
    const existing = document.querySelector('.kids-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'kids-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #FF6B9D, #9B59B6);
        color: white;
        padding: 20px 30px;
        border-radius: 25px;
        font-size: 18px;
        font-weight: 700;
        font-family: 'Fredoka', sans-serif;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.4);
        z-index: 99999;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ==================== SCROLL ANIMATIONS ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements
document.querySelectorAll('.video-card, .story-card, .game-card, .activity-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        showNotification('Thank you for subscribing! 💌');
        this.reset();
    });
}

// ==================== ADD ANIMATION STYLES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
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
`;
document.head.appendChild(style);

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌈 KidsVerse is ready! Let\'s learn and have fun!');
    console.log('Favorite Videos:', favoriteVideos.length);
    console.log('Stories Read:', readStories.length);
    console.log('Games Played:', gamesPlayed.length);
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to KidsVerse! 🌟 Let\'s start learning!');
    }, 1000);
});

// ==================== MOBILE MENU ====================
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.style.animation = 'fadeIn 0.3s ease';
            }
        }, 10);
    });
}

// ==================== FUN CURSOR EFFECT (OPTIONAL) ====================
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        font-size: 20px;
        animation: fadeOut 1s ease;
    `;
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    cursor.textContent = ['⭐', '✨', '🌈', '💫', '🎈'][Math.floor(Math.random() * 5)];
    
    document.body.appendChild(cursor);
    
    setTimeout(() => cursor.remove(), 1000);
});

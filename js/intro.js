let introLines = [];
let currentLineIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    const introText = document.getElementById('intro-text');
    const nextBtn = document.getElementById('next-btn');
    
    // Load intro configuration
    try {
        const response = await fetch('intro-config.json');
        const config = await response.json();
        introLines = config.lines;
        
        if (introLines.length === 0) {
            console.error('No intro lines configured');
            window.location.href = 'builder.html';
            return;
        }
        
        displayLine();
    } catch (error) {
        console.error('Error loading intro configuration:', error);
        window.location.href = 'builder.html';
    }
    
    function displayLine() {
        if (currentLineIndex < 0 || currentLineIndex >= introLines.length) {
            return;
        }
        
        const text = introLines[currentLineIndex];
        
        // Clear current text with fade out
        introText.style.opacity = '0';
        
        setTimeout(() => {
            // Simple fade in effect
            introText.textContent = text;
            introText.style.opacity = '1';
        }, 200);
        
        // Check if we're on the last line
        if (currentLineIndex === introLines.length - 1) {
            nextBtn.innerHTML = "Let's build!";
            nextBtn.classList.add('pulse');
            nextBtn.classList.add('final');
        } else {
            nextBtn.innerHTML = '&gt;';
            nextBtn.classList.remove('pulse');
            nextBtn.classList.remove('final');
        }
    }
    
    function goToNext() {
        if (currentLineIndex < introLines.length - 1) {
            currentLineIndex++;
            displayLine();
        } else {
            // We're on the last line, go to builder
            localStorage.setItem('intro_completed', 'true');
            window.location.href = 'builder.html';
        }
    }
    
    function goToPrevious() {
        if (currentLineIndex > 0) {
            currentLineIndex--;
            displayLine();
        }
    }
    
    // Button click handler
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToNext();
    });
    
    // Touch gesture support for mobile
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance < 0) {
                // Swipe left - go to next
                goToNext();
            } else {
                // Swipe right - go to previous
                goToPrevious();
            }
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            e.preventDefault();
            goToNext();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevious();
        }
    });
    
    // Add visual feedback for touch
    nextBtn.addEventListener('touchstart', (e) => {
        e.currentTarget.classList.add('touch-active');
    }, { passive: true });
    
    nextBtn.addEventListener('touchend', (e) => {
        e.currentTarget.classList.remove('touch-active');
    }, { passive: true });
    
    nextBtn.addEventListener('touchcancel', (e) => {
        e.currentTarget.classList.remove('touch-active');
    }, { passive: true });
    
    // Prevent double-tap zoom on button
    let lastTouchEnd = 0;
    nextBtn.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Handle viewport resize (e.g., orientation change)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Force recalculation of viewport height
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 100);
    });
    
    // Set initial viewport height CSS variable
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});
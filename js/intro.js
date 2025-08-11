let introLines = [];
let currentLineIndex = 0;

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
    
    nextBtn.addEventListener('click', () => {
        if (currentLineIndex < introLines.length - 1) {
            currentLineIndex++;
            displayLine();
        } else {
            // We're on the last line, go to builder
            localStorage.setItem('intro_completed', 'true');
            window.location.href = 'builder.html';
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            nextBtn.click();
        }
    });
});
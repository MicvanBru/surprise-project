document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuthentication()) return;
    
    const selection = getSelection();
    if (!selection) {
        window.location.href = 'builder.html';
        return;
    }
    
    displaySummary(selection);
    
    document.getElementById('back-btn').addEventListener('click', () => {
        window.location.href = 'builder.html';
    });
    
    document.getElementById('restart-btn').addEventListener('click', () => {
        clearSelection();
        window.location.href = 'builder.html';
    });
});

function displaySummary(selection) {
    // Display build name
    document.getElementById('build-name').textContent = selection.name || 'Gaming Build';
    
    // Show power badge if powered up
    if (selection.isPowered) {
        document.getElementById('power-badge').style.display = 'inline-block';
    }
    
    document.getElementById('build-image').src = selection.image;
    document.getElementById('build-image').onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23667eea" width="300" height="200"/%3E%3Ctext x="150" y="100" text-anchor="middle" fill="white" font-size="20"%3EGaming Desktop%3C/text%3E%3C/svg%3E';
    };
    
    document.getElementById('gpu-spec').textContent = selection.components.gpu;
    document.getElementById('storage-spec').textContent = selection.components.storage;
    
    document.getElementById('base-cost').innerHTML = formatCurrency(selection.basePrice);
    
    if (selection.isPowered) {
        document.getElementById('powerup-row').style.display = 'flex';
        document.getElementById('powerup-cost').innerHTML = formatCurrency(selection.powerUpPrice);
    }
    
    document.getElementById('total-cost').innerHTML = formatCurrency(selection.totalPrice);
    
    document.getElementById('remaining-amount').innerHTML = formatCurrency(selection.remaining);
    document.getElementById('expansion-suggestion').textContent = getExpansionSuggestion(selection.remaining);
    
    document.getElementById('sims-description').textContent = selection.simsDescription;
    
    if (selection.remaining < 0) {
        const remainingSection = document.querySelector('.remaining-budget-section');
        if (remainingSection) {
            remainingSection.style.borderColor = '#E74C3C';
            remainingSection.style.background = 'rgba(231, 76, 60, 0.05)';
        }
    }
    
    animateElements();
}

function animateElements() {
    const elements = [
        '.build-name-container',
        '.specs-container',
        '.price-breakdown',
        '.remaining-budget-section',
        '.sims-performance',
        '.message-card'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}
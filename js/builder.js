let config = null;
let selectedTier = null;
let isPowered = false;
let previousTier = null;

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuthentication()) return;
    
    config = await loadConfiguration();
    initializeBuilder();
    setupEventListeners();
    
    // Select budget tier by default
    selectTier('budget');
});

function initializeBuilder() {
    updateBudgetDisplay();
}

function setupEventListeners() {
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('create-btn').addEventListener('click', proceedToSummary);
    
    document.querySelectorAll('.tier-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tier = btn.dataset.tier;
            selectTier(tier);
        });
    });
    
    document.getElementById('power-toggle').addEventListener('change', (e) => {
        togglePower(e.target.checked);
    });
}

function selectTier(tier) {
    if (selectedTier === tier) return;
    
    previousTier = selectedTier;
    selectedTier = tier;
    isPowered = false;
    
    document.querySelectorAll('.tier-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tier="${tier}"]`).classList.add('active');
    
    animateCardTransition(tier);
    updateBudgetDisplay();
    document.getElementById('create-btn').disabled = false;
}

function animateCardTransition(tier) {
    const card = document.getElementById('tier-card');
    const build = config.builds[tier];
    
    if (previousTier) {
        const tierOrder = ['budget', 'medium', 'premium'];
        const prevIndex = tierOrder.indexOf(previousTier);
        const currIndex = tierOrder.indexOf(tier);
        
        // Reversed: going right means sliding content right
        card.classList.add(prevIndex < currIndex ? 'slide-out-left' : 'slide-out-right');
        
        setTimeout(() => {
            updateCardContent(tier, build);
            card.classList.remove('slide-out-left', 'slide-out-right');
            // Slide in from opposite direction (reversed)
            card.classList.add(prevIndex < currIndex ? 'slide-in-right' : 'slide-in-left');
            
            setTimeout(() => {
                card.classList.remove('slide-in-left', 'slide-in-right');
            }, 400);
        }, 200);
    } else {
        updateCardContent(tier, build);
        card.classList.add('slide-in-right');
        setTimeout(() => {
            card.classList.remove('slide-in-right');
        }, 400);
    }
}

function updateCardContent(tier, build) {
    const image = document.getElementById('tier-image');
    image.src = build.image;
    image.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23667eea" width="300" height="200"/%3E%3Ctext x="150" y="100" text-anchor="middle" fill="white" font-size="20"%3EGaming Desktop%3C/text%3E%3C/svg%3E';
    };
    
    document.getElementById('gpu-spec').textContent = build.components.gpu;
    document.getElementById('storage-spec').textContent = build.components.storage;
    
    document.getElementById('sims-description').textContent = build.simsDescription;
    
    document.getElementById('power-price').textContent = `+${formatCurrency(build.powerUpPrice)}`;
    document.getElementById('power-toggle').checked = false;
    document.getElementById('power-upgrade').classList.remove('active');
    
    document.getElementById('tier-specs').style.display = 'block';
    document.getElementById('sims-performance').style.display = 'block';
    document.getElementById('power-upgrade').style.display = 'flex';
}

function togglePower(enabled) {
    isPowered = enabled;
    const build = config.builds[selectedTier];
    const components = isPowered ? build.poweredComponents : build.components;
    
    document.getElementById('gpu-spec').textContent = components.gpu;
    document.getElementById('storage-spec').textContent = components.storage;
    
    const powerUpgrade = document.getElementById('power-upgrade');
    if (isPowered) {
        powerUpgrade.classList.add('active');
    } else {
        powerUpgrade.classList.remove('active');
    }
    
    updateBudgetDisplay();
}

function updateBudgetDisplay() {
    const totalBudget = config.budget;
    let buildCost = 0;
    
    if (selectedTier) {
        const build = config.builds[selectedTier];
        buildCost = build.basePrice + (isPowered ? build.powerUpPrice : 0);
    }
    
    const remaining = totalBudget - buildCost;
    
    document.getElementById('build-cost').textContent = formatCurrency(buildCost);
    document.getElementById('remaining-budget').textContent = formatCurrency(remaining);
    
    const remainingElement = document.querySelector('.summary-item.highlight .summary-value');
    if (remaining < 0) {
        remainingElement.style.color = '#E74C3C';
    } else {
        remainingElement.style.color = '#90EE90';
    }
}

function proceedToSummary() {
    if (!selectedTier) return;
    
    const build = config.builds[selectedTier];
    
    const selectionData = {
        tier: selectedTier,
        name: build.name,
        description: build.description,
        simsDescription: build.simsDescription,
        basePrice: build.basePrice,
        powerUpPrice: isPowered ? build.powerUpPrice : 0,
        totalPrice: build.basePrice + (isPowered ? build.powerUpPrice : 0),
        components: isPowered ? build.poweredComponents : build.components,
        isPowered: isPowered,
        image: build.image,
        budget: config.budget,
        remaining: config.budget - (build.basePrice + (isPowered ? build.powerUpPrice : 0))
    };
    
    saveSelection(selectionData);
    window.location.href = 'summary.html';
}
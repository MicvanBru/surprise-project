function checkAuthentication() {
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function formatCurrency(amount) {
    return `§${amount}`;
}

function saveSelection(buildData) {
    localStorage.setItem('selectedBuild', JSON.stringify(buildData));
}

function getSelection() {
    const data = localStorage.getItem('selectedBuild');
    return data ? JSON.parse(data) : null;
}

function clearSelection() {
    localStorage.removeItem('selectedBuild');
}

function logout() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('selectedBuild');
    window.location.href = 'index.html';
}

async function loadConfiguration() {
    try {
        const response = await fetch('data/components.json');
        if (!response.ok) throw new Error('Failed to load configuration');
        return await response.json();
    } catch (error) {
        console.error('Error loading configuration:', error);
        return getDefaultConfiguration();
    }
}

function getDefaultConfiguration() {
    return {
        budget: 800,
        currency: { symbol: "§", name: "Simoleon" },
        builds: {
            budget: {
                name: "Newbie Simmer",
                basePrice: 300,
                powerUpPrice: 50,
                description: "Perfect for cozy gameplay with smooth performance",
                simsDescription: "Run Sims 4 on medium settings with great performance",
                components: { 
                    gpu: "Entry Gaming GPU", 
                    storage: "500GB SSD" 
                },
                poweredComponents: { 
                    gpu: "Enhanced Gaming GPU", 
                    storage: "1TB SSD" 
                },
                image: "images/tier_1_desktop.png"
            },
            medium: {
                name: "Seasoned Player",
                basePrice: 500,
                powerUpPrice: 75,
                description: "Great balance of performance and features", 
                simsDescription: "Run Sims 4 on high settings with excellent performance",
                components: { 
                    gpu: "Mid-Range Gaming GPU", 
                    storage: "1TB SSD" 
                },
                poweredComponents: { 
                    gpu: "High-Performance GPU", 
                    storage: "2TB SSD" 
                },
                image: "images/tier_2_desktop.png"
            },
            premium: {
                name: "Master Builder",
                basePrice: 650,
                powerUpPrice: 100,
                description: "Top-tier performance for the ultimate experience",
                simsDescription: "Run Sims 4 on ultra settings with all expansions smoothly",
                components: { 
                    gpu: "High-End Gaming GPU", 
                    storage: "2TB SSD" 
                },
                poweredComponents: { 
                    gpu: "Flagship Gaming GPU", 
                    storage: "4TB SSD" 
                },
                image: "images/tier_3_desktop.png"
            }
        }
    };
}

function getExpansionSuggestion(remainingBudget) {
    if (remainingBudget >= 200) {
        return "Enough for 5+ expansion packs! You can get all the major ones like Seasons, City Living, and Get Together!";
    } else if (remainingBudget >= 150) {
        return "Perfect for 3-4 expansion packs! Consider getting Seasons, Cats & Dogs, and your favorite gameplay pack!";
    } else if (remainingBudget >= 100) {
        return "Great for 2-3 expansion packs! Maybe Seasons and Get to Work?";
    } else if (remainingBudget >= 50) {
        return "Enough for 1-2 expansion packs or several game/stuff packs!";
    } else if (remainingBudget >= 20) {
        return "Perfect for a game pack or a couple of stuff packs!";
    } else {
        return "You've maximized your hardware! Time to start saving for those expansions!";
    }
}
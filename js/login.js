const CORRECT_PIN = '123456';
const MAX_ATTEMPTS = 3;
let attempts = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = 'builder.html';
        return;
    }
    
    const inputs = document.querySelectorAll('.pin-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    const hintMessage = document.getElementById('hint-message');
    
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (value.length === 1) {
                input.classList.add('filled');
                
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                
                checkAllFilled();
            } else {
                input.classList.remove('filled');
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') {
                if (index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].value = '';
                    inputs[index - 1].classList.remove('filled');
                }
            }
        });
        
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').slice(0, 6);
            
            for (let i = 0; i < pasteData.length && i < inputs.length; i++) {
                inputs[i].value = pasteData[i];
                inputs[i].classList.add('filled');
            }
            
            checkAllFilled();
        });
    });
    
    function checkAllFilled() {
        const allFilled = Array.from(inputs).every(input => input.value.length === 1);
        submitBtn.disabled = !allFilled;
        
        if (allFilled) {
            submitBtn.classList.add('pulse');
        } else {
            submitBtn.classList.remove('pulse');
        }
    }
    
    submitBtn.addEventListener('click', validatePIN);
    
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitBtn.disabled) {
            validatePIN();
        }
    });
    
    function validatePIN() {
        const enteredPIN = Array.from(inputs).map(input => input.value).join('');
        
        if (enteredPIN === CORRECT_PIN) {
            showSuccess();
        } else {
            showError();
        }
    }
    
    function showSuccess() {
        errorMessage.classList.remove('show');
        hintMessage.classList.remove('show');
        
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = '🎉';
        document.body.appendChild(celebration);
        celebration.classList.add('show');
        
        inputs.forEach(input => {
            input.style.background = 'linear-gradient(145deg, #90EE90, #7FDD7F)';
            input.style.borderColor = '#90EE90';
        });
        
        localStorage.setItem('authenticated', 'true');
        
        setTimeout(() => {
            window.location.href = 'builder.html';
        }, 1500);
    }
    
    function showError() {
        attempts++;
        
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
            input.style.borderColor = '#E74C3C';
        });
        
        inputs[0].focus();
        
        errorMessage.textContent = `Incorrect PIN. ${MAX_ATTEMPTS - attempts} attempts remaining.`;
        errorMessage.classList.add('show');
        
        if (attempts >= 2) {
            hintMessage.textContent = '💡 Hint: Try a relevant date for us (MMDDYY)';
            hintMessage.classList.add('show');
        }
        
        setTimeout(() => {
            inputs.forEach(input => {
                input.style.borderColor = '#E8E8E8';
            });
        }, 1500);
        
        checkAllFilled();
    }
});
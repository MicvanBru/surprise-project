const CORRECT_PIN = '081421';
const MAX_ATTEMPTS = 3;
let attempts = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('authenticated') === 'true') {
        // Check if intro has been completed
        if (localStorage.getItem('intro_completed') === 'true') {
            window.location.href = 'builder.html';
        } else {
            window.location.href = 'intro.html';
        }
        return;
    }
    
    const inputs = document.querySelectorAll('.pin-input');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    const hintMessage = document.getElementById('hint-message');
    
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            let value = e.target.value;
            
            // Only allow single digit numbers
            if (!/^[0-9]?$/.test(value)) {
                e.target.value = value.slice(0, 1).replace(/[^0-9]/g, '');
                return;
            }
            
            if (value.length === 1 && /^[0-9]$/.test(value)) {
                // Check if this digit is correct
                const correctDigit = CORRECT_PIN[index];
                if (value === correctDigit) {
                    input.classList.add('filled');
                    input.classList.remove('incorrect');
                } else {
                    input.classList.add('incorrect');
                    input.classList.remove('filled');
                }
                
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                
                checkAllFilled();
            } else {
                input.classList.remove('filled');
                input.classList.remove('incorrect');
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') {
                if (index > 0) {
                    inputs[index - 1].focus();
                    inputs[index - 1].value = '';
                    inputs[index - 1].classList.remove('filled');
                    inputs[index - 1].classList.remove('incorrect');
                }
            }
        });
        
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
            
            for (let i = 0; i < pasteData.length && i < inputs.length; i++) {
                if (/^[0-9]$/.test(pasteData[i])) {
                    inputs[i].value = pasteData[i];
                    const correctDigit = CORRECT_PIN[i];
                    if (pasteData[i] === correctDigit) {
                        inputs[i].classList.add('filled');
                        inputs[i].classList.remove('incorrect');
                    } else {
                        inputs[i].classList.add('incorrect');
                        inputs[i].classList.remove('filled');
                    }
                }
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
        
        // Change button to success state
        submitBtn.style.background = 'linear-gradient(145deg, #5CB85C, #4CAE4C)';
        submitBtn.style.borderColor = '#5CB85C';
        submitBtn.querySelector('.btn-text').textContent = 'Success!';
        submitBtn.querySelector('.btn-icon').style.display = 'none';
        submitBtn.disabled = true;
        
        inputs.forEach(input => {
            input.style.background = 'linear-gradient(145deg, #5CB85C, #4CAE4C)';
            input.style.borderColor = '#5CB85C';
        });
        
        localStorage.setItem('authenticated', 'true');
        
        setTimeout(() => {
            window.location.href = 'intro.html';
        }, 1500);
    }
    
    function showError() {
        attempts++;
        
        inputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled');
            input.classList.remove('incorrect');
            input.style.borderColor = '#E74C3C';
        });
        
        inputs[0].focus();
        
        errorMessage.textContent = 'Incorrect PIN. Please try again.';
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
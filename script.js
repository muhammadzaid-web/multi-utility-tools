// Tool Visibility Management
function showTool(toolId) {
    // Hide all tool sections
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected tool
    document.getElementById(toolId).classList.add('active');

    // Update active button state (you can add this if you want)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// BMI Calculator
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);

    if (height && weight) {
        const bmi = (weight / (height * height)).toFixed(1);
        document.getElementById('bmi-result').textContent = `Your BMI: ${bmi}`;

        // Determine category
        let category = '';
        let categoryColor = '';
        if (bmi < 18.5) {
            category = 'Underweight';
            categoryColor = '#219ebc';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            categoryColor = '#2a9d8f';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            categoryColor = '#f4a261';
        } else {
            category = 'Obese';
            categoryColor = '#e76f51';
        }

        const categoryBox = document.getElementById('bmi-category');
        categoryBox.textContent = category;
        categoryBox.style.backgroundColor = categoryColor;
    } else {
        alert('Please enter both height and weight');
    }
}

// Age Calculator
function calculateAge() {
    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();

    if (birthdate && birthdate <= today) {
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        document.getElementById('age-result').textContent = `Your age: ${age} years`;
    } else {
        alert('Please enter a valid birthdate');
    }
}

// Unit Converter
function convertUnits() {
    const value = parseFloat(document.getElementById('unit-value').value);
    const fromUnit = document.getElementById('unit-from').value;
    const toUnit = document.getElementById('unit-to').value;

    if (isNaN(value)) {
        alert('Please enter a valid number');
        return;
    }

    // Convert to meters first
    let meters;
    switch (fromUnit) {
        case 'cm':
            meters = value / 100;
            break;
        case 'm':
            meters = value;
            break;
        case 'km':
            meters = value * 1000;
            break;
        case 'in':
            meters = value * 0.0254;
            break;
        case 'ft':
            meters = value * 0.3048;
            break;
        case 'mi':
            meters = value * 1609.344;
            break;
    }

    // Convert from meters to target unit
    let result;
    switch (toUnit) {
        case 'cm':
            result = meters * 100;
            break;
        case 'm':
            result = meters;
            break;
        case 'km':
            result = meters / 1000;
            break;
        case 'in':
            result = meters / 0.0254;
            break;
        case 'ft':
            result = meters / 0.3048;
            break;
        case 'mi':
            result = meters / 1609.344;
            break;
    }

    document.getElementById('unit-result').textContent =
        `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

// Currency Converter (simplified - would use API in real app)
function convertCurrency() {
    const amount = parseFloat(document.getElementById('currency-amount').value);
    const fromCurrency = document.getElementById('currency-from').value;
    const toCurrency = document.getElementById('currency-to').value;

    if (isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    // Simplified conversion rates (in a real app, you'd fetch these from an API)
    const rates = {
        USD: { USD: 1, EUR: 0.85, GBP: 0.73, JPY: 110.15, AUD: 1.35 },
        EUR: { USD: 1.18, EUR: 1, GBP: 0.86, JPY: 129.53, AUD: 1.59 },
        GBP: { USD: 1.37, EUR: 1.16, GBP: 1, JPY: 150.41, AUD: 1.85 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, JPY: 1, AUD: 0.012 },
        AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 83.33, AUD: 1 }
    };

    const result = (amount * rates[fromCurrency][toCurrency]).toFixed(2);
    document.getElementById('currency-result').textContent =
        `${amount} ${fromCurrency} = ${result} ${toCurrency}`;

    // Update rate info
    document.getElementById('rate-update').textContent = new Date().toLocaleString();
}

// QR Code Generator
function generateQR() {
    const text = document.getElementById('qr-text').value;
    if (!text) {
        alert('Please enter text or URL');
        return;
    }

    const qrResult = document.getElementById('qr-result');
    qrResult.innerHTML = '';

    QRCode.toCanvas(text, { width: 200 }, (error, canvas) => {
        if (error) {
            console.error(error);
            alert('Error generating QR code');
            return;
        }

        qrResult.appendChild(canvas);
        document.querySelector('.download-btn').style.display = 'block';
    });
}

function downloadQR() {
    const canvas = document.querySelector('#qr-result canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('pass-length').value);
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    if (!uppercase && !lowercase && !numbers && !symbols) {
        alert('Please select at least one character type');
        return;
    }

    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    document.getElementById('password-output').value = password;
    updatePasswordStrength(password);
}

function copyPassword() {
    const passwordOutput = document.getElementById('password-output');
    passwordOutput.select();
    document.execCommand('copy');

    // Visual feedback
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
}

function updatePasswordStrength(password) {
    let strength = 0;

    // Length contributes up to 50% of strength
    strength += Math.min(password.length / 32 * 50, 50);

    // Character variety contributes the remaining 50%
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    strength += (varietyCount / 4) * 50;

    // Update strength meter
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    strengthBar.style.width = `${strength}%`;

    if (strength < 30) {
        strengthBar.style.backgroundColor = '#ef233c';
        strengthText.textContent = 'Weak';
    } else if (strength < 70) {
        strengthBar.style.backgroundColor = '#ff9f1c';
        strengthText.textContent = 'Moderate';
    } else {
        strengthBar.style.backgroundColor = '#2ec4b6';
        strengthText.textContent = 'Strong';
    }
}

// Password length slider value display
document.getElementById('pass-length').addEventListener('input', function() {
    document.getElementById('length-value').textContent = this.value;
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Show BMI calculator by default
    showTool('bmi');

    // Set max date for age calculator to today
    document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];
});

// Modern Share API with fallback
document.getElementById('share-link').addEventListener('click', async(e) => {
    e.preventDefault();

    const shareData = {
        title: 'Multi Tool Web App',
        text: 'Check out this all-in-one web tool collection!',
        url: window.location.href
    };

    try {
        // Try native share first
        if (navigator.share) {
            await navigator.share(shareData);
        }
        // Fallback for desktop browsers
        else if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.url);
            showFeedback('Link copied to clipboard!');
        }
        // Ultimate fallback
        else {
            fallbackShare();
        }
    } catch (err) {
        console.log('Share failed:', err);
        fallbackShare();
    }
});

// Show temporary feedback message
function showFeedback(message) {
    const feedback = document.getElementById('share-feedback');
    feedback.textContent = message;
    feedback.classList.add('show');

    setTimeout(() => {
        feedback.classList.remove('show');
    }, 3000);
}

// Fallback for browsers without share/clipboard API
function fallbackShare() {
    // Create a temporary input to copy from
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        document.execCommand('copy');
        showFeedback('Link copied to clipboard!');
    } catch (err) {
        showFeedback('Press Ctrl+C to copy link');
    } finally {
        document.body.removeChild(tempInput);
    }
}
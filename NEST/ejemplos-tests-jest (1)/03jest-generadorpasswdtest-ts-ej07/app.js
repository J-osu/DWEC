"use strict";
// Obtener referencias a los elementos del DOM
const minLengthInput = document.getElementById("minLength");
const maxLengthInput = document.getElementById("maxLength");
const useUppercaseInput = document.getElementById("useUppercase");
const useLowercaseInput = document.getElementById("useLowercase");
const useNumbersInput = document.getElementById("useNumbers");
const useSymbolsInput = document.getElementById("useSymbols");
const customSymbolsInput = document.getElementById("customSymbols");
const generateButton = document.getElementById("generateButton");
const generatedPasswordDisplay = document.getElementById("generatedPassword");
const copyButton = document.getElementById("copyButton");
const strengthBar = document.getElementById("strengthBar");
const strengthLabel = document.getElementById("strengthLabel");

function sanitizeSymbols(s) {
    return (s || "").replace(/\s+/g, "").replace(/['"`\\]/g, "");
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function generatePassword() {
    const minLength = parseInt(minLengthInput.value, 10);
    const maxLength = parseInt(maxLengthInput.value, 10);
    const useUppercase = useUppercaseInput.checked;
    const useLowercase = useLowercaseInput.checked;
    const useNumbers = useNumbersInput.checked;
    const useSymbols = useSymbolsInput.checked;
    const customSymbols = sanitizeSymbols(customSymbolsInput.value);

    if (isNaN(minLength) || isNaN(maxLength)) {
        alert("Longitudes inválidas");
        return "";
    }

    if (minLength > maxLength) {
        alert("La longitud mínima no puede ser mayor que la longitud máxima.");
        return "";
    }

    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && !customSymbols) {
        alert("Debe seleccionar al menos una opción de caracteres.");
        return "";
    }

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const defaultSymbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    const symbols = customSymbols || defaultSymbols;
    let allChars = "";
    if (useUppercase)
        allChars += uppercaseChars;
    if (useLowercase)
        allChars += lowercaseChars;
    if (useNumbers)
        allChars += numberChars;
    if (useSymbols || customSymbols)
        allChars += symbols;

    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = randomInt(allChars.length);
        password += allChars[randomIndex];
    }
    return password;
}

function evaluateStrength(pw) {
    if (!pw)
        return { score: 0, text: "Vacía" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["Débil", "Pobre", "Aceptable", "Buena", "Excelente"];
    return { score: Math.min(score, 4), text: labels[Math.min(score, 4)] };
}

function updateStrengthUI(pw) {
    const res = evaluateStrength(pw);
    if (strengthBar) {
        strengthBar.style.width = (res.score * 25) + "%";
        strengthBar.className = 'strength-bar level-' + res.score;
        strengthBar.setAttribute('aria-valuenow', res.score.toString());
    }
    if (strengthLabel)
        strengthLabel.textContent = res.text;
}

generateButton.addEventListener("click", () => {
    const password = generatePassword();
    if (password) {
        generatedPasswordDisplay.textContent = password;
        updateStrengthUI(password);
        copyButton.removeAttribute('disabled');
        copyButton.focus();
    }
});

copyButton.addEventListener("click", () => {
    const text = generatedPasswordDisplay.textContent || "";
    if (!text)
        return;
    try {
        navigator.clipboard.writeText(text);
        copyButton.textContent = 'Copiado';
        setTimeout(() => (copyButton.textContent = 'Copiar'), 1500);
    }
    catch (e) {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        copyButton.textContent = 'Copiado';
        setTimeout(() => (copyButton.textContent = 'Copiar'), 1500);
    }
});

// permitir Enter en el formulario
const form = document.getElementById('passwordForm');
form.addEventListener('submit', (e) => { e.preventDefault(); generateButton.click(); });

// accesibilidad: recalcular fuerza cuando cambian opciones
[useUppercaseInput, useLowercaseInput, useNumbersInput, useSymbolsInput, customSymbolsInput, minLengthInput, maxLengthInput].forEach(el => {
    if (!el) return;
    el.addEventListener('input', () => {
        updateStrengthUI(generatedPasswordDisplay.textContent || '');
    });
});

// deshabilitar copy inicialmente
copyButton.setAttribute('disabled', '');

// foco inicial agradable
minLengthInput.focus();

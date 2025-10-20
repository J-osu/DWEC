import { generatePassword as genPasswordCore } from './lib/generate-passwd';

// Selectores del DOM
const minLengthInput = document.getElementById('minLength') as HTMLInputElement | null;
const maxLengthInput = document.getElementById('maxLength') as HTMLInputElement | null;
const useUppercaseInput = document.getElementById('useUppercase') as HTMLInputElement | null;
const useLowercaseInput = document.getElementById('useLowercase') as HTMLInputElement | null;
const useNumbersInput = document.getElementById('useNumbers') as HTMLInputElement | null;
const useSymbolsInput = document.getElementById('useSymbols') as HTMLInputElement | null;
const customSymbolsInput = document.getElementById('customSymbols') as HTMLInputElement | null;
const generateButton = document.getElementById('generateButton') as HTMLButtonElement | null;
const generatedPasswordDisplay = document.getElementById('generatedPassword') as HTMLElement | null;
const copyButton = document.getElementById('copyButton') as HTMLButtonElement | null;
const strengthBar = document.getElementById('strengthBar') as HTMLElement | null;
const strengthLabel = document.getElementById('strengthLabel') as HTMLElement | null;
const form = document.getElementById('passwordForm') as HTMLFormElement | null;

function sanitizeSymbols(s: string | null) {
  return (s || '').replace(/\s+/g, '').replace(/['"`\\]/g, '');
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// wrapper que usa el generador del core si está disponible, si no usa una copia local
function generatePassword(): string {
  const minLength = Number(minLengthInput?.value ?? 0);
  const maxLength = Number(maxLengthInput?.value ?? 0);
  const useUppercase = !!useUppercaseInput?.checked;
  const useLowercase = !!useLowercaseInput?.checked;
  const useNumbers = !!useNumbersInput?.checked;
  const useSymbols = !!useSymbolsInput?.checked;
  const customSymbols = sanitizeSymbols(customSymbolsInput?.value ?? '');

  // Intentamos usar la función del core si exporta una versión que acepte opciones
  try {
    // la función exportada en lib/generate-passwd.ts espera parámetros diferentes,
    // así que llamamos a su versión por defecto si está; si no, fallback a implementación interna
    // aquí usamos una implementación local simplificada que respeta las opciones visibles
  }
  catch (e) {
    // noop
  }

  if (isNaN(minLength) || isNaN(maxLength) || minLength <= 0 || maxLength <= 0) {
    alert('Longitudes inválidas');
    return '';
  }
  if (minLength > maxLength) {
    alert('La longitud mínima no puede ser mayor que la longitud máxima.');
    return '';
  }
  if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && !customSymbols) {
    alert('Debe seleccionar al menos una opción de caracteres.');
    return '';
  }

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const defaultSymbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const symbols = customSymbols || defaultSymbols;
  let allChars = '';
  if (useUppercase) allChars += uppercaseChars;
  if (useLowercase) allChars += lowercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols || customSymbols) allChars += symbols;

  const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = randomInt(allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}

function evaluateStrength(pw: string) {
  if (!pw) return { score: 0, text: 'Vacía' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['Débil', 'Pobre', 'Aceptable', 'Buena', 'Excelente'];
  return { score: Math.min(score, 4), text: labels[Math.min(score, 4)] };
}

function updateStrengthUI(pw: string) {
  const res = evaluateStrength(pw);
  if (strengthBar) {
    strengthBar.style.width = (res.score * 25) + '%';
    strengthBar.className = 'strength-bar level-' + res.score;
    strengthBar.setAttribute('aria-valuenow', String(res.score));
  }
  if (strengthLabel) strengthLabel.textContent = res.text;
}

if (generateButton) {
  generateButton.addEventListener('click', () => {
    const pw = generatePassword();
    if (pw && generatedPasswordDisplay) {
      generatedPasswordDisplay.textContent = pw;
      updateStrengthUI(pw);
      if (copyButton) {
        copyButton.removeAttribute('disabled');
        copyButton.focus();
      }
    }
  });
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const text = generatedPasswordDisplay?.textContent ?? '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const original = copyButton.textContent;
      copyButton.textContent = 'Copiado';
      setTimeout(() => { if (copyButton) copyButton.textContent = original; }, 1500);
    }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
  });
}

if (form) {
  form.addEventListener('submit', (e) => { e.preventDefault(); generateButton?.click(); });
}

[minLengthInput, maxLengthInput, useUppercaseInput, useLowercaseInput, useNumbersInput, useSymbolsInput, customSymbolsInput].forEach(el => {
  if (!el) return;
  el.addEventListener('input', () => { updateStrengthUI(generatedPasswordDisplay?.textContent ?? ''); });
});

if (copyButton) copyButton.setAttribute('disabled', '');
if (minLengthInput) minLengthInput.focus();

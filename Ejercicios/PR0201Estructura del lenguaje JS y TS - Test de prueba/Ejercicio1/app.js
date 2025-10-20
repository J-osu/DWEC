// Obtener referencias a los elementos del DOM
const form = document.getElementById('registroForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');
const tipoEntradaRadios = document.getElementsByName('tipo_entrada');
const comprobanteInput = document.getElementById('comprobante_estudiante');
const termsCheckbox = document.getElementById('terms');
const rangoInput = document.getElementById('nivel_experiencia');
const rangoValorSpan = document.getElementById('rango_valor');

/**
 * Muestra un mensaje de error y aplica la clase de error a un campo.
 * @param {HTMLElement} inputElement - El campo del formulario con error.
 * @param {string} mensaje - El mensaje de error a mostrar.
 */
function mostrarError(inputElement, mensaje) {
    inputElement.classList.add('input-error');
    let errorDisplay = document.getElementById(inputElement.id + '-error');
    
    // Si el error no tiene un ID específico, buscamos el mensaje genérico
    if (!errorDisplay) {
        errorDisplay = inputElement.nextElementSibling;
    }
    
    if (errorDisplay && errorDisplay.classList.contains('error-message')) {
        errorDisplay.textContent = mensaje;
        errorDisplay.style.display = 'block';
    }
}

/**
 * Función para inicializar listeners de eventos
 */
document.addEventListener('DOMContentLoaded', () => {
    //Mostrar el valor del range slider
    rangoInput.addEventListener('input', () => {
        rangoValorSpan.textContent = rangoInput.value;
    });

    //Comprobante obligatorio si es Estudiante
    tipoEntradaRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const isStudent = radio.value === 'estudiante' && radio.checked;
            const labelComprobante = document.getElementById('label_comprobante');
            
            if (isStudent) {
                comprobanteInput.setAttribute('required', 'required');
                labelComprobante.setAttribute('required', 'required');
            } else {
                comprobanteInput.removeAttribute('required');
                labelComprobante.removeAttribute('required');
                // Limpiar visualmente si ya no es obligatorio
                comprobanteInput.classList.remove('input-error');
                document.getElementById('comprobante-error').style.display = 'none';
            }
        });
    });

    //Listener del evento submit para la Validación Personalizada
    form.addEventListener('submit', function (event) {
        // Prevenir el envío por defecto para la validación JS
        event.preventDefault(); 
        
        let formularioValido = true;

        // Limpiar errores previos
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        
        //Disparar mensajes de error
        if (!form.checkValidity()) {
            // Utilizamos el reportValidity para mostrar los mensajes de error nativos
            form.reportValidity();
            formularioValido = false;
        }

        //Confirmación de Contraseña
        if (passwordInput.value !== confirmPasswordInput.value) {
            mostrarError(confirmPasswordInput, 'Las contraseñas no coinciden.');
            formularioValido = false;
        } else if (passwordInput.value.length < 8) {
             mostrarError(passwordInput, 'La contraseña debe tener entre 8 y 20 caracteres.');
             formularioValido = false;
        }

        //Términos y Condiciones
        if (!termsCheckbox.checked) {
            mostrarError(termsCheckbox, 'Debes aceptar los términos y condiciones.');
            formularioValido = false;
        }
        
        //Validación: Lógica Condicional
        const estudianteSeleccionado = Array.from(tipoEntradaRadios).some(radio => radio.value === 'estudiante' && radio.checked);
        
        if (estudianteSeleccionado && comprobanteInput.files.length === 0) {
             mostrarError(comprobanteInput, 'Este campo es obligatorio si seleccionaste Estudiante.');
             formularioValido = false;
        }

        if (formularioValido) {
            // Si el formulario es realmente válido (pasó HTML5 y las validaciones JS)
            alert('✅ ¡Registro Exitoso! El formulario se enviaría ahora.');
            // form.submit(); // Descomentar para enviar realmente a un servidor
        } else {
            // Si hubo errores de JS, enfocamos el primer elemento no válido
            const firstInvalid = document.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            alert('⚠️ Por favor, corrige los errores marcados antes de continuar.');
        }
    });
});
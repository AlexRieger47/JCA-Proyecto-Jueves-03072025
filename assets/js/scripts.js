// ========================================
// JAVASCRIPT PARA INDEX
// Funcionalidades para la página principal
// ========================================

// NAVEGACIÓN SUAVE (SMOOTH SCROLLING)
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// EFECTOS DE APARICIÓN AL HACER SCROLL
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// VALIDACIÓN BÁSICA DEL FORMULARIO DE CONTACTO
function initFormValidation() {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('inp-username').value.trim();
            const email = document.getElementById('inp-email').value.trim();
            const message = document.getElementById('inp-message').value.trim();

            let errors = [];

            if (name.length < 4) {
                errors.push('El nombre debe tener al menos 4 caracteres');
            }

            if (!isValidEmail(email)) {
                errors.push('Por favor ingresa un email válido');
            }

            if (message.length < 10) {
                errors.push('El mensaje debe tener al menos 10 caracteres');
            }

            if (errors.length > 0) {
                showFormErrors(errors);
            } else {
                showFormSuccess();
            }
        });
    }
}

// Función auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar errores del formulario
function showFormErrors(errors) {
    removeFormMessages();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error-message';
    errorDiv.innerHTML = `
        <h4>Por favor corrige los siguientes errores:</h4>
        <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
    `;

    const form = document.querySelector('form');
    form.parentNode.insertBefore(errorDiv, form);
}

// Función para mostrar envío exitoso de mensaje
function showFormSuccess() {
    removeFormMessages();

    const successDiv = document.createElement('div');
    successDiv.className = 'form-message success-message';
    successDiv.innerHTML = `
        <h4>¡Mensaje enviado correctamente!</h4>
        <p>Gracias por contactarme. Te responderé pronto.</p>
    `;

    const form = document.querySelector('form');
    form.parentNode.insertBefore(successDiv, form);

    form.reset();
}

// Función auxiliar para remover mensajes anteriores
function removeFormMessages() {
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(message => message.remove());
}

// EFECTO DE TYPING PARA EL TÍTULO
// Esta función crea un efecto de máquina de escribir en el título
function initTypingEffect() {
    const titleElement = document.querySelector('header h1');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';

        let i = 0;
        const typingSpeed = 100; // milisegundos entre cada letra

        function typeWriter() {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        setTimeout(typeWriter, 500);
    }
}

// CONTADOR DE CARACTERES PARA EL TEXTAREA
// Esta función muestra cuántos caracteres ha escrito el usuario
function initCharacterCounter() {
    const textarea = document.getElementById('inp-message');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = '0 caracteres';

        textarea.parentNode.insertBefore(counter, textarea.nextSibling);

        textarea.addEventListener('input', function () {
            const count = this.value.length;
            counter.textContent = `${count} caracteres`;

            if (count < 10) {
                counter.style.color = '#EF9FAB'; // Rojo si es muy poco
            } else if (count < 50) {
                counter.style.color = '#EBCE87'; // Amarillo si es poco
            } else {
                counter.style.color = '#B2EB87'; // Verde si es suficiente
            }
        });
    }
}

// FUNCIÓN PRINCIPAL QUE INICIALIZA TODO
// Esta función se ejecuta cuando la página termina de cargar
function initializeWebsite() {
    console.log('Iniciando funciones de la página...');

    // Agregamos la clase js-enabled al body para activar las animaciones
    document.body.classList.add('js-enabled');

    initSmoothScrolling();
    initScrollAnimations();
    initFormValidation();
    initTypingEffect();
    initCharacterCounter();

    console.log('¡Todas las funciones se activaron correctamente!');
}

// EVENTO QUE EJECUTA TODO CUANDO LA PÁGINA ESTÁ LISTA
document.addEventListener('DOMContentLoaded', initializeWebsite);

// BONUS: Función para mostrar/ocultar información adicional
// Esta función puede ser útil para expandir secciones
function toggleInfo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}
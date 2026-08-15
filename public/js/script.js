const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuToggle.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    const light = document.body.classList.toggle('light');
    themeIcon.src = light ? './public/images/moon.svg' : './public/images/sun.svg';
    themeIcon.alt = light ? 'Mudar para tema escuro' : 'Mudar para tema claro';
});

const form = document.getElementById('contato-form');
const formError = document.getElementById('form-error');
const submitButton = form ? form.querySelector('button[type="submit"]') : null;

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        formError.hidden = true;

        if (typeof grecaptcha === 'undefined' || !grecaptcha.getResponse()) {
            formError.textContent = 'Por favor, complete o reCAPTCHA antes de enviar.';
            formError.hidden = false;
            return;
        }

        submitButton.disabled = true;
        const textoOriginal = submitButton.textContent;
        submitButton.textContent = 'Enviando...';

        try {
            const resposta = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });

            if (resposta.ok) {
                window.location.href = 'obrigado.html';
                return;
            }

            throw new Error('Erro no envio');
        } catch (erro) {
            formError.textContent = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.';
            formError.hidden = false;
            grecaptcha.reset();
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = textoOriginal;
        }
    });
}
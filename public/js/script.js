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
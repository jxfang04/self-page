const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('nav-menu');
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.classList.toggle('is-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false); menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('#site-header')) setMenu(false);
});
const desktop = matchMedia('(min-width: 1024px)');
desktop.addEventListener('change', () => setMenu(false));
// Match the reference's handwritten title reveal without hiding page content.
const title = document.querySelector('.home-banner-title__write');
if (title && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('portfolio-motion','portfolio-ready');
    title.classList.add('is-writing');
  });
}

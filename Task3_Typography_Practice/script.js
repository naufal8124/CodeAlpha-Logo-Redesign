const toast = document.querySelector('#toast');
let toastTimer;
document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', () => {
  if (!toast) return;
  toast.textContent = button.dataset.toast;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}));
document.querySelectorAll('a[href]').forEach(link => {
  const target = link.getAttribute('href');
  if (target && target.endsWith('.html')) {
    link.addEventListener('click', () => {
      document.body.classList.add('navigating');
    });
  }
});
const revealItems = document.querySelectorAll('.poster, .info-card, .process-grid article, .screen-card, .variation');
if ('IntersectionObserver' in window) {
  revealItems.forEach(item => {
    item.style.transition = 'opacity .45s ease, transform .45s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
  });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  }), {threshold: 0.08});
  revealItems.forEach(item => observer.observe(item));
}

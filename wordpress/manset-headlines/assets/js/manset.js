(function () {
  function initTicker(el) {
    const items = Array.from(el.querySelectorAll('.manset-headlines__item'));
    if (items.length <= 1) return;

    let index = items.findIndex((item) => item.classList.contains('is-active'));
    if (index < 0) index = 0;

    const speed = Math.max(parseInt(el.dataset.speed || '3500', 10), 1000);

    window.setInterval(() => {
      items[index].classList.remove('is-active');
      index = (index + 1) % items.length;
      items[index].classList.add('is-active');
    }, speed);
  }

  function boot() {
    document.querySelectorAll('.manset-headlines').forEach(initTicker);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

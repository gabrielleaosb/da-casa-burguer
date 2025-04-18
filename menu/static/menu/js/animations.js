document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up'); // aplica a animação
        entry.target.classList.remove('observe'); // remove a classe base
        observer.unobserve(entry.target); // para de observar depois que anima
      }
    });
  }, {
    threshold: 0.5
  });

  const items = document.querySelectorAll('.observe');
  items.forEach(item => observer.observe(item));
});

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel-container');

  if (!carousel) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  // Função para inicializar o toque
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  // Função para mover o carrossel enquanto o toque está em andamento
  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (startX - x) * 1.5; // Sensibilidade da rolagem
    carousel.scrollLeft = scrollLeft + walk;
  });

  // Função para parar o movimento do carrossel quando o toque é liberado
  carousel.addEventListener('touchend', () => {
    isDown = false;
  });

  // Função para parar o movimento se o toque for cancelado
  carousel.addEventListener('touchcancel', () => {
    isDown = false;
  });
});

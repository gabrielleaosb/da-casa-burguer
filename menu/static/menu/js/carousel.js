document.addEventListener('alpine:init', () => {
  Alpine.data('infiniteCarousel', () => ({
    currentIndex: 0,
    slidesCount: 0,
    interval: null,
    touchStartX: 0,
    isDragging: false,
    slidesContainer: null,

    init(element) {
      // Configura elementos
      this.slidesContainer = element.querySelector('.flex');
      this.slidesCount = element.querySelectorAll('.carousel-slide').length;
      
      // Cria clones para o efeito infinito
      this.createClones();
      
      // Começa no slide "real" (índice 1)
      this.currentIndex = 1;
      
      // Inicia autoplay
      this.startAutoplay();
    },

    createClones() {
      const slides = this.slidesContainer.children;
      const firstSlide = slides[0].cloneNode(true);
      const lastSlide = slides[slides.length - 1].cloneNode(true);
      
      // Adiciona clones no início e fim
      this.slidesContainer.prepend(lastSlide);
      this.slidesContainer.appendChild(firstSlide);
      
      // Atualiza contagem
      this.slidesCount += 2;
    },

    startAutoplay() {
      this.interval = setInterval(() => {
        this.next();
      }, 5000); // 5 segundos
    },

    stopAutoplay() {
      clearInterval(this.interval);
    },

    next() {
      this.currentIndex++;
      this.checkBounds();
    },

    prev() {
      this.currentIndex--;
      this.checkBounds();
    },

    checkBounds() {
      // Se chegou ao final, volta para o início sem animação
      if (this.currentIndex >= this.slidesCount - 1) {
        setTimeout(() => {
          this.slidesContainer.style.transition = 'none';
          this.currentIndex = 1;
          this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
          // Força reflow
          void this.slidesContainer.offsetWidth;
          this.slidesContainer.style.transition = '';
        }, 500);
      }
      // Se voltou ao início, vai para o final sem animação
      else if (this.currentIndex <= 0) {
        setTimeout(() => {
          this.slidesContainer.style.transition = 'none';
          this.currentIndex = this.slidesCount - 2;
          this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
          // Força reflow
          void this.slidesContainer.offsetWidth;
          this.slidesContainer.style.transition = '';
        }, 500);
      }
    },

    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
      this.isDragging = true;
      this.stopAutoplay();
      this.slidesContainer.style.transition = 'none';
    },

    handleTouchMove(e) {
      if (!this.isDragging) return;
      const touchX = e.touches[0].clientX;
      const diff = this.touchStartX - touchX;
      
      this.slidesContainer.style.transform = `translateX(calc(-${this.currentIndex * 100}% - ${diff}px)`;
    },

    handleTouchEnd(e) {
      if (!this.isDragging) return;
      this.isDragging = false;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - touchEndX;
      
      // Limiar para mudar de slide
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      } else {
        // Volta para a posição atual se não passou do limiar
        this.slidesContainer.style.transition = 'transform 0.5s ease-out';
        this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }
      
      this.startAutoplay();
    }
  }));
});
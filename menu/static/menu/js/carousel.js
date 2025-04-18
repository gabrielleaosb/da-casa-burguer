function carouselLoop() {
    return {
      isDragging: false,
      isTransitioning: false,
      startX: 0,
      scrollLeft: 0,
      container: null,
      itemWidth: 0,
      cloneCount: 4,
      intervalId: null,
      animationDuration: 2000, 
      
      init() {
        this.container = document.querySelector(".carousel-container");
        const items = Array.from(this.container.children);
        this.itemWidth = items[0].offsetWidth;
  
        for (let i = items.length - this.cloneCount; i < items.length; i++) {
          const clone = items[i].cloneNode(true);
          this.container.insertBefore(clone, this.container.firstChild);
        }
  
        for (let i = 0; i < this.cloneCount; i++) {
          const clone = items[i].cloneNode(true);
          this.container.appendChild(clone);
        }
  
        this.container.scrollLeft = this.itemWidth * this.cloneCount;
  
        this.container.addEventListener("scroll", this.checkLoop.bind(this));
  
        this.startAutoScroll();
      },
  

      startAutoScroll() {
        this.intervalId = setInterval(() => {
          if (!this.isDragging && !this.isTransitioning) {
            this.smoothScrollTo(this.container.scrollLeft + this.itemWidth); // Avança 1 item suavemente
          }
        }, 8000); 
      },
  
      smoothScrollTo(targetPosition) {
        const start = this.container.scrollLeft;
        const change = targetPosition - start;
        const startTime = performance.now();
  
        const animateScroll = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / this.animationDuration, 1); // Define o progresso da animação
  
          this.container.scrollLeft = start + change * progress;
  
          if (progress < 1) {
            window.requestAnimationFrame(animateScroll); 
          }
        };
  
        window.requestAnimationFrame(animateScroll); 
      },
  
      stopAutoScroll() {
        if (this.intervalId) {
          clearInterval(this.intervalId); 
        }
      },
  
      checkLoop() {
        if (this.isDragging || this.isTransitioning) return;
  
        const maxScroll = this.container.scrollWidth - this.container.clientWidth;
  
        if (this.container.scrollLeft <= this.itemWidth / 2) {
          this.isTransitioning = true;
          requestAnimationFrame(() => {
            this.container.scrollLeft = this.container.scrollLeft + this.itemWidth * this.cloneCount;
            this.isTransitioning = false;
          });
        }
  
        if (this.container.scrollLeft >= maxScroll - this.itemWidth * 1.5) {
          this.isTransitioning = true;
          requestAnimationFrame(() => {
            this.container.scrollLeft = this.container.scrollLeft - this.itemWidth * this.cloneCount;
            this.isTransitioning = false;
          });
        }
      },
  
      startDrag(e) {
        this.isDragging = true;
        this.startX = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
        this.scrollLeft = this.container.scrollLeft;
        this.container.style.cursor = "grabbing";
        this.container.style.scrollBehavior = "auto"; 
      },
  
      drag(e) {
        if (!this.isDragging) return;
        const x = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
        const walk = (x - this.startX) * 1.5;
        this.container.scrollLeft = this.scrollLeft - walk;
      },
  
      endDrag() {
        this.isDragging = false;
        this.container.style.cursor = "grab";
        this.container.style.scrollBehavior = "smooth"; 
      },
    };
  }
  
// animations.js - Animações e efeitos visuais
function initAnimations() {
  // Animações para troféus
  initTrophyAnimations();
  
  // Animações para novidades
  initNewsAnimations();
  
  // Animações de scroll suave
  initSmoothScroll();
  
  // Animações de entrada para elementos
  initFadeInAnimations();
}

// Animações para troféus
function initTrophyAnimations() {
  const trophyItems = document.querySelectorAll('.trophy-item');
  
  if (trophyItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200); // Delay escalonado para efeito cascata
          
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });
    
    trophyItems.forEach(item => {
      observer.observe(item);
    });
  }
}

// Animações para novidades
function initNewsAnimations() {
  const newsItems = document.querySelectorAll('.news-item');
  
  if (newsItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 300); // Delay escalonado
          
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px'
    });
    
    newsItems.forEach(item => {
      observer.observe(item);
    });
  }
}

// Scroll suave para links internos
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Animações de fade-in para elementos gerais
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in, .post, .input-group');
  
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      // Configurar estado inicial
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      observer.observe(element);
    });
  }
}

// Animação do carrossel de banner
function initBannerCarousel() {
  const bannerImages = document.querySelectorAll('.banner-carousel img');
  
  if (bannerImages.length > 1) {
    let currentIndex = 0;
    
    // Configurar estado inicial
    bannerImages.forEach((img, index) => {
      img.style.opacity = index === 0 ? '1' : '0';
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      img.style.transition = 'opacity 1.5s ease-in-out';
    });
    
    // Função para trocar imagens
    function nextImage() {
      bannerImages[currentIndex].style.opacity = '0';
      currentIndex = (currentIndex + 1) % bannerImages.length;
      bannerImages[currentIndex].style.opacity = '1';
    }
    
    // Iniciar carrossel
    setInterval(nextImage, 4000); // Troca a cada 4 segundos
  }
}

// Animação de progresso (para área do aluno)
function animateProgressBar() {
  const progressFill = document.querySelector('.progress-fill');
  
  if (progressFill) {
    const targetWidth = progressFill.style.width;
    progressFill.style.width = '0%';
    
    setTimeout(() => {
      progressFill.style.width = targetWidth;
    }, 500);
  }
}

// Efeito de hover para cards
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.post, .trophy-item, .news-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });
  });
}

// Inicializar todas as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  initBannerCarousel();
  initCardHoverEffects();
  
  // Animar barra de progresso se estiver na página
  if (document.querySelector('.progress-fill')) {
    setTimeout(animateProgressBar, 1000);
  }
});
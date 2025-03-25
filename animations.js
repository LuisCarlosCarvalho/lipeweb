// animations.js
function initAnimations() {
  const trophyItems = document.querySelectorAll('.trophy-item');

  // Criando um novo Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Quando o item entra na tela, adicionamos a classe "visible"
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Interrompe a observação após aplicar a animação
          }
      });
  }, { threshold: 0.5 }); // Threshold de 50% da área do elemento visível

  // Observando cada item de troféu
  trophyItems.forEach(item => {
      observer.observe(item);
  });
}
// novidades-animations.js
document.addEventListener("DOMContentLoaded", function() {
  const newsItems = document.querySelectorAll('.news-item');

  // Criando um novo Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Quando o item entra na tela, adicionamos a classe "visible"
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Interrompe a observação após aplicar a animação
          }
      });
  }, { threshold: 0.5 }); // Threshold de 50% da área do elemento visível

  // Observando cada item de novidade
  newsItems.forEach(item => {
      observer.observe(item);
  });
});

// banner.js

document.addEventListener('DOMContentLoaded', function () {
    // Selecionando todos os elementos de imagem dentro do banner
    const images = document.querySelectorAll('.banner-carousel img');
    let currentIndex = 0;

    // Função para esconder todas as imagens
    function hideAllImages() {
        images.forEach(image => {
            image.style.opacity = '0'; // Torna as imagens invisíveis
            image.style.visibility = 'hidden'; // Torna as imagens invisíveis
        });
    }

    // Função para exibir a imagem no índice atual
    function showCurrentImage() {
        hideAllImages(); // Esconde todas as imagens
        images[currentIndex].style.opacity = '1'; // Exibe a imagem atual
        images[currentIndex].style.visibility = 'visible'; // Torna a imagem visível
    }

    // Função para mudar para a próxima imagem
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length; // Vai para a próxima imagem e retorna à primeira após a última
        showCurrentImage(); // Exibe a nova imagem
    }

    // Inicializa o slideshow
    showCurrentImage(); // Exibe a primeira imagem
    setInterval(nextImage, 2000); // Troca de imagem a cada 2 segundos (2000ms)
});

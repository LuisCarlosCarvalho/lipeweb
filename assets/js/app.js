// app.js - Arquivo principal de inicialização
document.addEventListener("DOMContentLoaded", function () {
  console.log("Elite Artes Marciais - Sistema carregado");
  
  // Inicializa os scripts
  initFormContato();
  initAnimations();
  initBannerCarousel();
  
  // Inicializa funcionalidades específicas da página
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  switch(currentPage) {
    case 'agenda.html':
      initAgenda();
      break;
    case 'area-do-aluno.html':
      initAreaAluno();
      break;
    case 'comunidade.html':
      initComunidade();
      break;
    case 'cadastro.html':
      initCadastro();
      break;
    case 'contato.html':
      initContato();
      break;
  }
});

// Função para inicializar o carrossel de banner
function initBannerCarousel() {
  const bannerImages = document.querySelectorAll('.banner-carousel img');
  if (bannerImages.length > 1) {
    let currentIndex = 0;
    
    setInterval(() => {
      bannerImages[currentIndex].style.opacity = '0';
      currentIndex = (currentIndex + 1) % bannerImages.length;
      bannerImages[currentIndex].style.opacity = '1';
    }, 3000);
  }
}

// Função para inicializar funcionalidades da área do aluno
function initAreaAluno() {
  const feedbackForm = document.getElementById('formFeedback');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const feedback = document.getElementById('feedback').value;
      if (feedback.trim()) {
        alert('Obrigado pelo seu feedback! Sua opinião é muito importante para nós.');
        feedbackForm.reset();
      }
    });
  }
}

// Função para inicializar funcionalidades da comunidade
function initComunidade() {
  const mensagemForm = document.getElementById('formMensagem');
  if (mensagemForm) {
    mensagemForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const mensagem = document.getElementById('mensagem').value;
      if (mensagem.trim()) {
        alert('Sua mensagem foi enviada para a comunidade!');
        mensagemForm.reset();
      }
    });
  }
  
  // Adicionar funcionalidade aos botões de comentar
  const commentButtons = document.querySelectorAll('.post button');
  commentButtons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Funcionalidade de comentários em desenvolvimento!');
    });
  });
}

// Função para inicializar funcionalidades do cadastro
function initCadastro() {
  const cadastroForm = document.getElementById('formCadastro');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      
      if (nome && email && telefone) {
        alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${nome}!`);
        cadastroForm.reset();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  }
}

// Função para inicializar funcionalidades da agenda
function initAgenda() {
  // Esta função é chamada pelo agenda.js
  console.log('Página de agenda carregada');
}

// Função para inicializar funcionalidades de contato
function initContato() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const whatsapp = document.getElementById('whatsapp').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && whatsapp && email && message) {
        // Criar mensagem para WhatsApp
        const whatsappMessage = `Olá! Meu nome é ${name}.\n\nEmail: ${email}\n\nMensagem: ${message}`;
        const whatsappUrl = `https://wa.me/351964402755?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        alert('Redirecionando para o WhatsApp...');
        contactForm.reset();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  }
}
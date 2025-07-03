// menu.js - Funcionalidades do menu e navegação

document.addEventListener('DOMContentLoaded', function() {
  initMenuFeatures();
  initMobileMenu();
  initActivePageHighlight();
});

function initMenuFeatures() {
  // Adicionar efeitos hover aos links do menu
  const menuLinks = document.querySelectorAll('nav ul li a');
  
  menuLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

function initMobileMenu() {
  // Criar botão de menu mobile se não existir
  const nav = document.querySelector('nav');
  const navUl = document.querySelector('nav ul');
  
  if (nav && navUl && !document.querySelector('.mobile-menu-button')) {
    // Criar botão de menu mobile
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.style.cssText = `
      display: none;
      background: var(--dourado);
      color: var(--preto);
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 1.2rem;
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1001;
    `;
    
    // Inserir botão no header
    const header = document.querySelector('header');
    header.style.position = 'relative';
    header.appendChild(mobileMenuButton);
    
    // Adicionar estilos responsivos
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .mobile-menu-button {
          display: block !important;
        }
        
        nav ul {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: var(--preto);
          flex-direction: column;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          z-index: 1000;
        }
        
        nav ul.mobile-open {
          display: flex !important;
        }
        
        nav ul li {
          margin: 10px 0;
        }
        
        nav ul li a {
          display: block;
          padding: 10px;
          text-align: center;
          border-radius: 5px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Funcionalidade do botão
    mobileMenuButton.addEventListener('click', function() {
      navUl.classList.toggle('mobile-open');
      
      // Mudar ícone
      const icon = this.querySelector('i');
      if (navUl.classList.contains('mobile-open')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = navUl.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navUl.classList.remove('mobile-open');
        mobileMenuButton.querySelector('i').className = 'fas fa-bars';
      });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        navUl.classList.remove('mobile-open');
        mobileMenuButton.querySelector('i').className = 'fas fa-bars';
      }
    });
  }
}

function initActivePageHighlight() {
  // Destacar página atual no menu
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuLinks = document.querySelectorAll('nav ul li a');
  
  menuLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      
      link.style.backgroundColor = 'var(--dourado)';
      link.style.color = 'var(--preto)';
      link.style.fontWeight = 'bold';
    }
  });
}

// Função para scroll suave para seções
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Adicionar funcionalidade de scroll to top
function addScrollToTop() {
  // Criar botão de voltar ao topo
  const scrollTopButton = document.createElement('button');
  scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopButton.className = 'scroll-to-top';
  scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--dourado);
    color: var(--preto);
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  `;
  
  document.body.appendChild(scrollTopButton);
  
  // Mostrar/esconder botão baseado no scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopButton.style.opacity = '1';
      scrollTopButton.style.visibility = 'visible';
    } else {
      scrollTopButton.style.opacity = '0';
      scrollTopButton.style.visibility = 'hidden';
    }
  });
  
  // Funcionalidade do botão
  scrollTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Efeito hover
  scrollTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  scrollTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
}

// Inicializar scroll to top
document.addEventListener('DOMContentLoaded', function() {
  addScrollToTop();
});
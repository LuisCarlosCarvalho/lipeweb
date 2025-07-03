// form-contato.js - Funcionalidades de formulários
function initFormContato() {
  // Função genérica para validação de formulários
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        clearFieldError(this);
      });
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  
  // Remove classes de erro anteriores
  clearFieldError(field);
  
  if (!value && field.hasAttribute('required')) {
    showFieldError(field, 'Este campo é obrigatório');
    return false;
  }
  
  // Validações específicas por tipo
  switch(fieldType) {
    case 'email':
      if (value && !isValidEmail(value)) {
        showFieldError(field, 'Por favor, insira um email válido');
        return false;
      }
      break;
      
    case 'tel':
      if (value && !isValidPhone(value)) {
        showFieldError(field, 'Por favor, insira um telefone válido');
        return false;
      }
      break;
      
    case 'text':
      if (field.name === 'nome' && value && value.length < 2) {
        showFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
        return false;
      }
      break;
  }
  
  return true;
}

function showFieldError(field, message) {
  field.style.borderColor = '#e74c3c';
  
  // Remove mensagem de erro anterior
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Adiciona nova mensagem de erro
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#e74c3c';
  errorDiv.style.fontSize = '0.9rem';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = message;
  
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.style.borderColor = '#FFD700';
  
  const errorMessage = field.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
  return phoneRegex.test(phone);
}

// Função para formatar telefone automaticamente
function formatPhone(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length >= 9) {
    if (value.startsWith('351')) {
      // Formato português: +351 XXX XXX XXX
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
    } else {
      // Formato genérico
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
  }
  
  input.value = value;
}

// Aplicar formatação de telefone automaticamente
document.addEventListener('DOMContentLoaded', function() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="telefone"], input[name="whatsapp"]');
  
  phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
      formatPhone(this);
    });
  });
});
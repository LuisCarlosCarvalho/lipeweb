// form-contato.js
function initFormContato() {
  const formContato = document.getElementById("formContato");

  if (formContato) {
      formContato.addEventListener("submit", function(event) {
          event.preventDefault();
          
          const nome = document.getElementById("nome").value;
          const email = document.getElementById("email").value;
          const mensagem = document.getElementById("mensagem").value;

          if (nome && email && mensagem) {
              alert("Obrigado por entrar em contato! Responderemos em breve.");
              formContato.reset();
          } else {
              alert("Por favor, preencha todos os campos.");
          }
      });
  }
}

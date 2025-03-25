// agenda.js

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mapa de Como Chegar (Google Maps)
  function initMap() {
      const schoolLocation = { lat: 40.9023266, lng: -8.4953312 }; // Coordenadas de exemplo sjm
      const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: schoolLocation,
      });
      const marker = new google.maps.Marker({
          position: schoolLocation,
          map: map,
          title: "Academia Elite",
      });
  }

  // Carregar o Google Maps
  window.initMap = initMap;

  // 2. Marcar a data selecionada no calendário
  const dataInput = document.getElementById("data-agendamento");

  dataInput.addEventListener("change", function () {
      const selectedDate = new Date(dataInput.value);
      const calendarContainer = document.getElementById("calendar-container");

      // Marcar a data no calendário
      calendarContainer.innerHTML = `<h3>Aula agendada para: ${selectedDate.toLocaleString()}</h3>`;
  });

  // 3. Envio do formulário e mensagem no WhatsApp
  const form = document.getElementById("formAgendamento");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      // Obter os dados do formulário
      const name = document.getElementById("name").value;
      const whatsapp = document.getElementById("whatsapp").value;
      const email = document.getElementById("email").value;
      const aula = document.getElementById("aula").value;
      const dataAgendamento = document.getElementById("data-agendamento").value;

      // Mensagem para o usuário
      const messageUser = `
          Olá ${name}, sua aula de ${aula} foi agendada para ${dataAgendamento}. 
          Confira sua agenda para mais informações.`;

      // Mensagem para o WhatsApp do administrador
      const messageAdmin = `
          Novo agendamento:
          Nome: ${name}
          WhatsApp: ${whatsapp}
          Email: ${email}
          Aula: ${aula}
          Data: ${dataAgendamento}`;

      // Enviar mensagem para o usuário (via WhatsApp)
      const userPhone = whatsapp.replace(/[^\d]/g, ""); // Remover caracteres não numéricos
      const userUrl = `https://wa.me/${userPhone}?text=${encodeURIComponent(messageUser)}`;
      window.open(userUrl, "_blank");

      // Enviar mensagem para o WhatsApp do administrador (via WhatsApp)
      const adminPhone = "+351937255673"; // Substitua pelo número de WhatsApp do administrador
      const adminUrl = `https://wa.me/+351964402755?text=${encodeURIComponent(messageAdmin)}`;
      window.open(adminUrl, "_blank");

      // Mostrar mensagem de sucesso
      alert("Aula agendada com sucesso!");
      form.reset(); // Limpar o formulário após o envio
  });
});

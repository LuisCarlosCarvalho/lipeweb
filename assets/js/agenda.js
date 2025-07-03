// agenda.js - Funcionalidades específicas da página de agenda

document.addEventListener('DOMContentLoaded', function () {
  initAgendaFeatures();
});

function initAgendaFeatures() {
  // 1. Inicializar mapa
  initMap();
  
  // 2. Configurar calendário
  initCalendar();
  
  // 3. Configurar formulário de agendamento
  initBookingForm();
}

// Função para inicializar o Google Maps
function initMap() {
  // Coordenadas da academia (exemplo: São João da Madeira, Portugal)
  const schoolLocation = { lat: 40.9023266, lng: -8.4953312 };
  
  // Verificar se o Google Maps está disponível
  if (typeof google !== 'undefined' && google.maps) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: schoolLocation,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }]
        }
      ]
    });
    
    const marker = new google.maps.Marker({
      position: schoolLocation,
      map: map,
      title: "Academia Elite - Artes Marciais",
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#000" stroke-width="2"/>
            <text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#000">EA</text>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40)
      }
    });
    
    // Info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; color: #000;">
          <h3 style="margin: 0 0 10px 0; color: #FFD700;">Academia Elite</h3>
          <p style="margin: 0;">Artes Marciais de Excelência</p>
          <p style="margin: 5px 0 0 0; font-size: 12px;">São João da Madeira, Portugal</p>
        </div>
      `
    });
    
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  } else {
    // Fallback se o Google Maps não estiver disponível
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #f5f5f5; color: #666; text-align: center; padding: 20px;">
          <div>
            <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: #FFD700; margin-bottom: 10px;"></i>
            <p><strong>Academia Elite</strong></p>
            <p>São João da Madeira, Portugal</p>
            <p style="font-size: 0.9rem; margin-top: 10px;">Mapa será carregado em breve</p>
          </div>
        </div>
      `;
    }
  }
}

// Função para inicializar o calendário
function initCalendar() {
  const calendarContainer = document.getElementById("calendar-container");
  const dataInput = document.getElementById("data-agendamento");
  
  if (calendarContainer) {
    // Mostrar calendário simples
    generateSimpleCalendar();
  }
  
  // Listener para mudança de data
  if (dataInput) {
    dataInput.addEventListener("change", function () {
      const selectedDate = new Date(dataInput.value);
      updateCalendarDisplay(selectedDate);
    });
  }
}

function generateSimpleCalendar() {
  const calendarContainer = document.getElementById("calendar-container");
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  
  let calendarHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h3 style="color: #FFD700; margin: 0;">${monthNames[currentMonth]} ${currentYear}</h3>
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
  `;
  
  // Cabeçalho dos dias da semana
  daysOfWeek.forEach(day => {
    calendarHTML += `<th style="padding: 10px; background-color: #FFD700; color: #000; font-weight: bold;">${day}</th>`;
  });
  calendarHTML += "</tr>";
  
  // Calcular primeiro dia do mês e número de dias
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  let date = 1;
  
  // Gerar semanas
  for (let week = 0; week < 6; week++) {
    calendarHTML += "<tr>";
    
    for (let day = 0; day < 7; day++) {
      if (week === 0 && day < firstDay) {
        calendarHTML += "<td style='padding: 10px; border: 1px solid #ddd;'></td>";
      } else if (date > daysInMonth) {
        calendarHTML += "<td style='padding: 10px; border: 1px solid #ddd;'></td>";
      } else {
        const isToday = date === today.getDate();
        const cellStyle = isToday 
          ? "padding: 10px; border: 1px solid #ddd; background-color: #FFD700; color: #000; font-weight: bold; cursor: pointer;"
          : "padding: 10px; border: 1px solid #ddd; cursor: pointer; transition: background-color 0.3s;";
        
        calendarHTML += `<td style="${cellStyle}" onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='${isToday ? '#FFD700' : 'transparent'}'">${date}</td>`;
        date++;
      }
    }
    
    calendarHTML += "</tr>";
    
    if (date > daysInMonth) break;
  }
  
  calendarHTML += "</table>";
  calendarContainer.innerHTML = calendarHTML;
}

function updateCalendarDisplay(selectedDate) {
  const calendarContainer = document.getElementById("calendar-container");
  
  if (selectedDate && !isNaN(selectedDate.getTime())) {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const formattedDate = selectedDate.toLocaleDateString('pt-BR', options);
    
    calendarContainer.innerHTML = `
      <div style="text-align: center; padding: 20px; background-color: #FFD700; color: #000; border-radius: 8px;">
        <i class="fas fa-calendar-check" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <h3 style="margin: 0 0 10px 0;">Aula Agendada!</h3>
        <p style="margin: 0; font-size: 1.1rem; font-weight: bold;">${formattedDate}</p>
      </div>
    `;
  }
}

// Função para inicializar o formulário de agendamento
function initBookingForm() {
  const form = document.getElementById("formAgendamento");
  
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Obter dados do formulário
      const formData = {
        name: document.getElementById("name").value,
        whatsapp: document.getElementById("whatsapp").value,
        email: document.getElementById("email").value,
        aula: document.getElementById("aula").value,
        dataAgendamento: document.getElementById("data-agendamento").value
      };
      
      // Validar dados
      if (!validateBookingForm(formData)) {
        return;
      }
      
      // Processar agendamento
      processBooking(formData);
    });
  }
}

function validateBookingForm(data) {
  const errors = [];
  
  if (!data.name.trim()) errors.push("Nome é obrigatório");
  if (!data.whatsapp.trim()) errors.push("WhatsApp é obrigatório");
  if (!data.email.trim()) errors.push("Email é obrigatório");
  if (!data.aula) errors.push("Selecione uma aula");
  if (!data.dataAgendamento) errors.push("Data e hora são obrigatórias");
  
  // Validar se a data não é no passado
  const selectedDate = new Date(data.dataAgendamento);
  const now = new Date();
  
  if (selectedDate <= now) {
    errors.push("A data deve ser no futuro");
  }
  
  if (errors.length > 0) {
    alert("Por favor, corrija os seguintes erros:\n\n" + errors.join("\n"));
    return false;
  }
  
  return true;
}

function processBooking(data) {
  // Formatar data
  const selectedDate = new Date(data.dataAgendamento);
  const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Mensagem para o usuário
  const userMessage = `Olá ${data.name}! 👋

Sua aula de ${data.aula} foi agendada com sucesso! ✅

📅 Data: ${formattedDate}
🥋 Modalidade: ${data.aula}
📧 Email: ${data.email}

Chegue 15 minutos antes do horário marcado.
Traga roupas confortáveis e uma garrafa de água.

Nos vemos em breve! 💪`;

  // Mensagem para o administrador
  const adminMessage = `🥋 NOVO AGENDAMENTO - Academia Elite

👤 Nome: ${data.name}
📱 WhatsApp: ${data.whatsapp}
📧 Email: ${data.email}
🥋 Aula: ${data.aula}
📅 Data: ${formattedDate}

Por favor, confirme o agendamento.`;

  // Enviar mensagens via WhatsApp
  sendWhatsAppMessages(data.whatsapp, userMessage, adminMessage);
  
  // Atualizar display do calendário
  updateCalendarDisplay(selectedDate);
  
  // Mostrar confirmação
  showBookingConfirmation(data);
  
  // Limpar formulário
  document.getElementById("formAgendamento").reset();
}

function sendWhatsAppMessages(userPhone, userMessage, adminMessage) {
  // Limpar número do usuário
  const cleanUserPhone = userPhone.replace(/[^\d]/g, "");
  
  // URLs do WhatsApp
  const userUrl = `https://wa.me/${cleanUserPhone}?text=${encodeURIComponent(userMessage)}`;
  const adminUrl = `https://wa.me/351964402755?text=${encodeURIComponent(adminMessage)}`;
  
  // Abrir WhatsApp do usuário
  setTimeout(() => {
    window.open(userUrl, "_blank");
  }, 500);
  
  // Abrir WhatsApp do admin
  setTimeout(() => {
    window.open(adminUrl, "_blank");
  }, 1500);
}

function showBookingConfirmation(data) {
  const confirmationHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center;" id="confirmationModal">
      <div style="background-color: white; padding: 30px; border-radius: 15px; max-width: 500px; text-align: center; color: #000;">
        <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 20px;"></i>
        <h2 style="color: #FFD700; margin-bottom: 15px;">Agendamento Confirmado!</h2>
        <p style="margin-bottom: 10px;"><strong>Aluno:</strong> ${data.name}</p>
        <p style="margin-bottom: 10px;"><strong>Aula:</strong> ${data.aula}</p>
        <p style="margin-bottom: 20px;"><strong>Data:</strong> ${new Date(data.dataAgendamento).toLocaleDateString('pt-BR')}</p>
        <p style="margin-bottom: 20px; font-size: 0.9rem; color: #666;">Mensagens foram enviadas via WhatsApp para você e para nossa equipe.</p>
        <button onclick="document.getElementById('confirmationModal').remove()" style="background-color: #FFD700; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Fechar</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', confirmationHTML);
  
  // Remover modal automaticamente após 5 segundos
  setTimeout(() => {
    const modal = document.getElementById('confirmationModal');
    if (modal) modal.remove();
  }, 5000);
}

// Tornar a função initMap global para o Google Maps
window.initMap = function() {
  // Esta função será chamada pelo Google Maps API
  const schoolLocation = { lat: 40.9023266, lng: -8.4953312 };
  
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: schoolLocation,
  });
  
  const marker = new google.maps.Marker({
    position: schoolLocation,
    map: map,
    title: "Academia Elite",
  });
};
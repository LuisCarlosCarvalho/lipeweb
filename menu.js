// menu.js
// Lógica para um menu interativo (se houver)
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.menu');

  menuButton.addEventListener('click', function() {
      menu.classList.toggle('open');
  });
});



// script.js
document.addEventListener("DOMContentLoaded", function() {
  const formAgendamento = document.getElementById("formAgendamento");

  // Função para gerar um calendário simples
  const generateCalendar = () => {
      const calendarContainer = document.getElementById("calendar-container");
      
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      
      let firstDayOfMonth = new Date(year, month, 1);
      let lastDayOfMonth = new Date(year, month + 1, 0);

      let calendarHTML = "<table><tr>";
      for (let i = 0; i < 7; i++) {
          calendarHTML += `<th>${["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][i]}</th>`;
      }
      calendarHTML += "</tr><tr>";

      for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
          calendarHTML += "<td></td>";
      }

      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
          if ((firstDayOfMonth.getDay() + day - 1) % 7 === 0 && day !== 1) {
              calendarHTML += "</tr><tr>";
          }
          calendarHTML += `<td>${day}</td>`;
      }

      calendarHTML += "</tr></table>";
      calendarContainer.innerHTML = calendarHTML;
  };

  });

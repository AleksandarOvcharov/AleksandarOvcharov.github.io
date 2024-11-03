// Скрипт за копиране на кода
function copyCode(text) {
       navigator.clipboard.writeText(text).then(() => {
           alert("Кодът е копиран!");
       });
   }
   
   // Анимация при скролиране за плавно появяване на секциите
   window.addEventListener('scroll', () => {
       document.querySelectorAll('section').forEach(section => {
           const sectionTop = section.getBoundingClientRect().top;
           const windowHeight = window.innerHeight;
           if (sectionTop < windowHeight - 50) {
               section.classList.add('visible');
           }
       });
   });
   
   let isCopying = false; // Флаг, който показва дали копирането е в процес

   function copyToClipboard(text) {
       // Проверка дали вече се копира нещо
       if (isCopying) return; // Ако е в процес на копиране, прекратява функцията
   
       isCopying = true; // Задаваме флага на true, за да блокираме допълнително копиране
   
       navigator.clipboard.writeText(text).then(() => {
           const notification = document.getElementById('notification');
           const notificationText = document.getElementById('notification-text');
           
           // Задаване на съобщението
           notificationText.textContent = `Discord ID-то е копирано: ${text}`;
           
           // Показване на нотификацията и стартиране на прогрес анимацията
           notification.classList.add('show', 'start-progress');
   
           // Скриване на нотификацията след 3 секунди
           setTimeout(() => {
               notification.classList.remove('show');
               
               // Премахване на прогрес класа, за да нулира анимацията
               setTimeout(() => {
                   notification.classList.remove('start-progress');
                   isCopying = false; // Нулираме флага, за да позволим следващо копиране
               }, 300); // Малко забавяне за плавно скриване на нотификацията
           }, 3000);
       }).catch(err => {
           console.error("Failed to copy text: ", err);
           isCopying = false; // Нулираме флага при грешка
       });
   }        

   document.getElementById('contactForm').addEventListener('submit', function(event) {
       const submitButton = document.getElementById('submitButton');
       
       // Disable the button to prevent further clicks
       submitButton.disabled = true;
       submitButton.textContent = "Изпраща се..."; // Optional: change text to show it's processing
   });

   document.addEventListener("DOMContentLoaded", function() {
       // Select all code containers
       const codeContainers = document.querySelectorAll(".code-container");
   
       // Calculate the widest box
       let maxWidth = 0;
       codeContainers.forEach(container => {
           const containerWidth = container.scrollWidth;
           if (containerWidth > maxWidth) {
               maxWidth = containerWidth;
           }
       });
   
       // Apply the max width to all code containers
       codeContainers.forEach(container => {
           container.style.width = maxWidth + "px";
       });
   });
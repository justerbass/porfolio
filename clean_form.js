
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario y los contenedores de mensajes
    const form = document.getElementById('contactForm');
    // Suponiendo que usas elementos con clase "formMessage" para mostrar mensajes (puede haber varios)
    const formMessages = document.querySelectorAll('.formMessage');
  
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita la recarga de la página
  
        // Extrae los valores de los campos y arma el objeto con los parámetros que usa tu plantilla
        const templateParams = {
          from_name: document.getElementById('name').value,
          from_email: document.getElementById('email').value,
          message: document.getElementById('message').value
        };
  
        // Envía el correo usando emailjs.send()
        emailjs.send('service_x7pbxfs', 'template_aze9rnl', templateParams)
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Muestra el mensaje de éxito en todos los elementos con la clase formMessage
            formMessages.forEach(function(messageEl) {
              messageEl.textContent = "Correo enviado. ¡Gracias por contactarme!";
              messageEl.classList.add("alert-success");
            });
            form.reset(); // Limpia el formulario
            // Después de 3 segundos, limpia el mensaje
            setTimeout(function() {
              formMessages.forEach(function(messageEl) {
                messageEl.textContent = "";
                messageEl.classList.remove("alert-success");
              });
            }, 3000);
          }, function(error) {
            console.log('FAILED...', error);
            // Muestra un mensaje de error en caso de fallo
            formMessages.forEach(function(messageEl) {
              messageEl.textContent = "Hubo un error. Por favor, inténtalo de nuevo.";
              messageEl.classList.add("alert-error");
            });
            setTimeout(function() {
              formMessages.forEach(function(messageEl) {
                messageEl.textContent = "";
                messageEl.classList.remove("alert-error");
              });
            }, 3000);
          });
      });
    }
  });
  
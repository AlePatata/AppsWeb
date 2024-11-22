
function toggleImageSize() {
    const photo = document.getElementById('photo');
    photo.classList.toggle('large');    
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form_comentarios");
    const nombreInput = document.getElementById("nombre");
    const commentText = document.getElementById("texto");
    const message = document.getElementById("message");
    const listaErrores = document.getElementById("popup-lista");
    const popup = document.getElementById("popup");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Previene el envío del formulario por defecto
        let isValid = true;
        let invalidInputs = [];

        // Limpiar mensajes anteriores
        listaErrores.innerHTML = '';
        message.textContent = '';
        popup.hidden = true;

        // Validación del campo nombre
        const nombre = nombreInput.value.trim();
        if (nombre.length < 3 || nombre.length > 80) {
            invalidInputs.push("Nombre: Debe tener entre 3 y 80 caracteres.");
            isValid = false;
        }

        // Validación del campo comentario
        const texto = commentText.value.trim();
        if (texto.length < 5) {
            invalidInputs.push("Comentario: Debe tener al menos 5 caracteres.");
            isValid = false;
        }

        // Mostrar errores o enviar el formulario
        if (!isValid) {
            // Mostrar lista de errores en el popup
            invalidInputs.forEach((error) => {
                let listElement = document.createElement("li");
                listElement.innerText = error;
                listaErrores.appendChild(listElement);
            });
            popup.hidden = false;
            message.textContent = "Por favor, corrige los errores en el formulario.";
            message.style.color = "red";
        } else {
            // Mostrar mensaje de éxito y limpiar el formulario
            message.textContent = "Comentario agregado exitosamente.";
            message.style.color = "green";
            
            // Simular envío exitoso
            form.submit();
        }
    });
});


photo.addEventListener('click', toggleImageSize)

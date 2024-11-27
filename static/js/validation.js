
const validatenombre = (nombre) => {
    if(!nombre) return false;
    let lengthValid = nombre.trim().length >= 3 && nombre.trim().length <= 80;
    // Valida nombres con tildes, espacios y ñ's
    let re2 = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00C0-\u017F\s'-]+$/; 
    let formatValid = re2.test(nombre);
    return formatValid && lengthValid;
};
  
const validateEmail = (email) => {
    if (!email) return false;
    let lengthValid = email.length < 31;
  
    // validamos el formato
    let re = /^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/;
    let formatValid = re.test(email);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
};
  
const validatecelularNumber = (celularNumber) => {
    if (!celularNumber) return false;
    // validación de longitud
    let lengthValid = celularNumber.length >= 8;
  
    // validación de formato
    let re = /^[0-9]+$/;
    let formatValid = re.test(celularNumber);
  
    // devolvemos la lógica AND de las validaciones.
    return lengthValid && formatValid;
};

const validateSelect = (select) => {
    if(!select) return false;
    return true
};

const validateDevicenombre = (dnombre) => {
  if(!dnombre) return false;
  let lengthValid = 3 <= dnombre.trim().length && dnombre.trim().length <= 80;
  return lengthValid;
};
  
const validateFiles = (archivos) => {
  if (!archivos) return false;

  let lengthValid = 1 <= archivos.length && archivos.length <= 3;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of archivos) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateYearsOfUse = (yearsOfUse) => {
  if (!yearsOfUse) return false;
  let rangeValid = yearsOfUse >= 1 && yearsOfUse <= 99;
  return rangeValid;
}
  
const validateForm = () => {
  let myForm = document.forms["form-donacion"];
  let email = myForm["email"].value;
  let celularNumber = myForm["celular"].value;
  let nombre = myForm["nombre"].value;
  let region = myForm["region"].value;
  let comuna = myForm["comuna"].value;

  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputnombre) => {
    invalidInputs.push(inputnombre);
    isValid = false;
  };
  
  let popup = document.getElementById("popup");
  let mensaje = document.getElementById("popup-msg");
  let listaErrores = document.getElementById("popup-lista");
  while (listaErrores.firstChild) {
    listaErrores.removeChild(listaErrores.firstChild);
  }
  let b1 = document.getElementById("b1");
  let b2 = document.getElementById("b2");
      
  if (!validatenombre(nombre))
    setInvalidInput("Nombre");
  if (!validateEmail(email)) 
    setInvalidInput("Email");
  if (celularNumber && !validatecelularNumber(celularNumber)) 
    setInvalidInput("Número");
  if (!validateSelect(region)) 
    setInvalidInput("Región");
  if (!validateSelect(comuna)) 
    setInvalidInput("Comuna");

  let devices = document.querySelectorAll("div[class='deviceContainer']"); 
  if (devices) {
    let deviceNumber = 1;
    devices.forEach((device) => {
      let dnombre = device.querySelector('input[name="dnombre"]').value;
      let deviceType = device.querySelector('select[name="tipo"]').value;
      let yearsOfUse = device.querySelector('input[name="anos_uso"]').value;
      let state = device.querySelector('select[name="estado"]').value;
      let imgs = device.querySelectorAll('input[type="file"]');
      
      let archivos = [];
      imgs.forEach((archivo) => {
        const f = archivo.files[0];
        if (f) archivos.push(f);
      });

      console.log(archivos);
      if (!validateDevicenombre(dnombre)) 
        setInvalidInput(`Nombre del dispositivo ${deviceNumber}`);
      if (!validateSelect(deviceType)) 
        setInvalidInput(`Tipo del dispositivo ${deviceNumber}`);
      if (!validateYearsOfUse(yearsOfUse)) 
        setInvalidInput(`Años de uso del dispositivo ${deviceNumber}`);
      if (!validateSelect(state)) 
        setInvalidInput(`Estado de Funcionamiento dispositivo ${deviceNumber}`);
      if (!validateFiles(archivos)) 
        setInvalidInput(`Fotos del dispositivo ${deviceNumber}`);
      deviceNumber++;
    });
  };
  
  if (!isValid) {
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      listaErrores.append(listElement);
    }
    mensaje.innerText = "Los siguientes campos son inválidos:";
    popup.hidden = false;
  } else {
    popup.hidden = true;
    let confirmacion = document.getElementById("popup-msg");
    confirmacion.innerText = "¡Formulario válido! ¿Deseas enviarlo o volver?";
    popup.hidden = false;
    b1.addEventListener("click", () => {
      while (listaErrores.firstChild) {
        listaErrores.removeChild(listaErrores.firstChild);
      }
      popup.hidden = true;} );
    b2.addEventListener("click", Submit);
  }
};

Submit = () => {
  let form = document.getElementById("form-donacion");
  form.submit();
};


let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", validateForm);
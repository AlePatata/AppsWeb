const tipos = ["pantalla", "notebook", "tablet", "celular", "consola", "mouse", "teclado", "impresora", "parlante", "audífonos", "otro"]

const estados = ["funciona perfecto", "funciona a medias", "no funciona"];

const updateComunas = () => {
  let regionSelect = document.getElementById("region");
  let comunaSelect = document.getElementById("comuna");
  
  let region = regionSelect.value; // id

  comunaSelect.innerHTML = ""; // limpiar select
  comunas.forEach(comuna => {
    
    if (comuna[2] == region) {
      let option = document.createElement("option");
      option.value = comuna[0];
      option.text = comuna[1];
      comunaSelect.appendChild(option);
    }
  });
};

const tipo_select = () => {
  let tipoSelect = document.getElementById("tipo");
  for (const tipo of tipos) {
    let option = document.createElement("option");
    option.value = tipo;
    option.text = tipo;
    tipoSelect.appendChild(option);
  }
} 

const state_select = () => {
  let stateSelect = document.getElementById("estado");
  for (const state of estados) {
    let option = document.createElement("option");
    option.value = state;
    option.text = state;
    stateSelect.appendChild(option);
  }
}

const fileContainer = document.getElementById("files");

const new_image = (event) => {
  const fileInputs = fileContainer.getElementsByTagName("input");

  if (fileInputs.length > 3) {
    event.target.value = '';  
    return;
  }

  let newFileInput = document.createElement("input");
  newFileInput.className = "field";
  newFileInput.type = 'file';
  newFileInput.id = "file";
  newFileInput.name = 'files';
  newFileInput.accept = "image/png, image/jpg, image/gif, image/jpeg";

  newFileInput.addEventListener("change", new_image);

  fileContainer.appendChild(newFileInput);
  fileContainer.appendChild(document.createElement('br')); // Optional line break for better layout
}

 
document.getElementById("region").addEventListener("change", updateComunas);
//document.getElementById("file").addEventListener("change", new_image);

window.onload = () => {
  tipo_select();
  state_select();
};

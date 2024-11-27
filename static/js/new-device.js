document.getElementById('addDeviceButton').addEventListener('click', function () {
    let container = document.getElementById('deviceContainer');
    let newDevice = document.createElement('div');
    newDevice.classList.add('device');

    newDevice.innerHTML = `
        <label >Nombre del dispositivo:</label>
        <input id="dnombre" class="field" type="text" name="dnombre" required><br>

        <label >Descripción:</label>
        <input id="description" class="field" type="text" name="description" ><br>

        <label >Tipo de dispositivo: </label>
        <select id="tipo" class="select" name="tipo" required>
            <option value="" disabled selected> Selecciona un tipo </option>
        </select><br>

        <label >Años de uso:</label>
        <input id="anos_uso" class="field" type="text" name="anos_uso" required><br>

        <label >Estado de Funcionamiento: </label>
        <select id="estado" class="select" name="estado" required>
            <option value="" disabled selected> Selecciona un tipo </option>
        </select><br>

        <label >Imágenes</label>
        <div id="files" class="file-container">
            <input class="field" type="file" id="file" name="files" multiple accept="image/png, image/jpg, image/gif, image/jpeg" required><br>
        </div>  
        
        <hr class="degradao">
    `;

    container.appendChild(newDevice);
});

document.getElementById('removeDeviceButton').addEventListener('click', function() {
    var deviceList = document.getElementById('deviceList');
    var devices = deviceList.getElementsByClassName('device');
    
    if (devices.length > 1) {
        deviceList.removeChild(devices[devices.length - 1]);  // Remove the last device
    } else {
        alert("Debes tener al menos un dispositivo.");  // Prevent removing the last one
    }
});

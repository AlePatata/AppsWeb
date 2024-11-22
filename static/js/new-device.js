document.getElementById('addDeviceButton').addEventListener('click', function() {
    var deviceContainer = document.getElementById('deviceContainer');
    var deviceList = document.getElementById('deviceList');
    
    var newDeviceContainer = deviceContainer.cloneNode(true);
    //var newIndex = deviceList.getElementsByClassName('deviceContainer').length;

    // Update the name of input fields and remove the id
    var inputs = newDeviceContainer.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';  
        inputs[i].removeAttribute('id');  
    }

    var selects = newDeviceContainer.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].removeAttribute('id');
        selects[i].selectedIndex = 0;  // Reset dropdown to default
    }
    newDeviceContainer.removeAttribute('id');
    deviceList.appendChild(newDeviceContainer);
});

document.getElementById('removeDeviceButton').addEventListener('click', function() {
    var deviceList = document.getElementById('deviceList');
    var devices = deviceList.getElementsByClassName('deviceContainer');
    
    if (devices.length > 1) {
        deviceList.removeChild(devices[devices.length - 1]);  // Remove the last device
    } else {
        alert("Debes tener al menos un dispositivo.");  // Prevent removing the last one
    }
});

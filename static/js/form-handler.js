// form-handler.js
window.collectDeviceData = function () {
    let devices = document.querySelectorAll('#deviceList .device');

    let deviceData = [];
    devices.forEach((deviceElement, index) => {
        let dname = deviceElement.querySelector('input[name="dname"]').value;
        let deviceType = deviceElement.querySelector('select[name="select-device"]').value;
        let yearsOfUse = deviceElement.querySelector('input[name="years-of-use"]').value;
        let state = deviceElement.querySelector('select[name="select-state"]').value;

        let files = Array.from(deviceElement.querySelector('input[name="files"]').files).map(file => file.name);

        let device = {
            name: dname,
            type: deviceType,
            yearsOfUse: yearsOfUse,
            state: state,
            files: files
        };

        deviceData.push(device);
    });

    return deviceData;
};

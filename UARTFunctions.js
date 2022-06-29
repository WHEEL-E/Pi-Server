const { SerialPort } = require('serialport');

let DrivingPort

exports.HealthPort = new SerialPort({
    path: "/dev/ttyS1",
    baudRate: 115200,
    parity: SerialPort.PARITY_NONE,
    stopBits: SerialPort.STOPBITS_ONE,
    autoOpen: true
});

exports.initDrivingPort = () => {
    DrivingPort = new SerialPort({
        path: "/dev/ttyS0",
        baudRate: 115200,
        parity: SerialPort.PARITY_NONE,
        stopBits: SerialPort.STOPBITS_ONE,
        autoOpen: true
    });
}

exports.closeDrivingPort = () => {
    DrivingPort.close();
}

exports.executeAction = (action) => {
    console.log("Executing action:", action);
    DrivingPort.write(action)
}

if (port) {
    exports.port = port
}
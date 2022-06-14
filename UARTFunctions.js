const { SerialPort } = require('serialport');

let port

exports.initPort = () => {
    port = new SerialPort({
        path: "/dev/ttyS0",
        baudRate: 115200,
        parity: SerialPort.PARITY_NONE,
        stopBits: SerialPort.STOPBITS_ONE,
        autoOpen: true
    });
}

exports.closePort = () => {
    port.close();
}

exports.executeAction = (action) => {
    console.log("Executing action:", action);
    port.write(action)
}

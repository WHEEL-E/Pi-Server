const { SerialPort } = require('serialport');

let Port

exports.initPort = () => {
    Port = new SerialPort({
        path: "/dev/ttyS0",
        baudRate: 115200,
        parity: SerialPort.PARITY_NONE,
        stopBits: SerialPort.STOPBITS_ONE,
        autoOpen: true
    });
}

exports.closePort = () => {
    Port.close();
}

exports.executeAction = (action) => {
    console.log("Executing action:", action);
    Port.write(action)
}
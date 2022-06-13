const { SerialPort } = require('serialport');

let port

exports.initPort = () => {
    port = new SerialPort({
        path: "/dev/ttyS0",
        baudRate: 115200,
        parity: SerialPort.PARITY_NONE,
        stopbits: SerialPort.STOPBITS_ONE,
        bytesize: SerialPort.EIGHTBITS,
        write_timeout: 1.0,
    });
}

exports.executeAction = (action) => {
    console.log("Executing action:", action);
    port.write(action)
}
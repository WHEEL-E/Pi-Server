const { SerialPort } = require('serialport')

const port = new SerialPort({
    port: "/dev/ttyS0",
    baudrate: 115200,
    parity: serial.PARITY_NONE,
    stopbits: serial.STOPBITS_ONE,
    bytesize: serial.EIGHTBITS,
    write_timeout: 1,
})

export const executeAction = (action) => {
    port.write(action)
}
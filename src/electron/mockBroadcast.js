const dgram = require("dgram")
const udpsocket = dgram.createSocket("udp4")
setInterval(() => {
  udpsocket.send('this is a string from broadcast server', 123, "localhost")
}, 1000)
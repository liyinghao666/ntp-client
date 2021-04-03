/**
 * ntp1.aliyun.com
 */
const SERVER_ALI = "120.25.115.20"
const SERVER_310 = "115.156.155.100"
const dgram = require("dgram")
const udpClient = dgram.createSocket("udp4")
let ntpPackage = [
  0x1B, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00
]
// 0                   1                   2                   3
// 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |LI | VN  |Mode |    Stratum     |     Poll      |  Precision   |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                         Root Delay                            |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                         Root Dispersion                       |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                          Reference ID                         |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// +                     Reference Timestamp (64)                  +
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// +                      Origin Timestamp (64)                    +
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// +                      Receive Timestamp (64)                   +
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// +                      Transmit Timestamp (64)                  +
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// .                                                               .
// .                    Extension Field 1 (variable)               .
// .                                                               .
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// .                                                               .
// .                    Extension Field 2 (variable)               .
// .                                                               .
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                          Key Identifier                       |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// |                                                               |
// |                            dgst (128)                         |
// |                                                               |
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


module.exports =  function ntpCS(serverUrl) {
  const matchResult = serverUrl.match(/([\b\d.]+)(:(\d+))?/)
  const serverAddress = matchResult ? matchResult[1] : null
  const serverPort = parseInt(matchResult ? matchResult[3] : null)
  return Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          state: "timeout 2s"
        })
      }, 2000);
    }),
    new Promise((resolve, reject) => {
      udpClient.once("message", (msg, rinfo) => {
        let result = []
        for(let i = 0; i < msg.length; i++) {
          result.push(msg[i])
        }
        for(let i = 0; i < result.length; i++) {
          if(i % 4 === 0) {
            console.log(Buffer.from(result.slice(i, i + 4)))
          }
        }
        let seconds = (((result[40] * 256) + result[41]) * 256 + result[42]) * 256 + result[43]
        let d = new Date()
        d.setTime(0)
        d.setUTCSeconds(seconds + 8*60*60)
        d.setUTCFullYear(d.getUTCFullYear() - 70)
        resolve({
          state: "success",
          data: d
        })
        // udpClient.close()
      })
      udpClient.send(Buffer.from(ntpPackage), 0, ntpPackage.length, 123, SERVER_ALI, (err, bytes) => {
        if(err) {
          udpClient.close()
          reject(err)
        }
      })  
    })
  ])
}
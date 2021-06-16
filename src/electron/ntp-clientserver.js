/**
 * ntp1.aliyun.com
 */
const SERVER_ALI = "120.25.115.20"
const dgram = require("dgram")
let udpClient = dgram.createSocket("udp4")
const { setTime } = require("../utils/setSystemTime")
let ntpPackage = [
  0x23, 0x00, 0x00, 0x00,
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
  0x00, 0x00, 0x00, 0x00,
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

module.exports =  function ntpCS(serverAddress = SERVER_ALI, serverPort = 123) {
  return Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          state: "timeout 2s",
          receiveTime: new Date(0),
          backTime: new Date(0)
        })
      }, 10000);
    }),
    new Promise((resolve, reject) => {
      try {
        udpClient = dgram.createSocket("udp4")
        udpClient.send(Buffer.from(ntpPackage), 0, ntpPackage.length, parseInt(serverPort), serverAddress, (err, bytes) => {
          if(err) {
            udpClient.close()
            reject(err)
          }
        })
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
          let receiveSeconds = (((result[32] * 256) + result[33]) * 256 + result[34]) * 256 + result[35]
          let receiveMicrosecond = ((((result[36] * 256) + result[37]) * 256 + result[38]) * 256 + result[39]) / 4294.967296
          let receiveMs = receiveMicrosecond / 1000
          let receiveTime = new Date()
          receiveTime.setTime(0)
          receiveTime.setUTCSeconds(receiveSeconds)
          receiveTime.setUTCFullYear(receiveTime.getUTCFullYear() - 70)
          receiveTime.setUTCMilliseconds(receiveMs)

          let backSeconds = (((result[40] * 256) + result[41]) * 256 + result[42]) * 256 + result[43]
          let backMicrosecond = ((((result[44] * 256) + result[45]) * 256 + result[46]) * 256 + result[47]) / 4294.967296
          let backMs = backMicrosecond / 1000
          let backTime = new Date()
          backTime.setTime(0)
          backTime.setUTCSeconds(backSeconds)
          backTime.setUTCFullYear(backTime.getUTCFullYear() - 70)
          backTime.setUTCMilliseconds(backMs)
          setTime(receiveTime)
          resolve({
            state: "success",
            receiveTime,
            backTime
          })
          // udpClient.close()
        })
      } catch(e) {
        throw e
      }
    })
  ])
}
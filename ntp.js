const getNetworkTime = require("ntp-client").getNetworkTime
getNetworkTime("ntp1.aliyun.com", 123, (err, date) => {
  console.log(date)
})
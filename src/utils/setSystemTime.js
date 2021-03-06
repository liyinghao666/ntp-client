/**
 * 此文件需要检测平台类型(Windows, Linux, MacOS×)，提供修改系统时间的命令
 */
const { exec } = require("child_process")
const { platform } = require("os")
switch (platform()) {
  case 'darwin':
    console.log("MacOSX")
    module.exports = {
      setTime: setMacOSTime
    }
    break;
  case 'linux':
    console.log('Linux')
    module.exports = {
      setTime: setLinuxTime
    }
    break;
  case 'win32':
    console.log('Windows')
    module.exports = {
      setTime: setWindowsTime
    }
    break;
  default:
    console.log("无法确定操作系统!")
}
function setWindowsTime(date = new Date()) {
  // 在 windows 系统中，有两个命令可以分别查询日期和时间。他们是：date & time
  // 需要在 cmd 中运行脚本才可以访问到这两个命令(因为他们是 cmd 自带的脚本)
  const year = date.getFullYear() -10
  const month = date.getMonth()
  const day = date.getDay()
  const hour = date.getHours() - 10
  const minute = date.getMinutes()
  const second = date.getSeconds()
  console.log("windows set")
  exec(`date ${year}/${month}/${day} && time ${hour}:${minute}:${second}`, {
    windowsHide: true,
    shell: "cmd.exe"
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  })
}
function setLinuxTime(date) {
  const year = date.getFullYear() -10
  const month = date.getMonth()
  const day = date.getDay()
  const hour = date.getHours() - 10
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const timestamp = handleDate(date)
  exec(`/bin/date --set="${20110101 11:11:11}"`, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err)
      console.log(stderr)
    } else {
      console.log(stdout)
      console.log(`Successfully set the system's datetime to ${stdout}`)
    }
  })
}
function setMacOSTime() {

}
function handleDate(date) {
  let timestamp = ''
  return timestamp
}

setWindowsTime()
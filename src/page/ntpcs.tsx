import React, { useEffect, useState } from 'react'
import BlockWrapper from "../component/BlockWrapper"
import { Descriptions, Button } from 'antd'
import { useSelector } from 'react-redux'
import timeString from "../utils/timeString"
interface NTPCSData {
  receiveTime: Date,
  backTime: Date,
  state: string
}

let timer: NodeJS.Timeout
let isSending = false
function Ntpcs() {
  const [sendTime, setSendTime] = useState(new Date())
  const [receiveTime, setReceiveTime] = useState(new Date())
  const [backTime, setBackTime] = useState(new Date())
  const serverUrl = useSelector(store => {
    const serverAddress = store.config.get("serverAddress")
    const serverPort =  store.config.get("serverPort")
    if(serverAddress && serverPort) {
      return serverAddress + ':' + serverPort
    } else return ''
  })

  const handleSubmitClick = () => {
    const clickTime = new Date()
    window.api.ntpcs(serverUrl).then((data: NTPCSData) => {
      setSendTime(clickTime)
      setReceiveTime(data.receiveTime)
      setBackTime(data.backTime)
    }) 
  }

  const handleConsequenceClick = () => {
    console.log(`isSending? ${isSending}`)
    if(isSending) {
      isSending = false
      clearInterval(timer)
    } else {
      isSending = true
      timer = setInterval(() => {
        handleSubmitClick()
      }, 1000)
    }
  }

  useEffect(() => {
    return () => {
      isSending = false
      clearInterval(timer)
    }
  }, [])

  return (
    <BlockWrapper>
      <Descriptions
        title="发送帧"
        bordered={true}
        column={3}
        layout="horizontal"
      >
        <Descriptions.Item
          label="发送时刻"
          span={3}
        >
          {timeString(sendTime)}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="接收帧"
        bordered={true}
        column={3}
        layout="horizontal"
      >
        <Descriptions.Item
          label="接收时刻"
          span={3}
        >
          {timeString(receiveTime)}
        </Descriptions.Item>
        <Descriptions.Item
          label="回送时刻"
          span={3}
        >
          {timeString(backTime)}
        </Descriptions.Item>
      </Descriptions>
      <Button 
        type="primary"
        onClick={handleSubmitClick}
        style={{
          marginTop: 50,
          alignSelf: "start"
        }}  
      >矫正系统时钟</Button>
      <Button 
        type="primary"
        onClick={handleConsequenceClick}
        style={{
          marginTop: 30,
          alignSelf: "start"
        }}  
      >连续发起请求</Button>
    </BlockWrapper>
  )
}

export default Ntpcs
import React, { useState } from 'react'
import BlockWrapper from "../component/BlockWrapper"
import { Descriptions, Button } from 'antd'
import { useSelector } from 'react-redux'
interface NTPCSData {
  receiveTime: Date,
  backTime: Date,
  state: string
}
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

  const handleClick = () => {
    const clickTime = new Date()
    window.api.ntpcs(serverUrl).then((data: NTPCSData) => {
      setSendTime(clickTime)
      setReceiveTime(data.receiveTime)
      setBackTime(data.backTime)
    }) 
  }

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
          {sendTime.toString()}:{sendTime.getMilliseconds()}
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
          {receiveTime.toString()}:{receiveTime.getMilliseconds()}
        </Descriptions.Item>
        <Descriptions.Item
          label="回送时刻"
          span={3}
        >
          {backTime.toString()}:{backTime.getMilliseconds()}
        </Descriptions.Item>
      </Descriptions>
      <Button 
        type="primary"
        onClick={handleClick}
        style={{
          marginTop: 50,
          alignSelf: "start"
        }}  
      >发起请求</Button>
    </BlockWrapper>
  )
}

export default Ntpcs
import React, { CSSProperties, JSXElementConstructor, useCallback, useEffect, useRef, useState } from 'react'
import { List, Button } from "antd"
import BlockWrapper from "../component/BlockWrapper"
interface BroadcastMessage {
  time: string,
  key: number
}
function NtpBroadcast() {
  const [listening, setListening] = useState(false)
  const [dataList, setDataList] = useState<BroadcastMessage[]>([])

  const handleClick = useCallback(() => {
    setListening(listening => {
      if(listening) {
        window.api.ntpbroadcast.end()
        return false
      } else {
        window.api.ntpbroadcast.begin()
        return true
      }
    })
  }, [])

  useEffect(() => {
    window.api.ntpbroadcast.subscribe((message: string) => {
      setDataList((dataList) => [{ time: message, key: Math.random() * 1000 }, ...dataList])
    })
  }, [])
  return (
    <BlockWrapper
      style={{
        overflow: "hidden"
      }}
    >
      <List
        bordered={true}
        header={
          <Button
            type="primary"
            onClick={handleClick}
          >开始监听广播</Button>
        }
        dataSource={dataList}
        renderItem={item => {
          return <List.Item key={item.key}>{item.time}</List.Item>
        }}
      ></List>
    </BlockWrapper>
  )
}
export default NtpBroadcast
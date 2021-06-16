import React, { useCallback, useEffect, useState } from 'react'
import { List, Button } from "antd"
import BlockWrapper from "../component/BlockWrapper"
import timeString from "../utils/timeString"
interface BroadcastMessage {
  time: string,
  key: number,
  address: string
}
const maxItemsOnshow = 9
function NtpBroadcast() {
  const [listening, setListening] = useState(false)
  const [dataList, setDataList] = useState<BroadcastMessage[]>([])

  const bindFunction = useCallback((message: Date, address: string) => {
    console.log(message, address)
    setDataList((dataList) => [{ time: timeString(message), key: Math.random() * 1000, address}, ...dataList].slice(0, maxItemsOnshow))
  }, [])

  const handleClick = useCallback(() => {
    window.api.ntpbroadcast.subscribe(bindFunction)
    setListening(listening => {
      if(listening) {
        return false
      } else {
        return true
      }
    })
  }, [bindFunction])

  useEffect(() => {
    return () => {
      window.api.ntpbroadcast.desubscribe()
    }
  }, [bindFunction])

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
            disabled={listening}
          >开始监听广播</Button>
        }
        dataSource={[...dataList].reverse()}
        renderItem={item => {
          return <List.Item key={item.key}>{item.time}   来自{item.address}的消息</List.Item>
        }}
      ></List>
    </BlockWrapper>
  )
}
export default NtpBroadcast
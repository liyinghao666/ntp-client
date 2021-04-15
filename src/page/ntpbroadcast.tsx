import React, { useCallback, useEffect, useState } from 'react'
import { List, Button } from "antd"
import BlockWrapper from "../component/BlockWrapper"
interface BroadcastMessage {
  time: string,
  key: number
}
const maxItemsOnshow = 9
function NtpBroadcast() {
  const [listening, setListening] = useState(false)
  const [dataList, setDataList] = useState<BroadcastMessage[]>([])

  const bindFunction = useCallback((message: Date) => {
    setDataList((dataList) => [{ time: message.toString() + ':' + message.getMilliseconds(), key: Math.random() * 1000 }, ...dataList].slice(0, maxItemsOnshow))
  }, [])

  const handleClick = useCallback(() => {
    setListening(listening => {
      if(listening) {
        window.api.ntpbroadcast.desubscribe()
        return false
      } else {
        window.api.ntpbroadcast.subscribe(bindFunction)
        return true
      }
    })
  }, [bindFunction])

  useEffect(() => {
    return () => {
      window.api.ntpbroadcast.desubscribe()
    }
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
          >{listening ? "停止" : "开始"}监听广播</Button>
        }
        dataSource={[...dataList].reverse()}
        renderItem={item => {
          return <List.Item key={item.key}>{item.time}</List.Item>
        }}
      ></List>
    </BlockWrapper>
  )
}
export default NtpBroadcast
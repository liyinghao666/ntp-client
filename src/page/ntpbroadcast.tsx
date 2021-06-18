import React, { useCallback, useEffect, useRef, useState } from 'react'
import { List, Button } from "antd"
import BlockWrapper from "../component/BlockWrapper"
import timeString from "../utils/timeString"
interface BroadcastMessage {
  time: string,
  key: number,
  address: string,
  id: number
}
const maxItemsOnshow = 9
function NtpBroadcast() {
  const [listening, setListening] = useState(false)
  const [dataList, setDataList] = useState<BroadcastMessage[]>([])
  const idObj = useRef<{
    [address: string]: number
  }>({})

  const bindFunction = useCallback((message: Date, address: string) => {
    if(idObj.current[address]) idObj.current[address]++
    else idObj.current[address] = 1
    setDataList((dataList) => [{ time: timeString(message), key: Math.random() * 1000, address, id: idObj.current[address]}, ...dataList].slice(0, maxItemsOnshow))
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
          return <List.Item key={item.key}>NO-{item.id}.  from  {item.address}  {item.time}</List.Item>
        }}
      ></List>
    </BlockWrapper>
  )
}
export default NtpBroadcast
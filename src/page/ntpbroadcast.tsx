import React from 'react'
import { List } from "antd"
import BlockWrapper from "../component/BlockWrapper"
function NtpBroadcast() {
  return (
    <BlockWrapper>
      <List
        bordered={true}
        header={<div>广播接收列表</div>}
        dataSource={['aaa', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb', 'bbb']}
        renderItem={item => {
          return <List.Item>{item}</List.Item>
        }}
      ></List>
    </BlockWrapper>
  )
}
export default NtpBroadcast
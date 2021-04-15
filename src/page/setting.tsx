import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useStore } from "react-redux"
import { Form, Button, Input, Divider } from 'antd'
import BlockWrapper from "../component/BlockWrapper"

const addressReg = /^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|((https?:\/\/)?www\.([\S]+\.)+(com|cn|top|edu)(:[0-9]{1,5})?)$/
const portReg = /^[0-9]{1,5}$/

function Setting() {
  const store = useStore()
  const config = store.getState().config
  const dispatch = useDispatch()

  const [serverAddressValid, setServerAddressValid] = useState(false)
  const [serverPortValid, setServerPortValid] = useState(false)
  const [originAddressValid, setOriginAddressValid] = useState(false)
  const [receivePortValid, setReceivePortValid] = useState(false)

  const [serverAddress, setServerAddress] = useState(config.get("serverAddress"))
  const [serverPort, setServerPort] = useState(config.get("serverPort"))
  const [originAddress, setOriginAddress] = useState(config.get("originAddress"))
  const [receivePort, setReceivePort] = useState(config.get("receivePort"))

  const [feedBack, setFeedBack] = useState(false)

  const isValid = useCallback(() => {
    setServerAddressValid(addressReg.test(serverAddress? serverAddress.trim() : ''))
    setServerPortValid(portReg.test(serverPort? serverPort.trim() : ''))
    setOriginAddressValid(addressReg.test(originAddress? originAddress.trim() : ''))
    setReceivePortValid(portReg.test(receivePort? receivePort.trim() : ''))

    return serverAddressValid &&
    serverPortValid &&
    originAddressValid &&
    receivePortValid
  }, [
    serverAddressValid, 
    serverPortValid, 
    originAddressValid, 
    receivePortValid,
    serverAddress,
    serverPort,
    originAddress,
    receivePort
  ])


  const handleServerAddressChange = useCallback((e) => {
    const str = e.target.value
    setServerAddressValid(addressReg.test(str.trim()))
    setServerAddress(str.trim())
  }, [])
  const handleServerPortChange = useCallback((e) => {
    const str = e.target.value
    setServerPortValid(portReg.test(str.trim()))
    setServerPort(str.trim())
  }, [])
  const handleOriginChange = useCallback((e) => {
    const str = e.target.value
    setOriginAddressValid(addressReg.test(str.trim()))
    setOriginAddress(str.trim())
  }, [])
  const handleReceivePortChange = useCallback((e) => {
    const str = e.target.value
    setReceivePortValid(portReg.test(str.trim()))
    setReceivePort(str.trim())
  }, [])
  const handleSubmit = useCallback(() => {
    if(isValid()) {
      dispatch(createSettingConfigAction({
        serverAddress,
        serverPort,
        originAddress,
        receivePort
      }))
      setFeedBack(true)
    }
  }, [
    serverAddress,
    serverPort,
    originAddress,
    receivePort,
    dispatch,
    isValid
  ])


  const createSettingConfigAction = ({
    serverAddress, 
    serverPort, 
    originAddress, 
    receivePort
  }: {
    [propName: string]: string | undefined
  }) => {
    return {
      type: "CONFIG",
      payload: {
        serverAddress, 
        serverPort, 
        originAddress, 
        receivePort
      }
    }
  }

  useEffect(() => {
    isValid()
  }, [isValid])

  return (
    <BlockWrapper>
      <Form>
        <div>
          <Divider orientation="left">
            客户请求模式配置：
          </Divider>
          <Form.Item
            label="服务器地址"
            validateStatus={serverAddressValid ? "success" : "error"}
            hasFeedback={feedBack}
          >
            <Input
              onChange={handleServerAddressChange}
              value={serverAddress}
            ></Input>
          </Form.Item>
          <Form.Item
            label="服务器端口"
            validateStatus={serverPortValid ? "success" : "error"}
            hasFeedback={feedBack}
          >
            <Input
              onChange={handleServerPortChange}
              value={serverPort}
            ></Input>
          </Form.Item>
        </div>
        <div>
          <Divider orientation="left">
            广播模式配置：
          </Divider>
          <Form.Item
            label="广播来源地址"
            validateStatus={originAddressValid ? "success" : "error"}
            hasFeedback={feedBack}
          >
            <Input
              onChange={handleOriginChange}
              value={originAddress}
            ></Input>
          </Form.Item>
          <Form.Item
            label="指定接收端口"
            validateStatus={receivePortValid ? "success" : "error"}
            hasFeedback={feedBack}
          >
            <Input
              onChange={handleReceivePortChange}
              value={receivePort}
            ></Input>
          </Form.Item>
        </div>
        <Button
          type="primary"
          loading={false}
          onClick={handleSubmit}
        >完成设置</Button>
      </Form>
    </BlockWrapper>
  )
}
export default Setting
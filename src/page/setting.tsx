import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useStore } from "react-redux"
import { Form, Button, AutoComplete, AutoCompleteProps, Divider } from 'antd'
import styleHelper from "../utils/styleHelper"
import BlockWrapper from "../component/BlockWrapper"

const AutoCompleteWithStyle: FunctionComponent<AutoCompleteProps> = styleHelper(AutoComplete, {
  border: "none"
})

const addressReg = /^([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|((https?:\/\/)?www\.([\s\S]+\.)+(com|cn|top|edu)(:[0-9]{1,5})?)$/
const portReg = /^[0-9]{1,5}$/

function Setting() {
  console.log("setting component rerendered")
  const store = useStore()

  const [serverAddressValid, setServerAddressValid] = useState(false)
  const [serverPortValid, setServerPortValid] = useState(false)
  const [originAddressValid, setOriginAddressValid] = useState(false)
  const [receivePortValid, setReceivePortValid] = useState(false)
  const [feedBack, setFeedBack] = useState(false)

  let formData = useRef({
    serverAddress: "",
    serverPort: "",
    originAddress: "",
    receivePort: ""
  })


  const dispatch = useDispatch()

  const isValid = useCallback(() => {
    return serverAddressValid &&
    serverPortValid &&
    originAddressValid &&
    receivePortValid
  }, [serverAddressValid, serverPortValid, originAddressValid, receivePortValid])

  const handleServerAddressChange = useCallback((str: string) => {
    setServerAddressValid(addressReg.test(str.trim()))
    formData.current.serverAddress = str.trim()
  }, [])
  const handleServerPortChange = useCallback((str: string) => {
    setServerPortValid(portReg.test(str.trim()))
    formData.current.serverPort = str.trim()
  }, [])
  const handleOriginChange = useCallback((str: string) => {
    setOriginAddressValid(addressReg.test(str.trim()))
    formData.current.originAddress = str.trim()
  }, [])
  const handleReceivePortChange = useCallback((str: string) => {
    setReceivePortValid(portReg.test(str.trim()))
    formData.current.receivePort = str.trim()
  }, [])
  const handleSubmit = useCallback(() => {
    if(isValid()) {
      dispatch(createSettingConfigAction(formData.current))
      setFeedBack(true)
    }
  }, [dispatch, isValid])


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

  formData.current = useMemo(() => {
    const formMap = {
      serverAddress: "", 
      serverPort: "", 
      originAddress: "", 
      receivePort: ""
    }
    store.getState().config.map((value, key) => formMap[key] = value)
    return formMap
  }, [store])


  return (
    <BlockWrapper>
      <Form>
        <div>
          <Divider orientation="left">
            客户请求模式配置：
          </Divider>
          <Form.Item
            label="服务器地址"
            name="serverAddress"
            validateStatus={serverAddressValid ? "success" : "error"}
            hasFeedback={feedBack}
            initialValue={formData.current.serverAddress}
          >
            <AutoCompleteWithStyle
              onChange={handleServerAddressChange}
            ></AutoCompleteWithStyle>
          </Form.Item>
          <Form.Item
            label="服务器端口"
            name="serverPort"
            validateStatus={serverPortValid ? "success" : "error"}
            hasFeedback={feedBack}
            initialValue={formData.current.serverPort}
          >
            <AutoCompleteWithStyle
              onChange={handleServerPortChange}
            ></AutoCompleteWithStyle>
          </Form.Item>
        </div>
        <div>
          <Divider orientation="left">
            广播模式配置：
          </Divider>
          <Form.Item
            label="广播来源地址"
            name="originAddress"
            validateStatus={originAddressValid ? "success" : "error"}
            hasFeedback={feedBack}
            initialValue={formData.current.originAddress}
          >
            <AutoCompleteWithStyle
              onChange={handleOriginChange}
            ></AutoCompleteWithStyle>
          </Form.Item>
          <Form.Item
            label="指定接收端口"
            name="receivePort"
            validateStatus={receivePortValid ? "success" : "error"}
            hasFeedback={feedBack}
            initialValue={formData.current.receivePort}
          >
            <AutoCompleteWithStyle
              onChange={handleReceivePortChange}
            ></AutoCompleteWithStyle>
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
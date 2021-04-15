import React, { useCallback, useEffect, useState } from 'react'
import { Layout, Menu } from "antd"
import { orange } from "@ant-design/colors"
import * as antIcons from "@ant-design/icons"  // 这里可以写一个 loader 处理一下，把 * 替换成 { application.json } 里面的注册组件
import { usedIconNames } from './antd'

import pages from "./page"

interface SiderConfig {
  title: string,
  icon: usedIconNames,
  key: string
}
const siderConfig: SiderConfig[] = require("./application.json").sider

function App() {
  const [siderCollapsed, setSiderCollapsed] = useState(true)
  const [menuSelected, setMenuSelected] = useState(siderConfig[0].key)

  const handleMouseEnterSider = useCallback(() => {
    setSiderCollapsed(false)
  }, [])
  const handleMouseLeaveSider = useCallback(() => {
    setSiderCollapsed(true)
  }, [])
  const handleMenuClick = useCallback((obj: any) => {
    setMenuSelected(obj.key)
  }, [])

  useEffect(() => {
    window.api.ntpbroadcast.begin()
  }, [])

  return (
    <Layout 
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: 1
      }}
    >
      <Layout.Sider
        width={150}
        breakpoint="sm"
        collapsed={siderCollapsed}
        trigger={null}
        theme="light"
        onMouseEnter={handleMouseEnterSider}
        onMouseLeave={handleMouseLeaveSider}
        style={{
          height: "100vh",
          left: 0,
          top: 0
        }}
      >
        <Menu
          onClick={handleMenuClick}
          selectedKeys={[menuSelected]}
          style={{
            border: "none"
          }}
        >
          {
            siderConfig.map((sider) => {
              return (
                <Menu.Item 
                  icon={React.createElement(antIcons[sider.icon])}
                  key={sider.key}
                >
                  {sider.title}
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Layout.Sider>
      <Layout
        style={{
          height: "100vh",
          backgroundColor: orange[0]
        }}
      >
        {
          React.createElement(pages[menuSelected])
        }
      </Layout>
    </Layout>
  )
}

export default App;

import React from 'react'
/**
 * 
 * @param {reactComponent} component 
 * @param {styleSheet} style 
 * @returns reactFunctionalComponent
 */
const styleHelper = (component, style: React.CSSProperties) => (props = {}) => {
  const styleSheet = Object.assign({}, style, props.style)
  return React.createElement(component, {...props, style: styleSheet})
}
export default styleHelper
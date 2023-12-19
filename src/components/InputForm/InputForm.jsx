import { Input } from 'antd'
import React, { useState } from 'react'

const InputForm = (props) => {
  const { placeholder = 'Nhập', ...rests } = props
  const handleOnchangeInput = (e) => {
    props.onChange(e.target.value)
}
  return (
    <Input placeholder={placeholder} value={props.value}  {...rests} onChange={handleOnchangeInput}/>
 

  )
}

export default InputForm
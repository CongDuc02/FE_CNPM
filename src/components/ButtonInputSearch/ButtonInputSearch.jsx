// import { Button } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponets/InputComponent'
import ButtonComponent from '../ButtonComponents/ButtonComponent';
const ButtonInputSearch = (props) => {
  const { size, placeholder, textbutton, bordered, backgroundColorInput = "#fff", backgroundColorButton = '#C0C0C0',
    colorButton = "#fff"

  } = props
  return (
    <div style={{ display: 'flex', backgroundColor: "#fff" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size}

        style={{ background: backgroundColorButton, borderRadius: '0', border: !bordered && 'none' }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textbutton={textbutton}


      />
    </div >
  )
}

export default ButtonInputSearch
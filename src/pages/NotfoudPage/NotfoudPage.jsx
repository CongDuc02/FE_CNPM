import React from 'react'
import { WrapperContainerLeft } from '../SigninPage/style'
import {
  StopOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { WrapperHeader } from '../../components/HeaderComponent/style';

const NotfoundPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <WrapperHeader >
      <h2>
        <span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => {navigate('/')}}>Trang chủ</span>
      </h2>
    </WrapperHeader>
    
    <div style={{ padding: '100px 120px' }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <center style={{}}>
      <h2 > 
        <StopOutlined style={{marginRight: '5px', color: 'red', fontSize: '25px'}}/>
        <StopOutlined style={{marginRight: '5px', color: 'red', fontSize: '25px'}}/>
        <StopOutlined style={{marginRight: '5px', color: 'red', fontSize: '25px'}}/>
        Trang bạn vừa truy cập bị lỗi <br></br> hoặc bạn không có quyền truy cập vào trang này!
      </h2>
    </center>
    </div>
    </div>
    </div>
  )
}

export default NotfoundPage
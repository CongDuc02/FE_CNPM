import { Badge, Col, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperHeaderSmall, WrapperContentPopup } from './style'
import {
  UserOutlined,
  DownCircleOutlined,
  ShoppingCartOutlined,
  InsuranceOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';



const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)

  const dispatch = useDispatch()
  const [search,setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  const [isOpenPopup, setIsOpenPopup] = useState(false)

  const handleNavigateLogin = () => {
    navigate('/signin') 
  }

  const handleNavigateSigup = () => {
    navigate('/signup') 
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')} >Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
        )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>Đơn hàng của tôi</WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>

    </div>
  );

  const handleClickNavigate = (type) => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order',{ state : {
          id: user?.id,
          token : user?.access_token
        }
      })
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  }
  
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

 
  return (
    <div style={{ justifyContent: 'center' }}>
      <WrapperHeader gutter={17} style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <h1> <WrapperTextHeader to='/'> <InsuranceOutlined style={{ fontSize: '30px' }}/> Đi Kây </WrapperTextHeader></h1>
        </Col>
        
        {!isHiddenSearch && (
          
          <Col span={11} >
            <ButtonInputSearch
              size='large'
              bordered={false}
              textbutton='Tìm kiếm'
              placeholder="Tìm kiếm trên Shop"
              onChange={onSearch}
              // backgroundColorButton="#5a20c1"
            /></Col>
        )}
        <Col span={7} style={{ paddingLeft: '45px',paddingRight: 0, display: 'flex', gap: '40px', alignItems: 'center' }}>

        <Loading isLoading={loading}>
          <WrapperHeaderAccount style={{gap: '5px', width: '200px'}}>
            {userAvatar ? (
                  <img src={userAvatar} alt="avatar" style={{
                    height: '30px',
                    width: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover'

                  }} />
                ):(
              <UserOutlined style={{color:'white', fontSize: '30px' }} />
              )}

            {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer'}} onClick={() => setIsOpenPopup((prev) => !prev)}> {userName?.length ? userName : user?.email} </div>
                    
                  </Popover>
                  
                </>
              ) : (
            <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
              <WrapperHeaderSmall style={{marginRight: '20PX'}}> Đăng nhập</WrapperHeaderSmall>
            </div>
             )}
            
            {user?.access_token ? (
                <></>
              ) : (
            <div onClick={handleNavigateSigup} style={{cursor: 'pointer'}}>
              <WrapperHeaderSmall> Đăng ký</WrapperHeaderSmall>
            </div>
             )}

            {/* {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer'}} onClick={() => setIsOpenPopup((prev) => !prev)}> {userName?.length ? userName : user?.email} </div>
                    
                  </Popover>
                  
                </>
              ) : (
            <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
              <div>
                <DownCircleOutlined  style={{color:'white'}}/>
                <WrapperHeaderSmall>Tài Khoản</WrapperHeaderSmall>
              </div>
            </div>
             )} */}
             
          </WrapperHeaderAccount >
        </Loading>
        

        {!isHiddenCart && user?.access_token  ? (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ color: 'white', fontSize: '30px' }} />
              </Badge>
              <WrapperHeaderSmall>Giỏ hàng</WrapperHeaderSmall>
            </div>
          ) : (
            <div onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
              <Badge count={0} size="small">
                <ShoppingCartOutlined style={{ color: 'white', fontSize: '30px' }} />
              </Badge>
              <WrapperHeaderSmall>Giỏ hàng</WrapperHeaderSmall>
            </div>
          )}
        </Col >
      </WrapperHeader >
    </div >
  )
}

export default HeaderComponent
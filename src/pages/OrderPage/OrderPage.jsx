import {Checkbox, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { CustomCheckbox, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDilivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'

import { WrapperInputNumber } from '../../components/ProductDetailComponent/style';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponets/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepConponent/StepConponent';
import Footer from '../Footer/Footer';

const OrderPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)

  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const dispatch = useDispatch()
  const onChange = (e) => {
    if(listChecked.includes(e.target.value)){
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    }else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const handleChangeCount = (type, idProduct, limited) => {
    if(type === 'increase') {
      if(!limited) {
        dispatch(increaseAmount({idProduct}))
      }
    }else {
      if(!limited) {
        dispatch(decreaseAmount({idProduct}))
      }
    }
  }

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))
  }

  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    }else {
      setListChecked([])
    }
  }

  useEffect(() => {
    dispatch(selectedOrder({listChecked}))
  },[listChecked])

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if(isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price || 0) * (cur.amount || 0));
    }, 0);
    return result || 0;
  }, [order]);
  
 const priceDiscountMemo = useMemo(() => {
  const result = order?.orderItemsSlected?.reduce((totalDiscount, cur) => {
    const itemDiscount = cur.discount || 0;
    const itemAmount = cur.amount || 0;
    const itemPrice = cur.price || 0;

    // Tính giảm giá cho từng sản phẩm và cộng vào tổng giảm giá
    return Math.round(totalDiscount + ((itemDiscount * itemAmount * itemPrice) / 100));
  }, 0);

  return result || 0;
}, [order]);
  
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo < 500000) {
      return 20000;
    } else if (priceMemo >= 500000 ) {
      return 10000;
    }else if( priceMemo === 0){
      return 0
    } 
    else {
      return 30000;
    }
  }, [priceMemo, order]);
  
  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo);
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleRemoveAllOrder = () => {
    if(listChecked?.length > 1){
      dispatch(removeAllOrderProduct({listChecked}))
    }
  }

  const handleAddCard = () => {
    if(!order?.orderItemsSlected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    }else if(!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true)
    }else {
      navigate('/payment')
    } 
  }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const {isLoading, data} = mutationUpdate

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }
  const handleUpdateInforUser = () => {
    const {name, address,city, phone} = stateUserDetails
    if(name && address && city && phone){
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({name, address,city, phone}))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }
  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến dưới 500.000 VND',
    },
    {
      title: 'Free ship',
      description : 'Trên 500.000 VND',
    },
  ]
  return (
    <div>
    <div style={{background: '#f5f5fa', with: '100%', height: '100%'}}>
      <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
        <h3 style={{fontWeight: 'bold'}}>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <WrapperLeft>
            <h4>Phí giao hàng</h4>
            <WrapperStyleHeaderDilivery>
              <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000 
                ? 2 : diliveryPriceMemo === 20000 ? 1 
                : order.orderItemsSlected.length === 0 ? 0:  3}/>
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
                <span style={{display: 'inline-block', width: '390px'}}>
                  <CustomCheckbox key={user.id} value={order?.orderItems?.length} onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></CustomCheckbox>
                  <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                </span>
                <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                  <DeleteOutlined style={{cursor: 'pointer'}} onClick={handleRemoveAllOrder}/>
                </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                  <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
                  <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                  <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                  }}>{order?.name}</div>
                </div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>
                    <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                  </span>
                  <WrapperCountOrder>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease',order?.product, order?.amount === 1)}>
                        <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInstock} />
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase',order?.product ,order?.amount === order.countInstock, order?.amount === 1)}>
                        <PlusOutlined style={{ color: '#000', fontSize: '10px' }}/>
                    </button>
                  </WrapperCountOrder>
                  <span style={{color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500}}>{convertPrice(order?.price * order?.amount)}</span>
                  <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDeleteOrder(order?.product)}/>
                </div>
              </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{width: '100%'}}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{fontWeight: 'bold'}}> { `${user?.address} - ${user?.city} `} </span>
                  <span onClick={handleChangeAddress} style={{color: '#9255FD', cursor:'pointer'}}> Thay đổi</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Thành tiền</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Giảm giá</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceDiscountMemo)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Phí giao hàng</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{display:'flex', flexDirection: 'column'}}>
                  <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{color: '#000', fontSize: '11px'}}></span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '320px',
                  border: 'none',
                  borderRadius: '4px'
              }}
              textbutton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}>
        <Loading isLoading={isLoading}>
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your  phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
    <div style={{ padding: '50px 120px' }}>
      <Footer>

      </Footer>
    </div>
    </div>
  )
}

export default OrderPage
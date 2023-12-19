import React, { useState } from 'react'
import { getItem } from '../../utils';
import { Menu } from 'antd';
import {UserOutlined, AppstoreOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';
import Footer from '../Footer/Footer';
import Loading from '../../components/LoadingComponent/Loading';
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';


const AdminPage = () => {

  const user = useSelector((state) => state?.user)
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />,),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />,),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />)
    ];

    const [keySelected, setKeySelected] = useState('');
    const getAllOrder = async () => {
      const res = await OrderService.getAllOrder(user?.access_token)
      return {data: res?.data, key: 'orders'}
    }
  
    const getAllProducts = async () => {
      const res = await ProductService.getAllProduct()
      return {data: res?.data, key: 'products'}
    }
  
    const getAllUsers = async () => {
      const res = await UserService.getAllUser(user?.access_token)
      return {data: res?.data, key: 'users'}
    }
  
    const queries = useQueries({
      queries: [
        {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
        {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
        {queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60},
      ]
    })
    const memoCount = useMemo(() => {
      const result = {}
      try {
        if(queries) {
          queries.forEach((query) => {
            result[query?.data?.key] = query?.data?.data?.length
          })
        }
      return result
      } catch (error) {
        return result
      }
    },[queries])

    
    // const COLORS = {
    //  users: ['rgba(41,116,250,1)' , 'rgba(67,212,255,1)'],
    //  products: ['rgba(4,251,16,1)', 'rgba(251,250,16,1) '],
    //  orders: ['rgba(255,18,18,1)', 'rgba(252,246,19,1)', 'rgba(0,159,8,1)'],
    // };
  
  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'orders':
        return (
          <OrderAdmin />
        )
      default:
        return <></>
    }
  }

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{padding: '0 120px', display: 'flex',overflowX: 'hidden' }}>
        <Menu
        mode="inline"              
        style={{ width: 256,
        boxShadow: ' 1px 1px 1px 2px #ccc',
        }}
        items={items}
        onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
        <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount}  setKeySelected={setKeySelected} />
            )}
          </Loading>
          {renderPage(keySelected)}
            
        </div>
      </div>
      <div style={{ padding: '150px 120px' }}>
      <Footer>

      </Footer>
    </div>
    </>
    
  )
}

export default AdminPage

import { Row, Col, Image, InputNumber, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import Ip13 from '../../Imagess/Image1/Ip13.webp'
import Ip13_1 from '../../Imagess/Image1/Ip13_1.webp'
import Ip13_2 from '../../Imagess/Image1/Ip13_2.webp'
import Ip13_3 from '../../Imagess/Image1/Ip13_3.webp'
import Ip13_4 from '../../Imagess/Image1/Ip13_4.webp'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct
        , WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleDescriptionProduct, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import ButtonComponent from '../ButtonComponents/ButtonComponent'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import * as ProductService from '../../services/ProductService'
import * as message from '../Message/Message'
import Loading from '../LoadingComponent/Loading'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlide'
import { convertPrice, initFacebookSDK } from '../../utils'
import CommentComponent from '../CommentComponent/CommentComponent'
import { WrapperTextHeader } from '../HeaderComponent/style'



const ProductDetailComponent = ({productId}) => {
  const [numProduct, setNumProduct] = useState(1)
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const [errorLimitOrder,setErrorLimitOrder] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  
  const onChange = (value) => { 
    setNumProduct(Number(value))
  }

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if(id) {
        const res = await ProductService.getDetailsProduct(id)
        return res.data
    }
  }

  useEffect(() => {
    initFacebookSDK()
  }, [])

  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
    if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
        setErrorLimitOrder(false)
    } else if(productDetails?.countInStock === 0){
        setErrorLimitOrder(true)
    }
    },[numProduct])

  useEffect(() => {
    if(order.isSucessOrder) {
        message.success('Đã thêm vào giỏ hàng')
    }
    return () => {
        dispatch(resetOrder())
    }
    }, [order.isSucessOrder])

  const { isLoading, data: productDetails } = useQuery(['product-details', productId], fetchGetDetailsProduct, { enabled : !!productId})

  const handleChangeCount = (type, limited) => {
    if(type === 'increase') {
        if(!limited) {
            setNumProduct(numProduct + 1)
        }
    }else {
        if(!limited) {
            setNumProduct(numProduct - 1)
        }
    }
  }


  const handleAddOrderProduct = () => {
    if(!user?.id) {
        navigate('/signin', {state: location?.pathname})
    }// else {
        // {
        //     name: { type: String, required: true },
        //     amount: { type: Number, required: true },
        //     image: { type: String, required: true },
        //     price: { type: Number, required: true },
        //     product: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Product',
        //         required: true,
        //     },
        // },
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        images: productDetails?.images,
                        description: productDetails?.description,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
        
        

  return (
    <Loading isLoading={isLoading}>
      <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height:'100%' }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', padding: '10px 8px' }}>
          <Image src={productDetails?.image} alt="Image Iphone" preview='false' />
          {productDetails?.images && productDetails?.images.length > 0 && (
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            {productDetails?.images.slice(0, 5).map((image, index) => (
              <Col span={4} key={index} style={{ paddingRight: '2px', paddingBottom: '2px' }}>
                <Image src={image} alt="Product Image" preview={true} style={{height: '82px' }}/>
              </Col>
            ))}
          </Row>
        )}
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>
            <h3>{productDetails?.name}</h3>
          </WrapperStyleNameProduct>
          <div>
            <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
            <WrapperStyleTextSell> | Da ban {productDetails?.selled}+</WrapperStyleTextSell>
          </div>
          
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>
                {convertPrice(productDetails?.price)}
              </WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
                <span>Giao đến </span>
                <span className='address'>{user?.address}</span> -
                {user?.id ? (
                <span className='change-address'> <Link to='/profile-user'> Đổi địa chỉ </Link> </span>
                ):(
                  <span className='change-address'> <Link to='/signin'> Đổi địa chỉ </Link> </span>
                )
                }
                </WrapperAddressProduct>
            <LikeButtonComponent
              dataHref={ process.env.REACT_APP_IS_LOCAL 
                        ? "https://developers.facebook.com/docs/plugins/"
                        : window.location.href
                    } 
              />
            <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ marginBottom: '10px' }}>Số lượng </div>
                <WrapperQualityProduct>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('decrease',numProduct === 1)}>
                    <MinusOutlined style={{ color: '#000033' }} />
                  </button>
                <WrapperInputNumber  onChange={onChange} size='small' defaultValue={1} max={productDetails?.countInStock} min={1} value={numProduct} />
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('increase')}>
                    <PlusOutlined style={{ color: '#000033' }} />
                  </button>
                </WrapperQualityProduct>
                {/* <InputNumber min={1} max={20} defaultValue={3} onChange={onchange} /> */}
            </div>
            <div style={{marginBottom: '20px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5'}}>
              <h3> Mô tả: </h3>
              <WrapperStyleDescriptionProduct>
              {productDetails?.description}
            </WrapperStyleDescriptionProduct>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div>
                    <ButtonComponent
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        onClick={handleAddOrderProduct}
                        textbutton={'Chọn mua'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                    {errorLimitOrder && <div style={{color: 'red', paddingTop: '5px'}}>San pham het hang</div>}
                </div>
                <ButtonComponent
                    size={40}
                    styleButton={{
                        background: '#fff',
                        height: '48px',
                        width: '220px',
                        border: '1px solid rgb(13, 92, 182)',
                        borderRadius: '4px'
                    }}
                    textbutton={'Mua trả sau'}
                    styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                ></ButtonComponent>
            </div>
        </Col>
        <div style={{paddingTop: '10px', margin: '-10px -12px 0'}} className="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" 
          data-width="1252" data-numposts="5"></div>
      </Row>
   </Loading>
  )
}

export default ProductDetailComponent
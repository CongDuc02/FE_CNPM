import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'

const ProductDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <div style={{ padding: '0 120px', background: '#efefef', height: '30px' }}>
        <h4 style={{ display: 'flex', height: '100%', alignItems: 'center', fontSize: '20px' }}>
          <span className='font' style={{ cursor: 'pointer', fontWeight: 'bold', }} onClick={() => { navigate('/') }}>Trang chủ</span> - Chi tiết sản phẩm
        </h4>
      </div>
      <div style={{ padding: '0 120px' }}>
        <ProductDetailComponent productId={id} style={{}} />

      </div>
      <div style={{ padding: '50px 120px' }}>
        <Footer>

        </Footer>
      </div>
    </div>
  )
}

export default ProductDetailPage
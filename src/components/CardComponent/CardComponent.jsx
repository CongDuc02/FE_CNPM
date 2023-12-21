import React from 'react'
import { StyleNameProduct, WrapperDiscount, WrapperPrice, WrapperReport, WrapperStyleSell, WrapperCardStyle } from './style'
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils'


const CardComponent = (props) => {

  const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
}

  return (
    <WrapperCardStyle 
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="Iphone" src={image} />}
      onClick={() =>  handleDetailsProduct(id)}
      
    >
      <StyleNameProduct> {name} </StyleNameProduct>
      <WrapperReport>
        <span style={{ marginRight: '4px' }}>
          <span>{rating}</span> <StarFilled style={{ fontSize: '10px', color: 'yellow' }} />
        </span>
        <WrapperStyleSell> | Da ban {selled || 'xx'}+</WrapperStyleSell>
      </WrapperReport>
      <WrapperPrice>
          <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscount>
                    - {discount || 5} %
                </WrapperDiscount>
        </WrapperPrice>

    </WrapperCardStyle>
  )
}

export default CardComponent
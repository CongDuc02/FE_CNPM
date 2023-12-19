/* eslint-disable no-duplicate-case */
import { Checkbox, Col, Rate, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import * as ProductService from '../../services/ProductService'
import { useLocation } from 'react-router-dom'
import Loading from '../../components/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
const NavBarComponent = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)

    const { state}  = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  })

  const [selectedCategory, setSelectedCategory] = useState(null);
  const fetchProductType = async (type, page, limit) => {
    setLoading(true)
    const res = await ProductService.getProductType(type, page, limit )
    if(res?.status === 'OK') {
      setLoading(false)
      setProducts(res?.data)
      setPanigate({...panigate, total: res?.totalPage})
    }else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(state){
        fetchProductType(state, panigate.page, panigate.limit)
    }
  }, [state, panigate.page, panigate.limit])

//   const onChange = (current, pageSize) => {
//     setPanigate({...panigate, page: current - 1, limit: pageSize})    
// }
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return products.filter((pro) => {
                        if (searchDebounce === '') {
                            return pro;
                        } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                            return pro;
                        }
                    }).map((product, index) => (
                        <WrapperTextValue key={index}>{product?.name}</WrapperTextValue>
                        ));
                
            case 'checkbox':
                return (
                    <div>
                        {options.map((option) => (
                            <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Checkbox 
                                key={option.value}
                                style={{ marginLeft: 0 }}
                                value={option.value}
                                onClick={() => handleCategoryClick(option.label)}
                            >
                                {option.label}
                            </Checkbox>
                            </Checkbox.Group>
                        ))}
                    </div>
                );
            case 'star':
                return options.map((option) => (
                    <div key={option} style={{ display: 'flex' }}>
                        <Rate
                            style={{ fontSize: '12px' }}
                            disabled
                            defaultValue={option}
                        />
                        <span> {`từ ${option} sao`}</span>
                    </div>
                ));
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <WrapperLabelText>Danh Mục</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', [products])}
            </WrapperContent>
            
            <div style={{margin: '10px 0 0 0', }}>
            <WrapperLabelText>Nơi bán</WrapperLabelText>
            <WrapperContent >
                {renderContent('checkbox', [
                    { 
                        value: 'a', label: 'Hà Nội' 
                    },
                    { 
                        value: 'b', label: 'Đà Nẵng' 
                    },
                    { 
                        value: 'c', label: 'Tp. Hồ Chí Minh'
                    },
                ])}
            </WrapperContent>
            </div>

            <div style={{margin: '10px 0 0 0'}}>
            <WrapperLabelText>Đánh giá</WrapperLabelText>
            <WrapperContent>
                {renderContent('star', [3, 4, 5])}
            </WrapperContent>
            </div>

            <div style={{margin: '10px 0 0 0'}}>
            <WrapperLabelText>Giá tiền</WrapperLabelText>
            <WrapperContent>
                {renderContent('price', ['Dưới 200.000 ', 'Từ 200.000 - 500.000', 'Trên 500.000'])}
            </WrapperContent>
            </div>
        </div>
    )
}

export default NavBarComponent
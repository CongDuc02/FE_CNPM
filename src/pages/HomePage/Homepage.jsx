import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from './style'
import SlideComponent from '../../components/SlideComponent/SlideComponent'
import Slide1 from '../../Imagess/Image/Slide1.webp'
import Slide2 from '../../Imagess/Image/Slide2.webp'
import Slide3 from '../../Imagess/Image/Slide3.webp'
import Slide4 from '../../Imagess/Image/Slide4.webp'
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import Footer from '../Footer/Footer'



const Homepage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(12)
  const [typeProducts, setTypeProducts] = useState([])

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)

    return res
  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  
  useEffect(() => {
    fetchAllTypeProduct()
  }, [])


  const {isLoading, data: products, isPreviousData } = useQuery(["products", limit, searchDebounce], fetchProductAll ,{ retry: 3, retryDelay: 1000, keepPreviousData: true})

  
  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
        {typeProducts.map((item) => {
          return (
            <TypeProduct name={item} key={item} />
          )
        })}
      </WrapperTypeProduct>
      <SlideComponent arrImage={[Slide1, Slide2, Slide3, Slide4]} />
      <WrapperProduct >
            {products?.data?.map((product) => {
              return (
                <CardComponent 
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
                )
              })}
      </WrapperProduct>
      <div style={{ justifyContent: 'center', display: 'flex', marginTop: '10px'}}>
        <WrapperButtonMore textbutton = {isPreviousData ? 'Load more' : "Xem thêm"} type = "outline" styleButton = {{
          border: `1px solid ${products?.total === products?.data?.length ? '#ccc' : '#0000FF'}`, color: `${products?.total === products?.data?.length ? '#ccc' : '#0000FF'}`,
          width: '240px', height: '38px', borderRadius: '4px'
        }}
        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
        styleTextButton={{ fontWeight: 500 ,color: products?.total === products?.data?.length && '#C0C0C0' }}
        onClick={() => setLimit((prev) => prev + 6)}
        />
      </div>
      </div>
      <div style={{ padding: '50px 120px' }}>
      <Footer>

      </Footer>
    </div>
  </Loading>
  )
}

export default Homepage
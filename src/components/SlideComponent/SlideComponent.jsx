import Slider from 'react-slick';
import React from 'react'
import { Image } from 'antd';
const SlideComponent = ({ arrImage }) => {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000

  };
  return (
    <Slider {...settings}>
      {arrImage.map((image, index) => {
        return (
          <center key={index}>
            <Image src={image} alt="Slider" preview={false} width="1200px" height="350px" />
          </center>
        )
      })}
    </Slider>
  )
}

export default SlideComponent
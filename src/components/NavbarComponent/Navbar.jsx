import { React, memo, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
const Navbar = ({id, name}) => {

    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    return (
        <div>
            <div className='textlabel' onClick={() => handleDetailsProduct(id)}>{name}</div>
        </div>
    )
}

export default Navbar
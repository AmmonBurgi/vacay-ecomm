import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './displayCollection.css'

function DisplayCollection(props){
    const [productObj, setProduct] = useState({})
    const [proDetails, setDetails] = useState([])

    console.log(productObj)

    useEffect(() => {
        axios.get(`/api/collections/product/?productId=${props.match.params.id}`)
        .then(res => {
            setProduct(res.data.mainProduct[0])
            setDetails(res.data.productDetails)
        }).catch(err => console.log('Error...', err))
    }, [])

    const detailsMap = proDetails.map((element, index) => {
        return (
            <div key={index}>
                {element.detail}
            </div>
        )
    })

    const {product_title, product_img, pro_quantity, product_price, type_title} = productObj

    return (
        <div className='display-component'>
            <hr></hr>
            <section className='display-main'>
                <div className='display-image-box'>
                    <img src={productObj.product_img} alt={productObj.product_title} />
                </div>
                <div className='display-detail-box'>
                    <p>{product_title}</p>
                    <p>{product_price}</p>
                    <hr></hr>
                </div>
            </section>
        </div>
    )
}

export default DisplayCollection
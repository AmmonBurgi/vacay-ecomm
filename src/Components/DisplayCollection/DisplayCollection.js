import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './displayCollection.css'

function DisplayCollection(props){
    const [productObj, setProduct] = useState({}),
           [proDetails, setDetails] = useState([]),
            [mainImg, setMainImg] = useState(true),
            [secondImg, setSecondImg] = useState(false),
            [addQuantity, setQuantity] = useState(1)

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

    const switchMainImg = () => {
        setMainImg(true)
        setSecondImg(false)
    }
    const switchSecondImg = () => {
        setSecondImg(true)
        setMainImg(false)
    }

    const {product_title, product_img, pro_quantity, product_price, type_title} = productObj

    return (
        <div className='display-component'>
            <hr></hr>
            <section className='display-main'>
                <div className='display-image-box'>
                    <img src={mainImg === true ? product_img : 'https://cdn.shopify.com/s/files/1/0966/8778/products/contents-photo_grande.jpg?v=1440184164'} alt={productObj.product_title} />
                    <nav className='display-img-choice'>
                        <img className={mainImg === true ? 'display-border' : 'none-border'} onClick={switchMainImg} src={product_img} />
                        <img className={secondImg === true ? 'display-border' : 'none-border'} onClick={switchSecondImg} src={'https://cdn.shopify.com/s/files/1/0966/8778/products/contents-photo_grande.jpg?v=1440184164'} />
                    </nav>
                </div>
                <div className='display-detail-box'>
                    <p>{product_title}</p>
                    <p>{product_price}</p>
                    <hr></hr>
                    <div className='display-add-to-cart'>
                        <nav className='display-align-label'>
                            <label htmlFor='quantity-amount'>quantity</label>
                            <nav id='quantity-amount' className='quantity-amount'>
                                <button className='quantity-amount-buttons'>-</button>
                                <button disabled='disabled' className='quantity-amount-value'>{addQuantity}</button>
                                <button className='quantity-amount-buttons'>+</button>
                            </nav>
                        </nav>
                        <button className='add-to-cart'>add to cart</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DisplayCollection